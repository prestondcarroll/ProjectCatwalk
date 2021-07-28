/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import styled from 'styled-components';
import QA from './QA.jsx';
import Overview from './Overview.jsx';
import RelatedProduct from './RelatedProduct.jsx';
import Outfit from './Outfit.jsx';


// should put default back to 20100 before pull request
const DEFAULT_PRODUCT_ID = 20100;

const App = () => {
  const [productId, setProductId] = useState(DEFAULT_PRODUCT_ID);
  const [outfits, setOutfits] = useState([]);

  useEffect(() => {
    $.ajax({
      method: 'GET',
      url:`http://localhost:3000/products/20102/related/`,
      success: (products) => {
        // console.log(products);
        setOutfits(products);
      },
      error: (err) => {
        // console.log(err);
      }
    });
  }, []);

  const handleChangeOverview = (productId) => {
    // console.log('productId', productId)
    setProductId(productId)
  }

  return (
    <div>
      <Overview productId={productId} />
      <RelatedProduct productId={productId} handleChangeOverview={handleChangeOverview} />
      <Outfit outfits={outfits} productId={productId} />
      <QA productId={productId} />
    </div>
  );
};

export default App;
