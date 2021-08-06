/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { FaCheck, FaCircle } from 'react-icons/fa';

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
          {/* <FaCircle
            size={50}
            style={{
              fill: '#525252',
            }}
          /> */}

          <FaCircle
            size={30}
            style={{
              fill: '#525252', position: 'absolute', left: '-0.5em', bottom: '3.65em',
            }}
          />
        </span>
      </div>
    );
  }

  return (
    <div onClick={handleThumbClick} style={styles}>
      <FaCircle
        size={15}
        style={{
          fill: '#525252',
        }}
      />
    </div>
  );
}

export default Thumbnail;
