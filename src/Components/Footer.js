import { color } from "@mui/system";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
function Footer() {
  return (
    <footer
      className="bg-dark p-2"
      style={{ position: "absolute", bottom: 0, width: "100%", color: "white" }}
    >
      <Container className="text-center">
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
          <Col md={6} className="text-center">
            <p>Copyright © 2023 TeleConsultation, Inc. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
