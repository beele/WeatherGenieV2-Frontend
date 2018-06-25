import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Tile} from '../../../model/tile';
import {TileUtils} from '../../../utils/tile-utils';
import {Measurement} from '../../../model/measurement';
import {Moment} from 'moment';
import * as moment from 'moment';

@Component({
    selector: 'app-sun-tile',
    templateUrl: './sun-tile.component.html',
    styleUrls: ['./sun-tile.component.scss']
})
export class SunTileComponent implements OnInit, OnChanges {

    @Input()
    tileData: Tile;

    private angle: number;

    constructor() {

    }

    ngOnInit() {

    }

    ngOnChanges() {
        this.updateSunPosition(-100);
        const sunPositionDetails: Measurement = TileUtils.getMeasurementByName(this.tileData, 'Zonnestand');
        const sunrise: Moment = moment(sunPositionDetails.values[0].value);
        const sunset: Moment = moment(sunPositionDetails.values[1].value);

        const nowTime: Moment = moment().utc();
        const minutesBetweenSunriseAndSunset = sunset.diff(sunrise, 'minutes', true);
        const minutesBetweenSunriseAndNow = nowTime.diff(sunrise, 'minutes', true);
        const solarProgressionInDegrees = Math.round((minutesBetweenSunriseAndNow / minutesBetweenSunriseAndSunset) * 180);

        this.angle = solarProgressionInDegrees - 100;
        setTimeout(() => {
            this.updateSunPosition();
        }, 10);
    }

    private updateSunPosition(angleOverride?: number): void {
        let newAngle: number;
        if (angleOverride) {
            newAngle = angleOverride;
        } else {
            newAngle = this.angle;
        }

        document.getElementById('sun-container').style.transform = 'rotate(' + newAngle + 'deg)';
        document.getElementById('sun-icon').style.transform = 'rotate(' + newAngle + 'deg)';
    }
}
