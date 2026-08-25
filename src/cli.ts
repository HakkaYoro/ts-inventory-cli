// Sugerencias de Santiago: Parameter Object Pattern, Value Object. Gemini AI Overview para investigar conteo: 3
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { Cantidad } from "./vo/cantidad.vo.ts";
import { Nombre } from "./vo/nombre.vo.ts";
import { Rareza } from "./vo/rareza.vo.ts";
import { error } from "node:console";

type PsoItemData = {
	nombre: string;
	rar: number;
	cantidad: number;
};

export class PsoItem {
	readonly uuid: string;
	private _nombre: Nombre;
	private _cantidad: Cantidad;
	private _rareza: Rareza;

	constructor(data: PsoItemData) {
		this._nombre = new Nombre(data.nombre);
		this._cantidad = new Cantidad(data.cantidad);
		this._rareza = new Rareza(data.rar);
		this.uuid = crypto.randomUUID();
	}
	get nombre() {
		return this._nombre.value;
	}
	get cantidad() {
		return this._cantidad.value;
	}
	get rareza() {
		return this._rareza.value;
	}
}

class Lista {
	private items: PsoItem[] = [];

	save(item: PsoItem) {
		const itemPlano = {
			uuid: item.uuid,
			nombre: item.nombre,
			cantidad: item.cantidad,
			rareza: item.rareza,
		};
		const filePath = "./data.json";

		if (!existsSync(filePath)) {
			writeFileSync(filePath, JSON.stringify([itemPlano], null, 4), {
				flag: "wx",
			});
			console.log("Datos escritos correctamente!");
			return;
		}

		const oldData = readFileSync(filePath, "utf-8");
		const newJson = JSON.parse(oldData);
		newJson.push(itemPlano);
		writeFileSync(filePath, JSON.stringify(newJson, null, 4), "utf-8");
		console.log("Datos escritos correctamente!");
	}

	public push(item: PsoItem) {
		this.items.push(item);
	}
	public print() {
		return this.items.map((item) => {
			return {
				nombre: item.nombre,
				rareza: item.rareza,
				cantidad: item.cantidad,
				uuid: item.uuid,
			};
		});
	}
}

function main() {
	const args = process.argv.slice(2);
	if (args[0] === "add") {
		const item = new PsoItem({
			nombre: args[1],
			rar: Number(args[2]),
			cantidad: Number(args[3]),
		});
		new Lista().save(item);
	}
	if (args[0] === "list") {
		const filePath = "./data.json";
		let items = [];
		if (existsSync(filePath)) {
			items = JSON.parse(readFileSync(filePath, "utf-8"));
		}
		if (items.length === 0) {
			console.log('Archivo vacío! Añade algo antes de usar "list"!');
		} else {
			console.log("NOMBRE", "|", "RAREZA", "|", "CANTIDAD", "|", "UUID");
			for (const item of items) {
				console.log(
					`${item.nombre}`,
					`${item.rareza}`,
					`${item.cantidad}`,
					`${item.uuid}`,
				);
			}
		}
	}
	if (!args[0]) throw new Error("Comando no existente!");
	console.log(args);
}

main();
