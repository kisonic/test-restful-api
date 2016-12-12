import React from 'react';

import ToDosStore from '../../stores/ToDosStore';
import ToDoForm   from '../ToDoForm';
import ToDoList   from '../ToDoList';

import './index.styl';

function getStateFromFlux() {
	return {
		items: ToDosStore.getToDos()
	};
}

const ToDo = React.createClass({
	getInitialState() {
		return getStateFromFlux();
	},

	componentDidMount() {
		ToDosStore.addChangeListener(this._onChange);
	},

	componentWillUnmount() {
		ToDosStore.removeChangeListener(this._onChange);
	},

	render() {
		return (
			<div className='todo'>
				<h1 className='todo__title'>To Do</h1>
				<div className='todo__row'>
					<ToDoForm />
				</div>
				<div className='todo__row'>
					<ToDoList items={this.state.items} />
				</div>
			</div>
		);
	},

	_onChange() {
		this.setState(getStateFromFlux());
	}
});

export default ToDo;
