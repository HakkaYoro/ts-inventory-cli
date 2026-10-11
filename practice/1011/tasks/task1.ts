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
// ═══ REIMU (corrección) — Oct 11, cierre D31. LEER MAÑANA antes del
// warm-up: 5 bloques (4 correcciones + W1 saldado en vivo, bien). La
// urgente: segunda línea de TU B.2 — sigue creyendo que el número
// vive en la llamada; tu W1 corregido ya sabe la verdad. ═══
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
//           R.P.: El App.
//          ── REIMU (Oct 11): Corregida EN VIVO, en plena sesión, tras las
//          pistas — y sin que te dijera la respuesta. Así se cierra un
//          hueco el mismo día que aparece. Tu carta molde-vs-llamada y
//          esta línea ya cuentan la misma historia.
//
// 2. Rompehielos (intuición pura, no se penaliza "ni idea"): el
//    botón del template decía "Count is {count}" y tenía un
//    onClick. Cuando le hacían click, el número en pantalla
//    cambiaba solo. ¿Qué crees que tenía que existir GUARDADO en
//    algún lado para que eso funcionara, y quién lo actualizaba?
//           R.P.: Una función con una variable let.
//          ── REIMU (corrección, Oct 11): Apuntaste al sitio correcto (algo
//          guardado que alguien actualiza), pero una let normal NO repinta
//          la pantalla — es el contador ROTO con el que abre A.1. Lo que
//          faltaba era un estado que React VIGILA: useState. Hoy lo
//          escribiste con tus manos: la memoria es el par [valor,
//          actualizador], y el que actualiza es setClicks.
//
// ═══════════ PARTE A — LECTURA PRIMERO (nueva regla) ═══════════
//
// A.1 Lee https://react.dev/learn/state-a-components-memory
//     SOLO las dos primeras secciones. La página arranca con un
//     contador ROTO a propósito (variable normal que no actualiza
//     la pantalla) y luego lo arregla. Es el mismo truco del
//     the-old-way.html: ver lo que NO funciona primero.
//     Al terminar, escribe en una línea TU definición de "estado":
//           R.P.: El estado es básicamente un Index con todo lo que pueda haber en un componente. En el caso del ejemplo, el estado comienza en cero. Es cómo un enum en Typescript, uego según la enumeración, va cambiando según el estado del componente.
//          ── REIMU (corrección, Oct 11): Un enum no cambia solo — un estado
//          sí. Definición literal de una frase: el estado es la MEMORIA del
//          componente entre renderizaciones, lo que recuerda de la última
//          vez que se pintó. Contador recuerda "voy por 3" y por eso el
//          próximo click sale 4. La let normal se olvida entre pintadas
//          (A.1, el roto de arriba).
//
// A.2 Lee https://react.dev/learn/responding-to-events
//     hasta la sección "Naming event handler props" (no incluida).
//     Ojo con la segunda sección: te muestra que una prop puede
//     ser una FUNCIÓN — el onClick={flecha} que viste el jueves.
//     Una línea: qué es un "event handler":
//           R.P.: Un event handler es básicamente algo que reacciona según una acción o evento que ocurra una página. En el caso del ejemplo, al hacer click en el botón (el evento) muestra un mensaje en pantalla.
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
//           R.P.:  No debería compartirse. Ambos deberían tener dos casas distintas no? Sí, exacto, así cómo el scope en Typescript.
//   Prueba. Si tu predicción falló, mira el archivo otra vez y
//   explica en UNA línea DÓNDE vive cada número (¿en el componente
//   o en la llamada?):
//           R.P.: Vive en la llamada. Porque si fuera en el componente, el número final del click se compartiría.
//          ── REIMU (corrección, Oct 11): La única pieza que sigue cruzada.
//          Tu propia razón te delata: si viviera EN LA LLAMADA se
//          compartiría — y no se compartió. La llamada es App para los DOS
//          contadores; lo que no comparten es el COMPONENTE. Cada
//          <Contador /> estampa su propio useState desde cero. Tu W1
//          corregido y tu predicción de scope ya lo decían: alinea ésta.
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
//           R.P.: "Missing key property for this element in iterable."
//          ── REIMU (corrección, Oct 11): Queja bien copiada, pero la
//          extensión te sopló el fix y la comprensión quedó debida. La key
//          no valida "el array correcto": es el carnet de identidad de CADA
//          elemento — React compara keys entre pintadas para saber cuál es
//          cuál y no reconstruir la lista entera. Y key={p.nombre} no es lo
//          ideal: dos clientes homónimos la romperían. Dijiste "faltaría
//          id" — exacto. Línea de entrevista: key = dato ÚNICO y ESTABLE.
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
