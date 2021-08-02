/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import ThumbnailGrid from './ThumbnailGrid.jsx';
import ActiveImage from './ActiveImage.jsx';
import ZoomImage from './ZoomImage.jsx';

const imageViewStyles = {
  background: '#ddd',
  height: '500px',
  width: '1024px',
  margin: '40px auto',
  display: 'flex',
};

const getCurrentImage = (currentStyle, idx) => (currentStyle.photos[idx] ? currentStyle.photos[idx].url : 'no photo found');

const placeHolderStyle = {
  style_id: 109986,
  name: 'Forest Green & Black',
  photos: [
    {
      thumbnail_url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
      url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
    },
  ],
};

const defaultImageIdx = 0;

function ImageView(props) {
  // const [currentImageIdx, setCurrentImageIdx] = useState('currentImageIdx');
  let currentStyle = placeHolderStyle;
  const imageIdx = defaultImageIdx;

  // if (props.currentImageIdx === undefined || typeof props.currentImageIdx === 'string') {
  //   props.setCurrentImageIdx(imageIdx);
  // }
  // if styles are loaded change to styles to reflect that
  if (props.currentStyle !== undefined && typeof props.currentStyle !== 'string') {
    currentStyle = props.currentStyle;
  }

  return (
    <div style={imageViewStyles}>
      {/* Left Side */}
      <div style={{ flex: '1 1 10%' }}>
        {/* NOTE possibly change to use a state currenStyle */}
        <ThumbnailGrid
          productId={props.productId}
          thumbnails={currentStyle.photos}
          currentImageIdx={props.currentImageIdx}
          setCurrentImageIdx={props.setCurrentImageIdx}
        />
      </div>

      {/* Right Side */}
      <div style={{ flex: '1 1 90%' }}>
        <ActiveImage
          imageSrc={getCurrentImage(currentStyle, typeof props.currentImageIdx === 'string' ? imageIdx : props.currentImageIdx)}
          numImages={currentStyle.photos.length}
          currentImageIdx={props.currentImageIdx}
          setCurrentImageIdx={props.setCurrentImageIdx}
          setDisplayType={props.setDisplayType}
          displayType={props.displayType}
        />
      </div>

    </div>
  );
}

export default ImageView;
