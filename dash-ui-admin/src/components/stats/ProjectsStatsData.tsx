import { Briefcase, ListTask, People, Bullseye } from "react-bootstrap-icons";
import { StatType } from "types";
import useStat from "api/stat";
import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { StatRightTopIcon } from "widgets";
import Settings from "pages/dashboard/pages/Settings";
import { useNavigate } from "react-router";
import { useGlobalContext } from "context/GlobalContext";

const ProjectsStats = () => {
  const {stat} = useGlobalContext();
  const navigate = useNavigate();

  if (!stat) return <div></div>;
  const statArr = [
    {
      id: 1,
      title: "Users",
      name: "users",
      value: stat?.users,
      icon: <People size={18} />,
      // statInfo: '<span className="text-dark me-2">2</span> Completed',
    },
    {
      id: 2,
      title: "Products",
      name: "products",
      value: stat?.products,
      icon: <ListTask size={18} />,
      // statInfo: '<span className="text-dark me-2">28</span> Completed',
    },
    {
      id: 3,
      title: "Orders",
      name: "orders",
      value: stat?.orders,
      icon: <Briefcase size={18} />,
      // statInfo: '<span className="text-dark me-2">1</span> Completed',
    },
    {
      id: 4,
      title: "Coupons",
      name: "coupons",
      value: stat?.coupons,
      icon: <Bullseye size={18} />,
      // statInfo: '<span className="text-dark me-2">5%</span> Completed',
    },
  ]
  return (
    <>
      {statArr.map((item) => (
        <Col key={item.id} xl={3} lg={6} md={12} xs={12} className="mt-6" onClick={() => navigate(`/stats/${item.name}`)}>
          <StatRightTopIcon info={item} />
        </Col>
      ))}
    </>
  );
}
export default ProjectsStats;
