export class TableSelection {

    static className = 'selected'

    constructor() {
        this.group = [] // массива для выбранных ячеек
        this.current = null
    }

    selectCell($el) {
        this.clear()
        $el.focus().addClass(TableSelection.className)
        this.group.push($el)
        this.current = $el
    }

    clear() {
        this.group.forEach($el => $el.removeClass(TableSelection.className))
        this.group.forEach($el => $el.css({backgroundColor: 'inherit'})) // надо тестировать
        this.group = []
    }

    selectGroup($group = []) {
        this.clear()
        this.group = $group
        // this.group.forEach($el => $el.addClass(TableSelection.className))
        this.group.forEach($el => $el.css({backgroundColor: 'rgba(21,165,19,0.1)'})) // возможно придется убрать
    }

}