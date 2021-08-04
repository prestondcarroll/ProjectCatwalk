import React from 'react';
import Question from './Question.jsx';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 25%;
  margin-left: 25%;
  font-family: Helvetica, Arial, sans-serif;
`

const QuestionStyle = styled.span`
  margin-top: 1em;
  margin-right: 1em;
`

const ScrollContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 25%;
  margin-right: 25%;
  font-family: Helvetica, Arial, sans-serif;
  overflow-y: scroll;
  height: 50vh;
`

const QuestionList = (props) => {
  let first4 = [];
  let rest = [];
  for (var i = 0; i < 4; i++) {
    if (props.questions[i]) {
      first4.push(props.questions[i]);
    }
  }
  for (var i = 4; i < props.questions.length; i++) {
    rest.push(props.questions[i]);
  }
  let containerStyle = {
    'display': 'flex',
    'flexDirection': 'column',
    'marginRight': '25%',
    'marginLeft': '25%',
    'fontFamily': 'Helvetica, Arial, sans-serif',
    'overflowY': props.questionsExpanded ? 'scroll' : 'hidden',
    'height' : props.questionsExpanded ? '65vh' : 'auto',
  }
  if (props.questions.length === 0) {
    return <div>loading...</div>
  } else {
    return (
      <div style={containerStyle}>
        {
          !props.questionsExpanded ? (first4.map((question) => (
            <QuestionStyle><Question fetchQuestions={props.fetchQuestions} questionId={question.question_id} productName={props.productName} key={question.question_id} question={question} productId={props.productId} /></QuestionStyle>
          ))) : (props.questions.map((question) => (
            <QuestionStyle><Question fetchQuestions={props.fetchQuestions} questionId={question.question_id} productName={props.productName} key={question.question_id} question={question} productId={props.productId} /></QuestionStyle>
          )))
        }
      </div>
    );
  }
};

export default QuestionList;