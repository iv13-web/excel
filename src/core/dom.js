// УТИЛИТА ДЛЯ ВЗАИМОДЕЙСТВИЯ С DOM 

class Dom {
    constructor (selector) {
        // если selector - строка (например, #app)
        this.$element = typeof selector === 'string' 
            ? document.querySelector(selector)
            : selector
    }

    html(html) {
        if (typeof html === 'string') {
            this.$element.innerHTML = html
            // return this делается для того, чтобы можно было выполнять
            // chain, например в методе clear
            return this
        } 
        // иначе будем возвращать:
        return this.$element.outerHTML.trim()
    }

    clear() {
        this.html('')
        return this
    }

    append(nodeToAppend) {
        // проверка на случай, если захотим использовать нативную ноду, а не инстанс
        if (nodeToAppend instanceof Dom) {
            nodeToAppend = nodeToAppend.$element
        }
        this.$element.append(nodeToAppend)
    }

    on(eventType, callback) {
        this.$element.addEventListener(eventType, callback)
    }

    
}

// чтобы не писать каждый раз new Dom.create(), а сразу писать методы
export function dom(selector) {
    return new Dom(selector)
}

/*
Выносим данный метод из класса Dom, т.к. методы в классе относятся к какому-то элементу. 
То есть при инициализации объекта нам нужно передать туда селектор.
Если мы создаём новую дом ноду, то мы ещё не имеем доступа к ней. 
То есть нам сначала нужно ее создать, а потом только мы сможем использовать все методы.
*/
dom.create = (tagName, className = '') => {
    const element = document.createElement(tagName)
    if (className) {
        element.classList.add(className)
    }
    // оборачиваем в dom, чтобы связать с классом DOM
    // после этого в excel.js $parentDiv и $element станут инстанасами класса DOM
    return dom(element)
    // return element
}
