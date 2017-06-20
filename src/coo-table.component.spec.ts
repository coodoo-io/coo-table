/* tslint:disable:no-unused-variable */
import {DebugElement} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {CooTableComponent} from './coo-table.component';

class CooTableComponentMock extends CooTableComponent {}

describe('CooTableCounterComponent', () => {
    let component: CooTableComponentMock;
    let fixture: ComponentFixture<CooTableComponentMock>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({ declarations : [ CooTableComponentMock ] }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CooTableComponentMock);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
