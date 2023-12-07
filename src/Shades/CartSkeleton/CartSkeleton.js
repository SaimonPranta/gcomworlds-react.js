import React from 'react';
import "./CartSkeleton.css";

const CartSkeleton = ({btn}) => {
    return (
      <div className="cart-skelton">
        <div className="img" />
        <div className="info-container">
          <p />
          <p />
          <p />
          <p />
          <p />
        </div>

        <div className="btn-container">
          {btn && (
            <>
              <p />
              <p />
            </>
          )}
        </div>
      </div>
    );
};

export default CartSkeleton;