/* eslint-disable no-unused-vars */
import React from 'react';
import Thumbnail from './Thumbnail.jsx'

// const imageViewStyles = {
//   background: '#ddd',
//   height: '500px',
//   width: '1024px',
//   margin: '40px auto',
//   display: 'flex',
// };

function ThumbnailGrid(props) {
  return (
    <div>
      <Thumbnail />
      <Thumbnail />
      <Thumbnail />
      <Thumbnail />
    </div>
  );
}

export default ThumbnailGrid;
