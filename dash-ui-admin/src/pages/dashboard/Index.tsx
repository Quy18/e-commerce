// import node module libraries
import { Fragment } from "react";
import { Container, Col, Row } from "react-bootstrap";

// import sub components
import { ActiveProjects, Teams, TasksPerformance } from "sub-components";

// import required data files
import ProjectsStatsData from "components/stats/ProjectsStatsData";

const Dashboard = () => {
  return (
    <Fragment>
      <div className="bg-primary pt-10 pb-21"></div>
      <Container fluid className="mt-n22 px-6">
        <Row>
          <Col lg={12} md={12} xs={12}>
            <div>
              <div className="d-flex justify-content-between align-items-center">
                <div className="mb-2 mb-lg-0">
                  <h3 className="mb-0  text-white">Projects</h3>
                </div>
              </div>
            </div>
          </Col>
          <ProjectsStatsData />
        </Row>

        <ActiveProjects />

        <Row className="my-6">
          <Col xl={4} lg={12} md={12} xs={12} className="mb-6 mb-xl-0">
            <TasksPerformance />
          </Col>

          <Col xl={8} lg={12} md={12} xs={12}>
            <Teams />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};
export default Dashboard;
