import * as React from 'react';
import * as PIXI from 'pixi.js';

import { debounce } from 'debounce';

// import * as templateImageSrc from '../../assets/example.png';
import * as templateImageSrc from '../../assets/template.png';
// import * as templateImageSrc from '../../assets/test.png';
import './styles.css';

export interface GeneratorProps {
	leftText: string,
	rightText: string,
	leftFontSize: number,
	rightFontSize: number,
	screenshot: string,
}

export default class Generator extends React.Component<GeneratorProps, any> {
	canvas: HTMLCanvasElement;
	canvas2: HTMLCanvasElement;
	img: HTMLImageElement;
	app: PIXI.Application;

	screenshotElement: PIXI.Sprite;
	leftTextElement: PIXI.Text;
	rightTextElement: PIXI.Text;

	updateImage = debounce(() => {
		this.img.src = this.app.renderer.extract.base64(this.app.stage);
		this.img.style.display = 'block';
	}, 800)

	componentWillUnmount() {
		this.app && this.app.destroy();
	}

	componentDidMount() {
		const { leftText, rightText } = this.props;
		const roundTextAngle = -Math.PI / 90 * 6.7;

		this.app = new PIXI.Application({
			view: this.canvas,
			width: 2400,
			height: 1600,
		});

		const { stage } = this.app;

		this.screenshotElement = new PIXI.Sprite();
		this.screenshotElement.anchor.set(0.5);
		this.screenshotElement.x = 880;
		this.screenshotElement.y = 360;
		stage.addChild(this.screenshotElement);

		var templateImage = PIXI.Sprite.fromImage(templateImageSrc);
		templateImage.anchor.set(0.5);
		templateImage.x = this.app.screen.width / 2;
		templateImage.y = this.app.screen.height / 2;
		templateImage.width = this.app.screen.width;
		templateImage.height = this.app.screen.height;
		stage.addChild(templateImage);

		const leftTextStyle = new PIXI.TextStyle({
			fontFamily: 'SF UI',
			fontSize: 190,
			fontWeight: '900',
			fill: '#3C4D60',
			letterSpacing: 1.5,
			align: 'left',
			lineHeight: 232,
		});
		this.leftTextElement = new PIXI.Text(leftText, leftTextStyle);
		this.leftTextElement.x = 160;
		this.leftTextElement.y = 215;
		stage.addChild(this.leftTextElement);

		const rightTextStyle = new PIXI.TextStyle({
			fontFamily: 'SF UI',
			fontSize: 158,
			fontWeight: '900',
			fill: '#3C4D60',
			letterSpacing: -1.5,
			align: 'left',
			// lineHeight: 96 / 0.9,
			// wordWrap: true,
			// wordWrapWidth: 400,
		});
		this.rightTextElement = new PIXI.Text(leftText, rightTextStyle);
		this.rightTextElement.anchor.y = 0.5;
		this.rightTextElement.x = 360;
		this.rightTextElement.y = 1297;
		stage.addChild(this.rightTextElement);
	}

	componentDidUpdate(oldProps) {
		this.img.style.display = 'none';
		const { leftText, rightText, screenshot } = this.props;
		this.leftTextElement.text = leftText;
		this.rightTextElement.text = rightText.toUpperCase();
		this.updateImage();
	}

	render() {
		return (
			<div className="canvas-wrapper mb-3 mt-3">
				<canvas ref={canvas => this.canvas = canvas}></canvas>
				<img width="2400" height="1600" ref={img => this.img = img} />
			</div>
		);
	}
}