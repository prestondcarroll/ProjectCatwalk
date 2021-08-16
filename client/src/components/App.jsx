/* eslint-disable import/extensions */
import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import styled from 'styled-components';
import QA from './QA.jsx';
import Overview from './Overview.jsx';
import RelatedProduct from './RelatedProduct.jsx';
import Outfit from './Outfit.jsx';
const SERVER_ENDPOINT = require('../../client.config.js');

// should put default back to 20100 before pull request
const DEFAULT_PRODUCT_ID = 43377;

const App = ({ trackPageView }) => {
  const [productId, setProductId] = useState(DEFAULT_PRODUCT_ID);
  const [outfits, setOutfits] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem('outfits')) {
      localStorage.setItem('outfits', JSON.stringify([]));
    }
    setOutfits(JSON.parse(localStorage.getItem('outfits')));
  }, []);

  const handleChangeOverview = (productId) => {
    setProductId(productId)
  }

  const handleAddOutfits = () => {
    $.ajax({
      method: 'GET',
      url: `${SERVER_ENDPOINT}/fullProducts/${productId}`,
      success: (product) => {
        const currentOutfits = JSON.parse(localStorage.getItem('outfits'))
        if (currentOutfits.map(fullProduct => fullProduct.id).indexOf(productId) === -1) {
          currentOutfits.push(product)
          localStorage.setItem('outfits', JSON.stringify(currentOutfits))
          setOutfits(JSON.parse(localStorage.getItem('outfits')))
        }
      },
      error: (err) => {
        // console.log(err);
      },
    });
  };

  const handleDeleteOutfit = (deleteId) => {
    let products = JSON.parse(localStorage.getItem('outfits'));
    products = products.filter((product) => product.id !== deleteId);
    localStorage.setItem('outfits', JSON.stringify(products));
    setOutfits(products);
  }

  return (
    <div>
      <Overview
        productId={productId}
        trackPageView={trackPageView}
      />
      <RelatedProduct
        productId={productId}
        handleChangeOverview={handleChangeOverview}
        trackPageView={trackPageView}
      />
      <Outfit
        outfits={outfits}
        productId={productId}
        handleAddOutfits={handleAddOutfits}
        handleDeleteOutfit={handleDeleteOutfit}
        trackPageView={trackPageView}
      />
      <QA
        productId={productId}
        trackPageView={trackPageView}
      />
    </div>
  );
};

export default App;
