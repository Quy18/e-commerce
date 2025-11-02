import useProductsManage from "api/productsmanage";
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { ProductItemType } from "types";
import {
  Container,
  Card,
  Table,
  Button,
  Dropdown,
  Badge,
  Image,
} from "react-bootstrap";
import {
  PencilSquare,
  Trash,
  ThreeDotsVertical
} from "react-bootstrap-icons";
import "../../styles/_tableFix.scss";

const ProductsStats: React.FC = () => {
  const [products, setProducts] = useState<ProductItemType[]>([]);
  const { getAllProduct } = useProductsManage();

  useEffect(() => {
    const fetch = async () => {
      try {
        const allProducts = await getAllProduct();
        setProducts(allProducts.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, []);

  return (
    <Fragment>
      <Container fluid className="p-6">
        <h3 className="fw-bold mb-4">Product Management</h3>

        <Card className="shadow-sm border-0 rounded-4">
          <Card.Header className="bg-white d-flex justify-content-between align-items-center">
            <h5 className="fw-semibold mb-0">Product List</h5>
            <Button variant="primary" className="rounded-pill px-3">
              + Add New Product
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
                    <th>Product</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Description</th>
                    <th>Created</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          {product.image ? (
                            <Image
                              src={
                                import.meta.env.VITE_URL_IMAGE + product.image
                              }
                              roundedCircle
                              width={40}
                              height={40}
                              alt="avatar"
                            />
                          ) : (
                            <Image
                              src="/images/avatar/avatar-5.jpg"
                              roundedCircle
                              width={40}
                              height={40}
                              alt="avatar"
                            />
                          )}
                        </div>
                      </td>
                      <td>
                        <span className="fw-semibold">{product.name}</span>
                      </td>
                      <td>${product.price}</td>
                      <td>
                        <Badge bg="info" text="dark">
                          {product.stock}
                        </Badge>
                      </td>
                      <td>{product.description}</td>
                      {product.created_at === null ? (
                        <td>-/-</td>
                      ) : (
                        <td>
                          {new Date(product.created_at).toLocaleDateString()}
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
                            {/* {user.status === "banned" ? (
                              <Dropdown.Item>
                                <PersonCheck className="me-2" /> Unban
                              </Dropdown.Item>
                            ) : (
                              <Dropdown.Item>
                                <PersonX className="me-2" /> Ban User
                              </Dropdown.Item>
                            )} */}
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
export default ProductsStats;
