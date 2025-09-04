import CartDetails from "./CartDetails/CartDetails";
import CartSummary from "./CartSummary/CartSummary";
import EmptyState from "./EmptyState/EmptyState";
import { useGlobalContext } from "@/components/GlobalContext/GlobalContext";

import "./Cart.css";

const Cart = () => {
  let { cart } = useGlobalContext();
  return (
    <div className="main-order-container">
      <div className="view-order">
        <div className="order-title">
          <h2>Cart</h2>
          <h2>{cart.state.cartQuantity} Items</h2>
        </div>
        <div className="order-container">
          {(cart.state.items.length > 0 &&
            cart.state.items.map((productInCart) => {
              return (
                <CartDetails
                  key={productInCart.id}
                  product={productInCart}
                ></CartDetails>
              );
            })) || <EmptyState></EmptyState>}
        </div>
      </div>
      <div className="order-summary">
        <h2>Cart Summary</h2>
        <CartSummary></CartSummary>
      </div>
    </div>
  );
};
export default Cart;
