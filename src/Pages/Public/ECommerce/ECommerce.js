import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductCart from "../../../Shades/Carts/ProductCart/ProductCart";
import CartSkeleton from "../../../Shades/CartSkeleton/CartSkeleton";
import { addProducts } from "../../../Store/ProductSlice/ProductSlice";
import "./ECommerce.css";
const array = ["", "", "", "", "", "", "", ""];

const ECommerce = () => {
  const products = useSelector((state) => state.products.data);
  const [productPage, setProductPage] = useState(1);
  const [disableProductPage, setDisableProductPage] = useState(true);
  const dispatch = useDispatch()


  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_SERVER_HOST_URL}/public_product/get_product_by_pagination/${productPage}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.data) {
          setDisableProductPage(data.disable);
          dispatch(addProducts(data.data));
        }
      });
  }, [productPage]);
  return (
    <section className="container-lg">
      <section className="my-5 product-collection">
        <div className="product-section-title">
          <h3>E-Commerce</h3>
        </div>
        <div className="inner-product-collection">
          {products?.length > 0
            ? products.map((pd) => {
                return <ProductCart product={pd} key={pd._id} />;
              })
            : array.map((v, i) => {
                return <CartSkeleton btn={true} key={i} />;
              })}
        </div>
        <div className="d-flex justify-content-center  ">
          <ul className="pagination  m-0">
            <li
              className={productPage <= 1 ? "page-item disabled" : "page-item"}
              onClick={() => {
                productPage > 1 && setProductPage((pre) => pre - 1);
              }}
            >
              <Link className="page-link">Previous</Link>
            </li>
            <li
              className={productPage <= 1 ? "page-item disabled" : "page-item"}
              onClick={() => {
                productPage > 1 && setProductPage((pre) => pre - 1);
              }}
            >
              <Link className="page-link">{productPage - 1}</Link>
            </li>
            <li className="page-item active" aria-current="page">
              <Link className="page-link">{productPage}</Link>
            </li>
            <li
              className={
                disableProductPage ? "page-item disabled" : "page-item"
              }
              onClick={() => {
                !disableProductPage && setProductPage((pre) => pre + 1);
              }}
            >
              <Link className="page-link">{productPage + 1}</Link>
            </li>
            <li
              className={
                disableProductPage ? "page-item disabled" : "page-item"
              }
              onClick={() => {
                !disableProductPage && setProductPage((pre) => pre + 1);
              }}
            >
              <Link className="page-link">Next</Link>
            </li>
          </ul>
        </div>
      </section>
    </section>
  );
};

export default ECommerce;
