// TASK 0908 — Día 25: Guards + Interceptors + Exception filters (día fusionado)
// ESTADO: PRE-VERIFICADA Sep 7 por ejecución (server real en copia /tmp, tsc exit 0):
// 403 confirmado para sin-header y header-malo (SIN filtro el body por defecto es
// JSON de 3 keys; CON filtro sale la forma statusCode/message/timestamp — ambos
// hechos observados, el alumno los predice); el formato uniforme del embajador
// cubre 403 Y 404 (NotFoundException ES HttpException — verificado con curl real);
// interceptor loggea método+ruta+ms reales; regresión /pings intacta. La pregunta
// del orden tiene respuesta verificada con evidencia de log — NO está en este
// archivo: se descubre en el experimento. Minas heredadas del 0906 vigentes:
// puerto zombi, TS1272 en ctors decorados, NO npm run format.
// ANTES del warm-up: 2 minutos con las 8 correcciones REIMU del 0906
// (header de ese archivo). El warm-up de hoy te las examina directamente.

// ════ CORRECCIONES REIMU — Sep 13 (D25) — LEER MAÑANA ANTES DEL ANKI ════
// W1/W2 (warm-up respondido en la uni): hablaste de las CLASES y de "provee la
//   interfaz" — el string es el TOKEN de registro (un nombre de ficha, no un
//   validador). Detalle abajo, bajo cada R.
// R.P. pieza 2 (bitácora): ACIERTO — te corregiste solo dentro de la respuesta.
//   El guard corre ANTES que el interceptor; el rechazado muere en la llave.
// R.P. pieza 3 (embajador): mecanismo correcto (se lo manda al USUARIO, no a la
//   consola); falta la permuta exacta del body: error → timestamp.
// B.1: ❌ el embajador NO está en la fila del pipeline — vive en el camino del
//   ERROR, no en el feliz.
// B.2: sustancia correcta ("403 autogenerado"); forma de entrevista abajo.
// B.3: ✅ mejor lectura del día (y sin docs).
// C.1: mitad correcta (guard para condiciones/seguridad); el middleware sin
//   responder — regla de pulgar abajo.
// C.2: ✅ correcto; matiz: el interceptor también corre ANTES del handler.
// C.3: ❌ no responde — los providers no protegen rutas; el binding local es
//   por decorador @UseGuards (ver abajo).

// ═══════════ WARM-UP (sin pistas — una línea cada una) ═══════════

// 1. El string de tu @Inject('Saludo') y el del provide del module
//    difieren en UN solo carácter. ¿Qué pasa y en qué momento exacto?
//          R: Uno se llama GreeterService y el otro GreeterService2. Son dos clases inyectables que se pasan al módulo, y varían dependiendo de la clase que se necesite.
// ── REIMU (corrección): Contestaste las CLASES, no los STRINGS. El enunciado
//    habla de dos strings — el de @Inject('Saludo') y el del provide — que
//    difieren en UN carácter. Son el TOKEN de registro: un NOMBRE de ficha, no
//    una clase. Si el del inject y el del provide no coinciden al carácter,
//    Nest no encuentra la ficha y truena al ARRANCAR (UnknownDependenciesException)
//    — el cableado se valida al levantar el server, no al recibir la primera
//    request. (Tú ya diagnosticaste esa familia ayer: "el controller está
//    hardcodeado" → el token del inject no conectaba con el provide.)
// 2. Ayer escribiste el patrón con tus manos. ¿Qué ES entonces el string
//    'Saludo' — qué papel jueza ahí? Una línea.
//          R: Provee la interfaz, se asegura que el output sea un string.
// ── REIMU (corrección): 'Saludo' no provee ni valida nada — es un NOMBRE de
//    registro (la etiqueta de la ficha en el contenedor). Lo que define la
//    FORMA es la interface Saludo (el contrato); lo que construye la
//    implementación es la clase GreeterService. El string solo dice "a qué
//    ficha me refiero". Un carácter distinto = otra ficha = nadie la registró.

// ═══════════ PARTE A — ESCRIBIR: el cliente protege la API (order-api) ═══════════

// El cliente habla:
// "Mi API quedó pública y necesito tres piezas nuevas. Requisito duro que
// ya conoces: NINGÚN controller se toca — ni greet, ni pings, ni orders.
// Todo se registra en global, y eso ya lo hiciste una vez con un pipe
// (tu main.ts del 1 de septiembre).
//
// 1. LA LLAVE (guard): TODA request debe llegar con el header
//    X-Api-Key y el valor exacto 'orden-secreta'. Sin header o con valor
//    malo → rechazo con status 403 Forbidden. El cliente fija el OUTPUT
//    del rechazo: status 403, y el body lo produce Nest por defecto
//    (obsérvalo — es material de la pieza 3).
//    PREDICCIÓN (la llave): curl /greet SIN header → predice status Y
//    body, tal como lo produce Nest AHORA (sin embajador). Luego curl
//    con header malo → predice el status. Luego curl con header
//    correcto → predice status y body.
//    R.P.: [OMITIDA — el guard se ejecutó antes de este formato]
// 2. LA BITÁCORA (interceptor): cada request que PASE la llave deja UNA
//    línea en la consola del server: método HTTP, ruta, y cuántos ms
//    duró atenderla. El cliente NO especifica si los rechazados dejan
//    línea — eso es tuyo: PREDICE primero, luego comprueba con el log.
//    Esa respuesta te dice quién corre primero, la llave o la bitácora.
//    PREDICCIÓN (la bitácora): ¿qué línea exacta esperas en la consola
//    para el curl con header correcto? Y para el rechazado (SIN header):
//    ¿sale línea o no? Esa segunda respuesta, con el log delante, es la
//    evidencia del orden.
//    R.P.: Rechazado no debería salir. Porque no le estoy pidiendo eso. Le estoy pidiendo los que pasen, y debería salir algo cómo "Hey! Alguien está por acá! Hizo un GET en la ruta /pings! Tardé 0ms!"... Verificado! Ah... Lo detiene el Guard, por eso no lo ve el interceptor.
// ── REIMU (corrección): ACIERTO — y la corrección te la diste solo, dentro de
//    la misma respuesta ("Lo detiene el Guard"). Ese es el modelo correcto,
//    verificado por tu propio log: el guard corre ANTES que el interceptor; la
//    request rechazada muere en la llave y la bitácora jamás se entera. La
//    primera parte de tu predicción ("no le estoy pidiendo eso") era el modelo
//    equivocado: el interceptor NO elige a quién loguea — está registrado para
//    TODA request; solo que las rechazadas nunca llegan. La batería de cierre
//    lo confirmó: 403 sin línea, 200 con línea.
// 3. EL EMBAJADOR DE ERRORES (exception filter): cuando la respuesta sea
//    un error HttpException, el body sale SIEMPRE como JSON con forma
//    exacta: statusCode, message, timestamp. Mismo formato para el 403
//    de la llave que para un 404 de ruta inexistente. Fijado por el
//    cliente, byte por byte: esas tres keys.
//    PREDICCIÓN (el embajador): el MISMO curl SIN header, pero AHORA con
//    el filtro registrado → predice el body. ¿En qué cambia respecto al
//    que observaste en la pieza 1?
//    R.P.: Que va a loggear el error de lo que rechace el Guard. Pero va a ser legible, así cómo un interceptor... AH, no lo loggea, se lo manda AL USUARIO. Okay.
// ── REIMU (corrección): La autocorrección final es la correcta: el filter no
//    loggea a la consola — FORMATEA la respuesta de error que ve el CLIENTE.
//    (La que loggea es tu bitácora; el que formatea es el embajador. Consola
//    vs HTTP: dos mundos.) Verificado en la batería: el 403 SIN filter sale
//    {statusCode, message, error}; CON tu filter sale {statusCode, message,
//    timestamp} — la key error se permuta por timestamp. ESA era la
//    predicción fina que faltaba.
//
// Entregable observable al cierre (cada uno con su predicción escrita
// arriba, junto a su pieza):
// - curl /greet SIN header → 403 (status y body ANTES y DESPUÉS del
//   embajador).
// - curl /greet con header correcto → 200 + tu saludo 2.
// - curl /greet con header malo → 403.
// - La línea de bitácora visible en consola para el curl que pasó.
// - La pregunta del orden contestada con la EVIDENCIA del log.

// Decisiones TUYAS: nombres de archivos/carpetas/clases, el texto exacto
// de la línea de bitácora (método+ruta+ms es el contrato mínimo), cómo
// midas los milisegundos.

// Minas anunciadas:
// - Puerto zombi tras matar el server: pkill -f "[d]ist/main" y verificar
//   ss -ltnp | grep 3000 vacío antes de relanzar (nota del 0906 aplica).
// - Si alguna de tus piezas nuevas recibe un tipo interface en el
//   constructor decorado: la mina TS1272 de AYER rige igual — en ambas
//   direcciones que ya viviste.
// - NO corras npm run format.

// ═══════════ PARTE B — LEER: docs oficiales NestJS (3 páginas) ═══════════

// Docs oficiales (nestjs.com): guards, interceptors, exception-filters.
// Tres preguntas, una línea cada una:
// B.1 El pipeline de una request: middleware → guards → interceptors →
//     pipes → handler. Enumera ese orden y di dónde vive CADA pieza que
//     escribiste hoy (la llave, la bitácora, el embajador).
//          R: No sé que quieres decir con enumerar. Pero obviamente Guards en Guards, Interceptors en Interceptsor y el ExceptionFilter en Handler. Asumo que en handler porque cómo el nombre indica es un manejador.
// ── REIMU (corrección): "Enumerar" era simplemente copiar el orden dado y
//    nombrarlo. Y la lista es el CAMINO FELIZ: middleware → guards →
//    interceptors → pipes → handler. La llave ✓ en guards, la bitácora ✓ en
//    interceptors — PERO el embajador NO está en esa fila: no vive en el
//    camino feliz. El filter se activa cuando ALGÚN escalón lanzó una
//    excepción — es el camino del ERROR, después de que algo truena. Y
//    "handler" tampoco es "el que maneja la llave": handler ES el método de
//    tu controller (el que responde la ruta). Tu embajador no es handler —
//    es la red que atrapa cuando el camino feliz se rompe. Pista para
//    mañana: ¿en qué momentos exactos se encendió el embajador en tu
//    batería? (Cuando el guard devolvió false y cuando la ruta no existía.)
// B.2 canActivate puede devolver boolean, Promise o Observable. ¿Qué
//     significa exactamente devolver false? Una línea. (Sin ver docs)
//          R: Devuelves un boolean. Un 403 autogenerado por Nest.
// ── REIMU (corrección): La sustancia es correcta — devolver false → Nest
//    responde 403 automáticamente. La primera mitad era ruido: "devuelves un
//    boolean" no contesta nada (la pregunta era QUÉ significa). Frase de
//    entrevista: "false = no pasar; Nest traduce eso solo en un 403
//    Forbidden, sin que yo escriba la respuesta."
// B.3 @Catch() vacío vs @Catch(HttpException): ¿qué atrapa cada uno?
//     Una línea.
//          R: Vacío = Todo. HttpException se limita solo a Http. (Sin ver docs.)
// ── REIMU (corrección): CORRECTO y sin docs — la mejor lectura del día.
//    @Catch() vacío = cualquier excepción; @Catch(HttpException) = solo esa
//    familia. Tu filter eligió la versión acotada: el contrato solo pide
//    formatear errores HTTP, y así queda.

// ═══════════ PARTE C — cierre conceptual ═══════════

// C.1 (entrevista) ¿Cuándo usarías un guard y cuándo middleware? Tu C.4
//     del 20 de septiembre (el policía del :id que atropellaba todas las
//     rutas) es la pista. Dos líneas.
//          R: No sé que es middleware aún, solo tengo entendido que es un bloat lol. Ahora en serio, el guard no es mala idea si necesito asegurarme que ciertas condiciones se cumplan para poder proceder, así le metes una capa de seguridad extra, como cuando solicitas tokens o similar.
// ── REIMU (corrección): El "no sé qué es middleware" se registra sin
//    penalizar (honesto — B.2/B.3 probaron que lees). La mitad que
//    respondiste es correcta: guard para condiciones/seguridad (tokens).
//    Lo que faltó: el middleware también corre antes que TODO (incluso que
//    los guards) pero SIN saber nada del contexto de Nest — no tiene
//    ExecutionContext, no ve headers de forma limpia ni la ruta puntual.
//    Por eso tu "policía del :id" del D20, hecho middleware, atropellaba a
//    TODAS las rutas: no puede apuntar solo a /orders/:id. El guard sí
//    puede: recibe el contexto y decide por request. Regla de pulgar:
//    middleware = cosas genéricas para toda la app (logs, CORS); guard =
//    permiso puntual de una request.
// C.2 ¿Qué transformación puede hacer un interceptor que un pipe NO?
//     Pista: piensa QUÉ toca cada uno — los parámetros que entran, o
//     todo lo que rodea al handler. Dos líneas.
//          R: El pipe solo intercepta datos (parametros que entran). Mientras que el interceptor maneja todo lo que pasa por el handler, o mejor dicho, todo lo que resulta del handler. Porque si el guard lo atrapa, el interceptor ni se entera.
// ── REIMU (corrección): CORRECTO — el pipe toca los parámetros que ENTRAN
//    (y los transforma); el interceptor rodea TODO el handler por AMBOS
//    lados: puede tocar lo que entra, lo que sale, medir tiempo, reescribir
//    la respuesta. Y tu cierre ("si el guard lo atrapa, el interceptor ni
//    se entera") es exactamente el experimento de hoy, con tu log de
//    evidencia. Único matiz: el interceptor no solo ve "lo que resulta" —
//    también corre ANTES del handler. "Rodeo completo" es la frase exacta.
// C.3 Ayer escribiste greeter; hoy la llave es global. ¿Cómo le pondrías
//     llave SOLO a /greet y no a /pings? Nombra DOS caminos y el
//     trade-off de cada uno en una línea.
//          R: Lo meto en el provider del módulo.
// ── REIMU (corrección): No responde la pregunta. "Provider del módulo" no
//    protege rutas — los providers son servicios (fichas del contenedor),
//    no llaves de puertas. Tu llave de hoy corre GLOBAL (APP_GUARD) porque
//    así la registraste; para proteger SOLO /greet hay dos caminos, y ambos
//    usan el DECORADOR @UseGuards (búscalo en la página de guards, sección
//    "binding guards"): (1) sobre la CLASE del controller de greet → protege
//    todas sus rutas; (2) sobre el MÉTODO de una ruta → protege solo esa.
//    Trade-off: clase = un solo decorador pero protege de más; método =
//    grano fino pero hay que ponerlo ruta por ruta. (Lo de "provider del
//    módulo" estaría cerca si dijeras "registro el guard como provider del
//    módulo de greet" — pero el binding local sigue siendo por decorador,
//    no por providers.)

// ═══════════ CIERRE ═══════════
// - Commits de hoy: el código real de la Parte A → order-api (Reimu
//   pushea al cierre si lo delegas). Esta task → ts-inventory-cli.
// - Anki: la tanda de hoy incluye la reescritura de singleton y la
//   actualización de quién-construye (hechas anoche con TU evidencia del
//   greeter). Cartas nuevas de Guards nacen mañana noche, después de la
//   clase — examen después de la clase, no antes.
// - Mínimo del día: Parte A completa + predicciones + Anki. La B y la C
//   ruedan a la tarde si la cabeza da. Comer a tiempo.