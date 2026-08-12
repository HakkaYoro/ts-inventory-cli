/*
Task 2 — Type alias + union (tema de hoy)
En Touhou hay 4 niveles de dificultad: Easy, Normal, Hard, Lunatic.
Define un type que solo permita esos cuatro valores.
Luego crea una función que reciba la dificultad y devuelva un mensaje — por ejemplo, "Lunatic? Estás loco" o "Easy? Principiante". Lo que quieras.
Después, fuera de la función, intenta asignarle 'Medium' a una variable con ese tipo y mira qué error te da el compilador.
*/

type tohoDiff = {
    easy: string;
    normal: string;
    hard: string;
    lunatic: string;
}
const msgDiff: tohoDiff = {
    easy: "Horrendo que eres, cómo que easy!? Ze...",
    normal: "Mejor, pero sigues estando pendejo jugando normal... Ze.",
    hard: "Oye, oye, oye... Cómo que hard!? Crees que los libros de Patchy o las dagas de Sakuya son fáciles de esquivar!?",
    lunatic: "Hey... Mis respetos si Flandre no te destruye, da ze..."
}

let selDiff: keyof tohoDiff = "hard"
//let prueba: keyof tohoDiff = "Medium"


function Dificultad(diff: keyof tohoDiff) {
    return msgDiff[diff]
}

console.log(Dificultad(selDiff))

/* Explicación de Task 2:
Primero un type. Un type establece las reglas de algo. Es decir, para que un gato sea un gato, debe ser un cuadrúpedo y debe poder maullar.
Básicamente, el type está diciendo que Keys y valores pueden ser asignados.
Luego viene el const. Es una variable que siempre se va a mantener constante.
Se le asignaron las keys y los valores (strings)
Luego se creó otra variable, esta vez let, porque siempre puede cambiar. Se usó keyof.
Keyof (Sugerencia de Gemini, asumo que lo que voy a escribir, por lógica, es la definición) es un operador que se encarga de leer las keys de un type y produce un union type con los nombres de las propiedades
Luego viene una función, para retornar el valor de los mensajes de la key. La lógica es
La Dificultad es una función, la cual recibe un input (keyoff tohoDiff) y devuelve un output "diff", el input lo que hace es obtener la llave que se le pide usando keyoff. 
Luego se le pide un retorno según el resultado del argumento "diff" (en este caso "hard") al objeto msgDiff, se retorna el valor y listo.
Ahora, cómo se vería el resultado, usando un log, se llama a la función Dificultad, para luego decirle "Dependes de selDiff", para luego ejecutar la lógica anteriormente explicada.
El error que retorna es. La key medium no está asignada en el type tohoDiff

Me gustó más este código, me tardé 1 hora pero siento que es más profesional.
*/