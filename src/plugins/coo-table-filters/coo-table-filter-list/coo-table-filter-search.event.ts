export class CooTableFilterSearchEvent {
  public column: string;
  public term: string;
  public limit: number;

  constructor($column: string, $term: any, $limit?: number) {
    this.column = $column;
    this.term = $term;
    this.limit = $limit ? $limit : null;
  }
}
