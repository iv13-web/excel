import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './table.template';
import {$} from '@core/dom';

export class Table extends ExcelComponent {
    static className = 'excel__table'   

    constructor ($root) {

        super ($root, {
            
            listeners: ['mousedown']
        })
    }

    toHTML() {
        return createTable(55)
    }

    // onClick() {
    //     console.log('click');
    // }

    onMousedown(event) {
        if (event.target.dataset.resize) {
            // target - это сам resizer
            const resizer = $(event.target)
            // const parent = resizer.$el.closest('[data-type="resizable"]');
            // в dom сделан свой метод closest, чтобы parent был от класса Dom
            const parent = resizer.closest('[data-type="resizable"]')
            const coordinates = parent.getCoordinates()
            const cells = this.$root.findAll(`[data-col="${parent.dataset.col}"`)
            


            // document.onmousemove = e => {

            //     if (resizer.dataset.resize === 'col') {
            //         const delta = e.pageX - coordinates.right
            //         const newSize = coordinates.width + delta
            //         // parent.$el.style.width = newSize + 'px'
            //         cells.forEach(cell => $(cell).css({width: newSize+'px'}))
            //     }

            //     if (resizer.dataset.resize === 'row') {
            //         const delta = e.pageY - coordinates.bottom
            //         const newSize = coordinates.height + delta
            //         parent.css({height: newSize+'px'})
            //     }



                
            // }
            
            // document.onmouseup = () => {
            //     document.onmousemove = null
            // }

            

            document.onmousemove = e => {

                let deltaX = e.pageX - coordinates.right
                let newSizeX = coordinates.width + deltaX

                let deltaY = e.pageY - coordinates.bottom
                let newSizeY = coordinates.height + deltaY
                
                
                
                document.onmouseup = () => {

                    if (resizer.dataset.resize === 'col') {

                        cells.forEach(cell => $(cell).css({width: newSizeX+'px'}))
                        document.onmousemove = null
                    }
                    if (resizer.dataset.resize === 'row') {

                        parent.css({height: newSizeY+'px'})
                        document.onmousemove = null
                    }
                }

            
            }
        }
        
        
    }

    // onMousemove() {

    // }

    // onMouseup() {
    //     console.log('mouseup');
    // }

}
