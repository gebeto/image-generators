import * as React from 'react';
import * as PIXI from 'pixi.js';

// import * as templateImageSrc from '../../assets/example.png';
import * as templateImageSrc from '../../assets/template.png';
import './styles.css';

function createText(text, { x, y, rotation }, styles = {}) {
	const textStyle = new PIXI.TextStyle({
		fontFamily: 'Avenir Next',
		fontSize: 96,
		fontWeight: 'bold',
		fill: '#ffffff',
		letterSpacing: -2.0,
		align: 'center',
		lineHeight: 96 / 0.9,
		...styles
	});

	var textElement = new PIXI.Text(text, textStyle);
	textElement.anchor.set(0.5);
	textElement.x = x;
	textElement.y = y;
	textElement.rotation = rotation;

	return textElement;
}

function updateText(element: PIXI.Text, text: string, fontSize = 96) {
	element.text = text.toUpperCase();
	element.style.fontSize = fontSize;
	element.style.lineHeight = fontSize * 0.9;
}


export interface GeneratorProps {
	leftText: string,
	rightText: string,
	leftFontSize: number,
	rightFontSize: number,
	screenshot: string,
	templateImage: HTMLImageElement,
}

export default class Generator extends React.Component<GeneratorProps, any> {
	canvas: HTMLCanvasElement;
	app: PIXI.Application;

	screenshotElement: PIXI.Sprite;
	leftTextElement: PIXI.Text;
	rightTextElement: PIXI.Text;

	componentWillUnmount() {
		this.app && this.app.destroy();
	}

	componentDidMount() {
		const { leftText, rightText } = this.props;
		const roundTextAngle = - Math.PI / 90 * 6.7;

		this.app = new PIXI.Application({
			view: this.canvas,
			width: 1280,
			height: 720,
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

		const lines = new PIXI.Graphics();
		lines.beginFill(0x0010FF);
		lines.moveTo(1280, 366);
		lines.lineTo(720, 500);
		lines.lineTo(720, 644);
		lines.lineTo(1280, 510);
		lines.endFill();
		
		lines.beginFill(0x00FFFF);
		lines.moveTo(805, 388);
		lines.lineTo(720, 500);
		lines.lineTo(720, 644);
		lines.lineTo(805, 528);
		lines.endFill();

		lines.beginFill(0x0010FF);
		lines.moveTo(0, 580);
		lines.lineTo(805, 388);
		lines.lineTo(805, 528);
		lines.lineTo(0, 720);
		lines.endFill();
		stage.addChild(lines);

		this.leftTextElement = createText(leftText, {
			x: 402,
			y: 555,
			rotation: roundTextAngle
		}, {
			wordWrap: true,
			wordWrapWidth: 800,
		});
		stage.addChild(this.leftTextElement);

		this.rightTextElement = createText(leftText, {
			x: 1000,
			y: 507,
			rotation: roundTextAngle
		}, {
			wordWrap: true,
			wordWrapWidth: 400,
		});
		stage.addChild(this.rightTextElement);
	}

	componentDidUpdate(oldProps) {
		const { leftText, leftFontSize, rightText, rightFontSize, screenshot } = this.props;
		updateText(this.leftTextElement, leftText, leftFontSize);
		updateText(this.rightTextElement, rightText, rightFontSize);
		if (screenshot) {
			const texture = PIXI.Texture.fromImage(screenshot, false, PIXI.SCALE_MODES.NEAREST);
			texture.baseTexture.addListener('loaded', (baseTexture) => {
				const bounds = {
					width: 800,
					height: 720,
				};
				const alignmentBy = baseTexture.width <= baseTexture.height ? 'width' : 'height';
				const scale = bounds[alignmentBy] / baseTexture[alignmentBy];
				this.screenshotElement.texture = texture;
				this.screenshotElement.scale.set(scale);
			});
		}
	}

	render() {
		return (
			<div className="canvas-wrapper">
				<canvas ref={canvas => this.canvas = canvas}></canvas>
			</div>
		);
	}
}