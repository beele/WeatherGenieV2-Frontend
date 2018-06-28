import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Moment} from 'moment';
import * as moment from 'moment';
import {SunTile} from '../../../model/tiles/sun-tile';

@Component({
    selector: 'app-sun-tile',
    templateUrl: './sun-tile.component.html',
    styleUrls: ['./sun-tile.component.scss']
})
export class SunTileComponent implements OnInit, OnChanges {

    @Input()
    tileData: SunTile;

    private angle: number;

    constructor() {

    }

    ngOnInit() {

    }

    ngOnChanges() {
        this.updateSunPosition(-100);
        const sunrise: Moment = moment(this.tileData.sunrise);
        const sunset: Moment = moment(this.tileData.sunset);

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
