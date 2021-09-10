import React, { useState, useEffect } from 'react';
import ActiveImage from './ActiveImage.jsx';
import IconGrid from './IconGrid.jsx';
import ZoomImage from './ZoomImage.jsx';

const imageViewStyles = {
  background: '#281761',
  height: '700px',
  width: '1000px',
  display: 'flex',
  flexDirection: 'column',
};

const Container = {
  width: '78%',
  height: '100%',
  display: 'flex',
  paddingLeft: '10em',
  alignItems: 'center',
  justifyContent: 'center',
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

function ExpandedView(props) {
  let currentStyle = placeHolderStyle;
  const imageIdx = defaultImageIdx;

  if (props.currentImageIdx === undefined || typeof props.currentImageIdx === 'string') {
    props.setCurrentImageIdx(imageIdx);
  }
  // if styles are loaded change to styles to reflect that
  if (props.currentStyle !== undefined && typeof props.currentStyle !== 'string') {
    currentStyle = props.currentStyle;
  }

  return (
    <div style={Container}>
    <div style={imageViewStyles}>

      {/* Right Side */}
      <div style={{ flex: '1 1 90%' }}>
        <ZoomImage
          imageSrc={getCurrentImage(currentStyle, typeof props.currentImageIdx === 'string' ? imageIdx : props.currentImageIdx)}
          numImages={currentStyle.photos.length}
          currentImageIdx={props.currentImageIdx}
          setCurrentImageIdx={props.setCurrentImageIdx}
          setDisplayType={props.setDisplayType}
          displayType={props.displayType}
        />
      </div>

      {/* Left Side */}
      <div style={{ flex: '1 1 10%' }}>
        <IconGrid
          productId={props.productId}
          thumbnails={currentStyle.photos}
          currentImageIdx={props.currentImageIdx}
          setCurrentImageIdx={props.setCurrentImageIdx}
        />
      </div>
    </div>
    </div>
  );
}

export default ExpandedView;
