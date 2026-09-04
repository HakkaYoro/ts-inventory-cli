// TASK 0904 — Día 21: Hakkurin I — main.ts + app.module.ts (tu bot, tu libro)
// ESTADO: PRE-VERIFICADA Sep 3 noche (regla 51: TODOS los hechos del
// enunciado verificados contra el repo real de Hakkurin por extractor —
// main.ts 47 líneas, app.module.ts 16, imports y línea de listen
// confirmados con número de línea. Sin desvíos).
// CONTEXTO: hoy adelantaste D20 en el jueves libre; la serie Anki va
// 55→76→88. Hoy empieza el bloque de lectura: TU bot, el que vibecodeaste
// y nunca leíste completo. Nadie lo opera: Hakkurin es un LIBRO hoy —
// ni edits, ni commits, ni installs. Se lee y ya.
// Regla del día de lectura (la lección del D16): cada bloque produce
// ESCRITURA tuya. Leer pasivo no consolida — tú lo demostraste.
// Sin LLM. Responde en comentarios // como siempre.

// ANTES del warm-up: 2 minutos con las correcciones del D20 (tope del
// archivo 0903). Ayer quedó una deuda de 30 segundos anotada ahí — si
// OrdersModule te queda raro al abrirla, ya sabes por qué.

// ═══════════ WARM-UP (sin pistas — una línea cada una) ═══════════

// 1. Tu order-api tiene una función llamada bootstrap() en main.ts.
//    ¿Qué ES el bootstrap de una app? Una línea.
// 2. En tu main.ts hay: process.env.PORT ?? 3000. ¿Qué hace el ??,
//    y qué pasa si PORT no está definida?

// ═══════════ PARTE A — El main.ts de Hakkurin ═══════════

// Abre en VSCode: /mnt/c15f9086-72a6-4245-9256-741c8329e457/Hakkurin/src/main.ts
// (47 líneas. Tu order-api tiene 10.)

// A.1 PREDICCIÓN (escríbela ANTES de abrir el archivo): Hakkurin es un
//     bot NestJS. ¿Qué líneas crees que van a aparecer en su main.ts
//     TAMBIÉN — las que son de Nest, no del dominio del bot?
// A.2 Ábrelo. ¿Cuáles acertaste? De las líneas que Hakkurin tiene y tu
//     order-api NO, clasifica cada una: ¿del dominio del bot (Discord,
//     audio, red de esta máquina) o del mundo Nest/Node? Una por línea.
// A.3 La última línea de tu main.ts es bootstrap(); pelado. La de
//     Hakkurin (líneas 43-47) es bootstrap().catch(...). ¿Qué familia
//     es esa — y qué gana el de Hakkurin sobre el tuyo?
// A.4 El ?? de tu warm-up aparece dos veces en la línea 40 de Hakkurin:
//     process.env.PORT ?? 8000, process.env.WEBUI_HOST ?? '::'.
//     Una línea: ¿qué son el 8000 y el '::' — y en qué se diferencian
//     del 3000 de tu order-api más allá del número?

// ═══════════ PARTE B — El app.module.ts de Hakkurin ═══════════

// Abre: /mnt/c15f9086-72a6-4245-9256-741c8329e457/Hakkurin/src/app.module.ts
// (16 líneas.)

// Contexto para esta parte, como te lo contaron: como en todo Nest que
// se respete, Hakkurin maneja su configuración con el ConfigModule
// oficial del paquete @nestjs/config, importado en su AppModule.

// B.1 PREDICCIÓN antes de abrir: tu order-api importa 2 módulos en
//     app.module. Hakkurin es un bot entero — ¿cuántos módulos crees
//     que importa su AppModule? Un número, a ciegas.
// B.2 Abre y cuenta. ¿Cumplió tu predicción? Ahora relee el contexto
//     de arriba (el de esta Parte B) y contrástalo con la LÍNEA 3 del
//     archivo. ¿El contexto dijo la verdad? Si no: ¿de dónde sale el
//     ConfigModule de Hakkurin, y qué implica eso sobre quién escribió
//     esa pieza?
// B.3 El @Module de tu order-api declara 3 arrays. El de Hakkurin
//     declara 1 (línea 14). ¿A quién le toca declarar los controllers
//     y providers en Hakkurin, si AppModule no lo hace? (Pista tuya:
//     tus módulos orders y pings ya hacen exactamente eso.)
// B.4 El primer import del array no viene pelado:
//     ScheduleModule.forRoot(). El comentario que está encima del
//     @Module (líneas 10-12) dice para qué sirve. Léelo y dilo con tus
//     palabras, una línea. Luego una línea más: ¿te suena el patrón de
//     "activar una sola vez algo que alcanza a toda la app"? Nómbralo
//     con lo que hiciste el martes en main.ts.

// ═══════════ PARTE C — Preguntas de entrevista ═══════════

// C.1 Un entrevistador te dice: "Explícame el bootstrap de tu bot en
//     3 líneas". Tres líneas, con Hakkurin recién leído.
// C.2 Las líneas 15-17 de Hakkurin fuerzan IPv4 en las conexiones
//     salientes. ¿Por qué existen esas líneas en Hakkurin y NO en tu
//     order-api? (El comentario del archivo lo dice — léelo y
//     resúmelo.)
// C.3 El monitor de la línea 25 mide algo y lo loguea cada 30
//     segundos. ¿Qué caza ese monitor — qué problema del bot estaba
//     matando el sueño cuando lo escribieron? (También vive en un
//     comentario.)
// C.4 Extra opcional (el "ni idea" honesto vale y no penaliza): el
//     setInterval del diagnóstico termina en .unref(). ¿Qué crees que
//     hace, sabiendo lo que sabes del event loop y de lo que mantiene
//     vivo un proceso?
// C.5 Tu order-api declara 3 arrays en AppModule; Hakkurin declara 1.
//     ¿Cuál de las dos casas está mejor organizada y por qué? Dos
//     líneas defendiendo TU posición — no hay respuesta única, hay
//     respuesta defendida.

// ═══════════ CIERRE ═══════════
// - Hakkurin NO se commitea ni se edita — es lectura. El commit de hoy
//   es ESTA task en ts-inventory-cli (la racha sigue con el libro).
// - Anki: tanda del día (deben salir las 5 de Pipes de ayer + las 5 de
//   DTO que el tope rotó + las 2 reescrituras). Si solo da para Anki,
//   ya cumpliste — pero esta task es corta y no requiere server.
// - Las cartas nuevas del bloque Hakkurin nacen mañana noche, al cerrar
//   la lectura del ai module (D22). Examen después de la clase.
