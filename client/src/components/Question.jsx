import React from 'react';
import styled from 'styled-components';
import AnswerList from './AnswerList.jsx';

const Container = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
font-size: 1.3em;
`

const Help = styled.span`
  justify-self: flex-end;
  font-size: 0.5em;
  color: gray;
  white-space: pre;
`

const Button = styled.a`
  text-decoration: underline;
`

const Answers = styled.div`
  display: flex;
  flex-direction: column;
`

const Question = (props) => {
  const answers = [];
  for (let key in props.question.answers) {
    answers.push(props.question.answers[key]);
  }
  answers.sort((a, b) => a.helpfulness - b.helpfulness);
  return (
    <div>
      <Container>Q: {props.question.question_body}<Help>Helpful?  <Button>Yes</Button> ({props.question.question_helpfulness})   |   <Button>Add An Answer</Button></Help></Container>
      <Answers><AnswerList questionId={props.question.question_id} /></Answers>
    </div>
  );
};

export default Question;