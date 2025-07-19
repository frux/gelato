import { Matrix, Matrix4x4 } from './matrix';

export class ProjectionMatrix extends Matrix<Matrix4x4> {
	constructor(width: number, height: number, depth: number) {
		// prettier-ignore
		super([
            [2 / width, 0, 0, 0],
            [0, -2 / height, 0, 0],
            [0, 0, 2 / depth, 0],
            [-1, 1, 0, 1],
        ]);
	}
}
