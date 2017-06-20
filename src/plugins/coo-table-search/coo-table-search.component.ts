import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/distinctUntilChanged';

import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {Subject} from 'rxjs/Subject';

import {CooTableDataEventSerivce} from '../../services/coo-table-data-event.service';

import {CooTableConfig} from './../../model/coo-table-config.model';
import {ListingParameters} from './../../model/listing-query-params.model';
import {CooTableDataService} from './../../services/coo-table-data.service';
import {CooTableRouteUpdateComponent} from './../coo-table-route-update/coo-table-route-update.component';
import {CooTableSearchEvent} from './coo-table-search.event';

@Component({
    selector : 'coo-table-search',
    templateUrl : './coo-table-search.component.html',
    styleUrls : [ './coo-table-search.component.css' ],
    changeDetection : ChangeDetectionStrategy.OnPush
})
export class CooTableSearchComponent extends CooTableRouteUpdateComponent implements OnInit {
    @Output()
    onSearch: EventEmitter<CooTableSearchEvent> = new EventEmitter<CooTableSearchEvent>(true);
    @ViewChild('cooTableSearch')
    cooTableSearchInput: any;
    public search: string = '';
    search$: Subject<string> = new Subject<string>();

    constructor(_router: Router, _activeRoute: ActivatedRoute, cooTableConfig: CooTableConfig, private _queryParams: ListingParameters,
                private cooTableDataEventService: CooTableDataEventSerivce) {
        super(_router, _activeRoute, cooTableConfig);
        this.search$.debounceTime(300).distinctUntilChanged().subscribe((data) => {
            this.onSearch.emit(new CooTableSearchEvent(this.cooTableSearchInput.nativeElement.value));
            super.updateRouteForSearch(this.cooTableSearchInput.nativeElement.value);
        });
        cooTableDataEventService.subscribeEvent().subscribe(data => {
            console.log(data);
            if (data === 'delete:search') {
                this.cooTableSearchInput.nativeElement.value = '';
            }
        });
    }

    selectText(): void {
        this.cooTableSearchInput.nativeElement.select();
    }

    ngOnInit(): void {
        if (this._queryParams.filter) {
            this.cooTableSearchInput.nativeElement.value = this._queryParams.filter;
        }
    }
}
