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
  const handleThumbClick = () => {
    props.setCurrentImageIdx(props.imageIdx);
  };

  if (props.imageIdx === props.currentImageIdx) {
    return (
      <div onClick={handleThumbClick} style={styles}>
        <span>
          <img
            src={props.imgSrc}
            style={{
              width: '100%',
              height: '100%',
              border: '3px solid #17a1b3',
            }}
            alt="no_img"
          />

          <svg>
            <rect fill="#e72169" id="box" x="0" y="0" width="86" height="5" />
          </svg>
        </span>
      </div>
    );
  }

  return (
    <div onClick={handleThumbClick} style={styles}>
      <img
        src={props.imgSrc}
        style={{
          width: '100%',
          height: '100%',
          border: '3px solid #17a1b3',
        }}
        alt="no_img"
      />
    </div>
  );
}

export default Thumbnail;
