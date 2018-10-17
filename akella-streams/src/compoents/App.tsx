import * as React from 'react';

import Generator from './Generator/';
import Form from './Form';


export class App extends React.Component<any, any> {
	render() {
		return (
			<div className="row">
				<div className="col-md-6">
					<Generator />
				</div>
				<div className="col-md-6">
					<Form />
				</div>
			</div>
		);
	}
}