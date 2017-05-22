/* tslint:disable:no-unused-variable */
import {DebugElement} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {CooTableCounterComponent} from './plugins/coo-table-counter/coo-table-counter.component';

describe('CooTableCounterComponent', () => {
  let component: CooTableCounterComponent;
  let fixture: ComponentFixture<CooTableCounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({declarations: [CooTableCounterComponent]})
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CooTableCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
