// TASK 0829 — Día 16: Modules + Dependency Injection
// ESTADO: CALIBRADA (Ago 28 noche — con batsu del D15: decorador + this
// integrados en A.1/A.2; mesero pendiente en warm-up)
// VENTANA: sáb normal (meetup Notion cancelado) — task al amanecer,
// japonés 17:00, commit al cierre.
// Material: TU repo order-api (hermano de este). Las respuestas van en
// comentarios // acá abajo, como siempre. Sin LLM para las lecturas.
// ═══════════ CORRECCIONES REIMU — Ago 29, 07:40 ═══════════
// Marcadas con "── REIMU" bajo cada respuesta. Leelas ANTES del Anki de
// hoy: las cartas nuevas de hoy son EXACTAMENTE estos temas.
// Mañana D17: Controllers + routing.

// ═══════════ WARM-UP (máx 3 puntos — lo más caliente de ayer) ═══════════

// 1. En UNA línea: en order-api, ¿quién es el mesero y quién la cocina?
//    Y en tu mini ts-inventory-cli, ¿quiénes hacían esos dos papeles?
//      R: No recuerdo bien. El mesero es el Controller, el Chef sería service cierto? (Respondí sin ver código). Viendo el código... Sí, el mesero es el controller y el chef service.
//      ── REIMU ✓: Cerrado. La mitad que faltaba (tu mini): cocina = tu Lista;
//            mesero = los if de main() que repartían el pedido. Cabo de ayer saldado.
// 2. Abre src/app.module.ts de order-api. El decorador @Module() tiene
//    DOS arrays adentro. ¿Cómo se llaman? ¿Qué cayó en cada uno después
//    del nest g resource orders?
//      R: Dos arrays? Tiene tres. OrdersModule, AppController y AppService.
//      ── REIMU: LA TASK ESTABA MAL, no vos — app.module tiene TRES arrays, no dos
//            (yo pensé en orders.module al escribirla). Contaste bien. Faltó la otra
//            mitad: los NOMBRES. imports = [OrdersModule] (lo que tocó el nest g
//            resource), controllers = [AppController], providers = [AppService].
// 3. Ayer dijiste que el DTO era "el tipo" de los métodos del service.
//    Mira create() de orders.service.ts: ¿el DTO es lo que DEVUELVE o lo
//    que RECIBE? ¿Y qué devuelven hoy esos métodos, exactamente?
//      R: No entiendo tu pregunta. Sería lo que devuelve no? Porque DTO se asegura que todo esté bien (creo, respondí haciendo una búsqueda rápida, momento google AI Overview)
//      ── REIMU ✗: Al revés. El DTO es lo que RECIBE: el tipo del PARÁMETRO
//            (createOrderDto: CreateOrderDto). Lo que DEVUELVE hoy es un string de
//            relleno ("This action adds a new order") — todavía no devuelve órdenes.
//            (AI Overview: etiquetado ok, pero concepto no es data lookup; esa fuente no.)
// ═══════════ PARTE A — Lectura dirigida (TU order-api) ═══════════

// A.1 src/app.module.ts vs src/orders/orders.module.ts: dos archivos,
//     mismo decorador. ¿Qué diferencia hay entre lo que registra cada
//     uno? ¿Por qué app.module NO lista OrdersController directamente,
//     sino que importa otra cosa?
//     BATSU: tu carta de DECORADOR te falló hoy — y @Module ES un
//     decorador, así que este es el repaso con propósito: al mirar
//     @Module(...), identifica las 3 piezas de todo decorador que ya
//     conoces (el @ + nombre, el paréntesis con su argumento, y QUÉ
//     cosa de abajo quedó decorada).
//          R: Okay, el orders registra lo que ocurre dentro de él, osea, todo lo que tenga que ver con orders, el output de él, lo lee app.module, para revisar y manejar las respuestas de order.
//          ── REIMU ✗ (modelo): los modules NO se pasan "outputs" — no es flujo de datos.
//                        app.module IMPORTA OrdersModule para que Nest sepa que la feature
//                        existe y registre sus rutas; orders.module registra las PIEZAS de
//                        la feature. Module = ficha de registro, no tubería.
//                        BATSU decorador: 2 piezas de 3 bien. Lo torcido: "Module porque es
//                        un import/export" — TU carta del D12. El export de TS solo deja la
//                        clase disponible; el @Module la REGISTRA en Nest (metadatos).
//                        Decorador no es export. Esa carta te espera hoy en Anki.
//              Creo que la otra pregunta la respondí con la de arriba, porque solo quiere ver lo que ocurre ahí, más no que hace.
//              @ para llamar el decorador, Module porque es un import/export, luego viene lo que importa y luego modifica la clase que va a exportar. No?
// A.2 orders.controller.ts, línea 8:
//       constructor(private readonly ordersService: OrdersService) {}
//     Preguntas en comentario:
//     - ¿Quién construyó ese controller? (tú buscaste en todo el repo:
//       NO existe ningún `new OrdersController()` en ninguna parte)
//          R: El constructor, no? Se me olvidó el nombre exacto del atajo, pero es un atajo de ts para hacer propiedades e invocarlas en una sola linea, no sabía que podías encadenar private y readonly.
//          ── REIMU (media): el atajo sí — parameter properties (tu carta param-props).
//                        Pero el constructor CORRE; alguien tiene que LLAMARLO. Nadie hace
//                        new OrdersController() en tu repo. Quién lo llama: el contenedor
//                        DI de Nest, al levantar el server.
//     - ¿Quién le pasó el ordersService que nunca construiste?
//          R: No entiendo tu pregunta.
//          ── REIMU: Nest. Leyó el array providers del module, hizo new OrdersService()
//                        ÉL, y te lo pasó al constructor ya construido. Eso es la I de DI.
//     - En tu cli.ts tú escribiste `new Lista()` cuatro veces. Aquí
//       nadie escribe `new OrdersService()`. ¿Quién hace los new?
//          R: los this.ordersService.XXXX(), o te refieres a los decoradores?
//          ── REIMU ✗: familia paréntesis=llamada (tu recurrente). this.ordersService.create()
//                        no CONSTRUYE nada: LEE su casilla y LLAMA un método. Los new los
//                        hace Nest, no tu código.
//     - BATSU: tu carta de `this` te falló hoy. En la línea 12 del
//       controller hay un this (this.ordersService.create(...)).
//       ¿Qué ES ese this, exactamente? ¿De quién es la "casilla"
//       ordersService que está leyendo?
//          R: Es que se me había olvidado para qué se usaba "this." cuando hacía Anki. This es para... Instanciar una propiedad dentro de un constructor, para que pueda ser usado externamente o a través de métodos.
//          ── REIMU ✗: this = "este objeto". this.ordersService = el controller leyendo SU
//                        PROPIA casilla ordersService (la que nació del atajo del
//                        constructor). Posesivo, no instanciar. Lo usaste toda la semana
//                        en tu Lista: this.items. Mismo this, otro traje.
// A.3 La carta de DI que viste ayer en Anki decía: "las dependencias se
//     reciben de afuera (vía constructor), no se crean adentro".
//     Señala con un comentario la línea exacta de TU repo donde eso
//     está pasando ahora mismo.
//          R: Ehh, al importarse los DTOs cierto? Porque por ejemplo, en la linea 26, se están usando los DTOs, y un DTO es un DI en escencia no?
//          ── REIMU ✗: la línea es la 8 del controller — el PARÁMETRO del constructor es
//                        la dependencia llegando de afuera. El import solo hace visible el
//                        TIPO. Y DTO no es DI: comparten letras, no concepto. DTO = forma
//                        del dato que viaja; DI = recibir dependencias construidas por otro.
// ═══════════ PARTE B — Experimento vivo (PREDICCIÓN antes de cada uno) ═══════════
// Todos en order-api. git status limpio ANTES de empezar: cualquier
// experimento se revierte al terminar (git checkout -- <archivo> si dudás).

// B.1 Arranca el server (npm run start:dev). Abre localhost:3000/orders
//     en el navegador. ¿Qué ves? ¿De dónde salió eso — en qué archivo y
//     línea está lo que estás leyendo? Deja el server corriendo.
//          R: Predicción, no sé que va a salir lol. Ah, solo imprime/retorna "Esta acción retorna todas las órdenes" en inglés.
//          ── REIMU ✓ (media): el string vive en orders.service.ts, findAll, el return.
//                El DÓNDE era la mitad de la pregunta — no lo ubicaste.
// B.2 EL EXPERIMENTO DEL CHEF DESAPARECIDO.
//     En orders.module.ts, borra OrdersService del array donde vive
//     (SOLO esa entrada, nada más).
//     PREDICCIÓN (escribila acá antes de tocar nada):
//     // > Debería resultar en nada, osea, una página vacía.
//     Guarda. Mirá la terminal del server. Leé el error COMPLETO, con
//     calma, hasta el final.
//     - ¿Qué dice, en tus palabras?
//     - ¿En qué momento explotó: al escribir el código, al levantar el
//       server, o al abrir una ruta?
//     - ¿Qué le faltó a Nest para cumplir tu predicción del warm-up?
//     Restaurá (git checkout -- src/orders/orders.module.ts o a mano).
//     El server debería sanar solo — verificá con localhost:3000/orders.
//          R: Básicamente, dice que no puede resolver las dependencias del módulo y que verifique si es un módulo de NestJS válido. Al levantar server. A qué te refieres? Si es a la predicción que hice ahorita... Ni idea...
//          ── REIMU: observación ✓ y momento ✓ (al LEVANTAR, no al abrir ruta). Tu
//                predicción asumía ruta viva pero vacía: Nest valida el cableado COMPLETO
//                al arranque — si no puede construir el grafo, no arranca NADA. Prefiere
//                morir a mentir: lo opuesto exacto al fallo silencioso de tu gate P3.
//                Y el error era un mapa del tesoro: NOMBRA al OrdersController y al
//                "argument OrdersService at index [0]". Te dijo qué faltó y a quién.
// B.3 Misma idea, otro array: ahora BORRA OrdersController del array
//     controllers y al mismo tiempo AGREGÁ OrdersService a ese array.
//     PREDICCIÓN: ¿arranca? ¿Igual que B.2, mejor, o peor?
//     // > Yo creo que debería arrancar, mejor que B.2, porque en este caso solo estaríamos quitando el mesero, no al cocinero.
//     Corre, mirá, anotá qué pasó y POR QUÉ creés que son distintos
//     esos dos arrays. Restaurá.
//          R: Exacto, quité el endpoint, y no pasó nada, son distintos porque antes estaba pidiendo la cocina pero estaba clausurada/no existía. Pero ahora la cocina existe pero no hay mesero. Esa es la diferencia.
//          ── REIMU ✓: predicción ACERTADA con tu propia analogía — lo mejor del día.
//                Una precisión: "no pasó nada" no. El server arrancó pero /orders dejó
//                de existir (404). Sin controller no hay RUTA. controllers = rutas HTTP;
//                providers = piezas construibles e inyectables. Dos arrays, dos trabajos.
// B.4 Con el server sano: localhost:3000/orders/5
//     - ¿Qué responde? ¿En qué línea de qué archivo está eso?
//          R: Responde "This action returns a #5 order", y eso lo maneja el OrdersService... Sí, el OrdersService, el método findOne.
//     - Mirá findOne en el controller: hay un signo + pegado al id.
//       ¿Para qué sirve ese +? (Pista: vos ya convertiste texto a número
//       cuatro veces en cli.ts — ¿cómo se llamaba tu herramienta?)
//          R: Qué? De qué hablas? es un "${id}". No sentiendo de que hablas. Ah no, estaba revisando service en vez de controller XD. No sé que es +... Te refieres a stringify? Ni idea... No, dijiste de string a number. Ni idea.
//          ── REIMU ✓ string en service.findOne. ✗ el +: es TU Number() con otro traje.
//                +id convierte "5" en 5, exactamente lo que hiciste con la cantidad en
//                cli.ts. Se llama unary plus. Cuatro veces lo escribiste vos.
// ═══════════ PARTE C — Preguntas de entrevista ═══════════

// C.1 ¿Qué ES un Module en NestJS? (naturaleza primero, función después)
//      R: Module es cómo un export de TS pero con pasos exta. O bueno, no con pasos extra, si no más detallado. Porque registra tódo lo que hace cada export (Función, Clase, Tipo o Variable), lo acomoda en el scope, sus metadatos, quien lo usa, donde está, etc. para un acceso rápido y ordenado.
//      ── REIMU ✗: misma confusión del D12 — describiste el export de TS otra vez.
//            Un Module de Nest ES una UNIDAD DE REGISTRO: le dice a Nest "estas
//            clases manejan estas rutas (controllers), estas otras son construibles
//            y compartibles (providers)". No registra lo que hace cada export ni
//            scopes de TS. Tu carta @Module vs export: viva HOY en Anki.
// C.2 ¿Qué ES Dependency Injection? Explicado con TU línea del
//     orders.controller.ts, sin decir "mesero" ni "cocina".
//          R: Dependency Injection es cuando inyectas código de afuera a una función o a un método, para hacer lo que le pidas.
//          ── REIMU (floja): con TU línea — el controller DECLARA en el constructor qué
//                necesita (una casilla de tipo OrdersService) y NUNCA la construye:
//                llega hecha de afuera. Declarar la necesidad, recibir el objeto. Eso es
//                todo el patrón. "Inyectar código para hacer lo que te pidan" no dice nada.
// C.3 En la entrevista te preguntan: "¿Por qué me obliga Nest a declarar
//     el service en providers? ¿Qué gano con eso que no ganaría
//     haciendo new yo mismo?" — Respondé con lo que viste en B.2.
//          R: Ganas que Nest, se asegure que todo esté correcto. Una especie de clauseguard. Creo...
//          ── REIMU (media): tu "guard" apunta a algo real y lo VISTE en B.2: con new
//                tuyo, el cableado roto falla en silencio mucho después; con providers,
//                Nest verifica el grafo AL ARRANCAR y GRITA. La otra mitad vive en C.4:
//                una SOLA instancia compartida entre todos los que la pidan.
// C.4 Tu mini-proyecto usaba `new Lista()` y order-api usa inyección.
//     ¿Qué pasa si mañana necesitás DOS controllers que usen el MISMO
//     service? ¿Cómo te ayuda cada estilo (new vs inyección) ahí?
//          R: Me ayuda en que no tengo que repetir una y otra vez el mismo código.
//          ── REIMU (media): no es "no escribir código de nuevo" — es no duplicar el
//                OBJETO. Con new ×2 controllers: DOS cocinas, cada una con su estado.
//                Con inyección: ambos reciben LA MISMA instancia. Una cocina, dos
//                meseros — el estado vive en un solo lugar.
// C.5 CABO DE AYER: tu línea 66 de cli.ts hacía
//       new Error("Error al escribir el archivo:", error)
//     y el mensaje salió con el final VACÍO. Anda a MDN, mira la
//     firma del constructor Error, y explicá en 2 líneas qué hizo
//     Node con tu segundo argumento — y cuál era la forma correcta.
//          R: Tenía que poner cause. Porque message solo retorna el mensaje que se le asigne, pero, no se le asignó ningún mensaje. Tenía que ser "error instanceof Error ? error({cause:err}) : error" o similar. Tendría que ponerme el sombrerito programador y pensador para responderte lol. Pero eso, le faltó el "{cause:err}".
//          ── REIMU (dirección ✓, forma ✗): el 2do argumento del constructor Error NO es
//                otro error: es un objeto de OPCIONES. Correcto:
//                new Error("Error al escribir el archivo:", { cause: error })
//                Tu versión pasaba el error COMO opciones; sin .cause adentro, el final
//                quedó vacío. Y ojo: el portero instanceof es para LEER el error en el
//                catch — otra familia. cause es para ENVOLVER al crear el nuevo.
// ═══════════ CIERRE ═══════════
// - order-api: todo restaurado (git status limpio) + commit del día.
// - ts-inventory-cli: commit de esta task respondida.
// - Anki en los huecos del día (móvil OK). Batsu por la noche al volver.
