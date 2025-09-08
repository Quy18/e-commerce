import "./DeliveryItem.css";
import headphones_pink from "@/assets/images/airpods_max_pink.jpg";
import { useEffect, useState } from "react";
import { FaCaretUp } from "react-icons/fa";
import { useGlobalContext } from "../../GlobalContext/GlobalContext";

const DeliveryItem = ({ orders }) => {
  const [expanded, setExpanded] = useState(false);
  const currentDate = new Date(orders.created_at);
  const date = new Date();
  let percentage_complete = null;
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const numberOfDays = () => {
    if (currentDate.getTime() > date.getTime()) {
      return "0";
    }
    return Math.ceil((date.getTime() - currentDate.getTime()) / (1000 * 3600 * 24));

  }
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const setPercentageComplete = (status) => {
    if (status === "cancelled") {
      return percentage_complete = 0;
    } else if (status === "pending") {
      return percentage_complete = 30;
    } else if (status === "shipping") {
      return percentage_complete = 70;
    } else if (status === "completed") {
      return percentage_complete = 100;
    } else {
      return percentage_complete = null;
    }
  }
  const checkFlair = (status) => {
    if (status === "cancelled") {
      return "flair danger-flair";
    } else if (status === "shipping" || status === "pending") {
      return "flair warning-flair";
    } else {
      return "flair success-flair";
    }
  };

  const checkFlairText = (status) => {
    if (status === "cancelled") {
      return "Order Cancelled";
    } else if (status === "pending") {
      return "Verification Pending";
    } else if (status === "shipped") {
      return "Verified & In Delivery";
    } else {
      return "Delivered";
    }
  };

  const { modal, order, cart } = useGlobalContext();

  const handleOpenCancelModal = (order_id) => {
    modal.openCancelModal();
    orders.setOrderToBeCanceled(order_id);
  };
  const [items, setItems] = useState(null);
  useEffect(() => {
    const fetchItems = async () => {
      if (!orders?.id) return;

      const data = await order.getItemFromOrder(orders.id);
      if (!data) {
        setItems([]);
        return;
      }

      // merge product detail vao items
      // merge trực tiếp
      const merged = await Promise.all(
        data.map(async (item) => {
          const product = await cart.getProductById(item.product_id);
          return {
            ...item,
            name: product?.name ?? "Unknown",
            description: product?.description ?? "",
          };
        })
      );
      setItems(merged);
    }
    fetchItems();
  }, [orders.id]);
  return (
    <div className="sub-container delivery-item-container">
      <div className="delivery-overview">
        <div className="delivery-summary">
          <div className="delivery-order-number">
            <h2 className="delivery-item-title order-main" title={orders.id}>
              Order: #{orders.id.toString().slice(0, 6)}
            </h2>
            <div className="delivery-items">
              <h5>Item Count: {items?.length}</h5>
              <h5>Total Cost: ${orders.total_amount}</h5>
              <h6>Total cost includes delivery fee</h6>
            </div>
          </div>
          <div className="delivery-progress">
            <h3 className="delivery-item-title">Status</h3>
            <h4>
              {setPercentageComplete(orders.status)}%{" "}
              <span className={checkFlair(orders.status)}>
                {checkFlairText(orders.status)}
              </span>
            </h4>
            <progress
              className="progress-bar"
              value={percentage_complete}
              max="100"
            ></progress>
          </div>
          <div className="delivery-date">
            <h3 className="delivery-item-title">Expected Completion</h3>
            {orders.status === "completed" ? (
              <h4 className="is-delivered">Delivered</h4>
            ) : orders.order_cancelled === "cancelled" ? (
              <h4 className="is-cancelled">Cancelled</h4>
            ) : (
              <>
                <h4>{formattedDate}</h4>
                <h4>{numberOfDays()} day(s)</h4>
              </>
            )}
          </div>
        </div>
        <div
          className={expanded ? "fully-expanded isExpanded" : "fully-expanded"}
        >
          <div className="products-in-delivery">
            <h3>Products in Delivery</h3>
            <div className="delivery-products">
              {items?.map((item) => {
                return (
                  <div className="delivery-products-item" key={item.id}>
                    <img src={headphones_pink} alt="" width="50" />
                    <h5>Product Name: {item.name}</h5>
                    <h5>Description: {item.description}</h5>
                    <h5>Price: ${item.price}</h5>
                    <h5>Quantity: {item.quantity}</h5>
                  </div>
                );
              })}
            </div>
          </div>
          {orders.order_processed != true && orders.order_cancelled != true && (
            <div className="danger-zone">
              <h3 className="danger-zone-text">Danger Zone</h3>
              <div className="danger-zone-buttons">
                <button
                  className="btn-rounded danger-zone-button"
                  onClick={() => {
                    handleOpenCancelModal(orders.id);
                  }}
                >
                  Cancel Order
                </button>
                <button
                  className="btn-rounded danger-zone-button report-issue"
                  onClick={() => {
                    // mailto link
                    window.location.href = `mailto:www.minisylar3@gmail.com?subject=Reporting Order #${orders.id.toString().slice(
                      0,
                      6
                    )}`;
                  }}
                >
                  Report Issue
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="expand-collapse-delivery">
        <button onClick={toggleExpanded}>
          {expanded ? "Collapse" : "Expand"}
          <span>
            <FaCaretUp
              className={
                expanded ? "caret-delivery" : "caret-delivery caret-expanded"
              }
            ></FaCaretUp>
          </span>
        </button>
      </div>
    </div>
  );
};
export default DeliveryItem;
