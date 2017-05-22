/* tslint:disable:no-unused-variable */
import {DebugElement} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {CooTableLoadingDirective} from './coo-table-loading.component';

xdescribe('CooTableLoadingComponent', () => {
  let component: CooTableLoadingDirective;
  let fixture: ComponentFixture<CooTableLoadingDirective>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({declarations: [CooTableLoadingDirective]})
        .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CooTableLoadingDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
