import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class CooTableDataEventSerivce {

    private deleteFilter: Subject<string> = new Subject<string>();

    emitDelete(data: string): void {
        this.deleteFilter.next(data);
    }

    subscribeEvent(): Observable<string> {
        return this.deleteFilter.asObservable();
    }
}
