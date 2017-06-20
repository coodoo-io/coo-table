import {ListingParameters} from './../model/listing-query-params.model';
import {CooTableDataEventSerivce} from './coo-table-data-event.service';
import {CooTableDataService} from './coo-table-data.service';

class CooTableDataServiceMock extends CooTableDataService {
    constructor(data, cooTableDataEventService: CooTableDataEventSerivce = new CooTableDataEventSerivce()) {
        super(data, cooTableDataEventService);
    }
}

describe('Testing CooTableDataService', () => {

    let cooTableDataSerivce: CooTableDataServiceMock;

    beforeEach(() => {});

    it('should be defined after initalisation', () => {
        cooTableDataSerivce = new CooTableDataServiceMock([]);
        expect(cooTableDataSerivce).toBeDefined();
    });

    it('should have public functions defined', () => {
        expect(cooTableDataSerivce.renderData).toBeDefined();
        expect(cooTableDataSerivce.resetData).toBeDefined();
        expect(cooTableDataSerivce.originalData).toBeDefined();
        expect(cooTableDataSerivce.resetFilter).toBeDefined();
        expect(cooTableDataSerivce.getData).toBeDefined();
    });

    it('should sort all data in desc direction', (done) => {
        const data = [ { id : 1 }, { id : 100 }, { id : 5 }, { id : 3 }, { id : 50 }, { id : 25 } ];
        cooTableDataSerivce = new CooTableDataServiceMock(data);
        const queryListingParams = new ListingParameters();
        queryListingParams.sort = 'desc';
        queryListingParams.sortColumn = 'id';

        cooTableDataSerivce.getData(queryListingParams).subscribe((resultData) => {
            expect(resultData).not.toEqual(data);
            expect(resultData.results[0]).toEqual({ id : 1 });
            done();
        });
    });

    it('should sort all data in asc direction', (done) => {
        const data = [ { id : 1 }, { id : 100 }, { id : 5 }, { id : 3 }, { id : 50 }, { id : 25 } ];
        cooTableDataSerivce = new CooTableDataServiceMock(data);
        const queryListingParams = new ListingParameters();
        queryListingParams.sort = 'asc';
        queryListingParams.sortColumn = 'id';

        cooTableDataSerivce.getData(queryListingParams).subscribe((resultData) => {

            expect(resultData).not.toEqual(data);
            expect(resultData.results[0]).toEqual({ id : 100 });
            done();
        });
    });

    it('should sort all data and filter ', (done) => {
        const data = [ { id : 1 }, { id : 100 }, { id : 5 }, { id : 3 }, { id : 50 }, { id : 25 } ];
        cooTableDataSerivce = new CooTableDataServiceMock(data);
        const queryListingParams = new ListingParameters();
        queryListingParams.sort = 'dest';
        queryListingParams.sortColumn = 'id';
        queryListingParams.filter = '10';

        cooTableDataSerivce.getData(queryListingParams, []).subscribe((resultData) => {

            expect(resultData).not.toEqual(data);
            expect(resultData.results.length).toBe(1);
            done();
        });
    });

    it('should sort all data and filter with the attributes filter', (done) => {
        const data = [ { id : 1 }, { id : 100 }, { id : 5 }, { id : 3 }, { id : 50 }, { id : 25 } ];
        cooTableDataSerivce = new CooTableDataServiceMock(data);
        const queryListingParams = new ListingParameters();
        queryListingParams.sort = 'dest';
        queryListingParams.sortColumn = 'id';
        queryListingParams.attributeFilters.set('id', '10');

        cooTableDataSerivce.getData(queryListingParams).subscribe((resultData) => {

            expect(resultData).not.toEqual(data);
            expect(resultData.results.length).toBe(1);
            done();
        });
    });
});