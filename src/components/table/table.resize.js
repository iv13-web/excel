import {$} from '@core/dom';

export function resizeHandler($root, event) {

    return new Promise(resolve => {
        const resizer = $(event.target)
        // data - метод в dom для dataset
        const type = resizer.data.resize
        // в dom сделан свой метод closest, чтобы parent был от класса Dom
        const parent = resizer.closest('[data-type="resizable"]')
        const coordinates = parent.getCoordinates()
        const cells = $root.findAll(`[data-col="${parent.data.col}"`)
        const sideProp = type === 'col' ? 'left' : 'top'
        let clickBugOnMousemove = false
        let value

        document.onclick = () => clickBugOnMousemove = true

        document.onmousemove = e => {
            if (clickBugOnMousemove) return
            const deltaX = e.pageX - coordinates.right
            const deltaY = e.pageY - coordinates.bottom

            if (type === 'col') {
                value = coordinates.width + deltaX
                resizer.css({left: value+'px'})
            }
            if (type === 'row') {
                value = coordinates.height + deltaY
                resizer.css({top: value+'px'})
            }

            document.onmouseup = () => {

                document.onmousemove = null

                type === 'col'
                    ? cells.forEach(cell => $(cell).css({width: value+'px'}))
                    : parent.css({height: value+'px'})
                resizer.css({[sideProp] : 'auto'})

                resolve({
                    value,
                    id: type === 'col' ? parent.data.col : parent.data.row,
                    type
                })
            }
        }
    })
}