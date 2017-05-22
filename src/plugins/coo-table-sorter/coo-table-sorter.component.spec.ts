/* tslint:disable:no-unused-variable */
import {DebugElement} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';

import {CooTableService} from './../../coo-table.service';
import {CooTableConfig} from './../../model/coo-table-config.model';
import {ListingParameters} from './../../model/listing-query-params.model';
import {CooTableDataService} from './../../services/coo-table-data.service';
import {CooTableSorterComponent} from './coo-table-sorter.component';

describe('CooTableSorterComponent', () => {
    let component: CooTableSorterComponent;
    let fixture: ComponentFixture<CooTableSorterComponent>;

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                declarations : [ CooTableSorterComponent ],
                providers : [
                    CooTableDataService, { provide : Array, useValue : [] }, { provide : CooTableConfig, useValue : [ false, 'table table-hover' ] }, CooTableService,
                    ListingParameters
                ],
                imports : [ RouterTestingModule ]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CooTableSorterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
