import React from 'react';

const Message = ({ winner, current }) => {
  const noMovesLeft = current.first.every(el => el !== null);

  return (
    <h2>
      {winner && `Winner is ${winner}`}
      {!winner && !noMovesLeft && `Next player is ${current.next ? 'X' : 'O'}`}
      {!winner && noMovesLeft && 'Draw'}
    </h2>
  );
};

export default Message;
