package com.ejemplo.ClaudiaKevinJaime.Models;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import javax.sql.DataSource;

import com.ejemplo.ClaudiaKevinJaime.DBFactory.DBFactory;
import com.ejemplo.ClaudiaKevinJaime.Entities.Order;
import com.ejemplo.ClaudiaKevinJaime.Entities.OrderDetails;

public class OrderModel {
	Connection conexion = null;
	
	public OrderModel() throws SQLException {
		DataSource ds = DBFactory.getMySQLDataSource(); 
		conexion = ds.getConnection(); 
	}
public Order read(Integer id) {
Order pedido = null;
Statement statement = null;
ArrayList<OrderDetails> listadetallespedido = null;
String sql = "SELECT `id`, "
				+ "`employee_id`, "
				+ "`customer_id`, "
				+ "`order_date`, "
				+ "`shipped_date`, "
				+ "`shipper_id`, "
				+ "`ship_name`, "
				+ "`ship_address`, "
				+ "`ship_city`, "
				+ "`ship_state_province`, "
				+ "`ship_zip_postal_code`, "
				+ "`ship_country_region`, "
				+ "`shipping_fee`, "
				+ "`taxes`, "
				+ "`payment_type`, "
				+ "`paid_date`, "
				+ "`notes`, "
				+ "`tax_rate`, "
				+ "`tax_status_id`, "
				+ "`status_id`"
				+ " FROM orders WHERE id=" + id;
try {
	statement = conexion.createStatement();
	ResultSet ResultSet = statement.executeQuery(sql);
	while (ResultSet.next()) {
	pedido = new Order(
	ResultSet.getInt("id"),
	ResultSet.getInt("employee_id"),
	ResultSet.getInt("customer_id"),
	ResultSet.getDate("order_date"),
	ResultSet.getDate("shipped_date"),
	ResultSet.getInt("shipper_id"),
	ResultSet.getString("ship_name"),
	ResultSet.getString("ship_address"),
	ResultSet.getString("ship_city"),
	ResultSet.getString("ship_state_province"),
	ResultSet.getString("ship_zip_postal_code"),
	ResultSet.getString("ship_country_region"),
	ResultSet.getBigDecimal("shipping_fee"),
	ResultSet.getBigDecimal("taxes"),
	ResultSet.getString("payment_type"),
	ResultSet.getDate("paid_date"),
	ResultSet.getString("notes"),
	ResultSet.getDouble("tax_rate"),
	ResultSet.getBoolean("tax_status_id"),
	ResultSet.getBoolean("status_id")
		);
	OrdersDetailsModel detallespedido = new OrdersDetailsModel();
    listadetallespedido = detallespedido.lista("order_id = "+ResultSet.getInt("id"), null, null);
    pedido.setLista(listadetallespedido);
};
} catch (SQLException e) {
	System.err.println("Error en read order " + e.getMessage());
	return null;
}
return pedido;
}
public Integer insert(Order pedido) throws SQLException {
Integer id = null;
PreparedStatement ps = null;
String sql = "INSERT INTO orders ("+ "`employee_id`, "
+ "`customer_id`, "+ "`order_date`, "+ "`shipped_date`, "
+ "`shipper_id`, "+ "`ship_name`, "+ "`ship_address`, "
+ "`ship_city`, "+ "`ship_state_province`, "+ "`ship_zip_postal_code`, "
+ "`ship_country_region`, "+ "`shipping_fee`, "+ "`taxes`, "
+ "`payment_type`, "+ "`paid_date`, "+ "`notes`, "
+ "`tax_rate`, "+ "`tax_status_id`, "+ "`status_id`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
try {
	ps = conexion.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
	ps.setInt(1, pedido.getEmployee_id());
	ps.setInt(2, pedido.getCustomer_id());
	ps.setDate(3, pedido.getOrder_date());
	ps.setDate(4, pedido.getShipped_date());
	ps.setInt(5, pedido.getShipper_id());
	ps.setString(6, pedido.getShip_name());
	ps.setDate(7, pedido.getShipped_date());
	ps.setString(8, pedido.getShip_city());
	ps.setString(9, pedido.getShip_state_province());
	ps.setString(10, pedido.getShip_zip_postal_code());
	ps.setString(11, pedido.getShip_country_region());
	ps.setBigDecimal(12, pedido.getShipping_fee());
	ps.setBigDecimal(13, pedido.getTaxes());
	ps.setString(14, pedido.getPayment_type());
	ps.setDate(15, pedido.getPaid_date());
	ps.setString(16, pedido.getNotes());
	ps.setDouble(17, pedido.getTax_rate());
	ps.setBoolean(18, pedido.getTax_status_id());
	ps.setBoolean(19, pedido.getStatus_id());	
if (ps.executeUpdate() > 0) {
	ResultSet rs = ps.getGeneratedKeys();
	if (rs.next()) 
    id = rs.getInt(1);
	}
} catch (SQLException e) {
System.err.println("Fallo al insertar el pedido " + e.getMessage());
throw e;
}
return id;
}
public Boolean update(Order pedido) throws SQLException  {
Boolean resultado = false;
PreparedStatement ps = null;
String sql = "UPDATE orders set "+"employee_id = ?, "
			+"customer_id = ?, "+"order_date = ?, "
			+"shipped_date = ?, "+"shipper_id = ?, "
			+"ship_name = ?, "+"ship_address = ?, "
			+"ship_city = ?, "+"ship_state_province = ?, "
			+"ship_zip_postal_code = ?, "+"ship_country_region = ?, "
			+"shipping_fee = ?, "+"taxes = ?, "
			+"payment_type = ?, "+"paid_date = ?, "
			+"notes = ?, "+"tax_rate = ?, "
			+"tax_status_id = ?, "+"status_id = ? " 
			+"WHERE id=?";
try {
    ps = conexion.prepareStatement(sql);
    ps.setInt(1, pedido.getEmployee_id());
	ps.setInt(2, pedido.getCustomer_id());
	ps.setDate(3, pedido.getOrder_date());
	ps.setDate(4, pedido.getShipped_date());
	ps.setInt(5, pedido.getShipper_id());
	ps.setString(6, pedido.getShip_name());
	ps.setDate(7, pedido.getShipped_date());
	ps.setString(8, pedido.getShip_city());
	ps.setString(9, pedido.getShip_state_province());
	ps.setString(10, pedido.getShip_zip_postal_code());
	ps.setString(11, pedido.getShip_country_region());
	ps.setBigDecimal(12, pedido.getShipping_fee());
	ps.setBigDecimal(13, pedido.getTaxes());
	ps.setString(14, pedido.getPayment_type());
	ps.setDate(15, pedido.getPaid_date());
	ps.setString(16, pedido.getNotes());
	ps.setDouble(17, pedido.getTax_rate());
	ps.setBoolean(18, pedido.getTax_status_id());
	ps.setBoolean(19, pedido.getStatus_id());
	ps.setInt(20, pedido.getId());
    resultado = (ps.executeUpdate() > 0);
} catch (SQLException e) {
    System.err.println("Error al actualizar el pedido: " + e.getMessage());
    throw e;
}
return resultado;
}
public Boolean delete(Integer idpedido) throws SQLException {
	Boolean resultado = false;
	PreparedStatement ps = null;
	String sql = "DELETE FROM orders where id = ?";
	try {
	 ps = conexion.prepareStatement(sql);
     ps.setInt(1, idpedido);
      resultado = (ps.executeUpdate() > 0); 
	} catch (SQLException e) {
	System.err.println("Error al borrar pedido: " + e.getMessage());
	throw e;
	}
	return resultado;
}
public ArrayList<Order> lista(String filtro, Integer limite, Integer offset){
ArrayList<Order> pedido = new ArrayList<Order>();
Statement statement = null;
String sql = "SELECT `id`, "+ "`employee_id`, "+ "`customer_id`, "
+ "`order_date`, "+ "`shipped_date`, "+ "`shipper_id`, "+ "`ship_name`, "
+ "`ship_address`, "+ "`ship_city`, "+ "`ship_state_province`, "+ "`ship_zip_postal_code`, "
+ "`ship_country_region`, "+ "`shipping_fee`, "+ "`taxes`, "
+ "`payment_type`, "+ "`paid_date`, "+ "`notes`, "+ "`tax_rate`, "
+ "`tax_status_id`, "+ "`status_id`"+ " FROM orders ";
try {
if(filtro != null)
sql += "WHERE " + filtro;
if(limite != null)
sql += " LIMIT " + limite;
if(offset != null)
sql += " OFFSET " + offset;
	
statement = conexion.createStatement();
ResultSet rs = statement.executeQuery(sql);
while(rs.next()) {
pedido.add(new Order(
	rs.getInt("id"),
	rs.getInt("employee_id"),
	rs.getInt("customer_id"),
	rs.getDate("order_date"),
	rs.getDate("shipped_date"),
	rs.getInt("shipper_id"),
	rs.getString("ship_name"),
	rs.getString("ship_address"),
	rs.getString("ship_city"),
	rs.getString("ship_state_province"),
	rs.getString("ship_zip_postal_code"),
	rs.getString("ship_country_region"),
	rs.getBigDecimal("shipping_fee"),
	rs.getBigDecimal("taxes"),
	rs.getString("payment_type"),
	rs.getDate("paid_date"),
	rs.getString("notes"),
	rs.getDouble("tax_rate"),
	rs.getBoolean("tax_status_id"),
	rs.getBoolean("status_id")));
}
}catch(SQLException e) {
System.err.println("Error al listar el  pedido " + e.getMessage());
return null;
}
return pedido;
}
}