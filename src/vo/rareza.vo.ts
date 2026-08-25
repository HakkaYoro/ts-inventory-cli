export class Rareza {
	readonly value: number;
	constructor(rareza: number) {
		this.validate(rareza);
		this.value = rareza;
	}

	private validate(rareza: number) {
		if (!Number.isInteger(rareza)) {
			throw new Error(`No se aceptan decimales. Inténtelo de nuevo...`);
		}
		if (rareza < 1 || rareza > 10) {
			throw new Error(
				`La rareza ingresada (${rareza}) no es valida! Vuelva a intentarlo!`,
			);
		}
	}
}
