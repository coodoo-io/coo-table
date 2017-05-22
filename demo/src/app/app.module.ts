import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {MainComponent} from './main.component';
import {CooTableModule} from './modules/table/index';
import {WineService} from './wines/wine.service';

@NgModule({
    declarations : [ AppComponent, MainComponent ],
    imports : [
        BrowserModule, FormsModule, HttpModule, CooTableModule,
        RouterModule.forRoot([ { path : '', pathMatch : 'full', component : AppComponent }, { redirectTo : '', path : 'foo' } ], { useHash : true })
    ],
    providers : [ WineService ],
    bootstrap : [ MainComponent ]
})
export class AppModule {
}
