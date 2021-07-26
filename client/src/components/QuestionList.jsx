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

const QuestionList = (props) => {
  let first4 = [];
  for (var i = 0; i < 4; i++) {
    first4.push(props.questions[i]);
  }
  if (props.questions.length === 0) {
    return <div>loading...</div>
  } else {
    return (
      <Container>
        {
          first4.map((question) => (
            <Question key={question.question_id} question={question} />
          ))
        }
      </Container>
    );
  }
};

export default QuestionList;