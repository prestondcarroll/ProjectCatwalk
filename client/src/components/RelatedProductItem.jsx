import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import styled from 'styled-components';

const StyledImage = styled.img`
  width: 260px;
  height: 300px;
`

const RelatedProductItem = (props) => {
  // console.log(props.product);
  return (
    <div>
      <StyledImage src={props.product.results[0].photos[0].thumbnail_url || 'https://via.placeholder.com/260x300'} alt={props.product.name} />
      <h5>{props.product.category}</h5>
      <div>{props.product.name}</div>
      <p>${props.product.default_price}</p>
    </div>
  );
};

export default RelatedProductItem;