// Sugerencias de Santiago: Parameter Object Pattern, Value Object. Gemini AI Overview para investigar conteo: 7. Cuando digo semi-vibecodeado es que puedo leerlo y explicarlo, primero hice el código cómo podía, y luego el LLM lo reestructuró y quitó cosas innecesarias, replicable por mi cuenta? Tal vez no, pero es cuestión de repetición.
import { readFile, writeFile } from "node:fs/promises";
import { Cantidad } from "./vo/cantidad.vo.ts";
import { Nombre } from "./vo/nombre.vo.ts";
import { Rareza } from "./vo/rareza.vo.ts";

type PsoItemData = {
	nombre: string;
	rar: number;
	cantidad: number;
};

type InventoryItem = {
	nombre: string;
	rar: number;
	rareza: number;
	cantidad: number;
	uuid: string;
};
type InventoryItemUUID = Pick<InventoryItem, "uuid">;
type InventoryItemNombre = Pick<InventoryItem, "nombre">;

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
	// Save semi-vibecodeado + cosas mías
	async save(item: PsoItem) {
		const itemPlano = {
			uuid: item.uuid,
			nombre: item.nombre,
			cantidad: item.cantidad,
			rareza: item.rareza,
		};
		const filePath = "./data.json";

		const existingData = await readFile(filePath, "utf-8")
			.then((data) => JSON.parse(data))
			.catch(async (error: NodeJS.ErrnoException) => {
				if (error.code === "ENOENT") {
					await writeFile(filePath, JSON.stringify([itemPlano], null, 4), {
						flag: "wx",
					});
					console.log("Datos escritos correctamente!");
				} else {
					throw new Error("Error al escribir el archivo:", error);
				}
				return null;
			});

		if (existingData === null) return;

		existingData.push(itemPlano);

		const writeFailed = await writeFile(
			filePath,
			JSON.stringify(existingData, null, 4),
			"utf-8",
		)
			.then(() => false)
			.catch((error: unknown) => {
				console.error(
					"Error al escribir el archivo:",
					error instanceof Error ? error.message : error,
				);
				return true;
			});
		if (writeFailed) return;

		console.log("Datos escritos correctamente!");
	}

	// Remove semi-vibecodeado + cosas mías
	async remove(item: InventoryItemUUID) {
		const itemUUID = item.uuid;
		const filePath = "./data.json";

		const existingData = await readFile(filePath, "utf-8")
			.then((data) => JSON.parse(data))
			.catch(async (error: NodeJS.ErrnoException) => {
				if (error.code === "ENOENT") {
					console.log("El archivo no existe!");
				}
				return null;
			});
		if (existingData === null) return;
		const index = existingData.findIndex(
			(i: { uuid: string }) => i.uuid === itemUUID,
		);
		if (index === -1) {
			console.log("Este item no existe!");
			return;
		}
		existingData.splice(index, 1);
		const writeFailed = await writeFile(
			filePath,
			JSON.stringify(existingData, null, 4),
			"utf-8",
		)
			.then(() => false)
			.catch((error: unknown) => {
				console.error(
					"Error al escribir el archivo:",
					error instanceof Error ? error.message : error,
				);
				return true;
			});
		if (writeFailed) return;
		console.log("Item eliminado correctamente!");
	}

	// search hecho 100% a mano y un 75% a memoria. .filter() Google AI Overview
	async search(item: InventoryItemNombre) {
		const itemNombre = item.nombre;
		const filePath = "./data.json";
		const existingData = await readFile(filePath, "utf-8")
			.then((data) => JSON.parse(data))
			.catch(async (error: NodeJS.ErrnoException) => {
				if (error.code === "ENOENT") {
					console.log("El archivo no existe!");
				}
				return null;
			});
		if (existingData === null) return;
		if (existingData.length === 0) {
			console.log('Archivo vacío! Añade algo antes de usar "search"!');
			return;
		}
		const results = existingData.filter((i: { nombre: string }) =>
			i.nombre.toLowerCase().includes(itemNombre.toLowerCase()),
		);
		if (results.length === 0) {
			console.log("No se encontraron resultados!");
			return;
		}
		console.log("NOMBRE", "|", "RAREZA", "|", "CANTIDAD", "|", "UUID");
		for (const result of results) {
			console.log(
				`${result.nombre}`,
				"|",
				`${result.rareza}`,
				"|",
				`${result.cantidad}`,
				"|",
				`${result.uuid}`,
			);
		}
	}

	// Movido list para acá para mayor orden.
	async list() {
		const filePath = "./data.json";
		let items: InventoryItem[] = [];
		try {
			const fileContent = await readFile(filePath, "utf-8");
			const parsed = JSON.parse(fileContent) as InventoryItem[];
			items = Array.isArray(parsed) ? parsed : [];
		} catch (error: unknown) {
			if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
		}
		if (items.length === 0) {
			console.log('Archivo vacío! Añade algo antes de usar "list"!');
			return;
		}
		console.log("NOMBRE", "|", "RAREZA", "|", "CANTIDAD", "|", "UUID");
		for (const item of items) {
			console.log(
				`${item.nombre}`,
				"|",
				`${item.rareza}`,
				"|",
				`${item.cantidad}`,
				"|",
				`${item.uuid}`,
			);
		}
	}
}

async function main() {
	const args = process.argv.slice(2);
	if (!args[0]) throw new Error("Comando no existente!");
	if (args[0] === "add") {
		const item = new PsoItem({
			nombre: args[1],
			rar: Number(args[2]),
			cantidad: Number(args[3]),
		});
		await new Lista().save(item);
		return;
	}
	if (args[0] === "list") {
		await new Lista().list();
		return;
	}
	if (args[0] === "remove") {
		const UUID = { uuid: args[1] };
		await new Lista().remove(UUID);
		return;
	}
	if (args[0] === "search") {
		const nombre = { nombre: args[1] };
		await new Lista().search(nombre);
		return;
	}
	throw new Error(`Comando no existente: ${args[0]}`);
}

main().catch((error) => {
	console.error(error instanceof Error ? error.message : error);
	process.exitCode = 1;
});
