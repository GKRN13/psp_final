const URL = "http://localhost:8080/ClaudiaKevinJaime/webapi/pedidos";
const URLPedido = `http://localhost:8080/ClaudiaKevinJaime/webapi/pedidos`

const myModal = new bootstrap.Modal(document.getElementById("idModal")); // Para los mensajes de error y avisos
const modalWait = new bootstrap.Modal(document.getElementById("idModalWait")); // Para los mensajes de error y avisos

window.onload = init;

function init() {
  const peticionHTTP = fetch(URL);

  peticionHTTP
    .then((respuesta) => {
      if (respuesta.ok) {
        return respuesta.json();
      } else throw new Error("No se ha podido conectar a la API.");
    })
    .then((pedido) => {
      rellenarToDatosPedidos(pedido);

      // Todo ha ido bien hast aquí, habilito el boton de añadir Pedido
      document.getElementById("idAddPedido").addEventListener("click", addPedido);
    })
    .catch((error) => {
      muestraMsg("¡M**rd!", "¡No he podido recuperar el listado de pedido!<br>" + error, false, "error");
    });
}

function rellenarToDatosPedidos(pedidos) {
  let tblBody = document.getElementById("id_tblPedidos");
  let select = document.getElementById("idSeleccionado");

  for (const pedido of pedidos) {
    let fila = document.createElement("tr");
    let elemento = document.createElement("td");
    elemento.innerHTML = pedido.id;
    fila.appendChild(elemento);
    elemento = document.createElement("td");
    elemento.innerHTML = pedido.employee_id;
    fila.appendChild(elemento);
    elemento = document.createElement("td");
    elemento.innerHTML = pedido.customer_id;
    fila.appendChild(elemento);
    elemento = document.createElement("td");
    elemento.innerHTML = pedido.ship_zip_postal_code;
    fila.appendChild(elemento);
    elemento = document.createElement("td");
    elemento.innerHTML = pedido.ship_city ?? "";
    fila.appendChild(elemento);
    elemento = document.createElement("td");
    elemento.innerHTML = pedido.payment_type ?? "";
    fila.appendChild(elemento);
    elemento = document.createElement("td");
    elemento.innerHTML = pedido.tax_status_id ?? "";
    fila.appendChild(elemento);
    elemento = document.createElement("td");
    elemento.innerHTML = pedido.status_id ?? "";
    fila.appendChild(elemento);
    elemento = document.createElement("td");
    elemento.innerHTML =
      `<button style="color:gray;" class="btn btn-link" onclick="editaPedido(${pedido.id})"><i class="bi-pencil"></i></button>` +
      `<button style="color:red;" class="btn btn-link"  onclick="borrarPedido(${pedido.id})"><i class="bi-x-circle"></i></button>`+
      `<button style="color:purple; "class="btn btn-link" onclick="mostrarPedidos(${pedido.id})"><i class="bi bi-eye"></i></button>`;
      fila.appendChild(elemento);

    elemento = document.createElement("td");
    tblBody.appendChild(fila);
  }

  select.addEventListener("change", buscarPedido);
}

function buscarPedido(e) {
  const select = document.getElementById("idSeleccionado");
  const idPedidoSeleccionado = select.value;
  const peticionHTTP2 = fetch(URLPedido+idPedidoSeleccionado);
  
  peticionHTTP2
  .then((respuesta) => {
    if (respuesta.ok) {
      return respuesta.json();
    } else throw new Error("No he podido leer la petición.");
  })
  .then((order) => {
    rellenarDatosPedido(order);
  })
  .catch((error) => {
    muestraMsg("¡Me cachís!", "¡Qué haces buscando un pedido que no existe!<br>" + error, false, "error");
  });
}

function rellenarDatosPedido(order){
  limpiarTabla();
  let tblBody = document.getElementById("id_tblPedidos");

  let fila = document.createElement("tr");
  let elemento = document.createElement("td");
  elemento.innerHTML = order.id;
  fila.appendChild(elemento);

  elemento = document.createElement("td");
  elemento.innerHTML = order.employee_id;
  fila.appendChild(elemento);

  elemento = document.createElement("td");
  elemento.innerHTML = order.customer_id;
  fila.appendChild(elemento);

  elemento = document.createElement("td");
  elemento.innerHTML = order.order_date;
  fila.appendChild(elemento);

  elemento = document.createElement("td");
  elemento.innerHTML = order.shipped_date ?? "";
  fila.appendChild(elemento);

  elemento = document.createElement("td");
  elemento.innerHTML = order.shipper_id ?? "";
  fila.appendChild(elemento);

  elemento = document.createElement("td");
  elemento.innerHTML = order.payment_type ?? "";
  fila.appendChild(elemento);

  elemento = document.createElement("td");
  elemento.innerHTML = order.tax_status_id ?? "";
  fila.appendChild(elemento);

  elemento = document.createElement("td");
  elemento.innerHTML = order.status_id ?? "";
  fila.appendChild(elemento);

  elemento = document.createElement("td");
    elemento.innerHTML =
      `<button class="btn btn-link" onclick="editaPedido(${order.id})"><i class="bi-pencil"></i></button>` +
      `<button style="color:red;" class="btn btn-link"  onclick="borrarPedido(${order.id})"><i class="bi-x-circle"></i></button>`;
      fila.appendChild(elemento);

    elemento = document.createElement("td");
    elemento.innerHTML = 
      `<button style="color:green; "class="btn btn-link" onclick="mostrarPedidos(${order.id} )"><i class="bi bi-grid-fill"></i></button>`;
      fila.appendChild(elemento);
  
  tblBody.appendChild(fila);
}

function editaPedido(idpedido) {
  window.location.href = `editarPedido.html?idpedido=${idpedido}`;
}

function addPedido() {
  window.location.href = "nuevoPedido.html";
}

function borrarPedido(idpedido) {
  muestraMsg(
    "¡Ehh...🖐!",
    `¿🤕Estas seguró de querer borrar  el pedido ${idpedido}?`,
    true,
    "question",
    "Claro!👌",
    "No 🤡"
  );
  document.getElementById("idMdlOK").addEventListener("click", () => {
    
    borrarpedidoAPI(idpedido);
  });
}

function mostrarPedidos(idPedido) {
  window.location.href = "indexPedido.html?idPedido="+idPedido;
}

function mostrarPedidos() {
  window.location.href = "indexPedido.html";
}

function borrarPedidoAPI(idpedido) {
  myModal.hide();
  modalWait.show();
  opciones = {
    method: "DELETE", // Modificamos la BBDD
  };

  fetch(URL + "/" + idpedido, opciones)
    .then((respuesta) => {
      if (respuesta.ok) {
        return respuesta.json();
      } else 
      {
        throw new Error(`Fallo al borrar, el servidor responde con ${respuesta.status}-${respuesta.statusText}`);
      }
        
    })
    .then((respuesta) => {
      modalWait.hide();
      muestraMsg(`¡Pedido ${idpedido} Borrado!`, "¡A tomar por saco!", false, "success");
      document.getElementById('idMdlClose').addEventListener("click", () => {
        location.reload();
        document.getElementById('idMdlClose').removeEventListener("click");
      })
      
    })
    .catch((error) => {
      modalWait.hide();
      muestraMsg(
        "Pedido NO borrado",
        "¿Es posible que este pedido tenga algún cliente? 🤔<br>" + error,
        false,
        "error"
      );
    });
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

function limpiarTabla() {
  let bodyTable = document.getElementById("id_tblPedidos").innerHTML = " ";
}
