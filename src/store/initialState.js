import {storage} from "@core/utilities";

const defaultState = {
	rowState: {},
	colState: {},
	dataState: {}, // {'0:1':'текст'}
	currentText: '',

}

export const initialState = storage('excel-state')
	? storage('excel-state')
	: defaultState