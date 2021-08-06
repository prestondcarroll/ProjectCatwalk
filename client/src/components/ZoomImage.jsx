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
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
};

function ZoomImage(props) {
  const [scale, setScale] = useState(1);
  const [clientX, setClientX] = useState(50);
  const [clientY, setClientY] = useState(50);
  const [figureWidth, setFigureWidth] = useState(800);
  const [figureHeight, setFigureHeight] = useState(500);
  let figureElem = '';
  let imgElem = '';

  const MagnifyingFigure = {
    width: `${figureWidth}px`,
    height: `${figureHeight}px`,
    overflow: 'hidden',
    border: '3px solid #fff',
    position: 'relative',
  };

  const MagnifyingImg = {
    // width: '100%',
    // height: '100%',
    maxWidth: '800px',
    maxHeight: '500px',

    // minWidth: '100%',
    position: 'absolute',
    left: '50%',
    top: '50%',
    // transform: `translate(-50%,-50%) scale(${scale})`,
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
    const tempClientX = event.clientX - figureElem.offsetLeft;
    const tempClientY = event.clientY - figureElem.offsetTop;

    const mWidth = figureElem.offsetWidth;
    const mHeight = figureElem.offsetHeight;



    console.log(`X: ${(tempClientX / mWidth * 100) - 66}`);
    console.log(`Y: ${(tempClientY / mHeight * 100) - 10}`);

    setClientX((tempClientX / mWidth * 100) - 66);
    setClientY((tempClientY / mHeight * 100) - 10);
    setScale(2);
  };

  const handleMouseLeave = () => {
    setScale(1);
    setClientX(50);
    setClientY(50);

    // setFigureHeight(imgElem.height);
    // setFigureWidth(imgElem.width);
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
                  ref={(el) => figureElem = el}
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
                  ref={(el) => figureElem = el}
                >
                  <img
                    id="magnifying_img"
                    src={props.imageSrc}
                    alt="no_img"
                    style={MagnifyingImg}
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                    onClick={() => handleClick()}
                    ref={(el) => imgElem = el}
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
                  ref={(el) => figureElem = el}
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
