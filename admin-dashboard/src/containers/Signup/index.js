import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Input from "../../components/UI/Input";
import Layout from "../../components/Layouts";
import { signUpAdmin } from "../../store/actions";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = useSelector((state) => state.auth);
  const admin = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    if (admin.error) {
      setError(admin.error);
    }
  }, [admin.error]);

  if (auth.authenticate) {
    return <Redirect to="/" />;
  }
  if (admin.loading) {
    return <p>Loading....!</p>;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const admin = {
      firstName,
      lastName,
      email,
      password,
      role: "admin",
    };
    dispatch(signUpAdmin(admin));
  };
  const renderError = () => {
    return (
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <p> {error} </p>
        </Col>
      </Row>
    );
  };

  return (
    <Layout>
      <Container className="mt-5">
        {renderError()}
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <Row>
                <Col md={6}>
                  <Input
                    label="First Name"
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Col>
                <Col md={6}>
                  <Input
                    label="Last Name"
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Col>
              </Row>
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
                Signup
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </Layout>
  );
}
