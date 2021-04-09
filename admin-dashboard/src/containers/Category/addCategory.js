import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Input from "../../components/UI/Input";

export default function AddCategory() {
  const category = useSelector((state) => state.category);
  const [categoryName, setCategoryName] = useState("");
  const [categoryParentID, setCategoryParentID] = useState("");
  const [categoryImage, setCategoryImage] = useState("");

  const renderCategoriesOption = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.childrenCategories.length > 0) {
        renderCategoriesOption(category.childrenCategories, options);
      }
    }
    return options;
  };

  const addCategory = (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", categoryName);
    form.append("parentID", categoryParentID);
    form.append("categoryImage", categoryImage);
    // dispatch(addCategory(form));
    setCategoryName("");
    setCategoryImage("");
    setCategoryParentID("");
  };

  return (
    <Container>
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
      <Button variant="success" onClick={addCategory}>
        Add
      </Button>
      <Link to="/category">
        <Button variant="danger">Cancel</Button>
      </Link>
    </Container>
  );
}
