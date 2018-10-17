import Generator from './Generator';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';


const selector = formValueSelector('Inputs');
export default connect(
	(state) => ({
		leftText: selector(state, 'left'),
		rightText: selector(state, 'right'),
		leftFontSize: Number(selector(state, 'leftFontSize')),
		rightFontSize: Number(selector(state, 'rightFontSize')),
		screenshot: selector(state, 'screenshot'),
	}),
	(dispatch) => ({}),
)(Generator);
