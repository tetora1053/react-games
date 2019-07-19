import React from 'react';
import Desc from './Desc';
import ResetGame from './ResetGame';
import SkipTurn from './SkipTurn';
import Board from './Board';

export default class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      turn: 'black',
      squareStates: this.getInitialSquareStates(),
    }
    this.skipTurn = this.skipTurn.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.handleSquareClick = this.handleSquareClick.bind(this);
    this.getReverseSquareNums = this.getReverseSquareNums.bind(this);
    this.getGameResult = this.getGameResult.bind(this);
  }

  getInitialSquareStates() {
    let squareStates = [];
    for (let i = 0; i < 64; i++) {
      switch (true) {
        case i === 27 || i === 36:
          squareStates[i] = 'white';
          break;
        case i === 28 || i === 35:
          squareStates[i] = 'black';
          break;
        default:
          squareStates[i] = '';
      }
    }
    return squareStates;
  }

  resetGame() {
    this.setState({
      turn: 'black',
      squareStates: this.getInitialSquareStates(),
    });
  }

  skipTurn() {
    this.setState({
      turn: (this.state.turn === "black") ? "white" : "black"
    });
  }

  handleSquareClick(e) {
    const square_number = e.target.value;
    let square_states = this.state.squareStates;
    if (square_states[square_number] !== '') {
      console.log("you cant put stone here.");
      return;
    }

    let res = false;
    const direction_arr = ["left", "right", "up", "down", "up-left", "up-right", "down-left", "down-right"];
    for (let i = 0; i < direction_arr.length; i++) {
      let reverse_square_nums_result = {can_put: false, square_nums: []};
      this.getReverseSquareNums(reverse_square_nums_result, Number(square_number), this.state.turn, direction_arr[i], true, null);
      if (reverse_square_nums_result.can_put) {
        res = true;
        for (let i = 0; i < reverse_square_nums_result.square_nums.length; i++) {
          square_states[reverse_square_nums_result.square_nums[i]] = this.state.turn;
        }
        this.setState({squareStates: square_states});
      }
    }
    if (!res) {
      console.log("you cant put stone here.");
      return;
    }

    const next_turn = (this.state.turn === 'black') ? 'white': 'black';
    square_states[square_number] = this.state.turn;
    this.setState({
      turn: next_turn,
      squareStates: square_states,
    });
  }

  getReverseSquareNums(result = {}, square_number, current_turn, direction, is_base = true, limit_square_number = null) {
    if (!is_base) {
      switch (true) {
        case direction === 'left' && square_number < limit_square_number:
        case direction === 'right' && square_number > limit_square_number:
        case direction === 'up' && square_number < limit_square_number:
        case direction === 'down' && square_number > limit_square_number:
        case direction === 'up-left' && square_number < limit_square_number:
        case direction === 'up-right' && square_number < limit_square_number:
        case direction === 'down-left' && square_number > limit_square_number:
        case direction === 'down-right' && square_number > limit_square_number:
          return false;
      }
    }
    if (is_base) {
      limit_square_number = this.getLimitSquareNumber(direction, square_number);
    }
    let next_square_number;
    switch (direction) {
      case 'left':
        next_square_number = square_number - 1;
        break;
      case 'right':
        next_square_number = square_number + 1;
        break;
      case 'up':
        next_square_number = square_number - 8;
        break;
      case 'down':
        next_square_number = square_number + 8;
        break;
      case 'up-left':
        next_square_number = square_number - 9;
        break;
      case 'up-right':
        next_square_number = square_number - 7;
        break;
      case 'down-left':
        next_square_number = square_number + 7;
        break;
      case 'down-right':
        next_square_number = square_number + 9;
        break;
    }
    const next_square_state = this.state.squareStates[next_square_number];
    if (next_square_state == undefined || next_square_state == '') {
      return false;
    }
    if ((is_base && next_square_state !== current_turn) || (!is_base && next_square_state !== current_turn)) {
      this.getReverseSquareNums(result, Number(next_square_number), current_turn, direction, false, limit_square_number);
      if (result.can_put) {
        result.can_put = true;
        result.square_nums.push(next_square_number);
      }
    } else if (!is_base && next_square_state === current_turn) {
      result.can_put = true;
    }
    return result;
  }

  getLimitSquareNumber(direction, square_number) {
      let limit_square_number;
      let tmp_square_number;
      let number_in_row;

      switch (direction) {
        case 'left':
          limit_square_number = square_number - (square_number % 8);
          break;

        case 'right':
          limit_square_number = square_number + (8 - (square_number % 8)) - 1;
          break;

        case 'up':
          limit_square_number = square_number % 8;
          break;

        case 'down':
          limit_square_number = 64 - (8 - (square_number % 8));
          break;

        case 'up-left':
          tmp_square_number = square_number;
          number_in_row = tmp_square_number % 8;
          while (true) {
            if ((tmp_square_number - 9 >= 0) && (number_in_row > (tmp_square_number - 9) % 8)) {
              tmp_square_number -= 9;
              number_in_row = tmp_square_number % 8;
              continue;
            }
            break;
          }
          limit_square_number = tmp_square_number;
          break;

        case 'up-right':
          tmp_square_number = square_number;
          number_in_row = tmp_square_number % 8;
          while (true) {
            if ((tmp_square_number - 7 >= 0) && (number_in_row < (tmp_square_number - 7) % 8)) {
              tmp_square_number -= 7;
              number_in_row = tmp_square_number % 8;
              continue;
            }
            break;
          }
          limit_square_number = tmp_square_number;
          break;

        case 'down-left':
          tmp_square_number = square_number;
          number_in_row = tmp_square_number % 8;
          while (true) {
            if ((tmp_square_number + 7 <= 63) && (number_in_row > (tmp_square_number + 7) % 8)) {
              tmp_square_number += 7;
              number_in_row = tmp_square_number % 8;
              continue;
            }
            break;
          }
          limit_square_number = tmp_square_number;
          break;

        case 'down-right':
          tmp_square_number = square_number;
          number_in_row = tmp_square_number % 8;
          while (true) {
            if ((tmp_square_number + 9 <= 63) && (number_in_row < (tmp_square_number + 9) % 8)) {
              tmp_square_number += 9;
              number_in_row = tmp_square_number % 8;
              continue;
            }
            break;
          }
          limit_square_number = tmp_square_number;
          break;
      }
      return limit_square_number;
  }

  getGameResult() {
    const black_cnt = this.state.squareStates.filter((square_state) => square_state === "black").length;
    const white_cnt = this.state.squareStates.filter((square_state) => square_state === "white").length;
    const game_result = {
      "is_draw" : false,
      "winner" : "",
      "winner_str" : "",
      "diff" : 0,
    };
    if (black_cnt === white_cnt) {
      game_result.is_draw = true;
    } else {
      game_result.winner = (black_cnt > white_cnt) ? "black" : "white";
      game_result.diff = Math.abs(black_cnt - white_cnt);
    }
    return game_result;
  }

  render() {
    if (!this.state.squareStates.some((square_state) => square_state == "")) {
      console.log("ゲーム終了")
      const game_result = this.getGameResult();
      if (game_result.is_draw) {
        console.log("引き分けです");
      } else {
        const winner_str = (game_result.winner === "black") ? "黒" : "白";
        console.log(winner_str + "の" + game_result.diff + "石勝ちです");
      }
    }
    return (
      <div>
        <Desc turn={this.state.turn}/>
        <SkipTurn skipTurn={this.skipTurn}/>
        <ResetGame resetGame={this.resetGame}/>
        <Board
          turn={this.state.turn}
          handleSquareClick={this.handleSquareClick}
          squareStates={this.state.squareStates}
        />
      </div>
    );
  }
}