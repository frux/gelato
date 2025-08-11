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
engine.render();

let isRotating = false;
let isDragging = false;
document
	.getElementById('viewport')!
	.addEventListener('mousedown', (e: MouseEvent) => {
		switch (e.button) {
			case 0: // Left click
				break;
			case 1: // Middle click
				isDragging = true;
				break;
			case 2: // Right click
				isRotating = true;
				break;
		}
	});

document
	.getElementById('viewport')!
	.addEventListener('mouseup', (e: MouseEvent) => {
		switch (e.button) {
			case 0: // Left click
				break;
			case 1: // Middle click
				isDragging = false;
				break;
			case 2: // Right click
				isRotating = false;
				break;
		}
	});

document.getElementById('viewport')!.addEventListener('mousemove', (event) => {
	const { movementX, movementY } = event as MouseEvent;
	const deltaX = movementX / window.innerWidth;
	const deltaY = movementY / window.innerHeight;

	if (isRotating) {
		mainScene.setTransformation({
			rotateX: mainScene.transformation.rotateX - deltaY * 10,
			rotateY: mainScene.transformation.rotateY - deltaX * 10,
		});

		engine.render();
		return;
	}

	if (isDragging) {
		mainScene.setTransformation({
			translateX: mainScene.transformation.translateX + deltaX * 2,
			translateY: mainScene.transformation.translateY - deltaY * 2,
		});

		engine.render();
		return;
	}
});
