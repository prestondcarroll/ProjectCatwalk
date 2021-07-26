import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
font-size: 1.5em;
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

const Question = (props) => {
  return (
    <div>
      <Container>Q: {props.question.question_body}<Help>Helpful?  <Button>Yes</Button> ({props.question.question_helpfulness})   |   <Button>Add An Answer</Button></Help></Container>
      <div>A: This is an answer.</div>
    </div>
  );
};

export default Question;