import React from "react";
import "./OrderSuccess.css";

const OrderSuccess = ({ orderId }) => {
  return (
    <div className="order-success-container">
      <div className="order-success-card">
        <h2>🎉 Đặt hàng thành công!</h2>
        <p>Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi.</p>
        <p>
          Mã đơn hàng của bạn: <span className="order-id">#{orderId}</span>
        </p>
        <p className="order-status">Trạng thái: <b>Đang chờ xử lý</b></p>

        <a href={`/delivery`} className="view-order-btn">
          Xem chi tiết đơn hàng
        </a>
      </div>
    </div>
  );
};

export default OrderSuccess;