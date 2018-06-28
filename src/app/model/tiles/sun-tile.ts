import {Tile} from '../tile';
import {Moment} from 'moment';
import {TileTypes} from '../enums/tile-types';

export class SunTile extends Tile {

    public sunrise: Moment;
    public sunset: Moment;

    public uvIndex: number;
    public sunPower: number;

    constructor(name: string, description: string, sunrise: Moment, sunset: Moment, uvIndex: number, sunPower: number) {
        super(TileTypes.SUN, name, description);
        this.sunrise = sunrise;
        this.sunset = sunset;
        this.uvIndex = uvIndex;
        this.sunPower = sunPower;
    }
}
