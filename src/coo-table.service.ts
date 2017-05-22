import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

import {CooTableRowSelectComponent} from './plugins/coo-table-rowselect/coo-table-rowselect.component';
import {CooTableRowSelectEvent} from './plugins/coo-table-rowselect/coo-table-rowselect.event';
import {CooTableSorterEvent} from './plugins/coo-table-sorter/coo-table-sorter.event';

@Injectable()
export class CooTableService {
    // Observable source
    private selectRowSource: Subject<CooTableRowSelectEvent> = new Subject<CooTableRowSelectEvent>();
    private sortChangedSource: Subject<CooTableSorterEvent> = new Subject<CooTableSorterEvent>();
    private reloadSource: Subject<void> = new Subject<void>();
    public selectedRows: Map<number, CooTableRowSelectEvent> = new Map();

    // Observable stream
    selectRow$: Observable<CooTableRowSelectEvent> = this.selectRowSource.asObservable();
    sortChanged$: Observable<CooTableSorterEvent> = this.sortChangedSource.asObservable();
    reload$: Observable<void> = this.reloadSource.asObservable();

    constructor() {
    }

    // Service command
    selectRow(row: CooTableRowSelectEvent): void {
        if (row.selected) {
            this.selectedRows.set(row.id, row);
        } else {
            this.selectedRows.delete(row.id);
        }
        this.selectRowSource.next(row);
    }
    /**
     *
     * @param sorter
     */
    sortChanged(sorter: CooTableSorterEvent): void {
        this.sortChangedSource.next(sorter);
    }
    /**
     *
     */
    reload(): void {
        this.reloadSource.next();
    }
    /**
     */
    getSelectedRows(): Map<number, CooTableRowSelectEvent> {
        return this.selectedRows;
    }
}
