import {MeasurementKV} from './measurement-k-v';

export class Measurement {

    label: string;
    values: MeasurementKV[];
    unit: string;

    constructor(label: string, unit: string, ...values: MeasurementKV[]) {
        this.label = label;
        this.unit = unit;
        this.values = values;
    }
}
