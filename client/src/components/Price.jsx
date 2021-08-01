/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
import React from 'react';

function Price(props) {
  let isOnSale = false;
  if (props.currentStyle.sale_price !== null) {
    isOnSale = true;
  }

  if (isOnSale) {
    return (
      <div>
        <div style={{ overflow: 'hidden' }}>
          <p style={{ color: '#e43a36', float: 'left' }}>${props.currentStyle.sale_price} &nbsp;</p>
          <p style={{ textDecoration: 'line-through', float: 'left' }}>${props.currentStyle.original_price} &ensp;</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <p>${props.currentStyle.original_price}</p>
    </div>
  );
}

export default Price;
