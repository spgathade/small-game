import React from 'react';

const Message = ({ winner, current }) => {
  const noMovesLeft = current.first.every(el => el !== null);

  return (
    <div className="status-message">
      {winner && (
        <>
          Winner is{'  '}
          <span className={winner === 'X' ? 'text-green' : 'text-orange'}>
            {winner}
          </span>
        </>
      )}
      {!winner && !noMovesLeft && (
        <>
          Next player is{'  '}
          <span className={current.next ? 'text-green' : 'text-orange'}>
            {current.next ? 'X' : 'O'}
          </span>
        </>
      )}
      {!winner && noMovesLeft && 'Draw'}
    </div>
  );
};

export default Message;
