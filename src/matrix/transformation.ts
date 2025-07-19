import { ProjectionMatrix } from './projection';
import { XRotationMatrix, YRotationMatrix, ZRotationMatrix } from './rotation';
import { ScalingMatrix } from './scaling';
import { TranslationMatrix } from './translation';

export function createTransformationMatrix(params: {
	width: number;
	height: number;
	depth: number;
	translateX: number;
	translateY: number;
	translateZ: number;
	rotateX: number;
	rotateY: number;
	rotateZ: number;
	scaleX: number;
	scaleY: number;
	scaleZ: number;
}) {
	return new ProjectionMatrix(params.width, params.height, params.depth)
		.multiply(
			new TranslationMatrix(
				params.translateX,
				params.translateY,
				params.translateZ,
			),
		)
		.multiply(new XRotationMatrix(params.rotateX))
		.multiply(new YRotationMatrix(params.rotateY))
		.multiply(new ZRotationMatrix(params.rotateZ))
		.multiply(new ScalingMatrix(params.scaleX, params.scaleY, params.scaleZ));
}
