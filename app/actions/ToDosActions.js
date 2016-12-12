import Dispatcher from '../dispatcher';

import api from '../api';

const ToDosActions = {
	get() {
		api.get('todo').then(data => {
			Dispatcher.dispatch({
				type: 'get',
				items: data.items
			});
		});
	},

	post(todo) {
		api.post('todo', { title: todo }).then(data => {
			Dispatcher.dispatch({
				type: 'post',
				items: data.items
			});
		});
	}
};

export default ToDosActions;
