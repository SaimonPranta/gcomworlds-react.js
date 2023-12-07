import React, { useState } from "react";
import './style.scss'
import { AiOutlineSearch } from "react-icons/ai";
import SearchProductView from '../../../../Shades/SearchProductView/SearchProductView'

const Index = () => {
  const [allProducts, setAllProducts] = useState([]);

const handleSearch = (e) => {
  const value = e.target.value;
  if (value.length < 2) {
    return setAllProducts([]);
  }

  fetch(
    `${process.env.REACT_APP_SERVER_HOST_URL}/public_product/search_product/${value}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.data) {
        setAllProducts(data.data);
      } else {
      }
    });
};


  return (
    <div>
      <div className="search-container-section">
        <AiOutlineSearch />
        <input
          type="text"
          placeholder="Search Products" 
          onChange={handleSearch}
        />
        <button>Search</button>
      </div>
      {allProducts.length > 0 && (
        <SearchProductView allProducts={allProducts} />
      )}
    </div>
  );
};

export default Index;
