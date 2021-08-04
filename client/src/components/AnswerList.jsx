import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Answer from './Answer.jsx';

const A = styled.span`
  font-size: 1.3em;
  white-space: pre;
`

const LoadMore = styled.div`
  font-size: 0.8em;
  white-space: pre;
  font-weight: bold;
  cursor: pointer;
`

const AnswerList = (props) => {
  const [answersExpanded, setAnswersExpanded] = useState(false);
  let accStyle = {
    height: answersExpanded ? '12em' : '7.5em',
    'overflow-y': answersExpanded ? 'scroll' : 'hidden',
    transition: answersExpanded ? 'all 0.5s cubic-bezier(1,0,1,0)' : 'all 0.5s cubic-bezier(0,1,0,1)'
  };
  if (props.answers.length === 0) {
    return (
      <div></div>
    );
  } else if (props.answers.length === 2) {
    return (
      <div>
        <div>
          <A>A:   </A> <Answer fetchAnswers={props.fetchAnswers} answer={props.answers[0]} />
        </div>
        <div>
          <span style={{'whiteSpace':'pre'}}>         <Answer answer={props.answers[1]} /></span>
        </div>
      </div>
    );
  } else if (props.answers.length === 1) {
    return (
      <div>
        <A>A:   </A> <Answer fetchAnswers={props.fetchAnswers} answer={props.answers[0]} />
      </div>
    )
  } else {
    return (
      <div style={accStyle}>
        <div>
          <A>A:  </A> <Answer fetchAnswers={props.fetchAnswers} answer={props.answers[0]} />
        </div>
        <div>
          <span style={{'whiteSpace':'pre'}}>         <Answer answer={props.answers[1]} /></span>
        </div>
        <div>
          {
            !answersExpanded ? <LoadMore onClick={() => setAnswersExpanded(!answersExpanded)}>        LOAD MORE ANSWERS</LoadMore> : <span></span>
          }
          {
            answersExpanded ? (props.answers.slice(2).map((answer) => <span style={{'whiteSpace':'pre'}}>         <Answer fetchAnswers={props.fetchAnswers} answer={answer} /></span>)) : <span></span>
          }
          {
            answersExpanded ? <LoadMore onClick={() => setAnswersExpanded(!answersExpanded)}>        LOAD LESS ANSWERS</LoadMore> : <span></span>
          }
        </div>
      </div>
    )
   }
};

export default AnswerList;