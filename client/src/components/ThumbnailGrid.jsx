/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
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

function ThumbnailGrid(props) {
  return (
    <div>
      <Parent>
        {props.thumbnails.map((element) => (
          <Child>
            <Thumbnail imgSrc={element.thumbnail_url} />
          </Child>
        ))}
      </Parent>
    </div>
  );
}

export default ThumbnailGrid;
