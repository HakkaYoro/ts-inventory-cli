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
//           R.P.:
//     (b) ¿qué es screen y de dónde saca los elementos?
//           R.P.:
//     (c) RTL no prueba tu estado ni tus handlers — prueba lo que el
//     usuario VE. ¿Por qué esa es la filosofía y no al revés?
//           R.P.:
//
// A.2 Lee https://testing-library.com/docs/queries/about/ — la tabla
//     de Variantes (getBy / queryBy / findBy). UNA línea cada uno:
//     cuándo devuelve, cuándo explota, cuándo espera.
//           R.P. getBy:
//           R.P. queryBy:
//           R.P. findBy:
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
//           R.P. (predicción):
//           R.P. (resultado):
//   Si truena: lee el error COMPLETO — la causa vive en la PRIMERA
//   línea del mensaje (no en el final). El fix es UNA línea en
//   setupTests.ts. ¿Qué acababa de pasar con el render del test 1
//   cuando el test 2 arrancó?
//           R.P.:
//
// B.2 CONTADOR COMPLETO (3 tests, todos verdes):
//   - test 1: pinta "Clicks dados: 0" al montar.
//   - test 2: 2 clicks en "Dame click!" → aparece "Clicks dados: 2".
//   - test 3: 3 clicks + aprieta "¿Cuántos van?" → aparece "Van: 3".
//   (El test 3 cruza TODO lo aprendido: useState + useRef + eventos.)
//   Para apretar botones: userEvent (A.1 te mostró el import).
//
// B.3 TRAMPA de decisión: getByText("Clicks dados: 2") es exacto.
//   Ahora escribe getByText(/clicks/i) — regex, con la i final.
//   PREDICE antes de correr: ¿cuántos nodos de TU Contador matchean
//   ese regex? (Cuenta los TEXTOS de tu Contador.tsx — son cuatro.)
//   ¿Qué pasa si un getBy matchea 2 elementos? ¿Y cuándo te CONVIENE
//   el regex sobre el string exacto? Defiende en dos líneas.
//           R.P. (predicción):
//           R.P.:
//
// ═══════════ PARTE C — CIERRE CONCEPTUAL ═══════════
//
// C.1 ¿Qué ES React Testing Library? Una línea tipo "cat". (Regla
//   de Santiago: no "sirve para probar" — QUÉ ES.)
//           R.P.:
//
// C.2 En Fase 2 tu spec mockeaba el Repository. Hoy NO mockeaste
//   nada. ¿Por qué el Contador no necesitó mocks y el service sí?
//   Una línea.
//           R.P.:
//
// C.3 Entrevista: "¿Cómo pruebas un componente que hace fetch?"
//   Tres líneas. (Pista: el fetch se mockea GLOBAL, no el
//   componente — y una app real prueba el happy path Y el error.)
//           R.P.:
//
// C.4 FASE 3 SE CIERRA HOY: tu order-frontend tiene 8 componentes,
//   router, tres estados de carga, un hook propio, Context y un
//   useMemo con veredicto honesto. Dos líneas sinceras: ¿qué fue lo
//   que MÁS te costó de la fase? ¿Qué volverías a hacer distinto?
//           R.P.:
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
