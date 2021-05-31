package com.ejemplo.ClaudiaKevinJaime;

import java.sql.SQLException;
import java.util.ArrayList;

import com.ejemplo.ClaudiaKevinJaime.Entities.OrderDetails;
import com.ejemplo.ClaudiaKevinJaime.Models.OrdersDetailsModel;

public class APPOrderDetails {

	public static void main(String[] args) {

		try {

			OrderDetails DetallesPedidos;
			OrdersDetailsModel MisDetallesDePedido = new OrdersDetailsModel();

			System.out.println("Conexion a la BBDD con éxito");

			DetallesPedidos = MisDetallesDePedido.read(45);
			if (DetallesPedidos != null)
				System.out.println(DetallesPedidos.toString());

			Integer id = MisDetallesDePedido.insert(DetallesPedidos);
			DetallesPedidos = MisDetallesDePedido.read(id);
			DetallesPedidos.setDiscount(100.3);

			if (MisDetallesDePedido.update(DetallesPedidos)) {
				System.out.println("Pedido actualizado correctamente, veamos si es verdad: ");
				DetallesPedidos = MisDetallesDePedido.read(id);
				System.out.println(DetallesPedidos.toString());
			} else
				System.err.println("No he podido leer el pedido");

			boolean idpedido = MisDetallesDePedido.delete(95);
			System.out.println("Acabo de borrar un pedido");

			System.out.println();
			System.out.println();

			System.out.println("Ahora vamos a leer el cliente");

			ArrayList<OrderDetails> detallePedido = MisDetallesDePedido.lista("id>40", 20, 9);
			listaDetallesPedidos(detallePedido);

		} catch (SQLException e) {
			System.err.println("No se ha podido conectar a la BBDD " + e.getMessage());
			System.exit(1);
		}

	}

	static void listaDetallesPedidos(ArrayList<OrderDetails> detallePedido) {
		if (detallePedido == null) {
			System.out.println("No hay elementos en la lista");
			return;
		}

		for (OrderDetails detallesPedidos : detallePedido) {
			System.out.println(detallesPedidos.toString());
		}
	}

}