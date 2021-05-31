import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './table.template';
import {resizeHandler} from './table.resize'
import {shouldResize}from './table.helpers'
 
export class Table extends ExcelComponent {
    static className = 'excel__table'   

    constructor ($root) {

        super ($root, {  
            listeners: ['mousedown']
        })
    }

    toHTML() {
        return createTable(55)
    }

    onMousedown(event) {

        if (shouldResize(event)) {
            resizeHandler(this.$root, event)
        }
    }

}
