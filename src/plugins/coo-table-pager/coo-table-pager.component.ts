import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {CooTableRouteUpdateComponent} from '../coo-table-route-update/coo-table-route-update.component';

import {CooTableService} from './../../coo-table.service';
import {CooTableConfig} from './../../model/coo-table-config.model';
import {ListingMetadata} from './../../model/listing-metadata';
import {ListingParameters} from './../../model/listing-query-params.model';
import {CooTablePagerEvent} from './coo-table-pager.event';

/**
 * @Component CooTablePagerComponent
 * @ngModule CooTableModule
 * @whatItDoes The Pager Component is rendering the page choosing component
 *
 * @howToUse `<coo-table-pager [metadata]="metadata" (onPage)="loadPage($event)" class="float-xs-right"></coo-table-pager>`
 *
 * @stable
 */
@Component({ selector : 'coo-table-pager', templateUrl : './coo-table-pager.component.html', styleUrls : [ './coo-table-pager.component.css' ] })
export class CooTablePagerComponent extends CooTableRouteUpdateComponent implements OnInit, OnChanges {
    /**
     * The Metadata from the listing to calculate the correct pagination
     */
    @Input()
    metadata: ListingMetadata;
    /**
     * Output Event if there is a change on the page
     */
    @Output()
    onPage: EventEmitter<CooTablePagerEvent> = new EventEmitter<CooTablePagerEvent>(true);
    pages: Array<number> = [];
    menuOpen: boolean = false;

    /**
     *
     * @param router
     * @param activeRoute
     * @param config
     * @param _queryParams
     */
    constructor(router: Router, activeRoute: ActivatedRoute, config: CooTableConfig, private _queryParams: ListingParameters) {
        super(router, activeRoute, config);
    }

    /**
     * Init function of the component will create the page dropdown and set the correct page if there is one given via page query
     */
    ngOnInit(): void {
        this._generatePagesForDropdown();
        if (this._queryParams.page) {
            this.goToPage(this._queryParams.page);
        }
    }

    /**
     * If the meta data changes will generate a new page dropdown
     */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['metadata']) {
            this._generatePagesForDropdown();
        }
    }

    /**
     *
     */
    private _generatePagesForDropdown(): void {
        if (this.metadata) {
            this.pages = [];
            for (let i: number = 1; i <= this.metadata.numPages; i++) {
                this.pages.push(i);
            }
        }
    }

    /**
     * Sets the new page and emits the page change event
     * @param page
     */
    goToPage(page: number): void {
        this.onPage.emit(new CooTablePagerEvent(page));
        this.menuOpen = false;
        super.updateRouteForPage(page);
    }

    /**
     * Loads the previous page
     */
    loadPrevPage(): void {
        this.goToPage(this.metadata.currentPage - 1);
    }

    /**
     * Loads the next page
     */
    loadNextPage(): void {
        this.goToPage(this.metadata.currentPage + 1);
    }
}
