const CODES = {
    A: 65,
    Z: 90 
}

function createCell() {
    return `<div class="cell" contenteditable></div>`   
}

function createColumn(el) {
    return `<div class="column">${el}</div>`
}

function createRow(content, i='') {
    return `
        <div class="row">
            <div class="row-info">${i}</div>
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
        .map((_, index) => {
            return String.fromCharCode(CODES.A + index) 
        })
        // можно передать по ссылке createColumn в map
        //.map(createColumn)
        //   .map(el => createColumn(el))
        .map(el => createColumn(el))
        .join('')    
    

    // шапка таблицы
    rows.push(createRow(cols))

    
    // создаем переменные cells в цикле, чтобы потом добавлять id
    for (let i = 0; i < rowsCount; i++) {
        const cells = new Array(colsCount)
        .fill('')
        .map(createCell)
        .join('')

        rows.push(createRow(cells, i+1))
    }

    return rows.join('')
}