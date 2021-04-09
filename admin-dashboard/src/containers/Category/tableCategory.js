import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import {
  Checkbox,
  Collapse,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import RowCategory from "./rowCategory";
import Modal from "../../components/UI/Modal";
import { Button } from "react-bootstrap";

const useStyles = makeStyles({
  root: {
    width: "600px",
    margin: "0 auto",
  },
});

export default function TableCategory({ location }) {
  const categories = useSelector((state) => state.category.categories);
  const [expand, setExpand] = useState([]);
  const classes = useStyles();

  const [show, setShow] = useState(false);
  const closeModal = () => setShow(false);
  const showModal = () => {
    setShow(true);
    /* if (checked.length > 0) {
      
    } else {
      alert("You must select one item at least");
    } */
  };

  const enumExpandedCategories = useCallback(
    (categories, categoriesState = []) => {
      for (let category of categories) {
        if (category.childrenCategories.length > 0)
          categoriesState.push({
            _id: category._id,
            name: category.name,
            expanded: false,
          });
        category.childrenCategories.length > 0 &&
          enumExpandedCategories(category.childrenCategories, categoriesState);
      }
      setExpand(categoriesState);
    },
    []
  );

  useEffect(() => {
    enumExpandedCategories(categories);
  }, [categories, enumExpandedCategories]);

  const handleExpand = (index) => {
    let test = [...expand];
    let indexCategory = test.findIndex((item) => item._id === index);
    test[indexCategory].expanded = !test[indexCategory].expanded;
    setExpand(test);
  };

  const renderCategories = (categories) => {
    let myCategories = [];
    for (const category of categories) {
      const isParent = category.childrenCategories.length > 0;
      let indexCategory = expand.findIndex((item) => category._id === item._id);
      myCategories.push(
        <>
          <RowCategory
            key={category._id}
            {...category}
            open={
              isParent && expand[indexCategory]
                ? expand[indexCategory].expanded
                : null
            }
            handleExpand={() => handleExpand(category._id)}
            location={location}
            showModal={showModal}
          />
          {isParent && (
            <TableRow>
              <TableCell style={{ padding: 0 }} colSpan={6}>
                <Collapse
                  in={
                    isParent && expand[indexCategory]
                      ? expand[indexCategory].expanded
                      : null
                  }
                  timeout="auto"
                  unmountOnExit
                >
                  <Table>
                    <TableBody>
                      {renderCategories(category.childrenCategories)}
                    </TableBody>
                  </Table>
                </Collapse>
              </TableCell>
            </TableRow>
          )}
        </>
      );
    }
    return myCategories;
  };

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

  return (
    <>
      <TableContainer component={Paper} className={classes.root}>
        <Table aria-label="collapsible table" size="small">
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell align="center">Edit / Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{renderCategories(categories)}</TableBody>
        </Table>
      </TableContainer>
      <Modal
        title="Delete category"
        show={show}
        closeModal={closeModal}
        footer={renderModalFooter()}
      >
        Do you want really to delete this category ?
      </Modal>
    </>
  );
}
