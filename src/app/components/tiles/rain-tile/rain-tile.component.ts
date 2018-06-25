import {Component, Input, OnInit} from '@angular/core';
import {Tile} from '../../../model/tile';

@Component({
    selector: 'app-rain-tile',
    templateUrl: './rain-tile.component.html',
    styleUrls: ['./rain-tile.component.scss']
})
export class RainTileComponent implements OnInit {

    @Input()
    tileData: Tile;

    constructor() {
    }

    ngOnInit() {
    }
}
