import React from "react";
import { Fragment } from "react";
import { Container, Card, Table, Button, Dropdown, Badge, Image, } from "react-bootstrap";
import { PencilSquare, Trash, ThreeDotsVertical, PersonCheck, PersonX, } from "react-bootstrap-icons";

const UsersStats: React.FC = () => {
    // Mock data hiển thị UI
    const users = [
        {
            id: 1,
            name: "Mai Ngọc Quý",
            email: "quymai@example.com",
            role: "Admin",
            status: "Active",
            createdAt: "2024-03-21",
            avatar: "https://via.placeholder.com/48",
        },
        {
            id: 2,
            name: "Nguyễn Văn A",
            email: "vana@example.com",
            role: "User",
            status: "Pending",
            createdAt: "2024-06-11",
            avatar: "https://via.placeholder.com/48",
        },
        {
            id: 3,
            name: "Trần Thị B",
            email: "tranb@example.com",
            role: "Moderator",
            status: "Banned",
            createdAt: "2024-01-09",
            avatar: "https://via.placeholder.com/48",
        },
    ];

    const renderStatusBadge = (status: string) => {
        switch (status) {
            case "Active":
                return <Badge bg="success">Active</Badge>;
            case "Pending":
                return <Badge bg="warning" text="dark">Pending</Badge>;
            case "Banned":
                return <Badge bg="danger">Banned</Badge>;
            default:
                return <Badge bg="secondary">Unknown</Badge>;
        }
    };
    return (
        <Fragment>
            <Container fluid className="mt-n22 px-6">
                <h3 className="fw-bold mb-4">User Management</h3>

                <Card className="shadow-sm border-0 rounded-4">
                    <Card.Header className="bg-white d-flex justify-content-between align-items-center">
                        <h5 className="fw-semibold mb-0">User List</h5>
                        <Button variant="primary" className="rounded-pill px-3">
                            + Add New User
                        </Button>
                    </Card.Header>

                    <Card.Body className="p-0">
                        <Table hover responsive className="align-middle mb-0">
                            <thead className="table-light text-muted small">
                                <tr>
                                    <th>#</th>
                                    <th>User</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th>Created</th>
                                    <th className="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, idx) => (
                                    <tr key={user.id}>
                                        <td>{idx + 1}</td>
                                        <td>
                                            <div className="d-flex align-items-center gap-2">
                                                <Image
                                                    src={user.avatar}
                                                    roundedCircle
                                                    width={40}
                                                    height={40}
                                                    alt="avatar"
                                                />
                                                <span className="fw-semibold">{user.name}</span>
                                            </div>
                                        </td>
                                        <td>{user.email}</td>
                                        <td>
                                            <Badge bg="info" text="dark">
                                                {user.role}
                                            </Badge>
                                        </td>
                                        <td>{renderStatusBadge(user.status)}</td>
                                        <td>{user.createdAt}</td>
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
                                                    {user.status === "Banned" ? (
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
                    </Card.Body>
                </Card>
            </Container>
        </Fragment>
    );
}
export default UsersStats;