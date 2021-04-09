import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Input from "../../components/UI/Input";
import Layout from "../../components/Layouts";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/actions";
import { Redirect } from "react-router-dom";

export default function Signin() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    dispatch(login(user));
  };

  if (auth.authenticate) {
    return <Redirect to="/" />;
  }

  return (
    <Layout>
      <Container className="mt-5">
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <Input
                label="Email address"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                label="Password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </Layout>
  );
}
