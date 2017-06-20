import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {CooTableComponent} from './coo-table.component';
import {CooTableService} from './coo-table.service';
import {CooTableConfig} from './model/coo-table-config.model';
import {ListingMetadata} from './model/listing-metadata';
import {ListingParameters} from './model/listing-query-params.model';
import {ListingResult} from './model/listing-result';
import {CooTableActiveFiltersComponent} from './plugins/coo-table-activefilters/coo-table-activefilters.component';
import {CooTableAllRowSelectComponent} from './plugins/coo-table-all-rowselect/coo-table-all-rowselect.component';
import {CooTableCounterComponent} from './plugins/coo-table-counter/coo-table-counter.component';
import {CooTableFilterListComponent} from './plugins/coo-table-filters/coo-table-filter-list/coo-table-filter-list.component';
import {CooTableFilterTextComponent} from './plugins/coo-table-filters/coo-table-filter-text/coo-table-filter-text.component';
import {CooTableLoadingDirective} from './plugins/coo-table-loading/coo-table-loading.component';
import {CooTablePagerComponent} from './plugins/coo-table-pager/coo-table-pager.component';
import {CooTableRowSelectComponent} from './plugins/coo-table-rowselect/coo-table-rowselect.component';
import {CooTableSearchComponent} from './plugins/coo-table-search/coo-table-search.component';
import {CooTableSelectionComponent} from './plugins/coo-table-selection/coo-table-selection.component';
import {CooTableSorterComponent} from './plugins/coo-table-sorter/coo-table-sorter.component';
import {CooTableDataEventSerivce} from './services/coo-table-data-event.service';
import {CooTableDataService} from './services/coo-table-data.service';

@NgModule({
    imports : [ CommonModule ],
    providers : [ CooTableService, ListingParameters, { provide : CooTableConfig, useValue : [ false, 'table table-hover' ] }, CooTableDataEventSerivce ],
    declarations : [
        CooTableComponent, CooTableCounterComponent, CooTableActiveFiltersComponent, CooTableSelectionComponent, CooTableSorterComponent, CooTableRowSelectComponent,
        CooTableLoadingDirective, CooTableSearchComponent, CooTableFilterTextComponent, CooTableFilterListComponent, CooTablePagerComponent, CooTableAllRowSelectComponent
    ],
    exports : [
        CooTableComponent, CooTableCounterComponent, CooTableActiveFiltersComponent, CooTableSelectionComponent, CooTableSorterComponent, CooTableRowSelectComponent,
        CooTableLoadingDirective, CooTableSearchComponent, CooTableFilterTextComponent, CooTableFilterListComponent, CooTablePagerComponent, CooTableAllRowSelectComponent
    ]
})
export class CooTableModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule : CooTableModule,
        };
    }
}
