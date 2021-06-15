import {$} from "@core/dom";
import {ExcelComponent} from '@core/ExcelComponent';
import {TableSelection} from "@/components/table/TableSelection";
import {createTable} from './table.template';
import {resizeHandler} from './table.resize'
import {isCell, matrix, nextSelector, shouldResize} from './table.helpers'
import * as actions from '@/store/actions'

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
        return createTable(20, this.store.getState())
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
            this.updateTextInStore(text) // redux
        })
        this.$on('formula:focus', () => {
            this.selection.current.focus()
        })

    }

    selectCell(cellType) {
        this.selection.selectCell(cellType)
        this.$emit('table:select', cellType)
    }

    async resizeTable(event) {
        try {
            const data = await resizeHandler(this.$root, event)
            console.log(data)
            this.$dispatch(actions.tableResize(data))
        } catch (e) {
            console.warn('Resize error', e.message)
        }
    }

    onMousedown(event) {

        if (shouldResize(event)) {
            this.resizeTable(event)
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

    updateTextInStore(text) {
        this.$dispatch(actions.changeText({
            id: this.selection.current.id(),
            text
        }))
    }

    onInput(event) {
        // this.$emit('table:input', $(event.target)) // будет проходить через store
        this.updateTextInStore($(event.target).text())
    }
}






