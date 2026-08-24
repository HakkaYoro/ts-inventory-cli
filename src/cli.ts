// Sugerencias de Santiago: Parameter Object Pattern, Value Object. Gemini AI Overview para investigar conteo: 3
import { readFile, writeFile } from "node:fs/promises";
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

	async save(item: PsoItem) {
		const itemPlano = {
			uuid: item.uuid,
			nombre: item.nombre,
			cantidad: item.cantidad,
			rareza: item.rareza,
		};
		const filePath = "./data.json";
		try {
			const oldData = await readFile(filePath, "utf-8");
			const newJson = JSON.parse(oldData);
			newJson.push(itemPlano);
			await writeFile(filePath, JSON.stringify(newJson, null, 4), "utf-8");
			console.log("Datos escritos correctamente!");
		} catch (error) {
			if (error.code === "ENOENT") {
				await writeFile(filePath, JSON.stringify([itemPlano], null, 4), {
					flag: "wx",
				});
			} else {
				console.error("Error al escribir el archivo:", error);
			}
		}
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

const lista = new Lista();
console.log(lista);
const item1 = new PsoItem({ nombre: "Prueba2", rar: 7, cantidad: 9 });
lista.push(item1);
lista.save(item1);
console.log(lista.print());
