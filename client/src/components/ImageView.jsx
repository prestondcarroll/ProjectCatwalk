/* eslint-disable no-unused-vars */
import React from 'react';
import ThumbnailGrid from './ThumbnailGrid.jsx';
import ActiveImage from './ActiveImage.jsx';

const imageViewStyles = {
  background: '#ddd',
  height: '500px',
  width: '1024px',
  margin: '40px auto',
  display: 'flex',
};

//pass currentStyle image to active image
//pass stylesinfo to thumbnail grid

//declare state currentImage
//


function ImageView(props) {
  return (
    <div style={imageViewStyles}>
      {/* Left Side */}
      <div style={{ flex: '1 1 25%' }}>
        <ThumbnailGrid />
      </div>

      {/* Right Side */}
      <div style={{ flex: '1 1 75%' }}>
        <ActiveImage />
      </div>

    </div>
  );
}

export default ImageView;
