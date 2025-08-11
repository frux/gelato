import { Point } from '.';
import { Vec3 } from '../matrix';
import { Geometry, GeometryParams } from './geometry';
import { trianglePoints } from './triangle';

type RectagnleParams = GeometryParams & {
	width: number;
	height: number;
};

export class Rectangle extends Geometry {
	// @ts-expect-error property is initialized in the setSize method
	points: Point[];

	constructor(params: RectagnleParams) {
		super(params);
		const { width, height } = params;

		this.setSize(width, height);
	}

	setSize(width: number, height: number) {
		if (width <= 0 || height <= 0) {
			throw new Error('Width and height must be positive numbers');
		}

		this.points = rectanglePoints([
			[0, 0, 0],
			[0, height, 0],
			[width, height, 0],
			[width, 0, 0],
		]);
	}
}

export function rectanglePoints([t1, t2, t3, t4]: [Vec3, Vec3, Vec3, Vec3]) {
	return [...trianglePoints([t1, t2, t3]), ...trianglePoints([t1, t3, t4])];
}
