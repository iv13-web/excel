import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
    static className = 'excel__formula'

    // $element будет наследоваться из DOMListener
    constructor ($element) {
        // данный метод super - это то же, что и constructor в ExcelComponents
        // объект после $element - это опции для конструктора в ExcelComponents
        super($element, {
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
        console.log(this.$element);
        console.log('Formula: onInput', event.target.textContent);
    }
}
