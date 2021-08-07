/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-plusplus */
/* eslint-disable import/extensions */
/* eslint-disable padded-blocks */
/* eslint-disable no-trailing-spaces */
/* eslint-disable spaced-comment */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Style from './Style.jsx';

const ParentWrapper = styled.div`
  height: 100%;
  width: 100%;
  // border: 1px solid black;
`;

const Parent = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Child = styled.div`
  flex: 1 0 21%;
  margin: 5px;
  height: 100px;
`;

const placeHolderStyle = {
  style_id: 109986,
  name: 'Forest Green & Black',
  photos: [
    {
      thumbnail_url: '',
    },
  ],
};

function StylesList(props) {

  //placeholder style until it's loaded
  let styles = [placeHolderStyle];
  //if styles are loaded change to styles to reflect that
  if (props.styles !== undefined && typeof props.styles !== 'string') {
    styles = props.styles;
  }

  //render x amount of empty divs to have a multiple of 4 divs rendered
  if (styles.length % 4 !== 0) {
    const emptyDivsNum = styles.length % 4;
    return (
      <div>
        <ParentWrapper>
          <Parent>
            {styles.map((element) => (
              <Child> <Style
                style={element}
                changeStyle={props.changeStyle}
                currentStyleID={props.currentStyleID}
              />
              </Child>
            ))}
            {[...Array(emptyDivsNum)].map(() => <Child />)}
          </Parent>
        </ParentWrapper>
      </div>
    );
  }
  //else if already multiple of 4 render no empty divs
  return (
    <div>
      <h1>test</h1>
      <ParentWrapper>
        <Parent>
          {styles.map((element) => (
            <Child> <Style
              style={element}
              changeStyle={props.changeStyle}
              currentStyleID={props.currentStyleID}
            />
            </Child>
          ))}
        </Parent>
      </ParentWrapper>
    </div>
  );
}

export default StylesList;
