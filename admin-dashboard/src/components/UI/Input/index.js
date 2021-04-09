import React from "react";
import { Form } from "react-bootstrap";

export default function Input({ label, type, placeholder, value, onChange }) {
  return (
    <Form.Group /* controlId="formBasicPassword" */>
      {label && <Form.Label>{label} </Form.Label>}
      <Form.Control
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </Form.Group>
  );
}
