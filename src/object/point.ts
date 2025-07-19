import { Renderer } from '../renderer';
import { Obj, ObjParams } from './obj';

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

	render(renderer: Renderer): void {
		throw new Error('Method not implemented');
	}

	global(origin: Point) {
		return new Point({
			x: this.x + origin.x,
			y: this.y + origin.y,
			z: this.z + origin.z,
		});
	}
}
