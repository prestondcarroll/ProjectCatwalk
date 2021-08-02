/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { FaCheck, FaBacon, FaEgg } from 'react-icons/fa';

const styles = {
  height: '100%',
  width: '100%',

  // background: '#333',
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
          <FaBacon
            size={50}
            style={{
              fill: '#df3f32',
            }}
          />

          <FaEgg
            size={15}
            style={{
              fill: '#fbfbf8', position: 'absolute', left: '2em', bottom: '2em',
            }}
          />
        </span>
      </div>
    );
  }

  return (
    <div onClick={handleThumbClick} style={styles}>
      <FaBacon
        size={50}
        style={{
          fill: '#df3f32',
        }}
      />
    </div>
  );
}

export default Thumbnail;
