export abstract class Shader {
	private shader: WebGLShader | null = null;

	constructor(
		readonly source: string,
		readonly type: number
	) {}

	compile(gl: WebGLRenderingContext) {
		const shader = gl.createShader(this.type);

		if (!shader) {
			throw new Error('Failed to create shader');
		}

		gl.shaderSource(shader, this.source);
		gl.compileShader(shader);

		this.shader = shader;
		const success = gl.getShaderParameter(this.shader, gl.COMPILE_STATUS);

		if (!success) {
			const err = gl.getShaderInfoLog(this.shader) ?? 'Unknown error';
			gl.deleteShader(this.shader);
			throw new Error(err);
		}

		console.debug('Shader compiled', this);
	}

	getShader() {
		return this.shader;
	}
}
