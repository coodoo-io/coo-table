import {Component} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';

import {CooTableConfig} from './../../model/coo-table-config.model';

@Component({})
export class CooTableRouteUpdateComponent {

    constructor(private _router: Router, private _activeRoute: ActivatedRoute, private _config: CooTableConfig) {
    }
    /**
     *
     * @param column
     * @param value
     */
    public updateRouteForFilter(column: string, value: string): void {
        if (this._config.routeChange) {
            this._activeRoute.queryParams.subscribe((data) => {
                let filter: Object = {};
                if (data.filter) {
                    filter = JSON.parse(data.filter);
                }
                filter[column] = { column : column, filterValue : value };
                const navigationExtras: NavigationExtras
                    = { queryParamsHandling : 'merge', queryParams : { filter : JSON.stringify(filter), search : '' }, skipLocationChange : false, replaceUrl : true };
                this._router.navigate([], navigationExtras);
            });
        }
    }
    /**
     *
     * @param value
     */
    public updateRouteForSearch(value: string): void {
        if (this._config.routeChange) {
            const navigationExtras: NavigationExtras
                = { queryParamsHandling : 'merge', queryParams : { search : value, filter : '' }, skipLocationChange : false, replaceUrl : true };
            this._router.navigate([], navigationExtras);
        }
    }
    /**
     *
     * @param sort
     * @param columnName
     */
    public updateRouteForSort(sort: string, columnName: string): void {
        if (this._config.routeChange) {
            const navigationExtras: NavigationExtras
                = { queryParamsHandling : 'merge', queryParams : { sort : sort, columName : columnName }, skipLocationChange : false, replaceUrl : true };
            this._router.navigate([], navigationExtras);
        }
    }

    public updateRouteForPage(currentPage: number): void {
        const navigationExtras: NavigationExtras = { queryParamsHandling : 'merge', queryParams : { page : currentPage }, skipLocationChange : false, replaceUrl : true };
        this._router.navigate([], navigationExtras);
    }
}
