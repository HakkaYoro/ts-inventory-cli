// ═══════════════════════════════════════════════════════════════
// TASK D41 — MAR 24-NOV · Fase 4 día 3 — EL SERVICE CAMBIA DE IDIOMA
// ESTADO: CERRADA — parte 1 (W+A) mar 24-nov: 8.5/20; parte 2 (B+C) jue 26-nov: 14/20. Deck: 199 (64 nuevas
// esperando — tanda esta semana sí o sí). Repos al cierre de hoy:
// order-api e82828a (interface + OrdersORM + columna precio),
// order-frontend e7f0786 (12/12), ts-inventory 7e63861 (push OK).
//
// Contexto: tu OrdersService habla TypeORM DIRECTO (Repository<Order>
// en su constructor). Tu OrdersORM existe, compila, implementa la
// interface... y NADIE la usa: orders.module.ts línea 11 dice
// providers: [OrdersService] y nada más. Hoy conectas todo: el
// service pasa a pedir TU interface, y el adapter cobra su primer
// salario. Registro CONCRETO (orden tuya): todo lo de hoy nombra
// archivos tuyos, líneas tuyas, resultados que puedes correr.
//
// ═══════ REIMU (corrección, Nov 26 — cierre parte 2) ═══════
// LEER MAÑANA ANTES DEL WARM-UP del D42. 8 bloques. D41 cerrada: parte 2
// 14/20 (parte 1 fue 8.5). Lo que importa: (1) B.2 — tus dos decisiones
// con razón propia, lo mejor del día; (2) C.2 primera mitad, tu mejor
// respuesta escrita; (3) C.1 quedó floja: ES la línea de entrevista de la
// inversión y se cobra mañana. Tu confesión LLM queda aceptada: casi todo
// B.1 salió de mi lista exacta. El cobro de mañana es explicar TU código de
// hoy con tus palabras. Mañana task SUAVE (la pediste): el spec vuelve a
// verde hablando el idioma de tu interface.
//
// ═══════ REIMU (corrección, Nov 24 — cierre parte 1) ═══════
// LEER ANTES DE LA PARTE B (jueves 26). 7 bloques: W.0 ×3 (el de
// (a) es el que importa: "seguridad" NO es la razón del private),
// W.1 ×2 (tu boot cazó una capa que mi calibración no vio — el mejor
// hallazgo del día), A.1 ×2. La mina cambió de forma: el server NO
// bootea completo (el sync truna en la SQL, antes del dominio). Tu
// B.2 del jueves ahora decide TAMBIÉN cómo desbloquear el boot
// (¿columna nullable? ¿default? ¿qué pasa con las 212 viejas?) —
// decisión + comentario, como siempre. Hoy: almuerzo tranquilo y
// derma a las 16:00. El día ya contó.
//
// ═══════ REIMU AVISO — antes del warm-up ═══════
// Banner v2 del D40 (8 bloques) — el de la confesión LLM es el de
// HOY. No pases al warm-up sin leerlo.
//
// ═══════════ WARM-UP ═══════════
//
// 0. COBRO LLM (regla de la casa, prometido el viernes). Abre
//     order-api/src/orders/domain/entities/order.entity.ts y
//     explica EN VOZ ALTA (o escrito aquí, línea por línea):
//     (a) por qué el constructor es private y crear() es static;
//          R: El constructor es privado porque son popiedades que no deben ser vistas fuera de la clase, que deben ser inaccesibles a menos que se use un method explicito en la clase, es más que todos razones de seguridad. Mientras que crear() es static porque es más que todo porque pertenece más a los planos de la clase que a cualquier objeto específico que se cree dentro de la clase. Además que se usa más que todo para métodos donde se usen cálculos matemáticos o métodos fábricadores de objetos.
//          ── REIMU (corrección, Nov 24): (a) a medias. El private NO es
//          "seguridad" ni esconder propiedades: es el INVARIANTE. Si el
//          constructor es privado, la única puerta es crear(), y crear()
//          valida — nada inválido nace. Tu Money hace exactamente eso en
//          su constructor. "Planos de la clase" para static: bien, crear()
//          existe sin instancia previa. Línea de entrevista: "el constructor
//          privado garantiza que todo Order nace válido".
//     (b) línea 13 — this.total = new Money(precio * cantidad.value):
//         si precio llega -300, ¿QUIÉN lanza y DÓNDE explota?
//          R: Lanza primero cantidad si es invalida al hacer crear(), luego new Money lanza el errror dentro de Money.validate del constructor.
//          ── REIMU (corrección, Nov 24): (b) CORRECTO, verificado contra tu
//          archivo: crear() arma CantidadDelNegocio PRIMERO y Money después
//          (mira el orden dentro de crear() y del constructor) — cantidad
//          truena antes, y si pasa, Money en el constructor. El orden que
//          dijiste es el orden real de las líneas. Y "tuve que indagar dentro
//          del código" es EXACTAMENTE el cobro: explicar lo que el LLM
//          escribió con tus estructuras dictadas.
//     (c) agregarItem: ¿qué reutiliza de CantidadDelNegocio y qué
//         devuelve?
//          R:  Reutiliza suma y su validador interno, y devuelve una nueva instancia de order del negocio, nunca modifica la original.
//     Si las explicas fluido, la ayuda fue válida y el tema cierra.
//     Si algo no puedes explicarlo, márcalo aquí — eso es lo que se
//     estudia hoy, sin castigo.
//           R.P. (lo que explicó / lo que no pudo): AHí te expliqué más arriba, A, súper fácil, B y C si tuve que indagar dentro del código un poco para explicarte.
//          ── REIMU (corrección, Nov 24): termómetro SALDADO — A fluido, B y C
//          con indagación = la ayuda fue válida y la deuda LLM del D40 queda
//          pagada. (c) correcta también: suma() revalida porque construye una
//          CantidadDelNegocio NUEVA, y devuelves instancia nueva con la
//          original intacta. Del (a) queda solo el frame (invariante, no
//          secreto) — va como carta nueva con la tanda del jueves.
//
// 1. LA MINA EN VIVO (predicción ANTES — esta no la viste nunca):
//     tu tabla "order" tiene 212 filas y NO tiene columna precio
//     (verificado por mí anoche, directo en el SQLite). Tu entity de
//     TypeORM SÍ la declara, y app.module.ts tiene synchronize: true.
//     (a) PREDICE: botas el server (npm run start:dev) → TypeORM
//         sincroniza el esquema → ¿qué valor queda en precio para
//         las 212 filas VIEJAS? ¿Y qué va a pasar cuando algo intente
//         OrderDelNegocio.crear() con ese valor?
//           R.P. (predicción): Queda NULL o NOT NULL porque se me olvidó colocar un valor default, y fallaría al mifrar las 212 filas.
//          ── REIMU (corrección, Nov 24): predicción a medias pero con el pie
//          derecho: dudaste "NULL o NOT NULL" y pegó la mitad real (NOT NULL,
//          sin default, al migrar). El instinto "se me olvidó el default" era
//          la causa exacta. La próxima: elige UNA y dila con su porqué — el
//          hedge de dos respuestas no escala a una entrevista.
//     (b) Bótalo de verdad. Si el GET /orders truen, lee el stack con
//         calma: la línea que mencione Money es la frontera trabajando.
//         No rompes nada — las filas viejas siguen ahí.
//     (c) Resultado real + UNA línea de por qué:
//           R.P. (resultado): "NOT NULL constraint failed: temporary_order.precio", get orders no arrancó porque no llegó a crusar la frontera de Money. El sync intentó copiar las filas viejas a una tabla temporal sin completar precio, y sqlite rechaza la columna not null.
//          ── REIMU (corrección, Nov 24): el hallazgo del día, y mío también:
//          mi mina estaba calibrada una capa más adentro (NULL → Money truena);
//          tu boot mostró que la SQL frena el sync ANTES de que el dominio
//          vea algo — tabla temporal + columna NOT NULL + 212 filas sin
//          precio = constraint rechazado. Lo reproduje yo mismo en una copia
//          de tu esquema: mismo error. Tu "no llegó a cruzar la frontera de
//          Money" lo dice completo. En entrevista esto tiene nombre: por eso
//          synchronize no va a producción y existen las migraciones. Jueves:
//          tu B.2 decide cómo desbloquear el boot.
//
// ═══════════ PARTE A — LECTURA CORTA ═══════════
//
// A.1 Lee https://docs.nestjs.com/fundamentals/custom-providers
//     (verificada viva HOY: 200, "DI token" ×5, useClass ×6). Solo
//     hasta terminar la parte de useClass — no hace falta más. Dos
//     líneas:
//     (a) ¿Qué le dice Nest a un provider declarado como
//         { provide: X, useClass: Y }? ¿Quién es X y quién es Y ahí?
//           R.P.: Cuando alguien me pida X entrégale una instancia de Y. Dpmde X es un token, puede ser un string, símbolo o una clase usada cómo llave. Mientras que Y es la implementación concreta, la que Nest instanciará.
//          ── REIMU (corrección, Nov 24): (a) correcto y completo — X es el
//          token (la llave), Y la implementación que Nest instancia. Con una
//          errata ("Dpmde") que no cambia nada. Esta frase es literalmente
//          el gesto de B.0 del jueves.
//     (b) Tu greet.module.ts línea 7 YA hace esto con "Saludo":
//         ¿quién decide qué clase se inyecta ahí, y qué habría que
//         tocar para cambiarla por otra clase distinta?
//           R.P.: Lo decide el módulo en providers. Para cambiarla se toca únicamente useClass en esa linea, lo demás queda intacto.
//          ── REIMU (corrección, Nov 24): (b) correcto — se toca UNA línea
//          (useClass) y el consumidor ni se entera. Eso es lo que ganas el
//          jueves en B.1: el service pide la interface, y quién la implementa
//          se decide en el module. Ese día lo haces con OrdersRepository.
//
// ═══════════ PARTE B — EN TU PROYECTO ═══════════
//
// B.0 REGISTRA EL ADAPTER. orders.module.ts, línea 11:
//     providers: [OrdersService]. Tu OrdersORM necesita vivir ahí
//     para que Nest pueda inyectarla. Usa useClass con TU interface
//     como token — el molde EXACTO ya lo escribiste tú en
//     greet.module.ts ("Saludo"), y A.1 lo explica. PREDICCIÓN antes
//     de escribir una línea: si registras
//     { provide: OrdersRepository, useClass: OrdersORM },
//     ¿qué le llega a un constructor que pida OrdersRepository — la
//     interface, o la clase OrdersORM? UNA línea.
//           R.P. (predicción): El interface no?
//           R.P. (resultado — tsc dice): No dice nada. Todo bien.
//          ── REIMU (corrección, Nov 26): el resultado bien leído ("tsc no dice nada"),
//          la predicción sin responder: "¿el interface no?" es una duda, no una línea.
//          Respuesta para que la digas tú mañana: una interface no puede llegar a
//          ningún constructor, nadie puede hacer new de ella. useClass instancia la
//          CLASE (OrdersORM); la interface es solo el tipo que tsc te deja ver. Detalle
//          tuyo válido que nadie pidió: registraste el token como string
//          ("OrdersRepository") en vez de la interface — funciona porque tu @Inject usa
//          EXACTAMENTE ese string. Un carácter distinto y truena en runtime, no en tsc.
//
// B.1 EL GESTO DEL DÍA: orders.service.ts, líneas 12-13 — el
//     constructor pide @InjectRepository(Order) Repository<Order>.
//     Cámbialo para pedir TU OrdersRepository en su lugar (la forma
//     de pedir un token así la usaste en greet.controller.ts línea 6).
//     El repo de Clientes NO se toca hoy — clientes no es parte de
//     este refactor. Los métodos públicos del service (create,
//     findAll, findOne, update, remove) siguen existiendo todos.
//     PREDICCIÓN obligatoria ANTES de tocar nada: tu interface tiene
//     3 métodos (buscarPorId, guardar, buscarTodos); tu service usa
//     hoy save, findOneBy, find, remove del repo TypeORM. ¿Cuáles de
//     esos gestos existen en TU interface y cuáles NO?
//           R.P. (predicción): Ninguno de los gestos usados por el service existe en la interfaz.
//           R.P. (qué pasó cuando tsc vio el service nuevo): Reportó 6 errores.
//          ── REIMU (corrección, Nov 26): predicción exacta ("ninguno existe") — esa
//          era toda la respuesta del ítem. El gesto quedó hecho: el service pide tu
//          interface, tsc 0 (lo corrí yo sobre tu repo). Pero manda tu confesión: casi
//          todo B.1 salió de la lista exacta que te di (void, findAll, findOne,
//          eliminar, update, it.todo), y eso rebaja el bloque. Dato tuyo que vale:
//          dijiste que PRIMERO pusiste `order` y lo deshiciste por miedo al error de
//          void. Estabas bien. Error nuevo no significa que lo anterior estaba mal.
//          Cobro de mañana: explicar por qué guardar(order) y no guardar(newItem), y
//          por qué create devuelve void.
//
// B.2 EL PRECIO QUE NO EXISTE. Tu CreateOrderDto trae cliente, item,
//     cantidad — y NADA más (verificado). Pero OrderDelNegocio.crear()
//     EXIGE precioUnitarioCentavos. Decisión TUYA, no mía: ¿de dónde
//     sale el precio en el create() de tu service? (Columna nueva en
//     el DTO con validación propia, ¿? precio por defecto marcado con
//     TODO mientras la DB migra, ¿? otra vía que veas.) Escribe la
//     decisión, la razón, y DEJA EL COMENTARIO en el código al lado
//     de donde decidas — la regla de siempre: decisión sin comentario
//     = decisión inexistente.
//              Predicción: No inicia, synchronize ve que falta precio, pero cuando sqlite recrea la tabla con la columna not null y sin default, eso hace que precio llegue como Null y el insert falla con NOT NULL constraint failed: temporary_order.precio.
//           R.P. (decisión + razón): Decidí que el precio llega en el DTO porque todavía no hay catálogo del que sacarlo, y siento que es mejor no colocar un default en 0 cómo se me había ocurrido originalmente el martes. Decidí nullable, y es mejor así que un default 0, porque un 0 diría que pagaron 0, cosa que sería inventarse datos.
//          ── REIMU (corrección, Nov 26): lo mejor del día. Dos decisiones con razón
//          propia y un solo principio detrás ("no me invento datos"): precio en el DTO
//          porque no hay catálogo, y columna nullable porque NULL dice "no sé cuánto
//          pagaron" mientras que 0 diría "pagaron 0". Verificado en tu DB: precio
//          nullable, 212 filas en NULL, boot desbloqueado. Predicción del boot
//          correcta. Lo que no viste (lo corrí con el server arriba):
//          crear(fila.cantidad, null) calcula null * cantidad, y en JS eso da 0 →
//          Money(0). Tu DB dice "no sé" y tu API responde total 0 en los 212. Ese
//          contraste es la C.3 del D42.
//
// B.3 LA PRUEBA DEL DÍA (server vivo, tres curl con R.P.):
//     (a) POST /orders con un pedido nuevo (con precio, si tu
//         decisión B.2 lo pide) → ¿qué responde?
//     (b) GET /orders → ¿los 212 viejos pasan, truenan, o depende de
//         tu B.2? Describe lo que VEAS (con el error exacto si truen).
//     (c) GET /orders/9999 (no existe) → ¿qué responde: el
//         NotFoundException de tu service, o el throw "No existe esa
//         ID! Baka!" de tu adapter? UNA línea: ¿qué contrato ganó?
//           R.P. (a): 500 porque OrderDelNegocio no tiene item ni cliente.
//           R.P. (b): 200, los 212 viejos pasan y no truena.
//           R.P. (c): 500, no sale 404 con el error del throw.
//          ── REIMU (corrección, Nov 26): (a) y (c) correctas — las reproduje: POST 500
//          (SqliteError: NOT NULL constraint failed: order.item — el INSERT llega sin
//          item), GET /orders/9999 500 con tu throw "No existe esa ID! Baka!" saliendo
//          de typeorm-orders.repository.ts línea 17. (b) a medias: es verdad que pasan
//          (200, 212 filas), pero "describe lo que VEAS" pedía el cuerpo. Cada pedido
//          viejo llega así: {cantidad: {value: 2}, precioUnitarioCentavos: null, total:
//          {value: 0}}. Sin id, sin cliente, sin item: es tu OrderDelNegocio
//          serializado tal cual. A (c) le faltó la línea del contrato — la escribiste
//          bien en C.2.
//
// ═══════════ PARTE C — cierre conceptual ═══════════
//
// C.1 Interview line: "¿Qué ganaste invirtiendo la dependencia del
//     service?" (Pista: el viernes dejaste C.2 en "ni idea" — hoy la
//     respuesta pasó frente a tus ojos. Tu service pide TU interface;
//     si mañana la DB entera cambia, ¿QUÉ archivo se toca y cuál
//     queda intacto?) Dos líneas.
//           R.P.: Se cambua order.entity y ya.
//          ── REIMU (corrección, Nov 26): floja y ambigua. ¿Cuál de tus DOS
//          order.entity? Y el "y ya" sobra. Respuesta completa con tus archivos: si la
//          DB entera cambia, se tocan typeorm-orders.repository.ts (el adapter: ahí
//          viven las consultas) y entities/order.entity.ts (la entity de TypeORM).
//          Quedan intactos: orders.service.ts, orders.controller.ts, la interface y el
//          dominio. Ese "intactos" es lo que ganaste hoy al invertir, y es LA línea de
//          entrevista del día. Mañana la dices con tus palabras, sin mirar este bloque.
//
// C.2 El contrato desalineado (hallazgo del viernes): tu interface
//     promete null si no hay fila; tu adapter lanza throw. Hoy que tu
//     service consume TU interface: cuando la fila no existe, ¿qué
//     contrato se cumplió de verdad en tu B.3(c) — el de la interface
//     o el del adapter? ¿Y por qué Nest no pudo avisarte de la
//     diferencia? Dos líneas. (Pista para lo segundo: la interface
//     vive en el dominio, TS pelado... ¿quién la ejecuta?)
//           R.P.: Se cumple el del adapter, la interfface promete OrderDelNegocio | null mientras quien corrió en realidad fué OrdersORM.buscarPorId, el cual lanza, así que el service recibió el throw (500) y nunca vió un null.
//          ── REIMU (corrección, Nov 26): la primera mitad es la mejor respuesta
//          escrita del día: se cumplió el contrato del adapter, el service recibió el
//          throw (500) y nunca vio un null. Falta la segunda: ¿por qué Nest no pudo
//          avisarte? Porque la interface es TypeScript pelado: solo existe para tsc,
//          nadie la ejecuta. tsc comprueba que OrdersORM TENGA un método buscarPorId
//          con esa firma; no comprueba lo que el método hace por dentro. Por eso una
//          firma que promete null y un cuerpo que lanza compilan sin queja. Decidir el
//          contrato (¿null o throw?) y cumplirlo en el adapter es tarea del D43, no de
//          mañana.
//
// C.3 Tu OrdersORM.guardar() llena cantidad y precio... y NO llena
//     item ni cliente. Mira las columnas reales de tu tabla "order"
//     (son 4 además del id). ¿Tu guardar está roto o incompleto? ¿Qué
//     le falta para guardar un pedido COMPLETO de verdad? Dos líneas.
//           R.P.: Está incompleto, falta item y cliente.
//          ── REIMU (corrección, Nov 26): correcto y corto. guardar llena cantidad y
//          precio, no item ni cliente — por eso el POST da 500. La causa está una capa
//          más adentro: tu OrderDelNegocio tampoco tiene item, ni cliente, ni id, así
//          que el adapter no tiene de dónde sacarlos. Arreglarlo es engordar el
//          agregado y completar el adapter: tarea grande, va DESPUÉS de la suave de
//          mañana. Hoy no lo toques.
//
// C.4 Sincera y corta (la pediste tú): hoy el registro fue concreto —
//     tus archivos, tus líneas, todo verificable. ¿Se entendió mejor
//     la task así? UNA línea sí, UNA línea no. Sin filtro.
//           R.P.:Realmente fué una mejora, pero siento que aún le falta un poquito más, hay cosas que las siento abstractas/pesadas y algo complicadas de entender, pero en sí es una mejoría.
//          ── REIMU (corrección, Nov 26): veredicto aceptado tal cual: mejora real,
//          pero aún abstracto y pesado en partes. Hoy lo comprobaste en vivo: cuando te
//          perdiste, lo que te sacó fue una lista exacta, línea por línea, y una sola
//          cosa por ronda. Ese es el registro del D42: concreto, corto, un objetivo por
//          paso. Lo abstracto (C.1, C.2) va después del código, no antes.
//
// ═══════════ CIERRE ═══════════
// - tsc 0 en order-api (npx tsc --noEmit).
// - vitest 12/12 en order-frontend (hoy no se tocan los tests).
// - Los 3 curl de B.3 con sus R.P. llenos.
// - Commits: order-api (module + service + DTO si lo tocaste) +
//   ts-inventory (esta task).
// - Anki: tanda (64 esperando — esta semana sí o sí) + batsu.
// - COMER A TIEMPO. Hoy no hubo desayuno: mañana sí. Con migraña no
//   se negocia — la comida es parte del stack técnico.
//
// NOTA de Reimu: el viernes escribí "mañana el service empieza a
// hablar el idioma del dominio" — es HOY. Lo que va a doler (el
// precio que falta, las 212 filas viejas tronando en Money) NO es
// ruido: es lo que SIEMPRE pasa cuando un dominio estricto conoce
// datos viejos. En la entrevista eso tiene nombre: migración. Que
// te haya pasado EN CASA con tu propia DB es un lujo.
//
// FOOTER de links: A.1 = docs.nestjs.com/fundamentals/custom-providers
// (VERIFICADA viva el 23-nov: HTTP 200, useClass ×6, "DI token" ×5).
// Anclas de TU repo verificadas HOY: greet.module.ts línea 7
// (provide "Saludo" + useClass), greet.controller.ts línea 6
// (@Inject("Saludo")), orders.module.ts línea 11, orders.service.ts
// líneas 12-13, tabla "order" = 4 columnas + id, 212 filas, sin precio.
//
