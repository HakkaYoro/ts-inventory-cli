// TASK 0830 — Día 17: Controllers + Routing (ESCRIBIR, no leer)
// ESTADO: PRE-VERIFICADA Ago 29 noche (rama temporal en order-api: server
// real con /pings levantado, "pong" verificado con curl, luego TODO
// revertido — tu repo está limpio en 3ec8b7a, main == origin/main).
// CONTEXTO: hoy fallaste las 6 cartas nuevas porque fueron TODO lectura.
// Esta task es lo contrario: escribes un módulo completo de cero, a mano,
// sin nest g. Las 7 reprobadas de hoy se re-examinan DESPUÉS de esto.
// Sin LLM. Responde en comentarios // como siempre.
// ── CORRECCIONES REIMU (Ago 30): bajo cada respuesta — leerlas ANTES del
//    Anki de hoy (el re-examen de las 7 es esta noche).

// ═══════════ WARM-UP (sin pistas — caliente de HOY) ═══════════

// 1. Tus dos cartas más quemadas de hoy (5 Again cada una), en una línea
//    cada una:
//    a) ¿Qué ES un provider en NestJS?
//          R: No recuerdo bien. Pero el provider no es el Service? Osea, quien controla todo? Okay, si, si es, leyendo el punto 2, no me había equivocado. Necesito reforzar esto.
//          ── REIMU (corrección): a medias. La asociación provider≈service
//          quedó; la naturaleza no. Un provider ES cualquier clase que un
//          módulo registra en su array providers para que Nest la construya
//          y la reparta. Service es el EJEMPLO más común; provider es la
//          CATEGORÍA: "algo que Nest sabe construir e inyectar". No
//          "controla todo" — PROVEE una capacidad. Lo viviste ayer:
//          borraste OrdersService de providers y dejó de existir para Nest;
//          el array es la guía de lo disponible. Tu "necesito reforzar
//          esto" es el diagnóstico correcto — este bloque es el refuerzo.
//    b) ¿Qué ES la inyección por constructor?
//          R: Es un atajo de ts para crear propiedades e instanciarlas sin necesidad de hacer this.XXX , ejemplo "constructor(private edad: number)".
//          ── REIMU (corrección): describiste el envoltorio, no el
//          contenido. constructor(private x) es el atajo de sintaxis de TS
//          (parameter properties) — existe con o sin Nest. La inyección
//          por constructor ES otra cosa: las dependencias que tu clase
//          necesita LLEGAN ya construidas por los parámetros del
//          constructor; tu clase jamás hace new de ellas. En orders,
//          constructor(private ordersService: OrdersService) hace DOS cosas
//          distintas: (1) el parámetro es la PUERTA por donde Nest te
//          entrega el service ya hecho — eso ES la inyección; (2) el
//          private te ahorra escribir this.ordersService = ... a mano —
//          eso es el atajo. Describiste solo la (2). Y el ejemplo con
//          number no aplica: se inyectan cosas que Nest sabe construir
//          (services); un number no está en la guía — nadie lo provee.
// 2. Ayer a la mañana borraste OrdersService de providers y el server ni
//    arrancó. Misma mañana, tu cli.ts: si escribes new Lista() y Lista
//    necesitara algo que no existe, ¿cuándo te enteras — compilando,
//    arrancando, o mucho después, corriendo? Una línea por qué.
//          R: Corriendo, porque si dices "Necesita algo que no existe." sería una arg que no tiene/existe, entonces ejemplo, "cli.ts edit" no existe, y el error lo tiraría al ejecutar.
//          ── REIMU (corrección): respuesta correcta, el porqué a medio
//          armar. "Corriendo" — sí. El motivo fino: en tu CLI NADIE valida
//          el cableado antes de ejecutar; no hay contenedor que al arranque
//          pregunte "¿todo lo que Lista necesita está?". tsc solo ve tipos;
//          un valor que llega roto explota recién cuando la línea que lo
//          usa CORRE — mucho después. Ese es el contraste entero con ayer:
//          Nest valida al ARRANCAR (borraste un provider y el server se
//          negó a levantar — prefiere morir a mentir); tu CLI se entera
//          corriendo. Ojo: tu ejemplo del dispatcher ("cli.ts edit" →
//          mensaje) es OTRA cosa — eso es TU if manejando un caso
//          diseñado, no un descubrimiento accidental.
// ═══════════ PARTE A — El cliente pide un ping (ESCRIBIR) ═══════════

// Cliente (esto es un encargo real, estilo mini-proyecto):
// "Necesito saber si el server está vivo sin abrir la lista de órdenes.
// Quiero una ruta /pings que me responda pong. Nada más."
//
// A.1 En order-api, crea la carpeta src/pings con TODO lo que hace falta
//     para que ese encargo exista. A MANO — nada de nest g. Tienes un
//     ejemplo completo de la misma forma a la vista: orders. Míralo
//     todas las veces que necesites, pero teclea cada línea.
//     Regla de siempre: si lo copias, que sea el ANDAMIAJE (la forma
//     module/controller/service); el patrón lo tecleas.
//
// A.2 ¿Necesitas tocar algún archivo FUERA de src/pings para que tu
//     ruta exista de verdad? ¿Cuál, y exactamente qué línea?
//     (Pista de hoy a la mañana: orders vive adentro de un array.)
//          R: Sí, me caes mal Reimu. El app.module.
//          ── REIMU (corrección): correcto — y la línea exacta que faltaba:
//          imports: [OrdersModule, PingsModule] (más el import de arriba).
//          Ese registro ES la diferencia entre "existe el archivo" y "existe
//          la ruta". Hoy lo viviste en carne propia.
// A.3 PREDICCIÓN (antes de prender el server, escríbela):
//     Cuando arranques npm run start:dev, ¿qué línea NUEVA va a aparecer
//     en el log? Cópiala de memoria de lo que viste hoy.
//     // > No predije porque tuve que prender para ver que todo funcionara. Luego me dí cuenta que todo mal y añadí el módulo a app.module.
//     Prende el server. Abre localhost:3000/pings. ¿Cumplió tu predicción?
//     Si NO responde: el server arrancó feliz igual — ese es el síntoma,
//     no el error. Diagnóstico tuyo.
//          R: La primera vez fué un 404 todo feo. Luego le eché neurona y me dí cuenta que faltaba ponerlo en app.module, nada de esto fué hecho investigando o similar. Me costó al principio porque el ping lo había puesto cómo post en vez de get. Pero en sí, tardé máximo 30min. Cambiado ping a pings.
//          ── REIMU (corrección): te saltaste la predicción y el experimento
//          te la cobró igual: encendiste sin apostar, y el 404 respondió una
//          pregunta que no habías hecho. Pero el auto-diagnóstico fue
//          impecable — 404 con server feliz = módulo no registrado, y lo
//          cerraste solo. Y @Post en vez de @Get: bug de lectura del encargo,
//          no de código. Eso ES debugging. La predicción escrita cuesta 1
//          línea; sin ella, el 404 es susto.
// ═══════════ PARTE B — Routing con parámetro ═══════════

// B.1 El cliente vuelve: "quiero probar rutas con parámetro, como las de
//     orders. /pings/5 que responda pong #5". Agrégalo a tu controller.
//     Dos preguntas antes de teclear:
//     - ¿Qué TIPO te llega en ese 5: número o texto? (Familia que ya
//       conoces de argv. Tu carta de hoy de unary plus responde.)
//          R: Eh, tengo ganas de decir number, pero es un string en sí, lo que pasa es que es una suma entre string y number. No, una suma no, una concatenación mejor dicho.
//          ── REIMU (corrección): instinto correcto — string. El mecanismo que
//          describiste no existe al llegar: no hay suma ni concatenación; el
//          parámetro llega TEXTO plano siempre (las URLs son texto; HTTP
//          viaja texto). La conversión la hace el + de TU controller (string
//          → number) antes de pasárselo al service. Y en "Pong #" + num, el
//          number se IMPRIME dentro del template string: interpolación, no
//          suma.
//     - ¿Dónde viste HOY el molde exacto de cómo orders lee ese
//       parámetro y lo usa?
//          R: En orders.service el molde. En orders.controller lo usa. Es un simple return impreso en una página, lo usa con un method llamado get el cual se le asigna un número y retorna el mensaje final usando el method anteriormente creado.
//          ── REIMU (corrección): casi — el molde vive en orders.CONTROLLER
//          (findOne: @Param("id") id: string + el +id), no en el service. El
//          service recibe el número ya convertido. Mira tu propio pings:
//          pusiste el molde en el lugar correcto sin darte cuenta.
// B.2 PREDICCIÓN y experimento:
//     a) localhost:3000/pings/5 → ¿qué responde?
//     b) localhost:3000/pings/abc → ¿qué responde? ¿Por qué?
//     // > A) Responde correctamente. B) Debería ser erroneo. Porque no es un number.
//     Corre las dos. Anota si cumpliste tu predicción.
//          R: Predicción A: Correcto, retornó 5. Predicción B: A medias. No es erroneo, pero si retornó NaN.
//          ── REIMU (corrección): honesto, y el "a medias" es lo interesante.
//          +num no VALIDA — convierte. "abc" no se puede convertir → NaN, y
//          NaN viaja feliz hasta la respuesta: el server contestó 200 con
//          "Pong #NaN!". Pariente de Fase 1: Number() en cli.ts — mismo NaN,
//          pero allá tus VOs lo cazaban con Number.isInteger; acá no hay
//          portero. Nest tiene uno para esto (se llama pipe) — día 20.
// ═══════════ PARTE C — Preguntas de entrevista ═══════════

// C.1 ¿Qué ES un Controller en NestJS? Naturaleza primero, oficio
//     después. (Hoy dijiste "mesero" — ahora sin la analogía.)
//          R: Un controlador básicamente se encarga de ejecutar una acción que se le solicita. En este caso, el controller le pide a service que haga un ping. Service le prepara lo solicitado y le devuelve "Pong!".
//          ── REIMU (corrección): el oficio bien (pide, delega, devuelve) —
//          pero te pidieron NATURALEZA primero. Es una CLASE marcada con
//          @Controller que AGRUPA los entry points (rutas) de un tema.
//          "Mesero" era la analogía; "clase que agrupa rutas y delega en el
//          service" es la respuesta de entrevista. Y en plural: agrupa VARIAS
//          rutas, no una acción.
// C.2 Con tu pings en la mano: ¿de dónde SALIÓ la ruta /pings? ¿Quién
//     la leyó, de qué archivo, y en qué momento exacto? (Carta de hoy,
//     re-examen con lo que escribiste tú.)
//          R: Lo leyó app.module, exactamente el import del módulo, luego saltó a la carpeta del módulo (pings) y por último el modulo se encargó de manejar Service y Controller.
//          ── REIMU (corrección): la cadena está bien ordenada — app.module →
//          imports → PingsModule → controllers[]. Faltan dos precisiones:
//          quien LEE la ruta es el router de Nest, y lo que lee son los
//          METADATOS que @Controller("pings") + @Get() colgaron de tu clase
//          al definirla. Momento exacto: al ARRANCAR — lo viviste hoy: el 404
//          murió en el restart posterior a tu edit de app.module.
// C.3 ¿Por qué el 5 de /pings/5 llega como TEXTO si en la URL parece un
//     número? Nombra el pariente de Fase 1 que sufre lo mismo.
//          R: Porque desde un principio se le exige que sea number, luego ese resultado se transforma a string, para luego usar + (no recuerdo el nombre) y retornarlo cómo string.
//          ── REIMU (corrección): al revés. Nadie le exige number: la URL es
//          TEXTO, el protocolo viaja texto, y @Param entrega string SIEMPRE —
//          igual que argv en cli.ts (ese era el pariente que te pedía la
//          pregunta, y no lo nombraste). El + convierte string → number, y su
//          nombre — el que olvidaste — es unary plus: tu carta de ayer, y
//          está en el re-examen de hoy.
// C.4 Tu PingsService no calcula nada — igual existe, separado del
//     controller. ¿Por qué mantener la separación si hoy es trivial?
//     (Piénsalo para la entrevista: "¿y si mañana el ping debe revisar
//     la DB antes de responder?")
//          R: Porque es más fácil de mantener así. Tienes el que hace el llamado/pedido (Controller) y el que completa/realiza el pedido (service), así puedes hacerle cambios al controller sin tener que tocar al service, y viceversa.
//          ── REIMU (veredicto): correcta de verdad — mantenibilidad en
//          palabras propias, y el "viceversa" es exactamente el argumento.
//          Mañana el ping revisa la DB: solo PingsService cambia. Así se
//          defiende en entrevista.
//          ── REIMU (nota de estilo, no error): tus clases son Ping* pero
//          carpeta y archivos son pings.* — funciona (imports consistentes),
//          aunque orders mantiene plural en todo. Y pings.controller mezcla
//          tabs/espacios y comillas simples/dobles — un save con Biome lo
//          deja uniforme.
// ═══════════ CIERRE ═══════════
// - Server apagado, order-api commiteado (pings nuevo ES el commit de hoy).
// - Esta task respondida va al commit de ts-inventory-cli.
// - Anki: SOLO repasos (las 7 reprobadas + decorador reescrita). Cero
//   cartas nuevas — las de Controllers nacen mañana noche, después de
//   escribir el código (examen después de la clase, no antes).
