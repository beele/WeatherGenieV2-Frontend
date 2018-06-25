import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';

import {WeatherService} from '../../services/weather.service';
import {City} from '../../../../../../model/city';
import {Tile} from '../../model/tile';

import 'rxjs/Rx';
import {Observable} from 'rxjs/internal/Observable';
import {debounceTime} from 'rxjs/operators';
import {from} from 'rxjs/internal/observable/from';

import {BsDropdownDirective} from 'ngx-bootstrap';
import {TileTypes} from '../../model/enums/tile-types';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    cities: Observable<City[]> = from([]);
    citySearchFormControl: FormControl = new FormControl();
    selectedCity: City;

    @ViewChild(BsDropdownDirective)
    dropdown: BsDropdownDirective;

    currentConditionsTile: Tile;
    predictedConditionsTile: Tile;
    sunTile: Tile;
    windTile: Tile;
    rainTile: Tile;
    lightningTile: Tile;

    constructor(private weatherService: WeatherService) {

    }

    ngOnInit(): void {
        document.body.style.backgroundImage = 'url(assets/img/bg-rain.jpg)';
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundPosition = 'center center';
        document.body.style.backgroundAttachment = 'fixed';

        setInterval(() => {
            document.body.style.backgroundImage = 'url(assets/img/bg-sunshine.jpg)';
        }, 1000);

        this.citySearchFormControl.valueChanges.pipe(debounceTime(250)).subscribe((partialCityName) => {
            if (!this.dropdown.isOpen) {
                this.dropdown.show();
            }
            this.cities = this.weatherService.getCities(partialCityName);
        });
    }

    onCitySelected(city: City): void {
        if (city !== undefined && city !== null) {
            this.selectedCity = city;
            this.dropdown.hide();
            console.log('Selected city: ' + city.name + ' id: ' + city.id);
            this.weatherService.getForecast(city.id).subscribe((tiles: Tile[]) => {
                for (const tile of tiles) {
                    switch (tile.type) {
                        case TileTypes.CURRENT:
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
                        case TileTypes.THUNDER:
                            this.lightningTile = tile;
                            break;
                    }
                }
            });
        }
    }

    showAutoComplete(): void {
        this.dropdown.show();
    }
}
