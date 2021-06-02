const CODES = {
    A: 65,
    Z: 90 
}

function createCell(col, row) {
    return `<div class="cell" contenteditable 
                 data-col=${col}
                 data-id=${row+1}:${col+1}
                 data-type="cell"> 
            </div>`
}

// el - буква для шапки табоицы
function createColumn(el, i) {
    return `
    <div class="column" data-type="resizable" data-col=${i}>
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
        <div class="row" data-type="resizable" data-row="${i}">
            <div class="row-info">${i}</div>
            <div class="row-data">${content}</div>
            ${resizer}
        </div>
    `
}

export function createTable (rowsCount = 10) {
    // +1, чтобы символ Z учелся
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []

    const cols = new Array(colsCount)
        .fill('')
        .map((_, index) => {
            return String.fromCharCode(CODES.A + index) 
        })
        // можно передать по ссылке createColumn в map
        //.map(createColumn)
        //   .map(el => createColumn(el))
        // el - буква
        .map((el, i) => createColumn(el, i))
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