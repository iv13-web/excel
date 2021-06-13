import {$} from '@core/dom';
import {Observer} from "@core/Observer";

export class Excel {
    constructor(selector, options) {
        this.$el = $(selector);
        this.components = options.components || [];
        this.observer = new Observer()
    }


    // getContent() - получаем div, заполненный инстансами всех компонентов из массива components
    getRoot() {
        // создаем div, в котором будут лежать компоненты
        const $root = $.create('div', 'excel');

        const componentOptions = {
            observer: this.observer
        }

        // делаем map, чтобы каждый компонент получил в прототипе метод inint из ExcelComponents
        // и чтобы затем через forEach можно было у каждого компонента этот метод вызвать
        this.components = this.components.map(Component => {
            // добавляем static className из файлов header, table ...
            const $el = $.create('div', Component.className)
            // $el будет использоваться в DOMListener для добавления слуаштелей

            // в скобки передаем элемент для конструктора DOMListener, чтобы в будущем иметь доступ
            const component = new Component($el, componentOptions)

            // выведет на странцу то, что указано в методе toHTML() у каждого компонента
            // $el.innerHTML = component.toHTML(); можно сократить с помошью dom.js
            // component.toHTML() - разметка каждого компонента
            $el.html(component.toHTML())

            $root.append($el)
            return component
        })
        return $root
    }

    render() {
        // this.$el = div.#app в index.js
        this.$el.append(this.getRoot());
        this.components.forEach( component => component.init())

    }

    destroy() {
        this.components.forEach(component => component.destroy())
    }
}

