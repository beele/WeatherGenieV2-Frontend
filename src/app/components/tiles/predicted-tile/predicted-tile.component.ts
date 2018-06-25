import {Component, Input, OnInit} from '@angular/core';
import {Tile} from '../../../model/tile';

@Component({
    selector: 'app-predicted-tile',
    templateUrl: './predicted-tile.component.html',
    styleUrls: ['./predicted-tile.component.scss']
})
export class PredictedTileComponent implements OnInit {

    @Input()
    tileData: Tile;

    constructor() {
    }

    ngOnInit() {
    }
}
