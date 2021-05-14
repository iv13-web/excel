import {dom} from '@core/dom';
// $someName - какой-либо DOM элемент

export class Excel {
    constructor(selector, options) {
        // this.$element = document.querySelector(selector);
        this.$element = dom(selector);
        // в массив components передаем классы header, formula etc
        this.components = options.components || [];
    }


    // getContent() - получаем div, заполненный инстансами всех компонентов из массива components
    getContent() {
        // создаем div, в котором будут лежать компоненты
        const $parentDiv = dom.create('div', 'excel');
        // const $parentDiv = document.createElement('div')
        // $parentDiv.classList.add('excel')
        
        // this.components = header, toolbar...
        // для каждого компонента создаем div



        // делаем map, чтобы каждый компонент получил в прототипе метод inint из ExcelComponents
        // и чтобы затем через forEach можно было у каждого компонента этот метод вызвать
        this.components = this.components.map(Component => {
            // добавляем static className из файлов header, table ...
            const $element = dom.create('div', Component.className)
            // const $element = document.createElement('div')
            // $element.classList.add(Component.className)
            // $element будет использоваться в DOMListener для добавления слуаштелей

            // каждый component будет новым instance классов Header, Toolbar etc
            // в скобки передаем элемент для конструктора DOMListener, чтобы в будущем иметь доступ
            const component = new Component($element)

            // выведет на странцу то, что указано в методе toHTML() у каждого компонента
            // $element.innerHTML = component.toHTML(); можно сократить с помошью dom.js
            // component.toHTML() - разметка каждого компонента
            $element.html(component.toHTML())

            $parentDiv.append($element)
            return component
        })
        return $parentDiv


        // this.components.forEach(Component => {
        //     // добавляем static className из файлов header, table ...
        //     const $element = dom.create('div', Component.className)
        //     // const $element = document.createElement('div')
        //     // $element.classList.add(Component.className)
        //     // $element будет использоваться в DOMListener для добавления слуаштелей

        //     // каждый component будет новым instance классов Header, Toolbar etc
        //     // в скобки передаем элемент для конструктора DOMListener, чтобы в будущем иметь доступ
        //     const component = new Component($element)

        //     // выведет на странцу то, что указано в методе toHTML() у каждого компонента
        //     // $element.innerHTML = component.toHTML(); можно сократить с помошью dom.js
        //     // component.toHTML() - разметка каждого компонента
        //     $element.html(component.toHTML())

        //     $parentDiv.append($element)
        // })
        // // получаем заполненный div (.$element, т.к это инастанс класса DOM) => return $parentDiv.$element
        // // но также это можно исправить, обернув в dom() document.querySelector(selector) => dom(selector)
        // return $parentDiv
    }

    render() {
        // this.$element = div.#app в index.js
        this.$element.append(this.getContent());
        this.components.forEach( component => component.init())
    }
}

