import {$} from "@core/dom";
import {ExcelComponent} from '@core/ExcelComponent';
import {TableSelection} from "@/components/table/TableSelection";
import {createTable} from './table.template';
import {resizeHandler} from './table.resize'
import {isCell, shouldResize} from './table.helpers'


export class Table extends ExcelComponent {
    static className = 'excel__table'   
    // this.$root - Dom{excel__table}
    constructor ($root) {
        super ($root, {  
            listeners: ['mousedown']
        })
    }

    toHTML() {
        return createTable(20)
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

        if (isCell(event)) {
            const $target = $(event.target)

            if (event.shiftKey) {
                const target = $target.id(true)
                const current = this.selection.current.id(true)
                const cols = range(current.col, target.col)
                const rows = range(current.row, target.row)

                // для получения значенй, как в data-id у ячеек
                // ячейки A1-B2 вернут ["1:1", "2:1", "1:2", "2:2"]
                const ids = cols.reduce((acc, col)=> {
                    rows.forEach(row => acc.push(`${row}:${col}`))
                    return acc
                },[])


                ids.forEach(id => this.$root.find(`[data-id="${id}"]`).css({backgroundColor: 'red'}))


            } else {
                this.selection.selectCell($target)
            }
        }
    }
}

/* function range
input: 0,4
output: 0,1,2,3,4
для просчета ячеек к выделению
*/

function range(start, end) {
    if (start > end) [end, start] = [start, end]
    return new Array(end - start + 1)
        .fill('')
        .map((_, i) => start + i)
}
