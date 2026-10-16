// ═══════════════════════════════════════════════════════════════
// TASK D34 — SÁBADO 17-OCT · Fase 3: React día 5 · useRef + ref al DOM
// ESTADO: CALIBRADA (vie 16-oct: páginas verificadas por CONTENIDO —
// headings confirmados en el HTML crudo de react.dev. La página de
// forwardRef está marcada LEGACY con aviso de React 19: NADA de API
// citada de memoria, lección del 13-oct. Repos: order-frontend 05541f8,
// tsc 0. Anki: 3 cartas d33 nuevas esperando + tanda de 10.)
//
// Contexto: ayer montaste Context completo y tu primer hook propio,
// y tu predicción cayó exacta. Hoy UNA herramienta nueva con DOS
// gestos: guardar un valor SIN re-renderizar, y tocar el DOM directo.
// Y una lectura corta con sorpresa: una API famosa que acaba de MORIR.
//
// ═══════════ WARM-UP (sin editor — responde en este archivo) ═══════════
//
// 0. COBRO DE AYER: abre el banner REIMU del 16-oct arriba de este
//    archivo y léelo completo (11 bloques). La de C.2 es la clave de
//    todo lo de ayer: un hook NO se activa solo — SE LLAMA.
//
// 1. Sin mirar nada, una línea: las tres piezas de Context y qué
//    hace cada una (crear / proveer / leer).
//           R.P.:
//
// 2. Tu useDocumentTitle: ¿quién lo ejecuta — se "activa solo",
//    o alguien lo llama? ¿Dónde? Una línea.
//           R.P.:
//
// 3. Tu Contador cuenta clicks en estado — cada click re-renderiza
//    el componente para mostrar el número. Rompehielos: ¿se te ocurre
//    un caso donde quieras CONTAR sin mostrar nada... y re-renderizar
//    fuera un desperdicio? (no hay respuesta incorrecta — es la
//    puerta del tema de hoy).
//           R.P.:
//
// ═══════════ PARTE A — LECTURA PRIMERO (regla de la casa) ═══════════
//
// A.1 Lee https://react.dev/learn/referencing-values-with-refs
//     — SOLO hasta el final de la sección "Differences between refs
//     and state". CORTA ahí (el resto es de otro día... salvo lo que
//     B.2 te va a pedir releer). Una línea: ¿qué es una ref y en qué
//     se diferencia del estado que ya conoces?
//           R.P.:
//
// A.2 Lee https://react.dev/reference/react/useRef
//     — SOLO la sección "Reference" (la firma y sus advertencias,
//     antes de los ejemplos). Una línea: useRef(...) ¿qué devuelve,
//     y cómo se lee y se escribe su valor?
//           R.P.:
//
// A.3 SORPRESA DE VERSIONES: entra a
//     https://react.dev/reference/react/forwardRef — está bajo
//     "Legacy React APIs". Lee SOLO el aviso inicial (React 19).
//     Una línea: ¿por qué esa página dice que ya no es necesaria —
//     en qué se convirtió "ref"?
//           R.P.:
//
// ═══════════ PARTE B — TU CONTADOR SILENTE (editor SÍ) ═══════════
//
// Reparto (qué vive en cuál — el resto NO SE TOCA):
//   - Contador.tsx = la ref silenciosa vive acá.
//   - App.tsx = monta un botón revelador + un input.
//   - Saludo / Tarjeta / hooks = INTACTOS (estabilidad de lo ganado).
//
// B.0 CONTADOR SILENTE (tu código de ayer, 15 min): agrega a tu
//   Contador una cuenta de clicks que NO re-renderice nada: useState
//   sigue mostrando el número visible de siempre, y la ref acumula
//   la MISMA cuenta por dentro, en silencio. PISTA SIN SPOIL: el
//   primer ejemplo de tu lectura A.1 hace exactamente este gesto.
//   La pantalla NO cambia por la ref — ese es el punto.
//
// B.1 VENTANA AL SILENCIO: un botón "¿Cuántos van?" que copia el
//   valor de la ref a un estado y lo muestra. PREDICCIÓN primero
//   (antes de probar): si haces 5 clicks y luego tocas el botón,
//   ¿qué número aparece — y por qué NO apareció antes?
//           R.P. (predicción):
//   Prueba. Una línea: ¿coincidió? ¿Qué acabas de demostrar sobre
//   la ref y el render?
//           R.P. (resultado):
//
// B.2 REF AL DOM: agrega un <input> de texto cualquiera a tu App y
//   un botón que lo ENFOQUE sin tocar el mouse. La pieza está en tu
//   lectura de A.1 — en la parte que quedó DESPUÉS del corte:
//   vuelve a esa página y lee la sección "Refs and the DOM".
//   Ese es el segundo gesto de useRef: apuntar a un nodo real.
//
// ═══════════ PARTE C — CIERRE CONCEPTUAL ═══════════
//
// C.1 Tu Contador tiene ahora DOS cuentas: el estado (visible) y la
//   ref (silenciosa). Dos líneas: ¿qué diferencia de COMPORTAMIENTO
//   viste entre ellas — quién dispara render y quién no?
//           R.P.:
//
// C.2 Vocabulario del día, una línea cada uno con tus palabras:
//   ¿qué es una ref? ¿Cuándo useRef y cuándo useState?
//           R.P.:
//
// C.3 A.3 te dijo que forwardRef murió en React 19. Dos líneas:
//   si hoy "ref" es una prop más, ¿para qué servía forwardRef
//   antes — y hace falta en TU código de esta semana? (justifica).
//           R.P.:
//
// C.4 Entrevista: "¿Cuándo usas una ref en lugar de estado?" Tu
//   contador silente de HOY es la respuesta. Dila en una línea.
//           R.P.:
//
// ═══════════ CIERRE ═══════════
// - tsc: npx tsc --noEmit -p tsconfig.app.json → 0 errores.
// - Commit en order-frontend (ref + input).
// - Commit acá (respuestas).
// - Anki: tanda de 10 (hay 3 cartas d33 nuevas esperando — la del
//   hook que SE LLAMA te conviene antes del warm-up de mañana).
// - Batsu. Dormir a tiempo.
//
// NOTA de Reimu: D33 la peleaste tres días y salió entera — dos
// piezas nuevas montadas y una predicción exacta sobre TU decisión.
// Hoy es más corto: una herramienta, dos gestos, y ambos montan
// sobre TU Contador. Lo de forwardRef es lectura, no código — saber
// que existió y por qué murió es punto de entrevista en React 19.
// Si el enunciado traba: subraya la línea y pregunta — pero primero
// A.1, A.2 y A.3. Buen desayuno antes de arrancar.
//
