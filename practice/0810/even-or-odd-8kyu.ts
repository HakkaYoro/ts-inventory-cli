// Codewars — Even or Odd (8 kyu)
// https://www.codewars.com/kata/53da3dbb4a5168369a0000fe
// Resuelto: Ago 10, 2026

// Si n es divisible entre 2, es par. Si no, impar.
// Usé operador ternario: condición ? true : false

export function evenOrOdd(n: number): string {
  return n % 2 === 0 ? 'Even' : 'Odd';
}
