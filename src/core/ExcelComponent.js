import {DOMListener} from '@core/DOMListener';


export class ExcelComponent extends DOMListener {

    constructor ($root, options = {}) {
        // добавляем options.listeners из formula
        super ($root, options.listeners)
        this.name = options.name

        // prepare будет вызываться до init, т.к. вызывается в конструкторе
        this.prepare()
    }

    prepare() {

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
