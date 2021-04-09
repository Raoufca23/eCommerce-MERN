import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
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
import { Link } from "react-router-dom";

/* function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      { date: "2020-01-05", customerId: "11091700", amount: 3 },
      { date: "2020-01-02", customerId: "Anonymous", amount: 1 },
    ],
  };
} */

/* const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 3.99),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3, 4.99),
  createData("Eclair", 262, 16.0, 24, 6.0, 3.79),
  createData("Cupcake", 305, 3.7, 67, 4.3, 2.5),
  createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5),
]; */

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
    "& td:first-child": {
      display: "flex",
      padding: "16px 4px",
    },
  },
});

const Row = (props) => {
  const classes = useRowStyles();
  console.log(props);
  // const [open, setOpen] = useState(false);
  const renderRow = ({
    name,
    type,
    childrenCategories,
    open,
    setOpen,
    index,
  }) => {
    return (
      <>
        <TableRow className={classes.root}>
          <TableCell padding="checkbox">
            <Checkbox />
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open[index])}
            >
              {childrenCategories.length > 0 ? (
                open[index] ? (
                  <KeyboardArrowDownIcon />
                ) : (
                  <KeyboardArrowRightIcon />
                )
              ) : null}
            </IconButton>
          </TableCell>
          <TableCell /* component="th" scope="row" */>{name}</TableCell>
          <TableCell align="left">{type}</TableCell>
          <TableCell align="center">
            <Link to="/edit">
              <IconButton aria-label="edit">
                <EditIcon color="primary" />
              </IconButton>
            </Link>
            <IconButton aria-label="delete">
              <DeleteIcon color="error" />
            </IconButton>
          </TableCell>
        </TableRow>
        {childrenCategories.length > 0 && (
          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <Table>
                  <TableBody>
                    <TableRow>
                      {childrenCategories.map((item) =>
                        renderRow({ ...item, setOpen, open })
                      )}
                    </TableRow>
                  </TableBody>
                </Table>
              </Collapse>
            </TableCell>
          </TableRow>
        )}
      </>
    );
  };
  return <>{renderRow(props)}</>;
};

const CollapsedRow = (props) => {
  const category = useSelector((state) => state.category);

  const renderCollapsedRow = () => {
    // console.log(props);
    return (
      <>
        {/* <Row {...props} open={open} setOpen={setOpen} /> */}
        {/* {props.childrenCategories.length > 0 && (
          <TableRow>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
              {props.childrenCategories.map((item) => (
                <Row {...item} open={open} setOpen={setOpen} />
              ))}
              <Collapse in={open} timeout="auto" unmountOnExit></Collapse>
            </TableCell>
          </TableRow>
        )} */}
      </>
    );
  };
  return <>{renderCollapsedRow()}</>;
};

const useStyles = makeStyles({
  root: {
    width: "600px",
    margin: "0 auto",
  },
});

export default function NewTable() {
  const classes = useStyles();
  const category = useSelector((state) => state.category);
  const [open, setOpen] = useState(false);

  // Array(category.categories.length).fill(false)

  const renderCategories = (categories) => {
    let category;
    if (categories && categories.length > 0) {
      category = categories.map((item, index) => {
        /* if (item.children.length > 0) {
          return <CollapsedRow {...item} />;
        } */
        if (item.childrenCategories.length > 0) {
          return (
            <>
              <Row key={item._id} {...item} open={open} setOpen={setOpen}>
                <TableRow key={item._id}>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                  >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                      {renderCategories(item.children)}
                    </Collapse>
                  </TableCell>
                </TableRow>
              </Row>
            </>
          );
        }
        return (
          <Row
            key={item._id}
            {...item}
            open={open[index]}
            setOpen={setOpen}
            index={index}
          />
        );
        // return <CollapsedRow key={item._id} {...item} />;
      });
    }
    return category;
  };

  return (
    <TableContainer component={Paper} className={classes.root}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox />
            </TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell align="center">Edit / Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{renderCategories(category.categories)}</TableBody>
      </Table>
    </TableContainer>
  );
}
