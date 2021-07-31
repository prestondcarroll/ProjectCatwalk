/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import styled from 'styled-components';

const styles = {
  height: '100%',
  width: '100%',
  margin: '-5px',
  position: 'relative',
};

function ZoomImage(props) {
  const [scale, setScale] = useState(1);
  const [clientX, setClientX] = useState(50);
  const [clientY, setClientY] = useState(50);
  let figureElem = '';

  const MagnifyingFigure = {
    width: '75%',
    height: '100%',
    overflow: 'hidden',
    border: '3px solid #fff',
    position: 'relative',
  };

  const MagnifyingImg = {
    height: '100%',
    width: '100%',
    maxWidth: '100%',
    minWidth: '100%',
    position: 'relative',
    left: '50%',
    top: '50%',
    transform: `translate(-${clientX}%,-${clientY}%) scale(${scale})`,
    objectFit: 'scale-down',
  };

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

  const handleMouseMove = (event) => {
    let tempClientX = event.clientX - figureElem.offsetLeft;
    let tempClientY = event.clientY - figureElem.offsetTop;

    let mWidth = figureElem.offsetWidth;
    let mHeight = figureElem.offsetHeight;

    setClientX(tempClientX / mWidth * 100);
    setClientY(tempClientY / mWidth * 100);
    setScale(2.5);
  };

  const handleMouseLeave = () => {
    setScale(1);
    setClientX(50);
    setClientY(50);
  };

  return (
    <div style={styles}>
      {needOnlyLeftArrow
        && (
          <div style={styles}>
            <span>
              <div style={styles}>
                <figure
                  id="magnifying_area"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={MagnifyingFigure}
                  ref={el => figureElem = el}
                >
                  <img
                    id="magnifying_img"
                    src={props.imageSrc}
                    alt="no_img"
                    style={MagnifyingImg}
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                    onClick={() => handleClick()}
                  />
                </figure>
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
                <figure
                  id="magnifying_area"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={MagnifyingFigure}
                  ref={el => figureElem = el}
                >
                  <img
                    id="magnifying_img"
                    src={props.imageSrc}
                    alt="no_img"
                    style={MagnifyingImg}
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                    onClick={() => handleClick()}
                  />
                </figure>
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
                <figure
                  id="magnifying_area"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={MagnifyingFigure}
                  ref={el => figureElem = el}
                >
                  <img
                    id="magnifying_img"
                    src={props.imageSrc}
                    alt="no_img"
                    style={MagnifyingImg}
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                    onClick={() => handleClick()}
                  />
                </figure>
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

export default ZoomImage;
