// TASK 1 (Día 10): Type Guards + Narrowing — ¿quién eres tú?
// ESTADO: CALIBRADA — warm-up y Parte C calibrados tras Día 9.
// Tema: Visual Novels. Warm-up corrige 4 errores conceptuales del Día 9
// (readonly vs genéricos, Record es tipo, extends≠narrowing,
// guard clause≠|| default). 6 cartas Anki nuevas (6 vivas, 3 suspendidas).
//
// ANTES DE EMPEZAR: lee la sección "Narrowing" del TypeScript Handbook
// (typescriptlang.org/docs/handbook/narrowing.html). Ya usaste narrowing
// sin saber su nombre (if (encontrada) en Día 4, if (cambios.nivel) en
// Día 5). Hoy le pones nombre formal a lo que ya haces.
//
// Enunciado:
//
// WARM-UP — Corrección de errores (15 min):
// Calibrado tras Parte C del Día 9 (Ago 18). Los errores de hoy:
//
// 1) readonly: Dijiste "el valor sí puede cambiar". FALSO. readonly
//    prohibe reasignar DESPUÉS del constructor. El valor NO cambia.
//    Lo que viste fue el genérico ignorando readonly, no readonly
//    permitiendo el cambio. Si la función recibiera ItemPSO[] directo,
//    el compilador SÍ bloquearía la asignación.
//    Escribe en comentarios: ¿qué hace readonly exactamente? ¿Por qué
//    el genérico lo ignora? (T ya tiene carta de esto, verifica que
//    la sabes.)
//      R: Porque son cambios temporales en memoria? Hm... Okay, cuando una variable le empieza a hacer "new Clase[] (...)" mete los datos dentro de la clase, y les asigna modificadores. Entonces el readonly le dice "Este valor de acá nunca cambiará, es imposible." Entonces, si se le reasigna con un valor apuntando directo a la clase tira error, porque intentas reasignar algo no reasignable. Pero, cuando usas genéricos, son solo cambios en memoria. Los datos reales (readonly) siguen ahí, solo que en memoria de forma temporal el generic le cambió el valor? Es eso?
//          Corrección de Reimu. Lo que ocurre es que cuando se crea el valor, si recuerda el modificador de  "Solo lectura, no soy reasignable", pero cuando un genérico va y lee el valor no ve el "Soy solo lectura", si no ve un valor normal reasignable. Los cambios no son en memoria, son en compilador.
// 2) Record: Dijiste "no estoy seguro si es un tipo". SÍ ES un tipo.
//    Record<K, V> es un utility type que crea un tipo de objeto donde
//    las keys son K y los values son V. En Python = dict[K, V] tipado.
//    Escribe en comentarios: ¿qué ES Record? ¿Cuál es el equivalente
//    en Python?
//      R: Record es un utility type que crea un tipo de objeto el cual según la key que le pidas, va a contabilizar cuantas veces se repite con su valor. Luego según los argumentos que le pases te va a arrojar un resultado distinto. Y no me hables de python porfa, nunca he usado esa webada XD (el dict ese que hiciste).
//          Corrección de Reimu. Record es como una caja vacía, la cual según los argumentos/código que le pase se va a ir llenando la caja poco a poco (por eso usamos un loop for).
// 3) extends vs narrowing: Dijiste "extends es narrowing básicamente".
//    INCORRECTO. extends es un CONSTRAINT en compile-time (qué tipos
//    acepta T). Narrowing es reducir tipos en RUNTIME dentro de un if.
//    Escribe la diferencia en una línea cada uno.
//      R: Okay, extends se restringe a solo los tipos que alguien le coloque. Narrowing es reducir con el compilador los posibles tipos de resultados (tipos de valores) en un if.
//
// 4) Guard clause vs || default: Confundiste el || [] con guard clause.
//    Guard clause = validar y abortar (if + throw). || default =
//    garantizar punto de partida. Escribe un ejemplo de cada uno con
//    tu código de ayer (mapItemRarity tiene los dos patrones).
//      R: "itemMapByRar[rarityMap] = itemMapByRar[rarityMap] || []" solo se limita a dar un valor de array vacío (resultado Default) si el lado izquierdo es falsly, dador de defaults. Guard Clause, verificador de que le estés dando lo que le pides, por ejemplo si coloco if(hola===true) suponiendo que hola es un booleano, en automático si sale false niega el resultado o valor. el ! Es para limitar el resultado, le estás diciendo "No puede ser undefined el valor de..." esto también es un typeguard, están dentro de if's.
//         Corrección de Reimu. Okay, el guard clause sería un if(verifica lo que le pido) return new Error o un throw. El if valida los requisitos si no son correctos explota y tira el error.
//         Correción 2. El record es el plano, dicta exactamente cómo debe ser algo, en este caso, la caja que se va a usar para llenar. La caja sería la variable, una constante. Y quien pone y se asegura de seguir ese molde es el for - of, según lo que se le indique exactamente.
// PARTE A — typeof: el guard más simple (20 min):
//
// 1) Escribe una función procesarValor(valor: string | number) que:
//    a) Si es string, retorna el string en MAYÚSCULAS.
//    b) Si es number, retorna el number × 2.
//    Usa typeof para estrechar el tipo dentro de cada rama.
//    Ancla Python: no existe typeof — Python usa isinstance().
//    TS tiene typeof con valores: "string", "number", "boolean",
//    "undefined", "object", "function". OJO: typeof null es "object"
//    (bug histórico de JS que TS no puede arreglar sin romper todo).
//
// 2) Escribe una función formatear(v: string | string[]) que:
//    a) Si v es string, retorna v.toUpperCase().
//    b) Si v es array, retorna v.join(", ").
//    Pista: typeof de un array es "object" (no "array"). ¿Cómo
//    distingues array de objeto? TS te dio la respuesta en el Día 6
//    cuando viste Array.isArray(). Úsalo.
//
// PARTE B — in operator y user-defined type guards (30 min):
//
// 3) Crea dos interfaces que representen dos tipos de contenido:
//    - VisualNovel con { titulo: string, rutas: number } (cuántas
//      rutas/endings tiene). Ej: Saya no Uta tiene 3 rutas.
//    - Anime con { titulo: string, episodios: number } (cuántos eps).
//      Ej: Nichijou tiene 26 eps.
//    Ambas tienen titulo: string. La diferencia está en las
//    propiedades únicas. Escribe una función procesarContenido
//    que reciba VisualNovel | Anime y use el operador in para estrechar:
//    si "rutas" in contenido → es VisualNovel; si "episodios" in
//    contenido → es Anime.
//    Ancla Python: el operador in de TS NO es el in de Python.
//    Python: "key" in dict → ¿existe la key? TS: "prop" in obj →
//    ¿tiene el objeto esta propiedad? Parecido, pero TS lo usa
//    para NARROWING de types, no solo para verificar.
//
// 4) Escribe un user-defined type guard. Crea una función
//    esVisualNovel(contenido: VisualNovel | Anime): contenido is VisualNovel
//    que retorne "rutas" in contenido. La parte nueva es el
//    return type "contenido is VisualNovel" — es un PREDICADO de tipo.
//    Le dice al compilador: "si esta función retorna true, puedes
//    asumir que contenido es VisualNovel de ahora en adelante". Úsala
//    dentro de procesarContenido del punto 3 en vez del in directo.
//    REFUERZO: esto es lo que Santiago te pidió investigar en Día 4
//    (homework: Type Guards). Hoy lo escribes.
//
// PARTE C — Explicaciones que caen en entrevista (20 min):
//
// 5) En comentarios, con tus palabras:
//    a) ¿Qué ES narrowing? Da un ejemplo con TU código real
//       (if (encontrada) del Día 4 o if (cambios.nivel) del Día 5).
//    b) ¿Qué ES un type guard? ¿En qué se diferencia de un if normal?
//       (Pista: el if normal verifica algo en RUNTIME; el type guard
//       le dice al COMPILADOR que estreche el tipo. Son dos trabajos.)
//    c) ¿Qué ES typeof? ¿Qué valores puede retornar? ¿Por qué
//       typeof null es "object" y no "null"?
//    d) ¿Qué ES el operador in? ¿En qué se diferencia del in de
//       Python? ¿Para qué sirve en narrowing?
//    e) ¿Qué ES un user-defined type guard? ¿Qué significa la
//       sintaxis "x is Tipo" en el return type? ¿Por qué es más
//       útil que un in directo en funciones grandes?
//    f) ¿Qué ES instanceof? ¿En qué se diferencia de typeof?
//       (Pista: typeof pregunta "¿qué tipo de valor eres?";
//        instanceof pregunta "¿eres instancia de esta CLASE?".)
//    [Calibrado tras Parte C del Día 9: Gabriel confundió extends con
//     narrowing y guard clause con || default. Prestar atención a sus
//     respuestas de typeof/in/instanceof — si los confunde con
//     constraint/narrowing, corregir de inmediato.]
//
// Reglas de siempre: === SIEMPRE. Sin valores quemados en funciones.
// Releer el enunciado completo antes de decir "listo".
// Si satura, la Parte C se parte: a-b-c hoy, d-e mañana.
// Warm-up y Parte A hoy sí o sí.
//
// Tema: Visual Novels (rotación: Touhou D3 → PSO D8-9 → VN D10).
// El concepto es lo que importa.
//
// NOTA DE DISEÑO: Esta task NO repite narrowing desde cero. Ya lo usaste
// en Día 4 (if (encontrada)) y Día 5 (if (cambios.nivel)). Hoy le pones
// nombre formal y aprendes las herramientas que te faltan: typeof, in,
// instanceof, y user-defined type guards. El warm-up corrige los errores
// de ayer (readonly, Record, extends≠narrowing, guard≠default).
//
// Total estimado: 90-100 min.
// Start Time: (19/08) 07:15 - 13:09
// Total Time Spent: D10 143:12
//
// WORKFLOW INCREMENTAL: al terminar cada parte (Warm-up/A/B/C), manda
// un mensaje corto a Reimu ("parte X lista, me trabé en Y, seguía").
// Ella actualiza el progress en tiempo real y ajusta esta task. No es
// un reporte formal entre partes — es un aviso de paso. El cierre
// completo (batsu, stats, task de mañana) va al final del día como siempre.

// investigué cómo usar typeof correctamente, conocía .toUpperCase pero no sabía cómo se escribía exactamente y lo busqué, posición deducido por mí, () deducido por mí. Lo demás por mi cuenta.
function procesarValor(valor: string | number) {
	/* 	if (!valor)
		throw new Error(`Que quisiste escribir? ${valor} no es un dato valido!`); */
	if (typeof valor === "string") return `${valor.toUpperCase()}`;
	if (typeof valor === "number") return valor * 2;
}

// La idea del return me la dió Gemini en un ejemplo:
/* function procesarTextoAlternativo(input: string | string[]) {
  if (typeof input === "string") {
    // Aquí 'input' es string
    console.log(input.trim());
  } else {
    // Aquí 'input' es string[]
    console.log(input.join(", "));
  }
} */

function formatear(v: string | string[]) {
	if (!v) throw new Error(`Que quisiste escribir? ${v} no es un dato valido!`);
	if (typeof v === "string") return `${v.toUpperCase()}`;
	/* return `${v.join(", ")}`; */
	if (Array.isArray(v)) return `${v.join(", ")}`;
}

// Investigado el cómo se usa interface. Investigado el uso de typeof, primera ruta intentada, con un type nuevo
interface VisualNovel {
	titulo: string;
	rutas: number;
}

interface Anime {
	titulo: string;
	episodios: number;
}

function esVisualNovel(
	contenido: Anime | VisualNovel,
): contenido is VisualNovel {
	return "rutas" in contenido;
}
// Investigado cómo tenía que poner esVisualNovel dentro de la función, originalmente !esVisualNovel, luego esVisualNovel(contentType), le pregunté a gemini, perdón.
function procesarContenido(contentType: Anime | VisualNovel) {
	if (esVisualNovel(contentType)) return `Es una Visual Novel!`;
	if ("episodios" in contentType) return `Es un Anime!`;
}

console.log(procesarContenido({ titulo: "test", rutas: 9 }));
console.log(procesarValor(5));
console.log(procesarValor("hey!"));
console.log(formatear("hOlA!"));

// PARTE C — Explicaciones que caen en entrevista (20 min):
//
// 5) En comentarios, con tus palabras:
//    a) ¿Qué ES narrowing? Da un ejemplo con TU código real
//       (if (encontrada) del Día 4 o if (cambios.nivel) del Día 5).
//          R: El narrowing es cómo un embudo, tú en el embudo echas todos los posibles tipos, y según lo que vayas filtrando con el código, sale el tipado de valor que necesitas al final.
//
//    b) ¿Qué ES un type guard? ¿En qué se diferencia de un if normal?
//       (Pista: el if normal verifica algo en RUNTIME; el type guard
//       le dice al COMPILADOR que estreche el tipo. Son dos trabajos.)
//          R: Me diste la respuesta sin querer XD. El if hace un guard de "Verdadero? Si no haz esto...", un clause guard. En cambio el Type Guard se encarga de que solo resulte en un solo tipo de valor o varios tipos de valor según se necesite.
//
//    c) ¿Qué ES typeof? ¿Qué valores puede retornar? ¿Por qué
//       typeof null es "object" y no "null"?
//          R: La última pregunta ni idea. Typeof como el mismo nombre lo dice, dice "El tipo de...", es un XXXX (operador, cierto? Lo leí en la D) que ve el tipado que contiene un argumento, tipo, interface, etc, para copiar sus tipos de valor posibles. Puede retornar string, number, boolean, object, no sé si hay más.
//
//    d) ¿Qué ES el operador in? ¿En qué se diferencia del in de
//       Python? ¿Para qué sirve en narrowing?
//          R: No recuerdo exactamente el in en Python. El operrador in es para decir, tienes que encontrar X cosa que está dentro de Y argumento. En narrowing sirve para filtrar los posibles tipos de valores que algo puede retornar. En este caso, los tipos de propiedades posibles que se puede retornar.
//
//    e) ¿Qué ES un user-defined type guard? ¿Qué significa la
//       sintaxis "x is Tipo" en el return type? ¿Por qué es más
//       útil que un in directo en funciones grandes?
//          R: Me jodiste. Lo que sé es que acá el user-defined type es el "contenido is VisualNovel" en la función esVisualNovel. La sintaxis dice, "Si sale X que pertenece a Tipo, procede a hacer esto...". Lo otro ni idea XD.
//
//    f) ¿Qué ES instanceof? ¿En qué se diferencia de typeof?
//       (Pista: typeof pregunta "¿qué tipo de valor eres?";
//        instanceof pregunta "¿eres instancia de esta CLASE?".)
//          R: No lo usamos hoy. Pero instanceof pregunta por las instancias de una clase, keyof pregunta por las keys. O bueno, me imagino que es eso.
//
//    [Calibrado tras Parte C del Día 9: Gabriel confundió extends con
//     narrowing y guard clause con || default. Prestar atención a sus
//     respuestas de typeof/in/instanceof — si los confunde con
//     constraint/narrowing, corregir de inmediato.]
