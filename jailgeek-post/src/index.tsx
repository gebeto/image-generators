import * as ReactDOM from 'react-dom';
import * as React from 'react';

import { Provider } from 'react-redux';

import { store } from './store';
import { App } from './compoents/App';

import './assets/styles.css';

import * as templateImageSrc from './assets/template.png';


(window as any).store = store;



ReactDOM.render(
	(
		<Provider store={store}>
			<App />
		</Provider>
	),
	document.getElementById("app")
);