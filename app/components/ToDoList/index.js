import React from 'react';

import './index.styl';

const ToDoList = React.createClass({

	render() {
		return (
			<ul className='todo-list'>
				{
					this.props.items.map((item, id) =>
						<li key={id} className='todo-list__item'>
							{item.title}
						</li>
					)
				}
			</ul>
		);
	},

	_onChange() {
		this.setState(getStateFromFlux());
	}
});

export default ToDoList;
