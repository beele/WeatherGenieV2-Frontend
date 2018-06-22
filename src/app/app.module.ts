import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './components/root/app.component';
import {UrlService} from './services/url.service';
import {HttpClientModule} from '@angular/common/http';
import {WeatherService} from './services/weather.service';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
    providers: [
        UrlService,
        WeatherService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
