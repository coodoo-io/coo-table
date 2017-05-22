import {CooTableService} from './coo-table.service';
import {CooTableRowSelectEvent} from './plugins/coo-table-rowselect/coo-table-rowselect.event';
import {CooTableSorterEvent} from './plugins/coo-table-sorter/coo-table-sorter.event';

describe('CooTableservice', () => {

    let cooTableService: CooTableService;

    beforeEach(() => {
        cooTableService = new CooTableService();
    });

    it('should be defined', () => {
        expect(cooTableService).toBeDefined();
    });

    it('should have public properties', () => {

        expect(cooTableService.selectRow$).toBeDefined();
        expect(cooTableService.sortChanged$).toBeDefined();
        expect(cooTableService.reload$).toBeDefined();
        expect(cooTableService.selectedRows).toBeDefined();
        expect(cooTableService.sortChanged).toBeDefined();
        expect(cooTableService.reload).toBeDefined();
        expect(cooTableService.getSelectedRows).toBeDefined();

    });

    it('should update the selected elements', () => {
        cooTableService.selectRow$.subscribe((data) => {
            expect(data).toBeDefined();
            expect(cooTableService.getSelectedRows().size).toBe(1);
        });

        cooTableService.selectRow(new CooTableRowSelectEvent(1, true, {}));
    });

    it('should update the selected elements', () => {
        let count = 0;
        cooTableService.selectRow$.subscribe((data) => {
            if (count > 0) {
                expect(data).toBeDefined();
                expect(cooTableService.getSelectedRows().size).toBe(0);
            }
            count++;
        });

        cooTableService.selectRow(new CooTableRowSelectEvent(1, true, {}));
        cooTableService.selectRow(new CooTableRowSelectEvent(1, false, {}));
    });

    it('should send the sortchanged event', () => {

        cooTableService.sortChanged$.subscribe(data => {
            expect(data).toBeDefined();
        });

        cooTableService.sortChanged(new CooTableSorterEvent('foo', 'asc'));

    });

    xit('should send the reload event', () => {
        //@TODO versuchen mit SpyOn zu arbeiten
        cooTableService.reload$.subscribe(data => {
            expect(data).toBeDefined();
        });

        cooTableService.reload();

    });

});
