/* tslint:disable:no-unused-variable */
import {DebugElement} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';

import {CooTableService} from './../../../coo-table.service';
import {CooTableConfig} from './../../../model/coo-table-config.model';
import {ListingParameters} from './../../../model/listing-query-params.model';
import {CooTableDataService} from './../../../services/coo-table-data.service';
import {CooTableFilterTextComponent} from './coo-table-filter-text.component';

describe('CooTableFilterTextComponent', () => {
    let component: CooTableFilterTextComponent;
    let fixture: ComponentFixture<CooTableFilterTextComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations : [ CooTableFilterTextComponent ],
            providers : [
                CooTableService, CooTableDataService, { provide : Array, useValue : [] }, { provide : CooTableConfig, useValue : [ false, 'table table-hover' ] }, ListingParameters
            ],
            imports : [ RouterTestingModule ]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CooTableFilterTextComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
