import React from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import { CardType } from './types';

const CardContainer = styled.div<{ isFlipped: boolean; isMatched: boolean; isVisible: boolean }>`
  width: 100px;
  height: 100px;
  background-color: ${props => (props.isFlipped || props.isMatched ? '#fff' : '#ccc')};
  display: ${props => (props.isVisible ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  font-size: 2em;
  cursor: ${props => (props.isFlipped || props.isMatched ? 'default' : 'pointer')};
  transition: transform 0.6s;
  transform: ${props => (props.isFlipped || props.isMatched ? 'rotateY(180deg)' : 'none')};
`;

interface CardProps {
  card: CardType;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ card, onClick }) => (
  <CSSTransition in={card.isFlipped || card.isMatched} timeout={300} classNames="card">
    <CardContainer isFlipped={card.isFlipped} isMatched={card.isMatched} isVisible={card.isVisible} onClick={onClick}>
      {(card.isFlipped || card.isMatched) && card.icon}
    </CardContainer>
  </CSSTransition>
);

export default Card;