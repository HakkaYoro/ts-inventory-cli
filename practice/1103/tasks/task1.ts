// ═══════════════════════════════════════════════════════════════
// TASK D38 — MIÉ 11-NOV (parte 1) + VIE 13-NOV (parte 2) · Fase 3:
// React día 9: Testing con RTL (React Testing Library + Vitest)
// → CIERRA FASE 3
// ESTADO: CALIBRADA (lun 2-nov, cierre D37 — regla 0b). Deck: 184
// (6 nuevas esperando desde el 2-nov — van con la tanda del VIERNES;
// la de StrictMode la vas a VIVIR en B.1). Repos:
// ts-inventory 59f521f + cierre de anoche, order-frontend de10a80,
// order-api 5e6608b. tsc 0 en todo.
//
// 🔻 MODO SUAVE (mié 11-nov, orden de Marisa tras semana dura):
// HOY SOLO → W.0/W.1 recortados + B.0 + B.1. Nada más. Con eso
// alcanza, commit, y el día CUENTA. Si la batería sorprende y
// quieres seguir, se puede — pero nadie te lo pide hoy.
// VIERNES 13 → Parte A + B.2 + B.3 + Parte C (cierra Fase 3).
//
// Contexto: ya sabes VITEST (Fase 2: los mocks del Repository) y ya
// sabes REACT (8 componentes tuyos andando). Hoy se cruzan las dos
// mitades: probar COMPONENTES como el usuario los ve. Mañana Fase 4
// (DDD) se lleva tu order-api de vuelta — hoy es el cierre de React.
// ═══ REIMU (cierre D38, dom 15-nov): FASE 3 CERRADA 🎉 — 11 correcciones nuevas. LEER TODAS antes de la D39. La importante: en B.3 la task te MINTIÓ y tú tenías razón — verificado en vivo con tu Contador montado. ═══
//
// ═══════════ WARM-UP (sin editor — responde en este archivo) ═══════════
//
// 0. Banner REIMU de anoche (9 bloques) — LEER PRIMERO. Las dos
//    grandes: StrictMode (2 corridas en dev) y la trampa de B.2
//    (useCallback estabiliza referencias, no compacta código).
//    ¿Cuántas de las 9 corrigiste en tu cabeza al leerlas? Una línea.
//    (HOY modo suave: lee SOLO las 2 grandes y responde esta.
//    Las otras 7 esperan al viernes.)
//           R.P.: Leí todo, pero sigo sin que me quepa en la cabeza el cómo funciona useCallback, osea. Para qué lo usaría? El de useMemo si sé que sirve, y bastante para ciertos casos, pero useCallback? Ni idea.
//          ── REIMU (corrección, Nov 15): Duda legítima y queda VIVA para D39. Pero
//          ya tienes la mitad: la trampa de B.2 de D37 (carta) dice que estabiliza
//          REFERENCIAS, no compacta. Pista concreta con TU código: cuando un hijo
//          recibe una FUNCIÓN como prop y el padre se re-renderiza, sin useCallback
//          la función es OTRA cada vez y el hijo se re-dibuja gratis. Tu Nav.tsx con
//          el style-callback de NavLink vive exactamente ese caso. Cobro pendiente en
//          el warm-up de D39.
//
// 1. Anki HOY OPCIONAL (modo suave): si la cabeza da, 10 minutos
//    de PURA REPASO, nada de nuevas. Si no da, no pasa nada —
//    la tanda completa vuelve el viernes.
//
// 2. Sin instalar nada: tu Contador YA es testable tal como está.
//    Un test aprieta el botón "Dame click!" UNA vez. PREDICE: ¿qué
//    texto exacto aparece en pantalla después, y con qué número?
//    (Adivina de memoria, sin abrir el archivo.)
//           R.P.:  Sale "Clicks dados: N", donde N es la cantidad de clicks dados al botón.
//          ── REIMU (corrección, Nov 15): Media respuesta: la línea que cambia sí —
//          falta la OTRA. Apretaste Dame click!, no ¿Cuántos van?: el useRef no se
//          muestra solo. Arriba cambia, abajo se queda en Van: 0 hasta apretar el
//          otro botón. Regla: cuando pido la PANTALLA, respondo la pantalla COMPLETA.
//
// ═══════════ PARTE A — LECTURA PRIMERO (regla de la casa) ═══════════
//
// A.1 Lee el README de RTL en GitHub:
//     https://github.com/testing-library/react-testing-library
//     — sección "Basic Example". OJO: son DOS bloques de código — el
//     primero es el COMPONENTE; el que te importa es el SEGUNDO (el
//     test, arranca con // __tests__/hidden-message.js — render y
//     screen viven ahí). Tres líneas:
//     (a) ¿qué recibe render() y qué hace con eso?
//           R.P.: Levanta un módulo de pruebas, dibuja el componente en un DOM falso.
//     (b) ¿qué es screen y de dónde saca los elementos?
//           R.P.: Sirve para tomar los elementos en pantalla.
//     (c) RTL no prueba tu estado ni tus handlers — prueba lo que el
//     usuario VE. ¿Por qué esa es la filosofía y no al revés?
//           R.P.: Porque es lo que el usuario va a ver en todo momento, no sirve que sean tests de cosas que el usuario no vaya a ver no? Al final del día, el usuario es el cliente final del frontend que se use.
//
// A.2 Lee https://testing-library.com/docs/queries/about/ — la tabla
//     de Variantes (getBy / queryBy / findBy). UNA línea cada uno:
//     cuándo devuelve, cuándo explota, cuándo espera.
//           R.P. getBy: Devuelve el nodo coincida en un query. Y tira un error descriptivo si no encuentra nada que coincida o encuentra varios que coincidan (En este caso se usaría getAllBy).
//           R.P. queryBy: Devuelve el nodo que coincida en un query, devuelve null si nada coincide, útil para buscar elementos que puedan o no puedan existir, tira un error si hay más de una coincidencia (se usaría queryAllBy).
//           R.P. findBy: Devuelve un Promise el cual se resuelve cuando un elemento coincide con lo solicitado. Se rechaza si no se encuentra nada que coincida o hay varios que coincidan (se usa findAllBy en este caso). Tiene un timeout por defecto de 1000ms.
//
// ═══════════ PARTE B — EN TU PROYECTO ═══════════
//
// B.0 INSTALACIÓN — en order-frontend (el enunciado nombra el repo,
//   lección D35). PREDICE antes de instalar: de estas 6 piezas,
//   ¿cuáles ya conoces de Fase 2 y cuáles son nuevas para ti?
//   Las 6: vitest, jsdom, @testing-library/react,
//   @testing-library/dom, @testing-library/user-event,
//   @testing-library/jest-dom.
//           R.P. (predicción): Solo vitest, y jest-dom. Jest-dom porque Santiago me ha dico que eso es del diablo, que no lo toque, vitest ftw porque jest causa memory leaks a veces. Pero en sí, todos en común son tests.
//          ── REIMU (corrección, Nov 15): Parcial: vitest sí lo conocías (Fase 2),
//          jest-dom NO — lo conocías de fama por Santiago. Las 4 de @testing-library
//          + jsdom eran nuevas para ti. Y el dato queda para la historia: el del
//          diablo era JEST (el runner), no jest-dom (los matchers) — hoy los
//          instalaste juntos y conviven.
//   Luego: npm i -D <las 6>. En package.json agrega el script
//   "test": "vitest run". Tu vite.config.ts YA existe — NO lo
//   reemplaces: agrégale la clave test (environment jsdom +
//   setupFiles apuntando a un archivo setupTests.ts que vas a crear
//   en src/). PISTA del contenido de setupTests: import del matchers
//   de jest-dom para vitest.
//
// B.1 EL MURO (verificado en carne propia por Reimu anoche — le
//   pasó PRECISAMENTE esto pre-calibrando la task). Escribe DOS
//   tests del Contador, cada uno con su propio render(<Contador />):
//   test 1: busca el botón "Dame click!" y afirma que existe.
//   test 2: lo mismo de nuevo. PREDICE antes de correr: ¿verde o
//   rojo el segundo?
//           R.P. (predicción): Rojo, porque se repite el mismo test innecesariamente.
//          ── REIMU (corrección, Nov 15): Acertaste el RESULTADO con la razón
//          equivocada: repetir un test no lo rompe. Lo rompió el render del test 1
//          SIGUIENDO montado — sin cleanup, screen busca en el body completo y
//          encuentra el botón dos veces. La predicción cuenta cuando la razón va
//          pegada; tu diagnóstico post-hoc sí fue el correcto.
//           R.P. (resultado): Hm... Si acerté, pero fué porque el test anterior no limpió el render.
//   Si truena: lee el error COMPLETO — la causa vive en la PRIMERA
//   línea del mensaje (no en el final). El fix es UNA línea en
//   setupTests.ts. ¿Qué acababa de pasar con el render del test 1
//   cuando el test 2 arrancó?
//           R.P.: Ya respondí más arriba que pasaba, y listo, solucionado sin LLMs.
//          ── REIMU (corrección, Nov 15): El muro me lo comí YO primero calibrando, y
//          tú lo cazaste sin LLM con UNA línea en setupTests.ts (afterEach(cleanup) —
//          tu diff está en el repo). Leer el error hasta la PRIMERA línea: exacto.
//
// B.2 CONTADOR COMPLETO (3 tests, todos verdes):
//   - test 1: pinta "Clicks dados: 0" al montar.
//   - test 2: 2 clicks en "Dame click!" → aparece "Clicks dados: 2".
//   - test 3: 3 clicks + aprieta "¿Cuántos van?" → aparece "Van: 3".
//   (El test 3 cruza TODO lo aprendido: useState + useRef + eventos.)
//   Para apretar botones: userEvent (A.1 te mostró el import).
// LOS HICE TODOS ONE-SHOT SIN LLMS WOOHOOO! Bueno, en realidad en el test 3 me medio jodí porque coloqué dblClick, solo probé luego separando y funcionó.
//          ── REIMU (corrección, Nov 15): 3/3 one-shot sin LLM — el logro del día. El
//          tropiezo del dblClick es correcto: doble-click es UN evento distinto, no
//          dos clicks. Nota: usaste fireEvent (estilo del README) donde la task pedía
//          userEvent — válido y verde, pero userEvent simula al usuario real
//          (teclado+mouse, secuencia completa) y es el estándar actual. Va carta.
// B.3 TRAMPA de decisión: getByText("Clicks dados: 2") es exacto.
//   Ahora escribe getByText(/clicks/i) — regex, con la i final.
//   PREDICE antes de correr: ¿cuántos nodos de TU Contador matchean
//   ese regex? (Cuenta los TEXTOS de tu Contador.tsx — son cuatro.)
//   ¿Qué pasa si un getBy matchea 2 elementos? ¿Y cuándo te CONVIENE
//   el regex sobre el string exacto? Defiende en dos líneas.
//           R.P. (predicción): 2 si no me equivoco.
//           R.P.: Solo 1... No entiendo porqué. Y conviene el regex porque no necesitas ser exacto con lo que pongas, solo una palabra clave basta.
//          ── REIMU (corrección, Nov 15): AQUÍ GANASTE TÚ: pusiste Solo 1... no
//          entiendo porqué, la task implicaba 2 — y TENÍAS RAZÓN. Verificado en vivo:
//          /clicks/i matchea 1 (tu botón dice Dame click! — sin la s final no
//          matchea); la trampa real era /click/i (=2). El bug era de MI calibración:
//          tu confusión era el dato correcto chocando contra un enunciado mal. Tu
//          instinto de no tragarte el número y reportar el tuyo es exactamente la
//          verificación que pido siempre.
//
// ═══════════ PARTE C — CIERRE CONCEPTUAL ═══════════
//
// C.1 ¿Qué ES React Testing Library? Una línea tipo "cat". (Regla
//   de Santiago: no "sirve para probar" — QUÉ ES.)
//           R.P.: RTL es una suite de testings similar a vitest, solo que este se usa para frontend, para cuando se usa el framework React.
//          ── REIMU (corrección, Nov 15): Cerquita, pero el punto se escapa: RTL NO
//          es una suite similar a vitest. Es una LIBRERÍA de utilidades (render +
//          queries) que corre SOBRE un runner — vitest es el runner, RTL la librería.
//          Tu Contador.test.tsx usa los dos a la vez: test() es vitest, render/screen
//          son RTL. Línea de entrevista lista: RTL es una librería de testing
//          utilities que prueba componentes como los ve el usuario, sobre un runner
//          como vitest o jest.
//
// C.2 En Fase 2 tu spec mockeaba el Repository. Hoy NO mockeaste
//   nada. ¿Por qué el Contador no necesitó mocks y el service sí?
//   Una línea.
//           R.P.: Porque acá no estoy usando datos falsos en ningún momento. Todos los estoy creando desde cero (renderizando en el DOM el botón, los clicks al botón, etc.)
//          ── REIMU (corrección, Nov 15): Media: no uso datos falsos no es la razón.
//          La razón: el service DEPENDE del Repository (dependencia externa → se
//          mockea); el Contador NO tiene dependencias (todo vive dentro del
//          componente) → nada que mockear. La bisagra: se mockea lo que está AFUERA
//          del código bajo prueba, no los datos en sí.
//
// C.3 Entrevista: "¿Cómo pruebas un componente que hace fetch?"
//   Tres líneas. (Pista: el fetch se mockea GLOBAL, no el
//   componente — y una app real prueba el happy path Y el error.)
//           R.P.: Simplemente se mockean los datos que yo debería recibir del fetch, y se validan usando un regex + queryAllByText.
//          ── REIMU (corrección, Nov 15): El QUÉ sí (mockear los datos del fetch),
//          faltó el DÓNDE y los DOS caminos: el fetch se mockea GLOBAL (vi.stubGlobal
//          o MSW — jamás el componente), y una app real prueba el happy path Y el
//          error. En tu /pedidos: cargando→lista y cargando→error. Tres líneas eran:
//          qué, dónde, los dos caminos. Va carta.
//
// C.4 FASE 3 SE CIERRA HOY: tu order-frontend tiene 8 componentes,
//   router, tres estados de carga, un hook propio, Context y un
//   useMemo con veredicto honesto. Dos líneas sinceras: ¿qué fue lo
//   que MÁS te costó de la fase? ¿Qué volverías a hacer distinto?
//           R.P.: Sinceramente fué lo de "Pedidos.tsx", recuerdas que tuve que usar un LLM para que lo hiciera y te confesé que nunca lo hubiera hecho solo? Por eso. Y lo de que hubiera hecho distinto, el haber procastinado tanto, porque creía que toda esta fase iba a ser más difícil de lo que en realidad fué.
//          ── REIMU (corrección, Nov 15): Honestidad de 20. La confesión del
//          Pedidos.tsx y el procrastiné por miedo a que fuera más difícil son
//          exactamente lo que esta pregunta busca en una entrevista real. Y tu
//          evidencia de hoy te contradice a tu favor: 3 tests one-shot sin LLM
//          después de una fase que creías que nunca harías solo. La Fase 3 cierra
//          contigo sabiéndola tuya.
//
// ═══════════ CIERRE ═══════════
// - tsc: npx tsc --noEmit -p tsconfig.app.json → 0 errores.
// - vitest HOY: npm test → los del muro verdes. El 5/5 completo
//   (con los 3 de B.2) es la meta del VIERNES. Commit de hoy =
//   config + tests del muro. Suficiente.
// - Commits: order-frontend (tests del Contador + config) + este repo.
// - Anki: HOY opcional (arriba). La tanda completa (las 6 nuevas
//   esperando desde el 2-nov + las que nazcan) va con el viernes.
// - Batsu. Dormir a tiempo. 🎉 FASE 3 COMPLETA.
//
// NOTA de Reimu: el muro de B.1 me pasó a MÍ anoche, verificando
// esta task antes de escribirla — 1 test solo pasa, 2 tests seguidos
// explotan con un error que NOMBRA su causa en la primera línea.
// Los tests de componentes se escriben como el usuario los usa:
// buscar lo que se VE, apretar lo que se APRIETA. Nada de espiar
// adentro. Y ojo con C.4: esa respuesta es material de entrevista
// real — "¿qué harías distinto?" cae en TODAS.
//
// FOOTER de links (por si mueren): A.1 = README de GitHub (github.com/
// testing-library/react-testing-library — re-anclado el 15-nov: la
// intro de testing-library.com perdió su ejemplo de código en una
// reestructuración; el README vive en HTML crudo). A.2 = testing-
// library.com/docs/queries/about (VERIFICADA viva el 15-nov: las tres
// definiciones getBy/queryBy/findBy + la tabla-resumen están; el
// heading "Variantes" ya no existe — no te asustes si CTRL+F no lo
// encuentra). La web es JS-render en partes: recarga antes de
// declarar muerto un link.
//
