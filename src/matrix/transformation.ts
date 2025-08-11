import { Matrix } from './matrix';
import { ProjectionMatrix } from './projection';
import { XRotationMatrix, YRotationMatrix, ZRotationMatrix } from './rotation';
import { ScalingMatrix } from './scaling';
import { TranslationMatrix } from './translation';

export type TransformationParams = {
	translateX?: number;
	translateY?: number;
	translateZ?: number;
	rotateX?: number;
	rotateY?: number;
	rotateZ?: number;
	scaleX?: number;
	scaleY?: number;
	scaleZ?: number;
};

export function createTransformationMatrix(
	params: Required<TransformationParams>,
) {
	return new TranslationMatrix(
		params.translateX,
		params.translateY,
		params.translateZ,
	)
		.multiply(new XRotationMatrix(params.rotateX))
		.multiply(new YRotationMatrix(params.rotateY))
		.multiply(new ZRotationMatrix(params.rotateZ))
		.multiply(new ScalingMatrix(params.scaleX, params.scaleY, params.scaleZ));
}

export function createProjectionMatrix(
	width: number,
	height: number,
	depth: number,
): ProjectionMatrix {
	return new ProjectionMatrix(width, height, depth);
}

export function applyProjectionMatrix(
	transformationMatrix: Matrix,
	projectionMatrix: Matrix,
) {
	return projectionMatrix.multiply(transformationMatrix);
}
