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
//    c) Si no, throw (guard clause — if + || + throw, como tu
//       constructor de ItemPSO)
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
//    - guard clause con if (Día 8)
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
//    g) ¿Qué ES una guard clause? Da el ejemplo de tu constructor
//       de ItemPSO (if + || + throw). (Refuerzo de ayer.)
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
// Start Time: (18/08) XX:YY - XX:YY
// Total Time Spent: D9 XXX:YY
