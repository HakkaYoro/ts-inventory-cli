// TASK 0902 — Día 19: DTOs + Validation (el portero de la puerta)
// ESTADO: COMPLETA Sep 2 (D19 cerrado). Pre-verificada 9/9 PASS.
// CONTEXTO: D16 leíste Modules/DI (55%), D17 escribiste pings a mano (76%),
// D18 escribiste el contador singleton CON migraña en 50 minutos. Hoy
// amaneciste descansado — bien, porque toca molde NUEVO: el día profundo
// del DTO que venimos aplazando desde el Día 15.
// Sin LLM. Responde en comentarios // como siempre.
// REGLA DEL DÍA (ruling del lunes, ahora permanente): patrón NUEVO →
// intento propio primero (aunque salga feo o no compile), docs DESPUÉS,
// comparar al final. El intento fallido es el que instala el patrón.

// ══ LEER JUEVES (Sep 3) ANTES DEL ANKI — correcciones del D19 ══

// ═══════════ WARM-UP (sin pistas — una línea cada una) ═══════════

// 1. a) ¿Qué ES un Module en NestJS?
//          R: Un módulo es un organizador de Features. Se divide en Services y Controllers. Para inicializar un módulo se debe colocar en app.module.ts
// ── REIMU (corrección): Tercer día y la palabra llegó por la puerta de
// atrás: "se debe colocar en app.module.ts" ES el registro. El Module es
// la ficha donde DECLARAS quién existe (controllers en un array, providers
// en otro) y Nest la lee al arrancar para saber qué construir. Organizador
// + REGISTRO. La carta debería pagarse hoy.
//    b) Tu order-api no tiene NI UN "new PingService()" escrito. ¿Quién
//       construye ese service y en qué momento exacto?
//          R: No recuerdo el nombre. Era algo con S creo... Y se construye justo al arrancar Nest.
// ── REIMU (corrección): El momento, clavado (al arrancar, antes del
// primer request). El nombre no. Si lo que asomaba era "Singleton": ese
// es el PATRÓN (una sola instancia viviendo), no el constructor. Quién
// construye: el CONTENEDOR DI de Nest — el gerente de personal de tu
// carta. Y el brazo que ya viste con tus propios logs: InstanceLoader.
// 2. En tu orders.controller.ts, CreateOrderDto aparece entre los paréntesis
//    de create(). ¿Qué ES un DTO y en qué dirección viaja: es lo que la
//    función DEVUELVE o lo que le LLEGA?
//          R: Es un Data Transfer Object (si mal no recuerdo). Devuelve objetos que le dan las funciones (creo).
// ── REIMU (corrección): Reincidencia (2ª vez con "devuelve"). Y hoy lo
// viviste al revés, con evidence: los 400 salieron del BODY del curl —
// de lo que LLEGABA. El DTO es la forma declarada de la ENTRADA: el tipo
// del parámetro anotado @Body(). Tu API no valida lo que devuelve; valida
// lo que entra. Esta noche esa carta nace con TU curl de ancla.
// ═══════════ ON-RAMP — 3 líneas, leer ANTES de tocar código ═══════════

// Qué ES: class-validator es una librería de decoradores que DECLARAN reglas
// por campo (@IsString(), @IsInt()...). El ValidationPipe es el policía de
// Nest que LEE esas declaraciones y rechaza la request si el body no cumple.
// Qué NO es: los decoradores solos NO validan nada — son papel. ¿Te suena?
// @Module tampoco organizaba nada solo: alguien tenía que leer la ficha.
// Molde mínimo (nombres ajenos, NO es tu solución — es sintaxis de muestra):
//   import { IsString } from 'class-validator';
//   export class CrearUsuarioDto {
//     @IsString()
//     nombre: string;
//   }

// ═══════════ PARTE A — El cliente quiere órdenes con sentido ═══════════

// Cliente: "Hoy POST /orders acepta CUALQUIER cosa y responde igual. Quiero
// reglas: una orden tiene cliente (texto no vacío), item (texto no vacío)
// y cantidad (entero entre 1 y 99). Si el body no las cumple, rechaza."

// A.1 Instala las dos librerías del policía (en order-api):
//       npm i class-validator class-transformer
// A.2 Llena src/orders/dto/create-order.dto.ts con las TRES reglas del
//     cliente. La de texto ya la viste en el molde del on-ramp. Las de
//     número y rango búscalas tú: el README de class-validator en GitHub
//     (github.com/typestack/class-validator) tiene una tabla de
//     decoradores completa. Ojo con leer el contrato del cliente con
//     lupa: pide DOS cosas distintas para el texto.
//          (Hecho: @IsString + @IsNotEmpty ×2, @IsInt + @Min(1) + @Max(99).
//          Import corregido SOLO tras leer el error: "Cannot find name
//          'IsString'" → venía trayendo 'validate' del ejemplo de los docs.)

// ═══════════ PARTE B — Predicciones cobradas ═══════════

// B.1 PREDICCIÓN (escríbela ANTES de correr): llenaste el DTO en A.2 pero
//     todavía NO activaste a ningún policía. POST con body inválido
//     (cliente vacío) — ¿la request pasa o la rechazan?
//     Arranca el server y compruébalo:
//       curl -i -X POST localhost:3000/orders \
//         -H "Content-Type: application/json" \
//         -d '{"cliente":"","item":"Saber","cantidad":3}'
//     (el número que buscas está en la primera línea de la respuesta).
//     ¿Cumplió tu predicción?
//          R: Predicción: Siento que no va a rechazar. Porque no inicialicé nada, ninguna validación creo. Prueba hecha: Exacto, 201, lo creó porque no estoy validando nada aún.
// ── REIMU (corrección): Nada que corregir — predicción CON razonamiento
// y pago. Una precisión de vocabulario: no era la "inicialización" — eran
// las reglas sin LECTOR. Lo nombraste bien tú mismo al final: "no estoy
// validando nada aún". Reglas escritas + policía sin contratar = 201 feliz.
// B.2 Ahora activa el ValidationPipe GLOBAL en main.ts. Cómo se hace está
//     en la doc oficial: docs.nestjs.com/techniques/validation — te dice
//     qué importar y sobre qué objeto va el pipe. Reinicia el server y
//     repite el MISMO curl de B.1.
//     ¿Qué respondió? Si pasó igual que en B.1: relee el contrato del
//     cliente línea por línea y mira la tabla del README otra vez — ¿las
//     DOS condiciones del texto quedaron escritas, o solo una?
//     (Ojo operacional: si al relanzar el puerto 3000 protesta que está
//     ocupado, tu server anterior sigue vivo — ciérralo de verdad antes
//     del segundo arranque, o el que te responde es un zombi.)
//          R: Primer intento, 201 Created. Quinto intento, me faltaba "@IsNotEmpty"...
// ── REIMU (corrección): EL HALLAZGO DEL DÍA, y lo resolviste SOLO en el
// quinto intento: "" es un string VÁLIDO — @IsString controla el TIPO,
// no el contenido. La lección de entrevista que salió de tu propio output:
// que el 2.5 fuera rechazado te hizo creer el portero completo. "Pasó la
// validación" = cumplió las reglas QUE ESCRIBISTE — probar contra el
// contrato del cliente, no contra tu memoria de lo que crees haber escrito.
// La trampa del día, detonada y desactivada por su dueño.
// B.3 PREDICCIÓN primero, curl después:
//       curl -i -X POST localhost:3000/orders \
//         -H "Content-Type: application/json" \
//         -d '{"cliente":"Gabriel","item":"Saber","cantidad":2.5}'
//     Pista de casa, no de solución: tu VO de Rareza en cli.ts rechazaba
//     exactamente esto mismo. ¿Lo rechazó acá? ¿Quién?
//          R: Lo rechazó el validador de clase si es Int (@IsInt).
// ── REIMU (corrección): Medio punto. @IsInt es la REGLA — el papel pegado
// al campo. Quien RECHAZÓ fue el PIPE, el policía leyendo el papel. Regla
// vs lector: es el centro del día. B.1 lo demostró por el otro lado: reglas
// escritas + policía sin contratar = entra igual.
// B.4 Última puerta: GET localhost:3000/orders/abc
//     ¿Al policía le importó lo que entra por la puerta de al lado?
//     Anota QUÉ viste (status + cuerpo), no lo que deberías ver.
//          R: No, no le importó, porque no tiene el DTO asignado en el parametro. Entonces no verifica nada, solo retorna NaN.
// ── REIMU (corrección): Limpia, de las mejores del día: el param de la
// ruta no tiene DTO asignado → puerta sin portero → NaN feliz con 200.
// Nota el contraste con tu cli.ts: allá tus VOs cazaban el "abc"; acá la
// ruta lo deja pasar. Esa puerta de al lado es material de D20.
// ═══════════ PARTE C — La puerta y el portero ═══════════

// C.1 Una línea de entrevista: ¿qué ES ahora un DTO para tu API?
//          R: Un DTO Es cómo el Value Object que hice en cli.ts. Básicamente el DTO funciona para validar los valores de un objeto.
// ── REIMU (corrección): A medias, y es la MISMA pieza torcida que B.3:
// el DTO no "funciona para validar" — DECLARA la forma y las reglas de lo
// que llega; quien VALIDA es el pipe. La analogía con tu VO va bien: mismo
// oficio que tus guard clauses. Línea de entrevista: "el DTO declara, el
// pipe hace cumplir". Cinco palabras, cierra la pregunta.
// C.2 Tu CLI y tu API acaban de divergir: JSON corrupto en el CLI → fallo
//     silencioso exit 0 (tu gate P3, la deuda de Fase 1); body inválido
//     hoy en la API → rechazo ruidoso con número y mensaje. ¿Cuál de los
//     dos diseños prefiere quien CONSUME un API, y por qué?
//          R: No sé que quieres decir con "tu gate P3". Y la respuesta sería el segundo. El rechazo ruidoso, porqué? Porque si uso un API, es porque la persona es un Power User o similar, cuando yo manejo algo con una api, me gusta LEER que ocurrió, para así corregir lo que yo le paso al servidor a través de la API.
// ── REIMU (corrección): "Gate P3" = tu entrevista de cierre de Fase 1:
// el JSON corrupto en tu CLI dejaba search/remove SILENTES con exit 0 —
// el silencio que miente. Y tu razonamiento de power-user es válido y
// bien argumentado: quien consume quiere LEER qué rompió para corregir su
// request. Es exactamente por esto que Nest trae el pipe con rechazo
// ruidoso de fábrica. Bien.
// C.3 Abre src/orders/dto/update-order.dto.ts. Casi vacío. Explica en dos
//     líneas por qué tu PATCH va a validar igual sin que escribas nada.
//     (Compruébalo con un curl si quieres: PATCH cantidad 999.)
//          R: No validé, pero asumo que es porque hace un extends del DTO (CreateOrderDTO), y ahí lee el global validation pipe.
// ── REIMU (corrección): La asunción es CORRECTA (PartialType hereda las
// reglas; el pipe global alcanza cualquier puerta con DTO). Un músculo
// para el oficio: cuando verificar cuesta un curl, verifica — "asumo" no
// sobrevive una entrevista técnica. Descuento chico, nada más.
// C.4 Tu VO de Rareza (cli.ts) y tu CreateOrderDto (order-api): ¿hacen el
//     mismo oficio o distintos? Una línea cada uno.
//          R: Hacen el mismo oficio. Solo que el DTO es más fácil, rápido y compacto. No tengo que marearme haciendo puros Guard Clauses, solo valido usando decoradores y ya.
// ── REIMU (corrección): Mismo oficio ✓. Un matiz para la entrevista: los
// guard clauses no desaparecieron — se mudaron DENTRO de la librería. Tú
// declaras la regla (@Min(1)); el pipe es quien ejecuta el if. Compacto
// sí; mágico no: alguien sigue haciendo el chequeo, solo que ya no lo
// escribes tú. Saber eso es la diferencia entre usarlo y entenderlo.
// ═══════════ CIERRE ═══════════
// - Anki HOY sí. Dos días sin sesión → la cola viene gorda (51 cartas);
//   se hace en tandas (primero las reincidentes reescritas + las 5 nuevas
//   del lunes; el resto de noche). La racha se retoma hoy, sin culpa.
// - Commit en order-api (DTO + pipe) y en este repo (task).
// - Las cartas nuevas de DTO/Validation nacen HOY EN LA NOCHE, después de
//   la clase. Examen después de la clase, no antes — como siempre.
