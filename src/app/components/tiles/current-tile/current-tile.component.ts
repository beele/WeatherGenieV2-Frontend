import {Component, Input, OnInit} from '@angular/core';
import {CurrentConditionsTile} from '../../../model/tiles/current-conditions-tile';
import {ConditionUtils} from '../../../utils/condition-utils';

@Component({
    selector: 'app-current-tile',
    templateUrl: './current-tile.component.html',
    styleUrls: ['./current-tile.component.scss']
})
export class CurrentTileComponent implements OnInit {

    @Input()
    tileData: CurrentConditionsTile;

    public conditionFn: Function;

    constructor() {
        this.conditionFn = ConditionUtils.getConditionSvgName;
    }

    ngOnInit() {
    }
}
