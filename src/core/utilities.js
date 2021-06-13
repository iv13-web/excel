export function capitalizeFirstLetter (string) {
    if (typeof string !== 'string') {
        return ''
    }
    return (string.charAt(0).toUpperCase() + string.slice(1))
}

export function range(start, end) {
/* function range для просчета ячеек к выделению
input: 0,4 => output: 0,1,2,3,4 */
    if (start > end) [end, start] = [start, end]
    return new Array(end - start + 1)
        .fill('')
        .map((_, i) => start + i)
}