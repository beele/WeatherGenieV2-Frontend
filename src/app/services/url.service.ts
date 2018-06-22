import {Injectable} from '@angular/core';

@Injectable()
export class UrlService {

    private baseUrl: string = 'http://localhost:3000/api';

    constructor() {

    }

    public getBaseUrl(): string {
        return this.baseUrl;
    }

    public getCityUrl(cityName: string): string {
        return this.baseUrl + '/city/' + cityName;
    }

    public getForecastUrl(cityId: number): string {
        return this.baseUrl + '/forecast/' + cityId;
    }

    public getForecastRainUrl(lat: number, lon: number): string {
        return this.baseUrl + '/forecast/rain/' + lat + '/' + lon;
    }

    public getLightningUrl(lat: number, lon: number): string {
        return this.baseUrl + '/lightning/' + lat + '/' + lon;
    }

    public getLast100LightningsUrl(): string {
        return this.baseUrl + '/lightning';
    }
}
