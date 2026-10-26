// ═══════════════════════════════════════════════════════════════
// TASK D36 — MARTES 27-OCT · Fase 3: React día 7 · PROYECTO día 1:
// tu frontend consume tu API de verdad
// ESTADO: CALIBRADA (Oct 26, con datos del cierre D35: predicciones
// vacías → HOY ninguna prueba se corre sin R.P. escrita antes; C.3
// pagada con SU Nav; ritual cobrado). Deck: 177 cartas (3 de d35
// nuevas esperando + tanda). Repos: ts-inventory e2a3c36 (push OK),
// order-frontend f81d24b, order-api sin cambios desde Fase 2. tsc 0.
//
// Contexto: el sábado tu App aprendió a tener PÁGINAS — la URL decide
// qué pinta. Hoy las dos mitades del bootcamp se juntan: tu order-api
// (NestJS, Fase 2) y tu order-frontend (React, Fase 3). Hoy tu
// frontend le pide datos a TU API por primera vez. El muro del día
// NO es React ni NestJS — es el navegador. Ya lo vas a conocer.
//
// ═══════════ WARM-UP (sin editor — responde en este archivo) ═══════════
//
// 0. COBRO DEL SÁBADO: banner REIMU del 24 (15 bloques). Dos deudas:
//    la C.1 (router = "da las rutas" era para-qué-sirve) y las
//    predicciones vacías de B.1/B.2. HOY ninguna prueba corre sin
//    su R.P. (predicción) escrita ANTES. Es la ley del día.
//
// 1. Sin mirar nada, una línea tipo "cat": ¿qué ES un router?
//    (la carta nueva de Anki la cobra mañana — practícala hoy).
//           R.P.:
//
// 2. Tu Nav no parpadea al cambiar de página. ¿Por qué un <a href>
//    SÍ haría parpadear la pantalla?
//           R.P.:
//
// 3. Tu order-api tiene un guard: pedidos sin la API key son
//    rechazados. Cuando tu FRONTEND le pida datos, ¿quién tiene que
//    presentar esa llave — el navegador solo, o tu código?
//           R.P.:
//
// ═══════════ PARTE A — LECTURA PRIMERO (regla de la casa) ═══════════
//
// A.1 Lee https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch
//     — CORTA en "Specifications" (no leas compatibilidad). Dos líneas:
//     ¿qué devuelve fetch(), y en qué casos RECHAZA la promise de
//     verdad? (pista: un 404 del servidor ¿cuenta o no cuenta?)
//           R.P.:
//
// A.2 Lee https://docs.nestjs.com/security/cors — entera (es corta).
//     Dos líneas: ¿qué hace enableCors() y por qué tu main.tsx de
//     order-api NO puede vivir sin eso a partir de hoy?
//           R.P.:
//
// A.3 PREDICCIÓN (sin probar nada): tu página nueva va a hacer fetch
//     DENTRO de un useEffect. Si el usuario navega a /clicks ANTES
//     de que llegue la respuesta del API, ¿qué crees que pasa con
//     esa respuesta que llega tarde? Una línea. (No hay respuesta
//     correcta todavía — es predicción. El año que viene te la cobro.)
//           R.P.:
//
// ═══════════ PARTE B — EL PROYECTO: FRONTEND ↔ API ═══════════
//
// Reparto (qué vive en cuál — el resto NO SE TOCA):
//   - order-api/src/main.ts = UNA línea nueva (la de tu lectura A.2).
//   - order-frontend/src/Pedidos.tsx = NACE HOY (vacío, tú lo llenas).
//   - main.tsx del frontend = una ruta nueva en el array.
//   - Nav.tsx = un NavLink nuevo.
//   - Todo lo demás INTACTO (App, Clicks, Contador, Pedido...).
//
// B.0 DOS TERMINALES: levanta order-api (npm run start:dev) y
//   order-frontend (npm run dev) — cada uno en su carpeta, cada uno
//   en su terminal. Antes de escribir UNA línea de fetch:
//   PREDICCIÓN (R.P. abajo): desde la página (localhost:5173) le vas
//   a pedir datos a tu API (localhost:3000). ¿El navegador te deja?
//           R.P. (predicción):
//   Recién ahora escribe el fetch MÍNIMO en la consola del navegador
//   (o en un botón de prueba): fetch("http://localhost:3000/orders",
//   { headers: { "x-api-key": "..." } }) con TU llave. ¿Coincidió?
//           R.P. (resultado):
//
// B.1 EL MURO: lo que acabas de ver tiene nombre (tu lectura A.2 lo
//   explica). Arregla order-api con esa UNA línea, reinicia el
//   server y repite el fetch. ¿Qué cambió? Una línea.
//           R.P.:
//
// B.2 LA PÁGINA /pedidos: créala (nace vacía) y llénala TU:
//   - useEffect que hace fetch a /orders con la llave (tu W.3).
//   - TRES estados: "cargando..." mientras espera, la lista cuando
//     llega, "error" si falla. (Ternarios anidados o lo que decidas
//     — TU diseño. Un estado por cosa, nada de magia.)
//   - La lista se pinta con TU componente Pedido (el de siempre) —
//     cada uno con su key.
//   - Ruta en el array del main.tsx + NavLink en tu Nav.
//   PREDICCIÓN primero (R.P.): ¿qué se pinta primero en la pantalla
//   al entrar a /pedidos, y durante cuánto tiempo?
//           R.P. (predicción):
//   Prueba. ¿Coincidió?
//           R.P. (resultado):
//
// B.3 EL 404 QUE NO DUELE: con la página /pedidos viva y el API
//   corriendo, PREDICE primero: si el fetch pidiera una orden que
//   NO existe (tu 404 de cliente fantasma), ¿cae en tu catch o en
//   tu then? R.P. ANTES de probar:
//           R.P. (predicción):
//   Pruébalo: cambia la URL a /orders/999999 en tu fetch un momento.
//   ¿Coincidió? Si no: tu lectura A.1 te lo explica — una línea acá.
//           R.P. (resultado):
//
// ═══════════ PARTE C — CIERRE CONCEPTUAL ═══════════
//
// C.1 ¿Qué ES CORS? Una línea tipo "cat" — no "para qué sirve".
//   (Regla de Santiago: "concatena e imprime", no "sirve para X".)
//           R.P.:
//
// C.2 Tu fetch al 404 NO cayó en el catch. ¿Por qué fetch se comporta
//   así con los errores del servidor? Una línea.
//           R.P.:
//
// C.3 La llave x-api-key viajó en el fetch del frontend. En
//   producción real, ¿qué problema tendría esa llave viviendo en el
//   código del navegador? (Pista: el navegador es del USUARIO, y el
//   código del frontend se descarga en SU máquina.) Dos líneas.
//           R.P.:
//
// C.4 Entrevista: "¿Por qué en desarrollo el frontend y el backend
//   viven en puertos distintos — y qué cambia en producción?"
//   Razona con lo de hoy. Dos líneas.
//           R.P.:
//
// ═══════════ CIERRE ═══════════
// - tsc: npx tsc --noEmit -p tsconfig.app.json → 0 errores (frontend).
// - Commits: order-frontend (Pedidos + ruta + Nav) y ACÁ también hay
//   cambio — el main.tsx del API (B.1) va con commit en order-api.
// - Anki: tanda (3 de d35 nuevas esperando — la de "¿qué ES un
//   router?" antes del warm-up de mañana, te conviene).
// - Batsu. Dormir a tiempo: la cama es parte del plan.
//
// NOTA de Reimu: el sábado el código salió redondo pero las
// predicciones quedaron vacías — hoy son OBLIGATORIAS y hay cuatro
// (B.0, B.2, B.3 y A.3). El muro del día (B.0/B.1) lo va a poner el
// navegador, no yo — y tu lectura A.2 te da la herramienta para
// tumbarlo. Cuando el fetch dé la lista de VERDAD (la que sobrevive
// a matar el server y revivirlo — recuerda tu prueba de persistencia
// de D28), vas a entender por qué esto se llama PROYECTO. COMER A
// TIEMPO.
//
