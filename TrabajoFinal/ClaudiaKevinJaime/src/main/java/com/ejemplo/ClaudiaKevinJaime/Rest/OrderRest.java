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

import com.ejemplo.ClaudiaKevinJaime.Entities.Order;
import com.ejemplo.ClaudiaKevinJaime.Models.OrderModel;

@Path("pedido")
public class OrderRest {
	static OrderModel Orders;

	public OrderRest() {

		try {
			Orders = new OrderModel();
		} catch (SQLException e) {
			System.out.println("No puedo abrir la conexión con 'Orders': " + e.getMessage());
		}
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response list(@QueryParam("filter") String filter, @QueryParam("limit") Integer limit,
			@QueryParam("offset") Integer offset) {
		Response respuesta = Response.status(Response.Status.NOT_FOUND).build();

		if (Orders != null) {
			ArrayList<Order> listaOrders = Orders.lista(filter, limit, offset);
			if (listaOrders != null) {
				respuesta = Response.status(Response.Status.OK).entity(listaOrders).build();
			}
		}
		return respuesta;
	}

	@GET
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response read(@PathParam("id") Integer id) {
	Response respuesta = Response.status(Response.Status.NOT_FOUND).entity("ºo").build();

		if (Orders != null) {
			Order pedido = Orders.read(id);
			if(pedido !=null) {
			respuesta = Response.status(Response.Status.OK).entity(pedido).build();
		}
		}
		return respuesta;
	}


	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response add(Order pedido) {
		Integer idpedido;
		Response response;

		try {
			idpedido = Orders.insert(pedido);
			response = Response.status(Response.Status.CREATED).entity(idpedido).build();
		} catch (Exception e) {
			response = Response.status(Response.Status.CONFLICT)
					.entity("ERROR: " + e.getCause() + " " + e.getMessage()).build();
		}
		return response;
	} 
	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response update(Order pedido) {
		Boolean pedidoActualizado;
		Response response;

		try {
			pedidoActualizado = Orders.update(pedido);
			response = Response.status(Response.Status.OK).entity(pedidoActualizado).build();
		} catch (Exception e) {
			response = Response.status(Response.Status.NOT_MODIFIED)
					.entity("ERROR: " + e.getCause() + " " + e.getMessage()).build();
		}
		return response;
	}
	@DELETE
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response delete(@PathParam("id") Integer id) {
		Boolean pedidoActualizado;
		Response response;

		try {
			pedidoActualizado = Orders.delete(id);
			response = Response.status(Response.Status.OK).entity(pedidoActualizado).build();
		} catch (Exception e) {
			response = Response.status(Response.Status.NOT_FOUND)
					.entity("ERROR: " + e.getCause() + " " + e.getMessage()).build();
		}
		return response;
	}
}