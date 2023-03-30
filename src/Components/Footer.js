import { color } from "@mui/system";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
function Footer() {
  return (
    <>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "50px",
        }}
      >
        {/* Footer content */}

        <footer
          className="bg-dark p-2"
          style={{
            display: "flex",
            flex: "1",
            position: "relative",
            bottom: 0,
            width: "100%",
            color: "white",
          }}
        >
          <Container fluid>
            <Row>
              <Row md={6}>
                <h5>
                  <strong>Contact Us</strong>
                </h5>
                <p>example@email.com</p>
                <p>Phone:+91 935488XXXX</p>
                <Col md={6}>
                  <p>Address: IIIT Bangalore,Electronics City,500100</p>
                </Col>
              </Row>
              {/* <Col md={6} className="text-center">
            <p>Copyright © 2023 TeleConsultation, Inc. All rights reserved.</p>
          </Col> */}
            </Row>
          </Container>
        </footer>
      </div>
    </>
  );
}

export default Footer;
