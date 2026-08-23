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
// ⚠️ ORDEN INVERTIDO: B.7 (tsconfig) ANTES que B.5. Sin experimentalDecorators
//    el decorador llega como (fn, contexto) y `descriptor` es undefined —
//    verificado Ago 23: "Cannot use 'in' operator ... in undefined".
//    tsx solo respeta el flag leyéndolo del tsconfig.json del repo.
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
//		R: Un @module en Nest es un decorador para tener los metadatos de una clase y así tenerlos bien organizados en memoria. Por defecto encapsula "Providers" (Revisé justo ahorita, no estaba seguro, también los otros que te diré los revisé), también encapsula controllers, imports y exports. Ahora, su estructura para los imports y exports son muy similares a la de ES en Typescript. Con la diferencia que los mantiene en memoria, bien estructurados para fácil acceso (cómo si fuera un .set, están hasheados y es casi instantanea su ejecución al ser llamados).
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
// >>> Correcciones de Reimu — LEER MAÑANA ANTES DEL MINI-PROYECTO (10 min).
// >>> Veredicto C: 6 aprobadas, 2 con nota, 3 corregidas abajo. La e) es la importante.

// PARTE C — Explicaciones que caen en entrevista (20 min):
//
// 8) En comentarios, con tus palabras:
//    a) ¿Qué ES una función async? ¿Qué devuelve SIEMPRE?
//			R: Cómo lo dice el nombre, es una función que se ejecuta de forma asíncrona para no interrumpir al hilo principal del programa (YA SE que es single threaded, solo que no sé de que otra forma explicar eso sin decir hilo principal. Porque sé que lo que hace es no interrumpir o pausar el funcionamiento del programa mientras se ejecuta.). Siempre devuelve un promise.
// ✅ Aprobada. Core y "SIEMPRE Promise" correctos. Nota: lo que la hace async no es
//    correr aparte — es que SUSPENDES la función en cada await y el hilo único se
//    libera mientras espera. Tu paréntesis del single-thread: sí, era eso.
//    b) ¿Qué ES await? ¿En qué se diferencia de .then()?
//			R: Es similar solo que es más agradable a la vista y no haces a lo pendejo un Callback Hell a punta de usar .then. Su funcionamiento es, ejecuta la tarea que se le pide, espera a completarla, la recibe (fullfiled) y procede con la siguiente tarea. Es un .then pero más bonito.
// ✅ Aprobada. La diferencia que faltó: .then REGISTRA un callback y sigues
//    encadenando; await SUSPENDE esta función y devuelve el hilo al event loop
//    hasta que llegue el resultado. Uno es "avísame", el otro es "yo espero".
//    c) ¿Dónde va el try/catch y por qué?
//			R: Va en la función que le envía los datos a otra función (Osea, la función que hace el callback a otra). Porque primero quieres intentar que tus tareas (try) se ejecuten correctamente, y si ocurre un error (catch) lo atrapa y reporta sin romper el programa. Es similar al try/except de python.
// ✅ Aprobada — y lo viviste DOS veces: A.4 y el envoltorio del decorador.
//    Mismo try/catch, distinto techo.
//    d) ¿Qué ES Promise.all? ¿Por qué tarda ~2s y no 6s?
//			R: Promise.all ejecuta todas las tareas que están dentro de él al mismo tiempo. Solo cuando todas se completen, devuelve el resultado de todas en un array.
// ✅ Aprobada. El 2s-vs-6s: como corren a la vez, manda el MÁS LENTO, no la suma.
//    Y si UNA falla, Promise.all entera rechaza — lo dijiste tú en el warm-up.
//    e) ¿Qué ES un decorador? (Pista: función + @ + metadatos.)
//			R: No sé explicarlo. Lo que yo entendí, son funciones que le colocas a una clase para que haga algo que le solicites.
// ❌→✅ SÍ puedes — CONSTRUISTE uno hoy. Molde: función que se pega con @ a una
//    clase/método; corre UNA vez al DEFINIRSE la clase; puede LEER (propertyKey)
//    o ENVOLVER (descriptor.value = ...). "Para que haga algo que le solicites"
//    ES envolver. Te faltaba confianza, no conocimiento.
//    f) ¿Qué ES target en un decorador de método? ¿Y propertyKey?
//			R: Tampoco sé explicarlo bien. propertyKey es el nombre del método que se usó para ejecutar la propiedad solicitada en el decorador.
// ❌→✅ target = la CLASE donde vive el método (el molde, no una instancia).
//    El `any` es OTRA cosa: el TIPO del parámetro (TS no sabe cuál clase tocará).
//    propertyKey ✓: el nombre del método, un string.
//    g) [Refuerzo Día 11] ¿Qué ES la regla de oro? (Pista: practice/ es TU
//       territorio — el código que funciona no se reescribe por estética;
//       la mejora se anota, no se impone.)
//			R: SRP? Eso es lo que quieres preguntar?
// ❌ No es SRP. Regla de oro (Día 11): practice/ es TU territorio — el código
//    que FUNCIONA no se reescribe por estética; la mejora se anota, no se impone.
//    h) [Refuerzo Día 11] ¿Por qué tu escalera de .then imprimió
//       "undefined" dos veces y con await no? (Pista: el puente return —
//       la flecha con llaves necesita ______ para entregar al siguiente
//       eslabón.)
//			R: Porque .then necesita un return para proceder.
// ✅ Aprobada. Completa: la flecha con llaves necesita return EXPLÍCITO para
//    entregar al siguiente eslabón. Sin return → undefined viaja al siguiente .then.
//    i) [Refuerzo Día 11] La Promise entrega UNA sola vez: ¿qué pasa si
//       llamas resolve() dos veces? ¿Cuál gana? (Pista: lo viste ayer con
//       el resolve duplicado.)
//			R: No sé cual de los dos gana. pero por lógica sería el primero, y devuelve un undefined.
// Medio. El PRIMERO gana ✓ — pero no hay undefined: la SEGUNDA llamada resolve()
//    se IGNORA en silencio. La Promise ya entregó; entrega UNA sola vez, para siempre.
//    j) [Refuerzo Día 12 — user-defined type guard, 6 Again ayer] ¿Qué ES
//       "x is Tipo" en una firma? (Pista: es un PORTERO tuyo — prometes al
//       compilador: si mi función dice true, x ES Tipo de aquí en
//       adelante. Acabas de usarlo: el catch del punto 4 usa instanceof
//       Error, que es el portero DE JS. "x is Tipo" es el portero TUYO.)
//			R: Básicamente le digo "Si X cumple con que sea un Artista, de ahora en adelante lo debes tratar del tipo Artista. Sin preguntar." Es cómo si le asignaras un rol a algo.
// ✅ Aprobada — el portero TUYO. "Asignar un rol" sirve: si devuelve true, el
//    compilador TE CREE y desde ahí x ES Artista. (6 Again en Anki — hoy quedó.)
//    k) [Refuerzo Día 12 — scope, 4 Again ayer] En la Parte A, la función
//       descargarCancion recibe `titulo` y `segundos`. ¿Dónde viven esas
//       variables? ¿Puedes usar `titulo` FUERA de la función? ¿Y una
//       variable declarada dentro de un bloque if, dónde vive? (Pista: la
//       habitación donde nace la variable — Día 2.)
//			R: Esas variables viven en el Scope de esa función, en su propia casa. Y no, fuera de esa función no se puede usar, a menos que te refieras a si lo puedo usar cómo un argumento (Cosa que si se puede). Y el otro caso, viviría en el scope del if.
// ✅ Aprobada. Casa propia = scope de función; el if = scope de bloque. El matiz
//    del argumento también es correcto: puedes PASAR el valor, la variable muere
//    donde nació.
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

function decoradorDeMierda(
	target: any,
	propertyKey: string,
	descriptor: PropertyDescriptor,
) {
	const original = descriptor.value;
	descriptor.value = function () {
		try {
			console.log(`Método Llamado:`, propertyKey);
			return original();
		} catch (error) {
			if (error instanceof Error) return console.log(error.message);
		}
	};
	return descriptor;
}

class claseDeMierda {
	@decoradorDeMierda
	hola() {
		return "Usseewa";
		/* throw new Error(`error mori`); */
		/* console.log("tengo sueñito") */
	}
}

console.log(new claseDeMierda().hola());

// Sin leer, sin investigar ni nada. Si investigo te lo dejo al lado, o te lo dejo claro al notificarte. New Promise autocompletado por vscode, no usado LLMs.
// - ¿Qué pasa con return; pelado? (la pregunta del enunciado)
//      R: LLega un undefined, porque no le estoy diciendo que debe retornar.
// - ¿Quién llamó a descargarCancion con argumentos vacíos y por qué? (el misterio del Baka)
//      R: Es por el callback. Quien llama con argumentos vacíos es el setTimeout cuando llamó a la función "descargarCanción" con argumentos vacíos (undefined).
async function descargarCancion1(
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
async function setlist1() {
	try {
		const test1 = await descargarCancion1("", 2);
		const test2 = await descargarCancion1("test2", 2);
		const test3 = await descargarCancion1("test3", 2);
		return [test1, test2, test3];
	} catch (error) {
		if (error instanceof Error) console.log(error.message);
	}
}

setlist1().then(console.log);

/*
1. "¿Qué viste ayer con el 4?" — el 4 es el punto A.4 de ayer, tu try/catch. Ahí tu catch atrapó el error, imprimió el mensaje… y la función terminó sin devolver nada. Resultado: undefined, impreso sin drama. Node no se quejó de nada. Corrió todo igual.
		R: Que el programa no explotó. Gracias al try/catch.
2. Entonces la pregunta real es: si el motor ejecuta eso sin problema, ¿por qué existiría un modo que SÍ se queja de esas cosas antes de correr? ¿Qué gana alguien activándolo?
		R: Porque, realisticamente, si es un error crítico/estás haciendo debugging, es útil el que todo explote y saber donde ocurrió todo el problema. En cambio el try/catch es más que todo porque sabes que puede fallar, pero no es un bug o similar. Entonces puede ser ignorado sin problemas.
3. Y "¿qué ES strict?" se responde con eso: es un interruptor que enciende un paquete de alarmas de TS. ¿Alarmas de qué, sobre todo? La pista lo dice: null/undefined. 
		R: Se asegura de que ningún valor sea null/undefined.
*/
