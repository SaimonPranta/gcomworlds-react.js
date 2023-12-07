import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import {  useParams } from "react-router-dom";
import ProductCart from "../../../Shades/Carts/ProductCart/ProductCart";
import CartSkeleton from "../../../Shades/CartSkeleton/CartSkeleton";
import "./Category.css";
const array = ["", "", "", "", "", "", "", ""];

const Category = () => { 
  const [productsArray, setProductsArray] = useState([]);
  const { CategoryName } = useParams();
  console.log(CategoryName);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/public_product/get_product_by_category`, {
      method: "POST",
      headers: { "content-type": "application/json; charset=UTF-8" },
      body: JSON.stringify({ categoryName: CategoryName }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.data) {
            setProductsArray(data.data)
        }
      });
  }, []);

  return (
    <section className="container-lg">
      <section className="my-5 product-collection">
        <div className="product-section-title d-flex align-items-center">
          <h3>Category <AiOutlineArrowRight /> {CategoryName}</h3>
        </div>
        <div className="inner-product-collection">
          {productsArray?.length > 0
            ? productsArray.map((pd) => {
                return <ProductCart product={pd} key={pd._id} />;
              })
            : array.map((v, i) => {
                return <CartSkeleton btn={true} key={i} />;
              })}
        </div>
      </section>
    </section>
  );
};

export default Category; 