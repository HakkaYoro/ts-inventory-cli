// ═══════════════════════════════════════════════════════════════
// TASK D32 — LUNES 12-OCT · Fase 3: React día 3 · Render + Virtual DOM + useEffect
// ESTADO: CALIBRADA (escrita dom 11-oct tras cerrar D31; páginas
// verificadas vivas con curl: render-and-commit,
// synchronizing-with-effects, reference/react/useEffect → 200.
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
//           R.P.:
//
// 2. Ayer la key de tu lista quedó en p.nombre y dijiste que lo
//    natural era el id. En UNA línea: ¿por qué el id es mejor key
//    que el nombre? (tu corrección de ayer ya te dio la pista).
//           R.P.:
//
// 3. Rompehielos (intuición pura, no se penaliza "ni idea"): el
//    título de la pestaña del navegador — esa etiqueta de arriba —
//    ¿está DENTRO de tu página React o FUERA de ella? ¿Crees que
//    React lo pinta él solo?
//           R.P.:
//
// ═══════════ PARTE A — LECTURA PRIMERO (regla de la casa) ═══════════
//
// A.1 Lee https://react.dev/learn/render-and-commit — completa, es
//     corta: los TRES pasos (disparar → renderizar → confirmar).
//     Ojo al paso 2: "renderizar" NO es pintar la pantalla. Una
//     línea: ¿qué significa "renderizar" en React?
//           R.P.:
//
// A.2 Lee https://react.dev/learn/synchronizing-with-effects — SOLO
//     las dos primeras secciones. El primer ejemplo hace EXACTAMENTE
//     lo que harás en la Parte B, con document.title. Una línea:
//     ¿para qué existe useEffect, con qué se "sincroniza"?
//           R.P.:
//
// ═══════════ PARTE B — DEUDA + EFECTO: la pestaña reacciona (editor SÍ) ═══════════
//
// B.0 DEUDA DE AYER (mecánico, 5 min): agrégale id a cada pedido
//   del array en App (1, 2, 3... a tu gusto) y cambia la key del
//   map a ese id. Tu W.2 de hoy justifica el cambio.
//
// B.1 En Contador: un useEffect que mantenga el TÍTULO DE LA
//   PESTAÑA sincronizado con la cuenta — A.2 te mostró la forma
//   exacta con document.title. El efecto reacciona cuando clicks
//   cambia. Nada más: sin timers, sin limpiezas.
//
// B.2 PREDICCIÓN (antes de probar, en este archivo):
//   a) Al ABRIR la página, sin ningún click, ¿qué dice el título
//      de la pestaña?
//   b) Le das 3 clicks al contador de ARRIBA, y luego 1 click al
//      de ABAJO. ¿Qué dice el título al final?
//           R.P.:
//   Prueba. Si tu predicción falló en a) o b), explica en UNA
//   línea cada fallo (pista para b): ¿cuántos efectos hay vivos,
//   y quién escribe en el título?)
//           R.P.:
//
// ═══════════ PARTE C — ALCANCE DEL RE-RENDER (razonamiento) ═══════════
//
// C.1 Según A.1, cuando haces click en el contador de arriba:
//   ¿QUÉ se vuelve a renderizar — el contador de arriba solo, los
//   dos contadores, o toda la página incluida la lista de pedidos?
//   Dos líneas: tu respuesta y el PORQUÉ (A.1 lo dice casi literal).
//           R.P.:
//
// C.2 El "Virtual DOM" del título de hoy es la pieza que hace que
//   esa respuesta no dé miedo: React compara lo que produce el
//   render con lo que ya está en pantalla y toca SOLO lo que
//   cambió. Una línea tuya: ¿por qué eso es mejor que borrar la
//   página entera y re-pintarla?
//           R.P.:
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
// A.2, que trae el ejemplo resuelto.
