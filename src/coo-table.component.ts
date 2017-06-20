import {AfterContentInit, AfterViewInit, Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {CooTableService} from './coo-table.service';
import {CooTableConfig} from './model/coo-table-config.model';
import {ListingParameters} from './model/listing-query-params.model';
import {CooTableFilterEvent} from './plugins/coo-table-filters/coo-table-filter.event';
import {CooTablePagerEvent} from './plugins/coo-table-pager/coo-table-pager.event';
import {CooTableRowSelectEvent} from './plugins/coo-table-rowselect/coo-table-rowselect.event';
import {CooTableSearchEvent} from './plugins/coo-table-search/coo-table-search.event';
import {CooTableSorterEvent} from './plugins/coo-table-sorter/coo-table-sorter.event';
import {CooTableDataService} from './services/coo-table-data.service';

@Component({ selector : 'coo-table', templateUrl : './coo-table.component.html' })
export class CooTableComponent implements OnInit, AfterContentInit {
    hasCustomHeaderTemplate: boolean = true;
    hasCustomRowTemplate: boolean = true;
    headerRow: Array<string> = [];

    limit: number;

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
    public cooTableService: CooTableService;

    public listinQueryParams: ListingParameters = new ListingParameters();

    constructor() {
    }

    public isSelected(rowId: number): boolean {
        if (this.cooTableService && this.cooTableService.selectedRows.get(rowId)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     *
     */
    ngOnInit(): void {
        console.log(this.config);
        if (this.rows && this.rows[0]) {
            this.headerRow = Object.keys(this.rows[0]);
        }
    }

    /**
     *
     */
    ngAfterContentInit(): void {
        this.currentRow = [ { ref : this.row } ];
    }

    /**
     *
     * @param event
     */
    filterTable(event: CooTableFilterEvent): void {
        this.listinQueryParams.attributeFilters.set(event.column, event.value);
        if (event.value === '' || !event.value) {
            this.listinQueryParams.attributeFilters.delete(event.column);
        }

        this.listinQueryParams.page = 1;
        this.list();
    }
    /**
     *
     * @param event
     */
    sortTable(event: CooTableSorterEvent): void {
        this.listinQueryParams.sort = event.sort;
        this.listinQueryParams.sortColumn = event.field;
        this.list();
    }
    /**
     * On Search we will filter with or on any possible column
     */
    onSearch(event: CooTableSearchEvent): void {
        this.listinQueryParams.filter = event.value;
        this.listinQueryParams.attributeFilters.clear();

        this.listinQueryParams.page = 1;
        this.list();
    }

    loadPage(event: CooTablePagerEvent): void {

        this.listinQueryParams.limit = this.limit;
        this.listinQueryParams.page = event.page;
        this.list();
    }
    /**
     *
     */
    list(): any{};
}
