import { Matrix, Matrix4x4 } from './matrix';

export class ScalingMatrix extends Matrix<Matrix4x4> {
	constructor(x: number, y: number, z: number) {
		// prettier-ignore
		super([
            [x, 0, 0, 0],
            [0, y, 0, 0],
            [0, 0, z, 0],
            [0, 0, 0, 1],
        ]);
	}
}
