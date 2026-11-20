// ═══════════════════════════════════════════════════════════════
// TASK D40 — MIÉ 18-NOV · Fase 4: DDD día 2 — EL AGGREGATE ORDER
// y su Repository de dominio. Ayer hiciste el ladrillo (Money); hoy
// pones el ladrillo EN la pared: el dominio empieza a gobernar.
// ESTADO: CALIBRADA (mar 17-nov, cierre D39). Deck: 193 (57 nuevas
// esperando — NO las dejes envejecer: tanda hoy sí o sí). Repos al
// cierre de hoy: order-api tsc 0 (47147b9, Money + workspace),
// order-frontend 9/9 (0f645bc), ts-inventory e64a592 (push OK).
//
// Contexto: ayer escribiste tu primer Value Object (Money: entero no
// negativo = centavos, inmutable, equals por valor) y lo probaste con
// un test que CRUZA repos. Hoy subimos un piso: el Aggregate. Tu
// Order deja de ser "una fila con campos" y pasa a ser un objeto que
// PROTEGE sus reglas. Y el repositorio deja de ser "el de TypeORM"
// para siempre: el dominio define el SUYO en una interface pelada.
// Mañana (D41) se conecta todo. Hoy: ladrillos + una lectura.
//
// ═══ REIMU (Nov 20, cierre parte-1 D40): 6 bloques, nota parcial 8.5/20 ═══
// SÁBADO parte 2 (B.1 → C): antes de abrir el editor, relee el bloque de
// A.1(a) — la etimología de aggregate fue el hueco del día. Pregunta de
// apertura (corre el número, no lo adivines): crear(2, 500) y luego
// agregarItem(1, 700) — ¿cuánto queda el total, y ES ese el negocio que
// querías? Migraña: si el sábado la cabeza no da, B.1 sola y el día cuenta.

// ═══════ REIMU AVISO — antes del warm-up, 5 minutos ═══════
// El cierre de ayer dejó un hallazgo que se cobra HOY, en vivo.
// Lee el banner del D39 (15 bloques). El que importa es el del test
// Equals de tu Money.test.tsx. No pases al warm-up sin leerlo.
//
// ═══════════ WARM-UP (en este archivo) ═══════════
//
// 0. FIX EN VIVO del hallazgo de ayer. Abre order-frontend/src/
//     Money.test.tsx y mira tu test "Equals": sus DOS expects usan
//     .toBeFalsy y .toBeTruthy SIN paréntesis. Un matcher sin
//     paréntesis no se LLAMA: se descarta. Esos dos expects pasan
//     igual hagan lo que haga tu Money — no afirman nada.
//     (a) Arregla los dos: matcher + (). El modelo correcto está
//         EN TU MISMO ARCHIVO, 10 líneas arriba — el test "Num
//         Positivo" sí afirma: flecha + toThrow().
//     (b) PREDICE (aquí, antes de tocar nada): ¿el 9/9 seguirá en
//         9/9 después del fix, o algo se pone rojo? ¿Por qué?
//           R.P. (predicción): 9/9, porque el equals solo devuelve True o False.
//           ── REIMU (corrección, Nov 20): Predicción correcta, con razón. Matiz para la carta
//           mental: el fix no arregló el test — lo ACTIVÓ. Antes
//           pasaba sin afirmar (matcher descartado); ahora pasa
//           afirmando. Verde por casualidad no es verde por
//           evidencia. El (d) de hoy es la prueba: dos instancias
//           distintas con el mismo valor — self-equals no lo cubre.
//     (c) Corre npx vitest run en order-frontend. Resultado real:
//           R.P. (resultado): Umju, todo verde.
//     (d) La deuda de D39 que quedó escrita en el banner: agrega el
//     caso que FALTABA al Equals — dos INSTANCIAS distintas con el
//     mismo valor: new Money(3).equals(new Money(3)) debe ser true.
//     Esa es la igualdad-por-valor de verdad (self-equals no la
//     prueba). Verde otra vez y ya.
//
// 1. COBRO useCallback (3ª y última vez que la cobra el warm-up; la
//     carta d37 + tu Nav.tsx con NavLink style-callback). UNA línea:
//     ¿QUÉ estabiliza useCallback y para QUÉ servía en TU Nav?
//           R.P.: Estabiliza la referencia en memoria de la función. En el caso del nav, si no lo congelo, Nav cada que se re-renderice le pasa a los chind una función recién creada en otra dirección de memoria, haciendo que aunque sea lo mismo, a nivel de referencias de memoria, tiene otra dirección del mismo. El envolverlo, solo hace que se le pase la misma referencia estable en cada render.
//           ── REIMU (corrección, Nov 20): SALDADA — tercera cobranza, última, pagada completa:
//           estabiliza LA REFERENCIA de la función, y en tu Nav
//           evitaba pasarle a NavLink una función recién nacida
//           en cada render. "Misma referencia estable en cada
//           render" es tu línea de entrevista tal cual la dijiste.
//           Cartera useCallback: CERRADA.
//
// ═══════════ PARTE A — LECTURA PRIMERO ═══════════
//
// A.1 Lee https://martinfowler.com/bliki/DDD_Aggregate.html (2-3 min,
//     HTML crudo). OJO: el CTRL+F puede fallar con "aggregate" en
//     mayúscula al inicio — el texto está, prueba minúsculas. Dos
//     líneas:
//     (a) ¿Qué es un Aggregate en palabras TUYAS?
//           R.P.: El Aggregate son conceptos de dominio, ya sea una orden, una playlist de música, un listado de juegos, etc.  Básicamente añade cosas a un listado de elementos (valores) "Aggregates = Agregar" en un orden coordinado.
//           ── REIMU (corrección, Nov 20): LA DEL DÍA. La etimología te jugó sucio: aggregate NO
//           viene de "agregar a un listado". Es el sentido inglés
//           de conjunto/total (como "el total de las notas"). Para
//           Fowler un Aggregate es una FRONTERA de consistencia:
//           un objeto RAÍZ + todo lo que él controla, cambiados
//           JUNTOS bajo sus reglas. Tu playlist sí servía de
//           ejemplo, pero no por añadir canciones: la playlist
//           (raíz) + sus canciones se modifican juntas y nadie
//           toca una canción sin pasar por la playlist. Tu B.0 de
//           hoy ES eso: OrderDelNegocio es la frontera y crear()
//           es la única puerta. Relee (a) y reescribe con la
//           palabra "frontera" — esa es la versión de entrevista.
//     (b) Fowler dice que las referencias EXTERNAS al aggregate
//     deben apuntar al ROOT solamente. ¿Quién es el root en TU
//     sistema? (Pista: es el que tiene el id que ya usas en tu URL
//     /orders/:id.)
//           R.P.: El root es order, porque las referencias externas apuntan a su id.
//           ── REIMU (corrección, Nov 20): Cerrada EN VIVO por chat y clavada: Order, porque las
//           referencias externas apuntan a su id. La trampa
//           plural (Orders = colección) la desarmaste con la
//           pista de la URL. Crédito del chat registrado.
//
// ═══════════ PARTE B — EN TU PROYECTO ═══════════
//
// B.0 Tu primer Aggregate: src/orders/domain/entities/order.ts
//     (nueva carpeta domain/entities/ — NO toques la entity de
//     TypeORM: esa sigue viva en entities/order.entity.ts y es la
//     que habla con la DB). REGLA DDD de la casa: TS pelado, cero
//     imports del framework. La clase se llama OrderDelNegocio para
//     que no choque con la entity de TypeORM en los imports (o el
//     nombre que quieras — es TU dominio; solo evita el choque).
//     Necesita:
//       - crear un pedido VALIDADO: cantidad y total van como Value
//         Objects (tu Money de ayer y una clase CantidadDelNegocio
//         que nace HOY — mismo estilo que Money: validación en el
//         constructor, inmutable; el rango lo decides TÚ y lo
//         escribes como comentario, razón incluida — misma deuda que
//         pagaste a medias con Money)
//       - el total del pedido se CALCULA (precio × cantidad), no se
//         recibe: crea el Money adentro con new Money(precio *
//         cantidad en centavos). ¿Qué pasa si el cálculo da algo que
//         Money rechaza? ESE es el invariante en acción — el pedido
//         inválido NO PUEDE nacer.
//       - un método con nombre de negocio, no de base de datos: por
//         ejemplo agregarItem(), o el gesto que tú veas. El método
//         valida y devuelve un OrderDelNegocio NUEVO (inmutabilidad
//         — mismo gesto que tu suma() de Money).
//     PREDICCIÓN OBLIGATORIA antes de escribir (una línea aquí):
//     si totalCalc en centavos = precioUnitario * cantidad y alguien
//     pasa precio -3, ¿en qué línea exacta truena — la de Money o la
//     de OrderDelNegocio?
//           R.P. (predicción): Truena en OrderDelNegocio.
//           R.P. (resultado tras probar con node --experimental-strip-types): Sí, exactamente, y no lo añadió al aggregate.
//           ── REIMU (corrección, Nov 20): Predicción a medias + hallazgo bueno. Dijiste QUIÉN
//           pero no DÓNDE: el Error nace en el constructor de
//           MONEY (él valida negativos) pero truena en la LÍNEA
//           de tu aggregate: this.total = new Money(...). Las dos
//           mitades importan — el que lanza es Money, la línea
//           que explota es tuya. El aggregate no necesita su
//           propio if: sus Value Objects defienden la frontera.
//           Y tu observación ("no lo añadió al aggregate") es el
//           invariante en acción: lo inválido no nace. Eso, en
//           voz alta, es media C.1 ya respondida.
//           ── REIMU (corrección, Nov 20): El guión se desvió y me gusta: constructor private +
//           static crear() no lo pedía la task — decisión propia y
//           MÁS estricta que el enunciado (nadie hace new fuera
//           de tus puertas). El comentario de rango con razón en
//           CantidadDelNegocio: deuda de ayer PAGADA. Registros
//           menores: (1) el archivo vive en order.entity.ts dentro
//           de domain/entities (la task decía order.ts) — tu razón
//           anti-choque es válida, queda así; (2) agregarItem
//           reutiliza cantidad.suma(): transferencia del patrón de
//           Money, bien vista. Mañana en B.1 una palabra manda:
//           implements.
//
// B.1 El Repository del dominio: src/orders/domain/repositories/
//     orders.repository.ts — UNA interface pelada. Sin TypeORM, sin
//     Nest, sin import de la entity de TypeORM (puede importar type
//     del dominio: OrderDelNegocio). Firma mínima: buscarPorId,
//     guardar, buscarTodos. PREGUNTA de diseño (responde aquí):
//     ¿por qué la interface NO puede importar tu order.entity.ts de
//     TypeORM sin romper la regla de la casa? UNA línea.
//           R.P.:
//
// B.2 LA PRUEBA DE FUEGO (la del día): en order-api/src/orders/
//     crea typeorm-orders.repository.ts QUE IMPLEMENTE la interface:
//     `implements OrdersRepository` en una clase que SÍ puede usar
//     TypeORM (@InjectRepository y todo — está AFUERA del dominio,
//     en el mundo real, donde los frameworks viven). Trampa de
//     decisión del día: el adapter necesita convertir entre la
//     entity de TypeORM y tu OrderDelNegocio (la DB habla "filas",
//     el dominio habla "negocio"). ¿Dónde nace esa conversión —
//     dentro del adapter, o fuera? TÚ decides y defiendes en el R.P.
//     (no hay respuesta única; hay respuesta defendida).
//           R.P. (decisión + razón):
//
// B.3 Mini-test del aggregate: mismo patrón de ayer — el test vive
//     en order-frontend/src/order-domain.test.ts (el runner es de
//     allá; REGLA DEL ÁRBOL de D39) e importa de
//     ../../order-api/src/orders/domain/entities/order.ts. TRES its:
//     (1) crear válido → total correcto en centavos; (2) precio
//     negativo → throw (predicción primero: ¿quién lanza?); (3) dos
//     OrderDelNegocio con los mismos datos de negocio NO son
//     iguales por referencia — pero sus TOTALES (Money) sí son
//     equals. Ese contraste ES la lección de la semana: Entity vs
//     Value Object en un solo test.
//           R.P. (predicción it-2: ¿Money o OrderDelNegocio lanza?):
//           R.P. (resultado):
//
// ═══════════ PARTE C — cierre conceptual ═══════════
//
// C.1 Interview line: "¿Qué es un Aggregate y por qué el repositorio
//     del dominio es una interface?" Dos líneas. (Pista: ayer tu
//     dominio no dependía del framework. ¿Qué ganaste HOY al
//     duplicar esa jugada con el repositorio?)
//           R.P.:
//
// C.2 Tu OrdersService de Nest (el que ya funciona) sigue usando el
//     Repository de TypeORM directamente. HOY no lo tocas. ¿Cuándo
//     será necesario que lo cambie — qué evento lo obligaría? Dos
//     líneas. (Pista: piensa en QUÉ dependiera del service para que
//     cambiar la DB no lo tocara.)
//           R.P.:
//
// C.3 OrderDelNegocio tiene una deuda de SIMETRÍA con tu Money: Money
//     es inmutable y suma() devuelve nuevo; tu aggregate también
//     devuelve nuevo en su método de negocio. ¿Por qué el aggregate
//     NECESITA un id entonces, si es inmutable como Money? UNA línea.
//     (Esta es la pregunta C.2 de ayer en verso diferente.)
//           R.P.:
//
// C.4 Sincero (la de ayer salió barata — esta es la última del
//     estilo): D40-D42 son el refactor pesado de Fase 4. ¿Qué parte
//     del rompecabezas que declaraste ayer ya se ve menos negro?
//     Dos líneas.
//           R.P.:
//
// ═══════════ CIERRE ═══════════
// - tsc 0 en order-api (npx tsc --noEmit) — con el adapter B.2 vivo.
// - vitest: order-frontend 12/12 esperados (Contador 5 + Money 4
//   con el fix del warm-up incluido + order-domain 3 nuevos). Si tu
//   cuenta da otra cosa, revisa el (d) del warm-up.
// - Commits: order-api (domain/entities + repositories + adapter) +
//   order-frontend (order-domain.test.ts + fix Equals) +
//   ts-inventory (esta task).
// - Anki tanda HOY SÍ O SÍ (57 nuevas esperando — no las dejes
//   envejecer más) + batsu. Dormir a tiempo.
//
// NOTA de Reimu: el paso de ayer (Money) era un ladrillo suelto.
// Hoy el dominio empieza a GOBERNAR: el pedido inválido no puede
// nacer, y la DB pasó a ser un detalle que vive afuera. Si el
// adapter B.2 te hace sentir que escribes "lo mismo dos veces",
// acertaste: la duplicación es deliberada y temporal — mañana (D41)
// el service de Nest empieza a hablar el idioma del dominio y la
// entity vieja se vuelve la caché de la DB, no el corazón.
//
// FOOTER de links: A.1 = martinfowler.com/bliki/DDD_Aggregate.html
// (VERIFICADA viva el 17-nov: HTTP 200, 18 menciones de "aggregate",
// "root" ×3 — el bliki se llama DDD_Aggregate, NO "Aggregate" a secas:
// esa URL da 404. Si el CTRL+F falla, minúsculas primero.)
//
