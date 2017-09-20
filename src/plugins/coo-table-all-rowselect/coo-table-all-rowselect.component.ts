import {Component, EventEmitter, Input, Output} from '@angular/core';
import {forEach} from '@angular/router/src/utils/collection';

import {CooTableService} from './../../coo-table.service';

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

    public isSelected: boolean = false;

    constructor(private cooTableService: CooTableService) {
        cooTableService.selectRow$.subscribe((data) => {
            setTimeout(() => {
                let allSelected: boolean = null;
                const elements: any = document.querySelectorAll('coo-table-rowselect');
                elements.forEach(element => {
                    if (element.children[0].children[0].classList.contains('ion-ios-checkbox')) {
                        if (allSelected === null || allSelected === true) {
                            allSelected = true;
                        }
                    } else {
                        allSelected = false;
                    }
                    this.isSelected = allSelected;
                    console.log(element.children[0].children[0].classList.contains('ion-ios-checkbox'));
                });
            });
        });
    }
    /**
     * Checks weather the elements should be checked or not for current page
     */
    checkElementState(): void {
        this.isSelected = !this.isSelected;
        const elements: any = document.querySelectorAll('coo-table-rowselect');
        elements.forEach(element => {
            if (!element.children[0].children[0].classList.contains('ion-ios-checkbox')) {
                element.children[0].click();
            }
        });
        this.onSelected.emit('UPDATE::SELECTED');
    }
}
