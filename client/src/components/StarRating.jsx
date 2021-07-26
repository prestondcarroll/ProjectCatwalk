/* eslint-disable no-restricted-globals */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';

// draw all whole yellow stars
// draw grey star, draw a section of a star (1/4th 1/2 3/4th's) on top of the grey star
// draw remaining grey stars until it total stars is 5

// input:props.rating a number rating rounded to the nearest .25

// yellow: #ffc107
// gray: #e4e5e9

const StarRating = (props) => {
  const wholeNum = Math.floor(props.rating);
  let wholeStarNum = 1;
  let decimalStar = 0.0;
  let greyStarNum = 0;
  // string that determines how much of the star to draw
  let insetStr = 'inset(0 0 0 0)';

  // if the rating we received is actually a number, which will happen after it is fetched from db
  if (!isNaN(wholeNum)) {
    wholeStarNum = wholeNum;
    decimalStar = props.rating - wholeNum;
    if (decimalStar === 0.0) {
      insetStr = 'inset(0 0 0 0)';
    } else if (decimalStar === 0.25) {
      // percentages like this look better on the page the strictly 75%
      insetStr = 'inset(0 62% 0 0)';
    } else if (decimalStar === 0.50) {
      insetStr = 'inset(0 50% 0 0)';
    } else if (decimalStar === 0.75) {
      insetStr = 'inset(0 38% 0 0)';
    }

    // calculate number of grey stars to draw
    if (wholeNum < 4) {
      greyStarNum = wholeNum * -1 + 4;
    }
  }

  return (
    <div>

      {[...Array(wholeStarNum)].map(() => <FaStar size={30} style={{ fill: '#ffc107' }} />)}

      <span style={{ display: 'inline-block', position: 'relative' }}>
        <FaStar
          size={30}
          textAnchor="middle"
          alignmentBaseline="middle"
          style={{ fill: '#e4e5e9' }}
        />
        <FaStar
          size={30}
          textAnchor="middle"
          alignmentBaseline="middle"
          style={{
            clipPath: insetStr, fill: '#ffc107', position: 'absolute', left: '.01em', bottom: '.25em',
          }}
        />
      </span>

      {[...Array(greyStarNum)].map(() => <FaStar size={30} style={{ fill: '#e4e5e9' }} />)}

    </div>
  );
};

export default StarRating;
