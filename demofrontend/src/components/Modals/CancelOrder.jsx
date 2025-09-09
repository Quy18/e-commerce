import React from "react";
import { toast } from "react-toastify";
import "./Modal.css";
import { useGlobalContext } from "@/components/GlobalContext/GlobalContext";
import ClipLoader from "react-spinners/ClipLoader";
import { useState } from "react";

const CancelOrder = () => {
  const { modal, order, auth } = useGlobalContext();
  let [loading, setLoading] = useState(false);
  const handleClose = () => {
    modal.closeCancelModal();
  };
  const submitForm = (e) => {
    e.preventDefault();
    setLoading(true);
    const order_to_be_cancelled = modal.order_cancel_id;
    order
      .cancelOrder(order_to_be_cancelled)
      .then(() => {
        // get new orders
        order.getOrders();
        handleClose();
      })
      .catch(() => {
        toast.error("There was an issue cancelling your order");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="modal-container">
      <div className="modal">
        <div className="modal-cancel">
          <button
            href="/"
            className="modal-cancel-button"
            onClick={handleClose}
          >
            X
          </button>
        </div>
        <div className="modal-header">
          <h3>Are you sure you want to cancel your order?</h3>
        </div>
        <div className="modal-body">
          <form onSubmit={submitForm}>
            <div className="form-group cancel-modal-group">
              <button
                type="submit"
                className="btn-rounded btn-submit btn-submit-small btn-cancel"
              >
                Cancel my order
                <span>
                  <ClipLoader
                    loading={loading}
                    size={10}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </span>
              </button>
              <button
                type="button"
                className="btn-rounded btn-submit btn-submit-small"
                onClick={() => {
                  modal.closeCancelModal();
                }}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CancelOrder;
