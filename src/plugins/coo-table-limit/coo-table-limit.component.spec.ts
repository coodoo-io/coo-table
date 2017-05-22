/* tslint:disable:no-unused-variable */
import {DebugElement} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {CooTableLimitComponent} from './coo-table-limit.component';

describe('CooTableLimitComponent', () => {
  let component: CooTableLimitComponent;
  let fixture: ComponentFixture<CooTableLimitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({declarations: [CooTableLimitComponent]})
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CooTableLimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
