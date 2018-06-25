import {Component, Input, OnInit} from '@angular/core';
import {Tile} from '../../../model/tile';

@Component({
    selector: 'app-wind-tile',
    templateUrl: './wind-tile.component.html',
    styleUrls: ['./wind-tile.component.scss']
})
export class WindTileComponent implements OnInit {

    @Input()
    tileData: Tile;

    constructor() {
    }

    ngOnInit() {
    }
}
