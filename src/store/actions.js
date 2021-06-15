import {CHANGE_TEXT, TABLE_RESIZE} from "@/store/types";
// action creators
export function tableResize (data) {
	return {
		type: TABLE_RESIZE,
		data
	}
}

export function changeText (data) {
	return {
		type: CHANGE_TEXT,
		// data - объект из Table onInput, который прокидываем через changeText
		data
	}
}