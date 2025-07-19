import { Obj } from '../object/obj';

export class ObjectManager<T> {
	objects: Set<T>;

	constructor() {
		this.objects = new Set();
	}

	add(obj: T) {
		this.objects.add(obj);
	}

	remove(obj: T) {
		this.objects.delete(obj);
	}
	getObjects() {
		return this.objects;
	}
}
