import {range} from "@core/utilities";

export function shouldResize(event) {
    return event.target.dataset.resize
}

export function isCell (event) {
    return event.target.dataset.type === 'cell'
}

export function matrix($current, $target) {
/* для получения массива значенй, как в data-id у ячеек
ячейки A1-B2 вернут ["1:1", "2:1", "1:2", "2:2"] */
    const current = $current.id('parse')
    const target = $target.id('parse')
    const cols = range(current.col, target.col)
    const rows = range(current.row, target.row)

    return cols.reduce((acc, col)=> {
        rows.forEach(row => acc.push(`${row}:${col}`))
        return acc
    },[])
}

export function nextSelector(key, {row, col}) {
    const MIN_VALUE = 0
    switch (key) {
        case 'Tab':
            col++
            break
        case 'Enter':
        case 'ArrowDown':
            row++
            break
        case 'ArrowUp':
            row = row -1 < MIN_VALUE ? MIN_VALUE : row - 1
            break
        case 'ArrowLeft':
            col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1
            break
        case 'ArrowRight':
            col++
            break
    }
    return (`[data-id="${+row}:${+col}"]`)
}