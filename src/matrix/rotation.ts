import { Matrix, Matrix4x4 } from './matrix';

export class XRotationMatrix extends Matrix<Matrix4x4> {
	constructor(angle: number) {
		const c = Math.cos(angle);
		const s = Math.sin(angle);
		// prettier-ignore
		super([
            [1, 0, 0, 0],
            [0, c, s, 0],
            [0, -s, c, 0],
            [0, 0, 0, 1],
        ]);
	}
}

export class YRotationMatrix extends Matrix<Matrix4x4> {
	constructor(angle: number) {
		const c = Math.cos(angle);
		const s = Math.sin(angle);
		// prettier-ignore
		super([
            [c, 0, -s, 0],
            [0, 1, 0, 0],
            [s, 0, c, 0],
            [0, 0, 0, 1],
        ]);
	}
}

export class ZRotationMatrix extends Matrix<Matrix4x4> {
	constructor(angle: number) {
		const c = Math.cos(angle);
		const s = Math.sin(angle);
		// prettier-ignore
		super([
            [c, s, 0, 0],
            [-s, c, 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1],
        ]);
	}
}
