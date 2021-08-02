/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const styles = {
  height: '100%',
  width: '100%',
  margin: '-5px',
  position: 'relative',
};

function ActiveImage(props) {
  const needLeftArrow = props.currentImageIdx > 0;
  const needRightArrow = props.currentImageIdx < props.numImages - 1;
  const needLeftAndRight = needLeftArrow && needRightArrow;
  const needOnlyLeftArrow = needLeftArrow && !needLeftAndRight;
  const needOnlyRightArrow = needRightArrow && !needLeftAndRight;

  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.body.style.cursor = hovered ? 'zoom-in' : 'auto';
  }, [hovered]);

  const handlePressLeft = () => {
    props.setCurrentImageIdx(props.currentImageIdx - 1);
  };

  const handlePressRight = () => {
    props.setCurrentImageIdx(props.currentImageIdx + 1);
  };

  const handleClick = () => {
    if (props.displayType === 'visible') {
      props.setDisplayType('none');
    } else {
      props.setDisplayType('visible');
    }
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
                    objectFit: 'scale-down',
                  }}
                  alt="no_img"
                  onPointerOver={() => setHovered(true)}
                  onPointerOut={() => setHovered(false)}
                  onClick={() => handleClick()}
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
                    objectFit: 'scale-down',
                  }}
                  alt="no_img"
                  onPointerOver={() => setHovered(true)}
                  onPointerOut={() => setHovered(false)}
                  onClick={() => handleClick()}
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
              <div style={styles}>
                <img
                  src={props.imageSrc}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'scale-down',
                  }}
                  alt="no_img"
                  onPointerOver={() => setHovered(true)}
                  onPointerOut={() => setHovered(false)}
                  onClick={() => handleClick()}
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
