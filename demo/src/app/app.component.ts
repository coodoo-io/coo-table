import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {forEach} from '@angular/router/src/utils/collection';

import {CooTableConfig} from '../../../src/model/coo-table-config.model';

import {CooTableService} from './modules/table/coo-table.service';
import {ListingMetadata} from './modules/table/model/listing-metadata';
import {ListingParameters} from './modules/table/model/listing-query-params.model';
import {ListingResult} from './modules/table/model/listing-result';
import {CooTableFilterEvent} from './modules/table/plugins/coo-table-filters/coo-table-filter.event';
import {CooTablePagerEvent} from './modules/table/plugins/coo-table-pager/coo-table-pager.event';
import {CooTableRowSelectEvent} from './modules/table/plugins/coo-table-rowselect/coo-table-rowselect.event';
import {CooTableSearchEvent} from './modules/table/plugins/coo-table-search/coo-table-search.event';
import {CooTableSorterEvent} from './modules/table/plugins/coo-table-sorter/coo-table-sorter.event';
import {Wine} from './wines/wine';
import {WineService} from './wines/wine.service';

@Component({ selector : '', templateUrl : './app.component.html', styleUrls : [ './app.component.css' ], providers : [ CooTableService ] })
export class AppComponent {
    metadata: ListingMetadata;
    limit: number = 10;
    rows: Array<Wine> = [];
    public update = false;
    private _doubleClicked: Array<any> = [];

    constructor(private cooTableService: CooTableService, private wineService: WineService, private _activeRoute: ActivatedRoute, private _queryParams: ListingParameters,
                cooTableConfig: CooTableConfig) {
        cooTableConfig.routeChange = true;
        this._queryParams.limit = this.limit;
        this._queryParams.page = 1;

        wineService.getAllWines(this._queryParams).subscribe((listingResult: ListingResult<Wine>) => {
            this.metadata = listingResult.metadata;
            this.rows = listingResult.results;
            const querySubscription = _activeRoute.queryParams.subscribe(data => {
                console.log(data);

                if (data.page) {
                    this._queryParams.page = data.page;
                }

                // querySubscription.unsubscribe();
                if (data.sort && data.columName && !data.search && !data.filter) {
                    // Only Sort
                    this._queryParams.sort = data.sort;
                    this._queryParams.sortColumn = data.columName;
                    wineService.sortWines(this._queryParams, data.columName).subscribe((listingResult: ListingResult<Wine>) => {
                        this.metadata = listingResult.metadata;
                        this.rows = listingResult.results;
                    });
                } else if (data.search && !data.filter) {
                    this._queryParams.sort = data.sort;
                    this._queryParams.sortColumn = data.columName;
                    this._queryParams.filter = data.search;
                    this.wineService.filterAllColumns(this._queryParams).subscribe((listingResult: ListingResult<Wine>) => {
                        this.metadata = listingResult.metadata;
                        this.rows = listingResult.results;
                    });
                } else if (!data.search && data.filter) {
                    this._queryParams.sort = data.sort;
                    this._queryParams.sortColumn = data.columName;
                    const filterJSON = JSON.parse(data.filter);
                    for (const i in filterJSON) {
                        console.log(filterJSON[i]);
                        this._queryParams.attributeFilters.set(filterJSON[i]['column'], filterJSON[i]['filterValue']);
                    }
                    this.wineService.filterWines(this._queryParams).subscribe((listingResult: ListingResult<Wine>) => {
                        this.metadata = listingResult.metadata;
                        this.rows = listingResult.results;
                    });
                }

            });
            querySubscription.unsubscribe();
        });
    }

    onClick(column) {
        // In our example we show you how you can implement double and on click on the same row
        // Best idea is to get all the click events in an array and reset them if the double click is hit
        // Set the timout time to your needs
        const timeout = setTimeout(() => {

            let selectRow: boolean = true;
            if (this.cooTableService.getSelectedRows().get(column.id)) {
                selectRow = false;
            }
            this.cooTableService.selectRow(new CooTableRowSelectEvent(column.id, selectRow, column));
            this.update = !this.update;
        }, 200);
        this._doubleClicked.push(timeout);
    }

    onDoubleClick(row) {
        this._doubleClicked.forEach((doubleClicks) => {
            clearTimeout(doubleClicks);
        });
        alert('Detail Ansicht für: ' + row.id);
        // this.jTableService.cellDoubleClicked(row);
    }

    onTableChanged() {
    }
    filterTable(event: CooTableFilterEvent) {
        console.log('Filter: ', event);
        this._queryParams.attributeFilters.set(event.column, event.value);
        if (event.value === '' || !event.value) {
            this._queryParams.attributeFilters.delete(event.column);
        }

        this._queryParams.page = 1;

        this.wineService.filterWines(this._queryParams).subscribe((listingResult: ListingResult<Wine>) => {
            this.metadata = listingResult.metadata;
            this.rows = listingResult.results;
        });
    }
    sortTable(event: CooTableSorterEvent) {
        console.log('Sort:', event);
        this._queryParams.sort = event.sort;
        this._queryParams.sortColumn = event.field;
        this.wineService.sortWines(this._queryParams, event.field).subscribe((listingResult: ListingResult<Wine>) => {
            this.metadata = listingResult.metadata;
            this.rows = listingResult.results;
        });
    }
    /**
     * On Search we will filter with or on any possible column
     */
    onSearch(event: CooTableSearchEvent): void {
        console.log(event);
        this._queryParams.filter = event.value;
        this._queryParams.attributeFilters.clear();

        this._queryParams.page = 1;
        this.wineService.filterAllColumns(this._queryParams).subscribe((listingResult: ListingResult<Wine>) => {
            this.metadata = listingResult.metadata;
            this.rows = listingResult.results;
        });
    }

    public loadPage(event: CooTablePagerEvent) {

        this._queryParams.limit = this.limit;
        this._queryParams.page = event.page;
        this.wineService.getAllWines(this._queryParams).subscribe((listingResult: ListingResult<Wine>) => {
            this.metadata = listingResult.metadata;
            this.rows = listingResult.results;
        })
    }

    public onAllSelect(event: string): void {
        if (event === 'UPDATE::SELECTED') {
            this.update = !this.update;
        }
    }
}
