import { A_COLOR, A_POSITION, U_TRANSFORMATION } from './const';
import { FragmentShader } from './fragment-shader';
import { VertexShader } from './vertex-shader';

type ProgramParams = {
	vertexShader: VertexShader;
	fragmentShader: FragmentShader;
	gl: WebGL2RenderingContext;
};

export class Program {
	readonly program: WebGLProgram;
	private readonly attributes: Record<string, number> = {};
	private readonly uniforms: Record<string, WebGLUniformLocation> = {};

	constructor(params: ProgramParams) {
		const { vertexShader, fragmentShader, gl } = params;
		this.program = gl.createProgram();

		const vShader = vertexShader.getShader();
		const fShader = fragmentShader.getShader();

		if (!vShader) {
			throw new Error('Vertex shader not compiled');
		}

		if (!fShader) {
			throw new Error('Fragment shader not compiled');
		}

		gl.attachShader(this.program, vShader);
		gl.attachShader(this.program, fShader);

		gl.linkProgram(this.program);

		const success = gl.getProgramParameter(this.program, gl.LINK_STATUS);

		if (!success) {
			const err = gl.getProgramInfoLog(this.program) ?? 'Unknown error';
			gl.deleteProgram(this.program);
			throw new Error(err);
		}

		gl.useProgram(this.program);

		this.initAttribute(gl, 'position', A_POSITION);
		this.initAttribute(gl, 'color', A_COLOR);
		this.initUniform(gl, 'transformation', U_TRANSFORMATION);
	}

	getAttributes() {
		return this.attributes;
	}

	getUniforms() {
		return this.uniforms;
	}

	private initAttribute(
		gl: WebGL2RenderingContext,
		name: string,
		shaderVariable: string,
	) {
		const attribute = gl.getAttribLocation(this.program, shaderVariable);

		if (attribute === -1) {
			throw new Error(`Shader must have ${shaderVariable} attribute`);
		}

		this.attributes[name] = attribute;
	}

	private initUniform(
		gl: WebGL2RenderingContext,
		name: string,
		shaderVariable: string,
	) {
		const uniform = gl.getUniformLocation(this.program, shaderVariable);

		if (!uniform) {
			throw new Error(`Shader must have ${shaderVariable} uniform`);
		}

		this.uniforms[name] = uniform;
	}
}
