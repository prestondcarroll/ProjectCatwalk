/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
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
import ImageView from './ImageView.jsx';
import CartSelector from './CartSelector.jsx';
import ExpandedView from './ExpandedView.jsx';

const imageViewStyles = {
  background: '#ddd',
  // height: '500px',
  // width: '1024px',
  margin: '40px auto',
  display: 'flex',
};

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
  let result = data[0];
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
  const [displayType, setDisplayType] = useState('visible');
  const [currentImageIdx, setCurrentImageIdx] = useState('currentImageIdx');

  useEffect(() => {
    $.ajax({
      method: 'GET',
      url: `http://localhost:3000/reviews/meta?product_id=${props.productId}`,
      success: (data) => {
        setReviewCount(calculateReviewCount(data));
        setAverage(calculateAverage(data));
      },
      error: (err) => {
        // console.log(err);
      },
    });
  }, [props.productId]);

  useEffect(() => {
    $.ajax({
      method: 'GET',
      url: `http://localhost:3000/products/${props.productId}`,
      success: (data) => {
        setProductInfo(data);
      },
      error: (err) => {
        // console.log(err);
      },
    });
  }, [props.productId]);

  useEffect(() => {
    $.ajax({
      method: 'GET',
      url: `http://localhost:3000/products/${props.productId}/styles/`,
      success: (styles) => {
        setStylesInfo(styles.results);
        const defaultStyle = getDefaultStyle(styles.results);
        setCurrentStyle(defaultStyle);
        setCurrentPrice(getStylePrice(defaultStyle));
      },
      error: (err) => {
        // console.log(err);
      },
    });
  }, [props.productId]);

  useEffect(() => {
    setCurrentImageIdx(0);
  }, [props.productId]);

  if (displayType === 'none') {
    return (
      <div style={{ flex: '100%' }}>
        <ExpandedView
          currentStyle={currentStyle}
          productId={props.productId}
          setDisplayType={setDisplayType}
          displayType={displayType}
          currentImageIdx={currentImageIdx}
          setCurrentImageIdx={setCurrentImageIdx}
        />
      </div>
    );
  }

  return (
    <div>
      <h3>Overview Section:</h3>

      <div style={imageViewStyles}>
        {/* Left Side */}
        <div style={{ flex: '40%' }}>
          <ImageView
            currentStyle={currentStyle}
            productId={props.productId}
            setDisplayType={setDisplayType}
            displayType={displayType}
            currentImageIdx={currentImageIdx}
            setCurrentImageIdx={setCurrentImageIdx}
          />
          <p>Overview: {productInfo.description}</p>
          <p>Share on Social Media! Link1 Link2 Link3</p>
        </div>

        {/* Right Side */}
        <div style={{ flex: '60%' }}>
          <div style={{ display: 'flex' }}>
            <StarRating rating={reviewAverage} />
            <p>Read all {reviewCount} Reviews: Put LINK here </p>
          </div>

          <h5>{productInfo.category}</h5>
          <h3>{productInfo.name}</h3>
          <p>{'Price: $'}{currentPrice}</p>

          <div style={{ display: 'flex' }}>
            <h4>{'Styles >  '}</h4>
            <p>{currentStyle.name}</p>
          </div>

          <StylesList
            styles={stylesInfo}
            changeStyle={setCurrentStyle}
            changePrice={setCurrentPrice}
            currentStyleID={currentStyle.style_id}
          />

          <CartSelector
            productId={props.productId}
            currentStyleID={currentStyle.style_id}
            currentStyle={currentStyle}
          />

        </div>
      </div>

      <h3>END OF Overview Section</h3>
    </div>
  );
}

export default Overview;
