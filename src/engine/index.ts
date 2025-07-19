import { ObjectManager } from '../object-manager';
import { Scene } from '../scene';
import { Viewport } from '../viewport';
import { FragmentShader, Program, VertexShader } from '../shader';
import { Renderer } from '../renderer';

type EngineParams = {
	canvasElementId: string;
	vertexShader: VertexShader;
	fragmentShader: FragmentShader;
	width?: number;
	height?: number;
};

/**
 * WebGL rendering engine.
 */
export class Engine {
	private readonly viewport: Viewport;
	private readonly canvas: HTMLCanvasElement;
	private readonly scenes: ObjectManager<Scene> = new ObjectManager();
	private readonly gl: WebGL2RenderingContext;
	private readonly program: Program;
	private readonly renderer: Renderer;

	constructor(params: EngineParams) {
		this.canvas = document.getElementById(
			params.canvasElementId
		) as HTMLCanvasElement;

		if (!this.canvas) {
			throw new Error(
				`Canvas element with id ${params.canvasElementId} not found.`
			);
		}

		this.viewport = new Viewport({
			domElement: this.canvas,
			width:
				params.width ??
				this.canvas.parentElement?.clientWidth ??
				window.innerWidth,
			height:
				params.height ??
				this.canvas.parentElement?.clientHeight ??
				window.innerHeight,
		});

		this.gl = this.viewport.getContext();

		params.fragmentShader.compile(this.gl);
		params.vertexShader.compile(this.gl);

		this.program = new Program({
			vertexShader: params.vertexShader,
			fragmentShader: params.fragmentShader,
			gl: this.gl,
		});

		this.renderer = new Renderer({
			gl: this.gl,
			attributesLocation: this.program.getAttributes(),
			uniformsLocation: this.program.getUniforms(),
		});

		console.debug('Engine initialized', this);
	}

	addScene(scene: Scene) {
		this.scenes.add(scene);
		console.debug('Scene added', this, scene);
	}

	removeScene(scene: Scene) {
		this.scenes.remove(scene);
		console.debug('Scene removed', this, scene);
	}

	getObjects() {
		return this.scenes.getObjects();
	}

	render() {
		for (const scene of this.scenes.getObjects()) {
			this.renderer.drawScene(scene);
		}
	}
}
