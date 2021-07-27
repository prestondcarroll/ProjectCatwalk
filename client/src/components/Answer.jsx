import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const AnswerStyle = styled.div`
  font-size: 0.95em;
  color: #696969;
  display: inline-block;
`

const Footer = styled.div`
  color: #808080;
  font-size: 0.9em;
  white-space: pre;
  margin-top: 1em;
  margin-bottom 1em;
`

const Wrapper = styled.div`
  display: inline;
`

const Helpful = styled.span`
  color: #6d6b6b;
  font-size: 0.87em;
`

const A = styled.a`
  text-decoration: underline;
`

const Answer = (props) => {
  if (props.answer !== undefined) {
    return (
      <Wrapper>
        <AnswerStyle>{props.answer.body}</AnswerStyle>
        <Footer>        by {props.answer.answerer_name}, {moment(props.answer.date.slice(0, 10)).format('MMMM d, YYYY')}   <Helpful>|   Helpful? <A>Yes</A> ({props.answer.helpfulness})   |</Helpful>   <A style={{fontSize: '0.87em'}}>Report</A></Footer>
      </Wrapper>
    );
  } else {
    return (
      <div></div>
    )
  }
};

export default Answer;