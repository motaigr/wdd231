/* =========================================================
   formulario.js
   Página "Comece a Jogar": registra a data/hora do envio no
   campo oculto do formulário.
   ========================================================= */

import { iniciarPagina } from "./comum.mjs";

iniciarPagina();

document.getElementById("formulario-clube").addEventListener("submit", () => {
  document.getElementById("data-envio").value = new Date().toISOString();
});
