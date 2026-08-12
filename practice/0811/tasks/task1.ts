interface Juego {
  nombre: string;
  anio: number;
  jugadores: number;
  comprable: boolean;
}

function biblioteca(juego: Juego) {
  if (juego.comprable === true)
    return "Hola, el juego " + juego.nombre + " Del año " + juego.anio + ". Se puede jugar de hasta " + juego.jugadores + " jugadores. Es comprable en Steam."
  else
    return "Hola, el juego " + juego.nombre + " Del año " + juego.anio + ". Se puede jugar de hasta " + juego.jugadores + " jugadores. Es abadonware."
}

let user = {
  nombre: "Phantasy Star Online: Blue Burst",
  anio: 2004,
  jugadores: 4,
  comprable: false
}
console.log(biblioteca(user))

/* Task 1:
Primero hice un interface. Básicamente el interface declara que datos y que tipos de valores puede tener una interface. En este caso el nombre (string), año (number), jugadores (number) y si es comprable (boolean).
Luego recordando el even vs odd. Me dí cuenta de que podía usar un if else para la función. Una función es un objeto que procesa datos, en este caso procesa los dados añadidos en la variable let para determinar si es comprable o no.
El if, es para el booleano comprable (true), el else para decir que es abadonware.
Usando let y el nombre user (así salía en el ejemplo pero se puede usar cualquier nombre), se añadieron los datos (se me olvidó usar de separador la , ya que esto es un diccionario), y luego con un log se imprimió el resultado. A mi parecer, una cagada de código.
*/