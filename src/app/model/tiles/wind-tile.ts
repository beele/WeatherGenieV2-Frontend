import {Tile} from '../tile';
import {TileTypes} from '../enums/tile-types';

export class WindTile extends Tile {

    public speed: number;
    public force: number;
    public direction: string;

    constructor(name: string, description: string, speed: number, force: number, direction: string) {
        super(TileTypes.WIND, name, description);
        this.speed = speed;
        this.force = force;
        this.direction = direction;
    }
}
