import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import styled from 'styled-components';
import StarRating from './StarRating.jsx';
import calculateAverage from '../utils/calculateAverage.js';

const StyledImage = styled.img`
  width: 260px;
  height: 300px;
`
const Card = styled.div`
  border-style: groove;
  margin-right: 50px;
`

const RelatedProductItem = (props) => {
  // console.log(props.product);
  let rating = calculateAverage(props.product.reviews);
  return (
    <Card>
      <StyledImage src={props.product.results[0].photos[0].thumbnail_url || 'https://via.placeholder.com/260x300'} alt={props.product.name} />
      <h5>{props.product.category}</h5>
      <div>{props.product.name}</div>
      <p>${props.product.default_price}</p>
      <StarRating rating={rating}/>
    </Card>
  );
};

export default RelatedProductItem;