import {AfterContentInit, AfterViewInit, Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {CooTableService} from './coo-table.service';
import {CooTableConfig} from './model/coo-table-config.model';
import {ListingParameters} from './model/listing-query-params.model';
import {CooTableRowSelectEvent} from './plugins/coo-table-rowselect/coo-table-rowselect.event';
import {CooTableSorterEvent} from './plugins/coo-table-sorter/coo-table-sorter.event';
import {CooTableDataService} from './services/coo-table-data.service';

@Component({ selector : 'coo-table', templateUrl : './coo-table.component.html' })
export class CooTableComponent implements OnInit, AfterContentInit {
    hasCustomHeaderTemplate: boolean = true;
    hasCustomRowTemplate: boolean = true;
    headerRow: Array<string> = [];
    @ContentChild('header', TemplateRef)
    header: TemplateRef<string>;
    @ContentChild('filters', TemplateRef)
    filters: TemplateRef<string>;
    @Input()
    rows: any[];
    currentRow: any[];
    @Output()
    tableChanged: any = new EventEmitter<string>();

    @ContentChild('row')
    row: TemplateRef<string>;

    public config: CooTableConfig;

    constructor(private cooTableService: CooTableService, private _config: CooTableConfig) {
        // Register Event-Handler
        cooTableService.selectRow$.subscribe((row: CooTableRowSelectEvent) => {
            console.log('Recevied Event, Selected: ', row);
        });

        cooTableService.sortChanged$.subscribe((sorter: CooTableSorterEvent) => {
            console.log('Recevied Event, Sorting: ', sorter);
        });

        this.config = _config;
    }

    public isSelected(rowId: number): boolean {
        if (this.cooTableService.selectedRows.get(rowId)) {
            return true;
        } else {
            return false;
        }
    }

    ngOnInit(): void {
        if (this.rows && this.rows[0]) {
            this.headerRow = Object.keys(this.rows[0]);
        }
    }

    ngAfterContentInit(): void {
        this.currentRow = [ { ref : this.row } ];
    }
}
