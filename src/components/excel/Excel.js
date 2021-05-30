import {$} from '@core/dom';
// $someName - какой-либо DOM элемент

export class Excel {
    constructor(selector, options) {
        // this.$el = document.querySelector(selector);
        // создаем через доллар, чтобы у this.$el были доступны методы класса Dom
        this.$el = $(selector);
        // в массив components передаем классы header, formula etc
        this.components = options.components || [];
    }


    // getContent() - получаем div, заполненный инстансами всех компонентов из массива components
    getContent() {
        // создаем div, в котором будут лежать компоненты
        const $root = $.create('div', 'excel');
        // const $root = document.createElement('div')
        // $root.classList.add('excel')
        
        // this.components = header, toolbar...
        // для каждого компонента создаем div



        // делаем map, чтобы каждый компонент получил в прототипе метод inint из ExcelComponents
        // и чтобы затем через forEach можно было у каждого компонента этот метод вызвать
        this.components = this.components.map(Component => {
            // добавляем static className из файлов header, table ...
            const $el = $.create('div', Component.className)
            // const $el = document.createElement('div')
            // $el.classList.add(Component.className)
            // $el будет использоваться в DOMListener для добавления слуаштелей

            // каждый component будет новым instance классов Header, Toolbar etc
            // в скобки передаем элемент для конструктора DOMListener, чтобы в будущем иметь доступ
            const component = new Component($el)

            // выведет на странцу то, что указано в методе toHTML() у каждого компонента
            // $el.innerHTML = component.toHTML(); можно сократить с помошью dom.js
            // component.toHTML() - разметка каждого компонента
            $el.html(component.toHTML())

            $root.append($el)
            return component
        })
        return $root


        // this.components.forEach(Component => {
        //     // добавляем static className из файлов header, table ...
        //     const $el = dom.create('div', Component.className)
        //     // const $el = document.createElement('div')
        //     // $el.classList.add(Component.className)
        //     // $el будет использоваться в DOMListener для добавления слуаштелей

        //     // каждый component будет новым instance классов Header, Toolbar etc
        //     // в скобки передаем элемент для конструктора DOMListener, чтобы в будущем иметь доступ
        //     const component = new Component($el)

        //     // выведет на странцу то, что указано в методе toHTML() у каждого компонента
        //     // $el.innerHTML = component.toHTML(); можно сократить с помошью dom.js
        //     // component.toHTML() - разметка каждого компонента
        //     $el.html(component.toHTML())

        //     $parentDiv.append($el)
        // })
        // // получаем заполненный div (.$el, т.к это инастанс класса DOM) => return $parentDiv.$el
        // // но также это можно исправить, обернув в dom() document.querySelector(selector) => dom(selector)
        // return $parentDiv
    }

    render() {
        // this.$el = div.#app в index.js
        this.$el.append(this.getContent());
        this.components.forEach( component => component.init())


    }
}

