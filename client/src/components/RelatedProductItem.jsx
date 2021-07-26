import React from 'react';

const RelatedProductItem = (props) => {
  // console.log(props.product);
  return (
    <div>
      <h5>CATEGORY</h5>
      <div>{props.product.name}</div>
      <p>${props.product.default_price}</p>
    </div>
  );
};

export default RelatedProductItem;