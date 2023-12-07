import React from "react";
import "./style.scss";
import { categoriesArray } from "../../../Layouts/PublicLayoutWithSideNav/Categories/helper/constants";
import { NavLink } from "react-router-dom";

const Index = () => {
  return (
    <div className="categories-page" id="categories-page">
      <div className="title-section">
        <h6>Categories</h6>
      </div>
      <div className="categories-container">
        {[
          ...categoriesArray,
          ...categoriesArray,
          ...categoriesArray,
          ...categoriesArray,
          ...categoriesArray,
          ...categoriesArray,
        ].map((item) => {
          return (
            <div>
              <NavLink to={`/${item.value}`}>
                <img src={item.img} alt="" /> <p>{item.label}</p>
              </NavLink>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Index;
