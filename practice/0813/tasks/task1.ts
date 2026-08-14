// TASK 1: Sistema de Inventário de Blue Archive — Integración de Conceptos
//
// Vas a construir un pequeño sistema de gestión de estudiantes de Blue Archive.
// Esta task combina TODO lo aprendido en los Días 1-3:
//   - types, interfaces, union types, literal types
//   - Pick, Omit, Partial
//   - const vs let
//   - Set vs Array (y Big-O)
//   - enum
//   - funciones con parámetros tipados
//
// Enunciado:
//
// 1) Define un type base llamado "Estudiante" con estas propiedades:
//    - nombre: string
//    - rol: un union type con los roles de Blue Archive (Tank, DPS, Support, Healer)
//    - club: string
//    - nivel: number
//    - suscripcion (literal type): "activa" | "suspendida"
//    - skills: string[] (lista de nombres de skills)
//
// 2) Crea un ARRAY con 4-5 estudiantes (datos reales o inventados de BA).
//
// 3) Usando Pick, crea un tipo que solo tenga nombre y rol.
//    Usando Omit, crea un tipo que tenga todo MENOS skills.
//    Usando Partial, crea un tipo que represente una actualización parcial
//    (cualquier campo podría venir o no).
//
// 4) Escribe una FUNCIÓN que reciba el nombre de un estudiante (string)
//    y devuelva sus datos completos. Usa el array para buscar.
//    Si no existe, devuelve un mensaje claro.
//
// 5) Escribe otra FUNCIÓN que reciba el Partial del estudiante y un nombre.
//    Esta función busca al estudiante por nombre y aplica los cambios.
//    (Simula un PATCH de API — solo actualiza los campos que vienen).
//
// 6) Convierte los nombres de tu array en un SET.
//    Escribe una FUNCIÓN que reciba un nombre y diga si el estudiante
//    existe o no. Usa Set.has().
//
// 7) Al final del archivo, en comentarios:
//    a) ¿Qué tipo de complejidad tiene tu función de búsqueda con array?
//    b) ¿Qué tipo de complejidad tiene tu función de búsqueda con Set?
//    c) ¿Por qué Set.has() es más rápido que Array.find() en una lista grande?
//
// 8) EXPLICA (en comentarios):
//    - ¿Qué ES narrowing? (Tu mayor fallo en Anki hoy)
//    - ¿Qué ES keyof? (Tu segundo fallo en Anki hoy)
//    - Dame un ejemplo de narrowing en ESTE código.
//
// Tema: Blue Archive. Pero el concepto es lo que importa.
//
// Al terminar, repasa tus respuestas de la 7 y 8 contra tus cartas de Anki.
// Si puedes explicarlo aquí, lo sabes.
//
// Hora de inicio y culminación: 04:55 - 08:05 (08/14)

type Estudiante = {
	nombre: string;
	rol: "Tank" | "DPS" | "Support" | "Healer";
	club: string;
	nivel: number;
	suscripcion: "activa" | "suspendida";
	skills: string[];
};

const schaleStudents: Estudiante[] = [
	{
		nombre: "Hikari",
		rol: "Support",
		club: "Highlander Railroad Academy",
		nivel: 80,
		suscripcion: "activa",
		skills: [
			"Ticket Time",
			"Time for Docking",
			"Ready to Go",
			"This will be Useful",
		],
	},
	{
		nombre: "Hina",
		rol: "DPS",
		club: "Genhena Academy",
		nivel: 80,
		suscripcion: "activa",
		skills: [
			"Ending scene: Ishbóshet",
			"Reload and Destroy",
			"Cool-headed Disciplinary committee",
			"From beginning to end",
		],
	},
	{
		nombre: "Ibuki",
		rol: "Support",
		club: "Genhena Academy",
		nivel: 80,
		suscripcion: "activa",
		skills: [
			"Ibuki's Magic Time!",
			"Don't Be Naughty!",
			"Angelic child",
			"Pandemonium Society's Cute Mascot",
		],
	},
	{
		nombre: "Kanna",
		rol: "DPS",
		club: "Valkyrie Police Academy",
		nivel: 80,
		suscripcion: "activa",
		skills: [
			"Chief of Public Security",
			"Intense interrogation",
			"Mad Dog obsession",
			"PSB special ammunition",
		],
	},
];

type BasicStuData = Pick<Estudiante, "nombre" | "club">;
type WoSkillStuData = Omit<Estudiante, "skills">;
type PatchStuData = Partial<Estudiante>;

function fullStu(onlyName: string) {
	const encontrada = schaleStudents.find(
		(student) => student.nombre === onlyName,
	);
	if (encontrada)
		return (
			`Encontrada la estudiante ${onlyName}!\n` +
			"Sus datos son:\n" +
			`Nombre: ${encontrada.nombre}\n` +
			`Rol: ${encontrada.rol}\n` +
			`Club: ${encontrada.club}\n` +
			`Nivel: ${encontrada.nivel}\n` +
			`Subscipcion: ${encontrada.suscripcion}\n` +
			`Skills: ${encontrada.skills}`
		);
	else
		return `No se encontro la estudiante ${onlyName}. Estás seguro de que existe?`;
}

function stuPatcher(onlyName: string, cambios: PatchStuData) {
	const student = schaleStudents.find((student) => student.nombre === onlyName);
	if (!student) return new Error(`No encontrada la estudiante ${onlyName}`);

	if (student && cambios.nivel) {
		student.nivel = cambios.nivel;
		return `Nivel de ${student.nombre} cambiado a ${cambios.nivel}`;
	}
	// const encontrada = schaleStudents.find((student) => student.nombre === onlyName)
	// if (encontrada && cambios.nivel) {
	//     encontrada.nivel = cambios.nivel
	//     return `Nivel de ${encontrada.nombre} cambiado a ${cambios.nivel}`
	// } else
	//     return new Error(`No encontrada la estudiante ${onlyName}`)
}

const setNomStu = new Set(schaleStudents.map((student) => student.nombre));
function nomStu(onlyName: string) {
	if (setNomStu.has(onlyName)) return `Está inscrita "${onlyName}"!!!!!!`;
	else return new Error();
}

/*
OKAY HORA DE EXPLICAR ESTA CAGADA QUE ME TOMÓ CASI 4 HORAS PROGRAMAR ACÁ VAMOS GENTE!!!!!!

a) ¿Qué tipo de complejidad tiene tu función de búsqueda con array?
    R:Si te refieres al Big-O, complejidad O(n), porque tiene que buscar en todos los datos (.find) hasta encontrar lo que se le pidió.
b) ¿Qué tipo de complejidad tiene tu función de búsqueda con Set?
    R: O(1), porque ya está en memoria (hasheado si lo quieres ver así), todo lo que está ahí, entonces no tiene que buscar nada, ya que por diseño, ya sabe que está ahí.
c) ¿Por qué Set.has() es más rápido que Array.find() en una lista grande?
    Porque no tiene que buscar viendo uno por uno, ya sabe que hay y que no hay. En cambio .find (mierda, me acabo de dar cuenta que ya sabías que usaría find, kowai), va revisando uno por uno hasta encontrar algo que coincida.
- ¿Qué ES narrowing? (Tu mayor fallo en Anki hoy)
    R: Sinceramente se me olvidó. Pero sé que es para resumir o cortar resultados, los filtra.
- ¿Qué ES keyof? (Tu segundo fallo en Anki hoy)
    R: (Para la respuesta, vi código de tasks anteriores) Busca los valores de la key que se le especifique, para así no tener que escribir de más. Digo key pero en realidad pueden ser tipos o interfaces.
- Dame un ejemplo de narrowing en ESTE código.
    R: (Investigué con Gemini que es Narrowing) Podría usarlo para decir "En los roles solo quiero que las opciones posibles sean DPS o Support. Porque en ningún momento usamos/usaremos Tank y Healer". Eso fué lo que le entendí a Gemini de un solo vistazo.
Correcciones de santiago, por eso el código está distinto.

    */
