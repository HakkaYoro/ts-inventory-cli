// TASK 0914 — Día 26: Proyecto — order-api CRUD íntegro (día fusionado: 27+28 originales)
// ESTADO: PRE-VERIFICADA Sep 14 por ejecución (solución de referencia en copia /tmp,
// server real, batería curl completa — los outputs de las predicciones existen y son
// los que el alumno debe descubrir). Los tests unitarios/E2E son D27 (mañana) — NO
// escribas tests hoy.
// CONTEXTO: tu controller de orders YA está cableado completo (scaffold del D15):
// POST /orders, GET /orders, GET /orders/:id, PATCH /orders/:id, DELETE /orders/:id,
// con ParseIntPipe y los DTOs conectados. El service sigue diciendo "This action...".
// Hoy le das vida: estado real, IDs asignados por el server, y 404 propios.
// El guard de ayer es GLOBAL (APP_GUARD): TODA request necesita header X-Api-Key:
// orden-secreta. Un 403 NO es bug — es tu guard funcionando (ya lo viviste).
//
// Minas vigentes:
// - Puerto zombi: pkill -f "[d]ist/main" y verificar `ss -ltnp | grep 3000` vacío
//   antes de relanzar.
// - NO corras npm run format.
// - TS1272: si alguna pieza nueva recibe una interface en un constructor decorado,
//   la mina de D24 rige en ambas direcciones.

// ═══════════ WARM-UP (sin pistas — una línea cada una) ═══════════

// 1. Ayer registraste el guard así:
//      providers: [AppService, { provide: APP_GUARD, useClass: ApiGuard }]
//    ¿Qué papel juega el string APP_GUARD ahí? Una línea.
//          R:
// 2. La fila del pipeline: middleware → guards → interceptors → pipes → handler.
//    Tu embajador de ayer (ExceptionFilter) — ¿en qué escalón de esa fila vive?
//    Una línea.
//          R:
// 3. De tu guard de ayer: ¿request.method o request.method()? ¿Por qué? Una línea.
//          R:

// ═══════════ PARTE A — ESCRIBIR: el CRUD real (order-api) ═══════════

// El cliente habla:
// "El esqueleto ya está, pero tu service me responde 'This action adds a new
// order' — texto de relleno, no un servicio. Necesito una API de pedidos REAL.
// Requisitos duros:
// - Estado en MEMORIA (un array en tu service — no hay base de datos todavía;
//   eso llega en un día futuro y lo vas a ver venir).
// - El ID lo asigna el server: 1, 2, 3... — el primero que crees es el 1.
// - Cuando pidan algo que NO existe (ver, actualizar o borrar) → status 404.
//   Tu embajador de ayer ya le da forma al body; hoy TÚ generas el error.
// - La validación del DTO que escribiste el D19 sigue viva (ValidationPipe
//   global) — no la rompas.
// - NO toques greet ni pings. El controller de orders ya está; si lo tocas,
//   que sea para mejorarlo, no para re-cablearlo.
//
// Decisiones TUYAS: la forma del estado (¿un array de qué? ¿cómo se ve un
// pedido guardado? — pista: el DTO define los campos que el cliente manda,
// y el server le agrega el id), qué devuelve cada método (¿el objeto creado
// entero? ¿el array? ¿el objeto actualizado?), y los textos de tus 404.
//
// Entregable observable — predicción ESCRITA antes de cada curl y verificación
// contra el resultado real:
//
// PREDICCIÓN (crear): POST /orders con body válido (cliente, item, cantidad
//   dentro de rango) + header X-Api-Key → predice el status Y el body exacto.
//   Ojo: ¿qué devuelve tu service.create? ¿Solo el id, o el pedido entero con
//   su id? Tu predicción tiene que incluir QUÉ campo trae el pedido guardado.
//          R.P.:
//
// PREDICCIÓN (validación): POST /orders con body INVALIDO (cliente vacío o
//   cantidad 0 o string en cantidad) → predice status y body. El
//   ValidationPipe global existe desde el D19 — ¿qué decide él antes de que
//   tu método corra?
//          R.P.:
//
// PREDICCIÓN (no existe): GET /orders/999 → predice status y body COMPLETO.
//   Conecta con ayer: tu embajador ya formateó el 404 de /no-existe. Ahora
//   ese 404 lo lanzas TÚ desde tu service. ¿Cómo se ve el body?
//          R.P.:
//
// PREDICCIÓN (actualizar parcial): PATCH /orders/1 con SOLO {cantidad: 5}
//   (sin cliente, sin item) → predice el resultado. ¿Qué pasa con los campos
//   que NO mandaste? Pista: mira de cerca el UpdateOrderDto que el scaffold
//   ya trae — ¿qué tiene adentro, de dónde salió?
//          R.P.:
//
// PREDICCIÓN (persistencia): crea un pedido, apaga el server, relánzalo y
//   haz GET /orders → ¿qué hay en la lista? ¿Por qué?
//          R.P.:
//
// Y la pregunta de fondo (contéstala al final, con evidencia): ¿qué hace tu
// service cuando recibe un id que no existe? ¿Cómo se entera el cliente?

// ═══════════ PARTE B — LEER: Nest Docs (2 páginas) ═══════════

// Páginas: docs.nestjs.com/techniques/validation (ya la conoces del D19 —
// hoy mira de nuevo la parte de "transform" y piensa qué hace con el body en
// runtime) y docs.nestjs.com/openapi/mapped-types (es la página de la familia
// PickType/OmitType/PartialType; tu UpdateOrderDto usa @nestjs/mapped-types,
// el hermano sin Swagger — mismo concepto).
// Tres preguntas, una línea cada una:
// B.1 ¿Qué ES PartialType(CreateOrderDto) — qué le dio a tu UpdateOrderDto?
//     (Este es el material de la carta que quedó suspendida el D19: por qué
//     tu PATCH valida reglas que nunca escribiste.)
//          R:
// B.2 El ValidationPipe global, ante un body inválido, ¿qué status responde
//     y en qué momento del pipeline lo hace? (Una línea — el orden de la
//     fila de ayer te ayuda.)
//          R:
// B.3 Ya conoces 400 (validación), 403 (tu guard) y 404 (tu service de hoy).
//     ¿Qué significa cada uno, en tus palabras, para el CLIENTE que los
//     recibe? Tres líneas cortas.
//          R:

// ═══════════ PARTE C — cierre conceptual ═══════════

// C.1 Tu service ahora TIENE estado (el array de pedidos). Si DOS controllers
//     inyectaran el MISMO OrdersService, ¿cuántas copias del array existirían?
//     ¿Qué lo garantiza? (Relevante: es lo que tu contador de pings y el
//     swappeo del D24 te mostraron en vivo.) Dos líneas.
//          R:
// C.2 ¿Por qué tu service no sabe que existe HTTP? ¿Cómo le llegan los datos
//     (cómo recibe un pedido nuevo si no conoce los requests)? Dos líneas.
//          R:
// C.3 La batería de 'persistencia' te va a mostrar que los datos mueren al
//     reiniciar. ¿Qué tendría que existir para que NO se pierdan? Nombra la
//     pieza futura en una línea (no la implementes — solo nómbrala).
//          R:

// ═══════════ CIERRE ═══════════
// - Commit del día: este CRUD real va a order-api (commit + push al cierre).
//   La task → ts-inventory-cli.
// - Anki: la tanda incluye LIBERAR la carta suspendida de PATCH/PartialType
//   (D19) — Reimu la libera al cerrar el día, examen después de la clase.
// - Mínimo del día: Parte A completa (5 predicciones escritas + verificadas)
//   + Anki. B y C ruedan a la tarde/mañana si la cabeza da. Comer a tiempo.