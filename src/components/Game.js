import React from 'react';
import Desc from './Desc';
import ResetGame from './ResetGame';
import SkipTurn from './SkipTurn';
import Board from './Board';
import History from './History';

export default class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      turn: 'black',
      gameResult: {
        isEnd: false,
        isDraw: false,
        winner: "",
        diff: 0,
      }
    }
    this.skipTurn = this.skipTurn.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.switchTurn = this.switchTurn.bind(this);
    this.handleRewindClick = this.handleRewindClick.bind(this);
    this.handleForwardClick = this.handleForwardClick.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.gameResult.isEnd) {
      console.log("already end");
      return;
    }

    let can_put_square_nums = this.getCanPutSquareNums();
    if (can_put_square_nums.length === 0) {
      let next_turn = (this.state.turn === "black") ? "white" : "black";
      let canPutSquareNumsAnother = this.getCanPutSquareNums(next_turn);
      if (canPutSquareNumsAnother.length === 0) {
        console.log("game end");
        const game_result = this.refs.board.getGameResult();
        if (game_result.black !== game_result.white) {
          const winner = (game_result.black > game_result.white) ? "black" : "white";
          const diff = Math.abs(game_result.black - game_result.white);
          this.setState({
            gameResult: {
              isEnd: true,
              winner: winner,
              diff: diff,
            }
          });
        } else {
          this.setState({
            gameResult: {
              isEnd: true,
              isDraw: true,
            }
          });
        }
        return;
      }
      this.refs.skip_turn.enable();
    } else {
      this.refs.board.setCanPutSquareNums(can_put_square_nums);
    }
  }

  getCanPutSquareNums() {
    let res = this.refs.board.getCanPutSquareNums();
    return res;
  }

  resetGame() {
    this.refs.board.resetBoard();
    this.setState({
      turn: 'black',
      gameResult: {
        isEnd: false,
        isDraw: false,
        winner: "",
        diff: 0,
      }
    });
  }

  skipTurn() {
    this.setState({
      turn: (this.state.turn === "black") ? "white" : "black"
    });
  }

  switchTurn() {
    const next = (this.state.turn === "black") ? "white" : "black";
    this.setState({turn: next});
  }

  handleRewindClick() {
    this.refs.board.handleRewindClick();
  }

  handleForwardClick() {
    this.refs.board.handleForwardClick();
  }

  render() {
    return (
      <div>
        <Desc
          turn={this.state.turn}
          gameResult={this.state.gameResult}
        />
        <SkipTurn
          skipTurn={this.skipTurn}
          ref="skip_turn"
        />
        <ResetGame resetGame={this.resetGame}/>
        <Board
          turn={this.state.turn}
          switchTurn={this.switchTurn}
          ref="board"
        />
        <History 
          handleRewindClick={this.handleRewindClick}
          handleForwardClick={this.handleForwardClick}
        />
      </div>
    );
  }
}
