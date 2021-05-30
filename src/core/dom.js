// УТИЛИТА ДЛЯ ВЗАИМОДЕЙСТВИЯ С DOM 

class Dom {
    constructor (selector) {
        // если selector - строка (например, #app)
        this.$el = typeof selector === 'string' 
            ? document.querySelector(selector)
            : selector
    }

    html(html) {
        // в данном случае работает как setter
        if (typeof html === 'string') {
            this.$el.innerHTML = html
            // return this делается для того, чтобы можно было выполнять chain, например в методе clear
            return this
        } 
        // в данном случае работает как getter
        return this.$el.outerHTML.trim()
    }

    clear() {
        this.html('')
        return this
    }

    append(nodeToAppend) {
        // проверка на случай, если захотим использовать нативную ноду, а не инстанс
        if (nodeToAppend instanceof Dom) {
            nodeToAppend = nodeToAppend.$el
        }
        this.$el.append(nodeToAppend)
    }

    on(eventType, callback) {
        this.$el.addEventListener(eventType, callback)
    }

    off(eventType, callback) {
        this.$el.removeEventListener(eventType, callback)

    }

    
}

// чтобы не писать каждый раз new Dom.create(), а сразу писать методы
export function $(selector) {
    return new Dom(selector)
}

/*
Выносим данный метод из класса Dom, т.к. методы в классе относятся к какому-то элементу. 
То есть при инициализации объекта нам нужно передать туда селектор.
Если мы создаём новую дом ноду, то мы ещё не имеем доступа к ней. 
То есть нам сначала нужно ее создать, а потом только мы сможем использовать все методы.
*/
$.create = (tagName, className = '') => {
    const element = document.createElement(tagName)
    if (className) {
        element.classList.add(className)
    }
    // оборачиваем в dom, чтобы связать с классом DOM
    // после этого в excel.js $parentDiv и $el станут досутпны методы класса Dom (clear, html и т.д)
    return $(element)
    // return element
}
