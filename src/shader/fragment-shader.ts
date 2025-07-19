import { Shader } from './shader';

export class FragmentShader extends Shader {
	constructor(source: string) {
		super(source, WebGL2RenderingContext.FRAGMENT_SHADER);
	}
}
