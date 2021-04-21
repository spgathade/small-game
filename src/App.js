import React from 'react';

import Board from './Components/Board';

import './Styles/Board.style.scss';

const App = () => {
  return (
    <div className="app">
      <h1>X-O Tic Tac Toe</h1>
      <Board />
    </div>
  );
};

export default App;
