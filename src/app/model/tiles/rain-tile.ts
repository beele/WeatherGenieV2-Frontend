import {Tile} from '../tile';
import {TileTypes} from '../enums/tile-types';

export class RainTile extends Tile {

    public intensityPer5Minutes: number[];
    public intensityFor3PlusHours: number[];

    constructor(name: string, description: string, intensityPer5Minutes: number[], intensityFor3PlusHours: number[]) {
        super(TileTypes.RAIN, name, description);
        this.intensityPer5Minutes = intensityPer5Minutes;
        this.intensityFor3PlusHours = intensityFor3PlusHours;
    }
}
