import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';

import {CooTableService} from './../../coo-table.service';
import {CooTableConfig} from './../../model/coo-table-config.model';
import {ListingParameters} from './../../model/listing-query-params.model';
import {CooTableRouteUpdateComponent} from './../coo-table-route-update/coo-table-route-update.component';
import {CooTableSorterEvent} from './coo-table-sorter.event';

@Component({ selector : 'coo-table-sorter', templateUrl : './coo-table-sorter.component.html', styleUrls : [ './coo-table-sorter.component.css' ] })
export class CooTableSorterComponent extends CooTableRouteUpdateComponent implements OnInit {
    currentSortOption: string;
    sortOptions: Array<string> = [ 'asc', 'desc' ];
    counter: number = -1;

    /**
     *  Name of Column
     */
    @Input()
    label: string;

    /**
     *  Name of column which is meant to be sorted.
     */
    @Input()
    columnName: string;
    /**
     *
     */
    @Input()
    columnType: string = 'number';

    /**
     *  Current Direction
     */
    // @Input() value: string;

    /**
     *  An event fired when the sort direction is changed.
     *  Event's payload equals to the newly selected sort direction.
     */
    @Output()
    onSort: EventEmitter<CooTableSorterEvent> = new EventEmitter<CooTableSorterEvent>(true);

    constructor(private cooTableService: CooTableService, _router: Router, _activeRoute: ActivatedRoute, cooTableConfig: CooTableConfig, private _queryParams: ListingParameters) {
        super(_router, _activeRoute, cooTableConfig);
        // this.currentSortOption = this.value;
        cooTableService.sortChanged$.subscribe((sorter: CooTableSorterEvent) => {
            if (sorter.field !== this.columnName) {
                console.log('Reseting Sorter: ' + this.columnName);
                this.currentSortOption = null;
            }
        });
    }

    sort(): void {
        if (this.counter !== 0) {
            this.counter = 0;
        } else {
            this.counter = 1;
        }

        this.currentSortOption = this.sortOptions[this.counter];

        const sortEvent: CooTableSorterEvent = new CooTableSorterEvent(this.columnName, this.currentSortOption);
        this.cooTableService.sortChanged(sortEvent);
        this.onSort.emit(sortEvent);
        super.updateRouteForSort(this.currentSortOption, this.columnName);
    }

    ngOnInit(): void {
        if (this._queryParams.sortColumn === this.columnName) {
            this.currentSortOption = this._queryParams.sort;
        }
    }
}
