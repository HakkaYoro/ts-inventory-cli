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

// ═══════════ WARM-UP (sin pistas — una línea cada una) ═══════════

// 1. El string de tu @Inject('Saludo') y el del provide del module
//    difieren en UN solo carácter. ¿Qué pasa y en qué momento exacto?
//          R:
// 2. Ayer escribiste el patrón con tus manos. ¿Qué ES entonces el string
//    'Saludo' — qué papel jueza ahí? Una línea.
//          R:

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
// 2. LA BITÁCORA (interceptor): cada request que PASE la llave deja UNA
//    línea en la consola del server: método HTTP, ruta, y cuántos ms
//    duró atenderla. El cliente NO especifica si los rechazados dejan
//    línea — eso es tuyo: PREDICE primero, luego comprueba con el log.
//    Esa respuesta te dice quién corre primero, la llave o la bitácora.
// 3. EL EMBAJADOR DE ERRORES (exception filter): cuando la respuesta sea
//    un error HttpException, el body sale SIEMPRE como JSON con forma
//    exacta: statusCode, message, timestamp. Mismo formato para el 403
//    de la llave que para un 404 de ruta inexistente. Fijado por el
//    cliente, byte por byte: esas tres keys.

// Entregable observable (predicción ESCRITA antes de cada curl):
// - curl /greet SIN header → status y body (predice AMBOS, antes y
//   después de conectar el embajador).
// - curl /greet con header correcto → 200 + tu saludo 2.
// - curl /greet con header malo → 403.
// - La línea de bitácora visible en consola para el curl que pasó.
// - La pregunta del orden contestada con EVIDENCIA del log, no de memoria.

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
//          R:
// B.2 canActivate puede devolver boolean, Promise o Observable. ¿Qué
//     significa exactamente devolver false? Una línea.
//          R:
// B.3 @Catch() vacío vs @Catch(HttpException): ¿qué atrapa cada uno?
//     Una línea.
//          R:

// ═══════════ PARTE C — cierre conceptual ═══════════

// C.1 (entrevista) ¿Cuándo usarías un guard y cuándo middleware? Tu C.4
//     del 20 de septiembre (el policía del :id que atropellaba todas las
//     rutas) es la pista. Dos líneas.
//          R:
// C.2 ¿Qué transformación puede hacer un interceptor que un pipe NO?
//     Pista: piensa QUÉ toca cada uno — los parámetros que entran, o
//     todo lo que rodea al handler. Dos líneas.
//          R:
// C.3 Ayer escribiste greeter; hoy la llave es global. ¿Cómo le pondrías
//     llave SOLO a /greet y no a /pings? Nombra DOS caminos y el
//     trade-off de cada uno en una línea.
//          R:

// ═══════════ CIERRE ═══════════
// - Commits de hoy: el código real de la Parte A → order-api (Reimu
//   pushea al cierre si lo delegas). Esta task → ts-inventory-cli.
// - Anki: la tanda de hoy incluye la reescritura de singleton y la
//   actualización de quién-construye (hechas anoche con TU evidencia del
//   greeter). Cartas nuevas de Guards nacen mañana noche, después de la
//   clase — examen después de la clase, no antes.
// - Mínimo del día: Parte A completa + predicciones + Anki. La B y la C
//   ruedan a la tarde si la cabeza da. Comer a tiempo.
