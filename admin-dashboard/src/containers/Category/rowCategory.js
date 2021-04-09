import React, { useState } from "react";
import {
  Checkbox,
  TableCell,
  TableRow,
  Box,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    "& > td": {
      padding: "6px 24px 6px 16px",
    },
  },
  edit: {
    "&": {
      color: "#ffb74d",
    },
  },
});

export default function RowCategory({
  _id,
  name,
  type,
  childrenCategories,
  open,
  handleExpand,
  location,
  showModal,
}) {
  const [checked, setChecked] = useState(false);
  const classes = useStyles();

  const handleCheck = (e) => {
    console.log(e.target.value);
    setChecked(!checked);
  };

  const handleEditCategory = (e) => {
    e.preventDefault();
    console.log(checked);
  };

  /* const handleDeleteCategory = (e) => {
    e.preventDefault();
  }; */

  return (
    <>
      <TableRow className={classes.root}>
        <TableCell width="120px">
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
              <EditIcon /* color="primary" */ className={classes.edit} />
            </IconButton>
          </Link>
          <IconButton aria-label="delete" onClick={showModal}>
            <DeleteIcon color="error" />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
}
