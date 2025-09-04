import "./CartSummary.css";
import { useGlobalContext } from "@/components/GlobalContext/GlobalContext";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CartSummary = () => {
  const { store, modal, auth, cart } = useGlobalContext();
  const navigate = useNavigate();
  const checkOut = () => {
    navigate("/order");
  };
  return (
    <div className="is-order-summary">
      <div className="sub-container">
        <div className="contains-order">
          <div className="final-cost">
            <h4>Total Cost</h4>
            <h4>
              ${" "}
              {cart.state.items.length > 0
                ? cart.state.carts.total_price
                : 0}
            </h4>
          </div>
          <div className="final-checkout">
            <button
              className="flat-button checkout"
              onClick={() => {
                checkOut();
              }}
              disabled={cart.state.cartQuantity > 0 ? false : true}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartSummary;
