// ═══════════════════════════════════════════════════════════════
// TASK D37 — VIERNES 30-OCT · Fase 3: React día 8: useMemo +
// useCallback (+ estado global, de paseo)
// ESTADO: CALIBRADA (mié 28-oct, al cierre de D36 — REGLA 0b nueva:
// la task siguiente nace EN el cierre). Deck: 179 cartas (2 de d36
// NUEVAS: router=Repartidor + relations — verlas HOY temprano; 3 de
// d35 siguen esperando tanda). Repos: ts-inventory 63414db (push OK),
// order-frontend 2c3a381, order-api 5e6608b (push OK). tsc 0 en todo.
//
// Contexto: tu /pedidos YA le pide datos a tu API y los pinta con
// tres estados. Hoy le sumas una capa nueva a un componente que ya
// es tuyo. El día es sobre CUÁNDO React recalcula y cómo decirle
// "no lo recalculés". Pero primero, el cobro.
//
// ═══════════ WARM-UP (sin editor — responde en este archivo) ═══════════
//
// 0. COBRO DE AYER — en voz alta, SIN abrir el archivo todavía:
//    (a) La cadena de tu Pedidos.tsx: {loading ? ... : error ? ... :
//    (orders.length === 0 ? ... : lista)} — ¿POR QUÉ se lee en ese
//    orden y no al revés? Dos líneas.
//           R.P.:
//    (b) ¿Qué hace el ?. en order.cliente?.nomCompleto, y qué pasa
//    si cliente no existe? ¿Y el ?? del final?
//           R.P.:
//    Recién ahora abre tu Pedidos.tsx y CONTRASTA lo que dijiste
//    contra el archivo. Lo que no coincida = lo que se te quedó del
//    LLM. Una línea: ¿qué te faltó?
//           R.P.:
//
// 1. Anki primero (5 cartas nuevas esperan: 2 de d36 + 3 de d35).
//    La de "¿qué ES un router?" la contestaste ayer como "una ruta
//    dentro de un sitio" y la carta dice otra cosa. Léela dos veces.
//
// 2. Sin mirar nada: cuando tu /pedidos recibió la lista y la pintó,
//    ¿cuántas veces corrió tu función Pedidos de punta a punta desde
//    que entraste a la URL hasta que viste los 12 pedidos? (Pista:
//    StrictMode. Adivina, no busques.)
//           R.P.:
//
// ═══════════ PARTE A — LECTURA PRIMERO (regla de la casa) ═══════════
//
// A.1 Lee https://react.dev/reference/react/useMemo — SOLO hasta el
//     final de "Reference". Tres líneas:
//     (a) ¿qué devuelve useMemo — el RESULTADO de calcular, o la
//     función de calcular?
//           R.P.:
//     (b) ¿QUÉ guarda entre renders y qué lo invalida?
//           R.P.:
//     (c) En una línea: ¿qué problema resuelve?
//           R.P.:
//
// A.2 Lee https://react.dev/reference/react/useCallback — SOLO hasta
//     el final de "Reference". Dos líneas:
//     (a) ¿qué guarda useCallback (ojo: NO es lo mismo que useMemo)?
//           R.P.:
//     (b) useMemo devuelve X, useCallback devuelve Y. ¿X e Y?
//           R.P.:
//
// A.3 PASEO (10 min máximo, cero código): estado global = datos que
//     CUALQUIER componente puede leer sin que se los pasen por props
//     uno a uno. Ya conoces UNO de la task 1014 (D33). ¿Cuál? Una
//     línea. (Redux/Zustand: que te suenen los nombres, nada más.)
//           R.P.:
//
// ═══════════ PARTE B — EN TU PROYECTO ═══════════
//
// B.0 LA PRUEBA DE QUE HAY PROBLEMA: en tu Clicks.tsx (el Contador
//   de siempre), agrega un console.log adentro del cuerpo del
//   componente. Abre /clicks, mira la consola, y aprieta el botón
//   3 veces. ¿Cuántos logs por clic? PREDICE antes de mirar:
//           R.P. (predicción):
//           R.P. (resultado):
//
// B.1 LA LISTA CARA: en Pedidos.tsx, tu .map(...) que arma los
//   PedidoItem corre en cada render. Hoy no duele (12 pedidos,
//   localhost). Hazlo MEDIBLE:
//   - Pásale un array de 200 pedidos a tu API (Reimu te los carga
//     si los pides — o hazlo tú con un for y fetch POST).
//   - PREDICCIÓN: ¿va a notarse la diferencia en /pedidos? ¿Por qué
//   sí o por qué no? (Honesto: probablemente no — y explicar POR
//   QUÉ no se nota es la respuesta buena.)
//           R.P. (predicción):
//   - Envuelve tu .map(...) con useMemo y su dependency array.
//   - ¿Qué le pusiste adentro del array? ¿Por qué ESOS y no otros?
//           R.P.:
//
// B.2 LA FUNCIÓN ESTABLE: tu Nav.tsx usa style con una arrow function
//   ({({ isActive }) => ({...})}). Esa función nace nueva en cada
//   render. ¿UseCallback aplica ahí? Investiga 5 minutos y responde
//   sí/no con una línea de por qué. (Trampa posible: la respuesta
//   puede ser "no aplica". Defender > copiar.)
//           R.P.:
//
// ═══════════ PARTE C — CIERRE CONCEPTUAL ═══════════
//
// C.1 ¿Qué ES useMemo? Una línea tipo "cat". (Regla de Santiago:
//   no "sirve para optimizar" — QUÉ ES.)
//           R.P.:
//
// C.2 Tu B.0 mostró que el cuerpo del componente corre en cada
//   render. ¿Por qué React recalcula TODO el componente si solo
//   cambió un número del estado? Una línea. (Pista: render barato,
//   modelo mental simple.)
//           R.P.:
//
// C.3 Entrevista: "useMemo y useCallback — ¿cuándo usarlos y cuándo
//   NO?" Tres líneas. La palabra "innecesario" tiene que aparecer.
//           R.P.:
//
// C.4 Estado global: tu Context (D33) comparte el nombre del
//   usuario. ¿Qué le pasaría a tu app si 10 componentes más
//   necesitaran 10 datos más por Context? ¿Cuándo conviene Redux/
//   Zustand? Dos líneas.
//           R.P.:
//
// ═══════════ CIERRE ═══════════
// - tsc: npx tsc --noEmit -p tsconfig.app.json → 0 errores.
// - Commits: order-frontend (useMemo en Pedidos) + este repo.
// - Anki: tanda (5 nuevas esperando + las que nazcan hoy: useMemo/
//   useCallback son pareja de cartas casi segura).
// - Batsu. Dormir a tiempo.
//
// NOTA de Reimu: useMemo/useCallback son los hooks MÁS abusados de
// React — la mitad de internet los pone en todo "porque optimiza".
// La task de hoy te hace medir ANTES de optimizar (B.0/B.1), que es
// lo que separa a quien entiende de quien decora. Si el 200-pedidos
// no se nota: PERFECTO — "no se nota y por eso no lo necesito" es
// una respuesta de 20/20, no una derrota. Y el cobro del warm-up es
// la deuda del 95% LLM de ayer: lo que no puedas explicar de tu
// propio Pedidos.tsx, no es tuyo todavía. COMER A TIEMPO.
//
// FOOTER de links (por si mueren): react.dev/reference/react/useMemo
// y /useCallback — verificadas POR CONTENIDO el 28-oct (anclas:
// "useMemo(calculateValue, dependencies)" y "useCallback(fn,
// dependencies)"). Si alguna amanece 404: home react.dev/reference/
// react → hooks. Modo data del router NO aplica acá.
//
