import "./CartSummary.css";
import { useGlobalContext } from "@/components/GlobalContext/GlobalContext";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CartSummary = () => {
  const { store, modal, auth, cart } = useGlobalContext();
  const [deliveryType, setDeliveryType] = useState("Standard");
  const navigate = useNavigate();
  const setDelivery = (type) => {
    setDeliveryType(type);
  };
  const checkOut = () => {
    navigate("/order");
  };
  return (
    <div className="is-order-summary">
      <div className="sub-container">
        <div className="contains-order">
          <div className="total-cost">
            <h4>Total Items ({cart.state.cartQuantity})</h4>
            <h4>${cart.state.carts.total_price}</h4>
          </div>
          <div className="shipping">
            <h4>Shipping</h4>
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
          </div>
          <div className="promo-code">
            <h4>Promo Code</h4>
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
          <div className="final-cost">
            <h4>Total Cost</h4>
            <h4>
              ${" "}
              {cart.state.items.length > 0
                ? (Number(cart.state.carts.total_price) + (deliveryType == "Standard" ? 5.00 : 10.00)).toFixed(2)
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
