export class Observer {
	constructor() {
		this.listeners = {}
	}

	emit(eventName, ...args) {
		if (!Array.isArray(this.listeners[eventName])) {
			return false
		}
		this.listeners[eventName].forEach(listener => {
			listener(...args)
		})
	}

	subscribe(eventName, fn) {
		this.listeners[eventName] = this.listeners[eventName] || []
		this.listeners[eventName].push(fn)
		// замыкание для отписки от события
		return () => {
			this.listeners[eventName] =
				this.listeners[eventName].filter(listener => listener !== fn)
		}
	}
}
// в формуле тригерим событие, а в таблице подписываемся и описываем функцию