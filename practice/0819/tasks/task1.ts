// TASK 1 (Día 10): Type Guards + Narrowing — ¿quién eres tú?
// ESTADO: CALIBRADA — warm-up y Parte C calibrados tras Día 9.
// Tema: Vocaloid. Warm-up corrige 4 errores conceptuales del Día 9
// (readonly vs genéricos, Record es tipo, extends≠narrowing,
// guard clause≠|| default). 6 cartas Anki nuevas suspendidas
// (readonly, genérico+readonly, Record, extends≠narrowing,
// guard clause≠default, .push).
// Actualización tras warm-up (05:50): warm-up 8 min, errores del Día 8
// ya corregidos ayer. Conceptos del Día 8 sólidos.
// Actualización tras Parte A: Pick/Omit entendidos. Duda private vs
// readonly resuelta: readonly = accesible como public pero no reasignable;
// private = no accesible sin public method. Confusión inicial corregida.
// Revisión Parte A: código corre limpio. Detalle: parámetro del callback
// llamado nameRar pero es el item entero (pitfall recurrente desde D5).
// .map() con return type explícito en callback: bien. Estilo: const
// intermedia innecesaria (se puede return directo), pero es estilo no error.
// Parte B en curso (78 min): actualizarItem escrita, trampa de readonly
// NO detonó — el genérico <T extends {nombre: string}> borró readonly.
// Gabriel preguntó "por qué puedo modificar readonly?". Pista dada:
// T solo garantiza .nombre, no ve readonly. Error TS2339 en .rarity
// (constraint no incluye rarity). oldRar undefined (array.rarity no existe).
// Warm-up Día 10: reforzar constraint de generics (T extends {nombre} NO
// garantiza otras props) + readonly vs genéricos (se borra).
// Parte B punto 6: Gabriel confunde nombre del for-of (rarity = item, no
// string). .push() investigado con Gemini (operación de array). Default
// vacío con [] es el equivalente del || 0 del contador. Pitfinal: Gabriel
// intentó pushear propiedad (nombre) en vez de item entero. Se resolvió
// al ver que Record<string, T[]> pide items completos. Si se trabó
// acá, reforzar patrón acumulador+default en warm-up Día 10.
// Parte B completada: actualizarItem (Partial + delegación), mapItemRarity
// (Record + for-of + || [] + push). Código corre limpio.
// PENDIENTE: calibrar warm-up Día 10 tras Parte C de hoy.
// Integración de conceptos: Días 1-10 (tema del día: TYPE GUARDS + NARROWING)
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
//
// 2) Record: Dijiste "no estoy seguro si es un tipo". SÍ ES un tipo.
//    Record<K, V> es un utility type que crea un tipo de objeto donde
//    las keys son K y los values son V. En Python = dict[K, V] tipado.
//    Escribe en comentarios: ¿qué ES Record? ¿Cuál es el equivalente
//    en Python?
//
// 3) extends vs narrowing: Dijiste "extends es narrowing básicamente".
//    INCORRECTO. extends es un CONSTRAINT en compile-time (qué tipos
//    acepta T). Narrowing es reducir tipos en RUNTIME dentro de un if.
//    Escribe la diferencia en una línea cada uno.
//
// 4) Guard clause vs || default: Confundiste el || [] con guard clause.
//    Guard clause = validar y abortar (if + throw). || default =
//    garantizar punto de partida. Escribe un ejemplo de cada uno con
//    tu código de hoy.
//
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
// 3) Crea dos interfaces que representen dos tipos de contenido
//    (ej: Serie con { titulo, episodios } y Pelicula con { titulo,
//    duracion }). Ambas tienen titulo: string. La diferencia está
//    en las propiedades únicas. Escribe una función procesarContenido
//    que reciba Serie | Pelicula y use el operador in para estrechar:
//    si "episodios" in contenido → es Serie; si "duracion" in
//    contenido → es Pelicula.
//    Ancla Python: el operador in de TS NO es el in de Python.
//    Python: "key" in dict → ¿existe la key? TS: "prop" in obj →
//    ¿tiene el objeto esta propiedad? Parecido, pero TS lo usa
//    para NARROWING de types, no solo para verificar.
//
// 4) Escribe un user-defined type guard. Crea una función
//    esSerie(contenido: Serie | Pelicula): contenido is Serie
//    que retorne "episodios" in contenido. La parte nueva es el
//    return type "contenido is Serie" — es un PREDICADO de tipo.
//    Le dice al compilador: "si esta función retorna true, puedes
//    asumir que contenido es Serie de ahora en adelante". Úsala
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
// Tema: Vocaloid (rotación: Touhou D3 → PSO D8-9 → Vocaloid D10).
// El concepto es lo que importa.
//
// NOTA DE DISEÑO: Esta task NO repite narrowing desde cero. Ya lo usaste
// en Día 4 (if (encontrada)) y Día 5 (if (cambios.nivel)). Hoy le pones
// nombre formal y aprendes las herramientas que te faltan: typeof, in,
// instanceof, y user-defined type guards. El warm-up de mañana (que se
// calibrará hoy) puede corregir errores de la Parte C de hoy como siempre.
//
// Total estimado: 90-100 min.
// Start Time: (19/08) XX:YY - XX:YY
// Total Time Spent: D10 XXX:YY
//
// WORKFLOW INCREMENTAL: al terminar cada parte (Warm-up/A/B/C), manda
// un mensaje corto a Reimu ("parte X lista, me trabé en Y, seguía").
// Ella actualiza el progress en tiempo real y ajusta esta task. No es
// un reporte formal entre partes — es un aviso de paso. El cierre
// completo (batsu, stats, task de mañana) va al final del día como siempre.
