import {Tile} from '../tile';
import {TileTypes} from '../enums/tile-types';

export class LocationTile extends Tile {

    public lat: number;
    public lon: number;

    constructor(name: string, description: string, lat: number, lon: number) {
        super(TileTypes.LOCATION, name, description);
        this.lat = lat;
        this.lon = lon;
    }
}
