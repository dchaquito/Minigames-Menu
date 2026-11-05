# Magical Party — Ruleta de minijuegos

Segundo sitio independiente del tablero, listo para publicar en GitHub Pages.

## Funciones
- Menú con cuatro categorías: Todos contra todos, Dos contra dos, Todos contra uno y Desafío.
- Tres minijuegos por categoría (12 en total), con los nombres y reglas proporcionados.
- Al principio cada minijuego aparece como `??????`.
- La ruleta gira y el minijuego seleccionado revela su nombre y descripción al terminar.
- Los minijuegos revelados quedan desbloqueados en futuras tiradas y visitas.
- Botón para volver al menú de categorías.
- Guardado automático con `localStorage` (solo en ese navegador y dispositivo).

**Importante:** Esta página selecciona y revela minijuegos, pero no ejecuta sus actividades ni lleva el control de monedas o coronas. La ruleta puede volver a seleccionar juegos ya desbloqueados.

## Publicar
1. Crea un repositorio público en GitHub (por ejemplo, `magical-party-minijuegos`).
2. Sube `index.html`, `styles.css`, `app.js` y `README.md` a la raíz del repositorio.
3. En Settings → Pages, selecciona Deploy from a branch → main → /(root) → Save.
4. Espera a que GitHub Pages publique la URL.

Para modificar los minijuegos, edita el objeto `categories` al principio de `app.js`.
