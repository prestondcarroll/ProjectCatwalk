import React, { useState, useEffect } from 'react';
import OutfitItem from './OutfitItem.jsx';
import styled from 'styled-components';
import $ from 'jquery';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const CarouselContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-family: Helvetica, Arial, sans-serif;
  margin-right: 25%;
  margin-left: 25%;
  align-items: center;
  justify-content: center;
`
const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
`
const Card = styled.div`
  border-style: groove;
  margin-left: 20px;
  margin-right: 20px;
  position: relative;
  width: 250px;
  text-align: center;
  line-height: 350px;
`
const Wrapper = styled.div`
  margin-left: 25%;
  margin-top: 4%;
  margin-bottom: 2%;
  font-color: #696969;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 1.25em;
`

const Outfit = (props) => {
  const [productIndex, setProductIndex] = useState(0);
  const [isLeftButtonShown, setIsLeftButtonShown] = useState(false);
  const [isRightButtonShown, setIsRightButtonShown] = useState(true);
  const [currentProduct, setCurrentProduct] = useState({});

  const CAROUSEL_WIDTH = 2;

  const handleClick = (isRight) => {
    if (isRight) {
      setProductIndex(productIndex + 1)
      setIsLeftButtonShown(true);
      if (productIndex + 1 + CAROUSEL_WIDTH >= props.outfits.length) {
        setIsRightButtonShown(false);
      } else {
        setIsRightButtonShown(true);
      }
    } else {
      setProductIndex(productIndex - 1)
      setIsRightButtonShown(true);
      if (productIndex - 1 <= 0) {
        setIsLeftButtonShown(false);
      } else {
        setIsLeftButtonShown(true);
      }
    }
  }

  useEffect(() => {
    $.ajax({
      method: 'GET',
      url:`http://localhost:3000/products/${props.productId}/`,
      success: (product) => {
        // console.log(product);
        setCurrentProduct(product);
      },
      error: (err) => {
        // console.log(err);
      }
    });
  }, []);

  return (
    <div>
      <Wrapper>YOUR OUTFIT</Wrapper>
      <CarouselContainer>
        <FaAngleLeft size={30} onClick={() => handleClick(false)} style={{visibility: isLeftButtonShown ? 'visible' : 'hidden' }} />
        <CardContainer>
          <Card onClick={() => props.handleAddOutfits()}>Add to Outfit</Card>
          {props.outfits.slice(productIndex, productIndex + CAROUSEL_WIDTH).map(product => <OutfitItem product={product}
           handleDeleteOutfit={props.handleDeleteOutfit} />)}
        </CardContainer>
        <FaAngleRight size={30} onClick={() => handleClick(true)} style={{visibility: isRightButtonShown ? 'visible' : 'hidden' }} />
      </CarouselContainer>
    </div>
  );
}

export default Outfit;