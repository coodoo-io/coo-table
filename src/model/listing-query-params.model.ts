/**
 *
 */
export class ListingParameters {
    /**
     * Current Page number starting with 1
     */
    page: number = 1;
    /**
     * Maximum viewable items
     */
    limit: number = 20;
    /**
     * Sort direction asc | desc
     */
    sort: string;
    /**
     * The last sorted column
     */
    sortColumn: string;
    /**
     * Search over complete cells with or
     */
    filter: string;
    /**
     * Search for any coulm with value and &&
     * Additional flag Filter-Type-Disjunction could be inserted to obtain an or
     * over the other colunms
     */
    attributeFilters: Map<string, string> = new Map();
}
