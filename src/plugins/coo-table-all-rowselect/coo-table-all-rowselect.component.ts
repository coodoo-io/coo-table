import {Component, EventEmitter, Input, Output} from '@angular/core';
import {forEach} from '@angular/router/src/utils/collection';

import {CooTableService} from './../../coo-table.service';
import {CooTableDataService} from './../../services/coo-table-data.service';
import {CooTableRowSelectEvent} from './../coo-table-rowselect/coo-table-rowselect.event';
/**
 * @Component CooTableAllRowSelectComponent
 * @ngModule CooTableModule
 * @whatItDoes Gives the possibility to select all elements in the listing Component
 *
 * @howToUse `<coo-table-all-row-select (onSelected)="onAllSelect($event)"></coo-table-all-row-select>`
 *
 * @stable
 */
@Component({ 'selector' : 'coo-table-all-row-select', 'template' : `<input type="checkbox" ngModel="isSelected" (click)="checkElementState()"/>` })
export class CooTableAllRowSelectComponent {
    /**
     * The output event to update the listing component
     */
    @Output()
    onSelected: EventEmitter<String> = new EventEmitter<String>();
    /**
     * Inidcates if all elements or just the elements in the current view should be selected (maybe also filtered view)
     */
    @Input()
    selectView: boolean = false;

    public isSelected: boolean = false;

    constructor(private _cooTableService: CooTableService, private _cooTableDataService: CooTableDataService) {
    }
    /**
     * Checks weather the elements should be checked or not for current page
     */
    checkElementState(): void {
        this.isSelected = !this.isSelected;
        if (!this.selectView) {
            this._cooTableDataService.renderData.forEach((element) => {
                this._cooTableService.selectRow(new CooTableRowSelectEvent(element.id, this.isSelected, element));
            });
        } else {
            const elements: any = document.querySelectorAll('coo-table-rowselect');
            elements.forEach(element => {
                element.children[0].click();
            });
        }
        this.onSelected.emit('UPDATE::SELECTED');
    }
}
