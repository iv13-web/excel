import {CHANGE_TEXT, TABLE_RESIZE} from "@/store/types";

export function rootReducer(state, action) {
	let prevState
	switch (action.type) {
		case TABLE_RESIZE:
			const stateKey = action.data.type === 'col' ? 'colState' : 'rowState'
			prevState = state[stateKey] || {}
			prevState[action.data.id] = action.data.value
			return {...state, [stateKey]: prevState} // № колоники и ширина + px

		case CHANGE_TEXT:
			prevState = state.dataState || {}
			prevState[action.data.id] = action.data.text
			return {...state, currentText: action.data.text, dataState: prevState}

		default: return state
	}

}
