import React from 'react';
import Card from './Card.tsx';
import styled from 'styled-components';
import { CardType } from './types';

const BoardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 100px);
  gap: 10px;
`;

interface BoardProps {
  cards: CardType[];
  onCardClick: (id: number) => void;
}

const Board: React.FC<BoardProps> = ({ cards, onCardClick }) => (
  <BoardContainer>
    {cards.map(card => (
      <Card key={card.id} card={card} onClick={() => onCardClick(card.id)} />
    ))}
  </BoardContainer>
);

export default Board;
