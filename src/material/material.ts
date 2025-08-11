import { RGBA } from '../color';

type MaterialParams = {
	color: RGBA;
};

export class Material {
	color: RGBA;

	constructor(params: MaterialParams) {
		this.color = params.color;
	}

	getColorsForVertices(vertices: number[]) {
		const colors = [];

		for (let i = 0; i < vertices.length; i++) {
			colors.push(
				this.color[0] + i * 0.01,
				this.color[1] + i * 0.01,
				this.color[2] + i * 0.01,
				this.color[3],
			);
		}

		return colors;
	}
}
