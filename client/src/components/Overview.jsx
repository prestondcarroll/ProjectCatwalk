/* eslint-disable padded-blocks */
/* eslint-disable no-trailing-spaces */
/* eslint-disable spaced-comment */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import $ from 'jquery';

// Star Rating
// Input:


const calculateAverage = (data) => {
  //for every key in ratings,
  //have running total of every review * 5 stars
  //have running total of every review * respective star rating

  //divide numberstars/ total stars
  //return average

  const { ratings } = data;
  let totalStars = 0;
  let numberStars = 0;
  Object.keys(ratings).forEach((key) => {
    const keyVal = parseInt(key, 10);
    totalStars += ratings[key] * 5;
    numberStars += keyVal * ratings[key];
  });

  const average = (numberStars / totalStars) * 5;
  const rounded = (Math.round(average * 4) / 4).toFixed(2);
  return rounded;

};

function Overview() {
  // Declare a new state variable, which we'll call "count"
  const [reviewMeta, setReviewMeta] = useState('reviewMeta');
  const [reviewAverage, setAverage] = useState('reviewAverage');

  useEffect(() => {
    $.ajax({
      method: 'GET',
      url: 'http://localhost:3000/reviews',
      success: (data) => {
        // console.log('reviews are: ');
        // console.log(data);
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
    </div>
  );
}

export default Overview;
