// ═══════════════════════════════════════════════════════════════
// TASK D37 — LUNES 2-NOV (corrió sáb 31 → lun 2 por deuda de sueño) ·
// Fase 3: React día 8: useMemo +
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
// "no lo recalcules". Pero primero, el cobro.
//          ═══ REIMU (Nov 2, cierre D37): 9 correcciones — LEER MAÑANA,
//          antes del warm-up de D38. Las dos mayores: la de W2/B.0
//          (StrictMode: la función corre 2× POR CAMBIO en dev — las
//          corridas de la función no son los ítems de la lista) y la
//          de B.2 (la trampa del día: useCallback ESTABILIZA referencias,
//          no compacta código — en tu Nav NO aplica). Lo bien del día:
//          A.2(b) exacto, dep array [orders] articulado, B.1 honesto
//          y el useMemo entero tecleado por TI. ═══

//
// ═══════════ WARM-UP (sin editor — responde en este archivo) ═══════════
//
// 0. COBRO DE AYER — en voz alta, SIN abrir el archivo todavía:
//    (a) La cadena de tu Pedidos.tsx: {loading ? ... : error ? ... :
//    (orders.length === 0 ? ... : lista)} — ¿POR QUÉ se lee en ese
//    orden y no al revés? Dos líneas.
//           R.P.: Porque son varios ternarios encadenados. Primero hay que cargar, luego si no se logra cargar (osea, conexión con el backend) error, y si llega a cargar pero no hay ningún pedido el orders.length. Cubre todos los posibles casos. Y es por lógica que sigue ese sentido (no sé que decirte).
//          ── REIMU (corrección, Nov 2): bien lo esencial. Lo que faltó
//          nombrar: esa cadena es una cadena de PRIORIDADES entre estados
//          excluyentes. loading manda porque mientras carga NO EXISTE la
//          lista para juzgar nada; error va antes que vacío porque un
//          fallo del server NO es "cero pedidos" — al revés, pintarías
//          "No hay pedidos" mintiendo cuando la API murió. El orden no
//          es lógica suelta: es prioridad de exclusiones.
//    (b) ¿Qué hace el ?. en order.cliente?.nomCompleto, y qué pasa
//    si cliente no existe? ¿Y el ?? del final?
//           R.P.: el ? lo vuelve opcional el ?? es un dador de default cómo ||, solo que devielve el valor del lado derecho cuando el valor de la izquierda es null o undefined.
//          ── REIMU (corrección, Nov 2): el ?? impecable — y de paso
//          mejor que ||, porque || también dispara con 0 o "". Lo que
//          no contestaste (la task lo preguntaba): ¿QUÉ PASA si cliente
//          no existe? El ?. CORTA la expresión ahí y devuelve undefined
//          SIN explotar (leer .nomCompleto de undefined lanzaría error).
//          La pareja completa: el undefined que deja el ?. cae en el ??,
//          y ese pone "Cliente sin nombre". Línea 38 de tu Pedidos.tsx.
//    Recién ahora abre tu Pedidos.tsx y CONTRASTA lo que dijiste
//    contra el archivo. Lo que no coincida = lo que se te quedó del
//    LLM. Una línea: ¿qué te faltó?
//           R.P.: Yo creo que todo bien. El ?? lo saqué por sentido común.
//
// 1. Anki primero (5 cartas nuevas esperan: 2 de d36 + 3 de d35).
//    La de "¿qué ES un router?" la contestaste ayer como "una ruta
//    dentro de un sitio" y la carta dice otra cosa. Léela dos veces.
//
// 2. Sin mirar nada: cuando tu /pedidos recibió la lista y la pintó,
//    ¿cuántas veces corrió tu función Pedidos de punta a punta desde
//    que entraste a la URL hasta que viste los 12 pedidos? (Pista:
//    StrictMode. Adivina, no busques.)
//           R.P.: 12 veces creo, es un O(n) si no me equivoco.
//          ── REIMU (corrección, Nov 2): MAYOR del día — no son 12.
//          Confundiste corridas de la FUNCIÓN con ítems de la LISTA: los
//          12 pedidos los produce el .map ADENTRO de una sola corrida.
//          La función Pedidos corre un puñado de veces, y tu propio B.0
//          de hoy te dio el factor: 2 logs por click = StrictMode corre
//          TODO doble en dev a propósito (para cazar bugs). Cuenta real
//          en dev: ~4 (montaje ×2 + llegada de datos). En prod: ~2.
//          Cobro: carta nueva de StrictMode en la tanda.
//
// ═══════════ PARTE A — LECTURA PRIMERO (regla de la casa) ═══════════
//
// A.1 Lee https://react.dev/reference/react/useMemo — SOLO hasta el
//     final de "Reference". Tres líneas:
//     (a) ¿qué devuelve useMemo — el RESULTADO de calcular, o la
//     función de calcular?
//           R.P.: El resultado.
//     (b) ¿QUÉ guarda entre renders y qué lo invalida?
//           R.P.: Las dependencias, lo invalida si cambia el valor de las dependencias
//          ── REIMU (corrección, Nov 2): a medias. Lo que GUARDA entre
//          renders es el RESULTADO del cálculo — eso lo dijiste tú en
//          A.1(a). Las dependencias no se guardan: son el CANDADO, la
//          condición que decide "reutilizo lo guardado" o "recalculo".
//          Guardado = resultado. Condición = deps. Dos papeles distintos.
//     (c) En una línea: ¿qué problema resuelve?
//           R.P.: Evitar recalcular listas enormes o procesamiento pesado a lo pendejo. Solo se reutiliza.
//
// A.2 Lee https://react.dev/reference/react/useCallback — SOLO hasta
//     el final de "Reference". Dos líneas:
//     (a) ¿qué guarda useCallback (ojo: NO es lo mismo que useMemo)?
//           R.P.: La función "fn" que se le pase.
//     (b) useMemo devuelve X, useCallback devuelve Y. ¿X e Y?
//           R.P.: useMemo devuelve el resultado de una función, useCallback devuelve la función
//
// A.3 PASEO (10 min máximo, cero código): estado global = datos que
//     CUALQUIER componente puede leer sin que se los pasen por props
//     uno a uno. Ya conoces UNO de la task 1014 (D33). ¿Cuál? Una
//     línea. (Redux/Zustand: que te suenen los nombres, nada más.)
//           R.P.: Saludo.tsx
//          ── REIMU (corrección, Nov 2): casi — nombraste al LECTOR.
//          Saludo es el que estira la mano (useContext). El estado
//          global de D33 es el CONTEXT: tu NombreContext.tsx — el estante
//          (createContext) puesto a disposición (Provider). Si un
//          componente nuevo quiere el nombre, no toca a Saludo: lee el
//          estante directo. El estante es la respuesta, no el cliente.
//
// ═══════════ PARTE B — EN TU PROYECTO ═══════════
//
// B.0 LA PRUEBA DE QUE HAY PROBLEMA: en tu Contador.tsx (el
//   componente con useState que vive DENTRO de la página /clicks —
//   NO en Clicks.tsx, que es solo la página que lo envuelve y no
//   tiene estado propio), agrega un console.log adentro del cuerpo
//   del componente. Abre /clicks, mira la consola, y aprieta el
//   botón 3 veces. ¿Cuántos logs por clic? PREDICE antes de mirar:
//           R.P. (predicción):1
//           R.P. (resultado): 2 por click.
//
// B.1 LA LISTA CARA: en Pedidos.tsx, tu .map(...) que arma los
//   PedidoItem corre en cada render. Hoy no duele (12 pedidos,
//   localhost). Hazlo MEDIBLE:
//   - Pásale un array de 200 pedidos a tu API (Reimu te los carga
//     si los pides — o hazlo tú con un for y fetch POST).
//   - PREDICCIÓN: ¿va a notarse la diferencia en /pedidos? ¿Por qué
//   sí o por qué no? (Honesto: probablemente no — y explicar POR
//   QUÉ no se nota es la respuesta buena.)
//           R.P. (predicción): No lo noté porque dentro de lo que cabe, 200 pedidos es poco, además que siempre va a depender de la máquina donde se vea la página. Si mi PC fuera más lento, se notaría. O si fueran más de 20k pedidos...
//   - Envuelve tu .map(...) con useMemo y su dependency array.
//   - ¿Qué le pusiste adentro del array? ¿Por qué ESOS y no otros?
//           R.P.: Usé orders porque es el dato que usa .map.
//
// B.2 LA FUNCIÓN ESTABLE: tu Nav.tsx usa style con una arrow function
//   ({({ isActive }) => ({...})}). Esa función nace nueva en cada
//   render. ¿UseCallback aplica ahí? Investiga 5 minutos y responde
//   sí/no con una línea de por qué. (Trampa posible: la respuesta
//   puede ser "no aplica". Defender > copiar.)
//           R.P.: Si aplica. Se podría compactar el código por mucho, ya que justo ahora, el estilo se repite unas tres veces, siento que con el useCallback podría compactarse un montón.
//          ── REIMU (corrección, Nov 2): MAYOR — la trampa del día,
//          devorada entera. Tu argumento es COMODIDAD ("compactar"),
//          pero useCallback no compacta nada: devuelve la MISMA
//          instancia de la función entre renders, y eso solo importa si
//          ALGUIEN compara esa referencia (un hijo memoizado, un dep
//          array). Tu Nav no tiene hijos memoizados — nadie compara la
//          referencia del style → NO APLICA. Y lo que sí ves (estilo
//          repetido 3 veces) es OTRO problema: DRY — extraer una const
//          fuera del componente y reutilizarla. Dos problemas, dos
//          herramientas, y ninguna es useCallback aquí. Defender >
//          copiar: defendiste lo equivocado con convicción. Cobro: carta.
//
// ═══════════ PARTE C — CIERRE CONCEPTUAL ═══════════
//
// C.1 ¿Qué ES useMemo? Una línea tipo "cat". (Regla de Santiago:
//   no "sirve para optimizar" — QUÉ ES.)
//           R.P.: useMemo es una especie de caché. Que almacena los resultados de una dependencia. Si la dependencia cambia, se actualiza todo el useMemo, pero si no cambia, se mantiene, osea, solo renderiza si es absolutamente necesario.
//
// C.2 Tu B.0 mostró que el cuerpo del componente corre en cada
//   render. ¿Por qué React recalcula TODO el componente si solo
//   cambió un número del estado? Una línea. (Pista: render barato,
//   modelo mental simple.)
//           R.P.: Porque siempre que se da click, el estado de las dependencias cambia, entonces se re-renderiza.
//          ── REIMU (corrección, Nov 2): C.1 y C.2 con el mismo matiz.
//          useMemo NO evita renders — tu B.0 lo probó: el cuerpo corre
//          entero cada vez. useMemo evita RECALCULAR un trozo DENTRO del
//          render. Y tu C.2 quedó circular ("se re-renderiza porque se
//          re-renderiza"): la respuesta de la pista es que React
//          PREFIERE un modelo tonto y barato — correr la función entera
//          y comparar el output — antes que un sistema inteligente que
//          rastree qué línea depende de qué estado. Simple y rápido le
//          gana a inteligente y lento. ESO es "render barato".
//
// C.3 Entrevista: "useMemo y useCallback — ¿cuándo usarlos y cuándo
//   NO?" Tres líneas. La palabra "innecesario" tiene que aparecer.
//           R.P.: useMemo para dependencias mutables que mutan cada cierto rango de tiempo (no siempre). useCallback para cuando se necesite retornar funciones.
//          ── REIMU (corrección, Nov 2): débil, y faltó la palabra
//          obligatoria: INNECESARIO. La respuesta vivía en tu B.1 de
//          hoy: 212 pedidos y NO se notó → para tu app, useMemo es
//          innecesario (lo pusiste por el gesto — bien — pero el
//          veredicto honesto es "no lo necesitaba"). Línea de
//          entrevista lista: "los uso cuando MEDIR muestra costo real
//          (cálculo caro, referencias que alguien compara); sin medir,
//          ponerlos en todo es ruido innecesario". Tu B.1 ES la
//          evidencia: ya sabes responder esto mejor que internet.
//
// C.4 Estado global: tu Context (D33) comparte el nombre del
//   usuario. ¿Qué le pasaría a tu app si 10 componentes más
//   necesitaran 10 datos más por Context? ¿Cuándo conviene Redux/
//   Zustand? Dos líneas.
//           R.P.: No me suena de NADA el Redux/Zustand. No lo he visto en ningún punto del bootcamp que yo recuerde.
//          ── REIMU (corrección, Nov 2): mitad y mitad. Lo de
//          Redux/Zustand es justo: solo los nombramos de paseo — no se
//          cobra, quedan como nombre suelto para Fase 4+. Pero la
//          PRIMERA mitad sí era tuya: si 10 componentes leen 10 datos
//          del MISMO Context, cada toque del estante repinta a TODOS
//          los lectores aunque a cada uno solo le cambie 1 dato — tu
//          Saludo ya lo sufre en miniatura. Redux/Zustand existen justo
//          para eso: partir el estante en casillas finas. Cuando vuelva
//          el tema, esta mitad ya la escribiste.
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
