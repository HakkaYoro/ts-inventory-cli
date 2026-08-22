// TASK 1 (Día 12): REPASO REAL de async/await + try/catch (Día 11 NO
// aprendido — deuda de sueño + cafeína + sobrecarga = día de supervivencia,
// reporte de Marisa, Ago 20) + primera pasada de Decoradores.
// ESTADO: CALIBRADA (Ago 21, día de descanso — batsu con datos reales tras
// sync: in 7A, type guard 6A, scope 4A → refuerzos integrados en B5, C-j, C-k.
// DI suspendida hasta Fase 2 — material NestJS no visto, no es hueco).
// Tema: Touhou (rotación: Ado D11 → Touhou D12). Fecha: **Ago 22** (Día 11
// se corre a Ago 21; esta task se corre Ago 22).
//
// ANTES DE EMPEZAR (lectura de 10 min): MDN "Using promises"
// (developer.mozilla.org/es/docs/Web/JavaScript/Guide/Using_promises).
// Es la MISMA lectura que tenías el Día 11 — ahora con la cabeza fría.
//
// Enunciado:
//
// WARM-UP (10 min) — una línea cada uno:
// 1) ¿Qué ES una función async? ¿Qué devuelve SIEMPRE?
//    (Pista: aunque no escribas new Promise adentro, la caja aparece sola.)
//      R: Es una función, que sin importar lo que ocurra (O si está esperando un resultao o similar), no interrumpe el hilo principal, cómo lo dice, es asíncrono. Lo que hace es establecer un Promise automáticamente, no hace falta que se declare.
// 2) ¿Dónde va el try/catch: en la función que lanza, o en la que llama?
//    (Pista: el constructor grita, el que crea decide — ItemPSO.)
//      R: No entiendo tu pregunta, pero, va dentro de... AH, ya te entendí, va en la función que llama, porque va a intentar enviar datos (try) y si alguno de esos datos no cumple lo que la función a la que se llama pide atrapa el error (catch). Ahora, cómo se hace el catch, ni idea XD.
// 3) ¿Por qué `console.log(descargarTodo())` imprimió "Promise { <pending> }"?
//    (Pista: event loop — el log corre antes de que las descargas terminen.)
//      R: Ni idea, por cierto. No me coloques pistas acá, siento que son trampa. Pero en serio ni idea...
// PARTE A — Async/await desde cero (45 min) — REPASO REAL, no se asume nada:
//
// 1) Lee "Using promises" de MDN (10 min). Después, en comentarios, con tus
//    palabras y SIN mirar el archivo de ayer: (No leí nada, creo que las puedo responder sin necesidad de ver MDN)
//    a) ¿Qué ES una Promise? Nombra sus 3 estados.
//          R: Una promise es una declaración. Dice "No sé cuando, pero en algún momento recibiré lo que pides.". Y tiene 3 estados, Fulfilled (Conseguido y aprobado), Pending (Esperando) y Rejected (No es lo que estaba esperando).
//    b) ¿Qué ES await? ¿Qué hace exactamente cuando lo escribes?
//       (Pista: pausa la función, NO bloquea el programa.)
//          R: Await cómo lo dice el nombre, espera. Espera a obtener un resultado de forma asíncrona antes de proceder al siguiente paso.
//    c) ¿Qué ES Promise.all? ¿Qué pasa si UNA de las promesas falla?
//          R: (Asumo que es esto). TODO lo que puede retornar un valor, espera pacientemente antes de seguir con el siguiente paso (await). Pero, si una de las promesas falla, se detiene la ejecución del promise.all, claro, si hay un catch no explota nada/se detiene el programa abruptamente.
//    d) ¿Qué ES error instanceof Error y por qué hace falta antes de leer
//       .message? (Pista: ¿qué tipo llega en el catch?)
//          R: Aún no lo vivo en piel propia. Pero me imagino que el tipo que llega es undefined (por lógica). Y el instanceof Error es porque no encontró la propiedad esperada.
// 2) Escribe DESDE CERO, sin copiar (cierra el archivo de ayer si hace
//    falta — teclea, no pegues), una función async:
//    async function descargarCancion(titulo: string, segundos: number):
//    Promise<string> que: (1) si titulo está vacío, lance un Error;
//    (2) espere segundos * 1000 con setTimeout DENTRO de un new Promise;
//    (3) devuelva titulo. Exactamente el mismo molde de ayer — pero esta
//    vez tecleado con la cabeza fría. Si te trabas, relee el enunciado.
//    Pregunta en comentario [refuerzo Día 11 — return-entrega]: si la
//    función devuelve titulo, ¿qué pasa si escribes `return;` pelado?
//    (Pista: lo viste ayer — undefined.)
//
// 3) Escribe una función setlist() async que descargue "Odo", "Usseewa",
//    "Kura Kura" EN SECUENCIA (3 awaits seguidos) y devuelva el array.
//    Imprime el resultado con setlist().then((c) => console.log(c)).
//    Pregunta en comentario: ¿por qué tardó ~6s? ¿Y por qué el log va
//    AFUERA con .then y no adentro de la función? (Pista: la función
//    entrega, el caller decide — Día 6.)
//
// 4) Envuelve la PRIMERA llamada de setlist en try/catch (cambia "Odo" por
//    "" para probar el error). Imprime el mensaje con instanceof Error.
//    Pregunta en comentario: ¿quién decide qué hacer con el error: la
//    función que lanza o la que llama? ¿Por qué?
//    [Refuerzo Día 11 — Promise<unknown>]: si escribirás la versión a mano
//    (new Promise), ¿por qué hay que anotar new Promise<string>? ¿Qué pasa
//    si no lo anotas? (Pista: la caja no sabe qué hay dentro.)
//
// PARTE B — Decoradores + práctica de asincronía (40 min):
//
// 5) Un decorador ES una función que se pega ANTES de una clase/método
//    (@etiqueta) para leerlo o modificarlo — el que la lee decide.
//    Escribe un decorador de método (target, propertyKey, descriptor)
//    que imprima "Método llamado: " + propertyKey CADA VEZ que se
//    llame, y que atrape errores: el descriptor tiene `value` = la
//    función original; si el método lanza, el envoltorio atrapa y
//    hace console.log del .message (instanceof Error) — igual que tu
//    catch de la Parte A. El método original NO se toca.
//    ANTES de tocar descriptor.value verifica: `if ("value" in descriptor)`
//    (un getter usa `get`, no `value` — si no está, devuelve el
//    descriptor tal cual). Llama el método 2 veces y mira los logs.
//    Preguntas en comentario: (a) ¿qué ES target / propertyKey?
//    (b) ¿qué le preguntas al descriptor con `in`, y en qué se
//    diferencia del `in` de Python?
//    ⚠️ PARA CORRER ESTE ARCHIVO: `tsx practice/0821/tasks/task1.ts`.
//    El `node` pelado NO corre decoradores (SyntaxError en el @) —
//    verificado Ago 22. tsx sí (verificado). Parte A sola corre con
//    node como siempre; el archivo completo, con tsx.
//
// 6) @Module de NestJS (lectura + explicación, 15 min): lee el ejemplo del
//    Overview de NestJS (el CatsModule, docs.nestjs.com/modules). En
//    comentarios: ¿qué ES @Module()? ¿Qué agrupa? (Pista: tu carta del Día
//    2 — controllers, providers, imports, exports.) ¿En qué se parece a tu
//    export del Día 6 y en qué es más? No profundices — solo leer y
//    explicar. Es la costura hacia Fase 2.
//
// 7) tsconfig.json: crea uno en la raíz del repo con:
//    target: "ES2022", module: "ESNext", strict: true, outDir: "./dist",
//    rootDir: "./practice", experimentalDecorators: true,
//    allowImportingTsExtensions: true, noEmit: true.
//    (experimentalDecorators: sin esto, tsc rechaza el @ de la Parte B5 —
//    la forma (target, propertyKey, descriptor) es el estilo LEGACY.
//    allowImportingTsExtensions + noEmit: sin esto, tsc explota con el
//    import "./x.ts" del Día 6 — un error VIEJO que no es tuyo.)
//    Corre `tsc --noEmit` ( directo — NO uses npx en esta máquina: está
//    roto, es un shim de npm run ). Con eso, TODO practice/ debe salir
//    en 0 errores.
//    Pregunta en comentario: ¿qué ES strict: true? (Pista: el modo que te
//    obliga a tratar null/undefined en serio — y por qué tsc marca lo que
//    node ejecuta igual. ¿Qué viste ayer con el 4?)
//
// PARTE C — Explicaciones que caen en entrevista (20 min):
//
// 8) En comentarios, con tus palabras:
//    a) ¿Qué ES una función async? ¿Qué devuelve SIEMPRE?
//    b) ¿Qué ES await? ¿En qué se diferencia de .then()?
//    c) ¿Dónde va el try/catch y por qué?
//    d) ¿Qué ES Promise.all? ¿Por qué tarda ~2s y no 6s?
//    e) ¿Qué ES un decorador? (Pista: función + @ + metadatos.)
//    f) ¿Qué ES target en un decorador de método? ¿Y propertyKey?
//    g) [Refuerzo Día 11] ¿Qué ES la regla de oro? (Pista: practice/ es TU
//       territorio — el código que funciona no se reescribe por estética;
//       la mejora se anota, no se impone.)
//    h) [Refuerzo Día 11] ¿Por qué tu escalera de .then imprimió
//       "undefined" dos veces y con await no? (Pista: el puente return —
//       la flecha con llaves necesita ______ para entregar al siguiente
//       eslabón.)
//    i) [Refuerzo Día 11] La Promise entrega UNA sola vez: ¿qué pasa si
//       llamas resolve() dos veces? ¿Cuál gana? (Pista: lo viste ayer con
//       el resolve duplicado.)
//    j) [Refuerzo Día 12 — user-defined type guard, 6 Again ayer] ¿Qué ES
//       "x is Tipo" en una firma? (Pista: es un PORTERO tuyo — prometes al
//       compilador: si mi función dice true, x ES Tipo de aquí en
//       adelante. Acabas de usarlo: el catch del punto 4 usa instanceof
//       Error, que es el portero DE JS. "x is Tipo" es el portero TUYO.)
//    k) [Refuerzo Día 12 — scope, 4 Again ayer] En la Parte A, la función
//       descargarCancion recibe `titulo` y `segundos`. ¿Dónde viven esas
//       variables? ¿Puedes usar `titulo` FUERA de la función? ¿Y una
//       variable declarada dentro de un bloque if, dónde vive? (Pista: la
//       habitación donde nace la variable — Día 2.)
//
// PUNTO EXTRA — Shallow copy vs deep copy (Santiago, 15-20 min):
//
// 9) Santiago te pidió estudiarlo — es clásico de entrevista. Cópialo,
//    correlo y observa:
//
//    const original = { nombre: "Sakuya", poderes: ["cuchillos", "tiempo"] };
//    const copia = original;            // ¿ESTO es una copia?
//    copia.poderes.push("maid");
//    console.log(original.poderes);     // ¿qué sale? ¿por qué?
//
//    Ahora con spread:
//
//    const copia2 = { ...original };    // shallow copy
//    copia2.poderes.push("killer maid");
//    console.log(original.poderes);     // ¿cambió? ¿por qué?
//
//    Preguntas para comentario:
//    a) ¿Qué ES una shallow copy? ¿Qué copia y qué comparte?
//    b) ¿Cómo haces una deep copy (todo nuevo, cero compartido)?
//       (Pista: structuredClone.)
//
// Reglas de siempre: === SIEMPRE. Sin valores quemados en funciones.
// Releer el enunciado completo antes de decir "listo".
//
// NOTA DE DISEÑO (Ago 20 noche, reporte de Marisa): el Día 11 se corrió
// con RAM frita — deuda de sueño + Monster + capuchino + sobrecarga. El
// código compiló pero la lógica no se instaló. Esta task es el "rollback
// mental": async/await y try/catch se re-enseñan desde cero (Parte A), y
// los decoradores del Día 12 sirven de andamiaje (Parte B) en vez de ser
// el foco. El Día 12 original (decoradores profundos + modules + tsconfig)
// se replanifica: modules/@Module quedan para después de consolidar esto.
// La Parte A es la prioridad — si el día se corta, A primero, B después,
// C y el punto extra solo si sobra tiempo.
//
// Total estimado: 110-130 min.
// Start Time: (22/08) 06:34 - XX:YY
// Total Time Spent: D12 XXX:YY
//
// WORKFLOW INCREMENTAL: al terminar cada parte (Warm-up/A/B/C), manda
// un mensaje corto a Reimu ("parte X lista, me trabé en Y, seguía").
// Ella actualiza el progress en tiempo real y ajusta esta task. No es
// un reporte formal entre partes — es un aviso de paso.

// Sin leer, sin investigar ni nada. Si investigo te lo dejo al lado, o te lo dejo claro al notificarte. New Promise autocompletado por vscode, no usado LLMs.
// - ¿Qué pasa con return; pelado? (la pregunta del enunciado)
//      R: LLega un undefined, porque no le estoy diciendo que debe retornar.
// - ¿Quién llamó a descargarCancion con argumentos vacíos y por qué? (el misterio del Baka)
//      R: Es por el callback. Quien llama con argumentos vacíos es el setTimeout cuando llamó a la función "descargarCanción" con argumentos vacíos (undefined).
async function descargarCancion(
	titulo: string,
	segundos: number,
): Promise<string> {
	if (!titulo) throw new Error(`No puede estar vacío... Baka!`);
	await new Promise<string>((resolve) => {
		setTimeout(() => resolve(titulo), segundos * 1000);
	});
	return titulo;
}
// Tardó 6 segundos porque se ejecuta la función de forma secuencial. Investigado por internet el uso de catch
async function setlist() {
	try {
		const test1 = await descargarCancion("", 2);
		const test2 = await descargarCancion("test2", 2);
		const test3 = await descargarCancion("test3", 2);
		return [test1, test2, test3];
	} catch (error) {
		if (error instanceof Error) console.log(error.message);
	}
}

setlist().then(console.log);
