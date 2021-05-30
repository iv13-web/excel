import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
    static className = 'excel__formula'

    // $el будет наследоваться из DOMListener
    constructor ($root) {
        // данный метод super - это то же, что и constructor в ExcelComponents
        // объект после $el - это опции для конструктора в ExcelComponents
        super($root, {
            name: 'Formula',
            // добавляем слушатели
            listeners: ['input']

        })
    }

    toHTML() {
        return `
            <div class="info">fx</div>
            <div class="input" contenteditable spellcheck="false"></div>
        `
    }

    onInput(event) {
        console.log(this.$root);
        console.log('Formula: onInput', event.target.textContent);
    }
}
