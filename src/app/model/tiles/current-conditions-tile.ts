import {Tile} from '../tile';
import {TileTypes} from '../enums/tile-types';

export class CurrentConditionsTile extends Tile {

    public minTemp: number;
    public maxTemp: number;
    public temp: number;

    public condition: string;
    public conditionAsText: string;

    public humidity: number;

    constructor(name: string, description: string,
                minTemp: number, maxTemp: number, temp: number,
                condition: string, conditionAsText: string,
                humidty: number) {
        super(TileTypes.CURRENT, name, description);
        this.minTemp = minTemp;
        this.maxTemp = maxTemp;
        this.temp = temp;
        this.condition = condition;
        this.conditionAsText = conditionAsText;
        this.humidity = humidty;
    }
}
