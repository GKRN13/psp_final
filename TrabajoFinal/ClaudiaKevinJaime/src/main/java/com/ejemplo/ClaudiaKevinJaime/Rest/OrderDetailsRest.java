package com.ejemplo.ClaudiaKevinJaime.Rest;



import java.sql.SQLException;
import java.util.ArrayList;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.ejemplo.ClaudiaKevinJaime.Entities.OrderDetails;
import com.ejemplo.ClaudiaKevinJaime.Models.OrdersDetailsModel;

@Path("detallesPedidos")
public class OrderDetailsRest {

	static OrdersDetailsModel OrdersDetails;

	public OrderDetailsRest() {
		try {
			OrdersDetails = new OrdersDetailsModel();
		} catch (SQLException e) {
			System.err.println("No puedo abrir la conexión con 'Order_Details' " + e.getMessage());
		}
	}
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response list(@QueryParam("filter") String filter, @QueryParam("limit") Integer limit,
			@QueryParam("offset") Integer offset) {
		Response respuesta = Response.status(Response.Status.NOT_FOUND).build();

		if (OrdersDetails != null) {
			ArrayList<OrderDetails> listarDetallePedido = OrdersDetails.lista(filter, limit, offset);
			if (listarDetallePedido != null)
				respuesta = Response.status(Response.Status.OK).entity(listarDetallePedido).build();
		}
		return respuesta;
	}

	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response read(@PathParam("id") Integer id) {
		Response respuesta = Response.status(Response.Status.NOT_FOUND).entity("No encontrado").build();

		if (OrdersDetails != null) {
			OrderDetails detallePedidos = OrdersDetails.read(id);
			if (detallePedidos != null)
				respuesta = Response.status(Response.Status.OK).entity(detallePedidos).build();
		}
		return respuesta;
	}
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response add(OrderDetails detallePedido) {
		Integer idDetallePedido;
		Response respuesta;
		try {
			idDetallePedido = OrdersDetails.insert(detallePedido);
			respuesta = Response.status(Response.Status.CREATED).entity(idDetallePedido).build();
		} catch (Exception e) {
			respuesta = Response.status(Response.Status.CONFLICT)
					.encoding("ERROR: " + e.getCause() + " " + e.getMessage()).build();
		}
		return respuesta;
	}

	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response update(OrderDetails detallePedido) {
		Boolean detallePedidoActualizado;
		Response respuesta;

		try {
			detallePedidoActualizado = OrdersDetails.update(detallePedido);
			respuesta = Response.status(Response.Status.OK).entity(detallePedidoActualizado).build();
		} catch (Exception e) {
			respuesta = Response.status(Response.Status.NOT_MODIFIED)
					.encoding("ERROR: " + e.getCause() + " " + e.getMessage()).build();
		}

		return respuesta;
	}

	@DELETE
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response delete(@PathParam("id") Integer id) {
		Boolean detallePedidoActualizado;
		Response respuesta;

		try {
			detallePedidoActualizado = OrdersDetails.delete(id);
			respuesta = Response.status(Response.Status.OK).entity(detallePedidoActualizado).build();
		} catch (Exception e) {
			respuesta = Response.status(Response.Status.NOT_FOUND)
					.encoding("ERROR: " + e.getCause() + " " + e.getMessage()).build();
		}

		return respuesta;
	}

}