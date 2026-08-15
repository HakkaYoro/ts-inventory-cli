// TASK 1 (Día 5): Cuadra de Uma Musume — Clases + modificadores
// Integración de Conceptos: Días 1-5
//
// Vas a construir un sistema de entrenamiento de Uma Musume.
// Combina TODO lo aprendido:
//   - types, unions, literal types (Días 1-3)
//   - funciones + callbacks + find + template strings (Día 4)
//   - NUEVO: class, constructor, new, this, private, readonly, métodos
//
// Enunciado:
//
// 1) Define una CLASE llamada "Uma" con:
//    - nombre: readonly string (nace con él y no cambia jamás)
//    - distancia: readonly, union type "Corta" | "Media" | "Larga"
//    - nivel: PRIVATE number (empieza en 1)
//    - motivacion: private, union type "Alta" | "Normal" | "Baja"
//    - constructor que reciba esos 4 datos y los asigne con this
//    - método público entrenar(): sube el nivel en 1 SOLO si la
//      motivación NO es "Baja". Si está "Baja", devuelve un mensaje
//      diciendo que no puede entrenar hoy.
//    - método público ficha(): devuelve un template string con todos
//      sus datos. Ojo: nivel es private y la ficha vive DENTRO de la
//      clase, así que sí puedes leerlo ahí. Piensa por qué.
//
// 2) Crea 3-4 umas con new Uma(...) y mételas en un array tipado.
//
// 3) FUNCIÓN que reciba un nombre (string) y devuelva la ficha de
//    esa uma. Usa el array para buscar. Si no existe, mensaje claro.
//    (¿te suena? find + callback + narrowing — tus fallos de Anki
//    de ayer. El callback es OBLIGATORIO aquí, no hay escape.)
//
// 4) FUNCIÓN que reciba un nombre y haga entrenar() a esa uma
//    (estilo PATCH de ayer: buscar primero, aplicar después,
//    decir qué pasó).
//
// 5) Imprime TODOS los nombres de tus umas en UN solo string,
//    separados por " - ", usando .join() — homework de Santiago.
//    Pregunta clave antes de escribirlo: ¿join va sobre el array de
//    umas, o sobre un array de nombres? (¿qué aprendiste ayer con
//    el Set de nombres? mismo truco).
//
// 6) En comentarios al final:
//    a) ¿Qué ES una clase? ¿Qué ES una instancia? ¿Qué hace new?
//    b) ¿Por qué nivel es private y cómo lo leíste desde afuera
//       (o por qué no hiciste falta leerlo desde afuera)?
//    c) ¿Qué pasa si intentas reasignar el nombre (readonly)?
//    d) Un ejemplo de narrowing en ESTE código.
//    e) ¿Qué complejidad tiene tu búsqueda del punto 3? ¿Por qué?
//
// 7) BONUS (homework de Santiago, lectura): busca "Type Guards" en
//    el TypeScript Handbook / MDN. Escribe en 2-3 líneas qué son.
//    No escribas código de guards todavía — solo la idea.
//    Pista: ya usaste uno sin saberlo. if (encontrada) te suena.
//
// 8) OJO DE SENIOR (Día 4): abre practice/0813/tasks/task1.ts y mira
//    tu stuPatcher con las correcciones de Santiago. El early return
//    que él añadió dejó una condición MUERTA — código que ya no puede
//    ejecutarse nunca. Encuéntrala y límpiala tú. No te digo cuál es.
//    Un senior lee código ajeno y ve eso de una.
//
// Reglas de siempre: === SIEMPRE. Sin valores quemados en funciones
// (los datos entran por parámetro). Los datos que ya viven afuera
// (arrays, consts) se usan por su nombre, no se pasan como parámetro.
//
// Tema: Uma Musume. El concepto es lo que importa.
//
// Al terminar, releer el enunciado completo antes de decir "listo".
// Resolver la pregunta equivocada es el error más caro en entrevista.

class Uma {
	readonly nombre: string;
	readonly distancia: "Corta" | "Media" | "Larga";
	private nivel: number;
	private motivacion: "Alta" | "Normal" | "Baja";
	constructor(
		nombre: string,
		distancia: "Corta" | "Media" | "Larga",
		nivel: number,
		motivacion: "Alta" | "Normal" | "Baja",
	) {
		this.nombre = nombre;
		this.distancia = distancia;
		this.nivel = nivel;
		this.motivacion = motivacion;
	}

	public entrenar() {
		/* const nivSum = this.nivel + 1; */

		if (!this.nivel)
			return new Error(
				"Ningún nivel puede ser null o undefined, vuelva a intentarlo",
			);
		if (!this.motivacion)
			return new Error("Motivación no puede ser null/undefined.");

		if (this.motivacion === "Baja")
			return `${this.nombre} está agotada. Déjela descansar o diviertase con ella!`;
		this.nivel = this.nivel + 1;
		return `${this.nombre} ha sido entrenada satisfactoriamente! Ahora es nivel ${this.nivel}! Umazing!`;
	}
	public ficha() {
		return [
			`¡Fuhaha! Los datos de la muestra ${this.nombre} que solicitaste están listos.`,
			``,
			`Ficha:`,
			`- Distancia: ${this.distancia}`,
			`- Nivel: ${this.nivel}`,
			`- Motivación: ${this.motivacion}`,
			``,
			`¡Es un sujeto invaluable! ¡Ayúdala a seguir evolucionando, no dejes que el experimento se detenga!`,
		].join("\n");
	}
}

const tracenAcademyStu: Uma[] = [
	new Uma("Special Week", "Media", 1, "Alta"),
	new Uma("Silence Suzuka", "Media", 1, "Baja"),
	new Uma("Tokai Teio", "Media", 3, "Alta"),
	new Uma("Gold Ship", "Larga", 5, "Baja"),
	new Uma("Mejiro McQueen", "Corta", 4, "Alta"),
	new Uma("Rice Shower", "Media", 1, "Normal"),
];

/* 
Función original:
function searchUma(onlyName: string) {
	const encontrada = tracenAcademyStu.find((umam) => umam.nombre === onlyName);
	if (!encontrada) return new Error(`${onlyName} no existe! Weii!`);
	return encontrada.ficha();
}

function trainUma(onlyName: string) {
	const encontrada = tracenAcademyStu.find((umam) => umam.nombre === onlyName);
	if (!encontrada) return new Error(`${onlyName} no existe! Weii!`);
	return encontrada.entrenar();
} */

function searchUma(onlyName: string) {
	const encontrada = tracenAcademyStu.find((umam) => umam.nombre === onlyName);
	if (!encontrada) throw new Error(`${onlyName} no existe! Weii!`);
	return encontrada;
}

function trainUma(onlyName: string) {
	searchUma(onlyName).entrenar();
}

const nameUmaOnly = tracenAcademyStu.map((uma) => uma.nombre).join(" - ");

/* Cosas a reforzar:
.map, .join, new Class, reforzar el cómo hice la función (completa) "searchUma" porque gemini me ayudó bastante (entendí la lógica detrás pero siento que se me va a olvidar), reforzar refactorizado de las dos funciones, */

// 6) En comentarios al final:
//    a) ¿Qué ES una clase? ¿Qué ES una instancia? ¿Qué hace new?
//          R: Una clase define y maneja que nivel de permisos tiene cada propiedad. Ya sea public (cualquier función o variable lo puede leer fuera de la clase), private (solo lo que está dentro de la clase lo puede leer) y readonly (Aún no sé exactamente qué es. Asumo que es solo lectura y nada lo puede modificar, ni siquiera un method dentro de la clase).
//              Instancia (investigado en Google), vendría a ser el resultado final. Osea, el objeto ya creado y listo para usar en la memoria. (Asumo yo) Es lo que inicia el contstructor (this.) y lo mantiene en memoria.
//              new se usa para añadir o crear datos para que retorne un valor siempre. En este caso, cuando se usó para "const tracenAcademyStu" fué para añadir datos a la clase Uma (cómo un array). Luego se usó para los errores, le estoy diciendo "Si ocurre esto, da este valor." En este caso, si ocurre un error (creado con new) retorna el siguiente error/exception.
//    b) ¿Por qué nivel es private y cómo lo leíste desde afuera
//       (o por qué no hiciste falta leerlo desde afuera)?
//          R: Realmente no sé si lo leí o no desde afuera. Aunque me voy más hacia no haberlo leído desde afuera. Te explico, cuando hice new en "const tracenAcademyStu" para los datos en la clase, básicamente le estoy enviando y añadiendo a la RAM que usa la clase la información, se almacena ahí y no puedo obtenerla fácilmente. Para eso están los public methods, leen lo que está adentro de esa memoria, y dan una forma (solo una) para dar esa información. Es cómo una API Endpoint, primero necesitas el puerto (la clase) luego que endpoint vas a llamar "ficha", luego los datos que le envías/POST "Search UMA", el resultado/la respuesta del servidor.
//    c) ¿Qué pasa si intentas reasignar el nombre (readonly)?
//          R: Discutiendo contigo (Reimu). Entendí que constructor dicta los valores posibles y cómo se manejará la propiedad. La clase lo único que hace es dictar el parámetro (Ya sea public, private o readonly). Entendido.
//    d) Un ejemplo de narrowing en ESTE código.
//          R: En la función searchUma, la variable "const encontrada = tracenAcademyStu.find((umam) => umam.nombre === onlyName)", estoy compactando los resultados posibles a "fíjate solo en el nombre". Corrección de mi waifu Reimu. El narrowing sería "return encontrada", básicamente estoy estrechando el tipo de los posibles valores que me pueden llegar. Antes del narrowing estoy descartando. Comienza por string, number, boolean, null, undefined, luego llega el primer filtro, solo string, null o undefined, luego llega el siguiente filtro, solo string, eso es narrowing, reducir la cantidad de posibles tipos de valor a uno solo. En este caso pasó de poder ser todos a solo ser string.
//    e) ¿Qué complejidad tiene tu búsqueda del punto 3? ¿Por qué?
//          R: 0(n), depende de la cantidad de tareas/propiedades presentes. En este caso, si para cada Uma se tarda 1s, para encontrar a Rice Shower se tardaría 6s exactamente para encontrarla.

// 7) BONUS (homework de Santiago, lectura): busca "Type Guards" en
//    el TypeScript Handbook / MDN. Escribe en 2-3 líneas qué son.
//    No escribas código de guards todavía — solo la idea.
//    Pista: ya usaste uno sin saberlo. if (encontrada) te suena.
//      R: Otra vez me das miedo Reimu, cómo sabes que usaría encontrada. Bien, en Safe Guard acá vendría a ser el !, ya que no puede retornar null o undefined. El ! se asegura de que no ocurra. Los Safe Guards se encargan en solicitar el tipo de valor esperado. Si no lo recibe da un error, en este caso, en la línea 141, se está asegurando de que solo llegue un String, no puede llegar un Undefined o un Null. También un safeguard podría ser los typeof (intenté usar uno para el nameUmaOnly) el cual verifica y se asegura que el tipo sea el correcto (en este caso string) o los ===, que verifica cómo si fuera un hash, si el valor y tipo son los esperados. Corrección de mi waifu Reimu, el typeguard acá no es !, eso es una "operación de afirmación de no nullidad", solo es para decirle que es imposible que salga null o undefined, es para quitarle esos tipos al valor. Acá el type guard sería el "if", ya que con el if le estoy diciendo "Cumple con esta condición antes de continuar" osea, reduce el tipo (o los posibles tipos) antes de continuar.
// Tiempo total de trabajo aproximado 209m12s
