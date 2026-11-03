// ═══════════════════════════════════════════════════════════════
// TASK D38 — MARTES 3-NOV · Fase 3: React día 9: Testing con RTL
// (React Testing Library + Vitest) → CIERRA FASE 3
// ESTADO: CALIBRADA (lun 2-nov, cierre D37 — regla 0b). Deck: 184
// (3 de d37 + 3 de d35 NUEVAS de anoche — verlas HOY temprano; ojo,
// la de StrictMode la vas a VIVIR hoy mismo en B.1). Repos:
// ts-inventory 59f521f + cierre de anoche, order-frontend de10a80,
// order-api 5e6608b. tsc 0 en todo.
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
//           R.P.:
//
// 1. Anki primero (6 nuevas de anoche: 3 de d37 + 3 de d35). La de
//    StrictMode déjala fresca — B.1 te la va a cobrar en persona.
//
// 2. Sin instalar nada: tu Contador YA es testable tal como está.
//    Un test aprieta el botón "Dame click!" UNA vez. PREDICE: ¿qué
//    texto exacto aparece en pantalla después, y con qué número?
//    (Adivina de memoria, sin abrir el archivo.)
//           R.P.:
//
// ═══════════ PARTE A — LECTURA PRIMERO (regla de la casa) ═══════════
//
// A.1 Lee https://testing-library.com/docs/react-testing-library/intro/
//     — hasta el final del primer ejemplo de código. Tres líneas:
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
//           R.P. (predicción):
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
//   Pero getByText(/Clicks/) con regex... tu Contador pintó DOS
//   <i> con la palabra Clicks adentro ("Clicks dados" y ¿la otra?).
//   ¿Qué pasa si un getBy matchea 2 elementos? ¿Y cuándo te CONVIENE
//   el regex sobre el string exacto? Defiende en dos líneas.
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
// - vitest: npm test → 5/5 verdes (2 del muro + 3 de B.2).
// - Commits: order-frontend (tests del Contador + config) + este repo.
// - Anki: tanda (6 nuevas de ayer + las que nazcan hoy: la pareja
//   getBy/queryBy/findBy es carta casi segura).
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
// FOOTER de links (por si mueren): testing-library.com/docs/
// react-testing-library/intro y /docs/queries/about — verificadas
// POR CONTENIDO el 2-nov (anclas: "React Testing Library" ×5 en
// intro; getByText ×14 en queries). La web es JS-render en partes:
// si CTRL+F no encuentra algo, la sección está más abajo o llegó
// tarde al DOM — recarga antes de declarar muerto un link.
//
