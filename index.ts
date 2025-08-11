import {
	Cube,
	Engine,
	FragmentShader,
	Obj,
	Rectangle,
	rgba,
	Scene,
	Triangle,
	VertexShader,
} from './src';
import fragmentShaderSource from './shaders/fragment.glsl';
import vertexShaderSource from './shaders/vertex.glsl';
import { Material } from './src/material';

const engine = new Engine({
	canvasElementId: 'viewport',
	fragmentShader: new FragmentShader(fragmentShaderSource),
	vertexShader: new VertexShader(vertexShaderSource),
});

const mainScene = new Scene({
	backgroundColor: rgba(110, 55, 155, 1),
	transformation: {
		rotateX: 0,
		rotateY: 0,
		rotateZ: 0,
		scaleX: 1,
		scaleY: 1,
		scaleZ: 1,
		translateX: 0.4,
		translateY: -0.4,
		translateZ: 0,
	},
});

const triangle = new Obj({
	geometry: new Triangle({
		origin: [0, 0, 0],
		points: [
			[0, 100, 0],
			[100, 100, 0],
			[50, 0, 0],
		],
	}),
	material: new Material({
		color: rgba(209, 46, 46, 1),
	}),
});

const rectangle = new Obj({
	geometry: new Rectangle({
		origin: [100, 100, 0],
		width: 100,
		height: 300,
	}),
	material: new Material({
		color: rgba(71, 151, 71, 1),
	}),
});

const cube = new Obj({
	geometry: new Cube({
		origin: [500, 0, 0],
		width: 100,
		height: 300,
		depth: 50,
		angleX: Math.PI / 4,
		angleY: Math.PI / 4,
		angleZ: Math.PI / 4,
	}),
	material: new Material({
		color: rgba(94, 126, 187, 1),
	}),
});

mainScene.addObject(triangle);
mainScene.addObject(rectangle);
mainScene.addObject(cube);
engine.addScene(mainScene);

let frameNumber = 0;
const fps = 120;
const aniimationLength = 5000;
const framesCount = (aniimationLength / 1000) * fps;
setInterval(() => {
	const framePhase = frameNumber / framesCount;
	mainScene.setTransformation({
		rotateY: framePhase * 2 * Math.PI,
	});

	engine.render();

	frameNumber = ++frameNumber % framesCount;
}, 1000 / fps);
