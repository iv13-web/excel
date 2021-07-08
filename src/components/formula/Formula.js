import {ExcelComponent} from '@core/ExcelComponent';
import {$} from "@core/dom";

export class Formula extends ExcelComponent {
    static className = 'excel__formula'

    // $root будет наследоваться из DOMListener
    // options для передачи Observer в ExcelComponent
    constructor ($root, options) {
        super($root, {
            name: 'Formula',
            // добавляем слушатели
            listeners: ['input', 'keydown'],
            subscribe: ['currentText'],
            ...options
        })
    }

    toHTML() {
        return `
            <div class="info">fx</div>
            <div class="input" id="formula" contenteditable spellcheck="false"></div>`
    }

    init() {
        super.init()

        this.$formula = this.$root.find('#formula')

        // Observer
        this.$on('table:select', $cell => {
            this.$formula.text($cell.text())
        })
    }

    storeChanged({currentText}) {
        this.$formula.text(currentText)
    }

    onInput(event) {
        this.$emit('formula:input', $(event.target).text())
    }

    onKeydown(event) {
        const keysPrevent = ['Enter', 'Tab']
        if (keysPrevent.includes(event.key)) {
            event.preventDefault()
            this.$emit('formula:focus')
        }
    }
}
