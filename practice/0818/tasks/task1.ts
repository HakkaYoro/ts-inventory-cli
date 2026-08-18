// TASK 1 (Día 9): Utility Types — El cuchillo suizo de TS
// Integración de conceptos: Días 1-9 (tema del día: UTILITY TYPES)
//
// ANTES DE EMPEZAR: relee la sección 8 (Utility Types) del cheatsheet
// typescript-from-python.md. Ya la leiste en el Día 2 pero ahora
// vas a ESCRIBIRLOS, no solo verlos. 10 min máximo de relectura.
//
// Enunciado:
//
// WARM-UP — Corrección de errores (15 min):
//
// 1) Abre tu task de AYER (0817). Tienes 5 errores conceptuales
//    en los comentarios de la Parte C. CORRÍGELOS en el archivo:
//
//    a) Event loop: dijiste "JS está diseñado para síncrono".
//       Es al revés. JS ES síncrono (un hilo, una cosa a la vez).
//       El event loop es lo que LE PERMITE hacer cosas async sin
//       bloquear. Y "si algo explota nada se rompe" es falso: un
//       error sin try/catch SÍ detiene todo. Reescribe.
//
//    b) ||0: dijiste "si no encuentra retorna 0". Casi. || no busca,
//       ENTREGA. Si lo de la izquierda es falsy (undefined, porque
//       el casillero no existe), entrega lo de la derecha (0).
//       No es "buscar y fallback" — es "dador de default".
//
//    c) T[] vs Array<T>: dijiste que son distintos. Son EXACTAMENTE
//       lo mismo. Ambos genéricos. Array<T> es la forma larga,
//       T[] es azúcar sintáctico. El compilador los trata idéntico.
//
//    d) Big-O del warm-up: dijiste O(log n). Es O(n). contarPorRarity
//       recorre TODO el array con for-of — cada elemento se visita
//       una vez. No divide nada a la mitad. Es lineal.
//
//    e) Hoisting: dijiste "eleva variables al principio de la RAM".
//       Es al principio del SCOPE, no RAM. Y hay un detalle: var se
//       eleva (con valor undefined), let/const NO se elevan igual
//       (TDZ — temporal dead zone, error si las tocas antes de
//       declarar). Las funciones SÍ se elevan completas.
//
//    Además: quita el console.log(this.rarity) del constructor (línea
//    ~113). Ya cumplió su función — es ruido.
//
//    Y descomenta/corrige contarPorRarity (líneas ~79-90). Tiene
//    dos bugs: `classRarity` no existe como tipo (debería ser
//    ItemPSO), y `rarity.rareza` debería ser `rarity.rarity`.
//    Corrige y descomenta. Si funciona, el conteo debería dar
//    { common: 1, rare: 8 }.
//
// PARTE A — Pick y Omit: eliges qué ver (20 min):
//
// 2) Desde tu ItemPSO de ayer, crea dos types con Pick y Omit:
//
//    - Un type que solo tenga nombre y rarity (para mostrar en
//      una lista de inventario sin revelar stats privados).
//      Usa Pick.
//
//    - Un type que tenga todo MENOS equipado (para un formulario
//      de creación donde el equipado se decide después).
//      Usa Omit.
//
//    NOMBRA los types tú. No uses "ItemPSOPick" — eso no dice nada.
//    El nombre debe comunicar PARA QUÉ sirve.
//
// 3) Escribe una función que reciba el array de items y devuelva
//    un array del type del punto 2 (el de Pick, la lista pública).
//    Usa .map(). La función transforma cada ItemPSO al tipo reducido.
//
// PARTE B — Partial, Record y Generics de regreso (30 min):
//
// 4) Crea un type con Partial que represente "campos opcionales
//    para actualizar un item". Si el usuario solo quiere cambiar
//    el ataque, se pasa { ataque: 900 }. Si solo el nombre,
//    { nombre: "Nuevo Nombre" }. Partial hace que TODO sea opcional.
//
// 5) Escribe una función actualizarItem GENÉRICA que reciba:
//    - El nombre del item a buscar (string)
//    - Un objeto con los campos a actualizar (el type del punto 4)
//    - Un array donde buscar (GENÉRICO — igual que buscarPorNombre)
//
//    La función:
//    a) Usa <T extends { nombre: string }> — igual que tu
//       buscarPorNombre de ayer. No reescribas la búsqueda:
//       IMPORTA o llama a buscarPorNombre dentro de actualizarItem.
//    b) Si lo encuentra, aplica los cambios (Object.assign o manual)
//    c) Si no, throw (guard clause con if, como tu constructor
//       de ItemPSO — pero aquí el guard es simple: if (!item) throw)
//
//    OJO: ItemPSO tiene props readonly. Esto va a explotar — y eso
//    ES la trampa. Lee el error del compilador y piensa: ¿por qué
//    readonly le rompe la actualización? ¿Qué tendría que cambiar
//    en la clase para que funcione? (No lo cambies — solo explícalo
//    en comentarios.)
//
// 6) Con Record, crea un mapa de items por rarity:
//    Record<string, T[]> donde T es genérico (extends { nombre: string,
//    rarity: string }). La key es "common" o "rare" y el value es el
//    array de items de esa rarity. Escribe una función GENÉRICA
//    agruparPorRarity<T>(items: T[]) que recorra el array con un
//    for-of (el patrón de contarPorRarity pero acumulando arrays,
//    no números) y devuelva el Record.
//
//    REFUERZO: esta función combina TODO lo de hoy y ayer:
//    - <T extends ...> (generics + constraint, Día 8)
//    - for-of + acumulador + || default (warm-up D6/D8)
//    - Record<string, T[]> (utility types, Día 9)
//
// PARTE C — Explicaciones que caen en entrevista (20 min):
//
// 7) En comentarios, con tus palabras:
//    a) ¿Qué ES Pick<T, K>? Da un ejemplo con INPUT→OUTPUT usando
//       tu ItemPSO real.
//    b) ¿Qué ES Omit<T, K>? ¿En qué se diferencia de Pick?
//       (No digas "son opuestos" — explica QUÉ hace cada uno
//       con las propiedades.)
//    c) ¿Qué ES Partial<T>? ¿Para qué sirve en la vida real
//       (no en abstracto)?
//    d) ¿Qué ES Record<K, V>? ¿Qué relación tiene con un objeto
//       literal y con un Map de Python?
//    e) ¿Por qué readonly le rompe la actualización a tu función
//       del punto 5? ¿Qué ES readonly exactamente (regla vs valor)?
//    f) ¿Qué ES <T extends { nombre: string }>? ¿Por qué necesitas
//       el extends y no solo <T>? (Refuerzo de ayer.)
//    g) ¿Qué ES una guard clause? Da DOS ejemplos: el de tu
//       constructor de ItemPSO (if + || + throw) y el de
//       actualizarItem (if + throw simple). ¿Cuál es la diferencia?
//
// Reglas de siempre: === SIEMPRE. Sin valores quemados en
// funciones. Releer el enunciado completo antes de decir "listo".
// Si satura, la Parte C se parte: a-b-c hoy, d-e mañana.
// Warm-up y Parte A hoy sí o sí.
//
// Tema: PSO:BB (continúa el inventario de ayer).
// El concepto es lo que importa.
//
// TRAMPA DE LECTURA: el punto 5 pide actualizar un item. Pero tus
// props son readonly. Piensa ANTES de escribir: ¿puedes actualizar
// algo readonly? El compilador te lo va a decir — pero es mejor
// pensarlo antes.
//
// Total estimado: 90-100 min.
// Start Time: (18/08) 05:39 - 10:46
// Total Time Spent: D9 223:54min
//
// WORKFLOW INCREMENTAL: al terminar cada parte (A, B, C), manda
// un mensaje corto a Reimu ("parte X lista, me trabé en Y, seguía").
// Ella actualiza el progress en tiempo real. No es un reporte formal
// entre partes — es un aviso de paso. El cierre completo (batsu, stats,
// task de mañana) va al final del día como siempre.

import {
	buscarPorNombre,
	type ItemPSO,
	itemList,
} from "../../0817/tasks/task1";

type itemNameRarity = Pick<ItemPSO, "nombre" | "rarity">;
type itemDetailed = Omit<ItemPSO, "equipado">;
type itemPatcher = Partial<ItemPSO>;

function nameRarityArray(nameRarity: ItemPSO[]): itemNameRarity[] {
	const arrayGen = nameRarity.map((nameRar): itemNameRarity => {
		return { nombre: nameRar.nombre, rarity: nameRar.rarity };
	});
	return arrayGen;
}
// Sabía donde debía ir el extends, revisé 1 vez por si acaso. Tuve que volder la la task del 0816 para ver cómo se encadenaban funciones dentro de una misma función 2 o 5 veces en total, no recuerdo. Revisada task1 del 0813 para ver cómo se usaba partial dentro de una función.
function actualizarItem<T extends { nombre: string; rarity: string }>(
	searchName: string,
	nombres: T[],
	parches: itemPatcher,
) {
	const weapName = buscarPorNombre(searchName, nombres);
	if (!weapName)
		throw new Error(`El nombre ${searchName} no existe, vuelva a intentarlo!`);
	if (parches.nombre) {
		const oldNam = searchName;
		weapName.nombre = parches.nombre;
		return `El nombre ha sido modificado satisfactoriamente. Cambió de ${oldNam} a ${parches.nombre}!`;
	}
	if (parches.rarity) {
		const oldRar = weapName.rarity;
		weapName.rarity = parches.rarity;
		return `La rareza ha sido modificada satisfactoriamente. Cambió de ${oldRar} a ${parches.rarity}!`;
	}
}
//Conteo de revisadas del Record. Primera para repasarlo. 2 revisadas para el for. 8 en total. Investigué cómo funcionaba .push
function mapItemRarity<T extends { nombre: string; rarity: string }>(
	mapRarity: T[],
) {
	const itemMapByRar: Record<string, T[]> = {};
	for (const rarity of mapRarity) {
		const rarityMap = rarity.rarity;
		itemMapByRar[rarityMap] = itemMapByRar[rarityMap] || [];
		itemMapByRar[rarityMap].push(rarity);
	}
	return itemMapByRar;
}

console.log(actualizarItem("Saber", itemList, { rarity: "rare" }));
console.log(nameRarityArray(itemList));
console.log(
	actualizarItem("Spread Needle", itemList, { nombre: "Te amo Reimu!" }),
);
console.log(nameRarityArray(itemList));
console.log(mapItemRarity(itemList));

// PARTE C — Explicaciones que caen en entrevista (20 min):
//
// 7) En comentarios, con tus palabras:
//    a) ¿Qué ES Pick<T, K>? Da un ejemplo con INPUT→OUTPUT usando
//       tu ItemPSO real.
//          R: Pick es un type nuevo que se basa en un type (también puede ser un interface o clase con types) anteriormente creado. Lo que dice es "Mira, de este type lo que necesito es esto y esto". En este código sería "nombre" y "rarity". Solo se restringe a tomar las propiedades de esos dos.
//    b) ¿Qué ES Omit<T, K>? ¿En qué se diferencia de Pick?
//       (No digas "son opuestos" — explica QUÉ hace cada uno
//       con las propiedades.)
//          R: Omit es muy similar a Pick. Técnicamente hacen lo mismo pero de distinta forma. El Pick es para elegir las propiedades de un tipo que necesitas, mientras que el Omit solo eliges las que NO necesitas. Ejemplo, si yo quisiera evitar las propiedades "ataque" y "equipado" del tipo que está en la clase "ItemsPSO", solo le digo "Omit<ItemPSO, 'ataque' | 'equipado'>" y en automático quedan descartadas en el nuevo type.
//    c) ¿Qué ES Partial<T>? ¿Para qué sirve en la vida real
//       (no en abstracto)?
//          R: Partial es un tipo nuevo que creas que reutiliza un type anteriormente creado (pueden ser interfaces o clase con types) pero con la excepción de que pones todos los campos del type en opcional. Ejemplo, si quieres parchear algo en tiempo real, tú solo le pasas el type Partial, le indicas que type anteriormente creado necesitas y en automático todo queda cómo opcional. Cómo si hubiera escrito "nombre?", "rarity?", "ataque?", "equipado?". Útil por si solo necesitas cambiar el valor de una sola propiedad.
//    d) ¿Qué ES Record<K, V>? ¿Qué relación tiene con un objeto
//       literal y con un Map de Python?
//          R: La parte de Python ni idea cómo responderla, aún no lo logro asociar con algo de Python mentalmente.
//          Record es un tipo nuevo que creas (no estoy seguro si es un tipo, no sé cómo más llamarlo, tal vez argumento?) para decir "Necesito de esta Key los siguientes valores o tipos de valor" (me di cuenta que no es un type nuevo, que es?) y los tenga en memoria con un conteo mental (por decirlo de alguna forma).
//    e) ¿Por qué readonly le rompe la actualización a tu función
//       del punto 5? ¿Qué ES readonly exactamente (regla vs valor)?
//          R: Te equivocas, NO ROMPE la actualización (gracias por la concha de mango/pregunta trampa). El readonly es para la propiedad dentro de la clase. Es para decirle "Mira, esto nunca se va a mover de ser un 'string'".
//              Readonly solo es una regla que no se puede romper, pero el valor si puede cambiar.
//    f) ¿Qué ES <T extends { nombre: string }>? ¿Por qué necesitas
//       el extends y no solo <T>? (Refuerzo de ayer.)
//          R: <T extends...> lo que hace es RESTRINGIR las propiedades posibles a una o varias (según lo que le indiques), a una propiedad y tipo de valor. En cambio <T> permite todo lo que entre, narrowing básicamente.
//    g) ¿Qué ES una guard clause? Da DOS ejemplos: el de tu
//       constructor de ItemPSO (if + || + throw) y el de
//       actualizarItem (if + throw simple). ¿Cuál es la diferencia?
//          R: Un guard clause es un guard que creas para asegurarse de que algo no usado/no necesario no pase. Para que no explote o de datos erroneos (aunque creo que si puede explicar, lo que no pueden pasar son valores con tipado erroneo).
//              (No sabía que esto calificaba cómo constructor.) El del || simplemente es un dador de default, verifica lo que tiene a la izquierda, si es falsly retorna lo de la derecha. En este caso se dió "[]", un array vacío para no llenar de datos basura al array que se creó acá. El throw simplemente es para que explote con un error (No usado, porqué lo mencionas?). lo del constructor tiene sentido porque como más estoy accediendo a los datos de ataque o equipado si son private.
//              En el caso de actualizar item el guard clause "if(!weapName)" se usa para decir, asegurate de que no me tiren un Undefined, si no, tira throw y explota con el error. También se asegura de que el nombre realmente esté en el array.
//              La diferencia es que uno solo se asegura que realmente esté en el array y que no sea undefined (el del if) y el otro se asegura de que exista, si no retorna un resultado vacío. Así nunca hay datos erróneos.
//
// CORRECCIONES DE REIMU:
//
// d) Record: SÍ es un utility type, igual que Pick y Omit. Crea un tipo
//    que describe un objeto donde las keys son K y los values son V.
//    Record<string, T[]> = diccionario tipado. En Python = dict[str, list[T]].
//    Un objeto literal de TS es la versión sin tipar; Record le pone el contrato.
//
// e) readonly: ERROR SERIO. Dijiste "el valor sí puede cambiar". FALSO.
//    readonly significa que DESPUÉS del constructor NO puedes reasignar
//    la propiedad. Si alguien hace item.nombre = "Otro", el compilador
//    lo bloquea. El valor NO puede cambiar.
//    Lo que viste hoy fue el GENÉRICO ignorando readonly, no readonly
//    permitiendo el cambio. <T extends {nombre: string}> no ve readonly
//    — solo ve {nombre: string} mutable. Si la función recibiera
//    ItemPSO[] directo, el compilador SÍ habría bloqueado la asignación.
//
// f) extends: Entiendes que restringe, bien. Pero llamarlo "narrowing
//    básicamente" es incorrecto. extends es un CONSTRAINT en compile-time
//    (le dice al compilador qué tipos acepta T). Narrowing es reducir
//    tipos en RUNTIME dentro de un if. No son lo mismo.
//
// g) Guard clause: Definición fangosa. Guard clause = check al PRINCIPIO
//    de una función que valida precondición y sale temprano (throw/return)
//    si falla. El || [] NO es guard clause — es default value. Guard
//    clause = validar y abortar. Default = garantizar punto de partida.
//    El guard del constructor (if rarStar < 1 || > 12) valida el RANGO
//    del input, no tiene que ver con private.
//
