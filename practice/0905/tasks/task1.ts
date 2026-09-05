// TASK 0905 — Día 22: Hakkurin II — el ai module (contrato, ficha y proveedor)
// ESTADO: PRE-VERIFICADA Sep 4 (regla 51: todos los hechos y números de
// línea verificados contra Hakkurin real: interface 44 líneas, module 11,
// provider 634; intent en línea 20, imageData en 11, providers en 8,
// constructor 79-82, onModuleInit en 88, comentario 84-87, KeyUsage 39-66,
// Map en 74, @Inject en discord.service línea 63).
// CONTEXTO: bloque de lectura del bot propio, día 2. Hakkurin sigue siendo
// LIBRO: ni edits, ni commits, ni installs. Se lee y se escribe en
// comentarios. Sin LLM.
// Regla del día de lectura: cada bloque produce ESCRITURA tuya (la lección
// del D16 no cambia).

// ═══ REIMU (corrección) — Sep 5. LEER MAÑANA ANTES DEL WARM-UP del 0906 ═══
// (cada bloque va bajo TU respuesta — léelas antes del Anki de mañana)

// ANTES del warm-up: 2 minutos con las correcciones del 0904 (tope del
// archivo). La de B.4 (lo que NO es un pipe) reaparece en el warm-up 2 de
// hoy — sí, es a propósito.

// ═══════════ WARM-UP (sin pistas — una línea cada una) ═══════════

// 1. Tu PingService: ¿quién lo construye y en qué momento exacto del
//    arranque? Una línea.
//          R: El RouteExplorer al inicializar.
// ── REIMU (corrección) — Sep 5: Medio. El momento sí ("al inicializar"), el personaje no: el RouterExplorer MAPEA rutas; quien INSTANCIA es el InstanceLoader — tus propios logs del lunes. Tu PingService lo construyó el InstanceLoader; el RouterExplorer solo leyó sus rutas después.
// 2. Nombra la línea de TU main.ts que registra UNA sola vez algo que
//    alcanza a toda la app. ¿Qué registró Hakkurin con el MISMO patrón?
//          R: No sé que quieres decir. El bootstrap?
// ── REIMU (corrección) — Sep 5: Blanco honesto, y era reciclado: B.4 del 0904. La línea es app.useGlobalPipes(new ValidationPipe()) de TU main.ts — registrar UNA vez, alcanza a toda la app. Hakkurin registró el ScheduleModule con el MISMO patrón: forRoot() en app.module. Vuelve a salir.
// ═══════════ PARTE A — el contrato (ai-brain.interface.ts) ═══════════

// Abre: /mnt/c15f9086-72a6-4245-9256-741c8329e457/Hakkurin/src/ai/ai-brain.interface.ts
// (44 líneas. Cero lógica: son tres interfaces y nada más.)

// A.1 PREDICCIÓN (antes de abrir): por cada mensaje, el bot elige entre
//     cuatro caminos: responder, ignorar, quejarse, o cambiar de tema.
//     ¿Qué tipo de TS (uno que TÚ ya escribiste en PSO) sirve para
//     "una de estas opciones fijas y nada más"? Escríbelo de memoria,
//     completo, con las cuatro opciones en inglés.
//          R: Un Pick<T,K>? No, ya ví (el código), no te había leído bien, un union type.
// ── REIMU (corrección) — Sep 5: La predicción NO cuenta — confesaste abrir antes de predecir ("ya ví el código"). Vale el nombre: union type, correcto. Pero la medición en frío era el punto del ejercicio; se perdió. La próxima: predicción escrita ANTES de abrir, aunque sea "ni idea".
// A.2 Abre y busca el campo intent (línea 20). ¿Cuántas opciones tiene la
//     real? ¿Cuál no estaba en tu predicción — y en qué momento crees que
//     se usa esa quinta? (Pista retro: la trampa de las rarezas de tu PSO
//     era la misma familia. Aquí la detonaste tú, leyendo.)
//          R: No había logrado predecir lo que me pediste porque no te entendí. Tiene 5, el error se usa cuando el bot no se logra comunicar con el LLM o si ocurre un error de ejecución (un catch).
// ── REIMU (corrección) — Sep 5: Contenido BIEN: 5 opciones, la quinta es 'error', y tu cuándo-se-usa (falla de comunicación con el LLM / error de ejecución) es correcto. La trampa la detonaste leyendo — esa era la idea. Sin la predicción del A.1 no cuenta como "detonada por ti", pero el hallazgo es real.
// A.3 El archivo tiene TRES interfaces. Una es lo que LLEGA al cerebro,
//     una es lo que SALE del cerebro, y una dice QUÉ SABE HACER. ¿Cuál es
//     cuál? Una línea cada una. Y una más: ¿cuál de las dos primeras es
//     pariente del DTO del D19 — y en qué DIRECCIÓN viaja?
//          R: la que llega al cerebro es Ai Brain, la que sale del cerebro es AnalysisResult y la que sabe que hacer es la InteractionContext. Primero a AiBrain le llega InteractionContext, cuando el LLM procesa todo, la información sale de AiBrain y pasa a AnalysisResult para luego hacer el output.
// ── REIMU (corrección) — Sep 5: El flujo que narraste al final es correcto (llega InteractionContext → sale AnalysisResult). Pero la clasificación quedó CRUZADA: lo que LLEGA es InteractionContext; la que dice QUÉ SABE HACER (solo métodos, cero datos) es AiBrain — el contrato, puro "sabe hacer". Y la pregunta del DTO quedó sin responder: el pariente es InteractionContext, y viaja HACIA adentro (entrada), igual que tu CreateOrderDto.
// A.4 Línea 11: imageData?: Buffer | Uint8Array | null. Tres adornos en
//     una sola propiedad. ¿Qué dice el ?, qué dice el |, y qué significa
//     el null explícito? Una línea por adorno. (Una de tus propias líneas
//     del 31 de agosto usa el mismo truco con una fecha.)
//          R: No recuerdo exactamente que era | si mal no recuerdo es para separar el union que tiene, el ? es para decir que es opcional. El null explicito significa que puese ser algo vacío también. Entonces, ImageData es opcional, pero si contiene Buffer (la imágen) debe tener un Uint8Array, si no es null. Eso entiendo yo.
// ── REIMU (corrección) — Sep 5: "?" y "|" bien. Pero leíste la línea como dependencia ("debe tener Uint8Array"): el | son ALTERNATIVAS — O Buffer O Uint8Array (Buffer es un Uint8Array con extras), nunca "la una exige la otra". Y null explícito no es "vacío": es la ausencia MARCADA a propósito — "no hay imagen y lo declaro", distinto de simplemente no llegar. Tu "Date | null" del 31 de agosto es exactamente esto: "Primer ping del día" = el dato que aún no existe, declarado honesto.
// ═══════════ PARTE B — la ficha (ai.module.ts) y quien consume ═══════════

// Abre: /mnt/c15f9086-72a6-4245-9256-741c8329e457/Hakkurin/src/ai/ai.module.ts
// (11 líneas.)

// B.1 El array providers de tu order-api lleva clases peladas:
//     [OrdersService]. El de Hakkurin (línea 8) lleva UN objeto:
//     { provide: 'AiBrain', useClass: GeminiProvider }. Con tus palabras:
//     ¿qué está registrando ese objeto? (Máximo dos líneas.)
//          R: Está leyendo el interface 'AiBrain' y luego usa la clase GeminiProvider.
// ── REIMU (corrección) — Sep 5: A medias. Ese objeto registra: "BAJO EL NOMBRE 'AiBrain' (el token), la implementación es GeminiProvider". Es una ficha de reemplazo: cualquiera que pida 'AiBrain' recibe un GeminiProvider ya construido por el contenedor.
// B.2 La ficha exporta 'AiBrain' — un STRING, no una clase. Ahora abre
//     discord/discord.service.ts y mira la línea 63:
//     @Inject('AiBrain') private readonly brain: AiBrain.
//     (a) Cuando DiscordService pide 'AiBrain', ¿qué CLASE le entregan
//         ya construida?
//              R: La de GeminiProvider no?
// ── REIMU (corrección) — Sep 5: Correcto. Con dudas, pero correcto — GeminiProvider es quien llega construida cuando alguien pide el token.
//     (b) ¿Por qué el token es un string y no la interface AiBrain
//         directamente? Pista tuya: tu carta del Día 1 — ¿qué le pasa a
//         una interface cuando el programa YA está corriendo?
//              R: Tiene un scope, además que una token debe ser si o si string porque es un string de números y letras aleatorios.
// ── REIMU (corrección) — Sep 5: No — y te perdiste tu propia pista. Token aquí NO es token de API (nada de números y letras aleatorias): es un NOMBRE de registro. ¿Por qué string y no la interface? Tu carta del Día 1: la interface EVAPORA al compilar — no existe con el programa corriendo, no puede ser llave de nada. El string sí vive en runtime. Si fuera provide: AiBrain, TS lo borraría y Nest se quedaría sin ficha.
// B.3 El constructor de GeminiProvider (líneas 79-82) pide dos cosas:
//     config y memory. ¿Quién las construyó y por qué medio le llegaron?
//     Una línea (tu gerente de personal de la carta sabe la respuesta).
//              R: El injectable del GeminiProvider en gemini.provider.ts, si no, te refieres al atajo de TS para hacer constructors de una sola línea cierto?
// ── REIMU (corrección) — Sep 5: No. @Injectable() no construye NADA — MARCA ("esta clase se puede inyectar"). Quién construyó ConfigService y MemoryService: tu gerente de personal (el contenedor DI), y le llegaron por PARÁMETRO de constructor — el mismo camino por el que a GeminiProvider le llegan ellas. El "atajo de TS de una línea" que mencionas es la sintaxis del parámetro (param properties), no quién construye la dependencia.
// ═══════════ PARTE C — el proveedor (gemini.provider.ts, solo la cima) ═══════════

// Abre: /mnt/c15f9086-72a6-4245-9256-741c8329e457/Hakkurin/src/ai/gemini.provider.ts
// (634 líneas. HOY solo la cima: constantes + clase KeyUsage + líneas
// 68-111. El resto es para otra vida.)

// C.1 On-ramp (molde nuevo): OnModuleInit es un lifecycle hook — un
//     método con nombre fijo que Nest llama en un momento preciso del
//     arranque, DESPUÉS de construir todas las piezas. GeminiProvider lo
//     usa (línea 88) para cargar las keys — y NO las carga en el
//     constructor. El comentario de las líneas 84-87 explica por qué el
//     constructor no servía. Léelo y dilo con tus palabras: ¿qué pasaba
//     cuando las keys se cargaban en el constructor? (Dos líneas.)
//          R: Básicamente porque el ctor se iniciaba antes de que todos los datos necesarios (apikeys, tokens, etc.) entonces leía datos vacíos/no inicializados, entonces quedaba cómo si no existiera.
// ── REIMU (corrección) — Sep 5: Correcto de verdad: orden de arranque — el ctor corría antes de que ConfigService terminara de leer el JSON, keys quedaban vacías, el cliente nacía muerto hasta el /restart. onModuleInit corre DESPUÉS de construir todas las piezas. Bien leído, con tus palabras.
// C.2 Líneas 39-66: la clase KeyUsage cuenta cuántas requests gastó cada
//     key. Línea 74: this.keyUsage = new Map(...) guarda esas cuentas.
//     ¿DÓNDE vive ese estado (qué clase, construida por quién)? ¿Sobrevive
//     entre dos requests? ¿Y entre dos reinicios del server? (Tu contador
//     del 31 ya vivió exactamente esto.)
//          R: Almacena en memoria. Te lo digo porque antes de portear esto (usando llms) de Python a Nest, diseñé esta parte. Se almacena en memoria, entre dos requests? No entiendo tu pregunta, esa información vive dentro de la clase KeyUsage, y lo construye el injectable de GeminiProvider cierto?
// ── REIMU (corrección) — Sep 5: Memoria: correcto. Pero "el injectable de GeminiProvider" construye — otra vez no: @Injectable MARCA. El Map vive en la INSTANCIA de GeminiProvider (singleton construido por el gerente); los KeyUsage son los VALORES. Las dos preguntas sin responder: entre requests SOBREVIVE (RAM del singleton — tu contador del 31 lo vivió); entre reinicios MUERE (nadie escribió ese estado a disco). Y un registro para ti: esta parte la DISEÑASTE tú en el port de Python — el diseño lo tienes; falta el vocabulario de quién lo sostiene vivo.
// C.3 (entrevista) "Mañana quiero cambiar Gemini por OpenAI en Hakkurin.
//     ¿Qué tocas y qué NO tocas?" Dos líneas. Esta pregunta es el pago
//     de diseño de todo lo que leíste hoy.
//          R: Solo tengo que reemplazar Gemini Provider por un módulo que use endpoints compatibles con OpenAI y ya, todo lo demás se mantiene igual.
// ── REIMU (corrección) — Sep 5: Esencia correcta — reemplazar el proveedor, todo lo demás igual. Lo que faltó para la respuesta completa de entrevista, en una línea: "discord.service solo conoce el CONTRATO (AiBrain), no la implementación — por eso no se toca". Nombrar el escudo es lo que convierte la intuición en respuesta de entrevista.
// C.4 (extra — el "ni idea" honesto vale) Línea 69:
//     class GeminiProvider implements AiBrain, OnModuleInit.
//     ¿Qué verifica el compilador cuando ve el implements? ¿Qué pasaría
//     si a GeminiProvider le falta un método del contrato?
//          R: Explota, me imagino que explota, realmente no sé.
// ── REIMU (corrección) — Sep 5: "Ni idea" honesto, vale. La respuesta: no llega a explotar — no llega a CORRER. El implements enciende al type-checker: si a la clase le falta un método del contrato, tsc lo rechaza ANTES de ejecutar. Es tu "portero trabajando gratis" otra vez — el contrato tiene dientes en compile time. Carta nueva esta noche.
// ═══════════ CIERRE ═══════════
// - Hakkurin NO se commitea ni se edita — sigue siendo libro. El commit de
//   hoy es ESTA task en ts-inventory-cli.
// - Anki: tanda del día. Ojo con singleton (lleva 4 Again de ayer): si
//   vuelve a fallar hoy, es reescritura sí o sí.
// - Las cartas nuevas de este material (token DI, lifecycle hook, contrato
//   vs implementación) nacen HOY en la noche al cerrar el día — examen
//   después de la clase.
