import React from 'react';

function AddToCart(props) {

  return (
    <div>
      <button id="atcButton" onClick={props.openMenu}>Add To Cart</button>
    </div>
  );
}

export default AddToCart;
