/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
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

// window for which ones are displayed
// start : one to display first
// end: one to display last

// default window to be 0-4

// if more than 5 thumbnails,
// determine if arrows are needed for top
//  if window.start > 0
//    put arrow on first thumbnail
// determine for bottom
//  if window.end < total number of thumbnails - 1
//    put arrow on bottom thumbnail

function ThumbnailGrid(props) {
  let numThumbs = 0;
  if (props.thumbnails !== undefined && typeof props.thumbnails === 'string') {
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

  useEffect(() => {
    setWindowStart(0);
    setWindowEnd(4);
  }, []);

  const test = windowStart;

  return (
    <h5>hey</h5>
  );
}

export default ThumbnailGrid;
