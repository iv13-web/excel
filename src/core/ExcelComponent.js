import {DOMListener} from '@core/DOMListener';

// "фреймворк" для взаимодействия с компонентами
export class ExcelComponent extends DOMListener {

    constructor ($root, options = {}) {
        // добавляем options.listeners из formula
        super ($root, options.listeners)
        this.name = options.name
        this.observer = options.observer
        this.store =  options.store
        this.unsubscribers = []
        this.storeSub = null

        this.prepare()
    }

    prepare() {

    }

    toHTML() {

    }

    // фасады
    $emit(eventName, ...args) {
        this.observer.emit(eventName, ...args)
    }
    $on(eventName, fn) {
        const unsub = this.observer.subscribe(eventName, fn)
        this.unsubscribers.push(unsub)
    }

    $dispatch(action) {
        this.store.dispatch(action)
    }

    $subscribe(fn) {
        this.storeSub = this.store.subscribe(fn)
    // подписка будет 1 раз на уровне Excel
    // const sub = this.store.subscribe(fn)
    // sub.unsubscribe()

    }

    // централизованная реализация добавления слушателей
    init () {
        this.initDOMListeners()
    }

    destroy () {
        this.removeDOMListeners()
        this.unsubscribers.forEach(unsub => unsub())
        this.storeSub.unsubscribe()
    }
}
