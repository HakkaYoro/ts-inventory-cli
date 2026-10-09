// ═══════════════════════════════════════════════════════════════
// TASK D31 — DOMINGO 11-OCT · Fase 3: React día 2 · useState + eventos + listas
// ESTADO: CALIBRADA (escrita vie 9-oct tras el cierre de D30; páginas
// de lectura verificadas vivas con curl: state-a-components-memory,
// responding-to-events, rendering-lists, conditional-rendering → 200.
// Repos al día: order-frontend commiteado 4a3168c, tsc 0 errores.)
//
// Contexto: el viernes cerraste D30 furioso pero cerrado — Saludo,
// Tarjeta, molde vs llamada. Hoy el plan sigue: darle MEMORIA a la
// página. Regla nueva desde ayer, con la dignidad del editor: en
// territorio nuevo SE LEE PRIMERO. Hoy hay dos pestañas de docs y
// son parte de la task, no castigo. Si el navegador no está abierto:
// cd order-frontend && npm run dev.
//
// ═══════════ WARM-UP (sin editor — responde en este archivo) ═══════════
//
// 0. COBRO DEL VIERNES: abre Anki (yo cargo las 2 cartas d30 al
//    arrancar la sesión — mólestame si no están). Y en Tarjeta.tsx,
//    deja un comentario de UNA línea, con tus palabras, explicando
//    por qué el children de TU firma lleva "?". Si no sale de
//    memoria: ¿qué pasó el viernes cuando App llamó <Tarjeta>
//    sin nada adentro y el tipo NO tenía "?"?
//
// 1. En una línea: en TU Tarjeta, ¿quién es el dueño del contenido
//    — App (el que llama) o Tarjeta (el componente)? Viernes lo
//    pagaste en carne propia.
//           R.P.:
//
// 2. Rompehielos (intuición pura, no se penaliza "ni idea"): el
//    botón del template decía "Count is {count}" y tenía un
//    onClick. Cuando le hacían click, el número en pantalla
//    cambiaba solo. ¿Qué crees que tenía que existir GUARDADO en
//    algún lado para que eso funcionara, y quién lo actualizaba?
//           R.P.:
//
// ═══════════ PARTE A — LECTURA PRIMERO (nueva regla) ═══════════
//
// A.1 Lee https://react.dev/learn/state-a-components-memory
//     SOLO las dos primeras secciones. La página arranca con un
//     contador ROTO a propósito (variable normal que no actualiza
//     la pantalla) y luego lo arregla. Es el mismo truco del
//     the-old-way.html: ver lo que NO funciona primero.
//     Al terminar, escribe en una línea TU definición de "estado":
//           R.P.:
//
// A.2 Lee https://react.dev/learn/responding-to-events
//     hasta la sección "Naming event handler props" (no incluida).
//     Ojo con la segunda sección: te muestra que una prop puede
//     ser una FUNCIÓN — el onClick={flecha} que viste el jueves.
//     Una línea: qué es un "event handler":
//           R.P.:
//
// ═══════════ PARTE B — CONTADOR: la página recuerda (editor SÍ) ═══════════
//
// B.1 Crea src/Contador.tsx: una función que RETORNE un botón
//   con la cuenta adentro (el botón del jueves es tu referencia
//   borrada; la página A.1 te dio la forma de darle memoria).
//   El número inicial es 0, cada click suma 1. Úsalo desde App
//   DOS veces, uno bajo el otro. Tres etiquetas te bastan:
//   button y nada más. Sin CSS nuevo.
//
// B.2 PREDICCIÓN (antes de probar, en este archivo): con DOS
//   contadores en pantalla, le das click TRES veces al de arriba.
//   ¿Cuánto marca el de arriba y cuánto el de abajo? ¿Comparten
//   el número o no? Apúntala:
//           R.P.:
//   Prueba. Si tu predicción falló, mira el archivo otra vez y
//   explica en UNA línea DÓNDE vive cada número (¿en el componente
//   o en la llamada?):
//           R.P.:
//
// ═══════════ PARTE C — LISTA: .map vuelve (tu amigo de Python) ═══════════
//
// C.1 Lee https://react.dev/learn/rendering-lists — SOLO la
//   primera sección. Lo que hace esa página con people, tú lo
//   hiciste MIL veces en Python con listas de dicts: iterar y
//   transformar. Aquí la transformación es "devolver JSX".
//
// C.2 En App: declara un array de pedidos (3-4 objetos con forma
//   tipo DTO: id, cliente, cantidad — tú eliges los valores). Con
//   .map, renderiza cada pedido en un <li> dentro de un <ul>.
//   Prohibido escribir los <li> a mano — la lista se GENERA.
//   Crea también Pedido.tsx: componente que recibe UN pedido por
//   props y lo pinta (el <li> vive adentro suyo, no en App).
//
// C.3 LA QUEJA: cuando corras, abre la consola del navegador
//   (F12, pestaña Console). React va a quejarse de algo que le
//   falta a tu .map — léela completa y ESCRÍBELA aquí:
//           R.P.:
//   La queja nombra lo que falta y para qué sirve. Agrégalo.
//   La consola del navegador es el tsc del frontend: mismo mapa.
//
// ═══════════ PARTE D — CONDICIONAL (esto ya lo sabes) ═══════════
//
// D.1 Lee https://react.dev/learn/conditional-rendering — solo la
//   sección del operador ternario. Es EL MISMO que usaste en Even
//   or Odd, solo que devuelves JSX en vez de string.
//
// D.2 En Pedido.tsx: si la cantidad pasa de un número que tú
//   fijes, el pedido pinta además un <span> con el texto "GRANDE".
//   Si no, no pinta nada extra. Un ternario. Nada más.
//
// ═══════════ CIERRE ═══════════
// - tsc: npx tsc --noEmit -p tsconfig.app.json → 0 errores.
// - Commit en order-frontend (Contador + Pedido + lista).
// - Anki: las 2 del viernes + las que salgan de hoy (máx 3).
// - Batsu. Dormir a tiempo.
//
// NOTA de Reimu: el viernes el muro era HTML disfrazado de React y
// la furia te cerró el día igual. Hoy arrancaste cobrando lo debido
// y leyendo primero — si a media task aparece otro "spam de
// simbolitos", párate ahí y muéstramelo antes de enojarte: 9 de 10
// veces es vendor, no lección. La página de estado empieza con un
// contador ROTO a propósito — se supone que ese roto seas tú
// entendiéndolo, no sufriendo otro enunciado ambiguo. Si algo no
// cierra, el chat existe.
