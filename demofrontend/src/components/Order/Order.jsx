import React, { useState } from "react";
import "./Order.css";
import OrderDetail  from "./OrderDetail/OrderDetail";
import { useGlobalContext } from "../GlobalContext/GlobalContext";

const Order = () => {
  const { auth, cart } = useGlobalContext();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
    payment: "cod",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Đơn hàng đã được tạo!");
    console.log(formData, cartItems, total);
  };

  return (
    <div className="order-container">
      {/* Main Content */}
      <div className="order-main">
        {/* Form nhập thông tin */}
        <form onSubmit={handleSubmit} className="order-form">
          <h2>Thông tin giao hàng</h2>
          <div className="user-info">
            <div className="info-item">
              <label>Họ tên:</label>
              <span>{auth.state.user.name}</span>
            </div>
            <div className="info-item">
              <label>Số điện thoại:</label>
              <span>{auth.state.user.phone}</span>
            </div>
            <div className="info-item">
              <label>Địa chỉ:</label>
              <span>{auth.state.user.address}</span>
            </div>
          </div>

          <h3>Phương thức thanh toán</h3>
          <select
            name="payment"
            value={formData.payment}
            onChange={handleChange}
          >
            <option value="cod">Thanh toán khi nhận hàng (COD)</option>
            <option value="card">Thanh toán trực tuyến</option>
            <option value="wallet">Ví điện tử</option>
          </select>

          <button type="submit" className="submit-btn">
            Xác nhận đặt hàng
          </button>
        </form>

        {/* Tóm tắt đơn hàng */}
        <div className="order-summary">
          <h2>Đơn hàng của bạn</h2>
          {(cart.state.items.length > 0 &&
            cart.state.items.map((item) => {
              return (
                <OrderDetail
                  key={item.id}
                  item={item}
                ></OrderDetail>
              );
            })) || <p>No products available</p>}
          <h2>Shipping</h2>
          <div className="summary-item">

          </div>
          <div className="summary-total">
            <span>Tổng cộng:</span>
            <span>${cart.state.carts.total_price}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Order;
