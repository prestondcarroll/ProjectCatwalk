/* eslint-disable react/button-has-type */
import React from 'react';

function AddToCart(props) {
  const handleClick = () => {
    props.openMenu(true);
  };

  return (
    <div>
      <button id="atcButton" onClick={handleClick}>Add To Cart</button>
    </div>
  );
}

export default AddToCart;
