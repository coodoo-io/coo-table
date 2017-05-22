import {Injectable} from '@angular/core';
import {URLSearchParams} from '@angular/http';

import {ListingParameters} from './../model/listing-query-params.model';

@Injectable()
export class ListingService {
    public createURLSearchParams(queryParams: ListingParameters): URLSearchParams {
        const params: URLSearchParams = new URLSearchParams();

        if (queryParams.page) {
            params.set('page', `${queryParams.page}`);
        }
        if (queryParams.limit) {
            params.set('limit', `${queryParams.limit}`);
        }
        if (queryParams.sort) {
            params.set('sort', `${queryParams.sort}`);
        }
        if (queryParams.filter) {
            params.set('filter', `${queryParams.filter}`);
        }
        if (queryParams.attributeFilters && queryParams.attributeFilters.size > 0) {
            queryParams.attributeFilters.forEach((value, key) => {
                params.set(`filter-${key}`, `${value}`);
            });
        }

        return params;
    }
}
