import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
        </div>
        <div className="board-row">
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
          {this.renderSquare(7)}
        </div>
        <div className="board-row">
          {this.renderSquare(8)}
          {this.renderSquare(9)}
          {this.renderSquare(10)}
          {this.renderSquare(11)}
        </div>
        <div className="board-row">
          {this.renderSquare(12)}
          {this.renderSquare(13)}
          {this.renderSquare(14)}
          {this.renderSquare(15)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [
        {
          squares: Array(16).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true,
       blockCdX: 4,
       blockCdO: 3
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares)  ) {
      return;
    }
    var block =false;
    if ( squares[i] ) {
       block =   this.state.xIsNext 
       ?this.state.blockCdX<=0&& squares[i]=="O" // this.state.canBlockX&& squares[i]=="O" // this.state.stepNumber%2 == 1 
       :this.state.blockCdO<=0&& squares[i]=="X"; //this.state.stepNumber%2 == 0 
      if (block)
        {
if ( squares[i]=="O" )
this.state.blockCdX=3;

if ( squares[i]=="X" )
this.state.blockCdO=3;

squares[i] ="*";// this.state.xIsNext ? "X" : "O";
}
      else 
       return ;
    }
    else 
    {
      squares[i] = this.state.xIsNext ? "X" : "O";
    }
    this.state.blockCdX= this.state.blockCdX-1;
    this.state.blockCdO= this.state.blockCdO-1;
 
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      blockCdX:   this.state.blockCdX,
      blockCdO:   this.state.blockCdO
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
      blockCdX:   4,
      blockCdO:  3
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    
//        const moves = history.map((step, move) => {
//      const desc = move ?
//             'Go to move #' + move :
//             'Go to game start';
//            return (
//             <li key={move}>
//          <button onClick={() => this.jumpTo(move)}>{desc}</button>
//        </li>
//      );
//        });
// const moves =<button onClick={() => this.jumpTo(null)}>{"Go to game start"}</button>
    let status;
    if (winner) {
      if (winner==="*")
      status = "This game is a draw!";
        else 
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");

      if (this.state.blockCdX<=0)
        if (this.state.xIsNext)
          status += "(can block)";
      if (this.state.blockCdO<=0)
        if (!this.state.xIsNext)
          status += "(can block)";
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          //<ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(squares) {
   //orthagonal 
  for (let row = 0; row < 4; row++)  
  for (let col = 0; col < 4; col++) {
    if (col<3){
    var  [a, b, c] = [col+(row*4), col+(row*4)+1, col+(row*4)+2];
     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
    }
      if (row<3){
     var [a, b, c] = [col+(row*4), col+(row*4)+4, col+(row*4)+8];
     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
      }
  }
  //diagonal
  for (let row = 0; row < 4; row++)  
  for (let col = 0; col < 4; col++) {
    if (row<2 && col<2){
     var [a, b, c] = [col+(row*4), col+(row*4)+5, col+(row*4)+10];
     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
     }
    if (row<2 && col>1){
       var [a, b, c] = [col+(row*4), col+(row*4)+3, col+(row*4)+6];
     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    } 
    }
     
   
      if (row>1 && col>1){
     var [a, b, c] = [col+(row*4), col+(row*4)-5, col+(row*4)-10];
     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }  
    }
      if (row>1 && col<2){
     var [a, b, c] = [col+(row*4), col+(row*4)-3, col+(row*4)-6];
     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }  
      }
  }
 
       
  return null;
}





// WEBPACK FOOTER //
// src/index.js

 


// WEBPACK FOOTER //
// src/index.js


// WEBPACK FOOTER //
// src/index.js


// WEBPACK FOOTER //
// src/index.js