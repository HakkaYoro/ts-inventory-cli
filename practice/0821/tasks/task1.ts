// TASK 1 (Día 12): REPASO REAL de async/await + try/catch (Día 11 NO
// aprendido — deuda de sueño + cafeína + sobrecarga = día de supervivencia,
// reporte de Marisa, Ago 20) + primera pasada de Decoradores.
// ESTADO: BORRADOR — REESTRUCTURADA (Ago 20 noche): el Día 11 se marca como
// "No Aprendido" en progress.md. Esta task NO asume que las Promesas se
// dominan: la Parte A las re-enseña desde cero con teoría real y ejercicios
// guiados, y los decoradores del Día 12 se convierten en el andamiaje donde
// practicarlas. Foco: async/await + try/catch (pedido explícito de Gabriel).
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
// 2) ¿Dónde va el try/catch: en la función que lanza, o en la que llama?
//    (Pista: el constructor grita, el que crea decide — ItemPSO.)
// 3) ¿Por qué `console.log(descargarTodo())` imprimió "Promise { <pending> }"?
//    (Pista: event loop — el log corre antes de que las descargas terminen.)
//
// PARTE A — Async/await desde cero (45 min) — REPASO REAL, no se asume nada:
//
// 1) Lee "Using promises" de MDN (10 min). Después, en comentarios, con tus
//    palabras y SIN mirar el archivo de ayer:
//    a) ¿Qué ES una Promise? Nombra sus 3 estados.
//    b) ¿Qué ES await? ¿Qué hace exactamente cuando lo escribes?
//       (Pista: pausa la función, NO bloquea el programa.)
//    c) ¿Qué ES Promise.all? ¿Qué pasa si UNA de las promesas falla?
//    d) ¿Qué ES error instanceof Error y por qué hace falta antes de leer
//       .message? (Pista: ¿qué tipo llega en el catch?)
//
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
// 5) Un decorador ES una función que recibe algo (una clase, un método) y
//    puede leerlo o modificarlo. Ancla: etiqueta que se pega ANTES de la
//    cosa; el que la lee decide. Escribe un decorador de método que reciba
//    (target, propertyKey, descriptor) e imprima "Método llamado: " +
//    propertyKey CADA VEZ que se llame al método. Pista: el descriptor
//    tiene una propiedad `value` que ES la función original — envuélvela.
//    Pregunta en comentario: ¿qué ES target en un decorador de clase? ¿Y
//    propertyKey en uno de método? (Pista: target = la clase/método que
//    lleva la etiqueta; propertyKey = el nombre del método.)
//    [Refuerzo — try/catch en el que llama]: el envoltorio es el que LLAMA
//    al método original. Envuélvelo con try/catch: si el método lanza,
//    atrapa y haz console.log del mensaje (instanceof Error). El método
//    original NO se toca. Igual que en la Parte A, pero ahora en un
//    decorador.
//    Prueba: llama el método 2 veces y mira los logs.
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
//    rootDir: "./practice". Corre `npx tsc --noEmit`.
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
// Start Time: (22/08) XX:YY - XX:YY
// Total Time Spent: D12 XXX:YY
//
// WORKFLOW INCREMENTAL: al terminar cada parte (Warm-up/A/B/C), manda
// un mensaje corto a Reimu ("parte X lista, me trabé en Y, seguía").
// Ella actualiza el progress en tiempo real y ajusta esta task. No es
// un reporte formal entre partes — es un aviso de paso.
