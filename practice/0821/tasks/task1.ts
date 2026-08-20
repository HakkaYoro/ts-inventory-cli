// TASK 1 (Día 12): Decoradores + Modules + tsconfig — el @ que le da vida a NestJS
// ESTADO: BORRADOR — warm-up recortado a 3 puntos (regla: máx 3) y refuerzos del
// Día 11 integrados en A/B + preguntas en C (reorganización pedida por Gabriel,
// Ago 20). El cuerpo se calibrará con el cierre del Día 11 antes de arrancar.
// Tema: Touhou (rotación: Ado D11 → Touhou D12). Fecha: ~~Ago 21~~ → **Ago 22**
// (Día 11 se corre a Ago 21).
//
// ANTES DE EMPEZAR: lee la sección "Decorators" del TypeScript Handbook
// (typescriptlang.org/docs/handbook/decorators.html) y el Overview de NestJS
// (docs.nestjs.com). Ya tienes cartas de decorador (Día 2) y de @Injectable
// (Día 1) — hoy ves el mecanismo por dentro, y por qué NestJS se construye
// encima de esto.
//
// Enunciado:
//
// WARM-UP — Corrección y refuerzo (10-15 min):
// Solo lo más caliente del Día 11. Una línea cada uno, con tus palabras:
//
// 1) [Hallazgo Día 11] Guard clause que NO recordabas: abre
//    practice/0817/tasks/task1.ts y relee las líneas 88-98 (el constructor
//    de ItemPSO). Explica en una línea: ¿qué hace ese if y por qué SÍ tiene
//    sentido ahí? (Pista: ¿qué garantiza el TIPO y qué no garantiza?)
//
// 2) [Dificultad Día 11] La Promise entrega UNA sola vez: escribiste
//    resolve(titulo) DOS veces (dentro del setTimeout y suelto). ¿Qué pasa
//    con el segundo resolve? ¿Cuál gana y por qué?
//
// 3) [Dificultad Día 11] return-entrega vs return pelado: escribiste
//    `return;` al final de descargarCancion. ¿Qué devuelve eso? ¿Cómo se
//    ve el molde correcto? (Pista: el const caja = ...; return caja; de
//    searchUma, o el return directo. Casi lo repites en la Parte B con
//    el array de canciones — ¿qué devolviste al final?)
//
// PARTE A — Decoradores a mano (35 min):
//
// 1) Un decorador ES una función que recibe algo (una clase, un método, una
//    propiedad) y puede leerlo, modificarlo, o registrar metadatos sobre él.
//    Ancla: es una etiqueta que se pega ANTES de la cosa, y el que la lee
//    (NestJS, tu código) decide qué hacer con esa etiqueta. La carta del
//    Día 2 ya lo dice: "función especial con @ para añadirle metadatos".
//    Escribe un decorador de clase simple: una función que reciba
//    (target: Function), imprima "Clase registrada: " + target.name, y
//    devuelva target. Aplícalo con @miDecorador sobre una clase TouhouChar
//    (nombre, especie, poder) y crea una instancia. Corre con node.
//    Pregunta para comentario: ¿qué ES target en ese decorador?
//
//    PUNTO EXTRA (refuerzo de tu carta Anki — constructor): Tu clase
//    TouhouChar necesita un constructor que reciba (nombre, especie, poder)
//    y los asigne. En comentario, responde con tus palabras:
//    a) ¿Qué ES un constructor? (Pista: tu carta de hoy — el formulario
//       que se llena en el momento del new.)
//    b) En `this.nombre = nombre`: ¿qué es cada "nombre"? ¿Cuál es el
//       casillero del objeto y cuál es el dato que trajiste de afuera?
//    c) Crea DOS instancias con datos distintos (ej: Reimu y Marisa).
//       ¿El constructor corre cuántas veces? ¿Cada instancia tiene sus
//       propios valores o comparten los mismos?
//
// 2) Decorador de método: escribe un decorador que se aplique a un método
//    de la clase (recibe (target, propertyKey, descriptor)) y que imprima
//    "Método llamado: " + propertyKey CADA VEZ que se llame al método.
//    Pista: el descriptor tiene una propiedad `value` que ES la función
//    original — el truco es envolverla: reemplaza descriptor.value por una
//    función que imprima y luego llame a la original.
//    Prueba: llama el método 2 veces y mira los logs.
//    [Refuerzo Día 11 — try/catch en el que llama]: el envoltorio es el
//    que LLAMA al método original. Envuélvelo: si el método lanza, atrapa
//    el error y haz console.log del mensaje (recuerda: error llega como
//    unknown → instanceof Error antes de leerle .message). El método
//    original NO se toca — el que llama decide. Igual que ayer con
//    descargarCancion, pero ahora en un decorador.
//    Pregunta para comentario: ¿por qué el console.log de "Método llamado"
//    vive en el DECORADOR y no dentro del método? (Pista: Día 11 Parte B —
//    los logs no van en medio del flujo; el decorador es el que observa,
//    el método solo hace su trabajo.)
//
// PARTE B — Modules + tsconfig (35 min):
//
// 3) tsconfig.json: crea uno en la raíz del repo (ts-inventory-cli) con:
//    target: "ES2022", module: "ESNext", strict: true, outDir: "./dist",
//    rootDir: "./practice". Corre `npx tsc --noEmit` y mira qué pasa con
//    tus archivos de práctica (Pista: puede quejarse de archivos que ya no
//    usan imports o de la config misma — léelo como el linter leyendo tu
//    estado, no como error).
//    Pregunta para comentario: ¿qué ES cada campo? target vs module —
//    ¿cuál habla del idioma de salida y cuál del sistema de módulos?
//    [Refuerzo Día 11 — tipo vs runtime]: tsc te va a marcar errores en
//    archivos que con tsx/node corren IGUAL (lo viviste ayer con el 4).
//    a) ¿Por qué tsc marca lo que node ejecuta sin chistar?
//    b) ¿Qué ES strict: true y por qué es la diferencia entre "el editor
//       te avisa" y "el editor te ignora"? (Pista: ayer corriste un 4 que
//       VSCode marcaba en rojo — con strict, TS te lo grita más fuerte.)
//    c) ¿Cuándo SÍ necesitas un type guard de verdad? (Pista: la frontera
//       del sistema — uniones, JSON.parse, un body HTTP que llega como
//       any. ¿Tu función con firma tipada es la frontera?)
//
// 4) @Module de NestJS: lee el ejemplo del Overview de NestJS (el
//    CatsModule). En comentarios: ¿qué ES @Module()? ¿Qué agrupa?
//    (Pista: tu carta del Día 2 — controllers, providers, imports,
//    exports.) ¿En qué se parece a tu export del Día 6 y en qué es más?
//
// PARTE C — Explicaciones que caen en entrevista (25 min):
//
// 5) En comentarios, con tus palabras:
//    a) ¿Qué ES un decorador? (Pista: función especial + @ + metadatos.
//       ¿Existe en runtime o solo en compile time?)
//    b) ¿Qué ES target en un decorador de clase? ¿Y propertyKey en uno
//       de método?
//    c) ¿Qué ES tsconfig.json? (Pista: la central de configuración del
//       compilador — target, module, strict.)
//    d) ¿Qué ES strict: true? ¿Qué apaga? (Pista: el modo que te obliga
//       a tratar null/undefined en serio — lo que ya haces a mano.)
//    e) ¿Qué ES @Module()? ¿Por qué NestJS no funcionaría sin decoradores?
//
// 6) [Refuerzos del Día 11 que caen en entrevista — una línea cada uno]:
//    f) ¿Qué ES una función async? ¿Qué devuelve SIEMPRE? ¿Cuándo la
//       usas en vez de escribir new Promise a mano?
//    g) ¿Por qué `new Promise(...)` sin anotar dio Promise<unknown>?
//       ¿Qué aporta el <string>? (Pista: la caja no sabe qué hay dentro
//       hasta que se lo dices.)
//    h) ¿Qué ES la regla de oro? (Pista: practice/ es TU territorio — el
//       código que funciona no se reescribe por estética; la mejora se
//       anota, no se impone.)
//    i) ¿Por qué tu escalera de .then imprimió "undefined" dos veces y
//       con await no? (Pista: el puente return — la flecha con llaves
//       necesita ______ para entregar al siguiente eslabón.)
//    j) ¿Qué ES Promise.all? ¿Qué pasa si UNA de las promesas falla?
//       ¿Por qué tu descargarTodo tardó ~2s y tu setlist secuencial 6s?
//       (Pista: hoy lo peleaste 6 veces hasta ver que las 3 descargas
//       se disparan a la vez y el await espera a TODAS.)
//
// PUNTO EXTRA — Shallow copy vs deep copy (Santiago, 15-20 min):
//
// 7) Santiago te pidió estudiarlo — es clásico de entrevista. Cópialo,
//    correlo y observa:
//
//    const original = { nombre: "Sakuya", poderes: ["cuchillos", "tiempo"] };
//    const copia = original;            // ¿ESTO es una copia?
//    copia.poderes.push("maid");
//    console.log(original.poderes);     // ¿qué sale? ¿por qué?
//
//    Pista: `copia` no es una copia — es OTRO NOMBRE para el MISMO objeto.
//    Los dos apuntan al mismo lugar en memoria.
//
//    Ahora la versión con spread:
//
//    const copia2 = { ...original };    // shallow copy
//    copia2.poderes.push("killer maid");
//    console.log(original.poderes);     // ¿cambió? ¿por qué?
//
//    Pista: el spread copia el PRIMER nivel (las propiedades sueltas),
//    pero el array `poderes` adentro sigue siendo EL MISMO array.
//
//    Preguntas para comentario:
//    a) ¿Qué ES una shallow copy? ¿Qué copia y qué comparte?
//    b) ¿Cómo haces una deep copy (todo nuevo, cero compartido)?
//       (Pista: existe una función nativa que clona hasta el último
//       rincón — structuredClone.)
//    c) Tu carta de hoy: ¿qué bug de "cambié la copia y se cambió el
//       original" te ahorra saber esto?
//
// Reglas de siempre: === SIEMPRE. Sin valores quemados en funciones.
// Releer el enunciado completo antes de decir "listo".
//
// NOTA DE DISEÑO: el Día 12 es la costura hacia NestJS — decoradores y
// modules son el esqueleto de TODO lo que viene en Fase 2. El tsconfig
// cierra el tema de configuración que abriste con npm init en el Día 6.
//
// Total estimado: 105-130 min (incluye PUNTO EXTRA shallow/deep copy
// pedido por Santiago, Ago 20 — clásico de entrevista).
// Start Time: (22/08) XX:YY - XX:YY
// Total Time Spent: D12 XXX:YY
//
// WORKFLOW INCREMENTAL: al terminar cada parte (Warm-up/A/B/C), manda
// un mensaje corto a Reimu ("parte X lista, me trabé en Y, seguía").
// Ella actualiza el progress en tiempo real y ajusta esta task. No es
// un reporte formal entre partes — es un aviso de paso.
