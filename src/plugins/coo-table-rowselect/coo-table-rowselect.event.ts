export class CooTableRowSelectEvent {
  id: number;
  obj: Object;
  selected: boolean;
  constructor(id: number, selected: boolean, obj?: Object) {
    this.id = id;
    this.obj = obj;
    this.selected = selected;
  }
}
