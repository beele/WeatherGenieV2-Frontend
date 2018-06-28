import {TileTypes} from './enums/tile-types';

export class Tile {

    public name: string;
    public description: string;
    public type: TileTypes;

    constructor(type: TileTypes, name: string, description: string) {
        this.type = type;
        this.name = name;
        this.description = description;
    }
}
