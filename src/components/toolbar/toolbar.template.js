function toButton(button) {
	const meta = `
		data-type = "button"
		data-value = '${JSON.stringify(button.value)}'
	`
	return `
		<div 
			class="button ${button.isActive ? 'active' : ''}"
			${meta}
		>
				<i 
					class="material-icons" 
					${meta}>${button.icon}
				</i>
		</div>
	`
}

export function createToolbar(state) {
	console.log(state)
	const buttons = [
		{
			icon: 'format_align_left',
			isActive: false,
			value: {textAlign: 'left'}
		},
		{
			icon: 'format_align_center',
			isActive: false,
			value: {textAlign: 'center'}
		},
		{
			icon: 'format_align_right',
			isActive: false,
			value: {textAlign: 'right'}
		},
		{
			icon: 'format_bold',
			// isActive: state.fontWeight === 'bold',
			isActive: state['fontWeight'] === 'bold',
			value: {fontWeight: 'bold'}
		},
		{
			icon: 'format_italic',
			isActive: false,
			value: {fontStyle: 'italic'}
		},
		{
			icon: 'format_underline',
			isActive: false,
			value: {textDecoration: 'underline'}
		},
	]
	return buttons.map(toButton).join('')
}