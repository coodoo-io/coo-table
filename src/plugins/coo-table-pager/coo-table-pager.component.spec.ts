/* tslint:disable:no-unused-variable */
import {DebugElement} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';

import {CooTableService} from './../../coo-table.service';
import {CooTableConfig} from './../../model/coo-table-config.model';
import {ListingParameters} from './../../model/listing-query-params.model';
import {CooTableDataService} from './../../services/coo-table-data.service';
import {CooTablePagerComponent} from './coo-table-pager.component';

describe('CooTablePagerComponent', () => {
    let component: CooTablePagerComponent;
    let fixture: ComponentFixture<CooTablePagerComponent>;

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                declarations : [ CooTablePagerComponent ],
                providers : [
                    CooTableDataService, { provide : Array, useValue : [] }, { provide : CooTableConfig, useValue : [ false, 'table table-hover' ] }, CooTableService,
                    ListingParameters
                ],
                imports : [ RouterTestingModule ]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CooTablePagerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
