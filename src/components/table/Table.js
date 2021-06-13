import {$} from "@core/dom";
import {ExcelComponent} from '@core/ExcelComponent';
import {TableSelection} from "@/components/table/TableSelection";
import {createTable} from './table.template';
import {resizeHandler} from './table.resize'
import {isCell, matrix, nextSelector, shouldResize} from './table.helpers'

export class Table extends ExcelComponent {
    static className = 'excel__table'

    // this.$root - Dom{excel__table}
    constructor ($root, options) {
        super ($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options

        })
    }

    toHTML() {
        return createTable(20)
    }

    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        /* super для обработчиков и реасайза */
        super.init()
        const $startCell = this.$root.find('[data-id="1:1"]')
        this.selectCell($startCell)

        this.$on('formula:input', text => {
            this.selection.current.text(text)
        })
        this.$on('formula:focus', () => {
            this.selection.current.focus()
        })

        this.$subscribe(state => {
            console.log('Tablestate', state)
        })
    }

    selectCell(cellType) {
        this.selection.selectCell(cellType)
        this.$emit('table:select', cellType)
    }

    onMousedown(event) {

        if (shouldResize(event)) {
            resizeHandler(this.$root, event)
        }

        if (isCell(event)) {
            const $target = $(event.target)

            if (event.shiftKey) {
                const cellsArray = matrix($target, this.selection.current)
                const $cells = cellsArray.map(id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup($cells)

            } else {
                this.selectCell($target)
            }
        }
    }

    onKeydown(event) {
        const $target = this.selection.current.id(true)
        let {row, col} = $target

        // забираю event.key через деструкт.
        const {key} = event
        const keys = ['Tab', 'Enter', 'ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight']

        if (keys.includes(key) && !event.shiftKey) {
            event.preventDefault()
            const $next = this.$root.find(nextSelector(key, {row, col}))
            this.selectCell($next)
        }
    }

    onInput(event) {
        this.$emit('table:input', $(event.target))
    }
}






