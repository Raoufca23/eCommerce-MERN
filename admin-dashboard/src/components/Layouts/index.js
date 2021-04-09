import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Header from "../Header";
import "./styles.css";

export default function Layout({ sidebar, children }) {
  return (
    <>
      <Header />
      {sidebar ? (
        <Container fluid>
          <Row>
            <Col md={2} className="sidebar">
              <ul>
                <li>
                  <NavLink exact to="/">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/category">Categories</NavLink>
                </li>
                <li>
                  <NavLink to="/product">Products</NavLink>
                </li>
                <li>
                  <NavLink to="/order">Orders</NavLink>
                </li>
              </ul>
            </Col>
            <Col md={10} style={{ marginLeft: "auto", paddingTop: "56px" }}>
              {children}
            </Col>
          </Row>
        </Container>
      ) : (
        children
      )}
    </>
  );
}
