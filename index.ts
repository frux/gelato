import {
	Engine,
	FragmentShader,
	rgba,
	Scene,
	Triangle,
	VertexShader,
} from './src';
import fragmentShaderSource from './shaders/fragment.glsl';
import vertexShaderSource from './shaders/vertex.glsl';

const engine = new Engine({
	canvasElementId: 'viewport',
	fragmentShader: new FragmentShader(fragmentShaderSource),
	vertexShader: new VertexShader(vertexShaderSource),
});

const mainScene = new Scene({
	backgroundColor: rgba(0, 0, 0, 1),
});

const triangle = new Triangle({
	origin: [0, 0, 0],
	points: [
		[0, 100, 0],
		[50, 0, 0],
		[100, 100, 0],
	],
});

mainScene.addObject(triangle);
engine.addScene(mainScene);

engine.render();
