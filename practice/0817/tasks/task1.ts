// TASK 1 (Día 8): Generics — Inventario de PSO:BB
// Integración de conceptos: Días 1-8 (tema del día: GENERICS)
//
// ANTES DE EMPEZAR: lee la sección 6 (Generics) del cheatsheet
// typescript-from-python.md. 10 min máximo. Pila<T> es el ejemplo
// guía. Si algo no cuaja, escribe igual — la parte B te lo aclara
// con tu propio código.
//
// Enunciado:
//
// WARM-UP — bankTotal debe ser TUYO (15 min):
//
// 1) Abre tu task de ayer (0816). En bankTotal: borra el || 0,
//    corre, y MIRA lo que sale en cada casillero. Después
//    devuélvelo. (Esto lo cierra para siempre.)
//
// 2) Aquí: una función contarPorRarity con el MISMO patrón de ayer
//    (acumulador + bucle + default), escrita desde memoria, sin
//    abrir la task 0816. Si necesitas mirar, miras, anotas qué
//    pieza te faltó, y tapas.
//
// PARTE A — El inventario (15 min):
//
// 3) Type ItemPSO: nombre (readonly), rarity (readonly, union con
//    4-5 raridades reales de PSO), ataque (private number),
//    equipado (private boolean). Clase o type + objeto — tu
//    decisión de arquitectura, pero sabe cuál usaste y por qué.
//
// 4) 6-8 items REALES de PSO:BB en un array. Los datos los sabes
//    tú (eso es data lookup — permitido consultar wiki/IA).
//
// PARTE B — Generics, el tema del día (35 min):
//
// 5) Tu searchVoca de ayer solo sirve para Vocaloid[]. Tu
//    contarPorRarity de hoy solo sirve para ItemPSO[]. Misma
//    lógica, distinto tipo. Hoy escribe UNA SOLA función:
//
//      buscarPorNombre que funcione con vocaloids Y con items.
//
//    Pista de diseño: la función no sabe QUÉ recibe — recibe
//    "una lista de ALGO, donde cada algo tiene .nombre". Ese
//    "ALGO" es el type parameter <T>. El cheatsheet §6 te da
//    la sintaxis.
//
// 6) Pruébala con los DOS arrays: el de items nuevo y el de
//    vocaloids de ayer (copia el array o impórtalo desde
//    ../0816/tasks/vocaloids-data.ts — tu decisión, como ayer:
//    las flechas en una sola dirección).
//
// 7) Misma función, dos tipos distintos. En comentarios:
//    ¿QUÉ ES un type parameter <T>? ¿Por qué la MISMA función
//    sirve para Vocaloid y para ItemPSO sin reescribirla?
//
// PARTE C — Explicaciones que caen en entrevista (20 min):
//
// 8) En comentarios, con tus palabras:
//    a) ¿Qué ES el event loop de Node.js? OJO con esta trampa de
//       entrevista: ¿usa varios hilos o uno? Explica por qué.
//       (Pista: hoy confundiste esto. La carta fue reescrita.)
//    b) Re-explica el || 0 del warm-up: ¿qué pasaría sin él,
//       paso a paso, en el primer item que llega?
//    c) ¿Qué ES T[] y qué relación tiene con Array<T>?
//       (Esto lo viste hoy en el cheatsheet. Son lo mismo.)
//    d) Big-O de cada función que escribiste HOY (warm-up y
//       parte B), con una línea de por qué.
//    e) ¿Qué ES hoisting? (carta nueva de hoy)
//
// Reglas de siempre: === SIEMPRE. Sin valores quemados en
// funciones. Releer el enunciado completo antes de decir "listo".
// El separador que el enunciado pida, exactamente ese.
//
// Tema: PSO:BB. El concepto es lo que importa.
//
// Total estimado: 85-95 min. Si satura, la Parte C se parte en dos:
// a-b hoy, c-d-e mañana. Warm-up y Parte B hoy sí o sí.
// Start Time: (17/08) 13:00 - 16:42
// Total Time Spent: D1 184:22

import { misWaifus } from "./vocaloids-data";

export class ItemPSO {
	readonly nombre: string;
	readonly rarity: "common" | "rare";
	private ataque: number;
	private equipado: boolean;
	constructor(
		nombre: string,
		rarStar: number,
		ataque: number,
		equipado: boolean,
	) {
		if (rarStar < 1 || rarStar > 12) {
			throw new Error(
				`El número ${rarStar} no está en el rango permitido! Solo números del 1 al 12`,
			);
		}
		this.nombre = nombre;
		this.rarity = rarStar <= 6 ? "common" : "rare";
		this.ataque = ataque;
		this.equipado = equipado;
	}
}

export const itemList: ItemPSO[] = [
	new ItemPSO("Excalibur", 12, 890, true),
	new ItemPSO("Heaven Striker", 12, 625, false),
	new ItemPSO("Lavis Cannon", 11, 782, true),
	new ItemPSO("Psycho Wand", 12, 255, false),
	new ItemPSO("Saber", 1, 8, false),
	new ItemPSO("Spread Needle", 11, 238, true),
	new ItemPSO("Slicer of Fanatic", 10, 315, true),
	new ItemPSO("Double Cannon", 12, 832, true),
	new ItemPSO("Tsumikiri J-Sword", 12, 765, false),
];

export function buscarPorNombre<T extends { nombre: string }>(
	searchName: string,
	nombres: T[],
) {
	const searchItem = nombres.find((nombre) => nombre.nombre === searchName);
	if (!searchItem)
		throw new Error(`El nombre ${searchName} no existe, vuelva a intentarlo!`);
	return searchItem;
}

function contarPorRarity(
	contRarity: readonly ItemPSO[],
): Record<string, number> {
	const conteo: Record<string, number> = {};
	for (const rarity of contRarity) {
		const repRarity = rarity.rarity;
		conteo[repRarity] = (conteo[repRarity] || 0) + 1;
	}
	return conteo;
}

console.log(contarPorRarity(itemList));
console.log(buscarPorNombre("Saber", itemList));
console.log(buscarPorNombre("Reimu Hakurei", misWaifus));
// PARTE B — Generics, el tema del día (35 min):
// 7) Misma función, dos tipos distintos. En comentarios:
//    ¿QUÉ ES un type parameter <T>? ¿Por qué la MISMA función
//    sirve para Vocaloid y para ItemPSO sin reescribirla?
//		R: Okay, bueno. Porque el mismo nombre lo dice, es un genérico. Osea, está diseñado para que funcione con todo. Cuando le digo T extends y lo que necesito, le estoy diciendo "En todos los posibles Arrays con datos de las clases presentes. Solo te vas a fijar en la que comúnmente posee la propiedad que se llama XXX de tipo YYY".
//		y luego le estoy pasando el argumento que dice "El genérico solo va a buscar en Arrays." Por eso funciona.

// PARTE C — Explicaciones que caen en entrevista (20 min):
//
// 8) En comentarios, con tus palabras:
//    a) ¿Qué ES el event loop de Node.js? OJO con esta trampa de
//       entrevista: ¿usa varios hilos o uno? Explica por qué.
//       (Pista: hoy confundiste esto. La carta fue reescrita.)
//		R: Es el comportamiento regular de NodeJS. Se usa para ejecutar todo de forma asíncrona, así si algo explota, nada se rompe/detiene, se sigue ejecutando. Útil porque JS está diseñado para que sea síncrono, y si algo explota todo muere. Corrección de Reimu. JS es sincrono (creo que no me dí a entender, no sé), y el que NodeJS su comportamiento principal sea de forma asíncrona (Event Loop) no significa que no pueda crashearse.
//    b) Re-explica el || 0 del warm-up: ¿qué pasaría sin él,
//       paso a paso, en el primer item que llega?
//			R: || significa or. En el warmup le estoy pidiendo "Encuentra el valor ubicado en el array usando la variable repRarity. Si la encuentras, continúa (la suma) si no, retorna 0 y sigue buscando (no suma, o eso creo.)." Luego el valor se lo pasa al Record y mantiene en memoria cuantas veces se sumó X cosa. Creo que entendí eso bien. Pero lo que buscaba saber era que || es OR. Ya con eso me dijiste casi que todo XD. Corrección de Reimu. El OR se usa para determinar si lo que se le pide a la izquierda es falsly, osea que si la condición de la izquiera es falsa, la de la derecha es verdadera, la de la derecha es el valor default si el de la izquierda es falso.
//    c) ¿Qué ES T[] y qué relación tiene con Array<T>?
//       (Esto lo viste hoy en el cheatsheet. Son lo mismo.)
//			R: T[] es genérico, osea, usa un type de cualquier clase para hacer un array. Array<T> hace un array con un type en específico.  Corrección de Reimu. SON LO MISMO, el <T> es la versión compacta.
//    d) Big-O de cada función que escribiste HOY (warm-up y
//       parte B), con una línea de por qué.
//			R: Warmup y parte B de tipo O(n), Porque ambos buscan datos en tablas en específico hasta llegar al que necesita. No, me equivoqué. Parte B si es O(n), porque busca hasta encontrar algo que coincida (.find).
//				En cambio, warmup es de tipo O(log n). Porque sí o sí tiene que buscar n cantidad de datos (todos), solo que va disminuyendo cuando encuentra uno y suma, encuentra otro y suma. No sé si exactamente es O(log n) porque no sé donde exactamente se reduce a la mitad su tiempo de ejecución, pero si sé que procesando cada uno su tiempo restante disminuye, por eso concluyo que es O(log n). Corrección de Reimu. Ambos si son O(n).
//    e) ¿Qué ES hoisting? (carta nueva de hoy)
//			R: Verga, creí que no me acordaba. OKAY, básicamente es un proceso que hace JS en general de elevar todas las variables al principio de la memoria/RAM. Corrección de Reimu, no es al principio de la ram, es al principio del SCOPE, funciones (declaradas) van de primero, var de segundo (cómo undefined hasta que le llegue el valor) y let/const de tercero (Temporal Dead Zone), se mantienen bloqueadas hasta que el scope lea sus valores.
