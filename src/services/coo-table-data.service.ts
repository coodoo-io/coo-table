import 'rxjs/add/observable/of';

import {EventEmitter, Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {ListingMetadata} from './../model/listing-metadata';
import {ListingParameters} from './../model/listing-query-params.model';
import {ListingResult} from './../model/listing-result';
import {CooTableDataEventSerivce} from './coo-table-data-event.service';

/**
 * @TODO renaming ClientListingDataService
 */
@Injectable()
export abstract class CooTableDataService {
    private _originalData: any;
    private _renderData: any;
    private _resetFilter$: EventEmitter<string> = new EventEmitter<string>();
    private _metaData: ListingMetadata = new ListingMetadata();

    private cooTableDataEventSerivce: CooTableDataEventSerivce = null;
    /**
     *
     * @param data
     */
    constructor(@Inject(Array) data: Array<any> = [], cooTableDataEventService: CooTableDataEventSerivce) {
        this.cooTableDataEventSerivce = cooTableDataEventService;
        this._originalData = [...data ];
        this._renderData = data;
    }

    get renderData(): any {
        return this._renderData;
    }

    set renderData(data: any) {
        this._renderData = data;
    }

    resetData(): void {
        this._renderData = this._originalData;
    }

    set originalData(data: any) {
        this._originalData = [...data ];
        this._renderData = data;
    }
    get originalData(): any {
        return this._originalData;
    }

    get resetFilter(): EventEmitter<string> {
        return this._resetFilter$;
    }
    /**
     *
     * @param queryParams
     * @param columnsToExclude
     */
    public getData(queryParams: ListingParameters, columnsToExclude: Array<string> = []): Observable<any> {
        const listingResult: ListingResult<any> = new ListingResult<any>();
        let tempData: Array<any> = [];
        if (queryParams.filter) {
            tempData = this.filterAll(queryParams, columnsToExclude);
        } else {
            tempData = this.filter(queryParams);
        }

        this._metaData.count = tempData.length;
        this._metaData.currentPage = queryParams.page;
        this._metaData.limit = queryParams.limit;
        this._metaData.numPages = this.countPages(tempData.length, this._metaData.limit);
        this._metaData.startIndex = (this._metaData.currentPage * this._metaData.limit) - this._metaData.limit + 1;
        this._metaData.endIndex = this.calcEndIndex(this._metaData.count, this._metaData.startIndex, this._metaData.limit);
        listingResult.metadata = {...this._metaData };
        listingResult.results = tempData.slice(this._metaData.startIndex - 1, this._metaData.endIndex);

        return Observable.of(listingResult);
    }

    private calcEndIndex(totalCount: number, startIndex: number, limit: number): number {
        const endIndex: number = startIndex + limit - 1;
        return endIndex > totalCount ? totalCount : endIndex;
    }

    private countPages(totalRecords: number, recordsPerPage: number): number {
        let numPages: number = totalRecords / recordsPerPage + (totalRecords % recordsPerPage !== 0 ? 1 : 0);
        if (totalRecords < recordsPerPage) {
            numPages = 1;
        }
        return Math.floor(numPages);
    }

    /**
     *
     * @param queryParams
     * @param columnsToExclude
     */
    private filterAll(queryParams: ListingParameters, columnsToExclude: Array<string> = []): any {
        this.cooTableDataEventSerivce.emitDelete('delete');
        this._renderData = this._originalData.filter((element) => {
            for (const key in element) {
                if (element.hasOwnProperty(key) && columnsToExclude.indexOf(key) === -1 && (`${element[key]}`.toLowerCase().includes(`${queryParams.filter}`.toLowerCase()))) {
                    return true;
                }
            }
            return false;
        });
        return this.sort(queryParams, queryParams.sortColumn);
    }
    /**
     *
     * @param queryParams
     */
    private filter(queryParams: ListingParameters): any {
        this.cooTableDataEventSerivce.emitDelete('delete:search');
        this._renderData = this._originalData.filter((element) => {
            let isValid: boolean = true;
            let isInvalid: boolean = false;
            queryParams.attributeFilters.forEach((value, key) => {
                if (`${element[key]}`.toLowerCase().includes(`${value}`.toLowerCase()) && !isInvalid) {
                    isValid = true;
                } else {
                    isInvalid = true;
                    isValid = false;
                }
            });
            return isValid;
        });

        return this.sort(queryParams, queryParams.sortColumn);
    }
    /**
     *
     * @param queryParams
     * @param columnName
     */
    private sort(queryParams: ListingParameters, columnName: string): any {
        if (columnName && queryParams.sort) {
            this._renderData = this._renderData.sort((a, b) => {

                if (queryParams.sort === 'desc') {
                    if (a[columnName] > b[columnName]) {
                        return 1;
                    } else if (a[columnName] < b[columnName]) {
                        return -1;
                    }

                } else {
                    if (a[columnName] > b[columnName]) {
                        return -1;
                    } else if (a[columnName] < b[columnName]) {
                        return 1;
                    }
                }

                return 0;
            });
        }
        return this._renderData;
    }
}
