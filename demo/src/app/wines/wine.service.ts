import {Injectable} from '@angular/core';
import {Http, Response, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import {Listing} from './../modules/table/model/listing';
import {ListingMetadata} from './../modules/table/model/listing-metadata';
import {ListingParameters} from './../modules/table/model/listing-query-params.model';
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
    public filterAllColumns(queryParams: ListingParameters): Observable<Listing<Wine>> {
        const listingResult = new Listing<Wine>();
        const filteredData = this._dataService.filterAll(queryParams, [ 'id' ]);

        this.metaData.count = filteredData.length;
        this.metaData.currentPage = queryParams.page;
        this.metaData.limit = queryParams.limit;
        this.metaData.numPages = this.countPages(filteredData.length, this.metaData.limit);
        this.metaData.startIndex = (this.metaData.currentPage * this.metaData.limit) - this.metaData.limit + 1;
        this.metaData.endIndex = this.calcEndIndex(this.metaData.count, this.metaData.startIndex, this.metaData.limit);
        listingResult.metadata = {...this.metaData };
        listingResult.results = filteredData.slice(this.metaData.startIndex - 1, this.metaData.endIndex);
        return Observable.of(listingResult);
    }
    /**
     *
     * @param queryParams
     */
    public filterWines(queryParams: ListingParameters): Observable<Listing<Wine>> {
        const listingResult = new Listing<Wine>();

        const filteredData = this._dataService.filter(queryParams);
        this.metaData.count = filteredData.length;
        this.metaData.currentPage = queryParams.page;
        this.metaData.limit = queryParams.limit;
        this.metaData.numPages = this.countPages(filteredData.length, this.metaData.limit);
        this.metaData.startIndex = (this.metaData.currentPage * this.metaData.limit) - this.metaData.limit + 1;
        this.metaData.endIndex = this.calcEndIndex(this.metaData.count, this.metaData.startIndex, this.metaData.limit);
        listingResult.metadata = {...this.metaData };
        listingResult.results = filteredData.slice(this.metaData.startIndex - 1, this.metaData.endIndex);

        return Observable.of(listingResult);
    }
    /**
     *
     * @param queryParams
     * @param columnName
     */
    public sortWines(queryParams: ListingParameters, columnName: string): Observable<Listing<Wine>> {

        const sortedData = this._dataService.sort(queryParams, columnName);
        const listingResult = new Listing<Wine>();

        listingResult.metadata = {...this.metaData };
        listingResult.results = sortedData.slice(this.metaData.startIndex - 1, this.metaData.endIndex);

        return Observable.of(listingResult);
    }

    public getAllWines(queryParams: ListingParameters): Observable<Listing<Wine>> {
        // Calculate the current Page (only neccessary if server does not
        // providethis)
        this.metaData.count = this._dataService.renderData.length;
        this.metaData.currentPage = queryParams.page;
        this.metaData.limit = queryParams.limit;
        this.metaData.numPages = this.countPages(this._dataService.renderData.length, this.metaData.limit);
        this.metaData.startIndex = (this.metaData.currentPage * this.metaData.limit) - this.metaData.limit + 1;
        this.metaData.endIndex = this.calcEndIndex(this.metaData.count, this.metaData.startIndex, this.metaData.limit);

        const listingResult = new Listing<Wine>();
        listingResult.metadata = {...this.metaData };
        listingResult.results = this._dataService.renderData.slice(this.metaData.startIndex - 1, this.metaData.endIndex);
        return Observable.of(listingResult);
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
        topWines.forEach((wine) => {
            this.top100Wines.push(
                new Wine(wine['id'], wine['top100_rank'], wine['winery_full'], wine['wine_full'], wine['note'], parseInt(wine['vintage'], 10), wine['score'], wine['price']));
        });
        this._dataService.originalData = this.top100Wines;
    }
}
