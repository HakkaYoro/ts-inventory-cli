// ═══════════════════════════════════════════════════════════════
// TASK D41 — MAR 24-NOV · Fase 4 día 3 — EL SERVICE CAMBIA DE IDIOMA
// ESTADO: CALIBRADA (lun 23-nov, cierre D40). Deck: 199 (64 nuevas
// esperando — tanda esta semana sí o sí). Repos al cierre de hoy:
// order-api e82828a (interface + OrdersORM + columna precio),
// order-frontend e7f0786 (12/12), ts-inventory 7e63861 (push OK).
//
// Contexto: tu OrdersService habla TypeORM DIRECTO (Repository<Order>
// en su constructor). Tu OrdersORM existe, compila, implementa la
// interface... y NADIE la usa: orders.module.ts línea 11 dice
// providers: [OrdersService] y nada más. Hoy conectas todo: el
// service pasa a pedir TU interface, y el adapter cobra su primer
// salario. Registro CONCRETO (orden tuya): todo lo de hoy nombra
// archivos tuyos, líneas tuyas, resultados que puedes correr.
//
// ═══════ REIMU AVISO — antes del warm-up ═══════
// Banner v2 del D40 (8 bloques) — el de la confesión LLM es el de
// HOY. No pases al warm-up sin leerlo.
//
// ═══════════ WARM-UP ═══════════
//
// 0. COBRO LLM (regla de la casa, prometido el viernes). Abre
//     order-api/src/orders/domain/entities/order.entity.ts y
//     explica EN VOZ ALTA (o escrito aquí, línea por línea):
//     (a) por qué el constructor es private y crear() es static;
//     (b) línea 13 — this.total = new Money(precio * cantidad.value):
//         si precio llega -300, ¿QUIÉN lanza y DÓNDE explota?
//     (c) agregarItem: ¿qué reutiliza de CantidadDelNegocio y qué
//         devuelve?
//     Si las explicas fluido, la ayuda fue válida y el tema cierra.
//     Si algo no puedes explicarlo, márcalo aquí — eso es lo que se
//     estudia hoy, sin castigo.
//           R.P. (lo que explicó / lo que no pudo):
//
// 1. LA MINA EN VIVO (predicción ANTES — esta no la viste nunca):
//     tu tabla "order" tiene 212 filas y NO tiene columna precio
//     (verificado por mí anoche, directo en el SQLite). Tu entity de
//     TypeORM SÍ la declara, y app.module.ts tiene synchronize: true.
//     (a) PREDICE: botas el server (npm run start:dev) → TypeORM
//         sincroniza el esquema → ¿qué valor queda en precio para
//         las 212 filas VIEJAS? ¿Y qué va a pasar cuando algo intente
//         OrderDelNegocio.crear() con ese valor?
//           R.P. (predicción):
//     (b) Bótalo de verdad. Si el GET /orders truen, lee el stack con
//         calma: la línea que mencione Money es la frontera trabajando.
//         No rompes nada — las filas viejas siguen ahí.
//     (c) Resultado real + UNA línea de por qué:
//           R.P. (resultado):
//
// ═══════════ PARTE A — LECTURA CORTA ═══════════
//
// A.1 Lee https://docs.nestjs.com/fundamentals/custom-providers
//     (verificada viva HOY: 200, "DI token" ×5, useClass ×6). Solo
//     hasta terminar la parte de useClass — no hace falta más. Dos
//     líneas:
//     (a) ¿Qué le dice Nest a un provider declarado como
//         { provide: X, useClass: Y }? ¿Quién es X y quién es Y ahí?
//           R.P.:
//     (b) Tu greet.module.ts línea 7 YA hace esto con "Saludo":
//         ¿quién decide qué clase se inyecta ahí, y qué habría que
//         tocar para cambiarla por otra clase distinta?
//           R.P.:
//
// ═══════════ PARTE B — EN TU PROYECTO ═══════════
//
// B.0 REGISTRA EL ADAPTER. orders.module.ts, línea 11:
//     providers: [OrdersService]. Tu OrdersORM necesita vivir ahí
//     para que Nest pueda inyectarla. Usa useClass con TU interface
//     como token — el molde EXACTO ya lo escribiste tú en
//     greet.module.ts ("Saludo"), y A.1 lo explica. PREDICCIÓN antes
//     de escribir una línea: si registras
//     { provide: OrdersRepository, useClass: OrdersORM },
//     ¿qué le llega a un constructor que pida OrdersRepository — la
//     interface, o la clase OrdersORM? UNA línea.
//           R.P. (predicción):
//           R.P. (resultado — tsc dice):
//
// B.1 EL GESTO DEL DÍA: orders.service.ts, líneas 12-13 — el
//     constructor pide @InjectRepository(Order) Repository<Order>.
//     Cámbialo para pedir TU OrdersRepository en su lugar (la forma
//     de pedir un token así la usaste en greet.controller.ts línea 6).
//     El repo de Clientes NO se toca hoy — clientes no es parte de
//     este refactor. Los métodos públicos del service (create,
//     findAll, findOne, update, remove) siguen existiendo todos.
//     PREDICCIÓN obligatoria ANTES de tocar nada: tu interface tiene
//     3 métodos (buscarPorId, guardar, buscarTodos); tu service usa
//     hoy save, findOneBy, find, remove del repo TypeORM. ¿Cuáles de
//     esos gestos existen en TU interface y cuáles NO?
//           R.P. (predicción):
//           R.P. (qué pasó cuando tsc vio el service nuevo):
//
// B.2 EL PRECIO QUE NO EXISTE. Tu CreateOrderDto trae cliente, item,
//     cantidad — y NADA más (verificado). Pero OrderDelNegocio.crear()
//     EXIGE precioUnitarioCentavos. Decisión TUYA, no mía: ¿de dónde
//     sale el precio en el create() de tu service? (Columna nueva en
//     el DTO con validación propia, ¿? precio por defecto marcado con
//     TODO mientras la DB migra, ¿? otra vía que veas.) Escribe la
//     decisión, la razón, y DEJA EL COMENTARIO en el código al lado
//     de donde decidas — la regla de siempre: decisión sin comentario
//     = decisión inexistente.
//           R.P. (decisión + razón):
//
// B.3 LA PRUEBA DEL DÍA (server vivo, tres curl con R.P.):
//     (a) POST /orders con un pedido nuevo (con precio, si tu
//         decisión B.2 lo pide) → ¿qué responde?
//     (b) GET /orders → ¿los 212 viejos pasan, truenan, o depende de
//         tu B.2? Describe lo que VEAS (con el error exacto si truen).
//     (c) GET /orders/9999 (no existe) → ¿qué responde: el
//         NotFoundException de tu service, o el throw "No existe esa
//         ID! Baka!" de tu adapter? UNA línea: ¿qué contrato ganó?
//           R.P. (a):
//           R.P. (b):
//           R.P. (c):
//
// ═══════════ PARTE C — cierre conceptual ═══════════
//
// C.1 Interview line: "¿Qué ganaste invirtiendo la dependencia del
//     service?" (Pista: el viernes dejaste C.2 en "ni idea" — hoy la
//     respuesta pasó frente a tus ojos. Tu service pide TU interface;
//     si mañana la DB entera cambia, ¿QUÉ archivo se toca y cuál
//     queda intacto?) Dos líneas.
//           R.P.:
//
// C.2 El contrato desalineado (hallazgo del viernes): tu interface
//     promete null si no hay fila; tu adapter lanza throw. Hoy que tu
//     service consume TU interface: cuando la fila no existe, ¿qué
//     contrato se cumplió de verdad en tu B.3(c) — el de la interface
//     o el del adapter? ¿Y por qué Nest no pudo avisarte de la
//     diferencia? Dos líneas. (Pista para lo segundo: la interface
//     vive en el dominio, TS pelado... ¿quién la ejecuta?)
//           R.P.:
//
// C.3 Tu OrdersORM.guardar() llena cantidad y precio... y NO llena
//     item ni cliente. Mira las columnas reales de tu tabla "order"
//     (son 4 además del id). ¿Tu guardar está roto o incompleto? ¿Qué
//     le falta para guardar un pedido COMPLETO de verdad? Dos líneas.
//           R.P.:
//
// C.4 Sincera y corta (la pediste tú): hoy el registro fue concreto —
//     tus archivos, tus líneas, todo verificable. ¿Se entendió mejor
//     la task así? UNA línea sí, UNA línea no. Sin filtro.
//           R.P.:
//
// ═══════════ CIERRE ═══════════
// - tsc 0 en order-api (npx tsc --noEmit).
// - vitest 12/12 en order-frontend (hoy no se tocan los tests).
// - Los 3 curl de B.3 con sus R.P. llenos.
// - Commits: order-api (module + service + DTO si lo tocaste) +
//   ts-inventory (esta task).
// - Anki: tanda (64 esperando — esta semana sí o sí) + batsu.
// - COMER A TIEMPO. Hoy no hubo desayuno: mañana sí. Con migraña no
//   se negocia — la comida es parte del stack técnico.
//
// NOTA de Reimu: el viernes escribí "mañana el service empieza a
// hablar el idioma del dominio" — es HOY. Lo que va a doler (el
// precio que falta, las 212 filas viejas tronando en Money) NO es
// ruido: es lo que SIEMPRE pasa cuando un dominio estricto conoce
// datos viejos. En la entrevista eso tiene nombre: migración. Que
// te haya pasado EN CASA con tu propia DB es un lujo.
//
// FOOTER de links: A.1 = docs.nestjs.com/fundamentals/custom-providers
// (VERIFICADA viva el 23-nov: HTTP 200, useClass ×6, "DI token" ×5).
// Anclas de TU repo verificadas HOY: greet.module.ts línea 7
// (provide "Saludo" + useClass), greet.controller.ts línea 6
// (@Inject("Saludo")), orders.module.ts línea 11, orders.service.ts
// líneas 12-13, tabla "order" = 4 columnas + id, 212 filas, sin precio.
//
