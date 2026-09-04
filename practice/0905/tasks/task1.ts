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

// ANTES del warm-up: 2 minutos con las correcciones del 0904 (tope del
// archivo). La de B.4 (lo que NO es un pipe) reaparece en el warm-up 2 de
// hoy — sí, es a propósito.

// ═══════════ WARM-UP (sin pistas — una línea cada una) ═══════════

// 1. Tu PingService: ¿quién lo construye y en qué momento exacto del
//    arranque? Una línea.
// 2. Nombra la línea de TU main.ts que registra UNA sola vez algo que
//    alcanza a toda la app. ¿Qué registró Hakkurin con el MISMO patrón?

// ═══════════ PARTE A — el contrato (ai-brain.interface.ts) ═══════════

// Abre: /mnt/c15f9086-72a6-4245-9256-741c8329e457/Hakkurin/src/ai/ai-brain.interface.ts
// (44 líneas. Cero lógica: son tres interfaces y nada más.)

// A.1 PREDICCIÓN (antes de abrir): por cada mensaje, el bot elige entre
//     cuatro caminos: responder, ignorar, quejarse, o cambiar de tema.
//     ¿Qué tipo de TS (uno que TÚ ya escribiste en PSO) sirve para
//     "una de estas opciones fijas y nada más"? Escríbelo de memoria,
//     completo, con las cuatro opciones en inglés.
// A.2 Abre y busca el campo intent (línea 20). ¿Cuántas opciones tiene la
//     real? ¿Cuál no estaba en tu predicción — y en qué momento crees que
//     se usa esa quinta? (Pista retro: la trampa de las rarezas de tu PSO
//     era la misma familia. Aquí la detonaste tú, leyendo.)
// A.3 El archivo tiene TRES interfaces. Una es lo que LLEGA al cerebro,
//     una es lo que SALE del cerebro, y una dice QUÉ SABE HACER. ¿Cuál es
//     cuál? Una línea cada una. Y una más: ¿cuál de las dos primeras es
//     pariente del DTO del D19 — y en qué DIRECCIÓN viaja?
// A.4 Línea 11: imageData?: Buffer | Uint8Array | null. Tres adornos en
//     una sola propiedad. ¿Qué dice el ?, qué dice el |, y qué significa
//     el null explícito? Una línea por adorno. (Una de tus propias líneas
//     del 31 de agosto usa el mismo truco con una fecha.)

// ═══════════ PARTE B — la ficha (ai.module.ts) y quien consume ═══════════

// Abre: /mnt/c15f9086-72a6-4245-9256-741c8329e457/Hakkurin/src/ai/ai.module.ts
// (11 líneas.)

// B.1 El array providers de tu order-api lleva clases peladas:
//     [OrdersService]. El de Hakkurin (línea 8) lleva UN objeto:
//     { provide: 'AiBrain', useClass: GeminiProvider }. Con tus palabras:
//     ¿qué está registrando ese objeto? (Máximo dos líneas.)
// B.2 La ficha exporta 'AiBrain' — un STRING, no una clase. Ahora abre
//     discord/discord.service.ts y mira la línea 63:
//     @Inject('AiBrain') private readonly brain: AiBrain.
//     (a) Cuando DiscordService pide 'AiBrain', ¿qué CLASE le entregan
//         ya construida?
//     (b) ¿Por qué el token es un string y no la interface AiBrain
//         directamente? Pista tuya: tu carta del Día 1 — ¿qué le pasa a
//         una interface cuando el programa YA está corriendo?
// B.3 El constructor de GeminiProvider (líneas 79-82) pide dos cosas:
//     config y memory. ¿Quién las construyó y por qué medio le llegaron?
//     Una línea (tu gerente de personal de la carta sabe la respuesta).

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
// C.2 Líneas 39-66: la clase KeyUsage cuenta cuántas requests gastó cada
//     key. Línea 74: this.keyUsage = new Map(...) guarda esas cuentas.
//     ¿DÓNDE vive ese estado (qué clase, construida por quién)? ¿Sobrevive
//     entre dos requests? ¿Y entre dos reinicios del server? (Tu contador
//     del 31 ya vivió exactamente esto.)
// C.3 (entrevista) "Mañana quiero cambiar Gemini por OpenAI en Hakkurin.
//     ¿Qué tocas y qué NO tocas?" Dos líneas. Esta pregunta es el pago
//     de diseño de todo lo que leíste hoy.
// C.4 (extra — el "ni idea" honesto vale) Línea 69:
//     class GeminiProvider implements AiBrain, OnModuleInit.
//     ¿Qué verifica el compilador cuando ve el implements? ¿Qué pasaría
//     si a GeminiProvider le falta un método del contrato?

// ═══════════ CIERRE ═══════════
// - Hakkurin NO se commitea ni se edita — sigue siendo libro. El commit de
//   hoy es ESTA task en ts-inventory-cli.
// - Anki: tanda del día. Ojo con singleton (lleva 4 Again de ayer): si
//   vuelve a fallar hoy, es reescritura sí o sí.
// - Las cartas nuevas de este material (token DI, lifecycle hook, contrato
//   vs implementación) nacen HOY en la noche al cerrar el día — examen
//   después de la clase.
