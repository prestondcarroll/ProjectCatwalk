/* eslint-disable import/extensions */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import ThumbnailGrid from './ThumbnailGrid.jsx';
import ActiveImage from './ActiveImage.jsx';

const imageViewStyles = {
  background: '#ddd',
  height: '500px',
  width: '1024px',
  margin: '40px auto',
  display: 'flex',
};

// pass currentImage to active image
// pass currentStyle to ThumbnailGrid

// declare state currentImage
//

// take in currentStyle, and index
// return image corresponding to that index
const getCurrentImage = (currentStyle, idx) => currentStyle.photos[idx].url;

const getCurrentImageThumb = (currentStyle, idx) => currentStyle.photos[idx].url;

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
  const [currentImageIdx, setCurrentImageIdx] = useState('currentImageIdx');
  let currentStyle = placeHolderStyle;
  const imageIdx = defaultImageIdx;

  if (currentImageIdx === undefined || typeof currentImageIdx === 'string') {
    setCurrentImageIdx(imageIdx);
  }
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
          thumbnails={currentStyle.photos}
          currentImageIdx={currentImageIdx}
          setCurrentImageIdx={setCurrentImageIdx}
        />
      </div>

      {/* Right Side */}
      <div style={{ flex: '1 1 90%' }}>
        <ActiveImage imageSrc={getCurrentImage(currentStyle, typeof currentImageIdx === 'string' ? imageIdx : currentImageIdx)} />
      </div>

    </div>
  );
}

export default ImageView;
