import React, { useState, useEffect } from 'react';
import Board from './Board.tsx';
import { CardType } from './types.ts';
import styled, { createGlobalStyle } from 'styled-components';


const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Arial', sans-serif;
    background-color: #f7f7f7;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
`;

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  border-radius: 10px;
`;

const Title = styled.h1`
  margin: 0;
  color: #333;
`;

const App: React.FC = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [turns, setTurns] = useState(0);
  const [firstCard, setFirstCard] = useState<CardType | null>(null);
  const [secondCard, setSecondCard] = useState<CardType | null>(null);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const newCards = createShuffledCards();
    setCards(newCards);
    setTurns(0);
    setFirstCard(null);
    setSecondCard(null);
  };

  const createShuffledCards = (): CardType[] => {
    const icons = ['🍎', '🚗', '🎃', '🌻', '💎', '🍌', '🐱', '🦄'];
    const cardArray = [...icons, ...icons].sort(() => Math.random() - 0.5);
    return cardArray.map((icon, index) => ({ id: index, icon, isFlipped: false, isMatched: false, isVisible: true }));
  };

  const handleCardClick = (id: number) => {
    const newCards = [...cards];
    const clickedCard = newCards.find(c => c.id === id);

    if (firstCard && secondCard) return;
    if (clickedCard?.isFlipped) return;

    if (clickedCard) {
      clickedCard.isFlipped = true;
    }
    
    if (!firstCard) {
      setFirstCard(clickedCard!);
    } else {
      setSecondCard(clickedCard!);
      setTurns(turns + 1);

      if (clickedCard!.icon === firstCard.icon) {
        setTimeout(() => {
          setCards(newCards.map(card => {
            if (card.icon === clickedCard!.icon) {
              return { ...card, isMatched: true, isVisible: false };
            }
            return card;
          }));
          setFirstCard(null);
          setSecondCard(null);
        }, 500);
      } else {
        setTimeout(() => {
          setCards(newCards.map(card => {
            if (card.id === clickedCard!.id || card.id === firstCard.id) {
              return { ...card, isFlipped: false };
            }
            return card;
          }));
          setFirstCard(null);
          setSecondCard(null);
        }, 1000);
      }
    }

    setCards(newCards);
  };

  return (
    <GameContainer>
      <GlobalStyle />
      <Title>Memory Game</Title>
      <Board cards={cards} onCardClick={handleCardClick} />
      {cards.every(card => card.isMatched) && (
        <div>
          <p>Game Over! Turns taken: {turns}</p>
          <button onClick={initializeGame}>Restart</button>
        </div>
      )}
    </GameContainer>
  );
};

export default App;