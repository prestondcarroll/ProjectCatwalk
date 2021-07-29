/* eslint-disable no-plusplus */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaAngleUp, FaAngleDown } from 'react-icons/fa';
import Thumbnail from './Thumbnail.jsx';

// for each photo in currentStyle
// map a thumbnail while passing down thumbnail url
const Parent = styled.div`
  display: flex;
  flex-direction: column;
`;

const Child = styled.div`
  margin: 5px;
  width: 80px;
  height: 80px;
`;

const styles = {
  height: '100%',
  width: '100%',

  // background: '#333',
  position: 'relative',
};

// window for which ones are displayed
// start : one to display first
// end: one to display last

// default window to be 0-4

function ThumbnailGrid(props) {
  let numThumbs = 999;
  if (props.thumbnails !== undefined && typeof props.thumbnails !== 'string') {
    numThumbs = props.thumbnails.length;
  }

  if (numThumbs < 6) {
    return (
      <div>
        <Parent>
          {props.thumbnails.map((element, index) => (
            <Child>
              <Thumbnail
                imgSrc={element.thumbnail_url}
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

  // if more than 5 thumbnails,
  // determine if arrows are needed for top
  //  if window.start > 0
  //    put arrow on first thumbnail
  // determine for bottom
  //  if window.end < total number of thumbnails - 1
  //    put arrow on bottom thumbnail

  const needUpArrow = windowStart > 0;
  const needDownArrow = windowEnd < numThumbs - 1;

  if (typeof windowStart !== 'string' && typeof windowEnd !== 'string') {
    return (
      <div>
        <Parent>
          {/* Do first thumbnail determine if it needs an arrow */}
          {needUpArrow
            ? (
              <div style={styles}>
                <span>
                  <Child>
                    <Thumbnail
                      imgSrc={props.thumbnails[windowStart].thumbnail_url}
                      imageIdx={windowStart}
                      currentImageIdx={props.currentImageIdx}
                      setCurrentImageIdx={props.setCurrentImageIdx}
                    />
                  </Child>

                  <FaAngleUp
                    onClick={handlePressUp}
                    size={35}
                    style={{
                      fill: '#FF0000', position: 'absolute', left: '1.75em', bottom: '3.25em',
                    }}
                  />
                </span>
              </div>
            )
            : (
              <div>
                <Child>
                  <Thumbnail
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
              <Thumbnail
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
              <div style={styles}>
                <span>
                  <Child>
                    <Thumbnail
                      imgSrc={props.thumbnails[windowEnd].thumbnail_url}
                      imageIdx={windowEnd}
                      currentImageIdx={props.currentImageIdx}
                      setCurrentImageIdx={props.setCurrentImageIdx}
                    />
                  </Child>

                  <FaAngleDown
                    onClick={handlePressDown}
                    size={35}
                    style={{
                      fill: '#FF0000', position: 'absolute', left: '1.75em', bottom: '.2em',
                    }}
                  />
                </span>
              </div>
            )
            : (
              <div>
                <Child>
                  <Thumbnail
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

export default ThumbnailGrid;
