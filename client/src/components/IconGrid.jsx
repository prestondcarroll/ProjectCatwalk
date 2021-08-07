/* eslint-disable no-plusplus */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import Icon from './Icon.jsx';

// for each photo in currentStyle
// map a thumbnail while passing down thumbnail url
const Parent = styled.div`
  display: flex;
`;

const Child = styled.div`
  margin: 5px;
  width: 80px;
  height: 80px;
`;

const styles = {
  height: '100%',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
};

// window for which ones are displayed
// start : one to display first
// end: one to display last

// default window to be 0-4

function IconGrid(props) {
  let numThumbs = 999;
  if (props.thumbnails !== undefined && typeof props.thumbnails !== 'string') {
    numThumbs = props.thumbnails.length;
  }

  if (numThumbs < 6) {
    return (
      <div style={styles}>
        <Parent>
          {props.thumbnails.map((element, index) => (
            <Child>
              <Icon
                imageIdx={index}
                currentImageIdx={props.currentImageIdx}
                setCurrentImageIdx={props.setCurrentImageIdx}
              />
            </Child>
          ))}
        </Parent>
      </div>
    );
  }

  const [windowStart, setWindowStart] = useState('windowStart');
  const [windowEnd, setWindowEnd] = useState('windowEnd');

  const handlePressUp = () => {
    const newStart = windowStart - 1;
    const newEnd = windowEnd - 1;
    setWindowStart(newStart);
    setWindowEnd(newEnd);
  };

  const handlePressDown = () => {
    const newStart = windowStart + 1;
    const newEnd = windowEnd + 1;
    setWindowStart(newStart);
    setWindowEnd(newEnd);
  };

  useEffect(() => {
    setWindowStart(0);
    setWindowEnd(4);
  }, []);

  useEffect(() => {
    setWindowStart(0);
    setWindowEnd(4);
  }, [props.productId]);

  useEffect(() => {
    if (props.currentImageIdx < windowStart) {
      setWindowStart(windowStart - 1);
      setWindowEnd(windowEnd - 1);
    }

    if (props.currentImageIdx > windowEnd) {
      setWindowStart(windowStart + 1);
      setWindowEnd(windowEnd + 1);
    }
  }, [props.currentImageIdx]);

  const needUpArrow = windowStart > 0;
  const needDownArrow = windowEnd < numThumbs - 1;

  if (typeof windowStart !== 'string' && typeof windowEnd !== 'string') {
    return (
      <div style={styles}>
        <Parent>
          {/* Do first thumbnail determine if it needs an arrow */}
          {needUpArrow
            ? (
              <div>
                <span>
                  <Child>
                    <Icon
                      imgSrc={props.thumbnails[windowStart].thumbnail_url}
                      imageIdx={windowStart}
                      currentImageIdx={props.currentImageIdx}
                      setCurrentImageIdx={props.setCurrentImageIdx}
                    />
                  </Child>

                  <div style={{ position: 'absolute', left: '9.85em', bottom: '2.35em' }}>
                    <svg width="35px" height="35px" style={{ border: '3px solid #17a1b3' }}>
                      <rect fill="#231c44" id="box" x="0" y="0" width="35" height="35" />
                    </svg>
                  </div>
                  <FaAngleLeft
                    onClick={handlePressUp}
                    size={35}
                    style={{
                      fill: '#e72169', position: 'absolute', left: '10em', bottom: '2.75em',
                    }}
                  />
                </span>
              </div>
            )
            : (
              <div>
                <Child>
                  <Icon
                    imgSrc={props.thumbnails[windowStart].thumbnail_url}
                    imageIdx={windowStart}
                    currentImageIdx={props.currentImageIdx}
                    setCurrentImageIdx={props.setCurrentImageIdx}
                  />
                </Child>
              </div>
            )}

          {/* Do next three thumbnails */}
          {props.thumbnails.slice(windowStart + 1, windowStart + 4).map((element, index) => (
            <Child>
              <Icon
                imgSrc={element.thumbnail_url}
                imageIdx={index + windowStart + 1}
                currentImageIdx={props.currentImageIdx}
                setCurrentImageIdx={props.setCurrentImageIdx}
              />
            </Child>
          ))}

          {/* Do last thumbnail determine if it needs an arrow */}
          {needDownArrow
            ? (
              <div>
                <span>
                  <Child>
                    <Icon
                      imgSrc={props.thumbnails[windowEnd].thumbnail_url}
                      imageIdx={windowEnd}
                      currentImageIdx={props.currentImageIdx}
                      setCurrentImageIdx={props.setCurrentImageIdx}
                    />
                  </Child>

                  <div style={{ position: 'absolute', left: '32.8em', bottom: '2.35em' }}>
                    <svg width="35px" height="35px" style={{ border: '3px solid #17a1b3' }}>
                      <rect fill="#231c44" id="box" x="0" y="0" width="35" height="35" />
                    </svg>
                  </div>
                  <FaAngleRight
                    onClick={handlePressDown}
                    size={35}
                    style={{
                      fill: '#e72169', position: 'absolute', left: '33em', bottom: '2.75em',
                    }}
                  />
                </span>
              </div>
            )
            : (
              <div>
                <Child>
                  <Icon
                    imgSrc={props.thumbnails[windowEnd].thumbnail_url}
                    imageIdx={windowEnd}
                    currentImageIdx={props.currentImageIdx}
                    setCurrentImageIdx={props.setCurrentImageIdx}
                  />
                </Child>
              </div>
            )}

        </Parent>
      </div>
    );
  }

  return (
    <div>
      <h5>Loading</h5>
    </div>
  );
}

export default IconGrid;
