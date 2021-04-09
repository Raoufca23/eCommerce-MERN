import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";

import Modal from "../../components/UI/Modal";
// import EnhancedTable from "./table";

// import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
// import NewTable from "./newTable";
// import CollapsibleTable from "./colapsedTable";
// import SimpleTable from "./simpleTable";
import TableCategory from "./tableCategory";

const ListCategory = ({ location }) => {
  // const category = useSelector((state) => state.category);

  // const [expanded, setExpanded] = useState([]);
  // const [checked, setChecked] = useState([]);

  const [show, setShow] = useState(false);
  const closeModal = () => setShow(false);
  const showModal = () => {
    setShow(true);
    /* if (checked.length > 0) {
      setShow(true);
    } else {
      alert("You must select one item at least");
    } */
  };

  /* const renderCategories = (categories) => {
    let category = [];
    for (let cate of categories) {
      category.push({
        label: cate.name,
        value: cate._id,
        children:
          cate.childrenCategories.length > 0 &&
          renderCategories(cate.childrenCategories),
      });
    }
    return category;
  }; */

  const renderModalFooter = () => {
    return (
      <>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
        <Button variant="danger" onClick={closeModal}>
          Confirm
        </Button>
      </>
    );
  };

  /* const handleClickEdit = (e) => {
    if (checked.length === 0) {
      e.preventDefault();
      alert("You must select one item at least");
    } else if (!checked.length > 0 && !checked.length < 2) {
      e.preventDefault();
      alert("You can't select more then one item");
    }
  }; */

  return (
    <>
      <Container className="mt-1">
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Cateogries</h3>
              <div>
                <Link to={`${location.pathname}/add`}>
                  <Button variant="success" style={{ marginRight: "5px" }}>
                    Add
                  </Button>
                </Link>
                {/* <Link
                  to={`${location.pathname}/edit/${checked[0]}`}
                  onClick={handleClickEdit}
                >
                  <Button variant="warning" style={{ marginRight: "5px" }}>
                    Edit
                  </Button>
                </Link> */}
                <Button variant="danger" onClick={showModal}>
                  Delete
                </Button>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            {/* {renderCategories(category.categories)} */}
            {/* <CheckboxTree
              nodes={renderCategories(category.categories)}
              checked={checked}
              expanded={expanded}
              onCheck={(checked) => setChecked(checked)}
              onExpand={(expanded) => setExpanded(expanded)}
            /> */}
            {/* <NewTable /> */}
            {/* <CollapsibleTable /> */}
            {/* <EnhancedTable /> */}
            <TableCategory location={location} />
          </Col>
        </Row>
      </Container>
      {/* <Modal show={show} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete category</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want really to delete this category ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={closeModal}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal> */}
      {<Modal
        title="Delete category"
        show={show}
        closeModal={closeModal}
        footer={renderModalFooter()}
      >
        Do you want really to delete this category ?
      </Modal>}
    </>
  );
};

export default ListCategory;
