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
    const Lastmove = currentMove + 1 === history.length;

    sethistory(prev => {
      const last = Lastmove ? prev[prev.length - 1] : prev[currentMove];
      const newFirst = last.first.map((square, pos) => {
        if (pos === position) {
          return last.next ? 'X' : 'O';
        }
        return square;
      });
      const currentHistory = Lastmove
        ? prev
        : prev.slice(0, prev.indexOf(last) + 1);
      return currentHistory.concat({ first: newFirst, next: !last.next });
    });
    setcurrentMove(prev => prev + 1);
  };
  const moveTo = move => {
    setcurrentMove(move);
  };

  const Undo = () => {
    if (currentMove !== 0) {
      return setcurrentMove(prev => prev - 1);
    }
    return null;
  };

  const Redo = () => {
    if (currentMove + 1 === history.length) {
      //  if (currentMove >= 0 && currentMove !== 0) {
      return;
    }
    setcurrentMove(prev => prev + 1);
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
      <div>
        <button type="button" onClick={Undo} className="btn">
          Undo
        </button>
        <button
          type="button"
          onClick={onNewGame}
          className={`btn-reset ${winner ? 'active' : ''}`}
        >
          Start New Game
        </button>

        <button
          type="button"
          onClick={Redo}
          disabled={currentMove + 1 === history.length}
          className="btn"
        >
          Redo
        </button>
      </div>
      <h5 className="gamehis">Current Game History</h5>
      <h3>
        <History history={history} moveTo={moveTo} currentMove={currentMove} />
      </h3>
      <div className="bg-balls" />
    </div>
  );
};

export default App;
