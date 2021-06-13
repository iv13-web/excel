import {DOMListener} from '@core/DOMListener';


export class ExcelComponent extends DOMListener {

    constructor ($root, options = {}) {
        // добавляем options.listeners из formula
        super ($root, options.listeners)
        this.name = options.name
        this.observer = options.observer
        this.unsubscribers = []

        // prepare будет вызываться до init, т.к. вызывается в конструкторе
        this.prepare()
    }

    prepare() {

    }

    // возвращает шаблон компонента
    toHTML() {
        return ''
    }

    $emit(eventName, ...args) {
        this.observer.emit(eventName, ...args)
    }

    $on(eventName, fn) {
        const unsub = this.observer.subscribe(eventName, fn)
        this.unsubscribers.push(unsub)
    }

    // централизованная реализация добавления слушателей
    init () {
        this.initDOMListeners()
    }

    destroy () {
        this.removeDOMListeners()
        this.unsubscribers.forEach(unsub => unsub())
    }
}
