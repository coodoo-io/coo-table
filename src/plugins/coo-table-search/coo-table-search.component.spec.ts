/* tslint:disable:no-unused-variable */
import {DebugElement} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';

import {CooTableConfig} from './../../model/coo-table-config.model';
import {ListingParameters} from './../../model/listing-query-params.model';
import {CooTableDataService} from './../../services/coo-table-data.service';
import {CooTableSearchComponent} from './coo-table-search.component';

describe('CooTableSearchComponent', () => {
    let component: CooTableSearchComponent;
    let fixture: ComponentFixture<CooTableSearchComponent>;

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                declarations : [ CooTableSearchComponent ],
                providers : [ { provide : CooTableConfig, useValue : [ false, 'table table-hover' ] }, CooTableDataService, { provide : Array, useValue : [] }, ListingParameters ],
                imports : [ RouterTestingModule ]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CooTableSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
