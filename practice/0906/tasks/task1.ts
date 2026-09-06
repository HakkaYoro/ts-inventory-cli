// TASK 0906 — Día 23: ESCRIBIR el patrón token-DI + LEER el memory module
// ESTADO: PRE-VERIFICADA Sep 5 (server real en copia /tmp: GET /greet 200 con
// body de texto plano; experimento de intercambio PASS con controller
// byte-idéntico (md5 igual antes/después); mina TS1272 cazada en vivo con
// el tsconfig real del repo; zombi de puerto reproducido y verificado).
// ACTUALIZADA Sep 6 (recalibración 98→64 días): el discord module YA NO es
// hoy — corre en el D24 junto con el resto de Hakkurin. Hoy: Parte A igual
// (pre-verificada, intacta) + Parte B = memory module, lectura liviana.
// Con sueño de 4h30 este orden es el correcto: escribir primero, leer
// liviano después. Si la cabeza no da para la Parte B tras cerrar la A,
// se corre al D24 sin culpa — el mínimo del día es la Parte A.
// Regla 55 (la tuya): D21 y D22 fueron PURA LECTURA → hoy se ESCRIBE primero.
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
// ═══════════ PARTE B — LEER: el memory module de Hakkurin (LIBRO) ═══════════

// La carpeta: src/memory/ — hoy entran al cuaderno: memory.module.ts y
// memory.service.ts (los archivos chicos; crypto.service queda para el D24).

// B.1 PREDICCIÓN (antes de abrir): memory.service guarda y recupera
//     conversaciones del bot. ¿Qué depende del USUARIO que habla y qué
//     del MOMENTO en que habla? ¿Cuál de las dos esperas ver como parte
//     de la CLAVE con la que se guarda cada memoria? Una línea.
// B.2 Abre memory.service.ts y encuentra dónde NACE una memoria nueva y
//     dónde SE LEE la vieja. ¿Quién llama a esos métodos desde fuera del
//     archivo? Una línea. (Recuerda: es un service — a él llegan llamadas
//     de métodos, no requests.)
// B.3 Map, Date, JSON: tres piezas que TÚ ya usaste (CLI: data.json;
//     pings: la fecha del ping anterior). Encuentra UNA en memory.service
//     y di qué papel juega ahí, en una línea.

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
// - Anki: las 5 cartas del D22 ya nacieron esta mañana (token DI,
//   @Injectable-marca, OnModuleInit, implements, null explícito) — la
//   tanda de hoy las incluye. Examen después de la clase.
// - Mínimo del día: Parte A + racha de Anki + comer a tiempo. Nada más.
