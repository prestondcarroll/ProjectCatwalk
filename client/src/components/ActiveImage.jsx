/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const styles = {
  height: '100%',
  width: '100%',
  margin: '-5px',
  // background: '#333',
  position: 'relative',
};

// put left arrow if image idx > 0
// put right arrow if imageidx < numImages - 1

// if left arrow clicked
//   set currentImgIdx to less than 1
// if right arrow clicked
//   set currentImgIdx to 1 greater

function ActiveImage(props) {
  const needLeftArrow = props.currentImageIdx > 0;
  const needRightArrow = props.currentImageIdx < props.numImages - 1;
  const needLeftAndRight = needLeftArrow && needRightArrow;
  const needOnlyLeftArrow = needLeftArrow && !needLeftAndRight;
  const needOnlyRightArrow = needRightArrow && !needLeftAndRight;

  const handlePressLeft = () => {
    const newIdx = props.currentImageIdx - 1;
    props.setCurrentImageIdx(newIdx);
  };

  const handlePressRight = () => {
    const newIdx = props.currentImageIdx + 1;
    props.setCurrentImageIdx(newIdx);
  };

  return (
    <div style={styles}>
      {needOnlyLeftArrow
        && (
          <div style={styles}>
            <span>
              <div style={styles}>
                <img
                  src={props.imageSrc}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  alt="no_img"
                />
              </div>

              <FaAngleLeft
                onClick={handlePressLeft}
                size={50}
                style={{
                  fill: '#FF0000', position: 'absolute', left: '0.20em', bottom: '15em',
                }}
              />
            </span>
          </div>
        )}

      {needOnlyRightArrow
        && (
          <div style={styles}>
            <span>
              <div style={styles}>
                <img
                  src={props.imageSrc}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  alt="no_img"
                />
              </div>

              <FaAngleRight
                onClick={handlePressRight}
                size={50}
                style={{
                  fill: '#FF0000', position: 'absolute', left: '54em', bottom: '15em',
                }}
              />
            </span>
          </div>
        )}

      {needLeftAndRight
        && (
          <div style={styles}>
            <span>
              <div style={styles} >
                <img
                  src={props.imageSrc}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  alt="no_img"
                />
              </div>

              <FaAngleLeft
                onClick={handlePressLeft}
                size={50}
                style={{
                  fill: '#FF0000', position: 'absolute', left: '0.20em', bottom: '15em',
                }}
              />

              <FaAngleRight
                onClick={handlePressRight}
                size={50}
                style={{
                  fill: '#FF0000', position: 'absolute', left: '54em', bottom: '15em',
                }}
              />
            </span>
          </div>
        )}
    </div>
  );
}

export default ActiveImage;
