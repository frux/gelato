import { Matrix3x3, Vec3 } from '../matrix';
import { Geometry, GeometryParams } from './geometry';
import { Point } from './point';

type TriangleParams = GeometryParams & {
	points: Matrix3x3;
};

export class Triangle extends Geometry {
	// @ts-expect-error property is initialized in the setPoints method
	points: Point[];

	constructor(params: TriangleParams) {
		super(params);
		const { points } = params;

		this.setPoints(points);
	}

	setPoints(points: Matrix3x3) {
		if (points.length !== 3) {
			throw new Error('Triangle must have exactly 3 points');
		}

		this.points = trianglePoints(points);
	}
}

export function trianglePoints(points: [Vec3, Vec3, Vec3]) {
	const [[x1, y1, z1], [x2, y2, z2], [x3, y3, z3]] = points;

	return [
		new Point({ x: x1, y: y1, z: z1 }),
		new Point({ x: x2, y: y2, z: z2 }),
		new Point({ x: x3, y: y3, z: z3 }),
	];
}
