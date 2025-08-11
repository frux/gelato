import { Matrix } from '../matrix';
import {
	applyProjectionMatrix,
	createProjectionMatrix,
} from '../matrix/transformation';
import { Scene } from '../scene';
import { Obj } from '../object';

type RendererParams = {
	gl: WebGL2RenderingContext;
	attributesLocation: Record<string, number>;
	uniformsLocation: Record<string, WebGLUniformLocation>;
};
export class Renderer {
	private readonly gl: WebGL2RenderingContext;
	private readonly attributes: {
		position: number;
		color: number;
	};
	private readonly uniforms: {
		transformation: WebGLUniformLocation;
	};
	private readonly vao: WebGLVertexArrayObject;

	constructor(params: RendererParams) {
		this.gl = params.gl;

		this.vao = this.gl.createVertexArray();

		this.attributes = {
			position: getAttributeLocationFromParams(params, 'position'),
			color: getAttributeLocationFromParams(params, 'color'),
		};

		this.uniforms = {
			transformation: getUniformLocationFromParams(params, 'transformation'),
		};
	}

	drawScene(scene: Scene) {
		this.gl.enable(this.gl.CULL_FACE);
		this.clear(scene);
		const projectionMatrix = createProjectionMatrix(
			this.gl.canvas.width,
			this.gl.canvas.height,
			this.gl.canvas.height,
		);
		const sceneTransformationMatrix = scene.getTransformationMatrix();
		const fullTransformationMatrix = applyProjectionMatrix(
			sceneTransformationMatrix,
			projectionMatrix,
		);

		this.setUniformMatrix4fv(
			this.uniforms.transformation,
			fullTransformationMatrix,
		);

		for (const obj of scene.getObjects()) {
			this.drawObject(obj);
		}

		console.debug('Scene rendered', this, scene);
	}

	drawObject(obj: Obj) {
		const vertices = obj.geometry.getVertices();
		const colors = obj.material.getColorsForVertices(vertices);

		this.setAttributeFloat(this.attributes.color, colors, 4);
		this.setAttributeFloat(this.attributes.position, vertices, 3);

		this.gl.drawArrays(this.gl.TRIANGLES, 0, vertices.length);

		console.debug(`${obj.geometry.constructor.name} rendered`, obj);
	}

	clear(scene: Scene) {
		this.gl.clearColor(...scene.backgroundColor);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
	}

	private setAttributeFloat(location: number, data: number[], size: number) {
		this.gl.bindVertexArray(this.vao);
		this.gl.enableVertexAttribArray(location);

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.gl.createBuffer());
		this.gl.bufferData(
			this.gl.ARRAY_BUFFER,
			new Float32Array(data),
			this.gl.STATIC_DRAW,
		);
		this.gl.vertexAttribPointer(location, size, this.gl.FLOAT, false, 0, 0);
	}

	private setUniformMatrix4fv(location: WebGLUniformLocation, data: Matrix) {
		this.gl.uniformMatrix4fv(location, false, data.flatten());
	}
}

function getAttributeLocationFromParams(params: RendererParams, name: string) {
	if (!(name in params.attributesLocation)) {
		throw new Error(`${name} attribute not found in program attributes`);
	}

	return params.attributesLocation[name];
}

function getUniformLocationFromParams(params: RendererParams, name: string) {
	if (!(name in params.uniformsLocation)) {
		throw new Error(`${name} uniform not found in program uniforms`);
	}

	return params.uniformsLocation[name];
}
