import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './components/root/app.component';
import {UrlService} from './services/url.service';
import {HttpClientModule} from '@angular/common/http';
import {WeatherService} from './services/weather.service';
import {ReactiveFormsModule} from '@angular/forms';
import {SunTileComponent} from './components/tiles/sun-tile/sun-tile.component';
import {BsDropdownModule} from 'ngx-bootstrap';
import { CurrentTileComponent } from './components/tiles/current-tile/current-tile.component';
import { PredictedTileComponent } from './components/tiles/predicted-tile/predicted-tile.component';
import { RainTileComponent } from './components/tiles/rain-tile/rain-tile.component';
import { LightningTileComponent } from './components/tiles/lightning-tile/lightning-tile.component';
import { WindTileComponent } from './components/tiles/wind-tile/wind-tile.component';
import { SearchComponent } from './components/search/search.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        AppComponent,
        SunTileComponent,
        CurrentTileComponent,
        PredictedTileComponent,
        RainTileComponent,
        LightningTileComponent,
        WindTileComponent,
        SearchComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,
        BsDropdownModule.forRoot()
    ],
    providers: [
        UrlService,
        WeatherService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
