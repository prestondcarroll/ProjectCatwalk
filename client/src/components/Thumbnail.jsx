/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { FaCheck } from 'react-icons/fa';

const styles = {
  height: '100%',
  width: '100%',

  background: '#333',
  position: 'relative',
};

function Thumbnail(props) {
  const handleThumbClickAndTrack = (event) => {
    props.setCurrentImageIdx(props.imageIdx);
    props.trackPageView(event.target.outerHTML, 'Overview');
  };

  if (props.imageIdx === props.currentImageIdx) {
    return (
      <div onClick={handleThumbClickAndTrack} style={styles}>
        <span>
          <img
            src={props.imgSrc}
            style={{
              width: '100%',
              height: '100%',
              border: '3px solid #525252',
            }}
            alt="no_img"
          />

          <svg>
            <rect fill="#525252" id="box" x="0" y="0" width="86" height="5" />
          </svg>
        </span>
      </div>
    );
  }

  return (
    <div onClick={handleThumbClickAndTrack} style={styles}>
      <img
        src={props.imgSrc}
        style={{
          width: '100%',
          height: '100%',
          border: '3px solid #525252',
        }}
        alt="no_img"
      />
    </div>
  );
}

export default Thumbnail;
