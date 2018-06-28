import {Tile} from '../tile';
import {Moment} from 'moment';
import {TileTypes} from '../enums/tile-types';

export class LightningTile extends Tile {

    public strikes: DetectedStrike[];

    constructor(name: string, description: string, strikes: DetectedStrike[]) {
        super(TileTypes.LIGHTNING, name, description);
        this.strikes = strikes;
    }
}

export interface DetectedStrike {
    lat: number;
    lon: number;
    timestamp: Moment;
}
