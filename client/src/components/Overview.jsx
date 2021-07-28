/* eslint-disable import/extensions */
/* eslint-disable padded-blocks */
/* eslint-disable no-trailing-spaces */
/* eslint-disable spaced-comment */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import StarRating from './StarRating.jsx';
import calculateAverage from '../utils/calculateAverage.js';
import StylesList from './StylesList.jsx';

// Star Rating
// Input:

const calculateReviewCount = (data) => {
  const { ratings } = data;
  let total = 0;
  Object.keys(ratings).forEach((key) => {
    total += parseInt(ratings[key], 10);
  });
  return total;
};

const getStylePrice = (data) => {
  if (data.sale_price === null) {
    return data.original_price;
  }
  return data.sale_price;
};

const getDefaultStyle = (data) => {
  let result = null;
  data.forEach((element) => {
    if (element['default?'] === true) {
      result = element;
    }
  });
  return result;
};

function Overview(props) {
  const [reviewCount, setReviewCount] = useState('reviewCount');
  const [reviewAverage, setAverage] = useState('reviewAverage');
  const [productInfo, setProductInfo] = useState('productInfo');
  const [stylesInfo, setStylesInfo] = useState('stylesInfo');
  const [currentStyle, setCurrentStyle] = useState('currentStyle');
  const [currentPrice, setCurrentPrice] = useState('currentPrice');

  useEffect(() => {
    $.ajax({
      method: 'GET',
      url: 'http://localhost:3000/reviews',
      success: (data) => {
        setReviewCount(calculateReviewCount(data));
        setAverage(calculateAverage(data));
      },
      error: (err) => {
        // console.log(err);
      },
    });
  }, []);

  useEffect(() => {
    $.ajax({
      method: 'GET',
      url: 'http://localhost:3000/products',
      success: (data) => {
        setProductInfo(data[0]);
      },
      error: (err) => {
        // console.log(err);
      },
    });
  }, []);

  useEffect(() => {
    $.ajax({
      method: 'GET',
      url: `http://localhost:3000/products/${props.productId}/styles/`,
      success: (styles) => {
<<<<<<< HEAD
        setStylesInfo(styles);
        let defaultStyle = getDefaultStyle(styles.results);
=======
        setStylesInfo(styles.results);
        const defaultStyle = getDefaultStyle(styles.results);
>>>>>>> main
        setCurrentStyle(defaultStyle);
        setCurrentPrice(getStylePrice(defaultStyle));
      },
      error: (err) => {
        // console.log(err);
      },
    });
  }, []);

  return (
    <div>
      <h3>Overview Section:</h3>
      <div style={{ display: 'flex' }}>
        <StarRating rating={reviewAverage} />
        <p>Read all {reviewCount} Reviews: Put LINK here </p>
      </div>

      <h4>{productInfo.category}</h4>
      <h2>{productInfo.name}</h2>
<<<<<<< HEAD
      <p>{"Price: $"}{currentPrice}</p>
=======
      <p>{'Price: $'}{currentPrice}</p>
>>>>>>> main

      <div style={{ display: 'flex' }}>
        <h4>{'Styles >  '}</h4>
        <p>{currentStyle.name}</p>
      </div>

      <p>Overview: {productInfo.description}</p>
      <p>Share on Social Media! Link1 Link2 Link3</p>

<<<<<<< HEAD
=======
      <StylesList
        styles={stylesInfo}
        changeStyle={setCurrentStyle}
        changePrice={setCurrentPrice}
        currentStyleID={currentStyle.style_id}
      />

>>>>>>> main
      <h3>END OF Overview Section</h3>
    </div>
  );
}

export default Overview;
