// TASK 0915 — Día 27: Testing — unit (Vitest) + E2E (supertest)
// ESTADO: creada Sep 14 noche con los hechos del repo verificados (spec de
// Santiago YA en Vitest y corriendo: "should be defined" pasa; supertest y
// @types/supertest instalados). PRE-VERIFICACIÓN COMPLETA (tests de referencia
// en copia /tmp) PENDIENTE — corre mañana antes de que la abras.
// CONTEXTO: ayer le diste vida al service (estado en memoria, ids 1,2,3...,
// 404 propios en update/remove). El spec que Santiago migró solo dice "should
// be defined" — hoy lo conviertes en el VERIFICADOR del contrato de ayer.
// Hoy NO tocas el service para "arreglar" tests: primero escribes los tests
// CONTRA EL CONTRATO, los corres, y dejas que te digan la verdad.
//
// Minas vigentes:
// - `npm test` corre JEST y tu spec es de Vitest — ese comando miente.
//   El que corre tus tests es: npx vitest run
// - Vitest escanea la carpeta .stversions/ (copias viejas de syncthing):
//   verás una suite fantasma FAIL ("Cannot find module './orders.service'").
//   NO es un test tuyo ni un bug — es basura de sincronización. Córrelo con
//   la ruta de tu archivo (npx vitest run src/orders/orders.service.spec.ts)
//   o agrega .stversions al exclude. Tú decides.
// - Puerto zombi: antes de arrancar el server para E2E, pkill -f "[d]ist/main"
//   y verifica `ss -ltnp | grep 3000` vacío.
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
// "Ayer me diste una API que responde. Hoy quiero que la MÁQUINA lo
// verifique, no tus manos con curl. Escribe tests que capturen el contrato
// que me prometiste ayer — cada línea de abajo es un comportamiento que tus
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
// contra tu service de ayer? ¿Por qué? (Pista honesta: ¿qué respondía tu
// findOne de ayer cuando el id no existía? Contrástalo con lo que este test
// exige. Un test que pasa sin esfuerzo a veces está verificando otra cosa.)
//          R.P.:
//
// PREDICCIÓN (primera corrida): cuando corras toda la suite por primera vez,
// ¿cuántos tests pasan y cuántos fallan? (Cuéntalos ANTES de correr.) Los
// que fallen te están señalando algo de tu contrato de ayer — léelos
// completos. Predice cuáles fallan y por qué.
//          R.P.:
//
// Regla del día: el service de ayer NO se toca hasta que los tests hayan
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

// ═══════════ CIERRE ═══════════
// - Commit del día: tests + (si los tests te obligan) el fix del service →
//   order-api (commit + push al cierre). La task → ts-inventory-cli.
// - Anki: retomas la tanda (la de ayer saltó por sueño + 3 cartas nuevas
//   D26 + la carta D19 de PATCH/PartialType liberada — examen después de la
//   clase, la clase fue ayer).
// - Mínimo del día: Parte A (suite corriendo con npx vitest run y el veredicto
//   de cada predicción) + Anki. B y C ruedan a la tarde si la cabeza da.
// - COMER A TIEMPO. AGUA.