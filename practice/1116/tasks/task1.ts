// ═══════════════════════════════════════════════════════════════
// TASK D39 — LUN 16-NOV · Fase 4: DDD día 1 (qué es + Bounded
// Contexts + Entity vs Value Object). Arrancas fase nueva con el
// MISMO order-api de siempre, visto con otros ojos.
// ESTADO: CALIBRADA (dom 15-nov, cierre D38). Deck: 189 tras la
// tanda del d38 (las nuevas quedan esperando + las que nazcan hoy).
// Repos al cierre de anoche: tsc 0 en order-api (re-corrido hoy por
// mí antes de calibrar: npx tsc --noEmit → 0 errores). Sin prisa:
// territorio nuevo — el enunciado mide ejecución, no velocity.
//
// ═══ REIMU (cierre D39, mar 17-nov): FASE 4 DÍA 1 — 15 correcciones nuevas. LEER TODAS antes de la D40. La importante: la del Equals de B.3 — tu test quedó 9/9 VERDE pero dos expects no afirmaban nada: el verde te mintió. ═══
//
// Contexto: Fase 3 cerró ayer 🎉 — tu React está probado y tsc 0.
// Hoy empieza la FASE 4: el mismo order-api que ya conoces, visto
// con otros ojos. DDD no es una librería: es una forma de organizar
// el código para que hable el idioma del NEGOCIO (pedidos, clientes,
// montos) y no el de la base de datos. Hoy: LEER Fowler primero
// (regla de la casa), escribir tu primer Value Object, y anclarlo
// TODO a tu Order real. Mañana (D40) se refactoriza con calma.
//
// ═══════════ WARM-UP (sin editor — responde en este archivo) ═══════════
//
// 0. Lee el banner REIMU del cierre D38 (11 bloques) — LEER
//    PRIMERO. La de B.3 (regex getByText matcheando más de un nodo)
//    es el hallazgo de la semana. ¿Cuál de las 11 te sirve MÁS para
//    lo que viene (Fase 4: refactor)? Una línea.
//           R.P.: El de testing.
//          ── REIMU (corrección, Nov 17): Correcto pero genérico. El que aplica a Fase 4
//          es el de B.3: la task/el enunciado puede mentir y tu verificación viva gana.
//          Hoy lo viviste OTRA vez: el 9/9 verde de tu Money.test.tsx escondía dos
//          expects vacíos (ver B.3 abajo). En refactor DDD, un test que no afirma es
//          peor que no tener test: te da confianza falsa.
//
// 1. COBRO useCallback pendiente de W.0 del miércoles: en UNA
//    línea, ¿QUÉ estabiliza useCallback y en qué caso de TU Nav.tsx
//    aplicaba? (Pista: la carta d37 + el style-callback de NavLink.)
//    No te doy la respuesta — dímela tú.
//           R.P.: Se usa para reutilizar referencias ya renderizadas, para no tener que re-renderizar.
//          ── REIMU (corrección, Nov 17): Sigue invertida (carta d37 pendiente de madurar).
//          useCallback estabiliza la REFERENCIA de una función entre renders: devuelve
//          la MISMA función (misma dirección) mientras sus deps no cambien. No evita
//          re-renders por sí solo — evita que los DEPENDIENTES re-rendericen porque la
//          prop que reciben no cambió. En tu Nav.tsx: el style-callback de NavLink se
//          recreaba en cada render → useCallback lo frena. Cobro en D40/warm-up.
//
// 2. COBRO C.2: ¿por qué tu spec de Fase 2 mockeaba el Repository
//    y tu Contador.test.tsx no mockeó NADA? UNA línea. (La bisagra:
//    dependencias AFUERA del código bajo prueba.)
//           R.P.: Porque justo ahora solo tocaba botones y cosas que ya estaban en el mismo frontend. En cambio en la fase 2 tenía que mockear los valores dentro de las bases de datos.
//          ── REIMU (corrección, Nov 17): La CONCLUSIÓN correcta con la razón a medias.
//          El criterio no es frontend-vs-backend: es si el código bajo prueba habla con
//          algo AFUERA de él. Tu spec de orders.service usía un Repository (habla con
//          una DB) → se mockea. Tu Contador es useState puro (no habla con nadie) → no
//          hay NADA que mockear. Pregunta de entrevista: "¿qué mockeas?" → "lo que cruza
//          la frontera". Nota: tu Money.test.tsx de HOY tampoco mockeó — mismo criterio.
//
// ═══════════ PARTE A — LECTURA PRIMERO (regla de la casa) ═══════════
//
// A.1 Lee https://martinfowler.com/bliki/DomainDrivenDesign.html
//     (son ~2 min de lectura; es HTML crudo sin JS: el texto
//     COMPLETO está en la página — si el título no dice "Domain-
//     Driven Design", es que no cargó). Dos líneas:
//     (a) ¿Cuál es la idea central de DDD en palabras TUYAS?
//           R.P.: Que tanto Desarrollador-Experto del negocio usen en mismo vocabulario para hablar sobre el mismo código. Por ejemplo, administradores en el código también sea administradores para los demás que usen el programa, lo mismo con clientes, usuarios, etc. Un lenguaje obicuo.
//          ── REIMU (corrección, Nov 17): Bien, con tu ejemplo propio encima — eso es la
//          respuesta completa. Dos detalles: es "ubicuo" (typo), y la palabra clave que
//          te faltó nombrar: el código usa el vocabulario del NEGOCIO, no de la DB.
//          "order" vive en tu URL porque el negocio habla de pedidos.
//     (b) Fowler habla de construir el modelo con el LENGUAJE del
//     dominio (Ubiquitous Language). ¿Qué lenguaje es ese en TU
//     order-api? Nombra 3 sustantivos de tu negocio.
//           R.P.: Clientes, Pedidos e Items
//          ── REIMU (corrección, Nov 17): Los tres correctos. Ojo: dos son Entities
//          (Clientes tiene id propio) y uno es un campo string (item). Mañana (D40) esa
//          diferencia se vuelve código: la Entity lleva el id, el Value Object no.
//
// A.2 Lee https://martinfowler.com/bliki/ValueObject.html (HTML
//     crudo, el texto está — no te asustes si el CTRL+F no encuentra
//     una palabra exacta, prueba otra). Dos líneas:
//     (a) ¿Qué hace diferente a un Value Object de una clase con
//     setters?
//           R.P.: Que es un objeto compuesto. Cuya igualdad no depende de donde está guardado en la memoria si no de sus valores.
//          ── REIMU (corrección, Nov 17): El concepto clave está (igualdad por valor, no
//          por referencia — eso lo articulaste perfecto). Lo del "objeto compuesto" no
//          es requisito: un VO puede envolver UN solo valor (tu Money.value es un number
//          pelado). Lo que lo hace VO es inmutabilidad + igualdad por valor + sin id.
//     (b) ¿Por qué dos Value Objects con el mismo valor pueden ser
//     intercambiables sin miedo?
//           R.P.: Por su inmutabilidad y falta de identidad.
//          ── REIMU (corrección, Nov 17): Correcto y completo. Esta es la carta que vas
//          a recitar en la entrevista. Tu Money ya lo hace: suma() devuelve NUEVO Money,
//          nunca toca this.value.
//
// ═══════════ PARTE B — EN TU PROYECTO ═══════════
//
// B.0 Tu primer Value Object: src/orders/domain/value-objects/money.ts
//     (la carpeta domain/ NO existe aún — créala tú; el enunciado
//     nombra rutas, lección de D35). REGLA DDD de la casa: SIN
//     framework Nest — TS pelado. Cero imports. La idea: el dominio
//     no depende de nada. Necesita:
//       - creación validada (monto negativo = error, lanza)
//       - suma (add) — ¿muta a this o devuelve un Money nuevo?
//       - comparación (equals) — ¿compara referencia o valor?
//     TRAMPA de decisión (la única del día, no hay respuesta única):
//     ¿Money guarda number pelado o centavos enteros? TÚ eliges,
//     escríbelo como comentario junto al campo, y defiende tu
//     DECISIÓN + razón en el R.P. — lo que importa es la decisión,
//     no cuál elegiste.
//           R.P. (decisión + razón): Números enteros porque (Aunque no me gusta la idea) se aproximan los valores de los decimales. A menos que haga una función que arregle ese problema automáticamente. Es mejor números enteros y ya.
//          ── REIMU (corrección, Nov 17): Decisión CORRECTA (enteros = centavos), razón a
//          medias: "se aproximan los decimales" no dice quién. La razón completa la viste
//          TÚ en el REPL: los doubles guardan aproximaciones binarias (0.1+0.2 = 0.30000
//          000000000004, 19.99*100 = 1998.9999...) y con centavos enteros ese error NO
//          puede entrar al dominio. DEUDA del enunciado cumplida por ti a medias: el
//          comentario junto al campo NO está en money.ts — la decisión sin documentar no
//          existe para el que lee el código. Agrégalo en D40 (2 líneas). También: el 0
//          legal (value < 0) quedó sin razón escrita — decisión suelta.
//
// B.1 PREDICCIÓN OBLIGATORIA antes de probar nada: ¿qué pasa si
//     intentas new Money(-5)? (¿lanza? ¿acepta? ¿devuelve algo
//     raro?) Escribe tu predicción AQUÍ, DESPUÉS prueba.
//           R.P. (predicción): Lanza error.
//          ── REIMU (corrección, Nov 17): Predicción correcta y ANTES de correr, como manda
//          la ley. "con cosas extras" (el resultado) = el stack trace — eso es el error
//          SIN envolver, que ya conoces de Fase 2. Sin cargo aquí.
//     Prueba SIN framework, dos opciones (verificadas AMBAS en esta
//     máquina hoy 15-nov con un Money real: lancé -5 y lo rechazó):
//       Opción A) tsx (ya vive en tu node_modules global):
//         npx tsx order-api/src/orders/domain/value-objects/money.ts
//         — para que imprima algo, agrega al final del archivo (y
//         quítalo después) el patrón "main check": un if que compare
//         import.meta.url con la URL del módulo que Node ejecutó.
//       Opción B) Node moderno SIN instalar nada:
//         node --experimental-strip-types order-api/src/orders/domain/value-objects/money.ts
//     ¿Lanzó o aceptó el -5? ¿Coincidió con tu predicción?
//           R.P. (resultado): See, lanza error con cosas extras.
//
// B.2 Conecta con TU Order actual: abre order-api/src/orders/
//     entities/order.entity.ts — la que escribiste en Fase 1 con
//     TypeORM — y mira SUS campos reales. ¿Cuáles son candidatos a
//     VO según lo que leíste en A.2? Márcalos con la razón. NO los
//     refactorices AÚN (eso es mañana). Pista: ¿cuál NO tiene id
//     propio y se define por su valor?
//           R.P.: Siento que sería solo cantidad en un principio. Porque Cliente o Item es solo not empty y string.
//          ── REIMU (corrección, Nov 17): cantidad correcto. Pero la razón de los otros
//          dos está invertida: candidato a VO no es "lo que solo tiene not empty". La
//          pregunta del enunciado era: ¿cuál NO tiene identidad propia y se define por su
//          valor? item (string) TAMBIÉN es candidato: si dos pedidos dicen "arepa", es
//          LA MISMA cosa — igualdad por valor. cliente es el que NO: cada cliente tiene
//          id propio → es Entity. En D40 esto se vuelve código: item suena a VO.
//
// B.3 Mini-test del Money: en order-frontend/src/ escribe
//     money.test.ts (junto a Contador.test.tsx — vitest SOLO escanea
//     dentro de su root; verificado en vivo por Reimu: un test en
//     practice/1116 queda FUERA del scan y da "No test files found").
//     El import CRUZA al repo hermano:
//       import { Money } from
//         "../../order-api/src/orders/domain/value-objects/money.ts";
//     — extensión .ts incluida (allowImportingTsExtensions) y ruta
//     relativa ../../ (order-api es hermano de order-frontend).
//     Contenido: sum + equals verdes + UNA línea extra que ya viste
//     en B.1: el rechazo del negativo (create(-5) → throw).
//     REGLA DEL ÁRBOL: el test vive en order-frontend (ahí corre tu
//     runner), pero el money.ts queda en order-api — no acoples el
//     dominio al frontend. PREDICE antes de correr: si el import
//     apuntara a un Money que NO existe, ¿quién caza el error y
//     dónde — vitest al correr, o algo antes de que corra?
//           R.P. (predicción): Vitest al correr, o mejor dicho, Biome o el mismo VScode debería insultarme.
//           R.P. (resultado): Si, fue biome, y luego vitest al correr.
//          ── REIMU (corrección, Nov 17): Predicción acertada por triplicado (editor antes,
//          runner después) y verificada. PERO aquí está el hallazgo del día, el que te
//          cobro fuerte: TU TEST TENÍA DOS EXPECTS VACÍOS. En Equals escribiste
//          .toBeFalsy y .toBeTruthy SIN paréntesis — eso no llama al matcher: crea la
//          REFERENCIA de la función y la descarta. expect(uno.equals(dos)).toBeFalsy
//          equivale a expect(false) sin aserción: PASA SIEMPRE. Solo el test
//          "Equals" quedó vacío (sus DOS expects). "Num Positivo" SÍ afirma:
//          flecha + toThrow() con paréntesis — ES EL MODELO, está 10 líneas
//          arriba en TU archivo. Fix en D40 warm-up:
//          expect(uno.equals(dos)).toBe(false) — matcher pelado + PARENTESIS, o mejor
//          .toBeFalsy(). Y agrega el caso positivo con DOS instancias: new Money(3)
//          equals new Money(3) → true (igualdad por VALOR entre objetos distintos).
//
// ═══════════ PARTE C — cierre conceptual ═══════════════════════════
// (Fowler ya te dio el vocabulario — ahora lo anclas a TU sistema)
//
// C.1 ¿Qué es un Bounded Context? UNA línea anclada a TU sistema:
//     tu Order y tu Clientes son entidades de TypeORM en la MISMA
//     base. ¿Son el mismo contexto o dos? Defiende (pista: ¿quién
//     habla de "clientes" y quién de "orders"?)
//           R.P.: Son el mismo contexto, ambos usan clientes y los clientes hacen lo mismo.
//          ── REIMU (corrección, Nov 17): Respuesta corta defendible (un contexto
//          "Orders" donde Clientes vive como dato del pedido), pero FOWLER da la respuesta
//          larga que la task quería: MISMA base ≠ MISMO contexto. Para tu API, Clientes
//          existe PARA los pedidos (nadie crea clientes sueltos) → un contexto es válido
//          — pero si mañana agregas "ClientesService" con su propia lógica (créditos,
//          direcciones), nace el segundo contexto. La línea que separa contextos es quién
//          HABLA de qué, no qué tablas comparten. Carta pendiente.
//
// C.2 Entity vs VO — UNA línea de la diferencia REAL. (Tu Order
//     tiene id; tu Money de B.0 no lo necesita. ¿Por qué?)
//           R.P.: Un VO es m[as que todo validadores o similares que se usan a través de todo el proyecto. Funciones comunes que se van a usar en distintos lugares, clases, etc. En cambio un entity está solo cerrado a algo especifico que se vaya a usar.
//          ── REIMU (corrección, Nov 17): No — eso describe un HELPER, no un VO. La
//          diferencia REAL que viviste hoy en tu propio código: Entity = IDENTIDAD (tu
//          Order tiene id; dos orders con los mismos datos son PEDIDOS DISTINTOS — el
//          mesero no confunde la mesa 3 con la mesa 5 aunque pidan lo mismo). VO = VALOR
//          (tu Money no tiene id; 300 centavos ES 300 centavos, vengan de donde vengan).
//          Relee tu respuesta de A.2(b) — la articulaste bien ahí y mal acá. Carta.
//
// C.3 Entrevista: "¿por qué separar el dominio del framework?" Dos
//     líneas. (Pista: tu money.ts de hoy NO importa nada de Nest —
//     ¿qué ganaste al no depender?)
//           R.P.: Que sea todo modular y más manejable entre proyectos. Algo que sirve en un proyecto puede servir en otro fácilmente.
//          ── REIMU (corrección, Nov 17): Media respuesta: reusabilidad sí, pero te faltó
//          la mitad que ya viviste en carne propia: TESTEO. Tu money.test.tsx de hoy
//          corre SIN bootear Nest, SIN DB, SIN nada — porque el dominio no sabe que Nest
//          existe. Esa es la otra mitad de la respuesta de entrevista. Línea lista: "el
//          dominio no sabe qué framework corre afuera".
//
// C.4 Sincero: ¿qué esperas que sea lo MÁS duro de la Fase 4
//     (refactor de order-api a DDD)? Dos líneas.
//           R.P.: Que soy muy coco-seco para estas cosas... Ahora en serio, siento que me voy a enredar mucho al principio, porque esto parece más un rompecabezas que otra cosa.
//          ── REIMU (corrección, Nov 17): Lo segundo es una predicción sana y pre-declarada
//          (exactamente lo que C.4 pedía — ya tienes tu "esto fue lo duro" listo para la
//          entrevista). Lo primero lo tacho: hoy escribiste un VO con invariante, test
//          cross-repo y 9/9 — un coco-seco no hace eso. Y nota: el rompecabezas que
//          presientes ES D40 (conectar dominio↔TypeORM). Va partida en 2 por diseño.
//
// ═══════════ CIERRE ═══════════
// - tsc 0: order-api → npx tsc --noEmit (0 errores, re-verificado
//   hoy 15-nov).
// - Test de Money VERDE: npx vitest run en order-frontend
//   (Contador 5/5 + tu money.test.ts de B.3).
// - Commits: order-api (money.ts nuevo) + order-frontend
//   (money.test.ts) + ts-inventory-cli (esta task).
// - Anki tanda: deck 189 (las nuevas del d38 esperando + las que
//   nazcan hoy).
// - Batsu. Dormir a tiempo. 🎉 FASE 4 DÍA 1.
//
// NOTA de Reimu: DDD suena a palabra grande pero hoy solo hiciste
// TRES cosas: leer a Fowler, escribir una clase que se valida a sí
// misma, y marcar campos de TU entidad. El money.ts que no importa
// nada de Nest es el argumento de entrevista más fuerte que has
// escrito en semanas: "el dominio no sabe qué framework corre
// afuera". Y ojo con C.4 — pre-declarar lo que te asusta es lo que
// después te deja decir "esto fue lo duro y así lo resolví" en la
// entrevista real.
//
// FOOTER de links (por si mueren): A.1 = martinfowler.com/bliki/
// DomainDrivenDesign.html (VERIFICADA viva el 15-nov: HTTP 200 y el
// texto del artículo presente — HTML crudo sin JS; el ancla
// 'domain-driven' está). A.2 = martinfowler.com/bliki/ValueObject.html
// (VERIFICADA viva el 15-nov: HTTP 200 y el texto presente; el ancla
// 'value object' está). Si un CTRL+F falla, no declares la web
// muerta: es HTML crudo y el texto COMPLETO está en la página —
// prueba con otra palabra de la misma frase.
//
