export class Nombre {
	readonly value: string;
	constructor(nombre: string) {
		this.validate(nombre);
		this.value = nombre;
	}
	private validate(nombre: string) {
		if (!nombre) {
			throw new Error(`Está vacio el nombre!`);
		}
	}
}
