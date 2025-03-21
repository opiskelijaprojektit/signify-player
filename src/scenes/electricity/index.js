/**
 * @file index.js
 * @description Lyhennetty vientipiste Sahko-komponentille.
 * @author Vesa Pellikka
 */

//Viedään `Sahko.jsx`-komponentti muualle sovellukseen
// - Tämä tiedosto toimii lyhennettynä vientipisteenä (`index.js`), jolloin 
//   komponenttia voi tuoda yksinkertaisemmin muissa tiedostoissa
//- Tämä parantaa koodin selkeyttä ja helpottaa moduulirakenteen hallintaa.
export { default } from './electricity.jsx'