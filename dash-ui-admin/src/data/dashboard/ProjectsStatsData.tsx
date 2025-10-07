import { Briefcase, ListTask, People, Bullseye } from "react-bootstrap-icons";
import { ProjectsStatsProps } from "types";

export const ProjectsStats: ProjectsStatsProps[] = [
  {
    id: 1,
    title: "Users",
    value: 18,
    icon: <People size={18} />,
    statInfo: '<span className="text-dark me-2">2</span> Completed',
  },
  {
    id: 2,
    title: "Products",
    value: 132,
    icon: <ListTask size={18} />,
    statInfo: '<span className="text-dark me-2">28</span> Completed',
  },
  {
    id: 3,
    title: "Orders",
    value: 12,
    icon: <Briefcase size={18} />,
    statInfo: '<span className="text-dark me-2">1</span> Completed',
  },
  {
    id: 4,
    title: "Coupons",
    value: "76%",
    icon: <Bullseye size={18} />,
    statInfo: '<span className="text-dark me-2">5%</span> Completed',
  },
];
export default ProjectsStats;
