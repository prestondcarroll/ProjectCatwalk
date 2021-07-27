import React, { useState, useEffect } from 'react';
import RelatedProductItem from './RelatedProductItem.jsx';
import styled from 'styled-components';
import $ from 'jquery';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  font-family: Helvetica, Arial, sans-serif;
`

const RelatedProduct = (props) => {
  const [realatedProducts, setRealatedProducts] = useState([]);
  // const [productReviews, setProductReviews] = useState({});

  useEffect(() => {
    $.ajax({
      method: 'GET',
      url:`http://localhost:3000/products/${props.productId}/related/`,
      success: (products) => {
        // console.log(products);
        setRealatedProducts(products);
      },
      error: (err) => {
        // console.log(err);
      }
    });
  }, []);

  return (
    <div>
    <h5>RELATED PRODUCTS</h5>
    <Container>
      {realatedProducts.map(product =>
       <RelatedProductItem product={product} />
      )}
    </Container>
    </div>
  );
}

export default RelatedProduct;