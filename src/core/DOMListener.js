import {capitalizeFirstLetter} from '@core/utilities'
/*
В DOMListener будем передавать массив слушателей для каждого компонента.
Добавлять слушатели надо после рендера в excel.js, чтобы было на что вешать слушатели
*/

export class DOMListener {
    // $element - компоненты, на которые будем вешать слушатели
    // в конструкторе делаем возможность получить доступ до этого элемента, чтобы повесить обработчик
    constructor($element, listeners = []) {
        if (!$element) {
            throw new Error('No $element provided')
        }
        // на $element (инстанс класса Dom) будем вещать обработчик
        this.$element = $element
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
            // bind, чтобы привязать контекст к Dom-formula и иметь доступ к $element в onInput() в formula.js
            this.$element.on(listener, this[method].bind(this))
        })
    }

    removeDOMListeners() {
        
    }


}


function getMethodName (eventName) {
    return 'on' + capitalizeFirstLetter(eventName)
}