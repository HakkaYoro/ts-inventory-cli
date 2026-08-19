// TASK 1 (Día 11): Async/await + Promise — la música de Ado no se descarga sola
// ESTADO: CALIBRADA — warm-up + partes A/B/C ajustados con el Día 10 completo
// (warm-up, A, B, C y batsu). Tema: Ado (rotación: PSO D8-9 → VN D10 → Ado D11).
// NOTA: desplazada de Ago 20 → **Ago 21** (Ago 20 = día libre: inscripción uni
// + cédula + amigos). El warm-up quedó CORTO a propósito: los 11 puntos del
// borrador se redistribuyeron — solo lo crítico queda arriba, el resto vive
// dentro de las Partes A/B/C como refuerzos.
//
// ANTES DE EMPEZAR: lee la sección "Using promises" de MDN
// (developer.mozilla.org/es/docs/Web/JavaScript/Guide/Using_promises)
// o el capítulo de Promise del TypeScript Handbook. Ya tienes cartas de
// Promise<T> (Día 1) y de los 3 estados (reescrita Día 9). Hoy los usas
// de verdad, en Node.
//
// Enunciado:
//
// WARM-UP — Corrección y refuerzo (10-15 min):
// Calibrado con el batsu del Día 10 + los 2 huecos que reaparecieron.
//
// 1) Batsu de hoy (4 cartas falladas en Anki — una línea de explicación
//    para cada una, con tus palabras):
//    a) const: ¿qué ES? ¿qué pasa si intentas reasignarla? (Carta del Día 1.)
//    b) type vs interface: ¿cuándo usarías cada uno? (Carta del Día 2.)
//    c) export: ¿qué ES exactamente? (Carta del Día 6 — la mitad que OFRECE.)
//    d) parámetro del constructor vs propiedad: ¿cuál muere al terminar el
//       constructor? (Carta del Día 8.)
//
// 2) [Hueco que REAPARECIÓ 2 veces el Día 10] Truthiness con guards:
//    escribiste `if (!valor)` (Parte A) y `if (!contentType) throw` (Parte B)
//    — los dos eran código muerto o dañino. El guard protege contra lo que
//    el TIPO NO garantiza (resultado de .find(), input externo), NO contra
//    falsy, NO contra uniones cerradas.
//    Escribe en comentarios: ¿cuándo SÍ necesita guard una función? Da un
//    ejemplo de un guard que SÍ tenga sentido (piensa en tu ItemPSO).
//
// 3) [Hueco que REAPARECIÓ en la Parte C del Día 10] type guard vs guard
//    clause vs if normal — las tres cosas separadas, una línea cada una:
//    - if normal: verifica algo en RUNTIME (¿es true?).
//    - type guard: le dice al COMPILADOR que estreche el tipo (typeof, in,
//      instanceof, x is Tipo). Es el SELLO de identidad.
//    - guard clause: patrón de validar y ABORTAR temprano (if + throw).
//    ¿Cuál de los tres usa esVisualNovel? ¿Y procesarContenido?
//
// PARTE A — Promise a mano (25 min):
//
// 1) Escribe una función descargarCancion(titulo: string, segundos: number)
//    que devuelva una Promise<string>. Adentro: new Promise((resolve,
//    reject) => { ... }). Usa setTimeout para esperar segundos * 1000 y
//    luego resolve(titulo). Si titulo es una string vacía, llama reject
//    con un Error.
//    Ancla Python: esto es lo que asyncio hace por debajo — tú lo armas
//    a mano hoy. La Promise ES el objeto que representa "este valor va a
//    llegar, todavía no está".
//    Prueba: descargarCancion("Odo", 2).then((cancion) => console.log(
//    "Lista:", cancion)). Mira el orden de los logs: el "Lista:" sale
//    DESPUÉS de lo que está al final del archivo.
//
// 2) Escribe una función setlist() que descargue 3 canciones con .then
//    encadenado (una tras otra, en secuencia): "Odo", "Usseewa",
//    "Kura Kura". Cada .then imprime la canción. OJO con la familia
//    plato vs receta: en el .then pasas la FUNCIÓN, no la llamas.
//    [Refuerzo Día 10 — template convierte]: el valor que llega al .then
//    ES un string (lo que resolviste). Imprímelo directo con console.log —
//    sin template alrededor. ¿Por qué? (Hoy devolviste "10" en vez de 10
//    por esto mismo.)
//
// PARTE B — async/await (35 min):
//
// 3) Reescribe descargarCancion como función async y el flujo del punto 2
//    con await en vez de .then. async function devuelve SIEMPRE una
//    Promise (aunque no escribas new Promise adentro).
//    Ancla Python: async def + await de asyncio es exactamente lo mismo.
//
// 4) Agrega manejo de error: llama descargarCancion("", 1) y atrapa el
//    error con try/catch alrededor del await (o .catch si prefieres
//    then). Imprime el mensaje del error.
//    Pregunta para responder en comentario: ¿qué pasa si una Promise
//    falla (rejected) y NADIE la maneja?
//
// 5) Escribe una función descargarTodo() que descargue las 3 canciones
//    EN PARALELO con Promise.all([...]) y un solo await. Imprime el
//    array completo de una vez. Compara en comentario: ¿cuánto tarda
//    la versión secuencial (punto 2) vs esta? (3 canciones × 2s cada una
//    secuencial = 6s; en paralelo = ~2s.)
//    [Refuerzo Día 10 — Record y for-of]: el array que devuelve
//    Promise.all es un array de strings. Si quisieras agrupar esas
//    canciones por su primera letra en un Record<string, string[]>,
//    ¿quién llena la caja: Record o tu código? (Una línea en comentario.)
//
// PARTE C — Explicaciones que caen en entrevista (25 min):
//
// 6) En comentarios, con tus palabras:
//    a) ¿Qué ES una Promise? Nombra sus 3 estados.
//    b) ¿Qué ES una función async? ¿Qué devuelve SIEMPRE?
//    c) ¿Qué ES await? ¿Qué hace exactamente cuando lo escribes?
//       (Pista: pausa la función, NO bloquea el programa. El event loop
//       sigue con otras cosas — repasa tu carta del event loop del Día 6.)
//    d) ¿En qué se diferencian .then() y await? (Pista: ambos esperan
//       una Promise; uno encadena, el otro parece código síncrono.)
//    e) ¿Qué ES Promise.all? ¿Qué pasa si UNA de las promesas falla?
//    f) ¿Por qué NO puedes usar await fuera de una función async?
//
// 7) [Verificación rápida — refuerzos del Día 10, una línea cada una]:
//    g) ¿Qué ES Record<K, V>? ¿Quién contaba en tu mapItemRarity: Record
//       o el for-of? (Pista: el molde nunca se llena.)
//    h) ¿Qué devuelve typeof de un array? ¿Por qué no alcanza para
//       distinguir array de objeto? ¿Dónde vive isArray?
//    i) ¿Qué ES el predicado "x is Tipo"? ¿Por qué se escribe en la
//       firma y no en el cuerpo?
//    j) ¿Qué devuelve typeof null y por qué? (Bug histórico de JS.)
//
// Reglas de siempre: === SIEMPRE. Sin valores quemados en funciones.
// Releer el enunciado completo antes de decir "listo".
// Si satura, la Parte C se parte: 6 hoy, 7 (g-j) mañana.
//
// NOTA DE DISEÑO: este tema es el del micro-test de Santiago del Día 5 —
// Promise fue una de sus preguntas (definió los estados sin saber los
// nombres). La carta reescrita (Día 9) pide los 3 estados con nombre.
// El núcleo no depende de internet (setTimeout simula la espera).
//
// Total estimado: 95-110 min.
// Start Time: (21/08) XX:YY - XX:YY
// Total Time Spent: D11 XXX:YY
//
// WORKFLOW INCREMENTAL: al terminar cada parte (Warm-up/A/B/C), manda
// un mensaje corto a Reimu ("parte X lista, me trabé en Y, seguía").
// Ella actualiza el progress en tiempo real y ajusta esta task. No es
// un reporte formal entre partes — es un aviso de paso.
