import useUsersManage from "api/usersmanage";
import React, { useEffect, useState } from "react";
import { Fragment } from "react";
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
  ThreeDotsVertical,
  PersonCheck,
  PersonX,
} from "react-bootstrap-icons";
import "../../styles/_tableFix.scss";
import { UserItemType } from "types";

const UsersStats: React.FC = () => {
  const [users, setUser] = useState<UserItemType[]>([]);
  const { getAllUser } = useUsersManage();

  useEffect(() => {
    const fetch = async () => {
      try {
        const allUsers = await getAllUser();
        setUser(allUsers.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, []);
  if (users.length === 0) return <div></div>;

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge bg="success">Active</Badge>;
      case "pending":
        return (
          <Badge bg="warning" text="dark">
            Pending
          </Badge>
        );
      case "banned":
        return <Badge bg="danger">Banned</Badge>;
      default:
        return <Badge bg="secondary">Unknown</Badge>;
    }
  };
  return (
    <Fragment>
      <Container fluid className="p-6">
        <h3 className="fw-bold mb-4">User Management</h3>

        <Card className="shadow-sm border-0 rounded-4">
          <Card.Header className="bg-white d-flex justify-content-between align-items-center">
            <h5 className="fw-semibold mb-0">User List</h5>
            <Button variant="primary" className="rounded-pill px-3">
              + Add New User
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
                    <th>User</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          {user.image ? (
                            <Image
                              src={import.meta.env.VITE_URL_IMAGE + user.image}
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
                        <span className="fw-semibold">{user.name}</span>
                      </td>
                      <td>{user.email}</td>
                      <td>
                        <Badge bg="info" text="dark">
                          {user.role}
                        </Badge>
                      </td>
                      <td>{renderStatusBadge(user.status)}</td>
                      <td>{new Date(user.created_at).toLocaleDateString()}</td>
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
                            {user.status === "banned" ? (
                              <Dropdown.Item>
                                <PersonCheck className="me-2" /> Unban
                              </Dropdown.Item>
                            ) : (
                              <Dropdown.Item>
                                <PersonX className="me-2" /> Ban User
                              </Dropdown.Item>
                            )}
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
export default UsersStats;
