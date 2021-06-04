const URL = "http://localhost:8080/ClaudiaKevinJaime/webapi/pedidos";
const myModal = new bootstrap.Modal(document.getElementById("idModal")); // Para los mensajes de error y avisos

window.onload = init;

function init() {
  if (window.location.search != "") {
    const queryStr = window.location.search.substring(1);
    const parametro = queryStr.split("=");
    idpedido = parametro[1];

    rellenaPedido(idpedido);
  } else {
    document.getElementById("idId").value = "Nuevo Pedido";
    document.getElementById("idSalvar").disabled = false;
  }

  // Usa el boton de cancelar para volver atrás
  document.getElementById("idCancel").addEventListener("click", (evt) => {
    evt.preventDefault();
    volver();
  });

  // El boton de salvar sólo está activo cuando se carge los datos de un pedido
  // document.getElementById("idSalvar").addEventListener("click", salvarPedido);
  document.getElementById("idFormPedido").addEventListener("submit", salvarPedido);
}

function rellenaPedido(idpedido) {
  const peticionHTTP = fetch(URL + "/" + idpedido);

  peticionHTTP
    .then((respuesta) => {
      if (respuesta.ok) {
        return respuesta.json();
      } else throw new Error("Return not ok");
    })
    .then((pedido) => {
      let inputs = document.getElementsByTagName("input");
      for (let input of inputs) {
        input.value = pedido[input.name] ?? "";
      }
      document.getElementById("idSalvar").disabled = false;

      console.log(pedido.lista);
      let tblBody = document.getElementById("id_tblProductos");
      for (const producto of pedido.lista) {
        let fila = document.createElement("tr");
        let elemento = document.createElement("td");

        elemento.innerHTML = producto.id;
        fila.appendChild(elemento);
        elemento = document.createElement("td");
        elemento.innerHTML = producto.order_id;
        fila.appendChild(elemento);
        elemento = document.createElement("td");
        elemento.innerHTML = producto.quantity;
        fila.appendChild(elemento);
        elemento = document.createElement("td");
        elemento.innerHTML = producto.unit_price;
        fila.appendChild(elemento);
        elemento = document.createElement("td");
        elemento.innerHTML = producto.discount ?? "";
        fila.appendChild(elemento);
        elemento = document.createElement("td");
        elemento.innerHTML =
          `<button style="color:gray;"class="btn btn-link" onclick="editaProducto(${producto.id})"><i class="bi-pencil"></i></button>` +
          `<button style="color:red;" class="btn btn-link"  onclick="borrarProducto(${producto.id})"><i class="bi-x-circle"></i></button>`+
          `<button style="color:black;  "class="btn btn-link" onclick="mostrarProducto(${producto.id})"><i class="bi bi-eye"></i></button>`;
          fila.appendChild(elemento);
        tblBody.appendChild(fila);
      }
      function editaProducto(idproducto) {
        window.location.href = `editarProducto.html?idproducto=${idproducto}`;
      }
    })
    .catch((error) => {
      muestraMsg("No he podido recupera este  Pedido. " + error, false);
    });
}

function salvarPedido(evt) {
  evt.preventDefault();

  // Creo un array con todo los datos formulario
  let pedido = {};

  // Relleno un array pedido con todos los campos del formulario
  let inputs = document.getElementsByTagName("input");
  for (let input of inputs) {
    pedido[input.name] = input.value;
  }

  if (pedido.id == "Nuevo Pedido") { // Añadimos pedido
    delete pedido.id;
    opciones = {
      method: "POST", // Añadimos un registro a la BBDD
      body: JSON.stringify(pedido), // Paso el array pedido a un objeto que luego puedo jsonear
      headers: {
        "Content-Type": "application/json",
      },
    };
  } else {  // Modificamos
    opciones = {
      method: "PUT", // Modificamos la BBDD
      body: JSON.stringify(pedido), // Paso el array pedido a un objeto que luego puedo jsonear
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  fetch(URL)
    .then((respuesta) => {
      if (respuesta.ok) {
        return respuesta.json();
      } else throw new Error("Fallo al actualizar: " + respuesta);
    })
    .then((respuesta) => {
      muestraMsg("Datos Actualizados💁‍♀️", "✨ Todo parace haber ido bien ✨", false, "success");
    })
    .catch((error) => {
      muestraMsg("Que mal...👎 ", "🥺No he podido actulizar la Base de Datos😭 " + error, false, "error");
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

function mostrarPedidos(){
  window.location.href = "indexPedido.html";
}