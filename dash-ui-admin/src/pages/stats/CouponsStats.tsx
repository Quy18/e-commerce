import useCouponManage from "api/couponmanage";
import { useEffect, useState } from "react";
import { CouponItemType } from "types";
import { Fragment } from "react";
import {
  Container,
  Card,
  Table,
  Button,
  Dropdown,
  Badge,
} from "react-bootstrap";
import {
  PencilSquare,
  Trash,
  ThreeDotsVertical
} from "react-bootstrap-icons";
import "../../styles/_tableFix.scss";

const CouponsStats = () => {
  const [coupons, setCoupons] = useState<CouponItemType[]>([]);
  const { getAllCoupon } = useCouponManage();

  useEffect(() => {
    const fetch = async () => {
      try {
        const allCoupon = await getAllCoupon();
        setCoupons(allCoupon.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, []);

  const renderStatusBadge = (status: number) => {
    switch (status) {
      case 1:
        return <Badge bg="success">Active</Badge>;
      case 0:
        return (
          <Badge bg="warning" text="dark">
            Pending
          </Badge>
        );
    //   case "banned":
    //     return <Badge bg="danger">Banned</Badge>;
      default:
        return <Badge bg="secondary">Unknown</Badge>;
    }
  };

  return (
    <Fragment>
      <Container fluid className="p-6">
        <h3 className="fw-bold mb-4">Coupon Management</h3>

        <Card className="shadow-sm border-0 rounded-4">
          <Card.Header className="bg-white d-flex justify-content-between align-items-center">
            <h5 className="fw-semibold mb-0">Coupon List</h5>
            <Button variant="primary" className="rounded-pill px-3">
              + Add New Coupon
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
                    <th>Code</th>
                    <th>Type</th>
                    <th>Value</th>
                    <th>Min Order Value</th>
                    <th>Usage Limit</th>
                    <th>Used Count</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Is Active</th>
                    <th>Created</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {coupons.map((coupon, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <span className="fw-semibold">{coupon.code}</span>
                      </td>
                      <td>{coupon.type}</td>
                      <td>${coupon.value}</td>
                      <td>{coupon.min_order_value}</td>
                      <td>{coupon.usage_limit}</td>
                      <td>{coupon.used_count}</td>
                      {coupon.start_date === null ? (
                        <td>-/-</td>
                      ) : (
                        <td>
                          {new Date(coupon.start_date).toLocaleDateString()}
                        </td>
                      )}
                      {coupon.end_date === null ? (
                        <td>-/-</td>
                      ) : (
                        <td>
                          {new Date(coupon.end_date).toLocaleDateString()}
                        </td>
                      )}
                      <td>{renderStatusBadge(coupon.is_active)}</td>
                      {coupon.created_at === null ? (
                        <td>-/-</td>
                      ) : (
                        <td>
                          {new Date(coupon.created_at).toLocaleDateString()}
                        </td>
                      )}
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
export default CouponsStats;
