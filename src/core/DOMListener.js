import {capitalizeFirstLetter} from '@core/utilities'
/*
В DOMListener будем передавать массив слушателей для каждого компонента.
Добавлять слушатели надо после рендера в excel.js, чтобы было на что вешать слушатели
*/

export class DOMListener {
    // $el - компоненты, на которые будем вешать слушатели
    // в конструкторе делаем возможность получить доступ до этого элемента, чтобы повесить обработчик
    constructor($root, listeners = []) {
        if (!$root) {
            throw new Error('No $el provided')
        }
        // на $el (инстанс класса Dom) будем вещать обработчик
        this.$root = $root
        this.listeners = listeners
    }

    initDOMListeners() {
        // listener будет обычной строкой (например, "input" из formula)
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            // проверка, если в массив добавлен listener для которого еще нет метода on...
            if (!this[method]) {
                throw new Error (`Method ${method} is undefined in ${this.name} Component`)
            }
            // this - инстанс класса компонента, например Formula
            // this[method] - callbak функция из прототипа
            // bind, чтобы привязать контекст к Dom-formula и иметь доступ к $root в onInput() в formula.js
            // bind создает новую функцию, поэтому прямым аналогом removeDOMListeners не получится пользоваться
            // this.$root.on(listener, this[method].bind(this))
            // рабочий вариант:
            this[method] = this[method].bind(this)
            this.$root.on(listener, this[method])

        })
    }

    removeDOMListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            if (!this[method]) {
                throw new Error (`Method ${method} is undefined in ${this.name} Component`)
            }
            this.$root.off(listener, this[method])
        })
    }
}

function getMethodName (eventName) {
    return 'on' + capitalizeFirstLetter(eventName)
}