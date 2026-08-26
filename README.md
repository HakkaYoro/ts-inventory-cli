# TS-Inventory-CLI

Herramienta de línea de comandos hecha en TypeScript para gestionar ítems de
Phantasy Star Online: Blue Burst.

## Uso

Ejecuta desde la raíz del proyecto:

```bash
tsx src/cli.ts add <nombre> <rareza> <cantidad>
tsx src/cli.ts list
tsx src/cli.ts remove <uuid>
tsx src/cli.ts search <nombre>
```

### Comandos

- `add`: añade un ítem al inventario.
- `list`: muestra todos los ítems guardados.
- `remove`: elimina un ítem usando su UUID.
- `search`: busca ítems por nombre sin distinguir mayúsculas y minúsculas.

Los datos se guardan en `data.json`.

## Validaciones

- El nombre no puede estar vacío.
- La rareza debe ser un número entero entre 1 y 10.
- La cantidad debe ser un número entero entre 1 y 99.