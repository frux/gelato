import { Matrix, Matrix4x4 } from './matrix';

export class TranslationMatrix extends Matrix<Matrix4x4> {
	constructor(x: number, y: number, z: number) {
		// prettier-ignore
		super([
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 0],
            [x, y, z, 1],
        ]);
	}
}
