import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import axios from 'axios';
import AnswerList from './AnswerList.jsx';

const Container = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
font-size: 1.3em;
color: #fff;
`

const Help = styled.span`
  justify-self: flex-end;
  font-size: 0.5em;
  color: #17a1b3;
  white-space: pre;
`

const Button = styled.a`
  text-decoration: underline;
  cursor: pointer;
`

const Answers = styled.div`
  display: flex;
  flex-direction: column;
  color: #fff;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  font-family: Helvetica, Arial, sans-serif;
`

const QuestionInput = styled.textarea`
  margin-bottom: 1em;
  height: 30vh;
  width: 40vw;
`

const Input = styled.input`
  margin-bottom: 1em;
  width: 40vw;
`

const Submit = styled.input`
  border-radius: 10%;
  width: 7em;
`

const Question = (props) => {
  const [questionModal, setQuestionModal] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [answers, setAnswers] = useState([]);
  const [helpful, setHelpful] = useState(false);
  const [reported, setReported] = useState(false);
  useEffect(() => {
    fetchAnswers();
  }, []);

  const fetchAnswers = () => {
    axios.get(`/answers?questionId=${props.questionId}`)
      .then((res) =>{
         setAnswers(res.data);
      })
      .catch();
  }

  const handleNewQuestionChange = (event) => {
    setNewQuestion(event.target.value);
  };

  const handleNicknameChange = (event) => {
      setNickname(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const helpfulHandler = (event) => {
    if (!helpful) {
      axios.post(`/questions/helpful/${props.questionId}`)
      .then(props.fetchQuestions)
      .then(() => setHelpful(true))
      .catch();
    }
  };

  const reportHandler = (event) => {
    if (!reported) {
      axios.post(`/questions/report/${props.questionId}`)
      .then(props.fetchQuestions)
      .then(() => setReported(true))
      .catch();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let missing = '';
    if (newQuestion.length === 0) {
      missing += ' answer';
    } if (nickname.length === 0) {
      missing += ' nickname';
    } if (email.length === 0) {
      missing += ' email';
    }
    var properEmail = false;
    if (email.split('@')[1]) {
      if (email.split('@')[1].split('.')[1]) {
        properEmail = true;
      }
    }
    if (missing.length !== 0) {
      alert(`You must enter the following:${missing}`)
    } else if (!properEmail) {
      alert('You must provide an email in a proper format: someone@something.com')
    } else {
      axios.post(`/answers/${props.questionId}`, {
        "body": newQuestion,
        "name": nickname,
        "email": email,
        "photos": []
      })
      .then(() => {
        fetchAnswers();
        setQuestionModal(false);
      })
      .catch((err) => {
        alert('error in posting answer');
        setQuestionModal(false);
      });
    }
  }
  return (
    <div>
      <Container>Q: {props.question.question_body}<Help>Helpful?  <Button onClick={helpfulHandler}>Yes</Button> ({props.question.question_helpfulness})   |   <Button onClick={() => setQuestionModal(true)}>Add An Answer</Button>   | <Button onClick={reportHandler}>Report</Button></Help></Container>
      <Answers><AnswerList fetchAnswers={fetchAnswers} answers={answers} questionId={props.question.question_id} /></Answers>
      <Modal
        isOpen={questionModal}
        onRequestClose={() => setQuestionModal(false)}>
          <Form onSubmit={handleSubmit}>
            <div style={{fontSize: '1.3em', fontFamily: 'Helvetica, Arial, sans-serif' }}>Submit your Answer</div>
            <div style={{fontSize: '1.1em', fontFamily: 'Helvetica, Arial, sans-serif', marginBottom: '2em'}}>{props.productName}: {props.question.question_body}</div>
            <label>Your Answer*</label>
            <QuestionInput value={newQuestion} maxLength="1000" onChange={handleNewQuestionChange}></QuestionInput>
            <label>What is your nickname*</label>
            <Input value={nickname} placeholder="Example: jackson11!" type="text" maxLength="60" onChange={handleNicknameChange}></Input>
            <div style={{fontSize: '0.65em', marginBottom: '0.5em'}}>For privacy reasons, do not use your full name or email address</div>
            <label>Your email*</label>
            <Input value={email} type="text" placeholder="Why did you like the product or not?" maxLength="60" onChange={handleEmailChange}></Input>
            <div style={{fontSize: '0.65em', marginBottom: '0.5em'}}>For authentication reasons, you will not be emailed</div>
            <Submit type="submit" value="Submit"></Submit>
          </Form>
        </Modal>
    </div>
  );
};

export default Question;