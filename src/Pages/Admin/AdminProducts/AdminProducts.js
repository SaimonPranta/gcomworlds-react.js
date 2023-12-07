import { useEffect, useState } from "react";
import "./AdminProducts.css";
import AdminProductCart from "../../../Shades/Carts/AdminProductCart/AdminProductCart";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { getCookie } from "../../../Hooks/cookies";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
 
useEffect(() => {
  fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/products/all`, {
    headers: {
      authorization: `Bearer ${getCookie()}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.data) {
        setProducts(data.data);
        setFilterProducts(data.data);
      } else {
      }
    });
}, []);

const seach_handler = (event) => {
  let inputValue =
    event.target.value.toString().length > 0
      ? event.target.value.toString().toLowerCase()
      : "0";

  if (inputValue == 0) {
    setFilterProducts(products);
  } else {
    let currentUser = products.filter((valuee) => {
      let stringValue = valuee.title.toString();
      let title = stringValue.length > 0 ? stringValue.toLowerCase() : "";

      let varifiying = title.includes(inputValue);
      return varifiying;
    });
    setFilterProducts(currentUser);
  }
};
  return (
    <section className="admin-product ">
      <div>
        <h3>Products management</h3>
      </div>
      <div className="search">
        <div>
          <MdProductionQuantityLimits />
          <input type="text" onChange={seach_handler} />
          <div>
            <FaSearch />
          </div>
        </div>
      </div>
      <div>
        <div className="admin-add-btn">
          <NavLink to="/admin/products/add_product">Add Product</NavLink>
        </div>
      </div>
      {filterProducts?.length > 0 ? (
        <div className="porduct-contianer">
          {filterProducts?.length > 0 &&
            filterProducts.map((product) => {
              return <AdminProductCart product={product} key={product._id} />;
            })}
        </div>
      ) : (
        <div className="no-history">
          <p>No Product Available !</p>
        </div>
      )}
    </section>
  );
};

export default AdminProducts;
