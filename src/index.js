import React, { useState } from 'react';
import ReactDOM from'react-dom';
import './index.css';

const boardStyle = {
  backgroundColor: 'grey',
  margin: 10,
  padding: 20
}
const Square = (props) => {

  return (
    <button 
    className='square'
    onClick={props.onClickEvent}>
      {props.value}
    </button>
  )
}

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let line of lines) {
    const [a, b, c] = line;
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  return null;
};

const Board = () => {

  const initialSquare = Array(9).fill(null);

  const [squares, setSquares] = useState(initialSquare);
  const [nextPlayer, setNextPlayer] = useState(true);

  const handleClick = (i) => {
    const newSquare = [...squares];
    const winnerDeclared = Boolean(calculateWinner(newSquare));
    const squareFilled = Boolean(newSquare[i]);

    if (winnerDeclared || squareFilled) {
      return;
    }


    newSquare[i] = nextPlayer ? 'X' : 'O';
    setSquares(newSquare);
    setNextPlayer(!nextPlayer);
  }

  const renderSquare = (i) => {
    return (
          <Square 
          value={squares[i]}
          onClickEvent = {() => handleClick(i)} />
        );
  }
  const winner = calculateWinner(squares);
  const status = winner
    ? `Winner: ${winner}`
    : `Next player is: ${nextPlayer ? 'X' : 'O'}`;
  
  return (
      <div style={boardStyle}>
        <div className='status'>{status}</div>
        <div className='board-row'>
          {renderSquare(0)}{renderSquare(1)}{renderSquare(2)}
        </div>
        <div className='board-row'>
          {renderSquare(3)}{renderSquare(4)}{renderSquare(5)}
        </div>
        <div className='board-row'>
          {renderSquare(6)}{renderSquare(7)}{renderSquare(8)}
        </div>
      </div>
  );
}


const Game = () => {
  return (
      <div className='game'>
        Tic-Tac-Toe
        <Board />
      </div>
  );
};

ReactDOM.render(<Game />, document.getElementById('root'));
