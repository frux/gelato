function getCanvasById(id: string) {
	const canvas = document.getElementById(id);
	if (!canvas) {
		return null;
	}

	if (!(canvas instanceof HTMLCanvasElement)) {
		throw new Error(
			`Canvas with id "${id}" not found or is not a valid HTMLCanvasElement.`
		);
	}

	return canvas;
}

function initWebGL(canvasElementId: string) {
	const canvas = getCanvasById(canvasElementId);

	if (!canvas) {
		throw new Error(`Canvas element with id "${canvasElementId}" not found.`);
	}

	const gl = canvas.getContext('webgl');
	if (!gl) {
		throw new Error('WebGL is not supported by your browser.');
	}

	return gl;
}
