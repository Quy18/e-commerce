// import node module libraries
import { Col, Row, Form, Card, Button, Image } from "react-bootstrap";

// import widget as custom components
import { FormSelect } from "widgets";

// import hooks
import { useMounted } from "hooks/useMounted";
import { useRef } from "react";
import { DropFiles, DropFilesRef } from "../../widgets/dropfiles/DropFiles";
const GeneralSetting = () => {
  const hasMounted = useMounted();
  const countryOptions = [
    { value: "India", label: "India" },
    { value: "US", label: "US" },
    { value: "UK", label: "UK" },
    { value: "UAE", label: "UAE" },
    { value: "Vietnam", label: "VN" },
  ];

  const dropzoneRef = useRef<DropFilesRef>(null);

  return (
    <Row className="mb-8">
      <Col xl={3} lg={4} md={12} xs={12}>
        <div className="mb-4 mb-lg-0">
          <h4 className="mb-1">General Setting</h4>
          <p className="mb-0 fs-5 text-muted">
            Profile configuration settings{" "}
          </p>
        </div>
      </Col>
      <Col xl={9} lg={8} md={12} xs={12}>
        <Card>
          {/* card body */}
          <Card.Body>
            <div className=" mb-6">
              <h4 className="mb-1">General Settings</h4>
            </div>
            <Row className="align-items-center mb-8">
              <Col md={3} className="mb-3 mb-md-0">
                <h5 className="mb-0">Avatar</h5>
              </Col>
              <Col md={9}>
                <div className="d-flex align-items-center">
                  <div className="me-3">
                    <Image
                      src="/images/avatar/avatar-5.jpg"
                      className="rounded-circle avatar avatar-lg"
                      alt=""
                    />
                  </div>
                </div>
              </Col>
            </Row>
            {/* col */}
            <Row className="mb-8">
              <Col md={3} className="mb-3 mb-md-0"></Col>
              <Col md={9}>
                {/* dropzone input */}
                <div>
                  {hasMounted && (
                    <Form
                      action="#"
                      className="dropzone mb-3 py-10 border-dashed"
                    >
                      <DropFiles ref={dropzoneRef} />
                    </Form>
                  )}
                </div>
                <div className="mt-3">
                  <Button
                    variant="primary"
                    onClick={() => dropzoneRef.current?.openDialog()}
                  >
                    Change
                  </Button>
                  <Button
                    variant="danger"
                    className="ms-2"
                    onClick={() => dropzoneRef.current?.clearFiles()}
                  >
                    Remove
                  </Button>
                </div>
              </Col>
            </Row>
            <div>
              <div className="mb-6">
                <h4 className="mb-1">Basic information</h4>
              </div>
              {hasMounted && (
                <Form>
                  <Row className="mb-3">
                    <Form.Label
                      className="col-sm-4 col-form-label form-label"
                      htmlFor="fullName"
                    >
                      Full name
                    </Form.Label>
                    <Col sm={4} className="mb-3 mb-lg-0">
                      <Form.Control
                        type="text"
                        placeholder="First name"
                        id="fullName"
                        required
                      />
                    </Col>
                    <Col sm={4}>
                      <Form.Control
                        type="text"
                        placeholder="Last name"
                        id="lastName"
                        required
                      />
                    </Col>
                  </Row>
                  {/* row */}
                  <Row className="mb-3">
                    <Form.Label
                      className="col-sm-4 col-form-label form-label"
                      htmlFor="email"
                    >
                      Email
                    </Form.Label>
                    <Col md={8} xs={12}>
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        id="email"
                        required
                      />
                    </Col>
                  </Row>
                  {/* row */}
                  <Row className="mb-3">
                    <Form.Label className="col-sm-4" htmlFor="phone">
                      Phone <span className="text-muted">(Optional)</span>
                    </Form.Label>
                    <Col md={8} xs={12}>
                      <Form.Control
                        type="text"
                        placeholder="Enter Phone"
                        id="phone"
                      />
                    </Col>
                  </Row>

                  {/* Location */}
                  <Row className="mb-3">
                    <Form.Label className="col-sm-4" htmlFor="country">
                      Location
                    </Form.Label>
                    <Col md={8} xs={12}>
                      <Form.Control
                        as={FormSelect}
                        placeholder="Select Country"
                        id="country"
                        options={countryOptions}
                      />
                    </Col>
                  </Row>

                  {/* Address Line One */}
                  <Row className="mb-3">
                    <Form.Label className="col-sm-4" htmlFor="addressLine">
                      Address line
                    </Form.Label>
                    <Col md={8} xs={12}>
                      <Form.Control
                        type="text"
                        placeholder="Enter Address line 1"
                        id="addressLine"
                        required
                      />
                    </Col>
                  </Row>
                  {/* Zip code */}
                  <Row className="align-items-center">
                    <Col md={{ offset: 4, span: 8 }} xs={12} className="mt-4">
                      <Button variant="primary" type="submit">
                        Save Changes
                      </Button>
                    </Col>
                  </Row>
                </Form>
              )}
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row >
  );
};

export default GeneralSetting;
