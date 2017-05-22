import {ListingParameters} from '../model/listing-query-params.model';
import {ListingService} from './listing.service';

describe('Listing Service', () => {

    let listingService: ListingService;

    beforeEach(() => {
        listingService = new ListingService;
    });

    it('should be defined', () => {
        expect(listingService).toBeDefined();
    });

    it('should have one public function', () => {
        expect(listingService.createURLSearchParams).toBeDefined();
    });

    it('should return an urlsearchparams object', () => {

        const expectedURL = 'page=10&limit=20';

        const params = new ListingParameters();
        params.page = 10;

        const result = listingService.createURLSearchParams(params);
        expect(result.toString()).toBe(expectedURL);
    });

    it('should return an uri with any possible variant', () => {

        const expectedURL = 'page=10&limit=20&sort=ASC&filter=test&filter-foo=bar';

        const params = new ListingParameters();
        params.page = 10;
        params.filter = 'test';
        params.sort = 'ASC';
        params.attributeFilters.set('foo', 'bar');

        const result = listingService.createURLSearchParams(params);
        expect(result.toString()).toBe(expectedURL);
    });

    it('should not add the columName', () => {

        const expectedURL = 'page=10&limit=20&sort=ASC&filter=test&filter-foo=bar';

        const params = new ListingParameters();
        params.page = 10;
        params.filter = 'test';
        params.sort = 'ASC';
        params.attributeFilters.set('foo', 'bar');
        params.sortColumn = 'bar';

        const result = listingService.createURLSearchParams(params);
        expect(result.toString()).toBe(expectedURL);
    });

});
