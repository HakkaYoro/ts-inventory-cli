// TASK 3: Pick, Omit y Partial — Personajes de Touhou
//
// Define un type para un personaje de Touhou con estas propiedades:
//   - nombre (string)
//   - titulo (string) — ej: "Shrine Maiden of Paradise"
//   - especie (string) — ej: "Humana", "Youkai", "Vampiro"
//   - stage (number) — en qué stage aparece como boss
//   - spellCards (array de strings) — ej: ["Fantasy Seal", "Spiritual Domination"]
//   - dificultad (string) — "Easy" | "Normal" | "Hard" | "Lunatic"
//
// 3a) Usa Pick para crear un tipo que SOLO tenga nombre y titulo.
//     (Es el roster de selección: nombre + título, nada más.)
//
// 3b) Usa Omit para crear un tipo SIN spellCards.
//     (Perfil público — no spoilers de los ataques.)
//
// 3c) Usa Partial para crear un tipo donde TODAS las propiedades sean opcionales.
//     (Un "patch" que actualiza cualquier campo del personaje.)
//
// Después de escribir cada tipo, crea un objeto real con datos de un
// personaje de Touhou (Reimu, Sakuya, Flandre — el que quieras)
// usando cada tipo.
//
// Al terminar, EXPLICA con tus palabras:
//   - ¿Qué hace Pick? ¿Qué hace Omit? ¿En qué se diferencian?
//   - ¿Qué hace Partial? ¿Cuándo lo usarías en la vida real?

type tohoChar = {
    nombre: string;
    titulo: string;
    especie: string;
    stage: number;
    spellCards: string[];
    dificultad: "Easy" | "Normal" | "Hard" | "Lunatic";
}
// Pick - Selección de datos para crear un type nuevo. Digo datos de forma general, es más que todo para seleccionar propiedades y keys en un type nuevo sin tener que reescribir nada. Las seleccionadas se vuelven obligatorias.
type selCharRost = Pick<tohoChar, "nombre" | "titulo">;
// Omit - Lo mismo que con Pick pero se diferencia en que en vez de seleccionar específicos, omites los que elijas. Las restantes se vuelven obligatorias.
type publicCharInfo = Omit<tohoChar, "spellCards">;
// Partial - Vuelve todas las propiedades opcionales automáticamente para no tener que escribir ? a lo pendejo. Todo opcional, puedes omitir datos sin problemas.
type patchNotes = Partial<tohoChar>

const hakureiReimu: selCharRost = {
    nombre: "Hakurei Reimu",
    titulo: "My Wife - Shrine Maiden of Hakurei Shrine"
}

const scarletRemilia: publicCharInfo = {
    nombre: "Remilia Scarlet",
    titulo: "Mistress of the Scarlet Devil Mansion",
    especie: "Vampire",
    stage: 6,
    dificultad: "Hard"
}

const spellcScarletRemilia: patchNotes = {
    spellCards: [
        'Divine Scarlet Sign "Bloody Laser of Seventeen Articles"',
        'Scarlet Sign "Scarlet Meister"',
        'Scarlet Bat "Vampirish Night"'
    ]
}

/*
Arriba ya expliqué que hace cada uno. La diferencia de los dos es que pick eliges forzosamente que usar, con omit lo mismo pero eliges que saltarte/omitir.
En pick eliges lo que obligatoriamente usarás, en omit lo que obligatoriamente no usarás. Eso significa que, lo que selecciones o lo que no omitas, tienes que llenarlos obligatoriamente.
Explicado más arriba. Partial lo usaría si necesito añadir datos extra que se me olvidaron en algo. Si no, para decir "De todo estas propiedades, tal vez necesite todo, como tal vez solo necesite una cosa".
Básicamente solo usar si no estás seguro si vas a necesitar algo o no en algún momento.
*/