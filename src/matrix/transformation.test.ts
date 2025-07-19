import { describe, test, expect } from 'vitest';
import { createTransformationMatrix } from './transformation';

describe('createTransformationMatrix', () => {
	test('should create a transformation matrix with correct values', () => {
		const matrix = createTransformationMatrix({
			depth: 1,
			height: 1000,
			width: 1000,
			rotateX: Math.PI,
			rotateY: 0,
			rotateZ: Math.PI / 2,
			scaleX: 2,
			scaleY: 1,
			scaleZ: 0.5,
			translateX: 100,
			translateY: 200,
			translateZ: 300,
		});

		// prettier-ignore
		expect(matrix.toArray()).toEqual([
            
        ]);
	});
});
