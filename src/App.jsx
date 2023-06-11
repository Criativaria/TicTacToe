import React, { Fragment } from "react";
import { useState } from "react";
import "./styles.css";

 function Board({xIsNext, squares, onPlay}) {

  function handleClick(i) {
    if (calculateWinner(squares)|| squares[i] ) {
      return;
    }

    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O"
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;

  if (winner) {
    status =  winner + " Ganhou!";
  }

  function Square({ value, onSquareClick }) {

    return (
      <button className="square" maxLength={1}
      onClick={onSquareClick}>{value}</button>
    );
    
  }
   
  return (
    <Fragment>
      <div className="todo">
        <h1 className="titulo">TicTacToe</h1>
          <div className="board-status">
            <h2 className="status">{status}</h2>
              <div className="board" >
                <div className="board-div" style={{ '--mark-text': `'${xIsNext ? "X" : "O"}'` }}>
                    <div className="board-row" >
                    <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
                    <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
                    <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
                    </div>
                    <div className="board-row">
                    <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
                    <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
                    <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
                    </div>
                    <div className="board-row">
                    <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
                    <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
                    <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
                    </div>
                  </div>
            </div>
        </div>
        <a href="https://www.twitch.tv/criativaria" target="_blank" className="logo"><img src="https://ik.imagekit.io/hp5za42qc/logo__1_.png?updatedAt=1686460889203" /></a>
      </div>
     
    </Fragment>
  ) 
}

export default function Game() {

  const [xIsNext, setXIsNext] = useState(true);

  const [history, setHistory] = useState([Array(9).fill(null)]);

  const [currentMove, setCurrentMove] = useState(0);

  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }

  const moves = history.map((squares, move) => {

    let descricao;

    if (move > 0) {
      descricao = 'Ir para a jogada ' + move;
    } else {
      descricao = 'Recomeçar';
    }

    return (
      
      <li className="list" key={move} >

        <button className="button-saltoTempo" onClick={() => jumpTo(move)}>{descricao}</button>
        
      </li>

    );

  });



  return (
      
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol className="ol">{moves}</ol>
      </div>
    </div>

  );
  }

function calculateWinner(squares) {

  const lines = [

    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++){
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;

}



