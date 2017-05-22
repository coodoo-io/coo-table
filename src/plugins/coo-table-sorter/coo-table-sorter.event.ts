/**
 *
 */
export class CooTableSorterEvent {
  field: string;
  sort: string;
  /**
   *
   */
  constructor(field: string, sort: string) {
    this.field = field;
    this.sort = sort;
    Object.freeze(this);
  }
  /**
   *
   */
  getSortAttribute(): string {
    let sortAttribute: string;
    if (this.sort === 'desc') {
      sortAttribute = '-';
    } else {
      sortAttribute = '';
    }
    return sortAttribute + this.field;
  }
  /**
   *
   */
  toString(): string {
    return 'field:' + this.field + '; sort:' + this.sort;
  }
}
