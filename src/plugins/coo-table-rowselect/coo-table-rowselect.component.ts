import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {SimpleChange} from '@angular/core/core';
import {forEach} from '@angular/router/src/utils/collection';

import {CooTableService} from './../../coo-table.service';
import {CooTableRowSelectEvent} from './coo-table-rowselect.event';

@Component({ selector : 'coo-table-rowselect', templateUrl : './coo-table-rowselect.component.html', styleUrls : [ './coo-table-rowselect.component.css' ] })
export class CooTableRowSelectComponent implements OnChanges {
    @Input()
    rowSelected: boolean = false;

    @Input()
    rowId: number;

    @Input()
    row: any;
    /**
     * A flag to determine to update the view
     */
    @Input()
    update: boolean;

    constructor(private cooTableService: CooTableService) {
    }

    ngOnChanges(simpleChange: SimpleChanges): void {
        if (this.row) {
            if (this.cooTableService.getSelectedRows().get(this.row.id)) {
                this.rowSelected = true;
            } else {
                this.rowSelected = false;
            }
        } else {
            if (this.cooTableService.getSelectedRows().get(this.rowId)) {
                this.rowSelected = true;
            } else {
                this.rowSelected = false;
            }
        }
    }

    clickHandler(): void {
        this.rowSelected = !this.rowSelected;
        if (this.row) {
            this.cooTableService.selectRow(new CooTableRowSelectEvent(this.row.id, this.rowSelected, this.row));
        } else {
            this.cooTableService.selectRow(new CooTableRowSelectEvent(this.rowId, this.rowSelected));
        }
    }
}
