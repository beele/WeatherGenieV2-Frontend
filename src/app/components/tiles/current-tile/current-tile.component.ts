import {Component, Input, OnInit} from '@angular/core';
import {Tile} from '../../../model/tile';

@Component({
    selector: 'app-current-tile',
    templateUrl: './current-tile.component.html',
    styleUrls: ['./current-tile.component.scss']
})
export class CurrentTileComponent implements OnInit {

    @Input()
    tileData: Tile;

    constructor() {
    }

    ngOnInit() {
    }
}
