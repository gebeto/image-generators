import * as React from 'react';
import * as PIXI from 'pixi.js';

import { debounce } from 'debounce';

// import * as templateImageSrc from '../../assets/example.png';
import * as templateImageSrc from '../../assets/template.png';
import './styles.css';


function updateText(element: PIXI.Text, text: string, fontSize = 96) {
	element.text = text.toUpperCase();
}

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
			width: 1500,
			height: 1000,
		});

		const { stage } = this.app;

		const bg = new PIXI.Graphics();
		bg.beginFill(0x000000);
		bg.moveTo(0, 0);
		bg.lineTo(1280, 0);
		bg.lineTo(1280, 720);
		bg.lineTo(0, 720);
		bg.lineTo(0, 0);
		bg.endFill();
		stage.addChild(bg);


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

		// this.leftTextElement = createText(leftText, {
		// 	x: 402,
		// 	y: 555,
		// 	rotation: roundTextAngle
		// }, {
		// 	wordWrap: true,
		// 	wordWrapWidth: 800,
		// });

		const textStyle = new PIXI.TextStyle({
			fontFamily: 'SF UI',
			fontSize: 96,
			fontWeight: '700',
			fill: '#3C4D60',
			// fill: 'red',
			letterSpacing: -2.0,
			align: 'left',
			lineHeight: 96 / 0.9,
			// wordWrap: true,
			// wordWrapWidth: 400,
		});
		this.leftTextElement = new PIXI.Text(leftText, textStyle);
		this.leftTextElement.anchor.y = 0.5;
		this.leftTextElement.x = 370;
		this.leftTextElement.y = 1300;
		stage.addChild(this.leftTextElement);

		// this.rightTextElement = createText(leftText, {
		// 	x: 1000,
		// 	y: 507,
		// 	rotation: roundTextAngle
		// }, {
		// 	wordWrap: true,
		// 	wordWrapWidth: 400,
		// });
		// stage.addChild(this.rightTextElement);
	}

	componentDidUpdate(oldProps) {
		this.img.style.display = 'none';

		const { leftText, rightText, screenshot } = this.props;
		updateText(this.leftTextElement, leftText);
		this.updateImage();
	}

	render() {
		return (
			<div className="canvas-wrapper mb-3 mt-3">
				<canvas ref={canvas => this.canvas = canvas}></canvas>
				<img width="1500" height="1000" ref={img => this.img = img} />
			</div>
		);
	}
}