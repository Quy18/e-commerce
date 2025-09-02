import OrderDetails from "./OrderDetails/OrderDetails";
import OrderSummary from "./OrderSummary/OrderSummary";
import EmptyState from "./EmptyState/EmptyState";
import { useGlobalContext } from "@/components/GlobalContext/GlobalContext";

import "./Order.css";

const Order = () => {
  let { cart } = useGlobalContext();
  return (
    <div className="main-order-container">
      <div className="view-order">
        <div className="order-title">
          <h2>Order</h2>
          <h2>{cart.state.cartQuantity} Items</h2>
        </div>
        <div className="order-container">
          {(cart.state.items.length > 0 &&
            cart.state.items.map((productInCart) => {
              return (
                <OrderDetails
                  key={productInCart.id}
                  product={productInCart}
                ></OrderDetails>
              );
            })) || <EmptyState></EmptyState>}
        </div>
      </div>
      <div className="order-summary">
        <h2>Order Summary</h2>
        {/* <OrderSummary></OrderSummary> */}
      </div>
    </div>
  );
};
export default Order;
