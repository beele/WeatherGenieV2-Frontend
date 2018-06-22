import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

import {UrlService} from './url.service';
import {City} from '../../../../../model/city';
import {Forecast} from '../../../../../model/forecast';
import {Tile} from '../model/tile';
import {TileTypes} from '../model/enums/tile-types';
import {Measurement} from '../model/measurement';
import {MeasurementKV} from '../model/measurement-k-v';
import {ForecastDay} from '../../../../../model/forecast-day';
import {ForecastHour} from '../../../../../model/forecast-hour';
import {ForecastRain} from '../../../../../model/forecast-rain';
import {LightningStrike} from '../../../../../model/lightning-strike';
import * as moment from 'moment';

@Injectable()
export class WeatherService {

    constructor(private http: HttpClient, private urlService: UrlService) {

    }

    // TODO: Error handling!

    public getCities(partialCityName: string): Observable<City[]> {
        return this.http.get(
            this.urlService.getCityUrl(partialCityName)
        )
            .map((res: City[]) => res);
    }

    public getForecast(cityId: number): Observable<Tile[]> {
        return this.http.get(this.urlService.getForecastUrl(cityId)).flatMap((fc: Forecast) => {

            return Observable.forkJoin(
                this.http.get(this.urlService.getForecastRainUrl(fc.lat, fc.lon)),
                this.http.get(this.urlService.getLightningUrl(fc.lat, fc.lon))
            ).map((responses: [ForecastRain[],  LightningStrike[]]) => {
                return this.processForecasts(fc, responses[0], responses[1]);
            });
        });
    }

    // TODO: Split this logic up!
    private processForecasts(forecast: Forecast, rainForecasts: ForecastRain[], strikes: LightningStrike[]): Tile[] {
        const tiles: Tile[] = [];

        // =================
        // LOCATION
        // =================
        tiles.push(
            new Tile(
                'Locatie', 'Bevat de locatiegegevens van de gemeente', TileTypes.LOCATION,
                [
                    new Measurement('Locatie', '°',
                        new MeasurementKV('Latitude', forecast.lat),
                        new MeasurementKV('Longitude', forecast.lon)
                    ),
                ]
            )
        );

        // =================
        // TEMPERATURE
        // =================
        if (forecast && forecast.days && forecast.days.length > 0) {
            const today: ForecastDay = forecast.days[0];
            const now: ForecastHour = today.hours[0];
            tiles.push(
                new Tile(
                    'Temperatuur', 'Bevat de huidige temperatuur', TileTypes.TEMPERATURE,
                    [
                        new Measurement('Temperatuur', '°C',
                            new MeasurementKV('Min', today.minTemp),
                            new MeasurementKV('Max', today.maxTemp),
                            new MeasurementKV('Huidig', now.temp)
                        ),
                    ]
                )
            );

            // =================
            // FORECAST
            // =================
            const forecastedDays: Measurement[] = [];
            for (let i: number = 0; i < forecast.days.length; i++) {
                if (i > 0 && i < 5) {
                    const day: ForecastDay = forecast.days[i];
                    const date: string = moment().add(i, 'days').format('DD/MM');

                    forecastedDays.push(
                        new Measurement(date, 'Temperature',
                            new MeasurementKV('Min', day.minTemp),
                            new MeasurementKV('Max', day.maxTemp),
                            new MeasurementKV('Gem', day.temp)
                        ),
                        new Measurement('Omstandigheden', '', new MeasurementKV('code', day.condition))
                    );
                }
            }

            tiles.push(
                new Tile(
                    'Komende dagen', 'Bevat de gegevens voor de komende dagen', TileTypes.FORECAST,
                    forecastedDays
                )
            );

            // =================
            // SUN
            // =================
            tiles.push(
                new Tile(
                    'Zon', 'Bevat de gegevens van de zon', TileTypes.SUN,
                    [
                        new Measurement('Zonnestand', '',
                            new MeasurementKV('Zonsopgang', today.sunrise),
                            new MeasurementKV('Zonsondergang', today.sunset)
                        ),
                        new Measurement('Max UV-Index', '', new MeasurementKV('UV-Index', today.uvIndex)),
                        new Measurement('Zonneschijn', 'W/m2', new MeasurementKV('Zonneschijn', now.sunshine))
                    ]
                )
            );

            // =================
            // WIND
            // =================
            tiles.push(
                new Tile(
                    'Wind', 'Bevat de gegevens van de wind', TileTypes.WIND,
                    [
                        new Measurement('Windsnelheid', 'km/u', new MeasurementKV('Windsnelheid', now.windSpeed)),
                        new Measurement('Windkracht', 'Bft', new MeasurementKV('Windkracht', now.windBeaufort)),
                        new Measurement('Windrichting', '', new MeasurementKV('Windrichting', now.windDirection)),
                    ]
                )
            );

            // =================
            // RAIN
            // =================
            const rainMeasurements: Measurement[] = [];
            rainMeasurements.push(new Measurement('Intensiteit', 'mm/u', new MeasurementKV('Huidig', now.precipitationActual)));

            for (let i: number = 1; i < rainForecasts.length; i++) {
                const rainForecast: ForecastRain = rainForecasts[i];
                rainMeasurements.push(new Measurement('Vooruitzicht (per 5 min)', 'mm/u', new MeasurementKV('+' + (i * 5) + ' minuten', rainForecast.precipitation)));
            }

            if (today.hours.length > 3) {
                for (let i: number = 3; i < today.hours.length; i++) {
                    const hour: ForecastHour = today.hours[i];
                    rainMeasurements.push(new Measurement('Vooruitzicht (per uur)', 'mm/u', new MeasurementKV('+' + i + ' uur', hour.precipitation)));
                }
            }

            tiles.push(
                new Tile(
                    'Regen', 'Bevat de gevevens over neerslag', TileTypes.RAIN,
                    rainMeasurements
                )
            );

            // =================
            // LIGHTNING
            // =================
            // TODO: Implement!
            tiles.push(
                new Tile(
                    'Onweer', 'Bevat de gegevens over onweer', TileTypes.THUNDER,
                    [

                    ]
                )
            );
        }

        return tiles;
    }
}
