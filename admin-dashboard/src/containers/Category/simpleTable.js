import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

import {
  Box,
  Checkbox,
  Collapse,
  IconButton,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

/* const useRowStyles = makeStyles({
  root: {
     "& > *": {
      borderBottom: "unset",
    },
    "& td:first-child": {
      display: "flex",
      // justifyContent: "center",
      padding: "16px 4px",
      // width: "auto",
    },
  },
  delBtn: {
    "&": {
      display: "flex",
    },
  },
}); */

const RowData = ({
  _id,
  name,
  type,
  childrenCategories,
  open,
  // setOpen,
  handleExpand,
  location,
}) => {
  const [checked, setChecked] = useState(false);

  const handleCheck = (e) => {
    console.log(e.target.value);
    setChecked(!checked);
  };

  const handleEditCategory = (e) => {
    e.preventDefault();
    console.log(checked);
  };

  const handleDeleteCategory = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <TableRow>
        <TableCell width="105px">
          <Checkbox
            color="primary"
            checked={checked}
            onChange={handleCheck}
            value={_id}
          />
          {childrenCategories.length > 0 && (
            <Box component="span">
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={handleExpand}
              >
                {childrenCategories.length > 0 ? (
                  open ? (
                    <KeyboardArrowDownIcon />
                  ) : (
                    <KeyboardArrowRightIcon />
                  )
                ) : null}
              </IconButton>
            </Box>
          )}
        </TableCell>
        <TableCell width="200px">{name}</TableCell>
        <TableCell width="100px">{type}</TableCell>
        <TableCell align="center">
          <Link
            to={`${location.pathname}/edit/${_id}`}
            onClick={handleEditCategory}
          >
            <IconButton aria-label="edit">
              <EditIcon color="primary" />
            </IconButton>
          </Link>
          <IconButton aria-label="delete" onClick={handleDeleteCategory}>
            <DeleteIcon color="error" />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
};

const useStyles = makeStyles({
  root: {
    width: "600px",
    margin: "0 auto",
  },
});

export default function SimpleTable({ location }) {
  const categories = useSelector((state) => state.category.categories);
  const [expand, setExpand] = useState([]);

  const classes = useStyles();

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
    // test[index] = !test[index];
    // setOpen(test);
  };

  const renderCategories = (categories) => {
    let myCategories = [];
    for (const category of categories) {
      const isParent = category.childrenCategories.length > 0;
      let indexCategory = expand.findIndex((item) => category._id === item._id);
      myCategories.push(
        <>
          <RowData
            key={category._id}
            {...category}
            open={
              isParent && expand[indexCategory]
                ? expand[indexCategory].expanded
                : null
            }
            handleExpand={() => handleExpand(category._id)}
            location={location}
          />
          {
            isParent && (
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
            )
            /* renderCategories(category.childrenCategories, category._id) */
          }
        </>
      );
    }
    return myCategories;
  };

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table aria-label="collapsible table">
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
  );
}
