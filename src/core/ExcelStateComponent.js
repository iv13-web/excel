import {ExcelComponent} from "./ExcelComponent";

export class ExcelStateComponent extends ExcelComponent {
	constructor(...args) {
		super(...args)
	}

	get template() {
		return JSON.stringify(this.state, null, '\t')
	}

	initState(initialState = {}) {
		this.state = {...initialState}
	}

	setState(newState) {
		this.state = {...this.state, ...newState}
		this.$root.html()
	}
}