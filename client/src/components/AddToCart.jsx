import React from 'react';

function AddToCart(props) {

  return (
    <div onClick={(event) => {props.trackPageView(event.target.outerHTML, 'Overview')}}>
      <button id="atcButton" onClick={props.openMenu}>Add To Cart</button>
    </div>
  );
}

export default AddToCart;
