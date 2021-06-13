import {$} from '@core/dom';

export function resizeHandler($root, event) {

    // target - это сам resizer
    const resizer = $(event.target)
    // data - метод в dom для dataset
    const type = resizer.data.resize
     // const parent = resizer.$el.closest('[data-type="resizable"]');
     // в dom сделан свой метод closest, чтобы parent был от класса Dom
    const parent = resizer.closest('[data-type="resizable"]')
    const coordinates = parent.getCoordinates()
    const cells = $root.findAll(`[data-col="${parent.data.col}"`)
    const sideProp = type === 'col' ? 'left' : 'top'

    document.onmousemove = e => {
        let deltaX = e.pageX - coordinates.right
        let newSizeX = coordinates.width + deltaX
        let deltaY = e.pageY - coordinates.bottom
        let newSizeY = coordinates.height + deltaY
        
        type === 'col' 
            ? resizer.css({left: newSizeX+'px'})
            : resizer.css({top: newSizeY+'px'})
        
        document.onmouseup = () => {
            type === 'col'
                ? cells.forEach(cell => $(cell).css({width: newSizeX+'px'}))
                : parent.css({height: newSizeY+'px'})
            resizer.css({[sideProp] : 'auto'})
            document.onmousemove = null
        }
    }
}