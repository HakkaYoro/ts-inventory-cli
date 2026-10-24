// ═══════════════════════════════════════════════════════════════
// TASK D35 — MIÉRCOLES 21-OCT · Fase 3: React día 6 · React Router
// ESTADO: CERRADA (Oct 24: cerrada de madrugada desde la laptop,
// B/C completos + correcciones de cierre — nota 14/20, Sesión 47).
// El registro del derrame (mié 21 arranque → sáb 24 cierre) vive en
// progress.md; DRIFT_BASE 35→37, ETA jue 26-nov.
// ═════ REIMU (corrección) — Oct 24. LEER MAÑANA ANTES DEL WARM-UP ═════
// 8 correcciones. Dos que importan de verdad: la C.3 (te la debía —
// la explicación de <a href> NUNCA se te dio, y hoy te la pagué con
// TU Nav) y las predicciones vacías de B.1/B.2 (la predicción era el
// ejercicio del día — escribir lo que CREES que pasará ANTES de
// probar es el hábito que la entrevista cobra). Lo demás: sólido.
// Nav.tsx nació solo y está mejor de lo que la task pedía.
// ═══════════════════════════════════════════════════════════════
//
// Contexto: el lunes montaste useRef con dos gestos y ninguna ref tuya
// cruza padre→hijo. Hoy, UNA herramienta nueva que cambia quién
// manda en tu pantalla: la URL. Tu App deja de ser una sola hoja
// eterna y aprende a tener PÁGINAS.
//
// ═══════════ WARM-UP (sin editor — responde en este archivo) ═══════════
//
// 0. COBRO DE AYER: banner REIMU del 19-oct arriba de este
//    archivo (7 bloques). La clave: el render NO es requisito para
//    almacenar — es CONSECUENCIA. setX guarda Y repinta;
//    ref.current guarda y no pinta nada.
//
// 1. Sin mirar nada, una línea: useRef vs useState — quién
//    dispara render y quién no.
//           R.P.: useState almacena y dispara render, useRef almacena y no dispara render.
//          ── REIMU (corrección, Oct 24): Redonda. Cobrada — y la carta de
//          Anki cita tu Contador de D34 como ejemplo — la vas a ver en la tanda.
//
// 2. Tu Contador de ayer: "Van: {total}" solo cambia cuando
//    presionas "¿Cuántos van?". ¿Por qué NO se actualiza solo
//    con cada click, si la ref sí está contando?
//           R.P.: porque ref almacena sin renderizar, y lo que almacena se lee con ref.current, luego ese valor se puede renderizar si uno quiere.
//          ── REIMU (corrección, Oct 24): Bien, con el matiz de siempre: no
//          es "si uno quiere" — es CUANDO un setState dispara el render.
//          La pantalla es la foto del último render; la ref sigue contando
//          entre fotos. Ya tuyo, esto está cobrado.
//
// ═══════════ PARTE A — LECTURA PRIMERO (regla de la casa) ═══════════
//
// A.1 Lee https://reactrouter.com/start/data/installation
//     — SOLO esa página (es corta). Dos líneas: ¿qué es
//     RouterProvider y de dónde saca lo que tiene que pintar?
//           R.P.: No lo dice la página. Pero me imagino que Router Provider es para mapear y hacer rutas dentro de React. Un framework tal vez? Voy a ver por mi cuenta... Okay, investigué, RouterProvider es un componente que se usa para renderizar el UI para un Data Router. No entendí mucho pero okay.
//          ── REIMU (corrección, Oct 24): La investigación propia fue el
//          movimiento del día — la página no lo decía y fuiste a buscarlo.
//          Sí lo dice, de pasada: "pass it to RouterProvider" — el router se
//          crea una vez, se le PASA, y RouterProvider pinta lo que él matchea.
//          Y "un framework tal vez" → NO: librería. El framework es el MODO
//          nuevo de esa misma doc (por eso la home confunde). Línea de
//          entrevista: RouterProvider monta el router; el match URL→
//          componente lo hace createBrowserRouter.
//
// A.2 Lee https://reactrouter.com/start/data/routing — desde el
//     inicio hasta el final de la sección "Configuring Routes"
//     (CORTA antes de "Nested Routes" — eso es de otro día).
//     Tres pasos en tus palabras: ¿qué recibe createBrowserRouter,
//     cómo se declara una ruta mínima, y qué pinta esa ruta?
//           R.P.: createBrowserRouter recibe ruta (path), componente, index (creo) y children. "{ path: "/", Component: Root }" pinta la página principal (En este caso, llamada root).
//          ── REIMU (corrección, Oct 24): Los tres pasos correctos — y citar
//          la sintaxis exacta "{ path, Component }" de memoria es señal de
//          que la lectura caló. Matiz: createBrowserRouter no "recibe ruta"
//          — recibe un ARRAY de objetos de ruta. Tu main.tsx lo demuestra:
//          dos objetos, dos páginas. El resto (index, children) existen, y
//          children es el tema que C.4 te hizo razonar sin haberlo visto.
//
// A.3 PREDICCIÓN (sin probar nada): tu App actual pinta TODO junto
//     — saludos, contador, pedidos. Si mañana la URL decide qué
//     se pinta, ¿qué crees que le pasa a tu <section> cuando la
//     URL cambie a una página que solo muestra el Contador?
//           R.P.: Pues nada... Creo..?
//          ── REIMU (corrección, Oct 24): La respuesta real la viviste en
//          B.2: los saludos y pedidos SE DESMONTAN — App entera sale de
//          pantalla porque la URL dejó de apuntarle. "Nada" era la predicción
//          del inicio del día; el resultado la corrigió solo. Eso es el
//          hábito predicción→prueba funcionando, aun empezando errado.
//
// ═══════════ PARTE B — TU APP CON PÁGINAS (editor SÍ) ═══════════
//
// Reparto (qué vive en cuál — el resto NO SE TOCA):
//   - main.tsx = el router se monta acá (installation lo muestra).
//   - App.tsx = sigue siendo la página "/" — solo gana un link.
//   - Clicks.tsx = NACE HOY, página nueva para /clicks.
//     (Regla de siempre: el componente wrapper nace VACÍO y
//     tú lo llenas — copiar el molde de otra página está bien
//     para la SINTAXIS, no para el contenido.)
//   - Contador / Saludo / Tarjeta / hooks = INTACTOS.
//
// B.0 INSTALAR (5 min): en order-frontend, instala react-router
//   siguiendo TU lectura A.1. Pista de verificación: package.json
//   y package-lock.json cambian — eso es señal de que instalaste
//   de verdad. (Ojo: node_modules NO viaja por Syncthing — si
//   mañana trabajas desde la laptop, npm install de nuevo.)
//          ── REIMU (corrección, Oct 24): Instalado — pero quedó en los DOS
//          repos: order-frontend (correcto) y ts-inventory-cli (sobró).
//          El segundo lo limpié yo con npm uninstall al cierre. Para D36:
//          antes de npm i, mira dónde estás parado — dos repos hermanos,
//          dos package.json. El que manda es el de la app que corre.
//
// B.1 PRIMERA RUTA: monta el router en main.tsx con UNA sola
//   ruta: "/" → tu App actual. Predicción primero (R.P. abajo):
//   con el router montado pero una sola ruta, ¿algo visible
//   cambia en tu pantalla? ¿Por qué?
//           R.P. (predicción):
//          ── REIMU (corrección, Oct 24): Vacía. El código está impecable
//          (main.tsx espejo de installation, StrictMode conservado, element
//          en vez de Component — dos sintaxis válidas para lo mismo), pero
//          la PREDICCIÓN no se escribió y era el ejercicio del día: con una
//          sola ruta y la misma URL, la pantalla NO cambia — mismo match,
//          mismo componente. Código 10, ritual 0. D36 no deja avanzar sin
//          predicción escrita — la tanda de Anki de hoy trae la carta.
//
// B.2 SEGUNDA PÁGINA: crea la página /clicks que muestre SOLO tu
//   Contador (Clicks.tsx nace vacío, tú lo llenas). Agrégale a tu
//   App un link para ir a /clicks, y a Clicks un link para volver.
//   PREDICCIÓN primero: al navegar a /clicks, ¿qué pasa con los
//   saludos y los pedidos de tu App — quién decidió eso?
//           R.P. (predicción): Nada ¿? No entiendo la pregunta.
//          ── REIMU (corrección, Oct 24): La pregunta era mía y confusa —
//          "qué pasa con los saludos" sin decir hacia dónde. Con la pantalla
//          real frente a ti: los saludos y pedidos DESAPARECEN de pantalla
//          (no se borran del código — App sigue existiendo intacta).
//          ¿Quién decidió? La URL — apuntó a /clicks y el router pintó
//          Clicks. Ese "quién manda" es EL concepto de D35.
//           R.P. (resultado): Siguen ahí.
//          ── REIMU (corrección, Oct 24): "Siguen ahí" leído como "en
//          pantalla" es falso — en /clicks no hay saludos ni pedidos; leído
//          como "en el código" es cierto — App.tsx sigue intacta. La ambigüedad
//          era de la pregunta, no tuya. El código de B.2 cumple todo: página
//          nueva con su Contador, links de ida y vuelta, Contador INTACTO.
//
// B.3 EL LINK QUE SABE DÓNDE ESTÁS: haz que el link de la página
//   ACTUAL se vea distinto (activo) sin usar estado ni refs.
//   La doc de navegación te muestra el componente Link — pero
//   Link no sabe dónde estás. Hay OTRO que sí. Búscalo en la
//   doc y justifícalo en una línea acá:
//           R.P.:  era un simple isActive? y ya XD.
//          ── REIMU (corrección, Oct 24): "Un simple isActive y ya" te quedó
//          CORTO a propósito: no usaste isActive — usaste el STYLE CALLBACK
//          de NavLink ({ isActive, isPending }) => ({...}), que es la forma
//          de la doc que te deja decidir el look sin tocar CSS. Y encima
//          Nav.tsx NACIÓ SOLO: extrajiste los dos links a un componente
//          compartido entre App y Clicks — eso ya es diseño propio, no task.
//          C.3 te cobra el porqué; el cómo lo superaste.
//
// ═══════════ PARTE C — CIERRE CONCEPTUAL ═══════════
//
// C.1 QUÉ ES un router — no para qué sirve (regla de entrevista
//   de Santiago): defínelo en una línea, como si definirías cat
//   ("concatena e imprime", no "sirve para ver archivos").
//           R.P.: Da las rutas para distintas secciones en una página.
//          ── REIMU (corrección, Oct 24): Eso es "para qué sirve", justo lo
//          que la pregunta prohibía. La definición tipo cat: MATCH EA la URL
//          y decide qué componente pinta. En tu app: "/" → App, "/clicks" →
//          Clicks. La carta nueva de Anki (¿Qué ES un router?) te lo cobra
//          mañana — la línea de entrevista es esa, no la tuya de hoy.
//
// C.2 Antes de hoy, ¿quién decidía qué se pintaba en tu pantalla?
//   ¿Y ahora? Dos líneas, con nombres.
//           R.P.: Decidía el root con app en main, ahora es el routerprovider en main.
//          ── REIMU (corrección, Oct 24): A medias, y la confusión es vieja:
//          ANTES lo decidía APP (qué componentes viven en pantalla lo dictaba
//          tu App.tsx — main solo la montaba); HOY lo decide la URL vía el
//          router. "El root" (main.tsx) nunca decidió contenido — decide el
//          montaje. Y RouterProvider tampoco: él PINTA, el match lo hace el
//          router. Dos actores nuevos, dos roles distintos — mañana te los
//          cobro junto con la carta de RouterProvider.
//
// C.3 Tu link de B.2 vs un <a href> de toda la vida: ¿qué pasa
//   con la página cuando usas cada uno? Una línea la diferencia.
//           R.P.: No sé que es un <a href>, PERO, me gusta más así cómo lo hice. está más ordenado. (Nunca me dijiste, explicaste o hiciste buscar en ninguna task que es "a href")
//          ── REIMU (corrección, Oct 24): Reclamo VÁLIDO y cobrado — <a href>
//          es el link de HTML puro (el nombre completo es "anchor", ancla).
//          La diferencia que la pregunta buscaba: <a href> RECARGA la página
//          entera; NavLink navega SIN recargar — la Nav ni parpadea. Ahora
//          mira TU Nav.tsx y pregunta: ¿el bold de la página actual lo haría
//          un <a>? No — un <a> no sabe dónde estás. Tu carta nueva de Anki
//          trae la comparación completa.
//
// C.4 Entrevista: "¿Cuándo quieres rutas anidadas?" Aún no las
//   viste — pero con lo de hoy puedes razonarlo: piensa en tu
//   order-api (clientes con pedidos). Una línea.
//           R.P.: Cuando quieres ver todos los pedidos de un cliente.
//          ── REIMU (corrección, Oct 24): La MEJOR respuesta del día — sin
//          haberlas visto nunca. /clientes con la lista de pedidos ADENTRO
//          (ruta hija) es exactamente el caso: una página compartida con
//          contenido que cambia adentro. Cuando lleguen los children +
//          Outlet de React Router, ya tienes el caso de uso pensando.
//
// ═══════════ CIERRE ═══════════
// - tsc: npx tsc --noEmit -p tsconfig.app.json → 0 errores.
// - Commit en order-frontend (router + Clicks + links).
// - Commit acá (respuestas).
// - Anki: tanda de 15 (las 3 de d34 nuevas esperando — la de
//   useRef vs useState antes del warm-up de mañana, te conviene).
// - Batsu. Y HOY SÍ: noche perdida de anoche se paga durmiendo
//   a tiempo. La cama no es la recompensa — es parte del plan.
//          ── REIMU (corrección, Oct 24): CIERRE CUMPLIDO: tsc 0 errores
//          verificado, commits hechos (order-frontend + este repo), Anki
//          con las 3 cartas nuevas de d35 + tanda pendiente de HOY (te
//          toca). Nota del día: 14/20. Dormiste tras el cierre — bien.
//          D36 (PROYECTO: order-frontend consume order-api) el domingo.
//
// NOTA de Reimu: D34 lo cerraste entero en su día, sin dormir,
// con predicción exacta y la pared de padre-hijo esquivada por
// diseño propio. Hoy es otra herramienta que suena grande y es
// chica: el router solo decide QUÉ componente pinta según la
// URL — todo lo demás es lo que ya sabes. La predicción de B.2
// es la del día: no la saltes. Y B.3 es a propósito — la
// respuesta no está en la página que leíste, está a un paso.
// Si traba: subraya y pregunta, pero primero A.1 completo.
// (Nota Oct 21: si algún link vuelve a morir, la home es
// reactrouter.com/home — el sitio ahora se navega por MODOS:
// data / declarative / framework. El tuyo es DATA.)
//
