import { Renderer } from '../renderer';
import { Geometry, GeometryParams } from './geometry';

type PointParams = {
	x: number;
	y: number;
	z: number;
};

export class Point {
	x: number;
	y: number;
	z: number;

	constructor(params: PointParams) {
		this.x = params.x;
		this.y = params.y;
		this.z = params.z;
	}

	global(...origins: Point[]) {
		const result = new Point({
			x: this.x,
			y: this.y,
			z: this.z,
		});

		for (const origin of origins) {
			result.x += origin.x;
			result.y += origin.y;
			result.z += origin.z;
		}

		return result;
	}
}
