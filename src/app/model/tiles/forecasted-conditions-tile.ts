import {Tile} from '../tile';
import {TileTypes} from '../enums/tile-types';
import {Moment} from 'moment';

export class ForecastedConditionsTile extends Tile {

    public days: ForecastedDay[];

    constructor(name: string, description: string, days: ForecastedDay[]) {
        super(TileTypes.FORECAST, name, description);
        this.days = days;
    }
}

export interface ForecastedDay {
    date: Moment;
    minTemp: number;
    maxTemp: number;
    temp: number;

    condition: string;
    conditionAsText: string;
}
