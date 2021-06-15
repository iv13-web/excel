import {storage} from "@core/utilities";

const CODES = {A: 65, Z: 90}

const excelState = storage('excel-state')
const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function getWidth (colIndex) {
    if (excelState?.colState[colIndex]) {
        return (colIndex in excelState.colState)
            && excelState.colState[colIndex]
    }
    return DEFAULT_WIDTH
}

function getHeight (rowIndex) {
    if (excelState?.rowState[rowIndex]) {
        return (rowIndex in excelState.rowState)
            && excelState.rowState[rowIndex]
    }
    return DEFAULT_HEIGHT
}

function getCellText (id) {
    if (excelState?.dataState[id]) {
        return (id in excelState.dataState)
            && excelState.dataState[id]
    }
    return ''
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index)
}

function createCell(colIndex, rowIndex) {
    const id = `${rowIndex}:${colIndex}`
    return `
        <div class="cell" contenteditable
            data-col=${colIndex}
            data-id=${id}
            data-type="cell"
            style="width: ${getWidth(colIndex)}px"
        >${getCellText(id)}</div>`
}

function createColumn(el, i) {
    // el - буква для шапки табоицы
    return `
    <div class="column"
         data-type="resizable"
         data-col=${i}
         style="width: ${getWidth(i)}px"
         >
        ${el}
        <div class="col-resize" data-resize="col"></div>
    </div>`
}

function createRow(content, i='') {
    // тернарник, чтобы убрать resizer в верхней левой ячейкке
    const resizer = i !== ''
        ? `<div class="row-resize" data-resize="row"></div>`
        : ''

    return `
        <div class="row" data-type="resizable" style="height: ${getHeight(i)}px" data-row="${i}">
            <div class="row-info">
                ${i}
                ${resizer}
            </div>
            <div class="row-data">${content}</div>
        </div>
    `
}

export function createTable (rowsCount = 10) {
    // +1, чтобы символ Z учелся
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []
    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        // .map((_, index) => String.fromCharCode(CODES.A + index))
        .map(createColumn)
        // .map(createColumn) то же самое, что и ниже
        // .map((el, i) => createColumn(el, i)); el - буква
        .join('')

    // шапка таблицы
    rows.push(createRow(cols))

    // создаем переменные cells в цикле, чтобы потом добавлять id
    for (let row = 0; row < rowsCount; row++) {
        const cells = new Array(colsCount)
        .fill('')
        .map((_, col) => createCell(col, row))
        .join('')
        rows.push(createRow(cells, row+1))
    }
    return rows.join('')
}


//// код для работы со стейтом, который передаем в Table.js в toHTML(). Выше код работает через LS.
// const CODES = {A: 65, Z: 90}
//
// const DEFAULT_WIDTH = 120
// const DEFAULT_HEIGHT = 24
//
// function getWidth(state, colIndex) {
//     return (state[colIndex] || DEFAULT_WIDTH) + 'px'
// }
//
// function getHeight(state, rowIndex) {
//     return (state[rowIndex] || DEFAULT_HEIGHT) + 'px'
// }
//
// function createCell(state, row) {
//     return function(_, col) {
//         const width = getWidth(state, col)
//         return `
//       <div
//         class="cell"
//         contenteditable
//         data-col="${col}"
//         data-type="cell"
//         data-id="${row}:${col}"
//         style="width: ${width}"
//       >${data || ''}</div>
//     `
//     }
// }
//
// function createColumn({el, index, width}) {
//     return `
//     <div
//       class="column"
//       data-type="resizable"
//       data-col="${index}"
//       style="width: ${width}"
//     >
//       ${el}
//       <div class="col-resize" data-resize="col"></div>
//     </div>
//   `
// }
//
// function createRow(index, content, state) {
//     const resize = index ? '<div class="row-resize" data-resize="row"></div>' : ''
//     const height = getHeight(state, index)
//     return `
//     <div
//       class="row"
//       data-type="resizable"
//       data-row="${index}"
//       style="height: ${height}"
//     >
//       <div class="row-info">
//         ${index ? index : ''}
//         ${resize}
//       </div>
//       <div class="row-data">${content}</div>
//     </div>
//   `
// }
//
// function toChar(_, index) {
//     return String.fromCharCode(CODES.A + index)
// }
//
// function withWidthFrom(state) {
//     return function(el, index) {
//         return {
//             el, index, width: getWidth(state.colState, index)
//         }
//     }
// }
//
// export function createTable(rowsCount = 15, state = {}) {
//     const colsCount = CODES.Z - CODES.A + 1 // Compute cols count
//     const rows = []
//
//     const cols = new Array(colsCount)
//         .fill('')
//         .map(toChar)
//         .map(withWidthFrom(state))
//         .map(createColumn)
//         .join('')
//
//     rows.push(createRow(null, cols, {}))
//
//     for (let row = 0; row < rowsCount; row++) {
//         const cells = new Array(colsCount)
//             .fill('')
//             .map(createCell(state.colState, row))
//             .join('')
//
//         rows.push(createRow(row + 1, cells, state.rowState))
//     }
//
//     return rows.join('')
// }
