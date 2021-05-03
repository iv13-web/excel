import 'core-js/stable'
import 'regenerator-runtime/runtime'
import './scss/index.scss'
import {Excel} from './components/excel/Excel';

const excel = new Excel('#app', {
    components: [] // header, toolbar etc
})

console.log('Excel', excel)

