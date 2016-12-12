import ReactDOM from 'react-dom';
import React from 'react';

import './styles/base.styl';

import ToDosActions from './actions/ToDosActions';
import ToDo         from './components/ToDo';

ToDosActions.get();

ReactDOM.render(
	<ToDo />,
	document.getElementById('mount-point')
);
