import {CHANGE_TEXT, TABLE_RESIZE} from "@/store/types";

export function rootReducer(state, action) {
	let prevState
	switch (action.type) {
		case TABLE_RESIZE:
			const stateKey = action.data.type === 'col' ? 'colState' : 'rowState'
			prevState = state[stateKey] || {}
			prevState[action.data.id] = action.data.value
			console.log([stateKey], prevState)
			return {...state, [stateKey]: prevState} // № колоники и ширина + px

		case CHANGE_TEXT:
			// return {...state, currentText: action.text}
			prevState = state['dataState'] || {}
			prevState[action.data.id] = action.data.text
			return {...state, currentText: action.data.text, dataState: prevState}

		default: return state
	}

}

// export function rootReducer(state, action) {
// 	let prevState
// 	switch (action.type) {
// 		case TABLE_RESIZE:
// 			prevState = state.colState || {}
// 			prevState[action.data.id] = action.data.value
// 			return {...state, colState: prevState} // id, value
// 		default: return state
// 	}
// }