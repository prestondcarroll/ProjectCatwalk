import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import $ from 'jquery';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 25%;
  margin-left: 25%;
  font-family: Helvetica, Arial, sans-serif;
`
const RelatedProductItem = (props) => {
  console.log(props.product);
  return (
    <Container>
      <img src={props.product.results[0].photos[0].thumbnail_url} alt="No Image"/>
      <h5>{props.product.category}</h5>
      <div>{props.product.name}</div>
      <p>${props.product.default_price}</p>
    </Container>
  );
};

export default RelatedProductItem;