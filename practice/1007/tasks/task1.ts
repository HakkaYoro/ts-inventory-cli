// ═══════════════════════════════════════════════════════════════
// TASK D30 — MIÉRCOLES 7-OCT · Fase 3: React empieza · CIERRA LA DEUDA DE FASE 2
// ESTADO: CALIBRADA (pre-verificada mar 6 en copia /tmp: spec de
// order-api confirmado 10/10 ROJO por DOS causas exactas (DI y
// fixtures del DTO anidado); scaffold `npm create vite@latest ...
// react-ts` OK y npm run dev respondiendo HTTP 200 en localhost).
//
// Contexto: Fase 2 se cerró con la batería 9/9, pero quedó una
// deuda REAL: el service de orders ahora trabaja con la relación
// de Clientes y tu spec sigue escrito para el mundo viejo. La
// mañana empieza pagándola (30-40 min) y el resto del día es
// bautizo de React: setup, JSX, componentes y props. Territorio
// nuevo — sin prisa. Antes de arrancar, lee las correcciones de
// Reimu en la task de ayer (practice/1003): la urgente es la de
// C.3, que es exactamente la deuda de hoy.
//
// ═══════════ WARM-UP (sin editor — responde en este archivo) ═══════════
//
// 1. Tu spec 10/10 de order-api amaneció ROJO (10/10 fallando).
//    Arranca el día corriéndolo (cd order-api primero):
//      npx vitest run --exclude "**/.stversions/**" src/orders/orders.service.spec.ts
//    Lee los DOS errores que verás y escríbelos con tus palabras:
//    (a) qué le falta al Testing Module que el service ahora pide;
//    (b) qué tipo espera el DTO nuevo que tus fixtures no le dan.
//    NO lo arregles aún — solo el diagnóstico escrito.
//           R.P.:
//
// 2. En una línea: ¿qué es un "contrato" entre un spec y su
//    service, y quién rompió el contrato ayer — el spec o el
//    service?
//           R.P.:
//
// 3. Rompehielos React, a ciegas, sin googlear: ¿qué crees que es
//    un "componente" en React? Una línea, intuición pura. No se
//    penaliza "ni idea".
//           R.P.:
//
// ═══════════ PARTE A — LA DEUDA: renegociar el spec (editor SÍ) ═══════════
//
// NO te doy el código del spec — es TUYO. Pasos y pistas:
//
// 1. El error de Nest lo dice casi entero: al service le falta su
//    segundo repo en el Testing Module. El token de Clientes se
//    construye IGUAL que el de Order — misma función, cambia la
//    clase que le pasas (vive en entities/clientes.entity).
//    Regístralo en providers con su propio useValue.
// 2. El compilador te señala las líneas una por una: tus fixtures
//    de create pasan cliente como string y el DTO nuevo espera la
//    forma anidada que ya conoces del POST real de ayer.
//    Actualízalas TODAS.
// 3. El repo falso nuevo no se inventa: se COPIA de tus toEqual.
//    Para el caso "cliente nuevo", mira QUÉ métodos llama TU
//    service en esa rama (relee tu create de ayer) y decide qué
//    debe responder cada uno para que el pedido termine con el id
//    que tu test espera. Escribe el porqué en un comentario junto
//    al guion.
// 4. Meta: suite 10/10 VERDE otra vez.
//
// PREDICCIÓN (antes de correr): ¿cuántos de los 10 tests crees que
// quedan verdes arreglando SOLO los pasos 1 y 2, sin escribir
// guiones nuevos? Apúntala, ejecuta la suite, y explica la
// diferencia si la hay.
//           R.P.:
//
// ═══════════ PARTE B — REACT NACE: order-frontend ═══════════
//
// Setup (andamiaje — pégalo tal cual, en la MISMA raíz donde vive
// order-api, para que quede HERMANO de order-api, no anidado):
//   npm create vite@latest order-frontend -- --template react-ts
//   cd order-frontend && npm install && npm run dev
// Abre el localhost que la terminal imprime. Si lo ves en el
// navegador, ya corriste tu primer frontend React + TypeScript.
//
// Ahora la parte de aprendizaje (primero LEER, luego escribir):
//
// 1. Lee App.tsx y App.css del template. En comentarios del propio
//    archivo: ¿qué es JSX y UNA diferencia con HTML que VEAS ahí?
//    (Pista de dónde mirar: cómo se escriben los atributos de las
//    etiquetas y qué aparece entre llaves.)
// 2. Crea Saludo.tsx: un componente que reciba una prop `nombre`
//    (string) y muestre un <h1>. Úsalo desde App TRES veces con
//    nombres distintos: "Reimu", "Marisa" y uno a tu elección.
//    ATENCIÓN: el texto del h1 es EXACTAMENTE "Hola, NOMBRE" —
//    con coma. Ese es el enunciado: léelo dos veces.
// 3. Crea Tarjeta.tsx: un componente que envuelva contenido usando
//    props.children — la prop especial que trae lo que pones ENTRE
//    las etiquetas de apertura y cierre, lo mismo que hiciste toda
//    la vida con <div>contenido</div>. Úsalo en App envolviendo
//    UNO de los saludos.
// 4. PREDICCIÓN (antes de tocar nada): si olvidas pasar la prop
//    nombre, ¿qué pasa — error de compilación, pantalla en blanco,
//    o nada? Apúntala. Luego verifica: borra la prop de UNA
//    llamada por un segundo, mira QUIÉN lo caza y DÓNDE, y
//    restaura.
//           R.P.:
// 5. Trampa del día (una sola): tu tercer saludo — el tuyo — va
//    SIN coma y en MAYÚSCULAS, resuelto con el MISMO componente
//    Saludo (no crees otro). Inténtalo y observa qué puedes
//    cambiar desde la llamada y qué NO te deja cambiar el
//    componente. Ese hallazgo se defiende en C.3.
//
// ═══════════ PARTE C — cierre conceptual ═══════════
//
// C.1 ¿Qué problema responde React que HTML+JS suelto no? Dos
//     líneas, usando tus 3 saludos como ejemplo.
//      R:
// C.2 ¿Qué es una prop y en qué se diferencia de una variable
//     normal declarada dentro del componente?
//      R:
// C.3 La trampa de la coma: ¿quién decide la FORMA del texto — el
//     que USA el componente o el componente? ¿Y el CONTENIDO?
//     ¿Qué tuviste que hacer (o qué te faltó) para tu saludo sin
//     coma?
//      R:
// C.4 La deuda: ¿por qué el spec rojo de hoy NO era un bug de
//     código sino de contrato? Es tu línea de entrevista para el
//     "¿qué pasa con tus tests cuando refactorizas?".
//      R:
//
// ═══════════ CIERRE ═══════════
// - order-api: commit del spec renegociado + push. La deuda queda
//   pagada y contada en el mensaje del commit.
// - ts-inventory-cli: commit de esta task.
// - order-frontend: repo nuevo. Si el scaffold no trajo .git:
//   git init + primer commit "chore: vite react-ts scaffold +
//   saludos" + push. ¿Green graph? OPCIONAL: gh repo create
//   order-frontend --public --source=. --push
// - Anki 20-30 min, deck TS-NestJS-Concepts.
// - Dormir a tiempo. Día 1 de React: nadie nace sabiendo.
//
// NOTA de Reimu: ayer cerramos Fase 2 con tu batería 9/9
// verificada en vivo — lo rojo de hoy no es tu lógica, es el
// contrato que cambió de forma. React es territorio nuevo: JSX se
// lee raro los primeros días y después se lee solo. Sin prisa.
