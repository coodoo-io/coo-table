/**
 * @Model CooTableConfig
 * @ngModule CooTableModule
 * @whatItDoes A Config object containg overall configs for the coo-table.
 *
 * @howToUse Overwrite the configuration for the component in your environment configuration of your app
 *
 * ```javascript
 * routeChange: boolean A flag which indicates if route changes should be applied to current uri's query params
 * tableclasses: string The class on the outer table dom element
 * ```
 * @stable
 */
export class CooTableConfig {
    private _routeChange: boolean = false;
    private _tableCssClassNames: string = 'table table-hover';
    constructor(_routeChange: boolean = false, _tableCssClassNames: string = 'table table-hover') {
        this._routeChange = _routeChange;
        this._tableCssClassNames = _tableCssClassNames;
    }

    set routeChange(routeChange: boolean) {
        this._routeChange = routeChange;
    }

    set tableCssClassNames(tableCssClassNames: string) {
        this._tableCssClassNames = tableCssClassNames;
    }

    get routeChange(): boolean {
        return this._routeChange;
    }

    get tableCssClassNames(): string {
        return this._tableCssClassNames;
    }
}
