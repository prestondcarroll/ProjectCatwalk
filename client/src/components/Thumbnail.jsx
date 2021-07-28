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

// imageIdx={index}
// currentImageIdx={props.currentImageIdx}
// setCurrentImageIdx={props.setCurrentImageIdx}

// set click listener on thumbnail
// if clicked execute setCurrentImageIdx with index passed from props

// add highlighted to thumbnail if currentImageIdx === index from props

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
            }}
            alt="no_img"
          />

          <FaCheck
            size={15}
            style={{
              fill: '#a7ffa4', position: 'absolute', left: '.01em', bottom: '.25em',
            }}
          />
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
        }}
        alt="no_img"
      />
    </div>
  );
}

export default Thumbnail;
