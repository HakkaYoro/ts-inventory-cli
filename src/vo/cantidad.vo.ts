export class Cantidad {
	readonly value: number;
	constructor(cantidad: number) {
		this.validate(cantidad);
		this.value = cantidad;
	}
	private validate(cantidad: number) {
		if (!Number.isInteger(cantidad)) {
			throw new Error(`No se aceptan decimales. Inténtelo de nuevo...`);
		}
		if (cantidad < 1 || cantidad > 99) {
			throw new Error(`Te saliste el rango válido!`);
		}
	}
}
