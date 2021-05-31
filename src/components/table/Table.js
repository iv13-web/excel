import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './table.template';
import {resizeHandler} from './table.resize'
import {shouldResize}from './table.helpers'
import {TableSelection} from "@/components/table/TableSelection";


export class Table extends ExcelComponent {
    static className = 'excel__table'   
    // this.$root - Dom{excel__table}
    constructor ($root) {
        super ($root, {  
            listeners: ['mousedown']
        })
    }

    toHTML() {
        return createTable(55)
    }

    prepare() {
        /*const a = new TableSelection() то же саме, что и ниже*/
        this.selection = new TableSelection()
    }

    init() {
        /* super чтобы инициализровались DOMListeners из ExcelComponent,
        иначе если не вызвать super, то перезапишем init из ExcelComponent
        и слушатели не будут работать => реасайз тоже */
        super.init()
        const $startCell = this.$root.find('[data-id="1:1"]')

        this.selection.selectCell($startCell)
    }

    onMousedown(event) {

        if (shouldResize(event)) {
            resizeHandler(this.$root, event)
        }
    }


}
