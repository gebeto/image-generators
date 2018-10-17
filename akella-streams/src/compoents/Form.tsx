import * as React from 'react';
import * as PIXI from 'pixi.js';

import {
	Form,
	Field,
	reduxForm
} from 'redux-form';


const FileInput = (props) => {
	return <input
		type="file"
		onChange={( e: any ) => {		
			e.preventDefault();
			const { input } = props;
			const file = e.target.files[0];
			if(file.type.match('image.*')) {
				var reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = function(readerEvent: any){
					if( readerEvent.target.readyState == FileReader.DONE) {
						input.onChange(readerEvent.target.result);
					}
				}

			}
		}}
		{ ...props }
	/>
}


const InputForm = (props) => {
	return (
		<Form onSubmit={props.handleSubmit}>
			<div className="input-group mb-3">
				<Field component="textarea" type="text" name="left" placeholder="Left" className="form-control" />
				<div className="input-group-append">
					<div className="input-group-text">
					<Field component="input" type="range" min="20" max="130" name="leftFontSize" />
					</div>
				</div>
			</div>
			
			<div className="input-group mb-3">
				<Field component="textarea" type="text" name="right" placeholder="Right" className="form-control" />
				<div className="input-group-append">
					<div className="input-group-text">
					<Field component="input" type="range" min="20" max="130" name="rightFontSize" />
					</div>
				</div>
			</div>

			<div className="input-group mb-3">
				<div className="input-group-prepend">
					<label className="input-group-text" htmlFor="inputGroupFile01">Upload</label>
				</div>
				<div className="custom-file">
					<Field component={FileInput} name="screenshot" className="custom-file-input" id="inputGroupFile01" />
					<label className="custom-file-label" htmlFor="inputGroupFile01">Screenshot</label>
				</div>
			</div>
		</Form>
	);
}


export default reduxForm({
	form: 'Inputs',
	initialValues: {
		left: 'Left',
		right: 'Right',
		leftFontSize: '96',
		rightFontSize: '96',
	}
})(InputForm);