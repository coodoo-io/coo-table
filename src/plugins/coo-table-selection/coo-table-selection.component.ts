import {Component, Input, OnInit} from '@angular/core';

import {CooTableService} from './../../coo-table.service';
import {CooTableRowSelectEvent} from './../coo-table-rowselect/coo-table-rowselect.event';

@Component({ selector : 'coo-table-selection', templateUrl : './coo-table-selection.component.html', styleUrls : [ './coo-table-selection.component.css' ] })
export class CooTableSelectionComponent {
    items: Map<number, CooTableRowSelectEvent>;
    @Input()
    label: string;

    constructor(private cooTableService: CooTableService) {
        cooTableService.selectRow$.subscribe((row: CooTableRowSelectEvent) => {
            console.log('Recevied Event, Selected: ', row);
            this.items = cooTableService.getSelectedRows();
        });
    }
}
