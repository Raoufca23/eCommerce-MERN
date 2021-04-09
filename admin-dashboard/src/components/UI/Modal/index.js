import React from "react";
import { Modal } from "react-bootstrap";

export default function NewModal({
  size,
  title,
  show,
  closeModal,
  handleSubmit,
  children,
  footer,
}) {
  return (
    <Modal size={size} show={show} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title> {title} </Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      {footer && <Modal.Footer>{footer}</Modal.Footer>}
    </Modal>
  );
}
