/* eslint-disable no-restricted-globals */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
// draw one star icon on top of the other to get a black border
// yellow: #ffc107
// gray: #e4e5e9

const StarRating = (props) => {
  const wholeNum = Math.floor(props.rating);
  let decimalStar = 0.0;
  let wholeStarNum = 1;
  let greyStarNum = 0;
  let insetStr = 'inset(0 0 0 0)';
  if (!isNaN(wholeNum)) {
    wholeStarNum = wholeNum;
    decimalStar = props.rating - wholeNum;
    if (decimalStar === 0.0) {
      insetStr = 'inset(0 0 0 0)';
    } else if (decimalStar === 0.25) {
      insetStr = 'inset(0 62% 0 0)';
    } else if (decimalStar === 0.50) {
      insetStr = 'inset(0 50% 0 0)';
    } else if (decimalStar === 0.75) {
      insetStr = 'inset(0 38% 0 0)';
    }

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
