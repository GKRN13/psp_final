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
    document.getElementById("idSalvar").disabled = false;
  }

  // Usa el boton de cancelar para volver atrás
  document.getElementById("idCancel").addEventListener("click", (evt) => {
    evt.preventDefault();
    volver();
  });

  // El boton de salvar sólo está activo cuando se carge los datos de un cliente
  // document.getElementById("idSalvar").addEventListener("click", salvarCliente);
  document.getElementById("idFormCliente").addEventListener("submit", salvarCliente);
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
      document.getElementById("idSalvar").disabled = false;

      console.log(cliente.lista);
      let tblBody = document.getElementById("id_tblPedidos");
      for (const pedido of cliente.lista) {
        let fila = document.createElement("tr");
        let elemento = document.createElement("td");

        elemento.innerHTML = pedido.id;
        fila.appendChild(elemento);
        elemento = document.createElement("td");
        elemento.innerHTML = pedido.employee_id;
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
    })
    .catch((error) => {
      muestraMsg("¡Me cachís!", "No he podido recupera este  Cliente. " + error, false);
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

  if (cliente.id == "Nuevo Cliente") { // Añadimos cliente
    delete cliente.id;
    opciones = {
      method: "POST", // Añadimos un registro a la BBDD
      body: JSON.stringify(cliente), // Paso el array cliente a un objeto que luego puedo jsonear
      headers: {
        "Content-Type": "application/json",
      },
    };
  } else {  // Modificamos
    opciones = {
      method: "PUT", // Modificamos la BBDD
      body: JSON.stringify(cliente), // Paso el array cliente a un objeto que luego puedo jsonear
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  fetch(URL, opciones)
    .then((respuesta) => {
      if (respuesta.ok) {
        return respuesta.json();
      } else throw new Error("Fallo al actualizar: " + respuesta);
    })
    .then((respuesta) => {
      muestraMsg("Datos Actualizados💁‍♀️", "✨ Todo parace haber ido bien ✨", false, "success");
    })
    .catch((error) => {
      muestraMsg("Que mal... f👎 ", "🥺No he podido actulizar la Base de Datos😭 " + error, false, "error");
    });

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