import { Shader } from './shader';

export class VertexShader extends Shader {
	constructor(source: string) {
		super(source, WebGL2RenderingContext.VERTEX_SHADER);
	}
}
