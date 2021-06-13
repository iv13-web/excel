import {$} from '@core/dom';
import {Observer} from "@core/Observer";

export class Excel {
    constructor(selector, options) {
        this.$el = $(selector);
        this.components = options.components || []
        // store и emitter - единые для всего приложения
        this.store = options.store
        this.observer = new Observer()
    }

    // getContent() - получаем div, заполненный инстансами всех компонентов из массива components
    getRoot() {
        const $root = $.create('div', 'excel');
        const componentOptions = {
            observer: this.observer,
            store: this.store
        }

        this.components = this.components.map(Component => {
            //$el - $root в компоненте (будет использоваться в DOMListener для добавления слуаштелей)
            const $el = $.create('div', Component.className)
            const component = new Component($el, componentOptions)
            $el.html(component.toHTML())
            $root.append($el)
            return component
        })
        return $root
    }

    render() {
        // this.$el = div.#app в index.js
        this.$el.append(this.getRoot());
        this.components.forEach(component => component.init())
    }

    destroy() {
        this.components.forEach(component => component.destroy())
    }
}

