// ═══════════════════════════════════════════════════════════════
// TASK D33 — MIÉRCOLES 14-OCT · Fase 3: React día 4 · Context + Custom Hooks
// ESTADO: CALIBRADA (pre-verificada mar 13-oct: páginas verificadas
// por CONTENIDO, no solo por existencia — headings y términos
// confirmados en el HTML crudo: passing-data-deeply-with-context
// trae createContext/useContext vivos; reusing-logic-with-custom-hooks
// alive. Lección del 13-oct aplicada: curl 200 ya no alcanza).
// Repos al día: order-frontend da5c1a5 (useEffect título + id/key),
// tsc 0 errores. Anki: tanda de 10/día activada (ver chat del 13).
//
// Contexto: ayer fluiste — sin LLMs, predicción B.2 exacta, y el
// título reaccionando al click. Hoy DOS piezas nuevas que juntan
// lo tuyo: (1) un hook PROPIO construido sobre el efecto de ayer,
// (2) Context para que un componente lea datos sin que se los pases
// por props. Si el navegador no está abierto:
// cd order-frontend && npm run dev.
//
// ═══ REIMU (cierre D33, Oct 16): 11 bloques abajo — LEER MAÑANA ANTES
// del warm-up de D34. La de C.2 es la clave: un hook NO se activa solo,
// se llama. Tu B.2 fue la predicción más limpia de la semana. ═══

// ═══════════ WARM-UP (sin editor — responde en este archivo) ═══════════
//
// 0. COBRO DE AYER: abre el banner REIMU del 13-oct arriba de este
//    archivo y léelo completo (9 bloques). La de A.1 es la que hoy
//    se cobra abajo. Anki: la tanda de hoy ya está tapada a 10 —
//    el número grande no te lo muestra más.
//
// 1. Ayer el enunciado de A.1 te AVISÓ literal ("renderizar NO es
//    pintar la pantalla") y tu primera frase dijo lo contrario.
//    Reescríbela AHORA, una línea: ¿qué es renderizar y quién es
//    el que toca la pantalla?
//           R.P.: Commit es lo que toca la pantalla/pinta la pantalla. Renderizar es el borrador creando el virtual DOM sin dibijar nada.
//          ── REIMU (corrección, Oct 16): Saldado. Commit pinta, render calcula el
//          borrador (virtual DOM) sin tocar pantalla. Exacto — deuda de ayer cobrada
//          a la primera. Así se cierra un hueco.
//
// 2. Tu useEffect de ayer quedó SIN array de dependencias y funciona
//    igual. Una línea: tal como está, ¿cuándo corre tu efecto — y
//    qué cambiaría con [clicks]?
//           R.P.: Corre el efecto cada que corre la función de Contador. Si le coloco [clicks] se va a asegurar que solo cambie cuando el valor de "clicks".
//          ── REIMU (corrección, Oct 16): Bien: sin array corre en cada render; con
//          [clicks] solo cuando clicks cambia. Y lo aplicaste HOY solo en
//          useDocumentTitle([title]) sin que nadie te lo pidiera — eso es
//          transferencia, vale más que la respuesta correcta.
//
// 3. Rompehielos: en tu App, la prop "nombre" viaja de App a cada
//    <Saludo>. Si MAÑANA toda la app (10 componentes) necesitara
//    saber el usuario actual, ¿le pasarías la prop por los 10? ¿Qué
//    pasa con los componentes del medio que no la usan? (no hay
//    respuesta incorrecta — es la puerta del tema de hoy).
//           R.P.: No sé de que hablas.
//          ── REIMU (corrección, Oct 16): Era a propósito — la puerta del tema de
//          hoy. La respuesta ya la tienes: con 10 componentes, los del medio cargan
//          y reenvían una prop que no usan. Tu frase del chat ('en chico no se ve,
//          en grande sí') ES la respuesta de C.1 — guárdala.
//
// ═══════════ PARTE A — LECTURA PRIMERO (regla de la casa) ═══════════
//
// A.1 Lee https://react.dev/learn/passing-data-deeply-with-context
//     — SOLO hasta el final de la sección "Using and providing
//     context from the same component". CORTA ahí (el resto es
//     material de otro día). Una línea: ¿qué problema resuelve
//     Context, y con qué piezas se arma (crear / proveer / leer)?
//           R.P.: Es un wrapper de datos. Lo que hace es tomar los datos que se le proveen, los envuelve en un componente y los retorna. Y los tres son createContext / Provider / useContext.
//          ── REIMU (corrección, Oct 16): Los tres nombres exactos — bien. Pero
//          'wrapper de datos que retorna' se queda corto: Context no envuelve para
//          devolver, deja el dato disponible ARRIBA y cualquiera ABAJO lo toma sin
//          pasar por los del medio. El problema (props atravesando 10 componentes)
//          nunca salió en tu línea — vivía en W.3.
// A.2 Lee https://react.dev/learn/reusing-logic-with-custom-hooks
//     — SOLO dos secciones: "Custom Hooks: Sharing logic between
//     components" y "Passing reactive values between Hooks". Una
//     línea: ¿qué es un custom hook y qué regla de NOMBRE trae?
//           R.P.: Un hook es algo que se activa si un componente necesita hacer algo, aes para no repetir código. Literalmente, si algo se ejecuta, llama al hoom y provee su función. Y el patrón es useCamelCase. El "use" es obligatorio.
//          ── REIMU (corrección, Oct 16): Regla del nombre: perfecta (use +
//          CamelCase, use obligatorio). La definición no: un hook no 'se activa si
//          el componente necesita algo' — es una función que TÚ LLAMAS dentro del
//          componente para reutilizar lógica. Se llama, como llamaste
//          useDocumentTitle() en Contador. ('aes', 'hoom' — typos de niebla, no
//          cuentan.)
//
// ═══════════ PARTE B — TU HOOK + CONTEXT (editor SÍ) ═══════════
//
// Reparto (lección del domingo — qué vive en cuál):
//   - src/hooks/useDocumentTitle.ts = NUEVO. Vive tu hook de hoy.
//   - Contador.tsx = llama al hook; el título sigue reaccionando.
//   - App.tsx = PROVEE el contexto (y sigue montando todo igual).
//   - Saludo.tsx = LEE el contexto. Sin props nuevas.
//   - Tarjeta.tsx = NO SE TOCA. Eso es parte de la prueba.
//
// B.0 EXTRACCIÓN (tu código de ayer, 10 min): mueve el useEffect
//   del título de Contador.tsx a un custom hook propio en
//   src/hooks/useDocumentTitle.ts. Contador lo llama y el título
//   reacciona exactamente igual que ayer. A.2 te dio la regla del
//   nombre — el nombre del archivo ya la respeta.
//
// B.1 CONTEXT en tu app: crea un contexto de "usuario actual".
//   ATENCIÓN — trampa de datos del día: createContext arranca con
//   un VALOR POR DEFECTO, y ese default es DECISIÓN TUYA (qué valor
//   tiene sentido si nadie provee nada). App lo provee con tu
//   usuario; el <Saludo> que vive DENTRO de Tarjeta lo lee del
//   contexto y muestra ese usuario — sin tocar Tarjeta y sin
//   recibir una prop nueva. Los otros dos saludos (Marisa,
//   Gabriel) siguen exactamente igual, con su prop nombre.
//
// B.2 PREDICCIÓN (antes de probar, en este archivo): si comentas
//   el Provider entero, ¿qué lee el Saludo de adentro — error,
//   undefined, u otra cosa? Una línea.
//           R.P.: Sale "Invitado"
//          ── REIMU (corrección, Oct 16): EXACTA — y la predicción más valiosa del
//          día: elegiste el default tú, predijiste que sin Provider cae al default,
//          y el navegador lo confirmó. Decidir → predecir → verificar: ese circuito
//          es literalmente el oficio.
//   Prueba. Si tu predicción falló, tu propio default de B.1 te
//   explica por qué. Una línea el fallo (si hubo).
//           R.P.: No hubo fallo.
//          ── REIMU (corrección, Oct 16): Sin fallo y registrado. Bien.
//
// ═══════════ PARTE C — CIERRE CONCEPTUAL ═══════════
//
// C.1 Tarjeta no se enteró de NADA hoy — no la tocaste y el dato
//   igual llegó al Saludo de adentro. Dos líneas: ¿por qué "el del
//   medio no se entera" es exactamente la ventaja de Context sobre
//   las props?
//           R.P.: La ventaja en sí de las props es que en proyectos grandes, facilita la inserción de datos o de funciones especiales o similar. Cosas que sigan siempre un patrón.
//          ── REIMU (corrección, Oct 16): Lo que dijiste en el chat valía más que
//          esto: 'en chico no se ve la ventaja, en grande sí' + los del medio
//          reenviando sin usar. ESO es C.1. El porqué del medio: el dato viaja por
//          el Provider POR ENCIMA de él, no a través de sus props — por eso no se
//          entera y por eso eso es la ventaja.
//
// C.2 Vocabulario del día, una línea cada uno con tus palabras:
//   ¿qué es el Provider? ¿qué es un custom hook?
//           R.P.: Un Custom Hook es una función que solo se activa al accionar ciertas condiciones de forma automática (Misma idea que los hooks de Pacman en Arch). El provider cómo el nombre lo dice, provee datos a un context.
//          ── REIMU (corrección, Oct 16): Provider: breve y exacto. Custom hook:
//          NO 'se activa al accionar condiciones' — es una función que encapsula
//          lógica reutilizable y SE LLAMA desde el componente. El anchor de Pacman
//          es creativo pero te traiciona en una entrevista: los hooks de pacman son
//          TRIGGERS (evento dispara acción); los de React son FUNCIONES que tú
//          invocas. La diferencia es quién inicia: ahí nadie, aquí tú.
//
// C.3 La trampa de B.1, defendida: ¿por qué ESE default y no otro?
//   ¿Qué pasa si un componente lee el contexto sin Provider y tu
//   default era un valor "inocente"? Dos líneas defendiendo tu
//   decisión (el bug silencioso es el punto).
//           R.P.: Cual bug silencioso? La idea de poner un default (en este caso Invitado) porque son saludos, en el caso de no saber quien es quien te habla, lo mejor es llamar a la persona invitado, en vez de anónimo o inocente.
//          ── REIMU (corrección, Oct 16): El bug silencioso: con default undefined,
//          un Saludo sin Provider mostraría 'Hola, ' — raro y VISIBLE. Con
//          'Invitado' renderiza bonito y NADIE nota que falta el Provider — el bug
//          se disfraza de feature. Por eso el default es decisión de ingeniería,
//          no de cortesía. Tu defensa UX (Invitado vs anónimo) es válida — pero era
//          la mitad de la pregunta.
//
// C.4 Entrevista: "¿Cuándo escribes un custom hook en vez de copiar
//   el efecto en cada componente?" Tu useDocumentTitle de HOY es la
//   respuesta. Dila en una línea.
//           R.P.: Solo se usa un hook en vez de un effect si se va a repetir la misma acción varias veces a través de varios archivos.
//          ── REIMU (corrección, Oct 16): Correcto, y es tu línea de entrevista:
//          'cuando la misma lógica se repite en varios componentes, extraigo un
//          hook — mi useDocumentTitle es el ejemplo'. Entendida así, no memorizada.
//
// ═══════════ CIERRE ═══════════
// - tsc: npx tsc --noEmit -p tsconfig.app.json → 0 errores.
// - Commit en order-frontend (hook + context + provider).
// - Commit acá (respuestas).
// - Anki: tanda de 10 (la cola ya está tapada a 10/día — solo
//   cumple la tanda, no mires el total).
// - Batsu. Dormir a tiempo.
//
// NOTA de Reimu: ayer cerraste fluido y autónomo — el error del
// document.title lo leíste del compilador y lo corrigiste solo, y
// la predicción de los dos contadores fue exacta. Eso ES el oficio
// que te van a pagar. Hoy el foco: dos piezas nuevas, ambas montan
// sobre cosas que YA escribiste. Si el enunciado traba, subraya la
// línea y pregunta — pero primero A.1 y A.2.
