import { RGBA } from '../color';
import { ObjectManager } from '../object-manager';
import { Obj } from '../object';
import {
	createTransformationMatrix,
	TransformationParams,
} from '../matrix/transformation';

type SceneParams = {
	backgroundColor: RGBA;
	transformation: TransformationParams;
};

const DEFAULT_TRANSFORMATION = {
	translateX: 0,
	translateY: 0,
	translateZ: 0,
	rotateX: 0,
	rotateY: 0,
	rotateZ: 0,
	scaleX: 1,
	scaleY: 1,
	scaleZ: 1,
} as const;

export class Scene {
	backgroundColor: RGBA;
	transformation: Required<TransformationParams>;
	private readonly objectManager: ObjectManager<Obj> = new ObjectManager();

	constructor(params: SceneParams) {
		this.backgroundColor = params.backgroundColor;
		this.transformation = {
			...DEFAULT_TRANSFORMATION,
			...params.transformation,
		};
	}

	addObject(object: Obj) {
		this.objectManager.add(object);
		console.debug('Object added to scene', this, object);
	}

	removeObject(object: Obj) {
		this.objectManager.remove(object);
		console.debug('Object removed from scene', this, object);
	}

	getObjects() {
		return this.objectManager.getObjects();
	}

	setTransformation(transformation: TransformationParams) {
		this.transformation = {
			...this.transformation,
			...transformation,
		};
	}

	getTransformationMatrix() {
		return createTransformationMatrix(this.transformation);
	}
}
