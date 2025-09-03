import "./OrderDetails.css";
import headphones_pink from "@/assets/images/airpods_max_pink.jpg";
import { useGlobalContext } from "@/components/GlobalContext/GlobalContext";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const OrderDetails = ({ product }) => {
  const { cart } = useGlobalContext();
  const [productDetail, setProductDetail] = useState(null);
  const [numProduct, setNumProduct] = useState(product.quantity);

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
          <p>Stock: {productDetail.stock}</p>
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
              // xử lý bất đồng bộ vì setNumProduct chỉ lên lịch cho state ở request sau
              const newNumProduct = numProduct - 1;
              setNumProduct(newNumProduct);
              cart.decreaseQuantity(product.product_id, newNumProduct);
            }}
          >
            -
          </button>
          <p>{numProduct}</p>
          <button
            onClick={() => {
              // xử lý bất đồng bộ vì setNumProduct chỉ lên lịch cho state ở request sau
              const newNumProduct = numProduct + 1;
              if (newNumProduct <= productDetail.stock) {
                setNumProduct(newNumProduct);
                cart.decreaseQuantity(product.product_id, newNumProduct);
              }else{
                toast.error("Vượt quá số lượng trong kho");
              }
            }}
            disabled={numProduct >= productDetail.stock}
          >
            +
          </button>
        </div>
      </div>
      <div className="remove">
        <button
          onClick={() => {
            cart.removeItemFromCart(product.product_id);
          }}
        >
          Remove
        </button>
      </div>
    </div>
  );
};
export default OrderDetails;
