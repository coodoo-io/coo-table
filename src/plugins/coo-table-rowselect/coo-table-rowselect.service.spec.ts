/* tslint:disable:no-unused-variable */

import {async, inject, TestBed} from '@angular/core/testing';

import {CooTableService} from './../../coo-table.service';

describe('Service: CooTableRowSelect', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({providers: [CooTableService]});
  });

  it('should ...', inject([CooTableService], (service: CooTableService) => {
       expect(service).toBeTruthy();
     }));
});
