// ═══════════════════════════════════════════════════════════════
// TASK D32 — LUNES 12-OCT · Fase 3: React día 3 · Render + Virtual DOM + useEffect
// ESTADO: CALIBRADA (escrita dom 11-oct tras cerrar D31; páginas
// verificadas vivas con curl: render-and-commit,
// synchronizing-with-effects, reference/react/useEffect → 200.
// CORREGIDA mar 13-oct EN VIVO: el ejemplo document.title que citaba
// A.2/B.1 YA NO existe en la página actual (0 ocurrencias en el HTML
// crudo; hoy abre con VideoPlayer) — reescrito hacia MDN
// Document/title, verificada viva. El curl→200 de anoche probaba
// existencia, no contenido.
// Repos al día: order-frontend 337be22 (Contador+Pedido+lista),
// tsc 0 errores. Anki: 3 cartas d31 nuevas esperando.)
//
// Contexto: ayer te bloqueaste con el enunciado de C.2 y lo
// resolvimos en chat — el bloqueo era el REPARTO (quién hace qué),
// no React. Lección anotada: si no entiendes QUÉ te piden, subraya
// la línea exacta y pregunta ANTES de teclear. Hoy el plan sigue:
// la página ya recuerda (useState); ahora va a REACCIONAR al mundo
// exterior. Si el navegador no está abierto:
// cd order-frontend && npm run dev.
//
// ═══ REIMU (corrección) — Oct 13, cierre D32: 8 bloques. LEER MAÑANA
// ANTES del warm-up de D33 (task 1014). La clave del día: A.1 —
// renderizar NO es pintar la pantalla (el enunciado te lo avisó). ═══
//
// ═══════════ WARM-UP (sin editor — responde en este archivo) ═══════════
//
// 0. COBRO DE AYER: abre el banner REIMU del 11-oct arriba de este
//    archivo y léelo completo (5 bloques). Anki: las 3 de ayer
//    (d31) te esperan nuevas en el mazo.
//
// 1. Ayer escribiste en B.2 que el número de cada contador "vive
//    en la llamada" — y tu predicción de scope (correcta) decía lo
//    contrario. Reescríbela AHORA en una línea, con tus palabras:
//    ¿dónde vive el número de cada contador y por qué no se
//    comparten?
//           R.P.: Vive en el componente, no se comparten porque son similares al scope de Js. Cada componente que se llama tiene su propia casa con sus propios datos e información.
//          ── REIMU (corrección, Oct 13): Saldado y bien — y HOY lo viviste en
//          carne: dos <Contador>, dos cuentas separadas. El número vive en el
//          useState de CADA componente; cada llamada, su propia casa. Línea de
//          entrevista: estado por instancia, no por clase.
//
// 2. Ayer la key de tu lista quedó en p.nombre y dijiste que lo
//    natural era el id. En UNA línea: ¿por qué el id es mejor key
//    que el nombre? (tu corrección de ayer ya te dio la pista).
//           R.P.: Porque el id es imposible (a menos que haya un bug) que se repita el número. El key es básicamente una verificación sobre cada objeto, ¿Qué verifica? Básicamente verifica que el objeto esté correcto.
//          ── REIMU (corrección, Oct 13): La mitad de arriba perfecta (id no se
//          repite). La de abajo no: la key no 'verifica correctitud' — es el
//          carnete que le dice a React QUIÉN es cada elemento entre un render y
//          el siguiente. React no re-crea al que mantiene su carnet; re-crea al
//          que no puede identificar. Identidad, no auditoría.
//
// 3. Rompehielos (intuición pura, no se penaliza "ni idea"): el
//    título de la pestaña del navegador — esa etiqueta de arriba —
//    ¿está DENTRO de tu página React o FUERA de ella? ¿Crees que
//    React lo pinta él solo?
//           R.P.: Está fuera, en el index.html si no me equivoco. Sí, ahí está.
//          ── REIMU (corrección, Oct 13): Correcto — y ahí está la gracia del
//          día: el título vive en index.html, FUERA de tu página React. Por eso
//          necesitaba un efecto para tocarlo: useEffect existe para lo que está
//          afuera. Tu B.1 fue la prueba viviente.
//
// ═══════════ PARTE A — LECTURA PRIMERO (regla de la casa) ═══════════
//
// A.1 Lee https://react.dev/learn/render-and-commit — completa, es
//     corta: los TRES pasos (disparar → renderizar → confirmar).
//     Ojo al paso 2: "renderizar" NO es pintar la pantalla. Una
//     línea: ¿qué significa "renderizar" en React?
//           R.P.: Renderizar significa actualizar la pantalla. Es cómo cuando estás jugando un juego, y el juego va a 60FPS, el juego qué está haciendo? Está actualizando (renderizando) la pantalla 60 veces por segundo. En el caso de React, React solo lo hace cuando hay un cambio en el DOM.
//          ── REIMU (corrección, Oct 13): Aquí está el hueco del día — el
//          enunciado avisó 'renderizar NO es pintar la pantalla' y tu primera
//          frase dice exactamente eso. Renderizar = React VUELVE A LLAMAR tu
//          función de componente y calcula el JSX nuevo. Pura llamada, cero
//          pantalla. Quien toca la pantalla es el paso 3 (commit), y solo lo
//          cambiado. Tu analogía de los 60FPS es el COMMIT; React no renderiza
//          60 veces por segundo — solo cuando algo dispara (tu setClicks).
//
// A.2 Lee https://react.dev/learn/synchronizing-with-effects — SOLO
//     las dos primeras secciones ("What are Effects and how are they
//     different from events?" y "You might not need an Effect").
//     [CORREGIDO 13-oct: tu CTRL+F tenía razón — el ejemplo de la
//     pestaña que yo cité YA NO está en esta página; error mío, cité
//     de memoria una versión vieja. El que abre hoy es un reproductor
//     de video.] Una línea: ¿para qué existe useEffect, con qué se
//     "sincroniza"?
//           R.P.: Existe para ejecutar acciones o "efectos" que ocurren según lo que se renderice en pantalla (El DOM). y se sincroniza manteniendo un estado en la memoria en conjunto al componente.
//          ── REIMU (corrección, Oct 13): A medias. 'Según lo que se renderice'
//          va bien (corre DESPUÉS del render). Pero NO se sincroniza con un
//          estado en memoria — se sincroniza con algo FUERA de React (sistema
//          externo, dice la doc): el título del navegador, el DOM que React no
//          controla, una red. Tu document.title de hoy ES el ejemplo canónico.
//
// ═══════════ PARTE B — DEUDA + EFECTO: la pestaña reacciona (editor SÍ) ═══════════
//
// B.0 DEUDA DE AYER (mecánico, 5 min): agrégale id a cada pedido
//   del array en App (1, 2, 3... a tu gusto) y cambia la key del
//   map a ese id. Tu W.2 de hoy justifica el cambio.
//
// B.1 En Contador: un useEffect que mantenga el TÍTULO DE LA
//   PESTAÑA sincronizado con la cuenta. [CORREGIDO 13-oct: A.2 ya
//   NO trae el ejemplo resuelto — era de una versión vieja de la
//   página.] La pieza que te falta (qué propiedad escribe ese
//   título) está en la doc oficial del navegador:
//   https://developer.mozilla.org/en-US/docs/Web/API/Document/title
//   El efecto reacciona cuando clicks cambia. Nada más: sin
//   timers, sin limpiezas.
//
// B.2 PREDICCIÓN (antes de probar, en este archivo):
//   a) Al ABRIR la página, sin ningún click, ¿qué dice el título
//      de la pestaña?
//   b) Le das 3 clicks al contador de ARRIBA, y luego 1 click al
//      de ABAJO. ¿Qué dice el título al final?
//           R.P.: A) "Clicks: 0!" B) Primero debería decir "Clicks: 3!" y luego con el de abajo "Clicks: 1!".
//          ── REIMU (corrección, Oct 13): Predicción EXACTA en a) y b), y la
//          mecánica bien explicada: 2 efectos vivos, escribe el último en correr.
//          El detalle fino que quedó afuera: tu useEffect quedó SIN array de
//          dependencias — corre después de CADA render de su componente. Hoy es
//          inofensivo (tu Contador solo re-renderiza cuando clicks cambia), pero
//          el array [clicks] es cómo le DECLARAS a React a qué reacciona. Cuando
//          el componente crezca y re-renderice por otras razones, el efecto sin
//          array correrá de más. Material de carta de hoy.
//   Prueba. Si tu predicción falló en a) o b), explica en UNA
//   línea cada fallo (pista para b): ¿cuántos efectos hay vivos,
//   y quién escribe en el título?)
//           R.P.: Hay 2 en total porque hay 2 componentes. Y se actualiza con el más reciente/actual.
//          ── REIMU (corrección, Oct 13): Correcto y es la respuesta a la pista:
//          dos instancias = dos efectos; al click del de abajo solo SU render
//          ocurrió, así que solo SU efecto escribió. El título es uno; los
//          escritores, dos. Bien cerrado.
//
// ═══════════ PARTE C — ALCANCE DEL RE-RENDER (razonamiento) ═══════════
//
// C.1 Según A.1, cuando haces click en el contador de arriba:
//   ¿QUÉ se vuelve a renderizar — el contador de arriba solo, los
//   dos contadores, o toda la página incluida la lista de pedidos?
//   Dos líneas: tu respuesta y el PORQUÉ (A.1 lo dice casi literal).
//           R.P.: Solo se vuelve a renderizar el DOM del componente, ya que lo demás está estático, es inecesario actualizar lo demás (Compara entre dos versiones, la vieja y la actual, solo cambia lo que cambió en la actual). Solo hace lo que se le pide actualizar, que serían los clicks y el título de la pestaña.
//          ── REIMU (corrección, Oct 13): Esencialmente correcto: solo el
//          componente cuyo estado cambió. Precisión de vocabulario: re-render =
//          React vuelve a EJECUTAR esa función (no 'su DOM'). Y notarás que
//          'compara dos versiones y solo cambia lo que cambió' es literalmente
//          C.2 — respondiste el Virtual DOM dos veces. No está mal; es reparto.
//
// C.2 El "Virtual DOM" del título de hoy es la pieza que hace que
//   esa respuesta no dé miedo: React compara lo que produce el
//   render con lo que ya está en pantalla y toca SOLO lo que
//   cambió. Una línea tuya: ¿por qué eso es mejor que borrar la
//   página entera y re-pintarla?
//           R.P.: Porque no se malgastan recursos, además, que a cada rato re-pinte la pantalla daría flickers en el renderizado de todo. Es mejor solo tocar lo que realmente cambió.
//          ── REIMU (corrección, Oct 13): Bien — recursos y flicker, las dos
//          razones correctas. Línea extra de entrevista: repintar todo también
//          DESTRUYE estado del DOM real que React no controla (scroll, foco en
//          un input, texto seleccionado). El diff lo conserva. Guárdala.
//
// ═══════════ CIERRE ═══════════
// - tsc: npx tsc --noEmit -p tsconfig.app.json → 0 errores.
// - Commit en order-frontend (id+key, useEffect, título).
// - Anki: las 3 de ayer + las que salgan de hoy (máx 3).
// - Batsu. Dormir a tiempo.
//
// NOTA de Reimu: ayer cerraste un día que arrancó bloqueado —
// pregunta en vez de rabia, D.2 rehecho tras las tres
// observaciones, tsc en 0. Eso ES el oficio. Hoy el foco es uno
// solo: useEffect = sincronizar con el mundo de afuera. Si el
// enunciado traba, subraya la línea y pregunta — pero primero
// A.2 + la MDN de B.1, que traen el camino.
