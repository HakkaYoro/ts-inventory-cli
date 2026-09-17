// TASK 0915 — Día 27: Testing — unit (Vitest) + E2E (supertest)
// ESTADO: CALIBRADA + PRE-VERIFICADA Sep 17 (copia /tmp, vitest 5 real):
// suite de referencia del contrato = 10/10 contra el service actual del repo.
// Las minas de abajo fueron re-verificadas UNA POR UNA el jue 17 — la del
// fantasma era FALSA en la versión del lunes y hay 2 minas nuevas.
// CONTEXTO: el lunes le diste vida al service (estado en memoria, ids 1,2,3...,
// 404 propios en update/remove). El spec que Santiago migró solo dice "should
// be defined" — hoy lo conviertes en el VERIFICADOR del contrato de ayer.
// Hoy NO tocas el service para "arreglar" tests: primero escribes los tests
// CONTRA EL CONTRATO, los corres, y dejas que te digan la verdad.
//
// Minas vigentes (re-verificadas con vitest 5 real, Sep 17):
// - `npm test` corre JEST y tu spec es de Vitest — ese comando miente.
//   El que corre tus tests es: npx vitest run
// - LA SUITE FANTASMA: .stversions/ (basura de syncthing) guarda un spec con
//   el MISMO NOMBRE que el tuyo → PASARLE LA RUTA NO LO EVITA (vitest filtra
//   por nombre de archivo y el nombre coincide). El combo verificado:
//   npx vitest run --exclude "**/.stversions/**" src/orders/orders.service.spec.ts
//   Borrar la carpeta .stversions/ también la mata (es copia vieja de
//   syncthing) — tú decides.
// - LOS SPECS DE CONTROLLERS (orders.controller.spec.ts y app.controller.spec.ts,
//   los del scaffold) FALLAN bajo vitest con "cannot resolve dependencies" al
//   construir el módulo. NO es tu bug: vitest no emite la metadata de
//   decoradores que Nest usa para inyectar en CONSTRUCTORES. Tu spec del
//   SERVICE no la necesita (tu OrdersService no recibe nada en el ctor).
//   E2E bajo vitest se resuelve con config de build (swc/unplugin) — otro
//   día, no hoy. La pregunta C.4 es justo esta.
// - Si escribes un E2E llamado orders.e2e-spec.ts, vitest NI LO VE ("No test
//   files found"): su filtro exige .spec. o .test. tras un PUNTO. La
//   convención .e2e-spec era de jest. Con vitest: test/orders.spec.ts.
// - Puerto zombi: pkill -f "[d]ist/main" y verifica `ss -ltnp | grep 3000`.
// - NO corras npm run format.

// ═══════════ WARM-UP (sin pistas — una línea cada una) ═══════════

// 1. Ayer tu findOne devuelve `Order | undefined` cuando el id no existe.
//    ¿Qué responde el cliente por HTTP en ese caso? (Relee el contrato de la
//    task 0914: "Ver uno — No existe → 404". ¿Tu service lo cumple?)
//          R:
// 2. Dos status que ayer mezclaste en UNA respuesta: ¿qué responde el
//    ValidationPipe global ante un body inválido, y qué responde el guard
//    ante un header faltante? Dos números, el orden de la fila te ayuda.
//          R:
// 3. `npm test` corre jest. Tu spec es de Vitest. ¿Qué comando corre TUS
//    tests? (Una línea — la mina del header te la da casi gratis.)
//          R:

// ═══════════ PARTE A — ESCRIBIR: tests unitarios de OrdersService ═══════════

// El cliente habla:
// "El lunes me diste una API que responde. Hoy quiero que la MÁQUINA lo
// verifique, no tus manos con curl. Escribe tests que capturen el contrato
// que me prometiste el lunes — cada línea de abajo es un comportamiento que tus
// tests tienen que demostrar. El spec que ya existe (orders.service.spec.ts)
// es tuyo: complétalo o reescríbelo, tú decides."
//
// Contrato a demostrar, test por test (describe/it en Vitest):
// - create: el PRIMER pedido creado tiene id 1; el segundo tiene id 2.
// - create: devuelve el pedido creado CON sus campos (cliente, item,
//   cantidad) y el id asignado por el server.
// - findAll: devuelve exactamente los pedidos creados (0 al inicio, 2 tras
//   crear 2).
// - findOne: con un id existente → devuelve ese pedido.
// - findOne: con un id que NO existe → el contrato de ayer dice 404.
//   En el service eso se ve como: lanza una excepción. ¿Cuál?
// - update: cambia SOLO el campo enviado (cantidad) y conserva los otros
//   (cliente, item intactos). Ese es el PATCH parcial que ayer descubriste.
// - update: id inexistente → lanza (misma familia del 404).
// - remove: el pedido deja de estar en findAll después de borrarlo.
// - remove: id inexistente → lanza.
//
// PREDICCIÓN (tu test contra tu código — la importante del día):
// Escribe PRIMERO el test de "findOne con id inexistente" exigiendo lo que
// el CONTRATO manda (que lance). Antes de correrlo, predice: ¿PASA o FALLA
// contra tu service del lunes? ¿Por qué? (Pista honesta: ¿qué devolvía tu
// findOne del lunes cuando el id no existía? Contrástalo con lo que este test
// exige. Un test que pasa sin esfuerzo a veces está verificando otra cosa.)
//          R.P.:
//
// PREDICCIÓN (primera corrida): cuando corras toda la suite por primera vez,
// ¿cuántos tests pasan y cuántos fallan? (Cuéntalos ANTES de correr.) Los
// que fallen te están señalando algo de tu contrato de ayer — léelos
// completos. Predice cuáles fallan y por qué.
//          R.P.:
//
// Regla del día: el service del lunes NO se toca hasta que los tests hayan
// hablado. Si un test falla porque el service no cumple el contrato, el FIX
// vas a tener que decidirlo tú — y ahí está la lección. Cero tests falsos
// ("que pasan sin verificar nada"): cada test tiene que poder fallar si el
// comportamiento se rompe.

// ═══════════ PARTE B — LEER: Nest Docs (1 página, 2 secciones) ═══════════

// Página: docs.nestjs.com/fundamentals/testing
// Lee "Unit Testing" y "End-to-end testing" (la parte de supertest).
// Tres preguntas, una línea cada una:
// B.1 ¿Qué hace Test.createTestingModule() — para qué sirve el objeto que
//     devuelve y qué hace .compile()? (Es el molde de tu spec y del E2E.)
//          R:
// B.2 ¿Qué es module.get<OrdersService>(OrdersService) en tu spec? ¿De dónde
//     sale la instancia que te da? (Conexión con el gerente del D16.)
//          R:
// B.3 Tu main.ts registra globales con app.useGlobalPipes/Interceptors/Filters
//     (ValidationPipe, LogInterceptor, ExceptionFilter). Si en un E2E creas
//     la app con createTestingModule+createNestApplication, ¿esos globales
//     aplican? ¿Cuál global SÍ aplica y por qué? (Mira dónde vive el guard:
//     app.module providers con APP_GUARD — contraste con main.ts.)
//          R:

// ═══════════ PARTE C — cierre conceptual ═══════════

// C.1 Unit test vs E2E: ¿qué verifica cada uno, con tus archivos como
//     ejemplo (orders.service.spec.ts vs un E2E que le pega a la API)?
//     Dos líneas.
//          R:
// C.2 Tu service es singleton con estado (el array). Si un test crea un
//     pedido y el siguiente test hace findAll, ¿qué ve? ¿Qué tendrías que
//     hacer para que cada test arranque LIMPIO? Dos líneas.
//          R:
// C.3 En el header hay una mina: vitest escanea .stversions/ y falla una
//     suite fantasma. ¿Qué es esa carpeta y por qué NO es un test tuyo?
//     (Una línea — pista: syncthing.)
//          R:
// C.4 La mina de los controllers: tu OrdersService no recibe NADA en su ctor;
//     OrdersController recibe ordersService. Bajo vitest tu spec del service
//     PASA y los specs de controllers mueren en "cannot resolve dependencies".
//     ¿Qué lee Nest de los constructores para saber QUÉ inyectar — y por qué
//     al service no le hace falta? (Dos líneas. Familia TS1272: lo que
//     evapora en runtime no lo puede leer nadie.)
//          R:

// ═══════════ CIERRE ═══════════
// - Commit del día: tests + (si los tests te obligan) el fix del service →
//   order-api (commit + push al cierre). La task → ts-inventory-cli.
// - Anki: retomas la tanda (la del lunes saltó por sueño + 3 cartas nuevas
//   D26 + la carta D19 de PATCH/PartialType liberada — examen después de la
//   clase, la clase fue ayer).
// - Mínimo del día: Parte A (suite corriendo con el combo del header y el veredicto
//   de cada predicción) + Anki. B y C ruedan a la tarde si la cabeza da.
// - COMER A TIEMPO. AGUA.