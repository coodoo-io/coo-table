import {Injectable} from '@angular/core';
import {Http, Response, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import {ListingMetadata} from './../modules/table/model/listing-metadata';
import {ListingParameters} from './../modules/table/model/listing-query-params.model';
import {ListingResult} from './../modules/table/model/listing-result';
import {CooTableDataEventSerivce} from './../modules/table/services/coo-table-data-event.service';
import {CooTableDataService} from './../modules/table/services/coo-table-data.service';
import {Wine} from './wine';
import {topWines} from './wines.data';

@Injectable()
export class WineService extends CooTableDataService {
    top100Wines: Array<Wine> = [];
    metaData = new ListingMetadata();
    constructor(private http: Http, cooTableDataEventService: CooTableDataEventSerivce) {
        super([], cooTableDataEventService);
        this.loadWines();
    }
    public filterAllColumns(queryParams: ListingParameters): Observable<ListingResult<Wine>> {
        return this.getData(queryParams, [ 'id' ]);
    }
    /**
     *
     * @param queryParams
     */
    public filterWines(queryParams: ListingParameters): Observable<ListingResult<Wine>> {
        return this.getData(queryParams);
    }
    /**
     *
     * @param queryParams
     * @param columnName
     */
    public sortWines(queryParams: ListingParameters, columnName: string): Observable<ListingResult<Wine>> {
        queryParams.sortColumn = columnName;
        return this.getData(queryParams);
    }

    public getAllWines(queryParams: ListingParameters): Observable<ListingResult<Wine>> {
        return this.getData(queryParams);
    }

    private loadWines() {
        // Load Data here and store it to the data service
        topWines.forEach((wine) => {
            this.top100Wines.push(
                new Wine(wine['id'], wine['top100_rank'], wine['winery_full'], wine['wine_full'], wine['note'], parseInt(wine['vintage'], 10), wine['score'], wine['price']));
        });
        // Set the Data for the client side fitlering and sorting
        this.originalData = this.top100Wines;
    }
}
