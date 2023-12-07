import { useEffect, useState } from "react";
import "./AdminPackges.css";
import AdminProductCart from "../../../Shades/Carts/AdminProductCart/AdminProductCart";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { getCookie } from "../../../Hooks/cookies";
import AdminPackagesCart from "../../../Shades/Carts/AdminPackagesCart/AdminPackagesCart";

const AdminPackges = () => {
  const [packages, setPackages] = useState([]);
  const [filterPackages, setFilterPackages] = useState([]);
 
useEffect(() => {
  fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/packages/all`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.data) {
        setPackages(data.data);
        setFilterPackages(data.data);
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
    setFilterPackages(packages);
  } else {
    let currentUser = packages.filter((valuee) => {
      let stringValue = valuee.title.toString();
      let title = stringValue.length > 0 ? stringValue.toLowerCase() : "";

      let varifiying = title.includes(inputValue);
      return varifiying;
    });
    setFilterPackages(currentUser);
  }
};
  return (
    <section className="admin-product ">
      <div>
        <h3>Packages management</h3>
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
          <NavLink to="/admin/packges/add_spackg">Add Package</NavLink>
        </div>
      </div>
      {filterPackages?.length > 0 ? (
        <div className="porduct-contianer">
          {filterPackages?.length > 0 &&
            filterPackages.map((product) => {
              return <AdminPackagesCart product={product} key={product._id} />;
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

export default AdminPackges; 