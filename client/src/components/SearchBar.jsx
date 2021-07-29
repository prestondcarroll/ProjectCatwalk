import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  margin-left: 25%;
  width: 50%;
  margin-top: 2%;
  height: 5vh;
  font-size: 1.4em;
  border-width: thin;
  border-radius: 0%;
  padding-left: 1.2em;
`

const Wrapper = styled.div`
  margin-left: 25%;
  margin-top: 4%;
  font-color: #696969;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 1.25em;
`

const SearchBar = (props) => {
  return (
    <div>
      <Wrapper>QUESTIONS & ANSWERS</Wrapper>
      <Input type="text" placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..." value={props.value} onChange={(event) => props.onChange(event.target.value)}></Input>
    </div>
  );
};

export default SearchBar;