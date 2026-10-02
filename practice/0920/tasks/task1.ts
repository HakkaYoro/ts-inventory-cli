// TASK 0920 — Día 28: Configuration (@nestjs/config) + TypeORM intro (SQLite)
//
// ═══ REIMU (vie 25, cuarentena): el virus se recrudeció — viernes
// perdido también (día LIBRE, cuarentena médica de Marisa con veto
// absoluto al editor, cero culpa; tu warm-up 1 del miércoles sigue
// salvado en el repo — eso no se pierde). Sábado y domingo: reposo
// CIERRE VIÉ 2-oct (jue 1 = jueves libre): el spec quedó 4/10 el mié 30
// y se cortó por niebla — desplazar, no comprimir. D29 cierra Fase 2 el
// SÁB 3-oct; Fase 3 arranca DOM 4. ETA movida a JUE 12-nov, techo ~19-nov.
//
// ESTADO: diseñada y pre-verificada sáb 19 (copia en /tmp: tsc limpio,
// batería curl 9/9 contra server real, suite con repo mockeado 3/3, y LA
// prueba de persistencia: pedido creado → server matado → server relevado
// → el pedido SIGUE ahí).
//
// CONTEXTO: tu order-api vive con un array EN MEMORIA (orders.service.ts).
// Ese array muere cada vez que el server se apaga. Hoy le das a la API dos
// cosas que un backend de verdad exige: configuración externa (.env) y
// persistencia real (SQLite vía TypeORM). El CRUD, el guard, el pipe, el
// filtro, tu suite de ayer: TODO se queda — cambia lo que hay DEBAJO.
//
// Minas del día (verificadas hoy en la copia):
// - `npm test` corre JEST y miente. Tu suite corre con:
//   npx vitest run --exclude "**/.stversions/**" src/orders/orders.service.spec.ts
// - sqlite3 (el paquete de los tutoriales viejos) está desactualizado y en
//   esta máquina el npm bloquea install scripts (binding nativo sin bajar).
//   Si al arrancar el server truena con error de binding/node-gyp:
//   npm uninstall sqlite3 && npm install better-sqlite3
//   y en forRoot el type es "better-sqlite3". (Si instala limpio, no toques
//   nada — el driver moderno es la mejor decisión de todos modos.)
// - Puerto zombi (familia D19): pkill -f "[d]ist/main" + ss -ltnp | grep 3000.
// - NO corras npm run format.
// - El .env NO se commitea (ya vive en .gitignore — verifica con git status
//   que no aparece). Para eso existe .env.example: la plantilla SIN secretos.
//
// ═══════════ WARM-UP (sin pistas — una línea cada una) ═══════════
//
// 1. Si el server se reinicia ahora mismo (Ctrl+C y npm run start), ¿qué
//    pasa con los pedidos que ya creaste? ¿Dónde viven HOY?
//      R: No viven en ningún lado, se mueren en memoria. Ojo, suponiendo que no te refieres a los tests con los pedidos hardcodeados.
// 2. Tu guard quema el string "orden-secreta" en el código, y el repo se
//    sube a GitHub. ¿Por qué eso es un problema?
//          R: Es un problema porque literalmente está hardcodeado y expuesto. En un prod real no funciona así, son tokens dinámicas o similar. Además que si el proyecto se sube a github, se expone la api key del programa. Si acaso el "orden-secreta" debería estar almacenado en un .env.
// 3. Tu spec de ayer construye el módulo con providers: [OrdersService].
//    Si el service pasa a necesitar un Repository inyectado en su
//    constructor, ¿qué le falta a ESE módulo del spec? ("Ni idea" vale.)
//          R: No recuerdo que era "Repository". Obviamente repositorio, pero repositorio de qué?
// ═══════════ PARTE A — CONFIG: el guard deja de quemar strings ═══════════
//
// 1. npm install @nestjs/config
// 2. Crea .env en la raíz de order-api con dos líneas (PORT y API_KEY con
//    el valor de siempre) y .env.example idéntico pero con un valor FALSO
//    en API_KEY (la plantilla que sí se commitea).
// 3. En app.module.ts: ConfigModule.forRoot({ isGlobal: true }) como primer
//    import del módulo. (Andamio dado. El isGlobal resuelve el mismo debate
//    de "¿quién importa qué?" de los módulos: con isGlobal, CUALQUIER
//    módulo puede inyectar ConfigService sin importar nada.)
// 4. El guard: inyecta ConfigService por constructor y que la clave
//    esperada salga de config.get("API_KEY"). Cero strings quemados.
//    Decide tú el caso borde: ¿qué pasa si la clave no está definida?
//    (Esa decisión es de seguridad: fail-open vs fail-closed.)
//
// BATERÍA (predicciones ESCRITAS antes de cada curl — las 4):
// - P1: curl sin header → ¿código?
//          R.P.: 400.
// - P2: curl con el header correcto → ¿200 o 403? ¿POR QUÉ? (Sigue la
//   cadena completa: .env → ConfigModule → guard.)
//          R.P.: 200. Porque sería una ApiKey valida.
// - P3: cambia el valor de API_KEY en .env, guarda, y corre el MISMO curl
//   SIN reiniciar nada → ¿qué esperas? Después reinicia el server y prueba
//   otra vez. (start:dev observa archivos .ts — ¿observa .env?)
//          R.P.: Debería observar .env, porque está viendo todos los archivos, debería rechazar sin reiniciar. No, No lo reconstruye, tengo que reiniciar s[i o s[i, pero por lo menos no esta hardcodeado]]
// - P4: borra .env (sí, bórralo) y llama con CUALQUIER header → ¿la API
//   queda ABIERTA o CERRADA? ¿Qué parte de TU implementación decide eso?
//   Después restaura el .env.
//          R.P.: Queda cerrada, lo decide el !== (En el guard, pero no recuerdo exactamente porque.)
//
// ═══════════ PARTE B — TYPEORM: el array se vuelve tabla ═══════════
//
// 1. npm install @nestjs/typeorm typeorm better-sqlite3
// 2. La entidad: la clase Order ya existe en
//    src/orders/entities/order.entity.ts con id/cliente/item/cantidad.
//    Conviértela en entidad de verdad: @Entity() en la clase,
//    @PrimaryGeneratedColumn() en id, @Column() en el resto. EL MISMO
//    nombre de clase y LOS MISMOS cuatro campos: tu spec de ayer no debe
//    enterarse del cambio.
// 3. OrdersModule: TypeOrmModule.forFeature([Order]) en imports. (El
//    forFeature es el "esta entidad vive AQUÍ" — registro local del
//    módulo, la misma lógica de siempre.)
// 4. app.module.ts — andamio dado (el forRoot es LA conexión global):
//      TypeOrmModule.forRoot({
//        type: "better-sqlite3",
//        database: "order-data.sqlite",
//        autoLoadEntities: true,
//        synchronize: true,
//      }),
// 5. El service: fuera el array, adentro el Repository. Constructor con
//    @InjectRepository(Order). Cada método delega en su primo del
//    Repository (la API del repo es el espejo de lo que ya haces: para
//    crear+guardar, listar, buscar uno por campo, borrar — los ves con
//    autocompletado y docs). Los 404 de findOne/update/remove CON EL
//    MISMO MENSAJE de siempre ("Baka!" incluido): tu filtro y tus tests
//    dependen de él. Y toda la familia se vuelve async (familia D11:
//    async/await + Promise).
//
// PREDICCIÓN ESTRELLA (ANTES de correr CUALQUIER cosa tras el paso 4):
// cuando corras tu suite de ayer (10/10) contra el service nuevo, ¿qué
// pasa: verde, roja, o explota? ¿DÓNDE exactamente y qué ERROR textual?
// (Pista honesta: tu spec registra OrdersService y NADA más en providers.
// El service nuevo pide algo en su constructor. ¿Quién se lo da?)
//          R.P.:Va a salir en rojo. Creo que sería de "Esto no está dentro de la instancia Promise<Object>". Verificado, Dice que no puede resolver las dependencias. (Esto fu@e antes del Service). Solo 1 verde
//
// Después del veredicto, convierte el spec: providers: [OrdersService,
// { provide: getRepositoryToken(Order), useValue: {...} }] — el useValue
// lo decides TÚ: qué métodos del repo fingir y qué devuelve cada uno.
// Mínimo verificable: should be defined + create delega y devuelve el
// pedido con id + findOne inexistente lanza. OJO: los métodos del service
// ahora son async — las expectativas cambian de forma (await +
// rejects.toThrow: familia D11 otra vez).
//
// PREDICCIÓN (primera corrida del spec convertido): ¿cuántos verdes?
//          R.P.: que..? Creo que fueron 2, no recuerdo.
//
// LA PRUEBA DEL DÍA (al final de todo): crea un pedido por curl, MATA el
// server (Ctrl+C), levántalo otra vez, GET /orders. ¿Está? Eso era
// imposible ayer. Guarda esa evidencia para C.4.
//
// ═══════════ PARTE C — cierre conceptual ═══════════
//
// C.1 ¿Qué problema real de tu guard de ayer resuelve @nestjs/config?
//     Dos líneas.
//      R: El hardcodeo de valores dentro del proyecto.
// C.2 Entity vs DTO: los dos describen "un pedido". ¿Para qué vive cada
//     uno y por qué NO son lo mismo? (Uno vive pegado a la DB, el otro
//     describe una petición HTTP. Dos líneas.)
//      R: El DTO interfiere con los datos que pasan a través de la petición HTTPS, si son válidos, pasan luego a través del entity, si no son válidos, directamente los rechaza el DTO.
// C.3 synchronize: true — ¿qué hace por ti y por qué es cómodo en
//     desarrollo? ¿Por qué NUNCA en producción? (1-2 líneas.)
//      R: No sé de que hablas, nunca lo usé.
// C.4 Cuenta la prueba del día: ¿qué viste al reiniciar el server y por
//     qué era imposible con el array? Dos líneas — esta respuesta es la
//     que va en la entrevista.
//      R: El array se mantenía en la RAM, al matar el proceso, obviamente se borraba el proceso de la RAM. En el caso de la DB, se escribe en disco, así que siempre se mantiene vivo en disco.
// ═══════════ CIERRE ═══════════
// - Commit del día → order-api (package.json + .env.example + entity +
//   módulos + service + spec) y push al cierre. La task → ts-inventory-cli.
// - Anki: tanda del día + 2-3 cartas nuevas de D28 (ConfigModule/
//   ConfigService, forFeature/getRepositoryToken, synchronize).
// - Mínimo del día: warm-up + Parte A completa (con sus 4 predicciones) +
//   Anki. La Parte B es la sesión de la tarde.
// - COMER A TIEMPO. AGUA.
