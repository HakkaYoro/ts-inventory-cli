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

// ═══ REIMU (corrección) — Sep 14 (cierre D26). LEER HOY (jue 17) ANTES DEL ANKI: 15 bloques. ═══
// La que más importa: tu GET /orders/999 responde 200 VACÍO, no 404 — findOne no lanza.
// El test de HOY (D27) te lo escupe; léelo completo cuando falle. La joya del día:
// descubriste PartialType SOLO. (Esta corrección debió llegar el lunes — la sesión
// se truncó a mitad del cierre; nada de esto es culpa tuya.) ═══

// ═══════════ WARM-UP (sin pistas — una línea cada una) ═══════════

// 1. Ayer registraste el guard así:
//      providers: [AppService, { provide: APP_GUARD, useClass: ApiGuard }]
//    ¿Qué papel juega el string APP_GUARD ahí? Una línea.
//          R: Si no me equivoco, se usa APP_GUARD para indicarle a nest que la clase ApiGuard es un Guard y debe ser tratado cómo tal.
//          ── REIMU (corrección, Sep 14): Casi. APP_GUARD es un TOKEN — un NOMBRE de registro, no un marcador sobre la clase.
//          Ese string nombra el slot del guard global; useClass dice qué clase entra ahí.
//          Tu clase se marca como inyectable con @Injectable; nadie le "dice" que es un guard.
//          (La lección del D25 sigue viva: token = nombre de registro.)
// 2. La fila del pipeline: middleware → guards → interceptors → pipes → handler.
//    Tu embajador de ayer (ExceptionFilter) — ¿en qué escalón de esa fila vive?
//    Una línea.
//          R: Vive en todos, solo se dispara cuando ocurre un error/excepción en alguno de los escalones. Ayer específicamente en Guard.
//          ── REIMU (corrección, Sep 14): Correcto — y es la mejor señal de que la lección B.1 del D25 quedó:
//          el embajador NO es un escalón de la fila, es la RED que atrapa cuando
//          cualquier escalón lanza.
// 3. De tu guard de ayer: ¿request.method o request.method()? ¿Por qué? Una línea.
//          R: request.method, ya que SOLO estoy leyendo el valor. En cambio si pongo () es porque estoy ejecutando una función.
//          ── REIMU (corrección, Sep 14): Correcto. method es DATO (se lee), method() es ACCIÓN (se ejecuta).
//          Familia paréntesis=llamada: cerrada.

// ═══════════ PARTE A — ESCRIBIR: el CRUD real (order-api) ═══════════
// Solicitud, repasar en un futuro esto. No creo que vaya a recordar ni la mitad de las cosas que hice acá.
// El cliente habla:
// "El esqueleto ya está, pero tu service me responde 'This action adds a new
// order' — texto de relleno, no un servicio. Necesito una API de pedidos REAL.
// Así la pruebo yo cuando la tengas (cada línea es UNA petición; el header
// X-Api-Key es tu guard de ayer — sin él, TODO responde 403):
//
//   curl -X POST localhost:3000/orders -H "X-Api-Key: orden-secreta" \
//        -H "Content-Type: application/json" \
//        -d '{"cliente":"Marisa","item":"Escoba Mágica","cantidad":1}'
//   curl localhost:3000/orders -H "X-Api-Key: orden-secreta"
//   curl localhost:3000/orders/1 -H "X-Api-Key: orden-secreta"
//   curl -X PATCH localhost:3000/orders/1 -H "X-Api-Key: orden-secreta" \
//        -H "Content-Type: application/json" -d '{"cantidad":5}'
//   curl -X DELETE localhost:3000/orders/1 -H "X-Api-Key: orden-secreta"
//
// Contrato, operación por operación:
//
// 1) CREAR — POST /orders (body: cliente, item, cantidad) Gabriel: Me ayudé un poco investigando usando LLMs para el entity y el cómo debería ser creado el create.
//    - La validación que escribiste el D19 sigue viva: body inválido
//      (cliente vacío, cantidad 0 o texto...) muere con 400 ANTES de que
//      tu método corra. No la rompas.
//    - El id NO viene en el body: lo asigna el server. El primer pedido
//      creado es el 1, el siguiente el 2, y así.
//    - Respuesta: 201 Created, con el pedido creado ENTERO, id incluido.
//
// 2) LISTAR — GET /orders Gabriel: Sin ayuda.
//    - Respuesta: 200, con la lista completa de pedidos (todos los que
//      existen hoy). ¿Qué devuelves cuando la lista está vacía? Piensa
//      qué es un array vacío como respuesta.
//
// 3) VER UNO — GET /orders/:id Gabriel: Usado LLM para el "| undefined"
//    - Existe → 200 con ese pedido. No existe → 404.
//    - El 404 lo lanzas TÚ: no es ruta inexistente, el id llegó bien — el
//      pedido es el que no está.
//
// 4) ACTUALIZAR — PATCH /orders/:id (body: SOLO los campos a cambiar) Gabriel: Me ayudé con LLMs. Así cómo en la de Create.
//    - Cambia únicamente los campos enviados; los que no mandes se quedan
//      como están (PATCH es parcial, no reemplaza todo).
//    - Existe → 200 con el pedido ya actualizado. No existe → 404.
//
// 5) BORRAR — DELETE /orders/:id Gabriel: Lo mismo. Investigué porque era mejor colocar -1 en vez de !, es porque el index comienza desde 0, indiferentemente del ID, entonces es para evitar errores.
//    - Existe → lo quita de la lista y responde 200 con el pedido borrado
//      (así se ve QUÉ se fue). No existe → 404.
//
// El formato de los cuerpos de error (400 y 404) es el de tu embajador de
// ayer: {statusCode, message, timestamp} — hoy TÚ generas el error, él le da
// la forma. Y las reglas que no se tocan: greet y pings se quedan igual, y el
// controller de orders ya está cableado (si lo tocas, que sea para
// mejorarlo, no para re-cablearlo).
//
// Decisiones TUYAS (el diseño de adentro es tuyo; el contrato de afuera ya
// quedó fijado arriba):
// - Cómo se ve un pedido GUARDADO: el DTO define los campos que el cliente
//   manda (cliente, item, cantidad) y el server le agrega el id. ¿Cómo
//   nombras ese campo — id? ¿orderId? Lo que elijas es lo que se ve en el
//   body del 201.
// - Dónde vive el estado: un array en tu service (no hay base de datos
//   todavía — eso llega en un día futuro y lo vas a ver venir).
// - Los textos de tus mensajes de 404 (el mensaje viaja en el body del
//   embajador, lo lee el cliente).
//
// Entregable observable — predicción ESCRITA antes de cada curl y verificación
// contra el resultado real:
//
// PREDICCIÓN (crear): POST /orders con body válido (cliente, item, cantidad
//   dentro de rango) + header X-Api-Key → predice el status Y el body exacto.
//   El contrato dice que responde EL PEDIDO CREADO CON SU ID — predice las
//   keys del body y sus valores (el nombre del id y el orden de las keys
//   salen de cómo diseñaste tu estado — eso es tuyo).
//          R.P.: 201, esa es la respuesta. El orden es id (Generado por orden numérico), cliente, item, cantidad. Esa es mi predicción.
//          ── REIMU (corrección, Sep 14): ACIERTO — la batería real lo confirmó byte a byte: 201 con
//          {"id":...,"cliente":"Marisa","item":"Escoba","cantidad":1}.
//          Predijiste la forma exacta, incluido el orden de las keys y el id primero.
//
// PREDICCIÓN (validación): POST /orders con body INVALIDO (cliente vacío o
//   cantidad 0 o string en cantidad) → predice status y body. El
//   ValidationPipe global existe desde el D19 — ¿qué decide él antes de que
//   tu método corra?
//          R.P.: 400, le tirará un error del DTO me imagino por Invalid Request. El pipe intercepta los datos que se le envían a dtavés del controller y los valida, si están malos los rechaza con un 403.
//          ── REIMU (corrección, Sep 14): Te contradijiste en la misma línea: dijiste 400 y cerraste con "los rechaza con un 403".
//          Son DOS puertas: el 400 es el ValidationPipe (body inválido = datos malos);
//          el 403 es el GUARD (header faltante = sin llave). El pipe NUNCA responde 403.
//          Batería real: POST con body inválido → 400 "Bad Request Exception".
//          El 403 solo aparece sin X-Api-Key.
//
// PREDICCIÓN (no existe): GET /orders/999 → predice status y body COMPLETO.
//   Conecta con ayer: tu embajador ya formateó el 404 de /no-existe. Ahora
//   ese 404 lo lanzas TÚ desde tu service. ¿Cómo se ve el body?
//          R.P.: 404 y dice "No existe el item con ID 999... Baka!"... No tengo forma de comprobarlo.
//          ── REIMU (corrección, Sep 14): LA CORRECCIÓN DEL DÍA. Dos cosas:
//          (1) El entregable de hoy ERA predicción ESCRITA + verificación contra el
//          resultado real. "No tengo forma de comprobarlo" = perdiste la mitad del contrato.
//          (2) Y es peor: lo que tu código hace de verdad NO es lo que predijiste.
//          Batería real: GET /orders/999 → 200 con body VACÍO, no 404.
//          Tu findOne devuelve undefined (no lanza), y Nest serializa undefined como 200.
//          El "Baka!" vive en update y remove, no en findOne.
//          La predicción no es "lo que el contrato pide" — es "lo que TU código hace",
//          y se comprueba con curl. HOY (D27) el test te lo escupe en la cara.
//
// PREDICCIÓN (actualizar parcial): PATCH /orders/1 con SOLO {cantidad: 5}
//   (sin cliente, sin item) → predice el resultado. ¿Qué pasa con los campos
//   que NO mandaste? Pista: mira de cerca el UpdateOrderDto que el scaffold
//   ya trae — ¿qué tiene adentro, de dónde salió?
//          R.P.: Ya trae un partial. Originalmente intenté crear un type nuevo dentro de la clase, al ver que me escupía un ojo, revisé el método update, y vi que tenía un DTO, y dentro de él un paquete que maneja ya de por sí los partialsXD. Todos los campos son opcionales, así que muta solo el que se le pase/pida.
//          ── REIMU (corrección, Sep 14): LA JOYA DEL DÍA. Descubrimiento 100% tuyo: leíste el UpdateOrderDto, encontraste
//          PartialType y entendiste por qué "muta solo lo que se le pase".
//          Batería real confirmó: PATCH {cantidad:5} conservó cliente e item intactos.
//          Esto ES el oficio. (Es el material de la carta suspendida del D19 — ya
//          liberada, la clase pasó: examen en tu próxima tanda.)
//
// PREDICCIÓN (persistencia): crea un pedido, apaga el server, relánzalo y
//   haz GET /orders → ¿qué hay en la lista? ¿Por qué?
//          R.P.: Está vacía, porque todo está en memoria. No se está almacenando en una db o en un json o similar.
//          ── REIMU (corrección, Sep 14): Correcto. Batería real: tras reiniciar el server dos veces, GET /orders → [].
//          En memoria = vive mientras el proceso vive. Nada más.
//
// Y la pregunta de fondo (contéstala al final, con evidencia): ¿qué hace tu
// service cuando recibe un id que no existe? ¿Cómo se entera el cliente?
//          R: Con el error que se crea automáticamente en el body, ejemplo "No existe el item con ID 123... Baka!"
//          ── REIMU (corrección, Sep 14): Ojo con "el error se crea automáticamente": NO se crea solo.
//          TÚ lo lanzas con throw new NotFoundException(...), y el embajador de ayer
//          le da forma al body. Prueba de que no es automático: en findOne NO lo lanzaste
//          y el cliente recibió 200 vacío sin enterarse de nada.
//          El "Baka!" que citas existe en update/remove, no en findOne.
//          El cliente se entera SOLO si tú lanzas.
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
//          R: Los valida siguiendo las reglas del Pipe/DTO anteriormente creadas. Le dijo "Todos son opcionales. Pero sea cual sea que uses, tienes que seguir lo siguiente."
//          ── REIMU (corrección, Sep 14): Correcto y conectado: PartialType(CreateOrderDto) toma TODAS las reglas del DTO
//          original y las vuelve opcionales — pero las que uses exigen lo mismo.
//          "Valida reglas que nunca escribiste" resuelto. La carta del D19 ya está
//          liberada, examen en tu próxima tanda.
// B.2 El ValidationPipe global, ante un body inválido, ¿qué status responde
//     y en qué momento del pipeline lo hace? (Una línea — el orden de la
//     fila de ayer te ayuda.)
//          R: 400, en el pipe... No... En el interceptor porque está interceptando primero, luego el pipe es el que escupe el error.
//          ── REIMU (corrección, Sep 14): Te autocorregiste HACIA el error: primero "en el pipe" (correcto) y luego
//          "en el interceptor" (mal). La fila: middleware → guards → interceptors →
//          pipes → handler. El 400 lo escupe el PIPE (ValidationPipe), que corre después
//          de guards y del interceptor-pre, antes del handler.
//          Tu interceptor (el que loggea "Hey! Alguien está por acá!") envuelve la llamada,
//          no valida nada. Pipe valida datos; interceptor observa.
// B.3 Ya conoces 400 (validación), 403 (tu guard) y 404 (tu service de hoy).
//     ¿Qué significa cada uno, en tus palabras, para el CLIENTE que los
//     recibe? Tres líneas cortas.
//          R: 400 es no request no válido. 403 es que entendió que le pasaste pero prohibe el paso. 404 es No encontrado.
//          ── REIMU (corrección, Sep 14): Correcto. (403 = te conoce pero no te deja entrar; 400 = tu request está mal;
//          404 = lo que pediste no existe.) Línea de entrevista lista.

// ═══════════ PARTE C — cierre conceptual ═══════════

// C.1 Tu service ahora TIENE estado (el array de pedidos). Si DOS controllers
//     inyectaran el MISMO OrdersService, ¿cuántas copias del array existirían?
//     ¿Qué lo garantiza? (Relevante: es lo que tu contador de pings y el
//     swappeo del D24 te mostraron en vivo.) Dos líneas.
//          R: Ninguna, sería la misma copia, porque ambos usan la misma clase/array. Lo garantiza el singleton (creo).
//          ── REIMU (corrección, Sep 14): Correcto — y el "(creo)" lo puedes cambiar por "sé": tu pings cuenta porque
//          el contador persiste entre requests (UNA instancia), igual que el swap del D24.
//          El contenedor DI hace UN new y se lo presta a todos los que lo piden.
// C.2 ¿Por qué tu service no sabe que existe HTTP? ¿Cómo le llegan los datos
//     (cómo recibe un pedido nuevo si no conoce los requests)? Dos líneas.
//          R: Porque hay tres formas en las que le puede llegar una solicitud (3 contextos que no recuerdo/conozco), le llegarían cómo datos planos, y estaría cómo ??? Qué hago con esto?
//          ── REIMU (corrección, Sep 14): Te enredaste y no respondiste. El service NO sabe que existe HTTP porque nunca ve
//          un request: recibe llamadas de método con argumentos normales (un CreateOrderDto,
//          un number). Quien traduce HTTP → llamada es el CONTROLLER:
//          this.ordersService.create(createOrderDto).
//          Lo de "3 contextos" es ruido (Nest se adapta a HTTP/microservicios/websockets
//          — el service ni se entera). Frase de entrevista: "el service recibe parámetros
//          tipados; el controller traduce requests en llamadas".
// C.3 La batería de 'persistencia' te va a mostrar que los datos mueren al
//     reiniciar. ¿Qué tendría que existir para que NO se pierdan? Nombra la
//     pieza futura en una línea (no la implementes — solo nómbrala).
//          R: Un writeFile a un JSON. Sería lo más sencillo pero no ideal.
//          ── REIMU (corrección, Sep 14): Mitad. writeFile a JSON SÍ es persistir (tu mini-proyecto de Fase 1 lo hizo) y
//          "no ideal" es el instinto correcto. Pero la pieza futura planificada es una
//          base de datos real: TypeORM + SQLite (próxima parada tras hoy). El JSON era
//          la bodega de 80 items; esto es una tienda.

// ═══════════ CIERRE ═══════════
// - Commit del día: este CRUD real va a order-api (commit + push al cierre).
//   La task → ts-inventory-cli.
// - Anki: la tanda incluye LIBERAR la carta suspendida de PATCH/PartialType
//   (D19) — Reimu la libera al cerrar el día, examen después de la clase.
// - Mínimo del día: Parte A completa (5 predicciones escritas + verificadas)
//   + Anki. B y C ruedan a la tarde/mañana si la cabeza da. Comer a tiempo.
