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
    border: '3px solid #17a1b3',
    position: 'relative',
  };

  const MagnifyingImg = {
    maxWidth: '800px',
    maxHeight: '500px',
    position: 'absolute',
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
    document.body.style.cursor = hovered ? 'zoom-out' : 'auto';
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

              <div style={{ position: 'absolute', left: '1.25em', bottom: '13.25em' }}>
                <svg width="45px" height="65px" style={{ border: '3px solid #17a1b3' }}>
                  <rect fill="#231c44" id="box" x="0" y="0" width="45" height="65" />
                </svg>
              </div>
              <FaAngleLeft
                onClick={handlePressLeft}
                size={50}
                style={{
                  fill: '#e72169', position: 'absolute', left: '1.25em', bottom: '14em',
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

              <div style={{ position: 'absolute', left: '44.5em', bottom: '13.25em' }}>
                <svg width="45px" height="65px" style={{ border: '3px solid #17a1b3' }}>
                  <rect fill="#231c44" id="box" x="0" y="0" width="45" height="65" />
                </svg>
              </div>
              <FaAngleRight
                onClick={handlePressRight}
                size={50}
                style={{
                  fill: '#e72169', position: 'absolute', left: '44.5em', bottom: '14em',
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

              <div style={{ position: 'absolute', left: '1.25em', bottom: '13.25em' }}>
                <svg width="45px" height="65px" style={{ border: '3px solid #17a1b3' }}>
                  <rect fill="#231c44" id="box" x="0" y="0" width="45" height="65" />
                </svg>
              </div>
              <FaAngleLeft
                onClick={handlePressLeft}
                size={50}
                style={{
                  fill: '#e72169', position: 'absolute', left: '1.25em', bottom: '14em',
                }}
              />

              <div style={{ position: 'absolute', left: '44.5em', bottom: '13.25em' }}>
                <svg width="45px" height="65px" style={{ border: '3px solid #17a1b3' }}>
                  <rect fill="#231c44" id="box" x="0" y="0" width="45" height="65" />
                </svg>
              </div>
              <FaAngleRight
                onClick={handlePressRight}
                size={50}
                style={{
                  fill: '#e72169', position: 'absolute', left: '44.5em', bottom: '14em',
                }}
              />
            </span>
          </div>
        )}
    </div>
  );
}

export default ZoomImage;
