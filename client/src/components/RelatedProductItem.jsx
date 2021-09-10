import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import styled from 'styled-components';
import StarRating from './StarRating.jsx';
import calculateAverage from '../utils/calculateAverage.js';
import { FaStar } from 'react-icons/fa';
import Modal from 'react-modal';
import ProductComparison from './ProductComparison.jsx';

const StyledImage = styled.img`
  width: 250px;
  height: 250px;
`
const Card = styled.div`
  border-style: groove;
  margin-left: 20px;
  margin-right: 20px;
  position: relative;
`

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxHeight: 'calc(10vh - 20px)',
    overflowY: 'auto'
  },
};

const RelatedProductItem = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  let rating = calculateAverage(props.product.reviews);

  return (
    <Card>
      <FaStar size={20} style={{ fill: '#e4e5e9', position: 'absolute', top: 0, right: 0 , stroke: "black", strokeWidth: 20 }} onClick={() => setModalIsOpen(true)} />
      <Modal
        scrollable={true}
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style = {
          customStyles
        }
        >
        <h2>Comparing</h2>
        <ProductComparison comparedProduct={props.product} currentProduct={props.currentProduct}/>
      </Modal>
      <StyledImage src={props.product.results[0].photos[0].thumbnail_url || 'https://via.placeholder.com/300x300'} alt={props.product.name} onClick={() => props.handleChangeOverview(props.product.id)} />
      <h5>{props.product.category}</h5>
      <div>{props.product.name}</div>
      <p>${props.product.default_price}</p>
      <StarRating rating={rating}/>
    </Card>
  );
};

export default RelatedProductItem;