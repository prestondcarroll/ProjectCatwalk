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
  for (var i = 0; i < 4; i++) {
    if (props.questions[i]) {
      first4.push(props.questions[i]);
    }
  }
  if (props.questions.length === 0) {
    return <div>loading...</div>
  } else if (!props.questionsExpanded) {
    return (
      <Container>
        {
          first4.map((question) => (
            <QuestionStyle><Question key={question.question_id} question={question} productId={props.productId} /></QuestionStyle>
          ))
        }
      </Container>
    );
  } else {
    return (
      <ScrollContainer>
        {
          props.questions.map((question) => (
            <QuestionStyle><Question key={question.question_id} question={question} productId={props.productId} /></QuestionStyle>
          ))
        }
      </ScrollContainer>
    );
  }
};

export default QuestionList;