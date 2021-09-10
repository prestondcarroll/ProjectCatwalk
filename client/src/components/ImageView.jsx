import React, { useState, useEffect } from 'react';
import ThumbnailGrid from './ThumbnailGrid.jsx';
import ActiveImage from './ActiveImage.jsx';
import ZoomImage from './ZoomImage.jsx';

const imageViewStyles = {
  height: '650px',
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
      thumbnail_url: '',
      url: '',
    },
  ],
};

const defaultImageIdx = 0;

function ImageView(props) {
  let currentStyle = placeHolderStyle;
  const imageIdx = defaultImageIdx;

  // if styles are loaded change to styles to reflect that
  if (props.currentStyle !== undefined && typeof props.currentStyle !== 'string') {
    currentStyle = props.currentStyle;
  }

  return (
    <div style={imageViewStyles}>
      {/* Left Side */}
      <div style={{ flex: '1 1 10%' }}>
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
