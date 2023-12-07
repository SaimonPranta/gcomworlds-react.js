import React  from 'react'; 
import './SearchProductView.css'
import SearchViewProductCart from '../Carts/SearchViewProductCart/SearchViewProductCart';

const SearchProductView = ({allProducts}) => {
    return (
        <div className="search-view-products">
          {allProducts.map((product) => {
            return (
              <SearchViewProductCart product={product} key={product._id} />
            );
          })}
        </div>
    );
};

export default SearchProductView;