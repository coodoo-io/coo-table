import {ActivatedRoute, Router} from '@angular/router';

import {CooTableService} from './../coo-table.service';
import {ListingParameters} from './../model/listing-query-params.model';
import {CooTableFilterEvent} from './../plugins/coo-table-filters/coo-table-filter.event';
import {CooTablePagerEvent} from './../plugins/coo-table-pager/coo-table-pager.event';
import {CooTableSearchEvent} from './../plugins/coo-table-search/coo-table-search.event';
import {CooTableSorterEvent} from './../plugins/coo-table-sorter/coo-table-sorter.event';

export abstract class ListingComponent {
    listinQueryParams: ListingParameters = new ListingParameters();
    _router: Router;

    private activatedRoute: ActivatedRoute;

    constructor(cooTableService: CooTableService) {
        // this.activatedRoute.queryParams.subscribe((params) => {
        //   this.queryParams.sort = params['sort'];
        // });
        const self: ListingComponent = this;
        cooTableService.reload$.subscribe(() => {
            self.list();
        });
    }

    abstract list(): void;

    public sortTable(event: CooTableSorterEvent): void {
        // this.buildQueryParams();
        this.listinQueryParams.sort = event.getSortAttribute();
        this.list();
    }

    public searchTable(event?: CooTableSearchEvent): void {
        this.listinQueryParams.filter = event.value;
        this.list();
    }

    public filterTable(event?: CooTableFilterEvent): void {
        this.listinQueryParams.attributeFilters.set(event.column, event.value);
        this.list();
    }

    public loadPage(event: CooTablePagerEvent): void {
        this.listinQueryParams.page = event.page;
        this.list();
    }

    public reload(): void {
        this.list();
    }

    // Expermimental
    public buildQueryParams(): void {
        const queryParams: ListingParameters = new ListingParameters();
        queryParams.page = this.listinQueryParams.page;
        queryParams.limit = this.listinQueryParams.limit;
        queryParams.sort = this.listinQueryParams.sort;
        queryParams.filter = this.listinQueryParams.filter;
        console.log('r:', this._router);
        this._router.navigate([ '/administration', 'locations' ], queryParams);
    }

    public exportTable(ids: string, url: string): string {
        let resultUrl: string = url;
        if (ids) {
            resultUrl += '?ids=' + ids;
        }
        return resultUrl;
    }
}
