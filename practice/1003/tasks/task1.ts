// ═══════════════════════════════════════════════════════════════
// TASK D29 — SÁBADO 3-OCT · "La API se explica sola" · CIERRA FASE 2
// ESTADO: CALIBRADA (pre-verificada vie 2 por Reimu en copia /tmp:
// tsc limpio, /docs 200, /docs-json 200 con 6 rutas, puerto limpio).
//
// Contexto: hoy cierras NESTJS CORE. El entregable de la Fase entera
// es order-api DOCUMENTADO y limpio en GitHub. Lo que hoy agregas no
// es código nuevo de lógica — es la capa que hace que OTROS (y tú en
// una entrevista) entiendan la API sin leerte el source.
//
// AVISO de versiones (ya mapeado, para que no pierdas tiempo): el
// @nestjs/swagger que instala `npm i @nestjs/swagger` pelado es el 12,
// que EXIGE Nest 12. Tu repo va en Nest 11 → ERESOLVE. El comando que
// sí resuelve: `npm i @nestjs/swagger@^11`. Si truenan peers, no es
// tu código — es la versión.
//
// ═══════════ WARM-UP (sin editor — responde en este archivo) ═══════════
//
// 1. C.3 de ayer quedó en cero y hoy se repara. Tu app.module.ts,
//    línea 19, dice `synchronize: true`. Explica CON TUS PALABRAS qué
//    hace TypeORM al arrancar con eso activo, y por qué está bien en
//    desarrollo y MAL en producción. (Pista de verificación, no de
//    respuesta: ¿quién creó la tabla `orders`? ¿Tú escribiste algún
//    CREATE TABLE?)
//           R.P.:
//
// 2. Tu spec quedó 10/10 ayer. Dos preguntas de lo que TÚ escribiste:
//    a) En tu test de findAll: `repo.find.mockResolvedValueOnce([])` y
//       luego `mockResolvedValueOnce([pedido1, pedido2])`. ¿Por qué
//       hacen falta DOS grabaciones para el MISMO método?
//    b) ¿Qué devuelve un `vi.fn()` sin ninguna grabación?
//           R.P.: a)
//                 b)
//
// 3. El test de remove (el de las 18:xx de ayer) usa
//    `mockImplementation` con un array `pedidos` de verdad adentro.
//    Tus otros 9 tests graban respuestas fijas. Nombra UNA diferencia
//    real entre "grabar respuestas fijas" y "implementar con estado"
//    — qué PUEDE hacer el segundo que el primero no.
//           R.P.:
//
// ═══════════ PARTE A — SWAGGER: la API se explica sola ═══════════
//
// Hoy NO te doy el código — te doy la especificación y la fuente.
// Fuente oficial: https://docs.nestjs.com/openapi/introduction
// (sección "Bootstrap": DocumentBuilder + SwaggerModule — están a
// media página, no un mar).
//
// Objetivo: colgar una página /docs que liste tus 6 rutas y permita
// ejecutar POST /orders desde el navegador.
//
// Pasos:
// 1. `npm i @nestjs/swagger@^11` (en order-api, con el server APAGADO).
// 2. En main.ts, DESPUÉS de tus tres globals (pipe, interceptor,
//    filter) y ANTES del listen: armar el DocumentBuilder con título
//    "order-api", descripción corta tuya, versión "1.0" y un tag
//    "orders". Crear el documento y colgarlo en "docs".
// 3. Arranca el server y abre http://localhost:PORT/docs en tu
//    navegador. Lo que ves ahí es el entregable de la Fase 2.
// 4. Prueba de fuego: ejecuta POST /orders desde la propia página
//    (Try it out) con un pedido a tu gusto. ¿Te funcionó sin curl?
//    ¿O te falló? Anótalo — la respuesta correcta está en tu ApiGuard.
//
// PREDICCIÓN (antes de correr): al abrir /docs verás tus rutas
// listadas. ¿Cuál va a faltar o fallar al intentar EJECUTARLO — o
// ninguna? (La clue está en el punto 4 y en el header que tu guard
// exige.)
//           R.P.:
//
// ═══════════ PARTE B — RELACIONES: un pedido con dueño ═══════════
//
// Hoy order-api tiene pedidos sueltos. Cliente es un string. Vamos a
// darle estructura: la entity Order gana una relación real.
//
// La SPEC (qué, no cómo):
// - Nueva entity `Cliente` (nombre completo, string). Su propia tabla.
// - Order pierde la columna `cliente: string` y gana la relación:
//   un pedido pertenece a UN cliente; un cliente tiene MUCHOS pedidos.
// - La migration la sigue haciendo synchronize (dev) — al arrancar,
//    verifica con la db viva que las DOS tablas existen y están
//    conectadas (¿cómo compruebo que la FK existe sin escribir SQL?
//    pista: crea un cliente y un pedido suyo, borra el cliente y
//    mira qué pasa con el pedido — anota lo que observes).
// - El POST /orders de hoy en día recibe `cliente: string`. Diseña TÚ
//    cómo queda el create ahora: qué recibe el DTO (¿un id? ¿un
//    nombre?) y qué hace el service. Dos líneas de decisión + tu
//    código. Defiéndela en C.
//
// Trampa de decisión: tu POST podría recibir el nombre del cliente y
// crearlo siempre nuevo, o recibir un id y exigir que exista. Una de
// esas dos produce una tabla de clientes llena de "Reimu Hakurei"
// repetidos 40 veces. ¿Cuál, y por qué? Elige y defiende.
//
// ═══════════ PARTE C — cierre conceptual ═══════════
//
// C.1 ¿Qué es Swagger para alguien que no lo conoce — y qué te ahorra
//     tener que escribir a mano? Dos líneas.
//      R:
// C.2 La trampa de la Parte B: ¿elegiste id o nombre en el POST?
//     Defiende tu decisión en 2-3 líneas (la contra-argumentación es
//     lo que se evalúa).
//      R:
// C.3 Tu spec de ayer (el 10/10): ¿qué le pasaría a tu suite si
//     mañana refactorizas OrdersService para que use la relación
//     (this.ordersRepository.findOne({ relations: ... })) y NO tocas
//     el spec? Razona en 2 líneas. (Pista: el spec mockea el repo —
//     ¿qué parte del repo mockeado dice que métodos existen?)
//      R:
// C.4 Fase 2 completa: escribe AQUÍ el párrafo de entrevista — "mi
//     API de pedidos usa NestJS con TypeORM sobre SQLite, documentada
//     con Swagger". ¿Qué problema real resuelve CADA pieza? Una línea
//     por pieza (Nest, TypeORM, SQLite, Swagger). Ese párrafo es el
//     que vas a decir en la entrevista de innovando.
//      R:
//
// ═══════════ CIERRE ═══════════
// - Commit: order-api (swagger + entity Cliente + relación + DTO
//   ajustado + spec si lo tocaste) → push. Task → ts-inventory-cli.
// - Anki 20-30 min SOLO deck TS (132 vencidas esperándote — 30
//   repasos/día ya configurado; NO las mates de un golpe).
// - La Fase 2 se cierra con push. Fase 3 (React) arranca DOM 4.
//
// NOTA de Reimu: el crash de "no conecta la db" de ayer ya está
// resuelto en ambas máquinas (binario better-sqlite3 compilado). Si
// te vuelve a pasar tras un npm install: `npm rebuild better-sqlite3`
// y verificar que node_modules/better-sqlite3/build/Release/
// better_sqlite3.node exista. No es tu código. Nunca lo fue.
