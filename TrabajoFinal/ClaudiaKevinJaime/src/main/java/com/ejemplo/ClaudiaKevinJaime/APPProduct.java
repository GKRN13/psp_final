package com.ejemplo.ClaudiaKevinJaime;

import java.sql.SQLException;
import java.util.ArrayList;

import com.ejemplo.ClaudiaKevinJaime.Entities.Product;
import com.ejemplo.ClaudiaKevinJaime.Models.ProductModel;

public class APPProduct {

	public static void main(String[] args) {

		try {

			Product producto;
			ProductModel MisProductos = new ProductModel();

			System.out.println("Conexion a la BBDD con éxito");

			producto = MisProductos.read(1);
			if (producto != null)
				System.out.println(producto.toString());

			Integer id = MisProductos.insert(producto);
			System.out.println("Acabo de insertar el pedido: " + id);

			producto = MisProductos.read(id);
			producto.setCategory("hola");

			if (MisProductos.update(producto)) {
				System.out.println("Pedido actualizado correctamente, veamos si es verdad: ");
				producto = MisProductos.read(id);
				System.out.println(producto.toString());
			} else
				System.err.println("No he podido leer el pedido");

			boolean idpedido = MisProductos.delete(100);
			System.out.println("Acabo de borrar un pedido");

			System.out.println();
			System.out.println();

			System.out.println("Ahora vamos a leer el cliente");

			ArrayList<Product> productos = MisProductos.lista("id>40", 20, 9);
			listaProductos(productos);

		} catch (SQLException e) {
			System.err.println("No se ha podido conectar a la BBDD " + e.getMessage());
			System.exit(1);
		}
	}

	static void listaProductos(ArrayList<Product> productos) {
		if (productos == null) {
			System.out.println("No hay elementos en la lista");
			return;
		}

		for (Product producto : productos) {
			System.out.println(producto.toString());
		}
	}

}
