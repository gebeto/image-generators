import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { reducer as formReducer } from 'redux-form';


export const store = createStore(
	combineReducers({
		form: formReducer,
	}),
	composeWithDevTools(
		applyMiddleware(
			thunk,
		)
	),
);