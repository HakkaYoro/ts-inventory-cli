// TASK 4: const vs let — Inventario de PSO:BB
//
// Un personaje de Phantasy Star Online Blue Burst tiene estos datos:
//   - Nombre del personaje (no cambia — te llamás así siempre)
//   - Section ID (no cambia — se calcula al crear el personaje)
//   - Nivel actual (cambia — subís de nivel)
//   - Meseta / dinero (cambia — comprás y vendés)
//   - Arma equipada (puede cambiar — te equipás otra cosa)
//
// 4a) Declara cada variable con const o let según corresponda.
//     Pregunta clave para cada una: ¿este valor cambia alguna vez?
//     Si no → const. Si sí → let.
//
// 4b) Reasigna los valores que deberían cambiar:
//     - Subí el nivel de 1 a 2
//     - Gastá meseta comprando algo
//     - Cambiá el arma equipada
//
// 4c) Intenta reasignar una const (por ejemplo, el nombre).
//     ¿Qué pasa? ¿Qué dice el error de TypeScript?
//
// 4d) OJO con la trampa de ayer:
//     Para reasignar usás el nombre de la variable SIN let/const.
//     Es decir:  nivel = 2   (NO  let nivel = 2)
//     Si escribís let otra vez, estás creando una variable NUEVA,
//     no modificando la existente.
//
// Al terminar, EXPLICA:
//   - ¿Por qué const para nombre pero let para nivel?
//   - ¿Qué significa "reasignar" vs "declarar"?

type charDesPSO = {
    nombre: string,
    sectionID: 'Viridia' | 'Greenil' | 'Skyly' | 'Bluefill' | 'Purplenum' | 'Pinkal' | 'Redria' | 'Oran' | 'Yellowboze' | 'Whitil',
    level: number,
    meseta: number,
    weaponType: 'Saber' | 'Sword' | 'Daggers' | 'Partisan' | 'Handguns' | 'Rifle' | 'Rod'
}

type staData = Pick<charDesPSO, "nombre" | "sectionID">
// Lo del uso del keyof acá se lo pregunté a Gemini. No recordaba el keyof, tengo sueñito.
type dynData = Omit<charDesPSO, keyof staData>

const hakkaCharStaData: staData = {
    nombre: 'Hakka',
    sectionID: 'Redria'
}
//Podría hacerlo más complejo por el tipo de clase seleccionada, pero tengo sueño x2
let hakkaCharDynData: dynData = {
    level: 112,
    meseta: 7518932,
    weaponType: 'Rifle'
}

hakkaCharDynData = {
    ...hakkaCharDynData, 
        level: 113,
        meseta: 1231415,
        weaponType: 'Handguns'
}
/*
hakkaCharStaData = {
    ...hakkaCharStaData,
        nombre: "Reimu"        
}

No reasignable porque son datos constantes.

*/

/*
Const se queda así porque son datos constantes. Let porque pueden cambiar dinámicamente. Así como en la vida real. Eres hombre o mujer, no se cambia, es un const booleano.
Luego la edad, cambia constantemente, osea, un let.

Reasignar fué lo que hice con los ..., simplemente cambié/reemplacé los datos del let original por unos nuevos. Declarar es decir que algo es así porque es así, osea, un const.
*/