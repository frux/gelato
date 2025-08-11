import { rgba } from '../color';
import { Geometry } from '../geometry';
import { Material } from '../material';

type ObjParams = {
	geometry: Geometry;
	material?: Material;
};

export class Obj {
	geometry: Geometry;
	material: Material;

	constructor(params: ObjParams) {
		this.geometry = params.geometry;
		this.material =
			params.material || new Material({ color: rgba(1, 0, 0, 1) });
	}
}
