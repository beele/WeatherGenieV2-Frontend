import {Component, Input, OnInit} from '@angular/core';
import {ForecastedConditionsTile} from '../../../model/tiles/forecasted-conditions-tile';
import {ConditionUtils} from '../../../utils/condition-utils';

@Component({
    selector: 'app-predicted-tile',
    templateUrl: './predicted-tile.component.html',
    styleUrls: ['./predicted-tile.component.scss']
})
export class PredictedTileComponent implements OnInit {

    @Input()
    tileData: ForecastedConditionsTile;

    public conditionFn: Function;

    constructor() {
        this.conditionFn = ConditionUtils.getConditionSvgName;
    }

    ngOnInit() {
    }
}
