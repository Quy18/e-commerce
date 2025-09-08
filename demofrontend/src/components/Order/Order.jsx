import React, { useState } from "react";
import "./Order.css";
import OrderDetail from "./OrderDetail/OrderDetail";
import { useGlobalContext } from "../GlobalContext/GlobalContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Order = () => {
  const { auth, cart, order } = useGlobalContext();
  const navigate = useNavigate();
  const [deliveryType, setDeliveryType] = useState("Standard");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    payment: "cod",
    totalPayment: 0,
  });
  const setDelivery = (type) => {
    setDeliveryType(type);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    // ngăn refresh khi submit
    e.preventDefault();
    if (!cart.state.carts?.id) {
      toast.error("There aren't products in the cart.");
      return;
    }
    const result = await order.createOrder(cart.state.carts.id, deliveryType, formData.totalPayment);
    if (result && result.success) {
      await cart.getCarts();
      navigate("/order/success");
    }
  };

  useEffect(() => {
    const calculateTotalPayment = () => {
      if (cart.state.items.length > 0) {
        const promo = 1; // ví dụ 10% = 0.9
        const deliveryFee = deliveryType === "Standard" ? 5.0 : 10.0;
        const subtotal = Number(cart.state.carts.total_price) + deliveryFee;

        return Number((subtotal * promo).toFixed(2));;
      } else {
        return 0;
      }
    };

    setFormData(prev => ({
      ...prev,
      totalPayment: calculateTotalPayment()
    }));
  }, [deliveryType, cart.state.items, cart.state.carts.total_price]);



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
            Buy Now
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
          <select
            className="select-dropdown"
            onChange={(item) => {
              setDelivery(item.target.value);
            }}
          >
            <option value="Standard" className="select">
              Standard
            </option>
            <option value="Express" className="select">
              Express
            </option>
          </select>
          <div className="promo-code">
            <h2>Promo Code</h2>
            <div className="enter-promo">
              <input className="select-dropdown" type="text" />
              <button
                className="flat-button apply-promo"
                disabled={cart.state.cartQuantity > 0 ? false : true}
              >
                Apply
              </button>
            </div>
          </div>
          <div className="summary-total">
            <span>Tổng cộng:</span>
            <span>${" "}
              {cart.state.items.length > 0
                ? formData.totalPayment
                : 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Order;
