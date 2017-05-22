import {ListingParameters} from './../model/listing-query-params.model';
import {CooTableDataService} from './coo-table-data.service';

describe('Testing CooTableDataService', () => {

    let cooTableDataSerivce: CooTableDataService;

    beforeEach(() => {
        cooTableDataSerivce = new CooTableDataService();
    });

    it('should be defined after initalisation', () => {
        expect(cooTableDataSerivce).toBeDefined();
    });

    it('should have public functions defined', () => {
        expect(cooTableDataSerivce.renderData).toBeDefined();
        expect(cooTableDataSerivce.resetData).toBeDefined();
        expect(cooTableDataSerivce.originalData).toBeDefined();
        expect(cooTableDataSerivce.resetFilter).toBeDefined();
        expect(cooTableDataSerivce.filterAll).toBeDefined();
        expect(cooTableDataSerivce.filter).toBeDefined();
        expect(cooTableDataSerivce.sort).toBeDefined();
    });

    it('should sort all data in desc direction', () => {
        const data = [ { id : 1 }, { id : 100 }, { id : 5 }, { id : 3 }, { id : 50 }, { id : 25 } ];
        cooTableDataSerivce.originalData = [...data ];
        const queryListingParams = new ListingParameters();
        queryListingParams.sort = 'desc';
        queryListingParams.sortColumn = 'id';

        const resultData = cooTableDataSerivce.sort(queryListingParams, 'id');

        expect(resultData).not.toEqual(data);
        expect(resultData[0]).toEqual({ id : 1 });
    });

    it('should sort all data in asc direction', () => {
        const data = [ { id : 1 }, { id : 100 }, { id : 5 }, { id : 3 }, { id : 50 }, { id : 25 } ];
        cooTableDataSerivce.originalData = [...data ];
        const queryListingParams = new ListingParameters();
        queryListingParams.sort = 'asc';
        queryListingParams.sortColumn = 'id';

        const resultData = cooTableDataSerivce.sort(queryListingParams, 'id');

        expect(resultData).not.toEqual(data);
        expect(resultData[0]).toEqual({ id : 100 });
    });

    it('should sort all data', () => {
        const data = [ { id : 1 }, { id : 100 }, { id : 5 }, { id : 3 }, { id : 50 }, { id : 25 } ];
        cooTableDataSerivce.originalData = [...data ];
        const queryListingParams = new ListingParameters();
        queryListingParams.sort = 'dest';
        queryListingParams.sortColumn = 'id';
        queryListingParams.filter = '10';

        const resultData = cooTableDataSerivce.filterAll(queryListingParams);

        expect(resultData).not.toEqual(data);
        expect(resultData.length).toBe(1);
    });

    it('should sort all data', () => {
        const data = [ { id : 1 }, { id : 100 }, { id : 5 }, { id : 3 }, { id : 50 }, { id : 25 } ];
        cooTableDataSerivce.originalData = [...data ];
        const queryListingParams = new ListingParameters();
        queryListingParams.sort = 'dest';
        queryListingParams.sortColumn = 'id';
        queryListingParams.attributeFilters.set('id', '10');

        const resultData = cooTableDataSerivce.filter(queryListingParams);

        expect(resultData).not.toEqual(data);
        expect(resultData.length).toBe(1);
    });
});