import { Geometry, GeometryParams } from './geometry';
import { Point } from './point';
import { Rectangle, rectanglePoints } from './rectangle';

type CubeParams = GeometryParams & {
	width: number;
	height: number;
	depth: number;
};

export class Cube extends Geometry {
	// @ts-expect-error property is initialized in the setSize method
	points: Point[];

	constructor(params: CubeParams) {
		super(params);
		const { width, height, depth } = params;

		this.setSize(width, height, depth);
	}

	setSize(width: number, height: number, depth: number) {
		if (width <= 0 || height <= 0 || depth <= 0) {
			throw new Error('Width, height and depth must be positive numbers');
		}

		this.points = [
			...rectanglePoints([
				[0, 0, 0],
				[0, height, 0],
				[width, height, 0],
				[width, 0, 0],
			]),
			...rectanglePoints([
				[width, 0, depth],
				[width, height, depth],
				[0, height, depth],
				[0, 0, depth],
			]),
			...rectanglePoints([
				[0, 0, depth],
				[0, height, depth],
				[0, height, 0],
				[0, 0, 0],
			]),
			...rectanglePoints([
				[width, 0, 0],
				[width, height, 0],
				[width, height, depth],
				[width, 0, depth],
			]),
			...rectanglePoints([
				[0, 0, depth],
				[0, 0, 0],
				[width, 0, 0],
				[width, 0, depth],
			]),
			...rectanglePoints([
				[0, height, 0],
				[0, height, depth],
				[width, height, depth],
				[width, height, 0],
			]),
		];
	}
}
