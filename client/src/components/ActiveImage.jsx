import React, { useState, useEffect } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const styles = {
  height: '100%',
  width: '100%',
  margin: '-5px',
  position: 'relative',
};

const container = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '5px',
};

const child = {
  flexGrow: '1',
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
              <div style={container}>
                <div style={child}>
                  <img
                    src={props.imageSrc}
                    style={{
                      height: '600px',
                      border: '3px solid #17a1b3',
                      width: '100%',
                    }}
                    alt="no_img"
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                    onClick={() => handleClick()}
                  />
                </div>
              </div>

              <div style={{ position: 'absolute', left: '0.4em', bottom: '14.75em' }}>
                <svg width="45px" height="65px" style={{ border: '3px solid #17a1b3' }}>
                  <rect fill="#231c44" id="box" x="0" y="0" width="45" height="65" />
                </svg>
              </div>
              <FaAngleLeft
                onClick={handlePressLeft}
                size={50}
                style={{
                  fill: '#e72169', position: 'absolute', left: '0.4em', bottom: '15.5em',
                }}
              />
            </span>
          </div>
        )}

      {needOnlyRightArrow
        && (
        <div style={styles}>
          <span>
            <div style={container}>
              <div style={child}>
                <img
                  src={props.imageSrc}
                  style={{
                    height: '600px',
                    border: '3px solid #17a1b3',
                    width: '100%',
                  }}
                  alt="no_img"
                  onPointerOver={() => setHovered(true)}
                  onPointerOut={() => setHovered(false)}
                  onClick={() => handleClick()}
                />
              </div>
            </div>

            <div style={{
              position: 'absolute', left: '41.75em', bottom: '14.75em',
            }}
            >
              <svg width="45px" height="65px" style={{ border: '3px solid #17a1b3' }}>
                <rect fill="#231c44" id="box" x="0" y="0" width="45" height="65" />
              </svg>
            </div>
            <FaAngleRight
              onClick={handlePressRight}
              size={50}
              style={{
                fill: '#e72169', position: 'absolute', left: '41.75em', bottom: '15.5em',
              }}
            />
          </span>
        </div>
        )}

      {needLeftAndRight
        && (
          <div style={styles}>
            <span>
              <div style={container}>
                <div style={child}>
                  <img
                    src={props.imageSrc}
                    style={{
                      height: '600px',
                      width: '100%',
                      border: '3px solid #17a1b3',
                    }}
                    alt="no_img"
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                    onClick={() => handleClick()}
                  />
                </div>
              </div>

              <div style={{ position: 'absolute', left: '0.4em', bottom: '14.75em' }}>
                <svg width="45px" height="65px" style={{ border: '3px solid #17a1b3' }}>
                  <rect fill="#231c44" id="box" x="0" y="0" width="45" height="65" />
                </svg>
              </div>
              <FaAngleLeft
                onClick={handlePressLeft}
                size={50}
                style={{
                  fill: '#e72169', position: 'absolute', left: '0.4em', bottom: '15.5em',
                }}
              />

              <div style={{
                position: 'absolute', left: '41.75em', bottom: '14.75em',
              }}
              >
                <svg width="45px" height="65px" style={{ border: '3px solid #17a1b3' }}>
                  <rect fill="#231c44" id="box" x="0" y="0" width="45" height="65" />
                </svg>
              </div>
              <FaAngleRight
                onClick={handlePressRight}
                size={50}
                style={{
                  fill: '#e72169', position: 'absolute', left: '41.75em', bottom: '15.5em',
                }}
              />
            </span>
          </div>
        )}
    </div>
  );
}

export default ActiveImage;
