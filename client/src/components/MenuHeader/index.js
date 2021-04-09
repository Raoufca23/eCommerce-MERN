import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../store/actions";
import "./style.css";

export default function MenuHeader() {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const renderCategories = (categories) => {
    let category = [];
    for (let cate of categories) {
      category.push(
        <li key={cate._id}>
          {cate.parentID ? (
            <a href={cate.slug}>{cate.name}</a>
          ) : (
            <span>{cate.name}</span>
          )}
          {cate.children.length > 0 ? (
            <ul> {renderCategories(cate.children)} </ul>
          ) : null}
        </li>
      );
    }
    return category;
  };

  return (
    <div className="menuHeader">
      <ul>
        {category.categories.length > 0 &&
          renderCategories(category.categories)}
      </ul>
    </div>
  );
}
