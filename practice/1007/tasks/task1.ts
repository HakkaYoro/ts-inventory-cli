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
//           R.P.: Lo primero es que tengo que colocar el nuevo repositorio para clientes, ya luego de eso sería acomodar uno que otro test. Y deberían fallar los dos create.
//
// 2. En una línea: ¿qué es un "contrato" entre un spec y su
//    service, y quién rompió el contrato ayer — el spec o el
//    service?
//           R.P.: El service. Porque integra dos repos ahora en vez de uno.
//
// 3. Rompehielos React, a ciegas, sin googlear: ¿qué crees que es
//    un "componente" en React? Una línea, intuición pura. No se
//    penaliza "ni idea".
//           R.P.: Ni idea.
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
//           R.P.: Dos en rojo nomás. Como dije antes, los dos create debrían estar mal.
//
// ═══════════ PARTE B — REACT NACE: order-frontend ═══════════
//
// B.0 Setup — YA ESTÁ HECHO (no repitas andamiaje):
// el scaffold Vite se creó el jueves y hoy Reimu instaló los
// paquetes que Syncthing no viaja (27; tsc quedó en 0 errores).
// Solo enciende, desde la raíz donde viven los repos:
//   cd order-frontend
//   npm run dev
// Abre el localhost que imprime la terminal (algo como
// http://localhost:5173). ¿Qué es Vite? Un servidor de
// desarrollo: sirve tu carpeta src/ al navegador y recarga la
// página él solo cada vez que guardas. Eso es todo lo que es.
// Se apaga con Ctrl+C en la terminal.
//
// B.1 El mapa — 3 archivos, una línea cada uno (lee los TRES):
//   - index.html: la puerta. HTML es el idioma en que el navegador
//     lee páginas. Esta está casi vacía: tiene un <div> hueco.
//   - src/main.tsx: el montador. Toma lo que devuelve App y lo
//     coloca dentro de ese div hueco. Hoy no lo toques.
//   - src/App.tsx: LA PANTALLA. Y ojo, porque esto ya lo sabes:
//     App es una FUNCIÓN (línea 7) con RETURN (línea 10), como
//     cualquier método de tus services. La única diferencia es
//     que lo que retorna es la pantalla entera. Ese "HTML con
//     llaves" que vive en el return se llama JSX, y es lo único
//     genuinamente nuevo de hoy.
//
// B.2 Caza en App.tsx — responde en comentarios de ese archivo:
//   (a) Línea 8 declara count como número. Línea 29 dice
//       "Count is {count}": una variable METIDA en mitad de un
//       texto. En TS de backend ya inyectaste el VALOR de una
//       variable dentro de un texto (recuerda cómo se escriben
//       los template strings). En una línea: ¿qué hacen las
//       llaves { } de JSX, según lo que ves en el botón?
//          R: Lo que veo acá es básicamente una función la cual tiene un botón que lleva un contador de clicks, lo demás es puro HTML, Ah, y el botón está dendtro de un... Button?
//       (b) Línea 13: className="hero". En tus archivos .ts la
//       palabra "class" ya está ocupada (class Clientes...).
//       En una línea: para qué sirve este atributo, si App.css
//       se importa justo en la línea 5.
//          R: Sirve ppara crear clases en un div.
//
// B.2.5 LECTURA (nuevo paso, con la dignidad del editor). Hoy
//   hay más pestaña de docs que de código, y está BIEN así.
//
//   Paso 1 — Lee la mitad de una página:
//   https://react.dev/learn/writing-markup-with-jsx
//   Detente en la sección "The Rules of JSX". NO sigas hasta el
//   final. Ahí hay un archivo the-old-way.html donde el mismo
//   formulario está escrito a mano y con React. Míralos lado a
//   lado. ¿Qué se ahorra la versión React?
//
//   Paso 2 — La respuesta de B.2(a) te está esperando ahí:
//   la página tiene una sección cuyo título pregunta cómo
//   mostrar información con llaves. Es corta. Con ella, escribe
//   en este archivo tu definición de las llaves { } en UNA línea
//   (con tus palabras, no copiando la docs).
//           R.P.:
//
//   Paso 3 — Lee las dos primeras secciones de:
//   https://react.dev/learn/your-first-component
//   ("Components: UI building blocks" y "Defining a component").
//   Detente cuando llegues a "Using a component" — cierra la
//   pestaña. No es trampa leer antes de escribir: es el orden
//   correcto cuando el territorio es nuevo. La trampa sería
//   leer SIN escribir nada después, y el siguiente paso existe.
//
//   Paso 4 — Vuelve a tu Saludo.tsx. Tiene UNA cosa pendiente:
//   el h1 dice "Hola, " y el nombre nunca entra. Con la sección
//   del Paso 2 en la cabeza, termínalo solo. La especificación
//   completa sigue en B.3 abajo — ya la tenías medio hecha.
//
// B.3 Tu primer componente: archivo src/Saludo.tsx (nuevo, al
//   lado de App.tsx). Especificación, sin receta:
//   - Es una función que recibe UN parámetro. A los campos de tus
//     DTOs de NestJS les pusiste tipo; acá le pones tipo al
//     parámetro, con un campo nombre: string. A ese objeto que
//     entra, React le dice "props".
//   - Retorna un <h1> con el texto EXACTAMENTE "Hola, NOMBRE" —
//     con coma, tal cual está escrito. NOMBRE no va quemado:
//     llega por la prop (Day 3: includes(juego), no
//     includes("Soku")). Para meter el valor de la prop dentro
//     del texto, el mecanismo es el que descubriste en B.2(a).
//   - Para que App la use: App.tsx línea 122 te muestra cómo se
//     exporta; línea 1, cómo se importa. Mismo gesto, dirección
//     inversa.
//   - Úsala desde App TRES veces: "Reimu", "Marisa" y tú.
//     Guarda y mira el navegador sin tocar F5.
//
// B.4 Tu segundo componente: src/Tarjeta.tsx. Mira el <section>
//   que acabas de escribir: ABRE, tiene los saludos ADENTRO y
//   CIERRA. Cualquier etiqueta puede tener contenido en el medio
//   — y las tuyas también: <Tarjeta> ... </Tarjeta>. React te
//   manda eso del medio por una prop que ya existe y se llama
//   children (nombre FIJO, no lo eliges tú — igual que tus
//   repos ya respondían a save y findOneBy, no a los nombres que
//   te diera la gana). Especificación: Tarjeta recibe children
//   en su parámetro y lo pinta envuelto en un div con className
//   a tu gusto (opcional: dale borde en App.css para VER el
//   envoltorio). Úsala envolviendo UNO de tus tres saludos.
//
// B.5 PREDICCIÓN (antes de tocar nada): si en una de tus tres
//   llamadas olvidas pasar la prop nombre, ¿qué pasa — error de
//   compilación, pantalla en blanco, o nada? Apúntala:
//           R.P.: Error de compilación. Ah, pues nada, compila y deja el Hola vacío. Entiendo.
//   Luego verifica: borra la prop de UNA llamada, observa QUIÉN
//   lo caza y DÓNDE (tú ya sabes que tsc es tu mapa desde el
//   D28; aquí vive en el editor, y en terminal es
//   npx tsc --noEmit -p tsconfig.app.json). ¿Y el navegador, qué
//   hizo con el hueco? Restaura al terminar.
//
// B.6 Trampa del día (una sola): tu TERCER saludo — el tuyo —
//   debe verse SIN coma y en MAYÚSCULAS, usando el MISMO
//   componente Saludo. Prohibido crear otro componente ni
//   duplicar el archivo. LOS OTROS DOS SIGUEN EXACTAMENTE IGUAL:
//   "Hola, Reimu" y "Hola, Marisa" — CON coma, minúsculas. La
//   pantalla debe mostrar los DOS formatos A LA VEZ. Inténtalo
//   en serio unos 5 minutos. Si no sale, perfecto: eso es lo
//   que había que descubrir. Escribe qué pudiste cambiar desde
//   la llamada y qué NO te dejó tocar el componente. Ese
//   hallazgo se defiende en C.3.
//
// ═══════════ PARTE C — cierre conceptual ═══════════
//
// C.1 ¿Qué problema responde React que HTML+JS suelto no? Dos
//     líneas, usando tus 3 saludos como ejemplo.
//      R: Es súper parecido a TS, funciones, tipados, etc. Te  permite reutilizar/inyectar código donde quieras.
// C.2 ¿Qué es una prop y en qué se diferencia de una variable
//     normal declarada dentro del componente?
//      R:No entendí tu pregunta. Pero Prop es similar a un DTO. Le pasan algo, lo valida y continúa.
//      ── REIMU: la pregunta re-formulada: una prop LLEGA DE AFUERA
//      (la elige quien llama, puede ser distinta en cada llamada);
//      una variable local nace y muere DENTRO del componente y el
//      que llama no la puede tocar. Tu B.5 lo mostró en vivo: el
//      hueco de la prop se ve desde afuera; count en App jamás.
// C.3 La trampa de la coma: ¿quién decide la FORMA del texto — el
//     que USA el componente o el componente? ¿Y el CONTENIDO?
//     ¿Qué tuviste que hacer (o qué te faltó) para tu saludo sin
//     coma?
//      R: La llamada solo manda lo que va en el argumento — el
//      CONTENIDO. Si pongo "MeEsTasHaCiEnDoMoLeStAR1234", sale
//      "Hola, MeEsTasHaCiEnDoMoLeStAR1234." completo. La coma y
//      el formato los decide el MOLDE (el componente). Por eso el
//      saludo sin coma era imposible desde la llamada: para
//      lograrlo sin crear otro componente, hay que quitarle la
//      coma al molde. [compilado de mis mensajes del chat,
//      viernes 9-oct — autorizado]
//      ── REIMU: exacto. Y el molde quemado (HOLA REIMU ×3) es el
//      mismo principio al revés: molde rígido ignora argumentos.
//      B.6 quedó cerrada por chat: no salió desde la llamada
//      PORQUE no podía salir. Ese era el hallazgo.
// C.4 La deuda: ¿por qué el spec rojo de hoy NO era un bug de
//     código sino de contrato? Es tu línea de entrevista para el
//     "¿qué pasa con tus tests cuando refactorizas?".
//      R: Cuando refactorizo, tengo que revisar el spec y adaptarlo según lo que haya cambiado.
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
