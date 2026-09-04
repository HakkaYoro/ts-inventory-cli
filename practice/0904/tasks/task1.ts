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

// ═══ REIMU (corrección) — Sep 4. LEER MAÑANA ANTES DEL WARM-UP del 0905 ═══
// (cada bloque va bajo TU respuesta — leélas antes del Anki de mañana)


// ANTES del warm-up: 2 minutos con las correcciones del D20 (tope del
// archivo 0903). Ayer quedó una deuda de 30 segundos anotada ahí — si
// OrdersModule te queda raro al abrirla, ya sabes por qué.

// ═══════════ WARM-UP (sin pistas — una línea cada una) ═══════════

// 1. Tu order-api tiene una función llamada bootstrap() en main.ts.
//    ¿Qué ES el bootstrap de una app? Una línea.
//          R: Cómo el nombre lo dice (No sé que significa la parte "strap" en Bootstrap) es el que inicializa todo (Boot). Es cómo el init en python.
// 2. En tu main.ts hay: process.env.PORT ?? 3000. ¿Qué hace el ??,
//    y qué pasa si PORT no está definida?
//          R: No sé exactamente que hay en la linea. Si no está definido (asumo) que coloca el puerto por defecto (Si no me equivoco 8000). Ah, ya va, el ?? si está en la linea, creía que era algo cómo "Intenta recordar que se supone que va donde está ??", ni idea que sea ??. Ya investigué, operador de fusión nula. Se me va a olvidar eso, hazme una carta.
//     ── REIMU (corrección): carta CREADA — "¿Qué hace el ?? y qué pasa si
//     PORT no está definida?" ya vive en el deck con tus DOS mains como
//     evidencia. Tu investigación propia + pedido explícito = exactamente
//     el ciclo correcto. El 8000 que "recordabas" era el de Hakkurin —
//     el tuyo es 3000. Los dos viven en la carta.
// ═══════════ PARTE A — El main.ts de Hakkurin ═══════════

// Abre en VSCode: /mnt/c15f9086-72a6-4245-9256-741c8329e457/Hakkurin/src/main.ts
// (47 líneas. Tu order-api tiene 10.)

// A.1 PREDICCIÓN (escríbela ANTES de abrir el archivo): Hakkurin es un
//     bot NestJS. ¿Qué líneas crees que van a aparecer en su main.ts
//     TAMBIÉN — las que son de Nest, no del dominio del bot?
//          R: Ni idea, por lo menos sé que van a salir bootstrap(), lo del puerto, imports y ya.
// A.2 Ábrelo. ¿Cuáles acertaste? De las líneas que Hakkurin tiene y tu
//     order-api NO, clasifica cada una: ¿del dominio del bot (Discord,
//     audio, red de esta máquina) o del mundo Nest/Node? Una por línea.
//          R: Sí, acerté las que dije.
//              Los imports son cosas comines de nest/node
//              Los agentes son cosas de node.
//              ¿? Creo que todo es de Node/Nest.
//     ── REIMU (corrección): casi todo, pero los dos Agent (family: 4) NO
//     son Node genérico — son CAJA DEL BOT. Test: ¿la línea existiría si
//     Hakkurin fuera una API web muda, sin voz? Los agentes no: están ahí
//     porque la red IPv6 de tu proveedor mataba el VoiceWebSocket de
//     Discord (lo dijiste tú mismo en C.2 — lo viviste). setDefaultResultOrder
//     sí es Node puro. Dominio no es "qué librería usa" sino "por qué
//     ESTA app la necesita".
// A.3 La última línea de tu main.ts es bootstrap(); pelado. La de
//     Hakkurin (líneas 43-47) es bootstrap().catch(...). ¿Qué familia
//     es esa — y qué gana el de Hakkurin sobre el tuyo?
//          R: Es de promises, está capturando errores en el bootstrap de Hakkurin, para que no explote con un traceback feo.
//     ── REIMU (corrección): correcto — familia promesa flotante. La frase
//     de entrevista que te faltó: el .catch le da DUEÑO al error. Esta era
//     la deuda del gate (P4) — hoy la leíste en código real y la nombraste
//     solo. Deuda saldada.
// A.4 El ?? de tu warm-up aparece dos veces en la línea 40 de Hakkurin:
//     process.env.PORT ?? 8000, process.env.WEBUI_HOST ?? '::'.
//     Una línea: ¿qué son el 8000 y el '::' — y en qué se diferencian
//     del 3000 de tu order-api más allá del número?
//          R: 8000 es el puerto para todo el proyecto, luego le dice que el webui puede escuchar tanto en ipv4 cómo ipv6 (:: es de ipv6, pero engloba ipv4 también). La diferencia principal es que el de order es SOLO ipv4, acá acepta los dos.
// ═══════════ PARTE B — El app.module.ts de Hakkurin ═══════════

// Abre: /mnt/c15f9086-72a6-4245-9256-741c8329e457/Hakkurin/src/app.module.ts
// (16 líneas.)

// Contexto para esta parte, como te lo contaron: como en todo Nest que
// se respete, Hakkurin maneja su configuración con el ConfigModule
// oficial del paquete @nestjs/config, importado en su AppModule.

// B.1 PREDICCIÓN antes de abrir: tu order-api importa 2 módulos en
//     app.module. Hakkurin es un bot entero — ¿cuántos módulos crees
//     que importa su AppModule? Un número, a ciegas.
//      R: Son varios por cada función que hace Hakkurin, los base me imagino que son 2 o 3, los demás serían 6 aproximadamente. Por feature digo, en total 8 o 9 diría yo.
// B.2 Abre y cuenta. ¿Cumplió tu predicción? Ahora relee el contexto
//     de arriba (el de esta Parte B) y contrástalo con la LÍNEA 3 del
//     archivo. ¿El contexto dijo la verdad? Si no: ¿de dónde sale el
//     ConfigModule de Hakkurin, y qué implica eso sobre quién escribió
//     esa pieza?
//      R: No, no coincide con lo que mencionas, viene de un .ts en la carpeta common llamada config.module. La escribió alguien más (El LLM). Revisé tanto config.module cómo config.service.
//          R: Exacto, 8. Asumí que eran 2 base por los 2 módulos que mencionaste de order-api.
// B.3 El @Module de tu order-api declara 3 arrays. El de Hakkurin
//     declara 1 (línea 14). ¿A quién le toca declarar los controllers
//     y providers en Hakkurin, si AppModule no lo hace? (Pista tuya:
//     tus módulos orders y pings ya hacen exactamente eso.)
//          R: Lo hace los mismos modules. Cada feature (module) adentro tiene a Service y a Controller. No hace falta importar dos veces lo mismo. Respondido sin revidar los módulos (Me costó).
// B.4 El primer import del array no viene pelado:
//     ScheduleModule.forRoot(). El comentario que está encima del
//     @Module (líneas 10-12) dice para qué sirve. Léelo y dilo con tus
//     palabras, una línea. Luego una línea más: ¿te suena el patrón de
//     "activar una sola vez algo que alcanza a toda la app"? Nómbralo
//     con lo que hiciste el martes en main.ts.
//          R: Es un pipe? Un Pipe global cierto? No recuerdo el nombre, pero es un dto que lo lee un pipe globalmente. No? Y lo hizo para no ser redundante con el código.
//     ── REIMU (corrección): NO es un pipe — y acá mezclaste DOS cosas
//     tuyas del martes. Un pipe intercepta PARÁMETROS de UNA puerta (tu
//     ParseIntPipe: @Param('id')). ScheduleModule.forRoot() habilita los
//     CRONS (@Interval/@Cron) para TODA la app. El paralelo correcto con
//     tu martes es OTRO objeto: app.useGlobalPipes(new ValidationPipe())
//     en TU main.ts — registrar UNA VEZ algo que alcanza a toda la app.
//     Ese es el patrón que la pregunta pedía nombrar. (Y el DTO no está
//     involucrado acá: DTO = forma del body; esto ni recibe requests.)
// ═══════════ PARTE C — Preguntas de entrevista ═══════════

// C.1 Un entrevistador te dice: "Explícame el bootstrap de tu bot en
//     3 líneas". Tres líneas, con Hakkurin recién leído.
//          R: Primero importa, ejecuta la función bootstrap, la cual crea dos agentes (Uno http y otro https) en ipv4, luego crea un factory de Nest (No sé que es) en una variable app, luego crea un loop, luego lo habilita, le establece un intervalo para mostrar logs de consola de lo que ocurre en el eventLoop, luego inicializa el app y hace que empiece a escuchar. Es eso?
//     ── REIMU (corrección): sí, ese es el orden completo y correcto. Lo
//     único que te faltó es nombre: NestFactory = la FÁBRICA — la función
//     que CONSTRUYE la app Nest a partir de tu AppModule. La usás vos
//     también, línea 6 de tu propio main. (Patrón del día: concepto en la
//     mano, vocabulario ausente — te lo registro.)
// C.2 Las líneas 15-17 de Hakkurin fuerzan IPv4 en las conexiones
//     salientes. ¿Por qué existen esas líneas en Hakkurin y NO en tu
//     order-api? (El comentario del archivo lo dice — léelo y
//     resúmelo.)
//          R: Ah, eso fué un bug que arreglé en conjunto con Claude. Sé para que es y porqué ocurrió, básicamente, mi proveedor de mierdanet las rutas IPv6 son un poco (muy) inestables, y causaba problemas al conectar al VC en discord (sutters), entonces la solución fué forzar conexiones IPv$, que son más estables.
// C.3 El monitor de la línea 25 mide algo y lo loguea cada 30
//     segundos. ¿Qué caza ese monitor — qué problema del bot estaba
//     matando el sueño cuando lo escribieron? (También vive en un
//     comentario.)
//          R: Es para ver cómo está la conexión entre discord y el bot si mal no recuerdo. También para ver todas las calls que hace el bot.
//     ── REIMU (corrección): no mide la conexión ni las calls — mide la
//     SALUD del event loop: cuánto se BLOQUEA (los p50/p99/p99.9 son ms
//     de demora del loop). ¿Por qué importa? El pacer de voz (20ms) vive
//     en ese loop; si se bloquea con sync pesado o GC, Discord recibe
//     SILENCIO aunque el audio esté listo → stutter. Es un
//     electrocardiograma del loop, no un contador de tráfico.
// C.4 Extra opcional (el "ni idea" honesto vale y no penaliza): el
//     setInterval del diagnóstico termina en .unref(). ¿Qué crees que
//     hace, sabiendo lo que sabes del event loop y de lo que mantiene
//     vivo un proceso?
//          R: No sé que es unref. Investigando... Ah, ya ví, es para decir, "Esto se ejecutará indefinidamente, pero, si al apagar esto es lo único que se mantiene endecido, puedes cerrarlo/matarlo sin preocupaciones...".
// C.5 Tu order-api declara 3 arrays en AppModule; Hakkurin declara 1.
//     ¿Cuál de las dos casas está mejor organizada y por qué? Dos
//     líneas defendiendo TU posición — no hay respuesta única, hay
//     respuesta defendida.
//          R: Opino que debería ser el de order api. Porque cada uno está separado por su cuenta, pero en sí, es más legible el de Hakkurin. Si realmente es lo mismo, entonces es mejor el de Hakkurin.
//     ── REIMU (corrección): eso es un condicional, no una posición. La
//     pregunta pedía DOS líneas defendiendo TU respuesta — "si X entonces
//     Y" deja la decisión en el lector. Ambas casas son defendibles
//     (order-api: todo visible desde la raíz; Hakkurin: raíz solo orquesta
//     y cada feature es dueña de sus piezas). El punto era ELEGIR y
//     defender. Medio punto.
// ═══════════ CIERRE ═══════════
// - Hakkurin NO se commitea ni se edita — es lectura. El commit de hoy
//   es ESTA task en ts-inventory-cli (la racha sigue con el libro).
// - Anki: tanda del día (deben salir las 5 de Pipes de ayer + las 5 de
//   DTO que el tope rotó + las 2 reescrituras). Si solo da para Anki,
//   ya cumpliste — pero esta task es corta y no requiere server.
// - Las cartas nuevas del bloque Hakkurin nacen mañana noche, al cerrar
//   la lectura del ai module (D22). Examen después de la clase.
