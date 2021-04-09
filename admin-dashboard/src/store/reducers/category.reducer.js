import { categoryConstants } from "../actions/constants";

const initialState = {
  loading: false,
  message: "",
  error: null,
  categories: [],
};

const addNewCategory = (categories, category) => {
  if (!category.parentID) {
    const { _id, name, slug } = category;
    return categories.push({ _id, name, slug, children: [] });
  }
  return categories.map((cate) => {
    if (cate._id === category.parentID) {
      const { _id, name, slug } = category;
      cate.children.push({ _id, name, slug, children: [] });
    }
    if (cate.children && cate.children.length > 0)
      addNewCategory(cate.children, category);
    return cate;
  });
};

const manageCateogries = (state = initialState, action) => {
  let nextState;
  // console.log(action);
  switch (action.type) {
    case categoryConstants.GET_CATEGORIES_REQUEST:
      nextState = {
        ...state,
        loading: true,
      };
      return nextState || state;
    case categoryConstants.GET_CATEGORIES_SUCCESS:
      nextState = {
        ...state,
        categories: action.payload,
        error: null,
        loading: false,
      };
      return nextState || state;
    case categoryConstants.GET_CATEGORIES_FAILURE:
      nextState = {
        ...state,
        message: "",
        error: action.payload.error,
        loading: false,
      };
      return nextState || state;

    case categoryConstants.ADD_CATEGORY_REQUEST:
      nextState = {
        ...state,
        loading: true,
      };
      return nextState || state;
    case categoryConstants.ADD_CATEGORY_SUCCESS:
      const updatedCategories = addNewCategory(
        state.categories,
        action.payload.category
      );
      console.log(updatedCategories);
      nextState = {
        ...state,
        // todo
        loading: false,
      };
      return nextState || state;
    case categoryConstants.ADD_CATEGORY_FAILURE:
      nextState = {
        ...state,
        /* message: "",
        error: action.payload.error, */
        loading: false,
      };
      return nextState || state;

    default:
      return state;
  }
};

export default manageCateogries;
