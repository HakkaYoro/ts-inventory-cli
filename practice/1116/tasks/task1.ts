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
//           R.P.:
//
// 1. COBRO useCallback pendiente de W.0 del miércoles: en UNA
//    línea, ¿QUÉ estabiliza useCallback y en qué caso de TU Nav.tsx
//    aplicaba? (Pista: la carta d37 + el style-callback de NavLink.)
//    No te doy la respuesta — dímela tú.
//           R.P.:
//
// 2. COBRO C.2: ¿por qué tu spec de Fase 2 mockeaba el Repository
//    y tu Contador.test.tsx no mockeó NADA? UNA línea. (La bisagra:
//    dependencias AFUERA del código bajo prueba.)
//           R.P.:
//
// ═══════════ PARTE A — LECTURA PRIMERO (regla de la casa) ═══════════
//
// A.1 Lee https://martinfowler.com/bliki/DomainDrivenDesign.html
//     (son ~2 min de lectura; es HTML crudo sin JS: el texto
//     COMPLETO está en la página — si el título no dice "Domain-
//     Driven Design", es que no cargó). Dos líneas:
//     (a) ¿Cuál es la idea central de DDD en palabras TUYAS?
//           R.P.:
//     (b) Fowler habla de construir el modelo con el LENGUAJE del
//     dominio (Ubiquitous Language). ¿Qué lenguaje es ese en TU
//     order-api? Nombra 3 sustantivos de tu negocio.
//           R.P.:
//
// A.2 Lee https://martinfowler.com/bliki/ValueObject.html (HTML
//     crudo, el texto está — no te asustes si el CTRL+F no encuentra
//     una palabra exacta, prueba otra). Dos líneas:
//     (a) ¿Qué hace diferente a un Value Object de una clase con
//     setters?
//           R.P.:
//     (b) ¿Por qué dos Value Objects con el mismo valor pueden ser
//     intercambiables sin miedo?
//           R.P.:
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
//           R.P. (decisión + razón):
//
// B.1 PREDICCIÓN OBLIGATORIA antes de probar nada: ¿qué pasa si
//     intentas new Money(-5)? (¿lanza? ¿acepta? ¿devuelve algo
//     raro?) Escribe tu predicción AQUÍ, DESPUÉS prueba.
//           R.P. (predicción):
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
//           R.P. (resultado):
//
// B.2 Conecta con TU Order actual: abre order-api/src/orders/
//     entities/order.entity.ts — la que escribiste en Fase 1 con
//     TypeORM — y mira SUS campos reales. ¿Cuáles son candidatos a
//     VO según lo que leíste en A.2? Márcalos con la razón. NO los
//     refactorices AÚN (eso es mañana). Pista: ¿cuál NO tiene id
//     propio y se define por su valor?
//           R.P.:
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
//           R.P. (predicción):
//           R.P. (resultado):
//
// ═══════════ PARTE C — cierre conceptual ═══════════════════════════
// (Fowler ya te dio el vocabulario — ahora lo anclas a TU sistema)
//
// C.1 ¿Qué es un Bounded Context? UNA línea anclada a TU sistema:
//     tu Order y tu Clientes son entidades de TypeORM en la MISMA
//     base. ¿Son el mismo contexto o dos? Defiende (pista: ¿quién
//     habla de "clientes" y quién de "orders"?)
//           R.P.:
//
// C.2 Entity vs VO — UNA línea de la diferencia REAL. (Tu Order
//     tiene id; tu Money de B.0 no lo necesita. ¿Por qué?)
//           R.P.:
//
// C.3 Entrevista: "¿por qué separar el dominio del framework?" Dos
//     líneas. (Pista: tu money.ts de hoy NO importa nada de Nest —
//     ¿qué ganaste al no depender?)
//           R.P.:
//
// C.4 Sincero: ¿qué esperas que sea lo MÁS duro de la Fase 4
//     (refactor de order-api a DDD)? Dos líneas.
//           R.P.:
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
