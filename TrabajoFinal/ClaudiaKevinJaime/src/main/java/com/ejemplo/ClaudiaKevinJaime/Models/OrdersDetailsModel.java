package com.ejemplo.ClaudiaKevinJaime.Models;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import javax.sql.DataSource;

import com.ejemplo.ClaudiaKevinJaime.DBFactory.DBFactory;
import com.ejemplo.ClaudiaKevinJaime.Entities.OrderDetails;
import com.ejemplo.ClaudiaKevinJaime.Entities.Product;

public class OrdersDetailsModel {
    
    Connection conexion = null;

    public  OrdersDetailsModel() throws SQLException {
	DataSource ds = DBFactory.getMySQLDataSource();
	conexion = ds.getConnection();
    }

    public OrderDetails read(Integer id) {
    OrderDetails detalleOrden = null;
	Statement sentencia = null;
	ArrayList<Product> producto = null;

	String sql = "SELECT "+ "`id`, "+ "`order_id`, "
			+ "`product_id`, "+ "`quantity`, "
			+ "`unit_price`, "+ "`discount`, "
			+ "`status_id`, "+ "`date_allocated`, "
			+ "`purchase_order_id`, "+ "`inventory_id` "
			+ "FROM order_details "+ "WHERE id=" + id;

	try {
	    sentencia = conexion.createStatement();
	    ResultSet rs = sentencia.executeQuery(sql);
	    while (rs.next()) {
		detalleOrden = new OrderDetails(
				rs.getInt("id"),
				rs.getInt("order_id"),
				rs.getInt("product_id"),
				rs.getBigDecimal("quantity"),
				rs.getBigDecimal("unit_price"),
				rs.getDouble("discount"),
				rs.getInt("status_id"),
				rs.getDate("date_allocated"),
				rs.getInt("purchase_order_id"),
				rs.getInt("inventory_id"));
		ProductModel detalleproducto = new ProductModel();
	    producto = detalleproducto.lista("id = "+rs.getInt("product_id"), null, null);
	    detalleOrden.setProducto(producto);
	    };
	    
	} catch (SQLException e) {
	    System.err.println("Error en read de Detalle de Orden: " + e.getMessage());
	    return null;
	}

	return detalleOrden;
    }

    /**
     * 
     * @param cliente
     * @return Devuelve el id del registro recien insertado
     */
    public Integer insert(OrderDetails detalleOrden) throws  SQLException {
	Integer id = null;
	PreparedStatement ps = null;
	String sql = "INSERT INTO order_details ("+ "`order_id`, "
	+ "`product_id`, "+ "`quantity`, "+ "`unit_price`, "
	+ "`discount`, "+ "`status_id`, "+ "`date_allocated`, "
	+ "`purchase_order_id`, "+ "`inventory_id`) "+ "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

	try {
	    ps = conexion.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
	    ps.setInt(1, detalleOrden.getOrder_id());
		ps.setInt(2, detalleOrden.getProduct_id());
		ps.setBigDecimal(3,detalleOrden.getQuantity());
		ps.setBigDecimal(4,detalleOrden.getUnit_price());
		ps.setDouble(5,detalleOrden.getDiscount());
		ps.setInt(6,detalleOrden.getStatus_id());
		ps.setDate(7, detalleOrden.getDate_allocated());
		ps.setInt(8,detalleOrden.getPurchase_order_id());
		ps.setInt(9, detalleOrden.getInventory_id());
	    if (ps.executeUpdate() > 0) {
		ResultSet rs = ps.getGeneratedKeys();
		if (rs.next()) {
		    id = rs.getInt(1);
		} }
	} catch (SQLException e) {
	    System.err.println("Error al insertar Detalle Orden: " + e.getMessage());
	    throw e;
	}
	return id;
    }
    public Boolean delete(Integer iddetalleOrden) throws SQLException {
	Boolean resultado = false;
	PreparedStatement ps = null;
	String sql = "DELETE FROM order_details where id = ?";
	try {
	    ps = conexion.prepareStatement(sql);
	    ps.setInt(1, iddetalleOrden);
	    resultado = (ps.executeUpdate() > 0);
	} catch (SQLException e) {
	    System.err.println("Error al borrar Detalle Orden: " + e.getMessage());
	    throw e;
	}
	return resultado;
    }

    public Boolean update(OrderDetails detalleOrden) throws SQLException  {
	Boolean resultado = false;
	PreparedStatement ps = null;
	String sql = "UPDATE customers order_details SET "
			+ "order_id = ?, "
			+ "product_id = ?, "
			+ "quantity = ?, "
			+ "unit_price = ?, "
			+ "discount = ?, "
			+ "status_id = ?, "
			+ "date_allocated = ?, "
			+ "purchase_order_id = ?, "
			+ "inventory_id = ?  "
			+ "WHERE id = ?";
	try {
	    ps = conexion.prepareStatement(sql);
	    ps.setInt(1, detalleOrden.getOrder_id());
		ps.setInt(2, detalleOrden.getProduct_id());
		ps.setBigDecimal(3, detalleOrden.getQuantity());
		ps.setBigDecimal(4, detalleOrden.getUnit_price());
		ps.setDouble(5, detalleOrden.getDiscount());
		ps.setInt(6, detalleOrden.getStatus_id());
		ps.setDate(7,detalleOrden.getDate_allocated());
		ps.setInt(8,detalleOrden.getPurchase_order_id());
		ps.setInt(9,detalleOrden.getInventory_id());
		ps.setInt(10, detalleOrden.getId());
	    resultado = (ps.executeUpdate() > 0);

	} catch (SQLException e) {
	    System.err.println("Error al actualizar Detalle Orden: " + e.getMessage());
	    throw e;
	}
	return resultado;
    }

    public ArrayList<OrderDetails> lista(String filtro, Integer limite, Integer offset)

    {
	ArrayList<OrderDetails> detalleOrden = new ArrayList<OrderDetails>();
	Statement sentencia = null;

	String sql = "SELECT `id`, "
			+ "`id`, "
			+ "`order_id`,\r\n"
			+ "`product_id`, "
			+ "`quantity`, "
			+ "`unit_price`, "
			+ "`discount`, "
			+ "`status_id`, "
			+ "`date_allocated`, "
			+ "`purchase_order_id`, "
			+ "`inventory_id` "
			+ "FROM order_details ";

	try {
	    if (filtro != null)
		sql += " WHERE " + filtro;
	    if (limite != null)
		sql += " LIMIT " + limite;
	    if (offset != null)
		sql += " OFFSET " + offset;
	    sentencia = conexion.createStatement();
	    ResultSet rs = sentencia.executeQuery(sql);
	    while (rs.next()) { // Si todavía hay una Orden pedido e lo añado al array
		detalleOrden.add(new OrderDetails(
				rs.getInt("id"),
				rs.getInt("order_id"),
				rs.getInt("product_id"),
				rs.getBigDecimal("quantity"),
				rs.getBigDecimal("unit_price"),
				rs.getDouble("discount"),
				rs.getInt("status_id"),
				rs.getDate("date_allocated"),
				rs.getInt("purchase_order_id"),
				rs.getInt("inventory_id")));
	    };
	} catch (SQLException e) {
	    System.err.println("Error en read de Detalle Orden: " + e.getMessage());
	    return null;
	}

	return detalleOrden;
    }

}
