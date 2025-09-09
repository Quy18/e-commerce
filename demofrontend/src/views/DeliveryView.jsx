import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../components/GlobalContext/GlobalContext";
import { useEffect, useState } from "react";
import DeliveryEmpty from "../components/Delivery/DeliveryEmpty/DeliveryEmpty";
import DeliveryItem from "../components/Delivery/DeliveryItem/DeliveryItem";
import Skeleton from "react-loading-skeleton";
import { toast } from "react-toastify";
import OrderEmpty from "@/components/Order/OrderEmpty/OrderEmpty";

const DeliveryView = () => {
  const { order, auth, modal } = useGlobalContext();
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [disabled, setDisabled] = useState(false);
  useEffect(() => {
    if (auth.state.user) {
      setLoadingOrders(true);
      if (order.state.orders?.length <= 0) {
        order.getOrders(auth.state.user.id);
      }
      if (order.state.orders?.length > 0) {
        setLoadingOrders(false);
      }
    } else {
      modal.openModal(false);
    }
  }, [auth.state.user]);

  const reloadOrders = async () => {
    setDisabled(true);
    toast.info("Reloading orders...");
    await order.getOrders();
    setDisabled(false);
    toast.success("Orders reloaded!");
  };

  return (
    <div>
      {auth.state.user == null ? (
        <DeliveryEmpty></DeliveryEmpty>
      ) : (
        <div>
          <div className="reload-orders">
            <button
              className="btn-rounded"
              onClick={reloadOrders}
              disabled={disabled}
            >
              Reload Orders
            </button>
            {/* chuyển tới trang đơn hàng đã xóa */}
            <Link to="/deleted_orders" className="btn-rounded ml-2">Show order deleted</Link>
          </div>
          {(order.state.orders?.length > 0 &&
            order.state.orders
              .sort((a, b) => b.id - a.id)
              .map((order) => {
                return (
                  <DeliveryItem key={order.id} orders={order}></DeliveryItem>
                );
              })) || <OrderEmpty height={500}></OrderEmpty>}
        </div>
      )}
    </div>
  );
};

export default DeliveryView;
