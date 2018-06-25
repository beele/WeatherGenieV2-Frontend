import {Measurement} from '../model/measurement';
import {Tile} from '../model/tile';
import {MeasurementKV} from '../model/measurement-k-v';

export class TileUtils {

    public static getMeasurementByName(tile: Tile, name: string): Measurement {
        for (const measurement of tile.measurements) {
            if (measurement.label === name) {
                return measurement;
            }
        }
        return null;
    }

    public static getMeasurementKeyValueByName(measurement: Measurement, name: string): MeasurementKV {
        for (const kv of measurement.values) {
            if (kv.label === name) {
                return kv;
            }
        }
    }
}
