export type Vec2 = [number, number];
export type Vec3 = [number, number, number];
export type Matrix3x3 = [
	[number, number, number],
	[number, number, number],
	[number, number, number],
];

export type Matrix4x4 = [
	[number, number, number, number],
	[number, number, number, number],
	[number, number, number, number],
	[number, number, number, number],
];

export class Matrix<T extends number[][] = number[][]> {
	constructor(public readonly data: T) {}

	get(row: number, col: number) {
		if (row < 0 || row >= this.rows()) {
			throw new Error(`Row index ${row} is out of bounds.`);
		}
		if (col < 0 || col >= this.cols()) {
			throw new Error(`Column index ${col} is out of bounds.`);
		}

		return this.data[row][col];
	}

	toArray() {
		return this.data;
	}

	cols() {
		return this.data[0].length;
	}

	rows() {
		return this.data.length;
	}

	flatten() {
		return this.data.flat();
	}

	multiply(mat: Matrix) {
		if (this.cols() !== mat.rows()) {
			throw new Error(
				'Wrong dimension. Number of columns in matrix 1 should be equal to the number of rows in matrix 2.',
			);
		}

		const l = this.rows();
		const m = this.cols();
		const n = mat.cols();

		const result: number[][] = [];

		for (let i = 0; i < l; i++) {
			const row: number[] = [];

			for (let j = 0; j < n; j++) {
				let value = 0;

				for (let r = 0; r < m; r++) {
					value += this.get(i, r) * mat.get(r, j);
				}

				row.push(value);
			}

			result.push(row);
		}

		return new Matrix(result);
	}
}
