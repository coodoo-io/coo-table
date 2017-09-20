import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {forEach} from '@angular/router/src/utils/collection';
import * as webpack from 'webpack';

import {CooTableComponent} from '../../../src/coo-table.component';
import {CooTableConfig} from '../../../src/model/coo-table-config.model';
import {ListingMetadata} from '../../../src/model/listing-metadata';

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

@Component({ selector : '', templateUrl : './app.component.html', styleUrls : [ './app.component.css' ] })
export class AppComponent extends CooTableComponent {

    limit: number = 10;
    rows: Array<Wine> = [];
    metadata: ListingMetadata;
    public update = false;
    private _doubleClicked: Array<any> = [];

    constructor(_cooTableService: CooTableService, private wineService: WineService, private _activeRoute: ActivatedRoute, _cooTableConfig: CooTableConfig) {
        super();
        _cooTableConfig.routeChange = true;
        this.config = _cooTableConfig;
        this.cooTableService = _cooTableService;
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

    public onAllSelect(event: string): void {
        if (event === 'UPDATE::SELECTED') {
            this.update = !this.update;
        }
    }

    list() {
        this.wineService.getData(this.listinQueryParams).subscribe((data) => {
            this.metadata = data.metadata;
            this.rows = data.results;
        });
    }
}
