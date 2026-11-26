// ═══════════════════════════════════════════════════════════════
// TASK D42 — VIE 27-NOV · Fase 4 día 4 — EL SPEC VUELVE A VERDE (SUAVE)
// ESTADO: CALIBRADA. La pediste suave: hoy te toca la mitad de japonés
// (el resto sáb 28). Repos al cierre del jue 26: order-api 1f6c0ec
// (service + interface + adapter + DTO + entity, push OK).
//
// Contexto: ayer el service dejó de hablar con TypeORM y pasó a pedir
// TU interface. El código compila (tsc 0) y el server arranca. Lo que
// quedó atrás fue el spec: 8 tests rojos + 2 en todo. Hoy lo devuelves
// a verde. Es la task más corta de la fase: un solo archivo,
// src/orders/orders.service.spec.ts. El dominio y el adapter no se tocan.
// Pasos cortos, uno por ronda, con la salida pegada después de cada uno.
//
// ═══════════ WARM-UP (2 puntos) ═══════════
//
// 0. COBRO LLM. Ayer escribiste: "casi todo lo hice con LLMs [...] lo
//     logré, no sé cómo". Hoy sí. Abre order-api/src/orders/
//     orders.service.ts y responde con TUS palabras, archivo abierto,
//     sin mirar el chat de ayer:
//     (a) create, líneas 35 a 42. Ahí nace un solo objeto, `order`, a
//         partir de OrderDelNegocio.crear(...). ¿Por qué guardar()
//         recibe ese y no una entity hecha con new Order()?
//           R.P.:
//     (b) create dice Promise<void>. ¿Qué significa eso y por qué no
//         puede devolver el pedido guardado?
//           R.P.:
//     (c) La C.1 de ayer quedó en "order.entity y ya". Si mañana la DB
//         entera cambia (de SQLite a Postgres, por ejemplo), ¿qué
//         archivos TUYOS se tocan y cuáles quedan sin tocar?
//           R.P.:
//
// 1. EL SPEC HOY. Sin tocar nada, corre:
//       npx vitest run src/orders/orders.service.spec.ts
//     (a) PREDICE antes de correr: ¿cuántos tests pasan?
//           R.P. (predicción):
//     (b) Corre. Copia la línea del error que empieza por "Nest can't
//         resolve". ¿Qué argumento no encuentra?
//           R.P. (resultado):
//     (c) Mira orders.module.ts línea 14, y orders.service.spec.ts
//         líneas 21 a 29. ¿Qué le ofrece el module al service que el
//         Test Module NO le ofrece? UNA línea.
//           R.P.:
//
// ═══════════ PARTE A — LECTURA CORTA ═══════════
//
// A.1 https://docs.nestjs.com/fundamentals/custom-providers — ayer
//     leíste hasta useClass. Hoy solo la parte de useValue.
//     (a) En { provide: X, useValue: Y }: ¿qué es Y, una clase que Nest
//         instancia o un objeto que ya existe? UNA línea.
//           R.P.:
//     (b) https://docs.nestjs.com/fundamentals/testing — baja hasta
//         "Unit testing" y lee solo el primer ejemplo. ¿Qué ponen en
//         provide y qué en useValue?
//           R.P.:
//
// ═══════════ PARTE B — TU SPEC (un solo archivo) ═══════════
//
// B.0 EL TOKEN. orders.service.spec.ts, línea 24: el Test Module ofrece
//     getRepositoryToken(Order). El service ya no pide eso. Cambia SOLO
//     esa línea por:
//       { provide: "OrdersRepository", useValue: repo },
//     (el string EXACTO de tu @Inject). PREDICCIÓN antes de correr:
//     ¿cuántos tests pasan ahora? Corre y mira también el error nuevo.
//           R.P. (predicción):
//           R.P. (resultado — cuántos pasan + primera línea del error):
//
// B.1 EL MOCK CAMBIA DE IDIOMA. El objeto `repo` (líneas 14 a 20) tiene
//     find, findOneBy, save, create, remove: el idioma de TypeORM. Haz
//     DOS objetos, cada uno con su token:
//     - `ordersRepo`: los 4 métodos de TU interface (buscarPorId,
//       guardar, buscarTodos, eliminar), vi.fn() cada uno. Entra con el
//       string "OrdersRepository".
//     - `clientesRepo`: findOneBy y save. Entra con
//       getRepositoryToken(Clientes).
//     PREDICCIÓN: ¿cuántos pasan? Corre. Los tests viejos todavía usan
//     `repo.`: lee el error nuevo.
//           R.P. (predicción):
//           R.P. (resultado):
//
// B.2 LOS TESTS, UNO POR RONDA. Cada test queda en dos o tres líneas.
//     Molde:
//       ordersRepo.buscarTodos.mockResolvedValueOnce([]);
//     Reescribe en este orden y corre después de cada uno:
//     (a) findAll: buscarTodos devuelve [] → findAll() devuelve 0.
//     (b) findOne existente: buscarPorId devuelve
//         OrderDelNegocio.crear(6, 250) → findOne(1) devuelve ese objeto.
//     (c) findOne inexistente: buscarPorId devuelve null → findOne(67)
//         lanza NotFoundException.
//     (d) remove: buscarPorId devuelve un pedido → remove(1) resuelve el
//         mensaje, y eliminar fue llamada con 1.
//     (e) remove inexistente: buscarPorId devuelve null → lanza, y
//         eliminar NO fue llamada.
//     (f) update: update(1, { cantidad: 5 }) lanza
//         NotImplementedException (vive en @nestjs/common, al lado de
//         NotFoundException).
//     (g) create: reemplaza el segundo it.todo. clientesRepo.findOneBy
//         devuelve un cliente → tras create(...), guardar fue llamada
//         1 vez, con un objeto cuyo precioUnitarioCentavos es 250 y cuyo
//         cantidad.value es 6.
//           R.P. (cuáles te salieron a la primera y cuáles no):
//
// B.3 LA SALIDA. Corre npx vitest run (todo el proyecto). Pega la línea
//     "Tests ...". Después: wc -l src/orders/orders.service.spec.ts.
//           R.P.:
//
// ═══════════ PARTE C — cierre conceptual ═══════════
//
// C.1 Interview line: "¿Qué ganaste invirtiendo la dependencia del
//     service?" Respóndela con TU evidencia de hoy: el mock viejo (5
//     funciones con nombres de TypeORM, getRepositoryToken, arrays que
//     mutabas a mano) contra el nuevo (4 funciones tuyas, objeto plano).
//     Dos líneas.
//           R.P.:
//
// C.2 El camino que el adapter real nunca recorre. Tu test (c) pasa
//     porque el fake devuelve null. Pero tu OrdersORM.buscarPorId real
//     lanza un throw (typeorm-orders.repository.ts línea 17). ¿Qué
//     prueba ese test y qué NO prueba? Dos líneas.
//           R.P.:
//
// C.3 Ayer tu B.3(b) quedó corto. GET /orders responde 212 pedidos así:
//     {cantidad: {value: 2}, precioUnitarioCentavos: null, total: {value: 0}}
//     Tu DB dice "no sé cuánto pagaron" y tu API dice "total 0". ¿En qué
//     línea se pierde el "no sé"? (Pista: adapter línea 18, y qué da
//     null * 2 en JavaScript.) Dos líneas.
//           R.P.:
//
// C.4 Veredicto: ¿hoy fue suave de verdad? UNA línea, sí o no, y qué
//     sobró o qué faltó.
//           R.P.:
//
// ═══════════ CIERRE ═══════════
// - vitest: 8 verdes. Queda 1 it.todo ("id 1, id 2"): no tiene sentido
//   mientras create devuelva void. Déjalo.
// - tsc 0 en order-api (npx tsc --noEmit).
// - Commit: order-api (solo el spec) + esta task.
// - Anki: tanda + batsu.
// - japonés: la mitad que te dejaste para hoy. Si prefieres japonés
//   primero, hazlo así: la task espera.
//
// NOTA de Reimu: de las pocas veces que un refactor te regala algo.
// Los tests de hoy salen más cortos que los del D27 porque el service
// ya no sabe que TypeORM existe. Por eso se invierte. El D43 vuelve a
// lo grande: el agregado aprende a tener item, cliente e id, guardar
// guarda completo y se decide el contrato null-o-throw.
//
// FOOTER de links: A.1 = docs.nestjs.com/fundamentals/custom-providers
// y docs.nestjs.com/fundamentals/testing (VERIFICADAS vivas el 26-nov:
// HTTP 200; useValue ×8; "Unit testing" ×2).
// Anclas de TU repo verificadas el 26-nov: orders.service.ts líneas 20
// (Promise<void>), 35-42 (crear + guardar), 45-55 (findAll/findOne),
// 57-60 (update 501), 62-66 (remove); orders.module.ts línea 14 (token
// string); spec líneas 14-20 (repo viejo) y 21-29 (Test Module); vitest
// al cierre del 26 = 8 fallidos + 2 todo; smoke del spec nuevo dentro
// de tu repo: 8/8 verdes, tsc 0, archivos temporales borrados.
