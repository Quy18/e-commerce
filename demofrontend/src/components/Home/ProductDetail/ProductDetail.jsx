import { memo, useState } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "@/components/GlobalContext/GlobalContext";
import headphones_pink from "@/assets/images/airpods_max_pink.jpg";
import { FaStar } from "react-icons/fa";
import "./ProductDetail.css";

const ProductDetail = () => {
    const { id } = useParams();
    const {store, cart} = useGlobalContext();

    const product = store.state.products.find((p) => p.id == id);
    if (!product) return <p>Product not found.</p>;

    const [numProduct, setNumProduct] = useState(1);

    return (
        <div className="product-detail-container">
            <div className="product-detail-left">
                <img
                    src={product.product_image || headphones_pink}
                    alt={product.name}
                    className="product-detail-image"
                />
            </div>

            <div className="product-detail-right">
                <h2 className="product-detail-name">{product.name}</h2>
                <div className="product-detail-rating">
                    {[...Array(5)].map((_, i) => (
                        <FaStar
                            key={i}
                            color={i < (product.rating || 4) ? "#FFA500" : "#ddd"}
                        />
                    ))}
                </div>
                <p className="product-detail-price">$ {product.price}</p>
                <p className="product-detail-description">{product.description}</p>
                <div className="product-detail-quantity">
                    <button
                        className="product-detail-quantity-decrease"
                        onClick={() => {
                            const newNumProduct = numProduct - 1;
                            setNumProduct(newNumProduct);
                        }}
                        disabled={numProduct <= 1}
                    >
                        -
                    </button>
                    <span className="product-detail-quantity-value">{numProduct}</span>
                    <button
                        className="product-detail-quantity-increase"
                        onClick={() => {
                            const newNumProduct = numProduct + 1;
                            setNumProduct(newNumProduct);
                        }}
                        disabled={numProduct >= product.stock}
                    >
                        +
                    </button>
                </div>
                <button className="product-detail-add-cart" onClick={() => {
                    cart.addProductToCart(id, numProduct);
                }}>Add to Cart</button>

                <div className="product-detail-extra">
                    <p><strong>Stock:</strong> {product.stock}</p>
                    <p><strong>Category:</strong> {product.category}</p>
                </div>
            </div>
        </div>
    );
};
export default memo(ProductDetail);