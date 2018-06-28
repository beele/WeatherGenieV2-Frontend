import {Component, OnInit} from '@angular/core';

import {WeatherService} from '../../services/weather.service';
import {City} from '../../../../../../model/city';
import {Tile} from '../../model/tile';
import {TileTypes} from '../../model/enums/tile-types';

import 'rxjs/Rx';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [
        trigger('fadeInOut', [
            transition(':enter', [
                style({opacity: 0}),
                animate(1000, style({opacity: 1}))
            ]),
            transition(':leave', [
                animate(500, style({opacity: 0}))
            ])
        ])
    ]
})
export class AppComponent implements OnInit {

    selectedCity: City;

    backgroundInterval: number;
    backgrounds: string[];

    currentConditionsTile: Tile;
    predictedConditionsTile: Tile;
    sunTile: Tile;
    windTile: Tile;
    rainTile: Tile;
    lightningTile: Tile;

    constructor(private weatherService: WeatherService) {
        this.backgrounds = [
            'bg-sunshine',
            'bg-sunshine-2',
            'bg-rain',
            'bg-rain-2',
            'bg-shower-rain',
            'bg-mist',
            'bg-few-clouds',
            'bg-few-clouds-2',
            'bg-broken-clouds',
            'bg-snow',
            'bg-thunderstorm'
        ];
    }

    ngOnInit(): void {
        this.setupBackground();

        this.backgroundInterval = setInterval(() => {
            this.setBackground(this.backgrounds[Math.floor((Math.random() * this.backgrounds.length))]);
        }, 5000);
    }

    onCitySelected(city: City): void {
        if (city !== undefined && city !== null) {
            console.log('Selected city: ' + city.name + ' id: ' + city.id);

            this.selectedCity = city;

            this.weatherService.getForecast(city.id).subscribe((tiles: Tile[]) => {
                for (const tile of tiles) {
                    switch (tile.type) {
                        case TileTypes.CURRENT:
                            this.determineBackground(tile);
                            this.currentConditionsTile = tile;
                            break;
                        case TileTypes.FORECAST:
                            this.predictedConditionsTile = tile;
                            break;
                        case TileTypes.SUN:
                            this.sunTile = tile;
                            break;
                        case TileTypes.WIND:
                            this.windTile = tile;
                            break;
                        case TileTypes.RAIN:
                            this.rainTile = tile;
                            break;
                        case TileTypes.LIGHTNING:
                            this.lightningTile = tile;
                            break;
                    }
                }
            });
        }
    }

    private setupBackground(): void {
        this.setBackground(this.backgrounds[Math.floor((Math.random() * this.backgrounds.length))]);
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundPosition = 'center center';
        document.body.style.backgroundAttachment = 'fixed';
    }

    private determineBackground(tile: Tile): void {
        if (tile) {
            // TODO: Determine and set background!
            // clearInterval(this.backgroundInterval);
        }
    }

    private setBackground(bgFilename: string): void {
        document.body.style.backgroundImage = 'url(assets/img/backgrounds/' + bgFilename + '.jpg)';
    }
}
