/* tslint:disable:no-unused-variable */
import {DebugElement} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {CooTableActiveFiltersComponent} from './coo-table-activefilters.component';

describe('CooTableFiltersActiveComponent', () => {
  let component: CooTableActiveFiltersComponent;
  let fixture: ComponentFixture<CooTableActiveFiltersComponent>;

  beforeEach(async(() => {
    TestBed
        .configureTestingModule(
            {declarations: [CooTableActiveFiltersComponent]})
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CooTableActiveFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
