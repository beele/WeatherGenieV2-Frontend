import {Measurement} from './measurement';
import {TileTypes} from './enums/tile-types';

export class Tile {

    name: string;
    description: string;

    type: TileTypes;
    size: number;

    measurements: Measurement[];

    constructor(name: string, description: string, type: TileTypes, measurements: Measurement[], size: number = 1) {
        this.name = name;
        this.description = description;
        this.type = type;
        this.size = size;
        this.measurements = measurements;
    }
}
