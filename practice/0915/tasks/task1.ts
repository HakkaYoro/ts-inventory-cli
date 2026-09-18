// TASK 0915 — Día 27: Testing — unit (Vitest) + E2E (supertest)
//
// ═══ REIMU (corrección B/C — Sep 18, vie): 7 bloques nuevos bajo B.1-C.4.
// La de C.2 era la trampa del día: la respuesta estaba en TU propio spec
// (beforeEach). Batsus de hoy salen de estas 7. ═══
// ═══ REIMU — CORRECCIONES D27 (jue 17 noche) — LEER HOY VIE 18 ANTES DE B/C ═══
// (antes del Anki también: la cola creció — 3 días + 3 D26 + 1 D19 + 4 nuevas D27)
//
// ── REIMU (corrección): W1 — ACIERTO con fix incluido. Identificaste el 200-vacío
// y el arreglado del miércoles. Era la respuesta que esta task quería destapar.
// ── REIMU (corrección): W2 — llegaste con "404 y 403" y te corregiste SOLO al
// verificar (400 pipe / 403 guard). Veredicto final correcto. El siguiente peldaño
// del reflejo: verificar ANTES de escribir la primera respuesta, no después.
// ── REIMU (corrección): W3 — correcta, y sí: estaba en el header a propósito.
// Leer el header antes de arrancar paga. Punto entero.
// ── REIMU (corrección): R.P.1 — veredicto correcto ("Pasa"), pero te quedaste a
// media predicación: el PUNTO era el contraste. Este mismo test contra el service
// del LUNES habría salido ROJO (findOne devolvía undefined, nadie lanzaba nada) —
// este test te habría cazado el bug del 200-vacío SIN abrir un solo curl. Eso es
// lo que la máquina te compra. Tu "con todos los errores" es esa historia al revés.
// ── REIMU (corrección): R.P.2 — quemada: corriste la suite a las 22:02 (diagnóstico)
// antes de contar, así que ya no quedaba nada que predecir. Y "las 10" incluía la
// del scaffold (de Santiago) — las TUYAS son 9. Regla que queda: la predicción se
// escribe ANTES de la primera corrida, aunque sea "ni idea". Registrada así, sin
// rescate — no penaliza la nota de hoy; lo que se perdió fue la medición.
// ── REIMU (corrección): PARTE A — suite 10/10 verde (verificada por mí, 23:54).
// Para la entrevista te llevas: toEqual aprendido DEL ERROR (leíste el mensaje
// completo — ese es el oficio), toThrow(NotFoundException) con la CLASE (rechaza
// explosiones ajenas), y el test falso #2 cazado SOLO ("verde vacío"). Deuda
// chica documentada: findAll por length verifica "cuántos", no "exactamente
// cuáles" — decisión tuya, defendida, válida.
// ESTADO: CALIBRADA + PRE-VERIFICADA Sep 17 (copia /tmp, vitest 5 real):
// suite de referencia del contrato = 10/10 contra el service actual del repo.
// Las minas de abajo fueron re-verificadas UNA POR UNA el jue 17 — la del
// fantasma era FALSA en la versión del lunes y hay 2 minas nuevas.
// CONTEXTO: el lunes le diste vida al service (estado en memoria, ids 1,2,3...,
// 404 propios en update/remove). El spec que Santiago migró solo dice "should
// be defined" — hoy lo conviertes en el VERIFICADOR del contrato de ayer.
// Hoy NO tocas el service para "arreglar" tests: primero escribes los tests
// CONTRA EL CONTRATO, los corres, y dejas que te digan la verdad.
//
// Minas vigentes (re-verificadas con vitest 5 real, Sep 17):
// - `npm test` corre JEST y tu spec es de Vitest — ese comando miente.
//   El que corre tus tests es: npx vitest run
// - LA SUITE FANTASMA: .stversions/ (basura de syncthing) guarda un spec con
//   el MISMO NOMBRE que el tuyo → PASARLE LA RUTA NO LO EVITA (vitest filtra
//   por nombre de archivo y el nombre coincide). El combo verificado:
//   npx vitest run --exclude "**/.stversions/**" src/orders/orders.service.spec.ts
//   Borrar la carpeta .stversions/ también la mata (es copia vieja de
//   syncthing) — tú decides.
// - LOS SPECS DE CONTROLLERS (orders.controller.spec.ts y app.controller.spec.ts,
//   los del scaffold) FALLAN bajo vitest con "cannot resolve dependencies" al
//   construir el módulo. NO es tu bug: vitest no emite la metadata de
//   decoradores que Nest usa para inyectar en CONSTRUCTORES. Tu spec del
//   SERVICE no la necesita (tu OrdersService no recibe nada en el ctor).
//   E2E bajo vitest se resuelve con config de build (swc/unplugin) — otro
//   día, no hoy. La pregunta C.4 es justo esta.
// - Si escribes un E2E llamado orders.e2e-spec.ts, vitest NI LO VE ("No test
//   files found"): su filtro exige .spec. o .test. tras un PUNTO. La
//   convención .e2e-spec era de jest. Con vitest: test/orders.spec.ts.
// - Puerto zombi: pkill -f "[d]ist/main" y verifica `ss -ltnp | grep 3000`.
// - NO corras npm run format.

// ═══════════ WARM-UP (sin pistas — una línea cada una) ═══════════

// 1. Ayer tu findOne devuelve `Order | undefined` cuando el id no existe.
//    ¿Qué responde el cliente por HTTP en ese caso? (Relee el contrato de la
//    task 0914: "Ver uno — No existe → 404". ¿Tu service lo cumple?)
//          R: Cómo no existe tira Undefined, y lanza 200. Es un bug, y ya lo corregí, le quité el undefined y dejé el throw.
// 2. Dos status que ayer mezclaste en UNA respuesta: ¿qué responde el
//    ValidationPipe global ante un body inválido, y qué responde el guard
//    ante un header faltante? Dos números, el orden de la fila te ayuda.
//          R: 404 y 403. Deja verifico... 400 Bad Request el Pipe y 403 Forbidden el Guard. Listo, ya no se me olvida creo.
// 3. `npm test` corre jest. Tu spec es de Vitest. ¿Qué comando corre TUS
//    tests? (Una línea — la mina del header te la da casi gratis.)
//          R: "npx vitest run"  me lo dijiste más arriba no?

// ═══════════ PARTE A — ESCRIBIR: tests unitarios de OrdersService ═══════════

// El cliente habla:
// "El lunes me diste una API que responde. Hoy quiero que la MÁQUINA lo
// verifique, no tus manos con curl. Escribe tests que capturen el contrato
// que me prometiste el lunes — cada línea de abajo es un comportamiento que tus
// tests tienen que demostrar. El spec que ya existe (orders.service.spec.ts)
// es tuyo: complétalo o reescríbelo, tú decides."
//
// Contrato a demostrar, test por test (describe/it en Vitest):
// - create: el PRIMER pedido creado tiene id 1; el segundo tiene id 2.
// - create: devuelve el pedido creado CON sus campos (cliente, item,
//   cantidad) y el id asignado por el server.
// - findAll: devuelve exactamente los pedidos creados (0 al inicio, 2 tras
//   crear 2).
// - findOne: con un id existente → devuelve ese pedido.
// - findOne: con un id que NO existe → el contrato de ayer dice 404.
//   En el service eso se ve como: lanza una excepción. ¿Cuál?
// - update: cambia SOLO el campo enviado (cantidad) y conserva los otros
//   (cliente, item intactos). Ese es el PATCH parcial que ayer descubriste.
// - update: id inexistente → lanza (misma familia del 404).
// - remove: el pedido deja de estar en findAll después de borrarlo.
// - remove: id inexistente → lanza.
//
// PREDICCIÓN (tu test contra tu código — la importante del día):
// Escribe PRIMERO el test de "findOne con id inexistente" exigiendo lo que
// el CONTRATO manda (que lance). Antes de correrlo, predice: ¿PASA o FALLA
// contra tu service del lunes? ¿Por qué? (Pista honesta: ¿qué devolvía tu
// findOne del lunes cuando el id no existía? Contrástalo con lo que este test
// exige. Un test que pasa sin esfuerzo a veces está verificando otra cosa.)
//          R.P.: Pasa, pero con todos los errores, luego especifiqué que era "NotFoundException" solamente.
//
// PREDICCIÓN (primera corrida): cuando corras toda la suite por primera vez,
// ¿cuántos tests pasan y cuántos fallan? (Cuéntalos ANTES de correr.) Los
// que fallen te están señalando algo de tu contrato de ayer — léelos
// completos. Predice cuáles fallan y por qué.
//          R.P.: Las 10 pasaron. No sé de que hablas lmao.
//
// Regla del día: el service del lunes NO se toca hasta que los tests hayan
// hablado. Si un test falla porque el service no cumple el contrato, el FIX
// vas a tener que decidirlo tú — y ahí está la lección. Cero tests falsos
// ("que pasan sin verificar nada"): cada test tiene que poder fallar si el
// comportamiento se rompe.

// ═══════════ PARTE B — LEER: Nest Docs (1 página, 2 secciones) ═══════════

// Página: docs.nestjs.com/fundamentals/testing
// Lee "Unit Testing" y "End-to-end testing" (la parte de supertest).
// Tres preguntas, una línea cada una:
// B.1 ¿Qué hace Test.createTestingModule() — para qué sirve el objeto que
//     devuelve y qué hace .compile()? (Es el molde de tu spec y del E2E.)
//          R: CreateTestingModule crea un módulo temporal con las dependencias que le inyectes y luego el .compile lo compila en runtime.
//          ── REIMU (corrección, Sep 18): ACIERTO completo, ambas mitades. El TestingModule
//          es un mini contenedor de DI de verdad (el "gerente" de D16 en versión
//          laboratorio) con un superpoder que el real no te da: overrideProvider()
//          para meter un mock donde iba algo real. compile() instancia y conecta
//          TODO igual que NestFactory.create() en main.ts — pero en miniatura y
//          bajo tu control. Línea de entrevista: "compile() bootstrapea, get()
//          pide al contenedor".
// B.2 ¿Qué es module.get<OrdersService>(OrdersService) en tu spec? ¿De dónde
//     sale la instancia que te da? (Conexión con el gerente del D16.)
//          R: Estoy haciendo un módulo temporal usando OrdersService sin controller. Se le pone el alias service para mayor comodidad. Y sale del orders.service.ts.
//          ── REIMU (corrección, Sep 18): ACIERTO con un matiz. La instancia NO "sale de
//          orders.service.ts" (el archivo nadie lo abre): la construyó TU módulo
//          temporal al compilar — providers: [OrdersService] la registró, y
//          .get(OrdersService) se la pide al contenedor de ESE módulo. Es
//          literalmente el gerente del D16: tú pides por nombre (la clase es el
//          token), él entrega la instancia que administra. El alias `service` es
//          puramente ergonomía — bien visto.
// B.3 Tu main.ts registra globales con app.useGlobalPipes/Interceptors/Filters
//     (ValidationPipe, LogInterceptor, ExceptionFilter). Si en un E2E creas
//     la app con createTestingModule+createNestApplication, ¿esos globales
//     aplican? ¿Cuál global SÍ aplica y por qué? (Mira dónde vive el guard:
//     app.module providers con APP_GUARD — contraste con main.ts.)
//          R: No lo especifica los docs. Pero debería ejecutarse con las 3, porqué? Porque es un test de "Mundo Real", tal cómo lo usaría el usuario si intentara hacer una petición a través del endpoint en el servidor.
//          ── REIMU (corrección, Sep 18): Mitad y mitad — y la mitad buena es la honesta:
//          cierto, los docs NO lo especifican (bien leído, no inventaste). La
//          predicción no: tu E2E con createTestingModule JAMÁS ejecuta main.ts —
//          solo lee los metadatos del AppModule. Las 3 globales de main.ts
//          (ValidationPipe, LogInterceptor, ExceptionFilter) quedan FUERA; el
//          guard SÍ aplica porque vive registrado como provider (APP_GUARD) DENTRO
//          del app.module. Verificado con corrida real el miércoles. Tu "mundo
//          real" es lo que el E2E QUIERE imitar; el harness imita hasta donde
//          llega el módulo. Si quieres las 3 adentro, las registras tú.

// ═══════════ PARTE C — cierre conceptual ═══════════

// C.1 Unit test vs E2E: ¿qué verifica cada uno, con tus archivos como
//     ejemplo (orders.service.spec.ts vs un E2E que le pega a la API)?
//     Dos líneas.
//          R: Unit Test es para probar que tu service cumpla las reglas de lo que programaste, ejemplo, lo que construí ayer. En el caso de E2E, se asegura de que esas reglas funcionen en el endpoint y no solo contra tu código.
//          ── REIMU (corrección, Sep 18): ACIERTO. Una palabra más afilada para la entrevista:
//          el unit test verifica las REGLAS del service (sin HTTP, sin server —
//          tu Lista del CLI), el E2E verifica el CONTRATO por la puerta del
//          usuario: endpoint + controller + pipes + guards + status codes.
//          "No solo tu código" = exacto.
// C.2 Tu service es singleton con estado (el array). Si un test crea un
//     pedido y el siguiente test hace findAll, ¿qué ve? ¿Qué tendrías que
//     hacer para que cada test arranque LIMPIO? Dos líneas.
//          R: Primero, ve lo que se haya creado dentro de la prueba (Dentro de un it). Si no quieres que esos datos "basura" se queden en memoria, solo tienes que hacer otro it.
//          ── REIMU (corrección, Sep 18): ACÁ ESTABA LA TRAMPA DEL DÍA y el `it` no era: los
//          it NO aíslan nada. La respuesta vivía en TU spec, en el beforeEach:
//          recompilas el módulo y service = INSTANCIA NUEVA antes de CADA test →
//          array vacío garantizado. Si hubieras creado el service UNA sola vez
//          fuera del beforeEach (o fuera el singleton real de producción), el
//          test 2 VERÍA los pedidos del test 1. Línea de entrevista: "el
//          aislamiento no lo da vitest, lo da mi beforeEach — sin él, el
//          singleton filtra estado entre tests". Esto te lo pregunta cualquier
//          senior.
// C.3 En el header hay una mina: vitest escanea .stversions/ y falla una
//     suite fantasma. ¿Qué es esa carpeta y por qué NO es un test tuyo?
//     (Una línea — pista: syncthing.)
//          R: Simplemente, vitest escanea todos los spec y los ejecuta. Al ser un spec que técnicamente no tiene nada que ver y no tiene las rutas reales para los tests, tira error. Eso es lo que me imagino que ocurre. Culpa de Syncthing.
//          ── REIMU (corrección, Sep 18): Describiste el SÍNTOMA (escanea y ejecuta el spec
//          ajeno → explota), pero la pregunta era QUÉ ES esa carpeta: el backup
//          de versiones de Syncthing — cada vez que sincroniza un cambio, guarda
//          la copia VIEJA del archivo ahí. No es código fuente: es un espejo
//          congelado de tu repo de ayer, que nadie va a mantener jamás (por eso
//          el fix es --exclude o borrarla). Tu "culpa de Syncthing" del final:
//          sí — pero esa era la pregunta, no el pie.
// C.4 La mina de los controllers: tu OrdersService no recibe NADA en su ctor;
//     OrdersController recibe ordersService. Bajo vitest tu spec del service
//     PASA y los specs de controllers mueren en "cannot resolve dependencies".
//     ¿Qué lee Nest de los constructores para saber QUÉ inyectar — y por qué
//     al service no le hace falta? (Dos líneas. Familia TS1272: lo que
//     evapora en runtime no lo puede leer nadie.)
//          R: Lee los types dentro de los importes. Explota porque en runtime los types mueren, ya que NestJS los ve como inecesarios, ya que al compilar, verifica que las reglas del type se cumplan, cuando ve que se cumplen, mata al type. En cambio, si se importa no como un type, se mantiene en todo momento en memoria.
//          ── REIMU (corrección, Sep 18): La mitad que agarraste es la familia correcta: los
//          types evaporan en runtime. Pero el mecanismo es otro: Nest lee de los
//          constructores la metadata design:paramtypes — anotaciones que el
//          compilador ESCRIBE solo si emitDecoratorMetadata está prendido. vitest
//          sin config de build NO la emite → Nest mira tu ctor y ve "no sé qué
//          inyectar" → "cannot resolve dependencies". Tu OrdersService tiene el
//          ctor VACÍO: no hay nada que resolver, por eso tu spec vive y la del
//          controller muere. (Tu "importado como type se muere, si no se
//          mantiene" es la mina TS1272 del D23 — misma familia, buena conexión.)

// ═══════════ CIERRE ═══════════
// - Commit del día: tests + (si los tests te obligan) el fix del service →
//   order-api (commit + push al cierre). La task → ts-inventory-cli.
// - Anki: retomas la tanda (la del lunes saltó por sueño + 3 cartas nuevas
//   D26 + la carta D19 de PATCH/PartialType liberada — examen después de la
//   clase, la clase fue ayer).
// - Mínimo del día: Parte A (suite corriendo con el combo del header y el veredicto
//   de cada predicción) + Anki. B y C ruedan a la tarde si la cabeza da.
// - COMER A TIEMPO. AGUA.
