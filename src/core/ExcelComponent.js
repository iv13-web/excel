import {DOMListener} from '@core/DOMListener';


export class ExcelComponent extends DOMListener {

    constructor ($root, options = {}) {
        // добавляем options.listeners из formula
        super ($root, options.listeners)
        this.name = options.name
    }

    // возвращает шаблон компонента
    toHTML() {
        return ''
    }

    // централизованная реализация добавления слушателей
    init () {
        this.initDOMListeners()
    }

    destroy () {
        this.removeDOMListeners()
    }
}
