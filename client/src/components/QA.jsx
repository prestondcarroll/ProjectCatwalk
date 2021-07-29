import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import QuestionList from './QuestionList.jsx';
import SearchBar from './SearchBar.jsx';

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
  const [searchValue, setSearchValue] = useState('');
  const [currentQuestions, setCurrentQuestions] = useState(questions);
  useEffect(() => {
    searchValue.length < 3 ? setCurrentQuestions(questions) :  setCurrentQuestions(questions.reduce((acc, val) => {
      if (val.question_body.toLowerCase().includes(searchValue.toLowerCase())) {
        acc.push(val);
      }
      return acc;
    }, []));
  }, [searchValue]);
  useEffect(() => {
    axios.get(`/questions?productId=${props.productId}`)
      .then((res) => {setQuestions(res.data.results); setCurrentQuestions(res.data.results)})
      .catch(err => {
        // console.log(err);
      });
  }, []);

  const moreQuestionsOnClick = (event) => {
    console.log('hello');
  }
  return (
    <div>
      <SearchBar value={searchValue} onChange={setSearchValue} />
      <QWrapper>
        <QuestionList questions={currentQuestions} productId={props.productId} questionsExpanded={questionsExpanded} />
      </QWrapper>
      <Wrapper>
        <Button onClick={() => setQuestionsExpanded(!questionsExpanded)}>{questionsExpanded ? 'LESS ANSWERED QUESTIONS' : 'MORE ANSWERED QUESTIONS'}</Button><Button>ADD A QUESTION  +</Button>
      </Wrapper>
    </div>
  );
};

export default QA;