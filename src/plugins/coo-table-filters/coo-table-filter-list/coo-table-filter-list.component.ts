import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

import {ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, NgZone, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

import {CooTableConfig} from './../../../model/coo-table-config.model';
import {ListingParameters} from './../../../model/listing-query-params.model';
import {CooTableDataEventSerivce} from './../../../services/coo-table-data-event.service';
import {CooTableRouteUpdateComponent} from './../../coo-table-route-update/coo-table-route-update.component';
import {CooTableFilterSearchEvent} from './../coo-table-filter-list/coo-table-filter-search.event';
import {CooTableFilterEvent} from './../coo-table-filter.event';

/**
 * @Component CooTableFilterListComponent
 * @ngModule CooTableModule
 * @whatItDoes creates an Input element as dropdown from which one can be choosen to filter the data for this column
 *
 * @howToUse `<coo-table-filter-list column="vintage" (onFilter)="filterTable($event)" [list]="[2012,2013,2014,2015,2016]"></coo-table-filter-list>`
 *
 * @stable
 */
@Component({
    selector : 'coo-table-filter-list',
    templateUrl : './coo-table-filter-list.component.html',
    styleUrls : [ './coo-table-filter-list.component.css' ],
})
export class CooTableFilterListComponent extends CooTableRouteUpdateComponent implements OnInit, OnDestroy {
    /**
     * The column name and also the key for the data to filter
     */
    @Input()
    column: string;
    /**
     * The list of elements to show up in the dropdown
     */
    @Input()
    list: Array<string>;
    /**
     * The event which will be fired if there is a change in the dropdown
     */
    @Output()
    onFilter: EventEmitter<CooTableFilterEvent> = new EventEmitter<CooTableFilterEvent>();
    /**
     *
     */
    @ViewChild('searchInput')
    searchInput: any;
    public menuOpen: boolean = false;
    public selectedItem: string;
    private _globalClick: any;
    private search: string = '';
    private search$: Subject<String> = new Subject<string>();
    private _listening: boolean;
    private _origList: Array<string> = [];
    /**
     *
     */
    constructor(private _elRef: ElementRef, private _ngZone: NgZone, private _cooTableDataEventService: CooTableDataEventSerivce, _router: Router, _activeRoute: ActivatedRoute,
                cooTableConfig: CooTableConfig, private _queryParams: ListingParameters) {
        super(_router, _activeRoute, cooTableConfig);
        this.search$.debounceTime(300).distinctUntilChanged().subscribe((term: string) => {
            const results: Array<any> = [];
            this.list.forEach((element: string) => {
                if (element.indexOf('term') > -1) {
                    results.push(element);
                }
            });
        });

        _cooTableDataEventService.subscribeEvent().subscribe(data => {
            if (data === 'delete') {
                this.menuOpen = false;
                this.selectedItem = null;
            }
        });
    }

    /**
     * Initalisation of the mouse event to close the dropdown if there was a click outside
     */
    ngOnInit(): void {
        this._globalClick = Observable.fromEvent(document, 'click')
                                .delay(1)
                                .do(() => {
                                    this._listening = true;
                                })
                                .subscribe((event: MouseEvent) => {
                                    this.onGlobalClick(event);
                                });
        if (this._queryParams.attributeFilters.get(this.column)) {
            this.selectedItem = this._queryParams.attributeFilters.get(this.column);
        }
        this._origList = [...this.list ];
    }

    /**
     * If the component is destroyed also destroy the mouse event listener
     */
    ngOnDestroy(): void {
        this._globalClick.unsubscribe();
    }

    /**
     * If there is a click outside this component check if were are listenting currently and if so check if it is opend and
     * than close it
     *
     * @param {MouseEvent} event
     */
    onGlobalClick(event: MouseEvent): void {
        if (event instanceof MouseEvent && this._listening === true) {
            if (this._elRef.nativeElement.children[0].classList.contains(this.column) && this.menuOpen
                && (!this._elRef.nativeElement.children[0].children[0].isSameNode(event.target)) && !event.srcElement.classList.contains('list-filter-input')) {
                this.openMenu();
            }
        }
    }

    /**
     * Selection of one item in the List
     *
     * @param {string} listItem
     */
    selectListItem(listItem: string): void {
        this.menuOpen = false;
        this.selectedItem = listItem;
        this.onFilter.emit(new CooTableFilterEvent(this.column, listItem));
        super.updateRouteForFilter(this.column, listItem);
    }
    /**
     *
     */
    selectText(): void {
        this.searchInput.nativeElement.select();
    }
    /**
     * deselect the current selected item
     *
     * @param {MouseEvent} $event
     */
    removeSelectedItem($event: MouseEvent): void {
        this.menuOpen = false;
        this.selectedItem = null;
        this.onFilter.emit(new CooTableFilterEvent(this.column, this.selectedItem));
    }
    /**
     * just opens the menu
     */
    openMenu(): void {
        this.menuOpen = !this.menuOpen;
    }
    /**
     *
     * @param event
     */
    filterList(event: any): void {
        if (`${event.srcElement.value}`.trim() === '') {
            this.list = [...this._origList ];
            return;
        }
        this.list = this._origList.filter(element => {
            if (`${element}`.toLowerCase().includes((`${event.srcElement.value}`).toLowerCase())) {
                return true;
            }
            return false;
        });
    }
}
