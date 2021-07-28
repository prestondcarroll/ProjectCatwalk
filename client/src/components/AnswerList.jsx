import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Answer from './Answer.jsx';

const A = styled.span`
  font-size: 1.3em;
  white-space: pre;
`

const AnswerList = (props) => {
  const [answers, setAnswers] = useState([]);
  useEffect(() => {
    axios.get(`/answers?questionId=${props.questionId}`)
      .then((res) =>{
         setAnswers(res.data);
      })
      .catch();
  }, []);
  if (answers.length === 0) {
    return (
      <div></div>
    );
  } else {
    return (
      <div>
        <div>
          <A>A:  </A> <Answer answer={answers[0]} />
        </div>
        <div>
          <span style={{'whiteSpace':'pre'}}>       <Answer answer={answers[1]} /></span>
        </div>
      </div>
    );
  }
};

export default AnswerList;