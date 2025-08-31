import "./OrderDetails.css";
import headphones_pink from "@/assets/images/airpods_max_pink.jpg";
import { useGlobalContext } from "@/components/GlobalContext/GlobalContext";
import { useEffect, useState } from "react";

const OrderDetails = ({ product }) => {
  const {cart, store} = useGlobalContext();
  const [ productDetail, setProductDetail] = useState(null);
  console.log(cart);
  useEffect(() => {
    const fetchProduct = async () => {
      const data = await cart.getProductById(product.product_id);
      setProductDetail(data);
    };
    fetchProduct();
  }, [product.id, cart]);

  if (!productDetail) return <p className="loading">Loading...</p>;

  return (
    <div className="order-details">
      <div className="order-detail">
        <div className="left-side">
          <img src={headphones_pink} alt="" />
        </div>
        <div className="right-side">
          <h3>{productDetail.name}</h3>
          <p>{productDetail.description}</p>
        </div>
      </div>
      <div className="order-price">
        <h3>${product.price}</h3>
      </div>
      <div className="quantity">
        <p>Quantity</p>
        <div className="increase-quantity">
          <button
            onClick={() => {
              store.reduceQuantity(product.id);
            }}
          >
            -
          </button>
          <p>{product.quantity}</p>
          <button
            onClick={() => {
              store.addQuantity(product.id);
            }}
          >
            +
          </button>
        </div>
      </div>
      <div className="remove">
        <button
          onClick={() => {
            store.removeFromCart(product?.id);
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
};
export default OrderDetails;
