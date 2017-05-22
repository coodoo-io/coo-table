/* tslint:disable:no-unused-variable */
import {DebugElement} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {CooTableService} from '../../coo-table.service';

import {CooTableRowSelectComponent} from './coo-table-rowselect.component';

describe('CooTableRowSelectComponent', () => {
  let component: CooTableRowSelectComponent;
  let fixture: ComponentFixture<CooTableRowSelectComponent>;

  beforeEach(async(() => {
    TestBed
        .configureTestingModule({
          declarations: [CooTableRowSelectComponent],
          providers: [CooTableService]
        })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CooTableRowSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
