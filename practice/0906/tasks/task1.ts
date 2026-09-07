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
// ═══ REIMU (Sep 7, cierre D24-A): 8 correcciones nuevas debajo de cada R: de hoy.
// LEE LAS TODAS mañana ANTES del bloque Hakkurin (discord module + crypto.service).
// La de C.3 es tu línea de entrevista del patrón que escribiste hoy. ═══

// ═══════════ WARM-UP (sin pistas — una línea cada una) ═══════════

// 1. @Injectable(): ¿construye, marca o importa? Una línea.
//          R: No sé cual de las 3 palabras usar. Creo que sería importa. Porque importa (inyecta) código en otras clases cómo dependencias.
//          ── REIMU (corrección, Sep 6): MARCA. No construye, no importa, no inyecta.
//          Es el cartel en la puerta: "esta clase se puede registrar como dependencia".
//          Quien construye e inyecta es el gerente (el contenedor DI — InstanceLoader,
//          tus logs del lunes). El decorador solo deja el cartel. Tercera variante de
//          la familia (D22: "construye") — la escritura de la Parte A la instala.
// 2. Hakkurin pide 'AiBrain' con un STRING como token. ¿Qué le pasa a una
//    interface cuando el programa YA está corriendo — y qué consecuencia
//    tiene eso para el token? Una línea.
//          R: El interface muere en runtime, mientras que el string vive en memoria, hasta que se reinicie el servidor.
//          ── REIMU (corrección, Sep 6): Correcta. Y esa ES la razón de existir del token
//          string (tu carta del D22): la interface evapora al compilar, no puede ser
//          llave de registro; el string sí vive en runtime. Ayer esta exacta no conectó
//          (B.2b, token leído como API token) — hoy sí. La carta prendió. Lunes la
//          usas en carne propia.
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
// tipos. Lee el error completo, recuerda el Día 6. No lo resuelves a ciegas.

// Nota operacional (mina conocida del 2 de septiembre): si tras matar el
// server el puerto 3000 aparece ocupado, es el hijo zombi node dist/main:
// pkill -f "[d]ist/main" y verificar con ss -ltnp | grep 3000 (vacío)
// antes de relanzar. "Nada cambió tras mi fix" puede ser un muerto contestando.

// Nota de estilo: NO corras npm run format — reescribiría medio repo
// (el estilo real de los archivos difiere del config de prettier).

// ── PREDICCIONES (se escriben ANTES de cada paso, no después) ──

// P1 — Antes de levantar el server por primera vez:
// ¿Arranca limpio o truena? Si truena, ¿en qué momento?
// R: No creo que vaya a tronar. Pero, si llega a explotar op tirar error de alguna forma, será cuando empiece a explorar rutas.
// RF: Arrancó, originalmente sin querer puse en greet.controller "import { GreeterService } from "./greet.service";" cómo type y explotaba. Lección aprendida.
//          ── REIMU (corrección, Sep 7): la lección tiene DIRECCIÓN, y ahí está el oro:
//          Interfaces (solo tipos) → import type OBLIGATORIO en constructor decorado
//          (TS1272, la mina del Día 6). Clases (valores de runtime) → import NORMAL:
//          si importas una clase como type, EVAPORA justo cuando el module la necesita
//          como VALOR — tu explosión de P1, la flecha inversa. Rota en ambos sentidos,
//          por razones opuestas: tipos que faltan vs valores que evaporaste.
// P2 — Antes del primer curl (GET /greet):
// Status: 200 OK
// Body: "Esta es una prueba! Saludos!"
// R: Qué? No sé que escribir acá lol.
// RF: Correcto.
// P3 — Antes del curl del intercambio (ya cambiaste UN archivo,
// segunda implementación con el otro saludo):
// Status: 200 OK
// Body: "Saludo 2... Yuju?"
// ¿Qué archivo tocaste y qué esperas que pase con el controller?
// R: Tuve que tocar controller porque estaba hardcodeado, lo mismo con module. Todo funciona bien.
//          ── REIMU (corrección, Sep 7): dos líneas de tiempo, no las fundas: el
//          REDISEÑO (controller soldado a la clase → pasado a token) SÍ tocó el
//          controller — legítimo, el contrato aún no existía. El INTERCAMBIO (P3,
//          contrato ya vigente) tocó SOLO el module: useClass GreeterService →
//          GreeterService2. Tu controller lo demuestra: ya ni importa GreeterService.
//          El experimento vale; la predicción no — se escribió después, bajo caos.
//          Próximo swap: predicción ANTES, aunque sea una línea.
//
// ═══════════ PARTE B — LEER: el memory module de Hakkurin (LIBRO) ═══════════

// La carpeta: src/memory/ — hoy entran al cuaderno: memory.module.ts y
// memory.service.ts (los archivos chicos; crypto.service queda para el D24).

// B.1 PREDICCIÓN (antes de abrir): memory.service guarda y recupera
//     conversaciones del bot. ¿Qué depende del USUARIO que habla y qué
//     del MOMENTO en que habla? ¿Cuál de las dos esperas ver como parte
//     de la CLAVE con la que se guarda cada memoria? Una línea.
//          R: ID de usuario (Serie de números) y Mensaje. Ambos supongo.
//          ── REIMU (corrección, Sep 7): medio punto. Las dos cosas EXISTEN en el
//          sistema, pero solo UNA es la CLAVE: user_id — cada memoria vive en un
//          ARCHIVO por usuario (filePath(user_id)). El momento/mensajes son el
//          CONTENIDO guardado, no la llave. Ancla tuya: tu CLI tenía UN data.json
//          para todo; la bodega de Hakkurin es un estante POR CLIENTE. (Y el user_id
//          es string — un ID de Discord, no una serie de números tuya.)
// B.2 Abre memory.service.ts y encuentra dónde NACE una memoria nueva y
//     dónde SE LEE la vieja. ¿Quién llama a esos métodos desde fuera del
//     archivo? Una línea. (Recuerda: es un service — a él llegan llamadas
//     de métodos, no requests.)
//          R: Ambos salen de MemoryService. getMemory lee, saveMemory almacena. Todo ese sistema fué diseñado por mí en medio de una depresión fuerte XD, la que me gustaba (la única que me ha gustado, soy demisexual) por 10 años resultó ser lesbiana XDXDDXDmkpwefrehbniop, gracias por recordarmelo. Okay, volvemos, para almacenar cosas sin procesar usa addInteraction, luego de cierta cantidad de mensajes o tiempo sin interacción, hace un resumen nuevo de la memoria usando updateSummary, eso fué lo que pediste?
//          ── REIMU (corrección, Sep 7): el flujo que describiste es correcto (sí, eso
//          pedía). Falta la mitad literal de la pregunta: QUIÉN llama desde fuera —
//          tres casas: gemini.provider.ts (el cerebro), discord.service.ts (los oídos)
//          y hasta web.controller.ts (una ruta web). Llamadas de métodos, cero HTTP
//          dentro del service — igual que tu PingService. Y el mérito es tuyo: este
//          sistema lo portaste TÚ de Python. Releerlo es leer tu código viejo con
//          traje de Nest.
// B.3 Map, Date, JSON: tres piezas que TÚ ya usaste (CLI: data.json;
//     pings: la fecha del ping anterior). Encuentra UNA en memory.service
//     y di qué papel juega ahí, en una línea.
//          R: No he buscado, pero debería haber un sistema de duplicados y debería usar .map por lógica. Ah, pues no. Eh... Cuando almacena las memorias usa un .json por usuario... Ajá, ahí está, en saveMemory. Que hace? Lee un archivo de memoria, lo normaliza, luego hace stringify a un json, luego usa atomicWriteBytes para encriptar y almacenar.
//          ── REIMU (corrección, Sep 7): correcta, y encontrada MIRANDO (la predicción
//          del .map descartada contra el archivo real — así se hace). Papel exacto de
//          JSON: serializa el objeto a TEXTO antes de encriptar (JSON.stringify en
//          saveMemory). Bonus que pasaste por arriba: atomicWriteBytes escribe a .tmp
//          y RENOMBRA — imposible quedar con medio archivo escrito. Misma familia que
//          tu wx del CLI: escrituras que no mienten a medias.
// ═══════════ PARTE C — cierre conceptual ═══════════

// C.1 (entrevista) "Si TypeScript ya tiene clases, ¿para qué existe el
//     token string en la inyección?" Dos líneas, con el porqué de runtime.
//          R: Lo hace porque si solicita directamente el interface, puede (o bueno ocasionará) ocasionar problemas. Ya que en runtime  interface muere. Mientras que el Token String (aún no lo entiendo del todo) se asegura de almacenarlo en memoria Y que no muere.
//          ── REIMU (corrección, Sep 7): mitad clavada, mitad torcida. Clavada: la
//          interface muere en runtime (tu carta del D22 — hoy la usaste DOS veces, ya
//          es tuya). Torcida: el token string NO almacena nada ni mantiene vivo a
//          nadie — es solo la ETIQUETA de registro, una llave de búsqueda. Sobrevive a
//          la compilación (los strings existen en runtime) y POR ESO sirve de llave;
//          la instancia la guarda el contenedor DI. Línea de entrevista: "la interface
//          evapora al compilar; necesito una llave que viva en runtime para el registro
//          — esa llave es el token".
// C.2 Tu pieza de la Parte A: ¿quién la construyó y en qué momento exacto
//     del arranque? Una línea. (Tu gerente ya hizo esto dos veces esta
//     semana — la tercera tiene que salir redonda.)
//          R: No recuerdo el nombre exacto. El constructor de DI, en el InitLoader (se llamaba así?).
//          ── REIMU (corrección, Sep 7): instinto exacto, nombre apenas doblado:
//          InstanceLoader (no InitLoader). El gerente (contenedor DI) construyó tu
//          pieza al ARRANCAR el server, antes del primer request, cuando Nest
//          instanció el grafo de módulos. Tercera vez que lo ves esta semana —
//          cuarta va redonda sola.
// C.3 El intercambio que demostraste en la Parte A y el binding
//     { provide: 'AiBrain', useClass: GeminiProvider } de Hakkurin
//     (ai.module.ts línea 8) son EL MISMO patrón. Dalo en dos líneas:
//     cómo lo llamarías en una entrevista, y qué problema resuelve.
//          R: swap de clases. Lo que resuelve es el manipulado de clases de forma rápida y sencilla sin necesidad de modificar todo el feature, solo tienes que modificar la clase/hacer la clase nueva que necesitas y luego cambiarlo en el module.
//          ── REIMU (corrección, Sep 7): el concepto completo — lo que resuelve es el
//          ACOPLAMIENTO, y el nombre de entrevista es INVERSIÓN DE DEPENDENCIAS (la D
//          de SOLID): el controller depende del CONTRATO (interface), nunca de la
//          clase concreta; el binding provide/useClass decide quién lo cumple. "Swap
//          de clases" es la DEMOSTRACIÓN, no el nombre. Bonus: el mismo mecanismo te
//          regala tests — mañana cambias useClass por un mock y pruebas el controller
//          sin la implementación real.
// ═══════════ CIERRE ═══════════
// - Commits de hoy: el código real de la Parte A → order-api (commit tuyo,
//   Reimu pushea al cierre si lo delegas). Esta task → ts-inventory-cli.
//   Hakkurin NI UN COMMIT — sigue siendo libro.
// - Anki: las 5 cartas del D22 ya nacieron esta mañana (token DI,
//   @Injectable-marca, OnModuleInit, implements, null explícito) — la
//   tanda de hoy las incluye. Examen después de la clase.
// - Mínimo del día: Parte A + racha de Anki + comer a tiempo. Nada más.
