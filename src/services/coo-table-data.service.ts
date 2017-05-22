import {EventEmitter, Inject, Injectable} from '@angular/core';

import {ListingParameters} from './../model/listing-query-params.model';

/**
 * @TODO renaming ClientListingDataService
 */
@Injectable()
export class CooTableDataService {
    private _originalData: any;
    private _renderData: any;
    private _resetFilter$: EventEmitter<string> = new EventEmitter<string>();
    /**
     *
     * @param data
     */
    constructor(@Inject(Array) data: Array<any> = []) {
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
    public filterAll(queryParams: ListingParameters, columnsToExclude: Array<string> = []): any {
        this._resetFilter$.emit('delete');
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
    public filter(queryParams: ListingParameters): any {
        this._resetFilter$.emit('delete:search');
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
    public sort(queryParams: ListingParameters, columnName: string): any {
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
