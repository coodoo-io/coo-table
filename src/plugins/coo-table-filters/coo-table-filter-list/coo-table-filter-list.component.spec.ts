/* tslint:disable:no-unused-variable */
import {DebugElement} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';

import {CooTableDataEventSerivce} from '../../../services/coo-table-data-event.service';

import {CooTableService} from './../../../coo-table.service';
import {CooTableConfig} from './../../../model/coo-table-config.model';
import {ListingParameters} from './../../../model/listing-query-params.model';
import {CooTableFilterTextComponent} from './../coo-table-filter-text/coo-table-filter-text.component';

describe('CooTableFilterListComponent', () => {
    let component: CooTableFilterTextComponent;
    let fixture: ComponentFixture<CooTableFilterTextComponent>;

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                declarations : [ CooTableFilterTextComponent ],
                providers : [
                    CooTableDataEventSerivce, { provide : Array, useValue : [] }, { provide : CooTableConfig, useValue : [ false, 'table table-hover' ] }, CooTableService,
                    ListingParameters
                ],
                imports : [ RouterTestingModule ]
            })
            .compileComponents();
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
