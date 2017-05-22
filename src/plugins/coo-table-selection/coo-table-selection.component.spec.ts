/* tslint:disable:no-unused-variable */
import {DebugElement} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {CooTableService} from './../../coo-table.service';
import {CooTableSelectionComponent} from './coo-table-selection.component';

describe('CooTableSelectionComponent', () => {
  let component: CooTableSelectionComponent;
  let fixture: ComponentFixture<CooTableSelectionComponent>;

  beforeEach(async(() => {
    TestBed
        .configureTestingModule({
          declarations: [CooTableSelectionComponent],
          providers: [CooTableService]
        })
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CooTableSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
