import {Component, Input, OnInit} from '@angular/core';
import {Tile} from '../../../model/tile';

@Component({
    selector: 'app-lightning-tile',
    templateUrl: './lightning-tile.component.html',
    styleUrls: ['./lightning-tile.component.scss']
})
export class LightningTileComponent implements OnInit {

    @Input()
    tileData: Tile;

    constructor() {
    }

    ngOnInit() {
    }
}
