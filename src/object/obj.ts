import { Vec3 } from '../matrix/matrix';
import { Renderer } from '../renderer';
import { Point } from './point';

export type ObjParams = {
	origin: Vec3;
};

export abstract class Obj {
	private origin: Point;

	constructor(params: ObjParams) {
		this.origin = new Point({
			x: params.origin[0],
			y: params.origin[1],
			z: params.origin[2],
		});
	}

	abstract render(renderer: Renderer): void;

	getOrigin() {
		return this.origin;
	}

	setOrigin(newOrigin: Point) {
		this.origin = newOrigin;
	}
}
