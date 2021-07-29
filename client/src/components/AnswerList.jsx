import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Answer from './Answer.jsx';

const A = styled.span`
  font-size: 1.3em;
  white-space: pre;
`

const LoadMore = styled.span`
  font-size: 0.8em;
  white-space: pre;
  font-weight: bold;
`

const Expanded = styled.div`
  height: 8em;
  overflow-y: scroll;
`

const AnswerList = (props) => {
  const [answersExpanded, setAnswersExpanded] = useState(false);
  if (props.answers.length === 0) {
    return (
      <div></div>
    );
  } else if (props.answers.length === 2) {
    return (
      <div>
        <div>
          <A>A:  </A> <Answer fetchAnswers={props.fetchAnswers} answer={props.answers[0]} />
        </div>
        <div>
          <span style={{'whiteSpace':'pre'}}>       <Answer answer={props.answers[1]} /></span>
        </div>
      </div>
    );
  } else if (props.answers.length === 1) {
    return (
      <div>
        <A>A:  </A> <Answer fetchAnswers={props.fetchAnswers} answer={props.answers[0]} />
      </div>
    )
  } else if (!answersExpanded) {
    return (
      <div>
        <div>
          <A>A:  </A> <Answer fetchAnswers={props.fetchAnswers} answer={props.answers[0]} />
        </div>
        <div>
          <span style={{'whiteSpace':'pre'}}>       <Answer answer={props.answers[1]} /></span>
        </div>
        <div>
          <LoadMore onClick={() => setAnswersExpanded(true)}>        LOAD MORE ANSWERS</LoadMore>
        </div>
      </div>
    )
  } else {
    return(
      <div>
        <Expanded>
         <A>A:  </A> <Answer fetchAnswers={props.fetchAnswers} answer={props.answers[0]} />
          {
            props.answers.slice(1).map((answer) => <span style={{'whiteSpace':'pre'}}>       <Answer fetchAnswers={props.fetchAnswers} answer={answer} /></span>)
          }
        </Expanded>
        <div>
          <LoadMore onClick={() => setAnswersExpanded(false)}>        LOAD LESS ANSWERS</LoadMore>
        </div>
      </div>
    );
  }
};

export default AnswerList;