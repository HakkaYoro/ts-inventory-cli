// TASK 0903 — Día 20: Pipes (el policía de cada puerta)
// ESTADO: COMPLETA Sep 3 (D20 cerrado). Pre-verificada 13/13 PASS.
// CONTEXTO: jueves libre (pedido el martes) — esta task fue GANANCIA PURA:
// D20 adelantado, y mañana D21 corre EN FECHA con el plan.
// Sin LLM. Responde en comentarios // como siempre.

// ══ LEER MAÑANA (Sep 4) ANTES DEL ANKI — correcciones del D20 ══

// ANTES del warm-up: 2 minutos con las correcciones del D19 (tope del
// archivo 0902). Dos de ellas son el warm-up de hoy.

// ═══════════ WARM-UP (sin pistas — una línea cada una) ═══════════

// 1. Ayer te quedaste con la línea de entrevista: "el DTO declara, el
//    pipe hace cumplir". Entonces, ¿qué ES un pipe? Naturaleza, una línea.
//          R: Un validador/guard.
// ── REIMU (corrección): Medio punto, auto-reparado en C.1: "validador"
// es la MITAD del oficio — el pipe también TRANSFORMA (ParseIntPipe
// convierte texto→número antes de tu método). La línea completa la
// armaste tú mismo leyendo las docs en C.4. La de warm-up midió; la de
// C.4 cuenta.
// 2. Tu GET /orders/abc respondió 200 con "#NaN". La puerta del POST
//    (el body) SÍ tenía policía ayer. ¿Qué tenía la puerta del POST
//    que la del :id no tenía?
//          R: El DTO para validar. Perdón, esto lo escribo post parte A, un Pipe, faltaba un Pipe para validar.
// ── REIMU (corrección): Blind honesto (declarado "post Parte A") y
// corregido por ti mismo en el mismo renglón: faltaba un PIPE. Sin
// descuento — el warm-up midió memoria real, la task enseñó.
// ═══════════ ON-RAMP — 3 líneas, leer ANTES de tocar código ═══════════

// Qué ES: un pipe intercepta lo que entra por un parámetro ANTES de que
// llegue a tu método: lo transforma (texto→número) y/o lo rechaza si no
// tiene la forma esperada. Nest trae varios de fábrica.
// Qué NO es: magia nueva. El +num que escribiste el domingo en pings ERA
// esta conversión, hecha a mano adentro del método. El pipe saca esa
// conversión de tu método y la industrializa — y de paso sabe rechazar,
// cosa que tu + solo no sabía.
// Molde mínimo (nombres ajenos, NO es tu solución — sintaxis de muestra):
//   import { ParseIntPipe } from '@nestjs/common';
//   @Get(':id')
//   findOne(@Param('id', ParseIntPipe) id: number) { ... }
// (nota del molde: con el pipe, el parámetro ya llega TIPADO number.)

// ═══════════ PARTE A — El cliente vuelve con la factura del NaN ═══════════

// Cliente: "Ayer me dejaste pasar un abc como id y la respuesta dijo
// '#NaN' con cara de éxito. Eso es mentir con número de éxito. Quiero
// que NINGUNA puerta de /orders que reciba un id acepte algo que no
// sea un entero. Si no lo es, dímelo con el número que corresponde,
// no con un 200."
// A.1 Escribe la regla donde corresponde. Relee el contrato con lupa
//     antes de teclear: dice NINGUNA.
// A.2 PREDICCIÓN (escríbela ANTES de relanzar el server):
//     a) GET /orders/abc → ¿status?
//          R: 400.
//     b) GET /orders/5 → ¿status? ¿y el cuerpo?
//          R: 200. Debería salir la orden N°5.
//     (Ojo operacional, heredado de ayer: si el puerto 3000 protesta
//     ocupado, tu server anterior sigue vivo — mátalo de verdad antes
//     del segundo arranque, o el que te responde es un zombi con el
//     código viejo.)
// A.3 Relanza y paga las dos predicciones.
//          R: Correcto, abc error 400. Y el 200 para el 5. Y me diste la respuesta, aunque investigué en las docs de igual forma sobre los pipes y vi ese que escribiste más arriba lol.
// ── REIMU (corrección): Nada que corregir — dos predicciones pagadas.
// Y el molde del on-ramp era a propósito: sintaxis mía, trabajo tuyo.
// Que hayas ido a las docs igual es la costumbre correcta.

// ═══════════ PARTE B — La batería fina (predicción PRIMERO en cada una) ═══════════

// B.0 Tu cliente pidió NINGUNA puerta. ¿Cómo demuestras con curls que
//     cumpliste el contrato COMPLETO? (Escribe los curls antes de
//     correrlos.)
//          R: No sé escribir curls. Me ayudaste Reimu, acá están:
//              curl -i localhost:3000/orders/5.5
//              curl -i localhost:3000/orders/1e2
//              curl -i localhost:3000/orders/-3
// ── REIMU (corrección): Tu batería cubrió los valores raros de UNA
// puerta. El contrato decía NINGUNA — tus tres curls son todos GET.
// Aplicaste el pipe a las 3 puertas (bien), pero DEMOSTRAR el contrato
// pedía tocar las otras dos: PATCH /orders/abc y DELETE /orders/abc.
// Deuda chica: dos curls que faltaron.
// B.1 GET /orders/5.5 → ¿status? ¿Por qué?
//          R: Predicción, debería rechazarlo con 400, porque no es un entero. Respuesta final: Exacto, bad request.
// B.2 GET /orders/1e2 → tu VO de Rareza usaba Number(), y
//     Number("1e2") es 100. ¿El pipe de Nest convierte igual que tu
//     Number()? Predice qué hace con "1e2", corre, y explica la
//     diferencia que viste.
//          R: Predicción, debería aceptarlo. Respuesta final: wtf, si lo rechaza... Esto es notación científica no? Porqué lo rechaza? por la "e"?
// ── REIMU (corrección): Tu "¿por la e?" era la mitad correcta — sí,
// por la e. El pipe NO convierte como Number(): exige la FORMA de
// entero escrito (solo dígitos y signo) y recién entonces convierte.
// El 400 te lo dijo textual: "numeric string is expected". Number()
// traga cualquier coercible. Tu propia batería adversa del mini tenía
// este contraste: "0x10"→16 pasaba con Number() en tu CLI; acá la
// puerta lo rechaza.
// B.3 GET /orders/-3 → ¿status? ¿El contrato de la Parte A pedía
//     RANGO o solo FORMA? Relee antes de contestar.
//          R: Predicción, lo debe aceptar, estoy seguro, porque solo pide forma. Respuesta final: Sí, lo aceptó con 200. Solo se pidió forma más no rango.
// ── REIMU (corrección): Impecable — la trampa de lectura del día,
// detectada ANTES de correr y confirmada después. Esta es la que se
// defiende sola en una entrevista.
// B.4 Tu /pings/:num sigue con +num a mano y sin policía: /pings/abc
//     sigue respondiendo "Pong #NaN!". El cliente NO lo pidió. ¿Lo
//     dejas así o lo cambias? Una línea defendiendo la decisión — no
//     hay respuesta única, hay respuesta defendida.
//          R: No lo cambio porque no se me solicitó cambiarlo, prefiero trabajar doble antes que hacer algo no solicitado. Aunque debería arreglarlo de igual forma... Arreglado.
// ── REIMU (corrección): La decisión flippeó en una línea: "no lo
// cambio" → "arreglado". El fix es bueno — una API que ya sabe que el
// NaN-200 es mentira no debería dejar la puerta hermana mintiendo.
// Pero una decisión defendida que se voltea deja la defensa huérfana:
// faltó la línea que defienda el CAMBIO. Para la próxima: decide una
// vez, defiende ESA.

// ═══════════ PARTE C — Preguntas de entrevista ═══════════

// C.1 ¿Qué ES un pipe en NestJS? Naturaleza primero, oficio después.
//     Una línea que sirva dicha en una entrevista.
//          R: Un pipe es un guard, básicamente valida que los datos que pasan a través de él sean válidos. Haciendo C.4 leí que también se usa para transformar datos y que el ParseIntPipe es un tranformador.
// ── REIMU (corrección): Te reparaste solo con las docs — te quedó al
// revés el orden: el pipe no "se usa para transformar", ES un
// interceptor de parámetros que transforma y/o valida antes de tu
// método. Línea de entrevista: naturaleza primero (interceptor de
// parámetros), oficio después (convierte texto→número, rechaza lo que
// no tiene la forma).
// C.2 El ValidationPipe de ayer y el ParseIntPipe de hoy: ¿mismo
//     oficio o distinto? ¿Qué los diferencia, en una línea?
//     (Pista de contexto: uno lo activaste GLOBAL en main.ts; el otro
//     lo escribiste EN una puerta.)
//          R: Son lo mismo pero a la vez no. Uno lee las reglas globales que tiene el DTO (ValidationPipe), mientras que el ParseIntPipe es solo para un endpoint específico (En este caso todo lo que use :id).
// ── REIMU (corrección): La sustancia está: mismo oficio (los dos son
// pipes), distinto puesto — global vs por-puerta, body vs parámetro.
// "Son lo mismo pero a la vez no" no sobrevive una entrevista: di "los
// dos son pipes; uno global para el body, otro por parámetro".
// C.3 El +id que escribiste el domingo (en findOne, update, remove):
//     ¿sigue haciendo falta? Predice qué pasa si lo quitas — y
//     pruébalo.
//          R: Creo que no hace falta. Dejame probar (con ping)... Sí no hace falta.
// ── REIMU (corrección): Conclusión correcta, y probar en pings (el
// módulo chico) antes de tocar orders es instinto de oficio. Pero mira
// tus dos archivos: pings quedó limpio (num: number, sin +), orders
// quedó con el +id VIELO... viejo y la anotación id: string — que
// ahora miente: el pipe entrega number. Dos hermanos, dos estilos.
// 30 segundos mañana: decide una forma y sé consistente.
// C.4 Lee docs.nestjs.com/pipes (hasta "custom pipes", no más) y la
//     intro de docs.nestjs.com/middleware. Una línea: si el policía
//     del id lo hubieras hecho MIDDLEWARE en vez de pipe, ¿qué
//     problema práctico tendrías? (Contexto, no solución: el
//     middleware corre para TODAS las rutas; el pipe sabe para qué
//     parámetro de qué método lo llamaron.)
//          R: Que tendría que escribir el código del transformador y validador a mano. Además que puede traer bugs encima (cómo en cli.ts). En cambio con el pipe no corro esos riesgos.
// ── REIMU (corrección): Medio punto: "a mano y con bugs" es el COSTO,
// no el problema estructural. El problema práctico: el middleware
// corre para TODAS las rutas — GET /orders y POST /orders (que no
// tienen id) también pasarían por tu policía del id, y tendrías que
// filtrar rutas a mano adentro. El pipe se ata a UN parámetro de UN
// método: cero colaterales. Esa era la línea que el contexto te día.
// ═══════════ CIERRE ═══════════
// - Server apagado. Commit en order-api (el pipe ES el commit de hoy)
//   y en este repo (task). Hoy fue día libre — el commit doble es
//   ganancia pura para el graph.
// - Anki: la tanda del día te espera (tope 30 ya configurado; las 5
//   de DTO de ayer deben salir hoy). Si el jueves solo da para Anki,
//   el contrato del día ya está cumplido.
// - Las cartas nuevas de Pipes nacen esta noche DESPUÉS de la task,
//   si la task se hizo. Examen después de la clase, no antes.
