import { EventEmitter } from 'events';

import Dispatcher from '../dispatcher';

const CHANGE_EVENT = 'change';

let _todos = [];

const ToDosStore = Object.assign({}, EventEmitter.prototype, {
	getToDos() {
		return _todos;
	},

	emitChange() {
		this.emit(CHANGE_EVENT);
	},

	addChangeListener(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}
});

Dispatcher.register(function(action) {
	switch(action.type) {

		case 'get': {
			_todos = action.items;

			ToDosStore.emitChange();
			break;
		}

		case 'post': {
			_todos.push(action.items);

			ToDosStore.emitChange();
			break;
		}

		default: {}

	}
});

export default ToDosStore;
