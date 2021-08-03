/* eslint-disable no-plusplus */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaUtensils } from 'react-icons/fa';
import Icon from './Icon.jsx';

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
      <div>
        <Parent>
          {props.thumbnails.map((element, index) => (
            <Child>
              <Icon
                imageIdx={index}
                currentImageIdx={props.currentImageIdx}
                setCurrentImageIdx={props.setCurrentImageIdx}
                trackPageView={props.trackPageView}
              />
            </Child>
          ))}
        </Parent>
      </div>
    );
  }

  const [windowStart, setWindowStart] = useState('windowStart');
  const [windowEnd, setWindowEnd] = useState('windowEnd');

  const handlePressUpAndTrack = (event) => {
    const newStart = windowStart - 1;
    const newEnd = windowEnd - 1;
    setWindowStart(newStart);
    setWindowEnd(newEnd);
    props.trackPageView(event.target.outerHTML, 'Overview');
  };

  const handlePressDownAndTrack = (event) => {
    const newStart = windowStart + 1;
    const newEnd = windowEnd + 1;
    setWindowStart(newStart);
    setWindowEnd(newEnd);
    props.trackPageView(event.target.outerHTML, 'Overview');
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
      <div>
        <Parent>
          {/* Do first thumbnail determine if it needs an arrow */}
          {needUpArrow
            ? (
              <div style={styles}>
                <span>
                  <Child>
                    <Icon
                      imgSrc={props.thumbnails[windowStart].thumbnail_url}
                      imageIdx={windowStart}
                      currentImageIdx={props.currentImageIdx}
                      setCurrentImageIdx={props.setCurrentImageIdx}
                      trackPageView={props.trackPageView}
                    />
                  </Child>

                  <FaUtensils
                    onClick={handlePressUpAndTrack}
                    size={35}
                    style={{
                      fill: '#C0C0C0', position: 'absolute', left: '1.75em', bottom: '3.25em',
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
                    trackPageView={props.trackPageView}
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
                trackPageView={props.trackPageView}
              />
            </Child>
          ))}

          {/* Do last thumbnail determine if it needs an arrow */}
          {needDownArrow
            ? (
              <div style={styles}>
                <span>
                  <Child>
                    <Icon
                      imgSrc={props.thumbnails[windowEnd].thumbnail_url}
                      imageIdx={windowEnd}
                      currentImageIdx={props.currentImageIdx}
                      setCurrentImageIdx={props.setCurrentImageIdx}
                      trackPageView={props.trackPageView}
                    />
                  </Child>

                  <FaUtensils
                    onClick={handlePressDownAndTrack}
                    size={35}
                    style={{
                      fill: '#C0C0C0', position: 'absolute', left: '1.75em', bottom: '.2em',
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
                    trackPageView={props.trackPageView}
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
