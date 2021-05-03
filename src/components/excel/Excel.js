export class Excel {
    constructor(selector, options) {
        this.$el = document.querySelector(selector)
        // в массив components можем передавать классы header, formula etc
        this.components = options.components || []
    }

    /* getRoot() :
    создает div,
    создает инстансы классов из components,
    вставляет их в div
    */
    getRoot() {
        const $root = document.createElement('div')
        // console.log(this.components) - header, toolbar...
        this.components.forEach((Component) => {
            // component будет новым instance классов Header, Toolbar etc
            const component = new Component()
            // выведет на странцу то, что указано в методе toHTML() у компонента
            $root.insertAdjacentHTML('beforeend', component.toHTML())
        })
        // получаем заполненный div
        return $root
    }

    render() {
        this.$el.append(this.getRoot())
    }
}

