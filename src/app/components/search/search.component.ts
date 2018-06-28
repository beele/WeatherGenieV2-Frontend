import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';

import {BsDropdownDirective} from 'ngx-bootstrap';

import {Observable} from 'rxjs/internal/Observable';
import {from} from 'rxjs/internal/observable/from';
import {debounceTime} from 'rxjs/operators';

import {City} from '../../../../../../model/city';
import {WeatherService} from '../../services/weather.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    cities$: Observable<City[]>;
    citySearchFormControl: FormControl;
    selectedCity: City;

    @ViewChild(BsDropdownDirective)
    dropdown: BsDropdownDirective;

    @Output('citySelected')
    emitter: EventEmitter<City> = new EventEmitter<City>();

    constructor(private weatherService: WeatherService) {
        this.cities$ = from([]);
        this.citySearchFormControl = new FormControl();
    }

    ngOnInit() {
        this.citySearchFormControl.valueChanges.pipe(debounceTime(250)).subscribe((partialCityName) => {
            if (!this.dropdown.isOpen) {
                this.dropdown.show();
            }
            this.cities$ = this.weatherService.getCities(partialCityName);
        });
    }

    showAutoComplete(): void {
        this.dropdown.show();
    }

    hideAutoComplete(event: FocusEvent): void {
        if (!event.relatedTarget) {
            this.dropdown.hide();
        }
    }

    onCitySelected(city: City): void {
        if (city !== undefined && city !== null) {
            this.selectedCity = city;
            this.dropdown.hide();
            this.emitter.emit(this.selectedCity);
        }
    }
}
