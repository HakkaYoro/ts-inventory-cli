// TASK 1 (Día 6): Node.js + Repaso de Fundamentos — Manager de Kexpé (Vocaloid)
// Integración de Conceptos: Días 1-6
//
// Contexto: hoy toca Node.js (tema del día: event loop, npm, modules)
// + los huecos del micro-test de Santiago de ayer.
//
// Vas a construir el manager de un estudio donde trabajan Vocaloids.
// UN SOLO ARCHIVO, todo con lo aprendido. Nada de conceptos nuevos
// de TypeScript — solo los que ya usaste + lo que leas de Node.js.
//
// Enunciado:
//
// PARTE A — El estudio (20 min):
//
// 1) Clase Vocaloid con: nombre (readonly), banco (readonly, union
//    "Crypton" | "Internet Co" | "Other"), canciones (private number),
//    activo (private boolean). Constructor + método activar() que
//    ponga activo en true (público) + método estado() que devuelva
//    template string con todos los datos (ficha de siempre).
//    Puedes usar la versión larga o el ATAJO de parameter properties
//    — el que quieras, pero sabe cuál usaste.
//
// 2) 4-5 vocaloids con new, array tipado Vocaloid[].
//
// PARTE B — Micro-test de Santiago, en código (30 min):
//    (ayer fue oral y a memoria; hoy lo escribes — memoria muscular)
//
// 3) FUNCIÓN buscarVocaloid(nombre): busca y devuelve el OBJETO
//    (patrón de ayer — sin flags). Throw si no existe.
//
// 4) FUNCIÓN activarVocaloid(nombre): delega en buscarVocaloid
//    (trainUma de ayer) y llama activar(). Devuelve su estado().
//
// 5) Con .map() crea un array con los nombres de todos los
//    vocaloids, y con .join() hazlo un solo string " | " — UNA
//    línea encadenada, como tu nameUmaOnly.
//
// 6) En un objeto nuevo, cuenta cuántos vocaloids hay por banco:
//    { "Crypton": 2, "Internet Co": 2, "Other": 1 } — el número
//    real de TU array. Sin .map() esta vez: piensa qué herramienta
//    de bucle ya conoces que sirva para ACUMULAR resultados.
//
// PARTE C — Node.js, el tema del día (30 min):
//
// 7) Abre la terminal en la carpeta de este archivo y ejecuta:
//      npm init -y
//    Lee el package.json que aparece. En comentarios, responde:
//    ¿Qué ES npm? ¿Qué ES package.json? (ya tienes la carta de npm)
//
//    ⚠ PITFALL REAL (probado en tu Node 26): después del npm init,
//    al ejecutar tu .ts vas a ver un warning amarillo:
//    "Failed to load the ES module ... set \"type\": \"module\""
//    y el archivo no corre. No es tu código — es que package.json
//    nuevo viene sin "type" y Node no sabe si tu archivo es module
//    o script viejo. Fix (una línea):
//      npm pkg set type=module
//    En comentarios dime QUÉ crees que hace esa línea.
//
// 8) Crea un archivo aparte "vocaloids-data.ts" con el array de
//    vocaloids exportado. Importa ese array aquí con:
//      import { listaVocaloids } from "./vocaloids-data.ts";
//    (con Node 26 el import lleva .ts — sin extensión, Node no lo encuentra)
//    Ejecuta con: node task1.ts  (tu Node corre TS nativo, no necesitas tsx)
//    en Node.js? ¿Qué hace el import?
//
// 9) En comentarios, con tus palabras (esto cae EN entrevista):
//    a) ¿Qué ES el event loop de Node.js? (tienes la carta)
//    b) ¿Cuál es la diferencia entre null y undefined? (carta de hoy)
//    c) ¿Cuál es la diferencia entre var, let y const? (carta de hoy)
//    d) ¿Qué ES hoisting? — investiga 10 min máximo en MDN.
//       Es lo que te faltó ayer. Si no lo entiendes en 10 min,
//       escribe "N/A, preguntar a Reimu" y seguimos.
//
// Reglas de siempre: === SIEMPRE. Sin valores quemados en funciones.
// Releer el enunciado completo antes de decir "listo".
//
// Tema: Vocaloid. El concepto es lo que importa.
//
// Total estimado: 80-90 min. Si el cerebro se satura, la Parte C
// se puede terminar mañana temprano — pero A y B hoy.
import { misWaifus, type Vocaloid } from "./vocaloids-data.ts";

function searchVoca(onlyName: string) {
	const found = misWaifus.find((voca) => voca.nombre === onlyName);
	if (!found) throw new Error(`${onlyName} no existe! Baka, baka... Baka!`);
	return found;
}

function activarVocaloid(onlyName: string) {
	const voca = searchVoca(onlyName);
	voca.activar();
	return voca.estado();
}

const nameVocaOnly = misWaifus.map((voca) => voca.nombre).join(" | ");

function bankTotal(bankVocas: readonly Vocaloid[]): Record<string, number> {
	const conteo: Record<string, number> = {};
	for (const voca of bankVocas) {
		const repBancos = voca.banco;
		conteo[repBancos] = (conteo[repBancos] || 0) + 1;
	}

	return conteo;
}
console.log(bankTotal(misWaifus));
console.log(nameVocaOnly);
console.log(activarVocaloid("Reimu Hakurei"));

// 7) Abre la terminal en la carpeta de este archivo y ejecuta:
//      npm init -y
//    Lee el package.json que aparece. En comentarios, responde:
//    ¿Qué ES npm? ¿Qué ES package.json? (ya tienes la carta de npm)
//		R: NPM también conocido cómo Node Package Manager es un gestor de paquetes para backends (Ya que Node.js es para backends más que todo). Su principal función es similar a la de pip (de Python), instalar y manejar paquetes. El "npm init -y" es el equivalente a "python -m venv .venv".
//    ⚠ PITFALL REAL (probado en tu Node 26): después del npm init,
//    al ejecutar tu .ts vas a ver un warning amarillo:
//    "Failed to load the ES module ... set \"type\": \"module\""
//    y el archivo no corre. No es tu código — es que package.json
//    nuevo viene sin "type" y Node no sabe si tu archivo es module
//    o script viejo. Fix (una línea):
//      npm pkg set type=module
//    En comentarios dime QUÉ crees que hace esa línea.
//		R: Okay, no me fijé cual era el type antiguo así que mi explicación va a ser mocha. pero, entiendo que le estoy diciendo. Hey, esto no es un paquete o similar. Solo es un módulo! Entonces no chilla de que lo están ejecutando mal o algo. Busqué por internet y leí que es porque npm no se decide si ejecutar usando CJS o ESM. Con ese cómando, hago que interprete usando ESM. (Entendí a medias. Explicame porfa).
// 8) Crea un archivo aparte "vocaloids-data.ts" con el array de
//    vocaloids exportado. Importa ese array aquí con:
//      import { listaVocaloids } from "./vocaloids-data.ts";
//    (con Node 26 el import lleva .ts — sin extensión, Node no lo encuentra)
//    Ejecuta con: node task1.ts  (tu Node corre TS nativo, no necesitas tsx)
//    en Node.js? ¿Qué hace el import?
//		R: El export, expone (cómo cuando uno hace port fowarding en un router) las clases, variables, funciones, tipos y objetos que le indiques (en el caso de port fowarding, es lo mismo que exponer un puerto). Luego en el caso del import, es cómo si tu añadieras un módulo o paquete de python y le indicas "De esto necesito esto específicamente ubicado en X sitio", es para importar algo que esté expuesto en otro archivo. Una conexión ESM (explicada por Reimu) a través de NodeJS. Moderno, antes se usaba CJS pero era horrendo.
// 9) En comentarios, con tus palabras (esto cae EN entrevista):
//    a) ¿Qué ES el event loop de Node.js? (tienes la carta)
//		R: (Busqué por internet, aún no uso anki). EL event loop es básicamente el funcionamiento central de Node. De forma asíncrona corre todos los módulos de un programa. Ojo, lo respondí con una leída rápida para que no fuera trampa. Ahora, leyéndolo bien, sí, es una operación asíncrona el cual hace que las distintas operaciones de NodeJS corran sin bloqueos a pesar de que JS corra single-threaded. Este último leí y comprendí, no sé si se me grabe.
//    b) ¿Cuál es la diferencia entre null y undefined? (carta de hoy)
//		R: Ambos reciben valores, solo que uno es sin tipo y otro con tipo. En el caso de null, es tipo pero sin valor, en el caso de undefined es valor sin tipo (o tipo desconocido). Corrección de Reimu. El Null es cuando tiene tipo y a propósito no le pusieron nada, el undefined es cuando por accidente no tiene nada.
//    c) ¿Cuál es la diferencia entre var, let y const? (carta de hoy)
//			R: Todas son variables asignables. El uso de cada uno varía según la necesidad. Var N/A (Ya leí, forma legacy de usar let y const). Let te deja manejar todo de forma dinámica (propiedades, valores, objetos), útil si sabes que en algún momento necesitarás cambiar sus valores en RAM. Const, cómo el nombre lo dice, siempre es constante (sus valores, propiedades, objetos), para cambiarlo necesitarías modificar el código. Corrección de Reimu. Const, propiedades si pueden cambiar, lo que no cambia es la reasignación de la variable (Valores me imagino).
//    d) ¿Qué ES hoisting? — investiga 10 min máximo en MDN.
//       Es lo que te faltó ayer. Si no lo entiendes en 10 min,
//       escribe "N/A, preguntar a Reimu" y seguimos.
//			R: (Usé Gemini para que me explicara. Santiago usa mdn solo si sabe que usar y necesita sacar un .(lo que sea, se me olvidó cómo se llaman estas weas) pero no recuerda el funcionamiento exacto y necesita eun ejemplo rápido). Si no entendí mal, JS de forma automática eleva (hoisting) las variables y funciones usando Scope para ser más ordenado en su tiempo de ejecución (Memoria/RAM). Se me va a olvidar esto. Y ni siquiera sé si lo expliqué bien.
