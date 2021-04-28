import React, { useState } from 'react';
import Board from './Components/Board';
import History from './Components/History';
import Message from './Components/Message';
import { calculateWinner } from './winner';

import './Styles/Board.style.scss';

const NewGame = [{ first: Array(9).fill(null), next: true }];
const App = () => {
  const [history, sethistory] = useState(NewGame);
  const [currentMove, setcurrentMove] = useState(0);
  const current = history[currentMove];
  const { winner, winningSquares } = calculateWinner(current.first);

  const SquareClick = position => {
    if (current.first[position] || winner) {
      return;
    }

    sethistory(prev => {
      const last = prev[prev.length - 1];
      const newFirst = last.first.map((square, pos) => {
        if (pos === position) {
          return last.next ? 'X' : 'O';
        }
        return square;
      });
      return prev.concat({ first: newFirst, next: !last.next });
    });
    setcurrentMove(prev => prev + 1);
  };
  const moveTo = move => {
    setcurrentMove(move);
  };
  const onNewGame = () => {
    sethistory(NewGame);
    setcurrentMove(0);
  };

  return (
    <div className="app">
      <h1>
        <span className="text-orange">X</span>-
        <span className="text-green">O</span>
        <span className="text-orange"> Tic</span>
        <span className="text-green">Tac</span>
        <span className="text-orange">Toe</span>
      </h1>
      <Board
        SquareClick={SquareClick}
        first={current.first}
        winningSquares={winningSquares}
      />
      <br />
      <Message winner={winner} current={current} />
      <button
        type="button"
        onClick={onNewGame}
        className={`btn-reset ${winner ? 'active' : ''}`}
      >
        Start New Game
      </button>
      <h5 className="gamehis">Current Game History</h5>
      <h3>
        <History history={history} moveTo={moveTo} currentMove={currentMove} />
      </h3>
      <div className="bg-balls" />
    </div>
  );
};

export default App;
