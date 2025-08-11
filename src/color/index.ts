export type RGBA = [red: number, green: number, blue: number, alpha: number];

export function rgba(red: number, green: number, blue: number, alpha: number) {
	return [red / 255, green / 255, blue / 255, alpha] satisfies RGBA;
}
