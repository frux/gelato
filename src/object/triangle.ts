import { Matrix3x3 } from '../matrix';
import { Renderer } from '../renderer';
import { Obj, ObjParams } from './obj';
import { Point } from './point';

type TriangleParams = ObjParams & {
	points: Matrix3x3;
};

export class Triangle extends Obj {
	points: [Point, Point, Point];

	constructor(params: TriangleParams) {
		super(params);
		const { points } = params;
		const [[x1, y1, z1], [x2, y2, z2], [x3, y3, z3]] = points;

		this.points = [
			new Point({ x: x1, y: y1, z: z1 }),
			new Point({ x: x2, y: y2, z: z2 }),
			new Point({ x: x3, y: y3, z: z3 }),
		];
	}

	setPoints(points: [Point, Point, Point]) {
		if (points.length !== 3) {
			throw new Error('Triangle must have exactly 3 points');
		}

		this.points = points;
	}

	render(renderer: Renderer): void {
		renderer.drawTriangle(this);
		console.debug('Triangle rendered', this);
	}
}
