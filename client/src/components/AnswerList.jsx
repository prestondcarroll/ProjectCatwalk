import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Answer from './Answer.jsx';

const A = styled.span`
  font-size: 1.3em;
  white-space: pre;
`

<<<<<<< HEAD
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
  const [answers, setAnswers] = useState([]);
  const [answersExpanded, setAnswersExpanded] = useState(false);
=======
const AnswerList = (props) => {
  const [answers, setAnswers] = useState([]);
>>>>>>> main
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
<<<<<<< HEAD
  } else if (answers.length === 2) {
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
  } else if (answers.length === 1) {
    return (
      <div>
        <A>A:  </A> <Answer answer={answers[0]} />
      </div>
    )
  } else if (!answersExpanded) {
=======
  } else {
>>>>>>> main
    return (
      <div>
        <div>
          <A>A:  </A> <Answer answer={answers[0]} />
        </div>
        <div>
          <span style={{'whiteSpace':'pre'}}>       <Answer answer={answers[1]} /></span>
        </div>
<<<<<<< HEAD
        <div>
          <LoadMore onClick={() => setAnswersExpanded(true)}>        LOAD MORE ANSWERS</LoadMore>
        </div>
      </div>
    )
  } else {
    return(
      <div>
        <Expanded>
         <A>A:  </A> <Answer answer={answers[0]} />
          {
            answers.slice(1).map((answer) => <span style={{'whiteSpace':'pre'}}>       <Answer answer={answer} /></span>)
          }
        </Expanded>
        <div>
          <LoadMore onClick={() => setAnswersExpanded(false)}>        LOAD LESS ANSWERS</LoadMore>
        </div>
=======
>>>>>>> main
      </div>
    );
  }
};

export default AnswerList;