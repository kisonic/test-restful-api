import React from 'react';

import ToDosActions from '../../actions/ToDosActions';

import './index.styl';

const ToDoForm = React.createClass({
	getInitialState() {
		return {
			title: ''
		};
	},

	handleAddToDo(e) {
		e.preventDefault();

		ToDosActions.post(this.state.title);

		this.setState({
			title: ''
		});
	},

	handleOnChangeTitle(e) {
		this.setState({
			title: e.target.value
		});
	},

	render() {
		return (
			<div className='add-todo'>
				<form onSubmit={this.handleAddToDo}>
					<input
						type='text'
						name='title'
						value={this.state.title}
						className='add-todo__field'
						onChange={this.handleOnChangeTitle}
					/>
					<button type='submit' name='submit' value='Add' className='add-todo__button'>+</button>
				</form>
			</div>
		);
	}
});

export default ToDoForm;
