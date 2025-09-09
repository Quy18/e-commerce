import { useGlobalContext } from "@/components/GlobalContext/GlobalContext";
import { useEffect, useState } from "react";
import OrderDeleteDetail from "../OrderDeleteDetail/OrderDeleteDetail";
import { Link } from "react-router-dom";
import "./OrderDelete.css";
import OrderEmpty from "../OrderEmpty/OrderEmpty";

const OrderDelete = () => {
    const { order } = useGlobalContext();
    const [orderDelete, setOrderDelete] = useState([]);
    useEffect(() => {
        const fetchDeletedOrders = async () => {
            const data = await order.getOrdersDeleted();
            if (data) {
                setOrderDelete(data);
            }
        };
        fetchDeletedOrders();
    }, []);
    return (
        <div>
            <div className="order-header">
                <div className="order-title"></div>
                <Link to="/delivery" className="btn-rounded">Order</Link>
            </div>

            {(orderDelete?.length > 0 &&
                orderDelete
                    .sort((a, b) => b.id - a.id)
                    .map((order) => {
                        return (
                            <OrderDeleteDetail key={order.id} orders={order}></OrderDeleteDetail>
                        );
                    })) || <OrderEmpty height={500}></OrderEmpty>}
        </div>
    );
}
export default OrderDelete;