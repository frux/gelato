import { Vec3 } from '../matrix/matrix';
import { Point } from './point';

export type GeometryParams = {
	origin?: Vec3;
	angleX?: number;
	angleY?: number;
	angleZ?: number;
};

export abstract class Geometry {
	protected origin: Point;
	protected points: Point[] = [];
	protected angleX: number;
	protected angleY: number;
	protected angleZ: number;

	constructor(params: GeometryParams) {
		this.origin = new Point({
			x: params.origin?.[0] || 0,
			y: params.origin?.[1] || 0,
			z: params.origin?.[2] || 0,
		});
		this.angleX = params.angleX || 0;
		this.angleY = params.angleY || 0;
		this.angleZ = params.angleZ || 0;
	}

	getOrigin() {
		return this.origin;
	}

	setOrigin(newOrigin: Point) {
		this.origin = newOrigin;
	}

	setAngleX(angle: number) {
		this.angleX = angle;
	}

	getAngleX() {
		return this.angleX;
	}

	setAngleY(angle: number) {
		this.angleY = angle;
	}

	getAngleY() {
		return this.angleY;
	}

	setAngleZ(angle: number) {
		this.angleZ = angle;
	}

	getAngleZ() {
		return this.angleZ;
	}

	getPoints() {
		return this.points;
	}

	getVertices() {
		return this.getPoints().flatMap((point) => {
			const globalPoint = point.global(this.getOrigin());

			return [globalPoint.x, globalPoint.y, globalPoint.z];
		});
	}
}
