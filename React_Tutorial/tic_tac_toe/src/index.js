import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props){
  const isWinning = props.isWinning;
  return (
    <button className={isWinning ? "square-yellow":"square"} onClick = {props.onClick}>
      {props.value}
    </button>
  );
}

function Toggle(props){
  return (
    <label className="switch">
      <input type="checkbox" onClick = {props.onClick}/>
      <span className="slider round"></span>
    </label>
    );
}
  
class Board extends React.Component {
  
  renderSquare(i , isWinning) {
      return (
          <Square 
            value = {this.props.squares[i]}
            onClick = {() => this.props.onClick(i)}
            isWinning = {isWinning}
          />
        );
    }

    createGrid(){

      const winningBoxes = this.props.wins;

      let grid = [];
      let count = 0;
      for (let i=0 ; i<3 ; i++){
        let end = count + 3;
        let children = [];
        while(count < end){
          if(winningBoxes && winningBoxes.includes(count)){
            children.push(this.renderSquare(count , true));
          }
          else{
            children.push(this.renderSquare(count , false));
          }
          count++ ; 
        }
        grid.push(<div className="board-row">{children}</div>);
      }
      return grid;
    }
  
    render() {
      return (
        <div>
          {this.createGrid()}
        </div>
      );
    }
  }
  
  class Game extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        history : [{
          squares : Array(9).fill(null),
          position : -1,
        }],
        isXNext : true,
        stepNumber : 0,
        descending : false,
      }
    }


    handleClick(i){
      
      const history = this.state.history.slice(0 , this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      
      
      if (calculateWinner(squares) || squares[i]){
        return ;
      }
      squares[i] = this.state.isXNext ? 'X' : 'O';
      this.setState({
        history : history.concat([{
          squares : squares,
          position : i,
        }]),
        
        isXNext : !this.state.isXNext,
        stepNumber : history.length,
        
      });
    }

    jumpTo(event , step){
      event.target.style.fontWeight = 'bold';
      this.setState({
        stepNumber: step,
        isXNext: (step % 2) === 0,
      })
    }

    getMoves(){

      const history = this.state.history;

      const moves = history.map((step , move) => {

        const cur_position = step.position;
        const row = Math.floor(cur_position/3) + 1;
        const col = (cur_position % 3) + 1;

        
        
        const desc = move ? `Go to move #${move} (${row} , ${col})` : `Go to game start`;
        return (
          <li key = {move}>
            <button onClick = {(e) => this.jumpTo(e, move)}>{desc}</button>
          </li>
        );
      });

      if(this.state.descending){
        moves.reverse();
      }
      return moves;
    }


    toggle(){
      this.setState({
        descending : !this.state.descending,
      })
    }

    render() {
      
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      
      let winner = calculateWinner(current.squares);
      let winningBoxes;

      const moves = this.getMoves();
      
      let status ;
      if ( winner ){
        winner = winner[0];
        status = `Winner: ${winner}`;
        winningBoxes = calculateWinner(current.squares)[1];
      }
      else{
        if(this.state.history.length === 10){
          status = 'Match Drawn!'
        }
        else{
          status = 'Next player: ' + (this.state.isXNext ? 'X' : 'O');
        }
        
        winningBoxes = null;
      }
      
      return (
        <div className="game">
          <div className="game-board">
            <Board 
              squares = {current.squares}
              onClick = { i => this.handleClick(i)}
              wins = {winningBoxes}
            />
          </div>
          <div className="game-info">
            <b>Descending: </b><Toggle onClick = {() => this.toggle()}/>
            <div>{status }</div>
            <ol>{ moves }</ol>
          </div>
        </div>
      );
    }
  }
  
  function calculateWinner(squares){
    const lines = [
      [0 , 1, 2],
      [3 , 4, 5],
      [6 , 7, 8],
      [0 , 3, 6],
      [1 , 4, 7],
      [2 , 5, 8],
      [0 , 4, 8],
      [2, 4, 6],
    ];
    for(let i=0 ; i < lines.length ; i++){
      const [a, b , c] = lines[i];
      if( squares[a] && squares[a] === squares[b] && squares[b] === squares[c]){
        return [squares[a] , [a,b,c]];
      }
    }
    return null;
  }
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  