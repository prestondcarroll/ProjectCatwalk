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
    if (!localStorage.getItem('outfits')) {
      localStorage.setItem('outfits', JSON.stringify([]))
    }
    setOutfits(JSON.parse(localStorage.getItem('outfits')))
  }, []);

  const handleChangeOverview = (productId) => {
    // console.log('productId', productId)
    setProductId(productId)
  }

  const handleAddOutfits = () => {
    $.ajax({
      method: 'GET',
      url:`http://localhost:3000/fullProducts/${productId}`,
      success: (product) => {
        console.log(product);
        const currentOutfits = JSON.parse(localStorage.getItem('outfits'))
        if (currentOutfits.map(fullProduct => fullProduct.id).indexOf(productId) === -1) {
          currentOutfits.push(product)
          localStorage.setItem('outfits', JSON.stringify(currentOutfits))
          setOutfits(JSON.parse(localStorage.getItem('outfits')))
        }
      },
      error: (err) => {
        // console.log(err);
      }
    });
  }

  return (
    <div>
      <Overview productId={productId} />
      <RelatedProduct productId={productId} handleChangeOverview={handleChangeOverview} />
      <Outfit outfits={outfits} productId={productId} handleAddOutfits={handleAddOutfits} />
      <QA productId={productId} />
    </div>
  );
};

export default App;
