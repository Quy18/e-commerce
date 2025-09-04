import { useEffect, useState } from "react";
import "./OrderDetail.css";
import { useGlobalContext } from "@/components/GlobalContext/GlobalContext";

const OrderDetail = ({ item }) => {
    const { cart } = useGlobalContext();
    const [productDetail, setProductDetail] = useState(null);
    useEffect(() => {
        const fetchProduct = async () => {
            const data = await cart.getProductById(item.product_id);
            setProductDetail(data);
        };
        fetchProduct();
    }, [item.product_id, cart]);

    if (!productDetail) {
        return <p>Đang tải...</p>;
    }

    return (
        <div className="order-detail">
            <div className="order-info">
                <p className="order-name">{productDetail.name}</p>
                <p className="order-quantity">Số lượng: {item.quantity}</p>
            </div>
            <p className="order-price">${item.price}</p>
        </div>
    );
}
export default OrderDetail;