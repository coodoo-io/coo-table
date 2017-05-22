import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/distinctUntilChanged';

import {ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {Subject} from 'rxjs/Subject';

import {CooTableConfig} from './../../../model/coo-table-config.model';
import {ListingParameters} from './../../../model/listing-query-params.model';
import {CooTableDataService} from './../../../services/coo-table-data.service';
import {CooTableRouteUpdateComponent} from './../../coo-table-route-update/coo-table-route-update.component';
import {CooTableFilterEvent} from './../coo-table-filter.event';

/**
 * @Component CooTableFilterTextComponent
 * @ngModule CooTableModule
 * @whatItDoes creates an Input element with which tha data in the Table could be filtered
 *
 * @howToUse `<coo-table-filter-text column="rank" (onFilter)="filterTable($event)"></coo-table-filter-text>`
 *
 * @stable
 */
@Component({
    selector : 'coo-table-filter-text',
    templateUrl : './coo-table-filter-text.component.html',
    styleUrls : [ './coo-table-filter-text.component.css' ],
    changeDetection : ChangeDetectionStrategy.OnPush
})
export class CooTableFilterTextComponent extends CooTableRouteUpdateComponent implements OnInit {
    /**
     * The Columname and also the data property key which should be filtered
     */
    @Input()
    column: string;

    /**
     * The Event which will be fired if a change in the input happens
     */
    @Output()
    onFilter: EventEmitter<CooTableFilterEvent> = new EventEmitter<CooTableFilterEvent>();

    /**
     *
     */
    @ViewChild('cooTableFilter')

    /**
     *
     */
    cooTableFilterInput: any;

    /**
     *
     */
    public filter: string = '';

    /**
     *
     */
    filter$: Subject<string> = new Subject<string>();

    constructor(private _dataService: CooTableDataService, _router: Router, _activeRoute: ActivatedRoute, cooTableConfig: CooTableConfig, private _queryParams: ListingParameters) {
        super(_router, _activeRoute, cooTableConfig);

        this.filter$
            .do(() => {
                this.highlightFieldWithFilter();
            })
            .debounceTime(300)
            .distinctUntilChanged()
            .subscribe((data) => {
                this.onFilter.emit(new CooTableFilterEvent(this.column, this.cooTableFilterInput.nativeElement.value));
                super.updateRouteForFilter(this.column, this.cooTableFilterInput.nativeElement.value);
            });
        _dataService.resetFilter.subscribe(data => {
            if (data === 'delete') {
                this.cooTableFilterInput.nativeElement.value = '';
                this.highlightFieldWithFilter();
            }
        });
    }

    /**
     *
     */
    private highlightFieldWithFilter(): void {
        if (this.cooTableFilterInput.nativeElement.value === '') {
            this.cooTableFilterInput.nativeElement.style.backgroundColor = '';
        } else {
            this.cooTableFilterInput.nativeElement.style.backgroundColor = '#e6f4ff';
        }
    }

    /**
     *
     */
    selectText(): void {
        this.cooTableFilterInput.nativeElement.select();
    }

    /**
     *
     */
    deleteValue(): void {
        if (this.cooTableFilterInput.nativeElement.value !== '') {
            this.cooTableFilterInput.nativeElement.value = '';
            this.highlightFieldWithFilter();
            this.onFilter.emit(new CooTableFilterEvent(this.column, this.cooTableFilterInput.nativeElement.value));
        }
    }

    /**
     *
     */
    ngOnInit(): void {
        if (this._queryParams.attributeFilters.get(this.column)) {
            this.cooTableFilterInput.nativeElement.value = this._queryParams.attributeFilters.get(this.column);
        }
    }
}
