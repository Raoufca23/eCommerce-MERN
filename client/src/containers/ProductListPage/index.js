import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout";
import { generateFilePathImg } from "../../config";
import { getProductBySlug } from "../../store/actions";
import "./style.css";

export default function ProductListPage({ match }) {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const [productByPrice] = useState({
    under100: 100,
    under300: 300,
    under600: 600,
    under1000: 1000,
  });

  useEffect(() => {
    dispatch(getProductBySlug(match.params.slug));
  }, [dispatch, match]);

  const filterProductByPrice = (products) => {
    let filtredProducts = {};
    let oldKey = 0;
    /* eslint-disable */
    for (const [key, value] of Object.entries(productByPrice)) {
      filtredProducts[key] = products.filter(
        (product) => oldKey < product.price && product.price <= value
      );
      /* eslint-ensable */
      oldKey = productByPrice[key];
    }
    return filtredProducts;
  };

  const renderProducts = (products) => {
    const filtredProducts = filterProductByPrice(products);
    console.log(filtredProducts);
    return Object.entries(filtredProducts).map(([key, value], index) => {
      if (value.length === 0) return null;
      return (
        <div className="card" key={index}>
          <div className="cardHeader">
            <div>
              {match.params.slug} mobiles under {productByPrice[key]}€{" "}
            </div>
            <button>View all</button>
          </div>
          <div className="cardBody" style={{ display: "flex" }}>
            {value.map((product) => (
              <div className="productContainer" key={product._id}>
                <div className="productImgContainer">
                  <img
                    src={generateFilePathImg(product.productPictures[0].img)}
                    alt=""
                  />
                </div>
                <div className="productInfo">
                  <div className="title">{product.name}</div>
                  <div>
                    <span>4.3</span>&nbsp;
                    <span>3345</span>
                  </div>
                  <div className="productPrice">{product.price}€</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    });
  };
  return <Layout>{renderProducts(product.products)}</Layout>;
}
