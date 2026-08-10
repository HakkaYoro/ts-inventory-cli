// Codewars — Multiply (8 kyu)
// https://www.codewars.com/kata/53da3dbb4a5168369a0000fe
// Resuelto: Ago 10, 2026
// Create a function that takes an integer as an argument and returns "Even" for even numbers or "Odd" for odd numbers.

// Fix: llorar.
export function evenOrOdd(n:number):string {
    if (n % 2 === 0)
        return 'Even';
    else
        return 'Odd'
}

