export class CooTableFilterEvent {
  public column: string;
  public value: any;

  constructor($column: string, $value: any) {
    this.column = $column;
    this.value = $value;
  }
}
