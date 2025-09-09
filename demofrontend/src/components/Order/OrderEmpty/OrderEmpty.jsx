import { Link } from "react-router-dom";
import "./OrderEmpty.css";

const OrderEmpty = () => {
  return (
    <div className="order-empty">
      <div className="order-empty-card">
        <h2 className="order-empty-title">No Orders Yet</h2>
        <p className="order-empty-text">
          Looks like you haven’t placed any orders.
        </p>
        <Link to="/products" className="btn-rounded">
          Shop Now
        </Link>
      </div>
    </div>
  );
};

export default OrderEmpty;
