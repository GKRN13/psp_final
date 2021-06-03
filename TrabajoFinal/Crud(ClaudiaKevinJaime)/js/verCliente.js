const URL = "http://localhost:8080/ClaudiaKevinJaime/webapi/clientes";
const myModal = new bootstrap.Modal(document.getElementById("idModal")); // Para los mensajes de error y avisos
window.onload = init;
function init() {
  if (window.location.search != "") {
    const queryStr = window.location.search.substring(1);
    const parametro = queryStr.split("=");
    idcliente = parametro[1];
    rellenaCliente(idcliente);
  } else {
    document.getElementById("idId").value = "Nuevo Cliente";
  }
  // El boton de salvar sólo está activo cuando se carge los datos de un cliente
  // document.getElementById("idSalvar").addEventListener("click", salvarCliente);
  document.getElementById("idFormCliente").addEventListener;
}
function rellenaCliente(idcliente) {
  const peticionHTTP = fetch(URL + "/" + idcliente);
  peticionHTTP
    .then((respuesta) => {
      if (respuesta.ok) {
        return respuesta.json();
      } else throw new Error("Return not ok");
    })
    .then((cliente) => {
      let inputs = document.getElementsByTagName("input");
      for (let input of inputs) {
        input.value = cliente[input.name] ?? "";
      }
    console.log(cliente.lista);
      let tblBody = document.getElementById("id_tblPedidos");
      for (const pedido of cliente.lista) {
        let fila = document.createElement("tr");
        let elemento = document.createElement("td");

        elemento.innerHTML = pedido.id;
        fila.appendChild(elemento);
        elemento = document.createElement("td");
        elemento.innerHTML = pedido.customer_id;
        fila.appendChild(elemento);
        elemento = document.createElement("td");
        elemento.innerHTML = pedido.shipping_fee;
        fila.appendChild(elemento);
        elemento = document.createElement("td");
        elemento.innerHTML = pedido.ship_address;
        fila.appendChild(elemento);
        elemento = document.createElement("td");
        elemento.innerHTML = pedido.order_date;
        fila.appendChild(elemento);
        elemento = document.createElement("td");
        elemento.innerHTML = pedido.paid_date;
        fila.appendChild(elemento);
        elemento = document.createElement("td");
        elemento.innerHTML = pedido.ship_zip_postal_code;
        fila.appendChild(elemento);
        elemento = document.createElement("td");
        elemento.innerHTML = pedido.ship_city ?? "";
        fila.appendChild(elemento);
        elemento = document.createElement("td");
        elemento.innerHTML = pedido.status_id ?? "";
        fila.appendChild(elemento);
        tblBody.appendChild(fila);
      }
    });
}
function salvarCliente(evt) {
  evt.preventDefault();
  // Creo un array con todo los datos formulario
  let cliente = {};
  // Relleno un array cliente con todos los campos del formulario
  let inputs = document.getElementsByTagName("input");
  for (let input of inputs) {
    cliente[input.name] = input.value;
  }
  return false;
}
function volver() {
  window.history.back();
}
/**
 * Muestra un mensaje en el modal
 */
function muestraMsg(titulo, mensaje, okButton, tipoMsg, okMsg = "OK", closeMsg = "Close") {
  document.getElementById("idMdlOK").innerHTML = okMsg;
  document.getElementById("idMdlClose").innerHTML = closeMsg;

  myModal.hide();
  switch (tipoMsg) {
    case "error":
      {
        titulo = "<i style='color:red ' class='bi bi-exclamation-octagon-fill'></i> " + titulo;
      }
      break;
    case "question":
      {
        titulo = "<i style='color:blue' class='bi bi-question-circle-fill'></i> " + titulo;
      }
      break;
    default:
      {
        titulo = "<i style='color:green' class='bi bi-check-circle-fill'></i> " + titulo;
      }
      break;
  }
  document.getElementById("idMdlTitle").innerHTML = titulo;
  document.getElementById("idMdlMsg").innerHTML = mensaje;
  document.getElementById("idMdlOK").style.display = okButton ? "block" : "none";

  myModal.show();
}
function mostrarClientes(){
  window.location.href = "indexCliente.html";
}