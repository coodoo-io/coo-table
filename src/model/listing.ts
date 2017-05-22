import {ListingMetadata} from './listing-metadata';
export class Listing<T> {
    metadata: ListingMetadata;
    results: Array<T>;
}
