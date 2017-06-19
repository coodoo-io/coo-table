import {ListingMetadata} from './listing-metadata';
/**
 *
 */
export class ListingResult<T> {
    metadata: ListingMetadata;
    results: Array<T>;
}
