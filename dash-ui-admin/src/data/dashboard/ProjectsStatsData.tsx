import { Briefcase, ListTask, People, Bullseye } from "react-bootstrap-icons";
import { ProjectsStatsProps, StatType } from "types";
import useStat from "api/stat";
import { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { StatRightTopIcon } from "widgets";

// export const ProjectsStats: ProjectsStatsProps[] = [
//   {
//     id: 1,
//     title: "Users",
//     value: stat?.users,
//     icon: <People size={18} />,
//     statInfo: '<span className="text-dark me-2">2</span> Completed',
//   },
//   {
//     id: 2,
//     title: "Products",
//     value: stat?.products,
//     icon: <ListTask size={18} />,
//     statInfo: '<span className="text-dark me-2">28</span> Completed',
//   },
//   {
//     id: 3,
//     title: "Orders",
//     value: stat?.orders,
//     icon: <Briefcase size={18} />,
//     statInfo: '<span className="text-dark me-2">1</span> Completed',
//   },
//   {
//     id: 4,
//     title: "Coupons",
//     value: stat?.coupons,
//     icon: <Bullseye size={18} />,
//     statInfo: '<span className="text-dark me-2">5%</span> Completed',
//   },
// ];
const ProjectsStats = () => {
  const { getStats } = useStat();
  const [stat, setStat] = useState<StatType | null>(null);
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const statData = await getStats();
        setStat(statData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchStats();
  });
  if (!stat) return <div>Loading...</div>;
  const statArr = [
    {
      id: 1,
      title: "Users",
      value: stat?.users,
      icon: <People size={18} />,
      // statInfo: '<span className="text-dark me-2">2</span> Completed',
    },
    {
      id: 2,
      title: "Products",
      value: stat?.products,
      icon: <ListTask size={18} />,
      // statInfo: '<span className="text-dark me-2">28</span> Completed',
    },
    {
      id: 3,
      title: "Orders",
      value: stat?.orders,
      icon: <Briefcase size={18} />,
      // statInfo: '<span className="text-dark me-2">1</span> Completed',
    },
    {
      id: 4,
      title: "Coupons",
      value: stat?.coupons,
      icon: <Bullseye size={18} />,
      // statInfo: '<span className="text-dark me-2">5%</span> Completed',
    },
  ]
  return (
    <>
      {statArr.map((item) => (
        <Col key={item.id} xl={3} lg={6} md={12} xs={12} className="mt-6">
          <StatRightTopIcon info={item} />
        </Col>
      ))}
    </>
  );
}
export default ProjectsStats;
