import React, { useState, useEffect } from 'react';
import Board from './Board.tsx';
import { CardType } from './types.ts';

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
    return cardArray.map((icon, index) => ({ id: index, icon, isFlipped: false, isMatched: false }));
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
    } else if (!secondCard) {
      setSecondCard(clickedCard!);
      setTurns(turns + 1);

      if (clickedCard!.icon === firstCard.icon) {
        setCards(newCards.map(card => card.icon === clickedCard!.icon ? { ...card, isMatched: true } : card));
        setFirstCard(null);
        setSecondCard(null);
      } else {
        setTimeout(() => {
          setCards(newCards.map(card => (card?.id === clickedCard?.id || card?.id === firstCard?.id) ? { ...card, isFlipped: false } : card));
          setFirstCard(null);
          setSecondCard(null);
        }, 1000);
      }
    }

    setCards(newCards);
  };

  return (
    <div>
      <h1>Memory Game</h1>
      <Board cards={cards} onCardClick={handleCardClick} />
      {cards.every(card => card.isMatched) && (
        <div>
          <p>Game Over! Turns taken: {turns}</p>
          <button onClick={initializeGame}>Restart</button>
        </div>
      )}
    </div>
  );
};

export default App;