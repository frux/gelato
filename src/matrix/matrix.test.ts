import { describe, it, expect } from 'vitest';
import { Matrix } from './matrix';

describe('Matrix', () => {
	describe('.multiply', () => {
		it('should multiply matrices', () => {
			const a = new Matrix(
				// prettier-ignore
				[
					[1, 2, 3, 4, 5, 6, 7, 8],
					[9, 10, 11, 12, 13, 14, 15, 16],
					[17, 18, 19, 20, 21, 22, 23, 24],
				],
			);
			const b = new Matrix(
				// prettier-ignore
				[
					[24, 23, 22],
					[21, 20, 19],
					[18, 17, 16],
					[15, 14, 13],
					[12, 11, 10],
					[9, 8, 7],
					[6, 5, 4],
					[3, 2, 1],
				],
			);
			const c = a.multiply(b);

			// prettier-ignore
			expect(c.toArray()).toEqual([
				[360, 324, 288],
				[1224, 1124, 1024],
				[2088, 1924, 1760],
			]);
			expect(c.rows()).toBe(3);
			expect(c.cols()).toBe(3);
		});

		it('should throw error if matricies have wrong dimensions', () => {
			const a = new Matrix([[1, 2, 3]]);
			const b = new Matrix([[2], [3], [4], [5], [6]]);
			expect(() => a.multiply(b)).toThrow();
		});
	});

	describe('.get', () => {
		it('should get value at specified row and column', () => {
			const a = new Matrix([
				[1, 2, 3],
				[4, 5, 6],
			]);
			expect(a.get(0, 0)).toBe(1);
			expect(a.get(0, 1)).toBe(2);
			expect(a.get(1, 2)).toBe(6);
		});

		it('should throw error if row or column is out of bounds', () => {
			const a = new Matrix([
				[1, 2, 3],
				[4, 5, 6],
			]);
			expect(() => a.get(-1, 0)).toThrow();
			expect(() => a.get(2, 0)).toThrow();
			expect(() => a.get(0, -1)).toThrow();
			expect(() => a.get(0, 3)).toThrow();
		});
	});
});
