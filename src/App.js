import React, { useState } from 'react';
import Board from './Components/Board';
import { calculateWinner } from './winner';

import './Styles/Board.style.scss';

const App = () => {
  const [first, setfirst] = useState(Array(9).fill(null));
  const [next, setnext] = useState(0);

  const winner = calculateWinner(first);
  const message = winner
    ? `Winner is ${winner}`
    : `Next Player is ${next ? 'X' : 'O'}`;

  const SquareClick = position => {
    if (first[position] || winner) {
      return;
    }

    setfirst(prev => {
      return prev.map((square, pos) => {
        if (pos === position) {
          return next ? 'X' : 'O';
        }
        return square;
      });
    });
    setnext(prev => !prev);
  };

  return (
    <div className="app">
      <h1>X-O Tic Tac Toe</h1>
      <Board SquareClick={SquareClick} first={first} />
      <h2>{message}</h2>
    </div>
  );
};

export default App;
