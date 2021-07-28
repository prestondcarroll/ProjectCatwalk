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

// const TestBoxContainer = styled.div`
//   display: flex;
//   flex-flow: wrap;
// `;

// const TestBoxItem = styled.div`
//   flex: 0 32%
//   height: 100px;
//   margin-bottom: 2%;
// `;

const ParentWrapper = styled.div`
  height: 100%;
  width: 60%;
  border: 1px solid black;
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

function StylesList(props) {
  // const [reviewCount, setReviewCount] = useState('reviewCount');
  //get number of styles
  //calculate how many rows I need
  //display 4 rows at a time
  //map over each row

  //make x amounts of rows

  //for number of rows
  //print row

  //for each style, map a child component with a style component inside
  //pass down picture, add a click listener?

  const numRows = 2;
  let styles = ['placeholder'];
  if (props.styles !== undefined && typeof props.styles !== 'string') {
    styles = props.styles;
  }

  if (styles.length % 4 !== 0) {
    const emptyDivsNum = styles.length % 4;
    return (
      <div>
        <h1>test</h1>
        <ParentWrapper>
          <Parent>
            {styles.map((element) => (
              <Child> <Style style={element} /> </Child>
            ))}
            {[...Array(emptyDivsNum)].map(() => <Child>  </Child>)}
          </Parent>
        </ParentWrapper>
      </div>
    );
  }
  return (
    <div>
      <h1>test</h1>
      <ParentWrapper>
        <Parent>
          {styles.map((element) => (
            <Child> <Style style={element} /> </Child>
          ))}

        </Parent>
      </ParentWrapper>
    </div>
  );

  // return (
  //   <div>
  //     <h1>test</h1>
  //     <ParentWrapper>
  //       <Parent>
  //         {styles.map((element) => (
  //           <Child> <Style style={element} /> </Child>
  //         ))}

  //       </Parent>
  //     </ParentWrapper>
  //   </div>
  // );
}

export default StylesList;
