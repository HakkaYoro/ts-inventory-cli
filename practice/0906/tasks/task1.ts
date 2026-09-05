// TASK 0906 — Día 23: doble turno — ESCRIBIR el patrón + LEER el discord module
// ESTADO: PRE-VERIFICADA Sep 5 (server real en copia /tmp: GET /greet 200 con
// body de texto plano; experimento de intercambio PASS con controller
// byte-idéntico (md5 igual antes/después); mina TS1272 cazada en vivo con
// el tsconfig real del repo; zombi de puerto reproducido y verificado).
// CONTEXTO: domingo, día opcional por diseño. Ayer cerraste 12/20 con niebla
// declarada — si hoy amaneces igual, ESTA task espera: el descanso es parte
// del plan, no su enemigo. Si amaneces bien: doble turno de ganancia.
// Regla 55 (la tuya): D21 y D22 fueron PURA LECTURA → hoy se ESCRIBE primero.
// El bloque de escritura VA PRIMERO, con tu mejor ventana de la mañana.
// Hakkurin sigue siendo LIBRO en la Parte B: ni edits, ni commits, ni installs.
// PARTE A SIN LLM: patrón nuevo → intento propio primero, aunque compile feo
// (regla del 31 de agosto: el intento fallido es el que instala el patrón).
// La IA después, solo para comparar y etiquetar lo que ya escribiste.

// ANTES del warm-up: 2 minutos con las correcciones del 0905 (tope del
// archivo). El warm-up de hoy te las examina directamente.

// ═══════════ WARM-UP (sin pistas — una línea cada una) ═══════════

// 1. @Injectable(): ¿construye, marca o importa? Una línea.
// 2. Hakkurin pide 'AiBrain' con un STRING como token. ¿Qué le pasa a una
//    interface cuando el programa YA está corriendo — y qué consecuencia
//    tiene eso para el token? Una línea.

// ═══════════ PARTE A — ESCRIBIR: el encargo del cliente (en order-api) ═══════════

// El cliente habla:
// "Quiero una ruta GET /greet en order-api. Devuelve un saludo de texto
// plano. Pero ojo: el saludo NO lo escribe el controller. Lo produce una
// pieza intercambiable: una interface tuya define QUÉ sabe hacer la pieza,
// una clase la implementa, el módulo la registra bajo un NOMBRE string, y el
// controller la recibe inyectada y le delega. MAÑANA puedo pedirte cambiar
// quién saluda: ese cambio NO puede tocar el archivo del controller. Ese es
// el requisito duro del contrato."

// Entregable observable:
// - curl a la ruta → 200 + tu saludo, texto plano en el body.
// - Experimento de intercambio: segunda implementación con OTRO saludo,
//   cambio en UN solo archivo, curl que devuelve el saludo nuevo.
// - PREDICCIÓN ESCRITA antes de cada curl (qué status, qué body crees).
// - Un comentario // de UNA línea en el module defendiendo por qué el
//   controller no se toca en el intercambio.

// Decisiones TUYAS (el cliente no las hace): nombres de archivos, carpetas,
// nombres de clases, cómo se arma la ruta /greet (con o sin prefijo — el
// cliente quiere la ruta LITERAL /greet, el camino es asunto tuyo).

// Mina anunciada (no es tu error): si tsc se queja de TU interface puesta
// como tipo de parámetro en un constructor decorado — ese error ya lo
// viviste el Día 6, task Vocaloid: Biome te exigió un import DISTINTO para
// tipos. Lee el error completo, recuerda el Día 6. No lo resuelvas a ciegas.

// Nota operacional (mina conocida del 2 de septiembre): si tras matar el
// server el puerto 3000 aparece ocupado, es el hijo zombi node dist/main:
// pkill -f "[d]ist/main" y verificar con ss -ltnp | grep 3000 (vacío)
// antes de relanzar. "Nada cambió tras mi fix" puede ser un muerto contestando.

// Nota de estilo: NO corras npm run format — reescribiría medio repo
// (el estilo real de los archivos difiere del config de prettier).

// ═══════════ PARTE B — LEER: el discord module de Hakkurin (LIBRO) ═══════════

// La carpeta: src/discord/ — 7 archivos, 1308 líneas en total. Hoy entran
// al cuaderno: discord.module.ts (18 líneas) y la CIMA de discord.service.ts
// (818 — solo constructor y su entorno inmediato; el resto es para otra vida).

// B.1 PREDICCIÓN (antes de abrir): el constructor de DiscordService
//     (discord.service.ts, líneas 60-72) recibe NUEVE piezas por parámetro.
//     ¿Cuántas crees que llevan @Inject — y por qué JUSTO esas y no las
//     otras? Escribe tu predicción, después abre y verifica línea por línea.
// B.2 Corre en la raíz de Hakkurin: grep -rn "GeminiProvider" src/discord/
//     → cero resultados. Conecta con tu C.3 de ayer (cambiar Gemini por
//     OpenAI): ¿qué significa FÍSICAMENTE ese cero para el alcance del
//     cambio? Dos líneas.
// B.3 discord.service.ts línea 354: this.brain.analyzeInteraction({ userText,
//     userId, userName, ... }) — ese objeto literal que le pasan es una
//     interface que leíste AYER. ¿Cuál es, y qué papel juega (entrada o
//     salida del cerebro)? Una línea.
// B.4 discord.module.ts: importa CINCO módulos (línea 14), provee CINCO
//     servicios (línea 15) y exporta SOLO uno, DiscordService (línea 16).
//     ¿Quién fuera de src/discord/ necesita ese export para funcionar?
//     (Pista: existe un módulo web cuyo controller inyecta DiscordService
//     — línea 20 de ese controller.)

// ═══════════ PARTE C — cierre conceptual ═══════════

// C.1 (entrevista) "Si TypeScript ya tiene clases, ¿para qué existe el
//     token string en la inyección?" Dos líneas, con el porqué de runtime.
// C.2 Tu pieza de la Parte A: ¿quién la construyó y en qué momento exacto
//     del arranque? Una línea. (Tu gerente ya hizo esto dos veces esta
//     semana — la tercera tiene que salir redonda.)
// C.3 El intercambio que demostraste en la Parte A y el binding
//     { provide: 'AiBrain', useClass: GeminiProvider } de Hakkurin
//     (ai.module.ts línea 8) son EL MISMO patrón. Dalo en dos líneas:
//     cómo lo llamarías en una entrevista, y qué problema resuelve.

// ═══════════ CIERRE ═══════════
// - Commits de hoy: el código real de la Parte A → order-api (commit tuyo,
//   Reimu pushea al cierre si lo delegas). Esta task → ts-inventory-cli.
//   Hakkurin NI UN COMMIT — sigue siendo libro.
// - Anki: si hoy abres la sesión, avisa ANTES — nacen las 5 cartas de ayer
//   (token DI, @Injectable-marca, OnModuleInit, implements, null explícito)
//   y después haces la tanda con ellas dentro. Examen después de la clase.
// - Si hoy no está el día: no pasa nada. Domingo por diseño, la task espera
//   a tu cabeza. Lo mínimo del día es la racha de Anki y comer a tiempo.
