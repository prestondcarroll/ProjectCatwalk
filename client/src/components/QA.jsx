import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import QuestionList from './QuestionList.jsx';

const Button = styled.a`
  border-style: solid;
  border-width: thin;
  font-size: 1.2em;
  margin-right: 1em;
  padding: 1.5em;
  font-family: Helvetica, Arial, sans-serif;
`

const Wrapper = styled.div`
  margin-left: 25%;
  margin-top: 5em;
`

const QWrapper = styled.span`
  margin-top: 5em;
`


const QA = (props) => {
  const [questions, setQuestions] = useState([]);
  const [questionsExpanded, setQuestionsExpanded] = useState(false);
  useEffect(() => {
    axios.get(`/questions?productId=${props.productId}`)
      .then((res) => setQuestions(res.data.results))
      .catch(err => {
        console.log(err);
      });
  }, []);

  const moreQuestionsOnClick = (event) => {
    console.log('hello');
  }
  return (
    <div>
      <QWrapper>
        <QuestionList questions={questions} productId={props.productId} questionsExpanded={questionsExpanded} />
      </QWrapper>
      <Wrapper>
        <Button onClick={() => setQuestionsExpanded(!questionsExpanded)}>{questionsExpanded ? 'LESS ANSWERED QUESTIONS' : 'MORE ANSWERED QUESTIONS'}</Button><Button>ADD A QUESTION  +</Button>
      </Wrapper>
    </div>
  );
};

export default QA;