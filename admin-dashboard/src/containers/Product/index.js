import React, { useState } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layouts";
import Input from "../../components/UI/Input";
import Modal from "../../components/UI/Modal";
import { addProduct } from "../../store/actions";
import "./styles.css";

export default function Product() {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);
  const product = useSelector((state) => state.product);
  const [show, setShow] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [productName, setProductName] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [categoryID, setCategoryID] = useState("");
  const [productPictures, setProductPictures] = useState([]);
  const [productDetails, setProductDetails] = useState(null);

  const closeModal = () => setShow(false);
  const showModal = () => setShow(true);

  const closeModalDetails = () => setShowDetails(false);
  const showModalDetails = () => setShowDetails(true);

  const handleSubmit = () => {
    const form = new FormData();
    form.append("name", productName);
    form.append("quantity", productQuantity);
    form.append("price", productPrice);
    form.append("description", productDescription);
    form.append("category", categoryID);
    for (let pic of productPictures) {
      form.append("productPicture", pic);
    }
    dispatch(addProduct(form));
    closeModal();
  };

  const handleProductPictures = (e) => {
    setProductPictures([...productPictures, e.target.files[0]]);
  };

  const renderCategoriesOption = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        renderCategoriesOption(category.children, options);
      }
    }
    return options;
  };

  const renderProducts = (products) =>
    products.map((product, index) => {
      return (
        <tr key={product._id} onClick={() => getProductDetails(product)}>
          <td> {index + 1} </td>
          <td> {product.name} </td>
          <td> {product.price} </td>
          <td> {product.quantity} </td>
          <td> {product.category.name} </td>
        </tr>
      );
    });

  const renderAddProductModal = () => {
    return (
      <Modal
        title="Add new product"
        show={show}
        closeModal={closeModal}
        handleSubmit={handleSubmit}
      >
        <Input
          type="text"
          placeholder="Product name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Quantity"
          value={productQuantity}
          onChange={(e) => setProductQuantity(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Price"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Description"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
        />
        <div className="form-group">
          <select
            className="form-control"
            value={categoryID}
            onChange={(e) => setCategoryID(e.target.value)}
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
          {productPictures.length > 0
            ? productPictures.map((pic, index) => (
                <div key={index}> {pic.name} </div>
              ))
            : null}
          <input
            type="file"
            name="productPicture"
            className="form-control"
            onChange={handleProductPictures}
          />
        </div>
      </Modal>
    );
  };

  const getProductDetails = (product) => {
    console.log(product);
    setProductDetails(product);
    showModalDetails();
  };

  const renderProductDetails = () => {
    return (
      productDetails && (
        <Modal
          title="Product details"
          show={showDetails}
          closeModal={closeModalDetails}
          size="lg"
        >
          <Row>
            <Col md="6">
              <label className="key">Name</label>
              <p className="value"> {productDetails.name} </p>
            </Col>
            <Col md="6">
              <label className="key">Category</label>
              <p className="value"> {productDetails.category.name} </p>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <label className="key">Price</label>
              <p className="value"> {productDetails.price} </p>
            </Col>
            <Col md="6">
              <label className="key">Quantity</label>
              <p className="value"> {productDetails.quantity} </p>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <label className="key">Description</label>
              <p className="value"> {productDetails.description} </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <label className="key">Product pictures</label>
              <div style={{ display: "flex" }}>
                {productDetails.productPictures.map((pic) => {
                  return (
                    <div key={pic._id} className="productImgContainer">
                      <img
                        src={`http://localhost:4000/public/${pic.img}`}
                        alt="Product"
                      />
                    </div>
                  );
                })}
              </div>
            </Col>
          </Row>
        </Modal>
      )
    );
  };

  return (
    <Layout sidebar>
      <Container className="mt-1">
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Products</h3>
              <Button onClick={showModal}>Add</Button>
            </div>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col md={12}>
            <Table responsive="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>{renderProducts(product.products)}</tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      {renderAddProductModal()}
      {renderProductDetails()}
    </Layout>
  );
}
