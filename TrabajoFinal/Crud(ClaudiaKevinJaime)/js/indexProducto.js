const URL = "http://localhost:8080/ClaudiaKevinJaime/webapi/productos";
const URLProducto = `http://localhost:8080/ClaudiaKevinJaime/webapi/productos/`


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
    .then((producto) => {
      rellenarToDatosProductos(producto);

      // Todo ha ido bien hast aquí, habilito el boton de añadir Producto
      document.getElementById("idAddProducto").addEventListener("click", addProducto);
      
    })
    .catch((error) => {
      muestraMsg( "¡No he podido recuperar el listado de Productos!<br>" + error, false, "error");
    });
}

function rellenarToDatosProductos(productos) {
  let tblBody = document.getElementById("id_tblProductos");
  let select = document.getElementById("idSeleccionado");

  for (const producto of productos) {
    let fila = document.createElement("tr");
    let elemento = document.createElement("td");
    elemento.innerHTML = producto.id;
    fila.appendChild(elemento);
    elemento = document.createElement("td");
    elemento.innerHTML = producto.product_name;
    fila.appendChild(elemento);
    elemento = document.createElement("td");
    elemento.innerHTML = producto.category;
    fila.appendChild(elemento);
    elemento = document.createElement("td");
    elemento.innerHTML = producto.list_price;
    fila.appendChild(elemento);
    elemento = document.createElement("td");
    elemento.innerHTML = producto.quantity_per_unit ?? "";
    fila.appendChild(elemento);
    elemento = document.createElement("td");
    elemento.innerHTML = producto.discontinued ?? "";
    fila.appendChild(elemento);
    elemento = document.createElement("td");
    elemento.innerHTML =
      `<button style="color:gray;"class="btn btn-link" onclick="editaProducto(${producto.id})"><i class="bi-pencil"></i></button>` +
      `<button style="color:red;" class="btn btn-link"  onclick="borrarProducto(${producto.id})"><i class="bi-x-circle"></i></button>`+
      `<button style="color:purple; "class="btn btn-link" onclick="mostrarProducto(${producto.id})"><i class="bi bi-eye"></i></button>`;
      
      fila.appendChild(elemento);

    elemento = document.createElement("td");
    

    tblBody.appendChild(fila);
  }

  select.addEventListener("change", buscarProducto);
}

function buscarProducto(e) {
  const select = document.getElementById("idSeleccionado");
  const idProductoSeleccionado = select.value;
  const peticionHTTP2 = fetch(URLProducto+idProductoSeleccionado);
  
  peticionHTTP2
  .then((respuesta) => {
    if (respuesta.ok) {
      return respuesta.json();
    } else throw new Error("No he podido leer la petición.");
  })
  .then((product) => {
    rellenarDatosProducto(product);
  })
  .catch((error) => {
    muestraMsg("¡Qué haces buscando un producto que no existe!<br>" + error, false, "error");
  });
}

function rellenarDatosProducto(product){
  limpiarTabla();
  let tblBody = document.getElementById("id_tblProductos");

  let fila = document.createElement("tr");
  let elemento = document.createElement("td");
  elemento.innerHTML = product.id;
  fila.appendChild(elemento);

  elemento = document.createElement("td");
  elemento.innerHTML = product.product_name;
  fila.appendChild(elemento);

  elemento = document.createElement("td");
  elemento.innerHTML = product.category;
  fila.appendChild(elemento);

  elemento = document.createElement("td");
  elemento.innerHTML = product.list_price;
  fila.appendChild(elemento);

  elemento = document.createElement("td");
  elemento.innerHTML = product.quantity_per_unit ?? "";
  fila.appendChild(elemento);

  elemento = document.createElement("td");
  elemento.innerHTML = product.discontinued ?? "";
  fila.appendChild(elemento);

  elemento = document.createElement("td");
    elemento.innerHTML =
      `<button class="btn btn-link" onclick="editaProducto(${product.id})"><i class="bi-pencil"></i></button>` +
      `<button style="color:red;" class="btn btn-link"  onclick="borrarProducto(${product.id})"><i class="bi-x-circle"></i></button>`;
      fila.appendChild(elemento);

    elemento = document.createElement("td");
    elemento.innerHTML = 
      `<button style="color:green; "class="btn btn-link" onclick="mostrarProductos(${product.id} )"><i class="bi bi-grid-fill"></i></button>`;
      fila.appendChild(elemento);
  
  tblBody.appendChild(fila);
}

function editaProducto(idproducto) {
  window.location.href = `editarProducto.html?idproducto=${idproducto}`;
}

function addProducto() {
  window.location.href = "nuevoProducto.html";
}

function borrarProducto(idproducto) {
  muestraMsg(
    "¡Ehh...🖐!",
    `¿🤕Estas seguró de querer borrar  el producto ${idproducto}?`,
    true,
    "question",
    "Claro!👌",
    "No 🤡"
  );
  document.getElementById("idMdlOK").addEventListener("click", () => {
    
    borrarClienteAPI(idproducto);
  });
}

function mostrarProductos(idProducto) {
  window.location.href = "indexProducto.html?idProducto="+idProducto;
}

function mostrarProductos() {
  window.location.href = "indexProducto.html";
}

function borrarProductoAPI(idproducto) {
  myModal.hide();
  modalWait.show();
  opciones = {
    method: "DELETE", // Modificamos la BBDD
  };

  fetch(URL + "/" + idproducto, opciones)
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
      muestraMsg(`¡Producto ${idproducto} Borrado!`, "¡A tomar por saco!", false, "success");
      document.getElementById('idMdlClose').addEventListener("click", () => {
        location.reload();
        document.getElementById('idMdlClose').removeEventListener("click");
      })
      
    })
    .catch((error) => {
      modalWait.hide();
      muestraMsg(
        "Producto NO borrado",
        "¿Es posible que este producto tenga alguna orden? 🤔<br>" + error,
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
  let bodyTable = document.getElementById("id_tblProductos").innerHTML = " ";
}