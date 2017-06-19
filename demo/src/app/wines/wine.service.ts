import {Injectable} from '@angular/core';
import {Http, Response, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import {ListingMetadata} from './../modules/table/model/listing-metadata';
import {ListingParameters} from './../modules/table/model/listing-query-params.model';
import {ListingResult} from './../modules/table/model/listing-result';
import {CooTableDataService} from './../modules/table/services/coo-table-data.service';
import {Wine} from './wine';
import {topWines} from './wines.data';

@Injectable()
export class WineService {
    top100Wines: Array<Wine> = [];
    metaData = new ListingMetadata();
    constructor(private http: Http, private _dataService: CooTableDataService) {
        this.loadWines();
    }
    public filterAllColumns(queryParams: ListingParameters): Observable<ListingResult<Wine>> {
        return this._dataService.getData(queryParams, '', [ 'id' ]);
    }
    /**
     *
     * @param queryParams
     */
    public filterWines(queryParams: ListingParameters): Observable<ListingResult<Wine>> {
        return this._dataService.getData(queryParams);
    }
    /**
     *
     * @param queryParams
     * @param columnName
     */
    public sortWines(queryParams: ListingParameters, columnName: string): Observable<ListingResult<Wine>> {

        return this._dataService.getData(queryParams, columnName);
    }

    public getAllWines(queryParams: ListingParameters): Observable<ListingResult<Wine>> {
        return this._dataService.getData(queryParams);
    }

    private countPages(totalRecords: number, recordsPerPage: number): number {
        let numPages = totalRecords / recordsPerPage + (totalRecords % recordsPerPage !== 0 ? 1 : 0);
        if (totalRecords < recordsPerPage) {
            numPages = 1;
        }
        return Math.floor(numPages);
    }

    private calcEndIndex(totalCount: number, startIndex: number, limit: number) {
        let endIndex: number = startIndex + limit - 1;
        return endIndex > totalCount ? totalCount : endIndex;
    }

    private loadWines() {
        // Load Data here and store it to the data service
        topWines.forEach((wine) => {
            this.top100Wines.push(
                new Wine(wine['id'], wine['top100_rank'], wine['winery_full'], wine['wine_full'], wine['note'], parseInt(wine['vintage'], 10), wine['score'], wine['price']));
        });
        // Set the Data for the client side fitlering and sorting
        this._dataService.originalData = this.top100Wines;
    }
}
