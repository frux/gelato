import { Matrix } from '../matrix';
import { createTransformationMatrix } from '../matrix/transformation';
import { Triangle } from '../object';
import { Scene } from '../scene';

type RendererParams = {
	gl: WebGL2RenderingContext;
	attributesLocation: Record<string, number>;
	uniformsLocation: Record<string, WebGLUniformLocation>;
};
export class Renderer {
	private readonly gl: WebGL2RenderingContext;
	private readonly attributes: {
		position: number;
	};
	private readonly uniforms: {
		transformation: WebGLUniformLocation;
	};

	constructor(params: RendererParams) {
		this.gl = params.gl;

		this.attributes = {
			position: getAttributeLocationFromParams(params, 'position'),
		};

		this.uniforms = {
			transformation: getUniformLocationFromParams(params, 'transformation'),
		};
	}

	drawScene(scene: Scene) {
		this.clear(scene);

		for (const obj of scene.getObjects()) {
			obj.render(this);
		}

		console.debug('Scene rendered', this);
	}

	drawTriangle(triangle: Triangle) {
		const vertices = triangle.points.flatMap((point) => {
			const globalPoint = point.global(triangle.getOrigin());

			return [globalPoint.x, globalPoint.y, globalPoint.z];
		});

		this.setAttribute3f(this.attributes.position, vertices);
		this.setUniformMatrix4fv(
			this.uniforms.transformation,
			createTransformationMatrix({
				depth: 1,
				rotateX: 0,
				rotateY: 0,
				rotateZ: 0,
				scaleX: 1,
				scaleY: 1,
				scaleZ: 1,
				translateX: 1,
				translateY: -1,
				translateZ: 1,
				height: this.gl.canvas.height,
				width: this.gl.canvas.width,
			}),
		);

		this.gl.drawArrays(this.gl.TRIANGLES, 0, triangle.points.length);
	}

	clear(scene: Scene) {
		this.gl.clearColor(...scene.backgroundColor);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
	}

	private setAttribute3f(location: number, data: number[]) {
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.gl.createBuffer());
		this.gl.bufferData(
			this.gl.ARRAY_BUFFER,
			new Float32Array(data),
			this.gl.STATIC_DRAW,
		);

		const vao = this.gl.createVertexArray();
		this.gl.bindVertexArray(vao);
		this.gl.vertexAttribPointer(location, 3, this.gl.FLOAT, false, 0, 0);
		this.gl.enableVertexAttribArray(location);
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
