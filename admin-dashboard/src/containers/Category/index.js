import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layouts";
import Input from "../../components/UI/Input";
import Modal from "../../components/UI/Modal";

import ListCategory from "./listCategory";
import AddCategory from "./addCategory";
import EditCategory from "./editCategory";

import { addCategory } from "../../store/actions";

export default function Category({ location }) {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);
  const [show, setShow] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryParentID, setCategoryParentID] = useState("");
  const [categoryImage, setCategoryImage] = useState("");

  const closeModal = () => setShow(false);
  // const showModal = () => setShow(true);

  const renderCategoriesOption = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.childrenCategories.length > 0) {
        renderCategoriesOption(category.childrenCategories, options);
      }
    }
    return options;
  };

  const handleSubmit = () => {
    const form = new FormData();
    form.append("name", categoryName);
    form.append("parentID", categoryParentID);
    form.append("categoryImage", categoryImage);
    dispatch(addCategory(form));
    setCategoryName("");
    setCategoryImage("");
    setCategoryParentID("");
    closeModal();
  };

  return (
    <Layout sidebar>
      <Router>
        <Switch>
          <Route path={location.pathname} exact component={ListCategory} />
          <Route path={`${location.pathname}/add`} component={AddCategory} />
          <Route
            path={`${location.pathname}/edit/:id`}
            component={EditCategory}
          />
        </Switch>
      </Router>

      <Modal
        title="Add new category"
        show={show}
        closeModal={closeModal}
        handleSubmit={handleSubmit}
      >
        <Input
          type="text"
          placeholder="Category name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <div className="form-group">
          <select
            className="form-control"
            value={categoryParentID}
            onChange={(e) => setCategoryParentID(e.target.value)}
          >
            <option>Select category</option>
            {renderCategoriesOption(category.categories).map((cate) => (
              <option key={cate.value} value={cate.value}>
                {cate.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <input
            type="file"
            name="categoryImage"
            className="form-control"
            onChange={(e) => setCategoryImage(e.target.files[0])}
          />
        </div>
      </Modal>
    </Layout>
  );
}
