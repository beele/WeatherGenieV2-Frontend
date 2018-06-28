import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import 'rxjs/Rx';

import {UrlService} from './url.service';
import {City} from '../../../../../model/city';
import {Forecast} from '../../../../../model/forecast';
import {Tile} from '../model/tile';
import {ForecastDay} from '../../../../../model/forecast-day';
import {ForecastHour} from '../../../../../model/forecast-hour';
import {ForecastRain} from '../../../../../model/forecast-rain';
import {LightningStrike} from '../../../../../model/lightning-strike';
import * as moment from 'moment';
import {Moment} from 'moment';
import {Observable} from 'rxjs/internal/Observable';
import {catchError, map} from 'rxjs/operators';
import {flatMap} from 'rxjs/internal/operators';
import {forkJoin} from 'rxjs/internal/observable/forkJoin';
import {LocationTile} from '../model/tiles/location-tile';
import {CurrentConditionsTile} from '../model/tiles/current-conditions-tile';
import {ForecastedConditionsTile, ForecastedDay} from '../model/tiles/forecasted-conditions-tile';
import {SunTile} from '../model/tiles/sun-tile';
import {WindTile} from '../model/tiles/wind-tile';
import {RainTile} from '../model/tiles/rain-tile';
import {DetectedStrike, LightningTile} from '../model/tiles/lightning-tile';
import {of} from 'rxjs/internal/observable/of';

@Injectable()
export class WeatherService {

    constructor(private http: HttpClient, private urlService: UrlService) {

    }

    public getCities(partialCityName: string): Observable<City[]> {
        return this.http.get(
            this.urlService.getCityUrl(partialCityName)
        ).pipe(
            map((res: City[]) => res),
            catchError((error) => {
                return of([]);
            }));
    }

    public getForecast(cityId: number): Observable<Tile[]> {
        return this.http.get(this.urlService.getForecastUrl(cityId)).pipe(flatMap((fc: Forecast) => {

            return forkJoin(
                this.http.get(this.urlService.getForecastRainUrl(fc.lat, fc.lon)),
                this.http.get(this.urlService.getLightningUrl(fc.lat, fc.lon))
            ).pipe(map((responses: [ForecastRain[], LightningStrike[]]) => {
                return this.processForecasts(fc, responses[0], responses[1]);
            }), catchError((error) => {
                return of([]);
            }));
        }));
    }

    // TODO: Split this logic up!
    private processForecasts(forecast: Forecast, rainForecasts: ForecastRain[], strikes: LightningStrike[]): Tile[] {
        const tiles: Tile[] = [];

        // =================
        // LOCATION
        // =================
        tiles.push(
            new LocationTile(
                'Locatie', 'Bevat de locatiegegevens van de gemeente',
                forecast.lat, forecast.lon
            )
        );

        // =================
        // CURRENT
        // =================
        if (forecast && forecast.days && forecast.days.length > 0) {
            const today: ForecastDay = forecast.days[0];
            const now: ForecastHour = today.hours[0];
            tiles.push(
                new CurrentConditionsTile(
                    'Current conditions', 'Contains the current weather conditions',
                    today.minTemp, today.maxTemp, now.temp,
                    now.conditionCode, now.conditionText,
                    now.humidity
                )
            );

            // =================
            // FORECAST
            // =================
            const forecastedDays: ForecastedDay[] = [];
            for (let i: number = 0; i < forecast.days.length; i++) {
                if (i > 0 && i < 5) {
                    const day: ForecastDay = forecast.days[i];
                    const date: Moment = moment().add(i, 'days');

                    forecastedDays.push({
                            date: date,
                            minTemp: day.minTemp,
                            maxTemp: day.maxTemp,
                            temp: day.temp,
                            condition: day.conditionCode,
                            conditionAsText: day.conditionText
                        }
                    );
                }
            }

            tiles.push(
                new ForecastedConditionsTile(
                    'Next days', 'Contains the conditions for the coming days',
                    forecastedDays
                )
            );

            // =================
            // SUN
            // =================
            tiles.push(
                new SunTile(
                    'Sun', 'Contains the data of the sun',
                    today.sunrise, today.sunset,
                    now.uvIndex, now.sunshine
                )
            );

            // =================
            // WIND
            // =================
            tiles.push(
                new WindTile(
                    'Wind', 'Contains the wind data',
                    now.windSpeed, now.windBeaufort, now.windDirection
                )
            );

            // =================
            // RAIN
            // =================
            const rainMeasurementsMinutes: number[] = [];
            const rainMeasurementsHours: number[] = [];

            for (let i: number = 1; i < rainForecasts.length; i++) {
                const rainForecast: ForecastRain = rainForecasts[i];
                rainMeasurementsMinutes.push(rainForecast.precipitation);
            }

            if (today.hours.length > 3) {
                for (let i: number = 3; i < today.hours.length; i++) {
                    const hour: ForecastHour = today.hours[i];
                    rainMeasurementsHours.push(hour.precipitation);
                }
            }

            tiles.push(
                new RainTile(
                    'Rain', 'Contain the rain data',
                    rainMeasurementsMinutes, rainMeasurementsHours
                )
            );

            // =================
            // LIGHTNING
            // =================
            const lightnings: DetectedStrike[] = [];
            if (strikes) {
                const utcNow: Moment = moment().utc(false);
                for (const strike of strikes) {
                    const timestamp: Moment = moment(strike.timestamp);

                    if (utcNow.clone().add(-60, 'minutes').isBefore(timestamp)) {
                        lightnings.push({
                            lat: strike.lat,
                            lon: strike.lon,
                            timestamp: strike.timestamp
                        });
                    }
                }
            }

            tiles.push(
                new LightningTile(
                    'Lightning', 'Contains the lighting data',
                    lightnings)
            );
        }

        return tiles;
    }
}
