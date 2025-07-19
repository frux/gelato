export type RGBA = [red: number, green: number, blue: number, alpha: number];

export function rgba(red: number, green: number, blue: number, alpha: number) {
	return [red, green, blue, alpha] satisfies RGBA;
}
