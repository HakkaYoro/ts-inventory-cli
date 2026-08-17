export class Vocaloid {
	readonly nombre: string;
	readonly banco: "Crypton" | "Internet Co" | "Other";
	private canciones: number;
	private activo: boolean;
	constructor(
		nombre: string,
		banco: "Crypton" | "Internet Co" | "Other",
		canciones: number,
		activo: boolean,
	) {
		this.nombre = nombre;
		this.banco = banco;
		this.canciones = canciones;
		this.activo = activo;
	}
	activar() {
		if (this.activo === true)
			return `La Vocaloid ${this.nombre} ya estaba activa! Baka!!!`;
		this.activo = true;
		return `Activada ${this.nombre} satisfactoriamente... Tetoooo!`;
	}
	estado() {
		const actMsg = this.activo ? "Activa!" : "Inactiva...";
		return [
			`¡Tada~a! ✦ Perfil musical de ${this.nombre} ✦`,
			`Canta con el banco "${this.banco}" y lleva ${this.canciones} canciones en su haber. ¡Y mira esto, ahora mismo está: ${actMsg}!`,
			`¡Su voz es súper especial! ¡No dejes de animarla para que siga subiendo al escenario y dando lo mejor de sí! ¡Tú puedes ayudarla!`,
		].join("\n");
	}
}

export const misWaifus: Vocaloid[] = [
	new Vocaloid("Hatsune Miku", "Crypton", 583962, true),
	new Vocaloid("Kagamine Rin", "Crypton", 285000, true),
	new Vocaloid("Kagamine Len", "Crypton", 282000, true),
	new Vocaloid("Megurine Luka", "Crypton", 165000, true),
	new Vocaloid("MEIKO", "Crypton", 62000, true),
	new Vocaloid("KAITO", "Crypton", 85000, true),
	new Vocaloid("GUMI", "Internet Co", 310000, false),
	new Vocaloid("Kamui Gakupo", "Internet Co", 55000, false),
	new Vocaloid("Lily", "Internet Co", 28000, false),
	new Vocaloid("Otomachi Una", "Internet Co", 35000, true),
	new Vocaloid("Gachapoid", "Internet Co", 4500, false),
	new Vocaloid("Reimu Hakurei", "Other", 15000, false),
	new Vocaloid("IA", "Other", 95000, true),
	new Vocaloid("Yuzuki Yukari", "Other", 42000, true),
	new Vocaloid("Nekomura Iroha", "Other", 18000, true),
	new Vocaloid("v flower", "Other", 65000, true),
	new Vocaloid("SF-A2 Miki", "Other", 12000, false),
	new Vocaloid("VY1", "Other", 22000, false),
	new Vocaloid("Utatane Piko", "Other", 16000, false),
	new Vocaloid("MAYU", "Other", 25000, false),
];
