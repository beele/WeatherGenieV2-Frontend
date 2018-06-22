import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

import {WeatherService} from '../../services/weather.service';
import {City} from '../../../../../../model/city';

import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Tile} from '../../model/tile';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    cities: Observable<City[]>;
    citySearchFormControl: FormControl = new FormControl();
    selectedCity: City;

    tiles: Observable<Tile[]>;

    constructor(private weatherService: WeatherService) {

    }

    ngOnInit(): void {
        this.citySearchFormControl.valueChanges.debounceTime(500).subscribe((partialCityName) => {
            this.cities = this.weatherService.getCities(partialCityName);
        });
    }

    onCitySelected(city: City): void {
        this.selectedCity = city;
        console.log('Selected city: ' + city.name + ' id: ' + city.id);
        this.tiles = this.weatherService.getForecast(city.id);
    }
}
