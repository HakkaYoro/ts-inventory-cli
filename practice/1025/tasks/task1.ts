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
// ═══ REIMU — CIERRE D36 (mié 28-oct, Sesión 48) · nota 13/20 ═══
// D36 corrió en 2 días (mar 27 arranque + mié 28 cierre): derrame +1
// ya registrado esta mañana (DRIFT_BASE 39→40, ETA dom 29→LUN 30-NOV,
// smoke PASS). 14 correcciones abajo. Lo bueno del día: la LEY DE
// PREDICCIONES se cumplió ENTERA — B.0, B.2, B.3 y A.3 escritas antes
// de probar, después del fracaso del sábado. B.3 con predicción
// equivocada + contraste escrito = exactamente cómo se aprende. Lo
// caro: el Pedidos.tsx que funciona es 95% LLM (confesado, y tu
// pregunta "¿por qué no sale nomCompleto?" fue el diagnóstico
// correcto) y el fix del relations lo dictó Reimu en niebla — las DOS
// LÍNEAS prometidas y la palabra relations pasan a ser COBRO de
// mañana. Verificación del cierre: GET /orders 12/12 pedidos con
// cliente embebido (server levantado y matado por Reimu), tsc 0.
// COMMITS: order-frontend (Pedidos+ruta+Nav), order-api (enableCors +
// relations), este repo.
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
//           R.P.: Es un una ruta dentro de un sitio.
// ─── REIMU: No. Eso es una RUTA. El router es el REPARTIDOR: la
//    pieza que LEE la URL y decide qué componente pinta. La ruta es
//    lo que él lee, no lo que él es. Tu Nav del sábado lo vivió:
//    cambió la URL y el repartidor cambió la página. Carta nueva
//    creada hoy (la task la prometía) — está en la tanda.
//
// 2. Tu Nav no parpadea al cambiar de página. ¿Por qué un <a href>
//    SÍ haría parpadear la pantalla?
//           R.P.: Porque se conserva y sabe dinámicamente que cambiar y que no. Mientras que el <a href> siempre hace un re-renderizado del sitio.
// ─── REIMU: La mitad de arriba vale (React cambia solo el pedazo).
//    La de abajo quedó corta: el <a href> no "hace re-renderizado" —
//    le pide al servidor OTRO documento completo y el navegador
//    RECARGA todo (ese recargar ES el parpadeo). Link no pide nada:
//    intercepta el clic y React repinta el pedazo en el MISMO
//    documento. La pieza que faltó: pedir documento nuevo vs
//    cambiar un pedazo del documento que ya vive.
//
// 3. Tu order-api tiene un guard: pedidos sin la API key son
//    rechazados. Cuando tu FRONTEND le pida datos, ¿quién tiene que
//    presentar esa llave — el navegador solo, o tu código?
//           R.P.: El navegador... Creo...
// ─── REIMU: Blanco honesto — y hoy lo VIVISTE: la llave la escribió
//    TU CÓDIGO. El header "x-api-key" salió de tu Pedidos.tsx; el
//    navegador no agrega nada solo. El fetch es tuyo, la llave viaja
//    donde TÚ la pones. (Esto es C.3 al revés: la llave es tuya y
//    por eso mismo es visible para todos.)
//
// ═══════════ PARTE A — LECTURA PRIMERO (regla de la casa) ═══════════
//
// A.1 Lee https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch
//     — CORTA en "Specifications" (no leas compatibilidad). Dos líneas:
//     ¿qué devuelve fetch(), y en qué casos RECHAZA la promise de
//     verdad? (pista: un 404 del servidor ¿cuenta o no cuenta?)
//           R.P.: Solo rechaza cuando hay un request mal formado o un error de conexión. Y fetch devuelve "resources" o "assets" que le especifiques, ejemplo, imágenes, videos, etc.
// ─── REIMU: La primera mitad EXCELENTE — solo falla de red rechaza,
//    y la aplicaste solo en B.3 (la prueba del día). La segunda no:
//    fetch no devuelve "resources/assets" — devuelve UNA PROMISE que
//    resuelve a un objeto Response (status, ok, body). Con .json()
//    abres ese Response y sacas el cuerpo. Response = el sobre;
//    .json() = abrir el sobre.
//
// A.2 Lee https://docs.nestjs.com/security/cors — entera (es corta).
//     Dos líneas: ¿qué hace enableCors() y por qué tu main.tsx de
//     order-api NO puede vivir sin eso a partir de hoy?
//           R.P.: Enable CORS permite que los resources de una página puedan ser solicitados (requests) a través de otros dominios sin que nadie se entere. Y no puede vivir sin él ya que React se va a encargar de manipular eso.
// ─── REIMU: CORS sí es una política — pero quien la APLICA es el
//    NAVEGADOR, y no es "sin que nadie se entere": es el navegador
//    metiéndose a propósito. enableCors() es el SERVER autorizando a
//    tu origen 5173 a LEER respuestas del 8000. Y React no manipula
//    nada de esto — lo viste hoy con tus ojos: quien te bloqueó fue
//    el navegador, quien autorizó fue tu main.ts. (Tu C.1 de abajo
//    te corrigiste solo — el crédito es tuyo.)
//
// A.3 PREDICCIÓN (sin probar nada): tu página nueva va a hacer fetch
//     DENTRO de un useEffect. Si el usuario navega a /clicks ANTES
//     de que llegue la respuesta del API, ¿qué crees que pasa con
//     esa respuesta que llega tarde? Una línea. (No hay respuesta
//     correcta todavía — es predicción. El año que viene te la cobro.)
//           R.P.: Se pierde.
// ─── REIMU: Predicción registrada, cobro diferido como prometí.
//    Pista sin cobro: "se pierde" está cerca — llega igual, y alguien
//    intenta guardar datos en una pantalla que YA NO EXISTE. Quién es
//    ese alguien y qué pasa = material del día del cleanup de effect.
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
//           R.P. (predicción): No debería a menos que coloque la api-key
//   Recién ahora escribe el fetch MÍNIMO en la consola del navegador
//   (o en un botón de prueba): fetch("http://localhost:3000/orders",
//   { headers: { "x-api-key": "..." } }) con TU llave. ¿Coincidió?
//           R.P. (resultado): No muestra resultados, pero por lo menos acepta la entrada/lectura.
// ─── REIMU: Predicción medio acertada (la llave SÍ hacía falta,
//    eventualmente) pero el muro era OTRO: el navegador bloqueó la
//    LECTURA de la respuesta antes de que la llave importara — eso
//    fue el "no muestra resultados". El resultado honesto salvó el
//    ritual. B.1 le puso nombre al muro.
//
// B.1 EL MURO: lo que acabas de ver tiene nombre (tu lectura A.2 lo
//   explica). Arregla order-api con esa UNA línea, reinicia el
//   server y repite el fetch. ¿Qué cambió? Una línea.
//           R.P.: Bloqueado por política CORS.
// ─── REIMU: Eso es el NOMBRE del muro — no lo que cambió. Lo que
//    cambió tras tu línea: el navegador dejó de bloquear y tu .then
//    recibió la lista de verdad (después del relations, los nombres
//    también). Una palabra más la próxima vez: nombre + qué cambió.
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
//           R.P. (predicción): Se pinta la navbar primero. Luego, order-api responde en 1ms.
//   Prueba. ¿Coincidió?
//           R.P. (resultado): Sí.
// ─── REIMU: Predicción cumplida con matiz fino: la navbar primero
//    (estática, pinta con el componente) y la API local tan rápida
//    que el "Cargando..." casi no se ve — ese "1ms" ES la respuesta
//    de la pregunta "durante cuánto tiempo". Para VER el estado de
//    carga de verdad: DevTools → Network → throttling "Slow 3G" y
//    recarga /pedidos. El tercer estado (error) se ve igual: mata el
//    server y recarga. NOTA de autoría: el archivo funcional es 95%
//    LLM confesado — tu diagnóstico del nomCompleto fue correcto y
//    el fix era backend (tu terreno). Las DOS LÍNEAS prometidas
//    (la cadena de ternarios y el ?. con ??) se cobran MAÑANA en
//    voz alta, con tu archivo abierto.
//
// B.3 EL 404 QUE NO DUELE: con la página /pedidos viva y el API
//   corriendo, PREDICE primero: si el fetch pidiera una orden que
//   NO existe (tu 404 de cliente fantasma), ¿cae en tu catch o en
//   tu then? R.P. ANTES de probar:
//           R.P. (predicción): en el catch.
//   Pruébalo: cambia la URL a /orders/999999 en tu fetch un momento.
//   ¿Coincidió? Si no: tu lectura A.1 te lo explica — una línea acá.
//           R.P. (resultado): Fué en el then. Porque claro, la respuesta no devolvió algo que cumpla, entonces tira el error de "No se pudo cargar la lista de pedidos."
// ─── REIMU: El contraste está perfecto: predicción equivocada
//    escrita antes, resultado observado, y la explicación de A.1
//    aplicada sola. Una precisión de oro: el mensaje que viste ("No
//    se pudo cargar...") no lo escribió el navegador ni el 404 — lo
//    escribió TU guard (if (!response.ok) throw). El then corrió,
//    TU línea lanzó, TU catch atrapó. El error de hoy fue 100%
//    fabricado por tu código. Eso es tener el control.
//
// ═══════════ PARTE C — CIERRE CONCEPTUAL ═══════════
//
// C.1 ¿Qué ES CORS? Una línea tipo "cat" — no "para qué sirve".
//   (Regla de Santiago: "concatena e imprime", no "sirve para X".)
//           R.P.: CORS es una política que básicamente permite (O no) que dominios externos puedan obtener información de X endpoint.
// ─── REIMU: Bien — es una política y decide. Falta QUIÉN la aplica:
//    el NAVEGADOR (no el servidor, no React). Completa quedaría: "una
//    política del NAVEGADOR que decide si un origen puede leer la
//    respuesta de otro". 4/5.
//
// C.2 Tu fetch al 404 NO cayó en el catch. ¿Por qué fetch se comporta
//   así con los errores del servidor? Una línea.
//           R.P.: Porque fetch solo lee el estado de su promise. Si no se cumple, fecth no rechaza (Porque 404 o no, el servidor respondío, entonces termina en fullfiled.), entonces hay que hacer un if guard de la respuesta que devuelva el fetch para que salga el error.
// ─── REIMU: Sólida. "404 o no, el servidor respondió, entonces
//    fulfilled" — esa frase textual es de entrevista, quédatela.
//    Dos typos (respondió, fulfilled) y un matiz: fetch no "lee el
//    estado de su promise" — fetch ES la promise; el estado lo lees
//    TÚ con response.ok. 5/5 con eso.
//
// C.3 La llave x-api-key viajó en el fetch del frontend. En
//   producción real, ¿qué problema tendría esa llave viviendo en el
//   código del navegador? (Pista: el navegador es del USUARIO, y el
//   código del frontend se descarga en SU máquina.) Dos líneas.
//           R.P.: Hardcodeado, además que si el usuario quiere puede ver cual es esa api key y abusar de ella.
// ─── REIMU: Correcto y directo: visible en DevTools/Network, quien
//    quiera la copia y abusa. La regla general para memorizar: TODO
//    lo que vive en el frontend es PÚBLICO por definición — por eso
//    las llaves de verdad nunca viajan al navegador; el backend
//    autentica personas (login/token), no reparte llaves fijas.
//
// C.4 Entrevista: "¿Por qué en desarrollo el frontend y el backend
//   viven en puertos distintos — y qué cambia en producción?"
//   Razona con lo de hoy. Dos líneas.
//           R.P.: Porque se divide el trabajo entre los dos (creo.). Y en producción, el frontend accede al backend de forma interna, no externa por motivos de seguridad.
// ─── REIMU: Floja pero razonada (el "creo" honesto no baja nota,
//    invita a responderla). Lo que faltó nombrar: en dev son DOS
//    servers (5173 + 8000) porque cada uno recalienta solo — frontend
//    con hot-reload, backend con watch — y al ser puertos distintos
//    son ORÍGENES distintos para el navegador: por eso CORS existió
//    HOY. En producción suelen vivir bajo el MISMO dominio (mismo
//    origen) y el muro desaparece. Tu "accede de forma interna" iba
//    ahí. 3/5.
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
