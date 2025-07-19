import { RGBA } from '../color';
import { ObjectManager } from '../object-manager';
import { Renderer } from '../renderer';
import { Viewport } from '../viewport';
import { Obj } from '../object/obj';

type SceneParams = {
	backgroundColor: RGBA;
};

export class Scene {
	backgroundColor: RGBA;
	private readonly objectManager: ObjectManager<Obj> = new ObjectManager();

	constructor(params: SceneParams) {
		this.backgroundColor = params.backgroundColor;
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
}
