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

// Star Rating
// Input:

function Overview() {
  const [reviewMeta, setReviewMeta] = useState('reviewMeta');
  const [reviewAverage, setAverage] = useState('reviewAverage');


  useEffect(() => {
    $.ajax({
      method: 'GET',
      url: 'http://localhost:3000/reviews',
      success: (data) => {
        setReviewMeta(data);
        setAverage(calculateAverage(data));
      },
      error: (err) => {
        // console.log(err);
      },
    });
  }, []);

  return (
    <div>
      <p>Product Overview will be here</p>
      <p>Average is: {reviewAverage}</p>
      <StarRating rating={reviewAverage} />
    </div>
  );
}

export default Overview;
