import "./Product.css";
import headphones_pink from "@/assets/images/airpods_max_pink.jpg";
import { FaStar } from "react-icons/fa";
import { useGlobalContext } from "@/components/GlobalContext/GlobalContext";
import { toast } from "react-toastify";
import { memo } from "react";

const Product = ({ product }) => {
  let {store} = useGlobalContext();
  return (
    <div className="product-container">
      <div className="image">
        <img
          src={product?.product_image || headphones_pink}
          alt="Product Image"
          width={"100%"}
        />
      </div>
      <div className="product-details">
        <div className="price">
          <div className="name-price-product">
            <h4>{product?.name}</h4>
            <h5>
              $<span className="actual-product-price">{product?.price}</span>
            </h5>
          </div>
          <h5>{product?.description}</h5>
        </div>
        <div>
            <button
              className="add-to-cart"
              onClick={() => {
                // chờ xử lý
              }}
            >
              Add to Cart
            </button>
        </div>
      </div>
      <div className="heart"></div>
    </div>
  );
};
export default memo(Product);
