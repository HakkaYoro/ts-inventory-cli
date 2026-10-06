// ═══════════════════════════════════════════════════════════════
// TASK D29 — SÁBADO 3-OCT · "La API se explica sola" · CIERRA FASE 2
// ESTADO: CALIBRADA (pre-verificada vie 2 por Reimu en copia /tmp:
// tsc limpio, /docs 200, /docs-json 200 con 6 rutas, puerto limpio).
//
// Contexto: hoy cierras NESTJS CORE. El entregable de la Fase entera
// es order-api DOCUMENTADO y limpio en GitHub. Lo que hoy agregas no
// es código nuevo de lógica — es la capa que hace que OTROS (y tú en
// una entrevista) entiendan la API sin leerte el source.
//
// AVISO de versiones (ya mapeado, para que no pierdas tiempo): el
// @nestjs/swagger que instala `npm i @nestjs/swagger` pelado es el 12,
// que EXIGE Nest 12. Tu repo va en Nest 11 → ERESOLVE. El comando que
// sí resuelve: `npm i @nestjs/swagger@^11`. Si truenan peers, no es
// tu código — es la versión.
//
// ═══ REIMU (corrección) — Oct 6, cierre D29 y FASE 2. LEER MAÑANA antes del warm-up de D30. 7 correcciones; la urgente es la de C.3 (tu spec está rojo y mañana lo renegocias). Batería de hoy verificada por mí en vivo: 9/9 — 404 cliente fantasma, 400 validación, relación sin duplicados, guard vivo. Fase 2 CERRADA. ═══
// ═══════════ WARM-UP (sin editor — responde en este archivo) ═══════════
//
// 1. C.3 de ayer quedó en cero y hoy se repara. Tu app.module.ts,
//    línea 19, dice `synchronize: true`. Explica CON TUS PALABRAS qué
//    hace TypeORM al arrancar con eso activo, y por qué está bien en
//    desarrollo y MAL en producción. (Pista de verificación, no de
//    respuesta: ¿quién creó la tabla `orders`? ¿Tú escribiste algún
//    CREATE TABLE?)
//           R.P.: Syncrhonize se encagra de crear una tabla automáticamente. Pero esto es peligroso, ya que puede dañar una base de datos previamente creadoa si se altera algo.
//          ── REIMU (corrección, Oct 6): Aprobado. Synchronize compara tus entities con las
//          tabla reales al arrancar y crea/modifica lo que falte (por eso existe `orders`
//          sin que escribieras un CREATE TABLE). Bien visto el peligro: en producción puede
//          borrar columnas enteras al "ajustar" el esquema. Nombre formal: migración
//          automática. En prod se usan migraciones explícitas. Ya vive en Anki (D28).
//
// 2. Tu spec quedó 10/10 ayer. Dos preguntas de lo que TÚ escribiste:
//    a) En tu test de findAll: `repo.find.mockResolvedValueOnce([])` y
//       luego `mockResolvedValueOnce([pedido1, pedido2])`. ¿Por qué
//       hacen falta DOS grabaciones para el MISMO método?
//    b) ¿Qué devuelve un `vi.fn()` sin ninguna grabación?
//           R.P.: a) Porque el primero setea un array de objetos vacío, ese es para la prueba de findAll vacío, el otro, es para findall con 2 entradas/objetos.
//                 b) Undefined.
//          ── REIMU (corrección, Oct 6): Correcto las dos. Vocabulario: cada Once es una
//          LLAMADA programada — se consumen en orden, una por llamada al método. Y el vi.fn()
//          pelado devuelve undefined SIEMPRE, promesa incluida (resuelve a undefined, no
//          explota). Eso era tu array [undefined, undefined] del martes.
//
// 3. El test de remove (el de las 18:xx de ayer) usa
//    `mockImplementation` con un array `pedidos` de verdad adentro.
//    Tus otros 9 tests graban respuestas fijas. Nombra UNA diferencia
//    real entre "grabar respuestas fijas" y "implementar con estado"
//    — qué PUEDE hacer el segundo que el primero no.
//           R.P.: Tuve que revisar el spec. Okay, la diferencia principal es que si se hace con respuestas fijas, no hay nada que realmente se asegure que de verdad el test sea real. En cambio implementar el estado, se asegura que con cualquier dato que le pases, se cumpla el test de forma dinámica y precisa.
//          ── REIMU (corrección, Oct 6): La idea está, una palabra más: el test con guion no
//          es "menos real" — prueba lo mismo para una secuencia EXACTA de llamadas. Lo que
//          aporta el estado: el fake REACCIONA (guarda, borra, devuelve lo acumulado). Por eso
//          tu remove-exitoso pudo borrar de verdad y el findAll posterior devolver 2, no 3.
//          Guion = teatro; estado = simulación. Es la estrella de la task de refuerzo D28-bis.
//
// ═══════════ PARTE A — SWAGGER: la API se explica sola ═══════════
//
// Hoy NO te doy el código — te doy la especificación y la fuente.
// Fuente oficial: https://docs.nestjs.com/openapi/introduction
// (sección "Bootstrap": DocumentBuilder + SwaggerModule — están a
// media página, no un mar).
//
// Objetivo: colgar una página /docs que liste tus 6 rutas y permita
// ejecutar POST /orders desde el navegador.
//
// Pasos:
// 1. `npm i @nestjs/swagger@^11` (en order-api, con el server APAGADO).
// 2. En main.ts, DESPUÉS de tus tres globals (pipe, interceptor,
//    filter) y ANTES del listen: armar el DocumentBuilder con título
//    "order-api", descripción corta tuya, versión "1.0" y un tag
//    "orders". Crear el documento y colgarlo en "docs".
// 3. Arranca el server y abre http://localhost:PORT/docs en tu
//    navegador. Lo que ves ahí es el entregable de la Fase 2.
// 4. Prueba de fuego: ejecuta POST /orders desde la propia página
//    (Try it out) con un pedido a tu gusto. ¿Te funcionó sin curl?
//    ¿O te falló? Anótalo — la respuesta correcta está en tu ApiGuard.
//
// PREDICCIÓN (antes de correr): al abrir /docs verás tus rutas
// listadas. ¿Cuál va a faltar o fallar al intentar EJECUTARLO — o
// ninguna? (La clue está en el punto 4 y en el header que tu guard
// exige.)
//           R.P.: Debería fallar al ejecutar, porque no le estoy pasando la api key al curl. Sip, exactamente, comprobado.
//
// ═══════════ PARTE B — RELACIONES: un pedido con dueño ═══════════
//
// Hoy order-api tiene pedidos sueltos. Cliente es un string. Vamos a
// darle estructura: la entity Order gana una relación real.
//
// La SPEC (qué, no cómo):
// - Nueva entity `Cliente` (nombre completo, string). Su propia tabla.
// - Order pierde la columna `cliente: string` y gana la relación:
//   un pedido pertenece a UN cliente; un cliente tiene MUCHOS pedidos.
// - La migration la sigue haciendo synchronize (dev) — al arrancar,
//    verifica con la db viva que las DOS tablas existen y están
//    conectadas (¿cómo compruebo que la FK existe sin escribir SQL?
//    pista: crea un cliente y un pedido suyo, borra el cliente y
//    mira qué pasa con el pedido — anota lo que observes).
// - El POST /orders de hoy en día recibe `cliente: string`. Diseña TÚ
//    cómo queda el create ahora: qué recibe el DTO (¿un id? ¿un
//    nombre?) y qué hace el service. Dos líneas de decisión + tu
//    código. Defiéndela en C.
//
// Trampa de decisión: tu POST podría recibir el nombre del cliente y
// crearlo siempre nuevo, o recibir un id y exigir que exista. Una de
// esas dos produce una tabla de clientes llena de "Reimu Hakurei"
// repetidos 40 veces. ¿Cuál, y por qué? Elige y defiende.

// Perdoname los acentos, mi teclado se buggeo.
//      R: Lo que hice fue lo mejor de dos mundos. Si le pasan ID, revisa si existe y auto-completa nombre completo, si no rechaza, si le pasan nombre completo crea ID y procede. Lo que si no hice la loica de si ya hay alguien con un mismo nombre o similar, me duele un poco la cabeza.
//          ── REIMU (corrección, Oct 6): El híbrido id-o-nombre es una decisión real (los
//          mayores la llaman upsert) y tu service quedó correcto — verificado en vivo: POST
//          con id 999 → 404 "No existe el cliente con ID 999"; POST con nombre → crea UNA
//          vez; POST reusando el id → NO duplica (un solo "Reimu Hakurei" en la tabla). El
//          hueco del nombre-repetido que tú mismo señalaste queda registrado. Lo que faltó
//          hoy fue la defensa ESCRITA, no la decisión.
// ═══════════ PARTE C — cierre conceptual ═══════════
//
// C.1 ¿Qué es Swagger para alguien que no lo conoce — y qué te ahorra
//     tener que escribir a mano? Dos líneas.
//      R: Swagger te permite interactuar con los endpoints de un proyecto sin tener que crear a mano un gui o tener que escribir el curl a mano.
//          ── REIMU (corrección, Oct 6): Bien. Dos precisiones de entrevista: Swagger es la
//          ESPECIFICACIÓN (OpenAPI = el formato del documento que describe tu API) y Swagger
//          UI la página que lo lee. Lo que ahorra: documentación generada DESDE el código —
//          no se desactualiza sola como un README escrito a mano.
// C.2 La trampa de la Parte B: ¿elegiste id o nombre en el POST?
//     Defiende tu decisión en 2-3 líneas (la contra-argumentación es
//     lo que se evalúa).
//      R: Lo hice asi por factibilidad y porque se usa en el mundo real. Si, tome la decision usando mis instintos, y no tengo un contra-argumento real, pero lo que te puedo asegurar es que no habran 40 "Reimu Hakurei" por cada orden, si no una sola con varias ordenes, más ordenado y menos repetitivo.
//          ── REIMU (corrección, Oct 6): La conclusión es la correcta (id → una fila, cero
//          repetidos — tu db lo demuestra) pero la defensa pedía el OTRO lado: exigir id
//          cuesta dos pasos para el PRIMER pedido y confiar en que quien llama no se equivoque
//          de número. "Se usa en el mundo real" y "mis instintos" no son argumentos — el
//          argumento es la INTEGRIDAD de la tabla clientes. Eso es lo que cae en entrevista.
// C.3 Tu spec de ayer (el 10/10): ¿qué le pasaría a tu suite si
//     mañana refactorizas OrdersService para que use la relación
//     (this.ordersRepository.findOne({ relations: ... })) y NO tocas
//     el spec? Razona en 2 líneas. (Pista: el spec mockea el repo —
//     ¿qué parte del repo mockeado dice que métodos existen?)
//      R: (Logré arreglar el teclado, dios, que feo es escribir sin acentos) No entiendo tu pregunta. Pero si no hago el refactor, ese test debería explotar, porque cambió la logica de create.
//          ── REIMU (corrección, Oct 6): La pregunta era: ¿qué pasa si el service llama
//          métodos que el fake NO tiene? Estallan en runtime: tu fake declara
//          find/findOneBy/save/remove; la primera llamada a un método no declarado es
//          undefined → TypeError. Y no es teoría: TU spec 10/10 está ROJO ahora mismo por dos
//          cosas — el Test Module no conoce ClientesRepository y los fixtures pasan cliente
//          como string cuando el DTO nuevo espera objeto. El spec es un CONTRATO con el
//          service: cuando el service cambia de forma, el spec se renegocia. Mañana lo haces
//          tú, en el warm-up.
// C.4 Fase 2 completa: escribe AQUÍ el párrafo de entrevista — "mi
//     API de pedidos usa NestJS con TypeORM sobre SQLite, documentada
//     con Swagger". ¿Qué problema real resuelve CADA pieza? Una línea
//     por pieza (Nest, TypeORM, SQLite, Swagger). Ese párrafo es el
//     que vas a decir en la entrevista de innovando.
//      R: Nest es el backend, o mejor dicho, es el motor/cerebro de todo, maneja services, controllers, guards, pipes, etc. TypeORM se encarga de traducir lo que escribas en typescript/js a llamadas de SQL, es decir, en ningún momento el dev va a lanzar comandos de sql para manejar una db, TypeORM se encarga de ello. SQLite es la base de datos, esto crea persistencia de datos entre reinicios y similar, también sirve para uno organizarse. Y Swagger es para documentar y usar/probar cada endpoint que posee tu proyecto de forma automática y ordenada.
//          ── REIMU (corrección, Oct 6): Las cuatro funciones correctas — esta respuesta está
//          a nivel entrevista. Un recorte: la persistencia la da escribir en disco; SQLite es
//          el motor que lo hace en UN archivo sin servidor aparte (cero instalación). Y a tu
//          Nest le faltó el "por qué": te impone estructura (module/controller/service) para
//          que un proyecto grande no se vuelva espagueti. Con esto queda FASE 2 CERRADA.
//
// ═══════════ CIERRE ═══════════
// - Commit: order-api (swagger + entity Cliente + relación + DTO
//   ajustado + spec si lo tocaste) → push. Task → ts-inventory-cli.
// - Anki 20-30 min SOLO deck TS (132 vencidas esperándote — 30
//   repasos/día ya configurado; NO las mates de un golpe).
// - La Fase 2 se cierra con push. Fase 3 (React) arranca DOM 4.
//
// NOTA de Reimu: el crash de "no conecta la db" de ayer ya está
// resuelto en ambas máquinas (binario better-sqlite3 compilado). Si
// te vuelve a pasar tras un npm install: `npm rebuild better-sqlite3`
// y verificar que node_modules/better-sqlite3/build/Release/
// better_sqlite3.node exista. No es tu código. Nunca lo fue.
