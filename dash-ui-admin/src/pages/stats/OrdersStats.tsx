import useOrdersManage from "api/ordersmanage";
import { useState, useEffect } from "react";
import { OrderItemType } from "types";
import { Fragment } from "react";
import {
  Container,
  Card,
  Table,
  Button,
  Dropdown,
  Badge
} from "react-bootstrap";
import {
  PencilSquare,
  Trash,
  ThreeDotsVertical,
  Eye
} from "react-bootstrap-icons";
import "../../styles/_tableFix.scss";

const OrdersStats = () => {
  const [orders, setOrders] = useState<OrderItemType[]>([]);
  const { getAllOrder } = useOrdersManage();

  useEffect(() => {
    const fetch = async () => {
      try {
        const allOrders = await getAllOrder();
        setOrders(allOrders.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, []);

  const renderStatusPaymentBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge bg="success">Paid</Badge>;
      case "unpaid":
        return (
          <Badge bg="warning" text="dark">
            Unpaid
          </Badge>
        );
      case "refunded":
        return <Badge bg="danger">Refunded</Badge>;
      default:
        return <Badge bg="secondary">Unknown</Badge>;
    }
  };

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge bg="success">Completed</Badge>;

      case "pending":
        return <Badge bg="warning" text="dark">Pending</Badge>

      case "confirmed":
        return <Badge bg="info" text="dark">Confirmed</Badge>

      case "shipping":
        return <Badge bg="primary">Shipping</Badge>;

      case "cancelled":
        return <Badge bg="danger">Cancelled</Badge>;

      default:
        return <Badge bg="secondary">Unknown</Badge>;
    }
  };

  return (
    <Fragment>
      <Container fluid className="p-6">
        <h3 className="fw-bold mb-4">Order Management</h3>

        <Card className="shadow-sm border-0 rounded-4">
          <Card.Header className="bg-white d-flex justify-content-between align-items-center">
            <h5 className="fw-semibold mb-0">Order List</h5>
            <Button variant="primary" className="rounded-pill px-3">
              + Add New Order
            </Button>
          </Card.Header>

          <Card.Body className="p-0">
            <div className="table-responsive">
              <Table
                hover
                responsive
                className="align-middle mb-0 table-responsive"
              >
                <thead className="table-light text-muted small">
                  <tr>
                    <th>ID</th>
                    <th>Total Payment</th>
                    <th>Status Payment</th>
                    <th>Created</th>
                    <th>Status</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{order.total_payment}</td>
                      {order.created_at === null ? (
                        <td>-/-</td>
                      ) : (
                        <td>
                          {new Date(order.created_at).toLocaleDateString()}
                        </td>
                      )}
                      <td>{renderStatusPaymentBadge(order.payment_status)}</td>
                      <td>{renderStatusBadge(order.status)}</td>
                      <td className="text-end">
                        <Dropdown align="end">
                          <Dropdown.Toggle
                            as="div"
                            className="btn btn-sm btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
                            style={{ width: 36, height: 36, cursor: "pointer" }}
                          >
                            <ThreeDotsVertical />
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item>
                              <Eye className="me-2" /> View
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <PencilSquare className="me-2" /> Edit
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <Trash className="me-2" /> Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </Fragment>
  );
};
export default OrdersStats;
