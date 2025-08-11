import { RGBA } from '../color';
import { Point } from '../geometry/point';
import { Scene } from '../scene/scene';

type ViewportParams = {
	width: number;
	height: number;
	domElement: HTMLCanvasElement;
};

export class Viewport {
	readonly domElement: HTMLCanvasElement;
	private width: number;
	private height: number;
	private gl: WebGL2RenderingContext;

	constructor(params: ViewportParams) {
		this.domElement = params.domElement;
		this.width = params.width || window.innerWidth;
		this.height = params.height || window.innerHeight;
		this.domElement.width = this.width;
		this.domElement.height = this.height;

		const gl = this.domElement.getContext('webgl2');

		if (!gl) {
			throw new Error('WebGL not supported.');
		}

		this.gl = gl;

		this.gl.viewport(0, 0, this.domElement.width, this.domElement.height);

		console.debug('Viewport initialized', this);
	}

	getContext() {
		return this.gl;
	}

	getWidth() {
		return this.width;
	}

	getHeight() {
		return this.height;
	}
}
