import React from 'react';
import SquareRow from './SquareRow';

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squareStates: this.getInitialSquareStates(),
      statesHistory: [
        this.getInitialSquareStates(),
      ],
      currentStep: 0,
      canPutSquareNums: [],
    }
    this.handleSquareClick = this.handleSquareClick.bind(this);
    this.getReverseSquareNums = this.getReverseSquareNums.bind(this);
    this.getGameResult = this.getGameResult.bind(this);
    this.setCanPutSquareNums = this.setCanPutSquareNums.bind(this);
  }

  getInitialSquareStates() {
    let squareStates = [];
    for (let i = 1; i <= 64; i++) {
      switch (true) {
        case i === 28 || i === 37:
          squareStates[i] = 'white';
          break;
        case i === 29 || i === 36:
          squareStates[i] = 'black';
          break;
        default:
          squareStates[i] = '';
      }
    }
    return squareStates;
  }

  handleSquareClick(e) {
    const square_number = e.target.value;
    let square_states = this.state.squareStates;
    if (square_states[square_number] !== '') {
      console.log("you can't put stone here.");
      return;
    }

    let res = false;
    const direction_arr = ["left", "right", "up", "down", "up-left", "up-right", "down-left", "down-right"];
    for (let i = 0; i < direction_arr.length; i++) {
      let reverse_square_nums_result = {can_put: false, square_nums: []};
      this.getReverseSquareNums(reverse_square_nums_result, Number(square_number), this.props.turn, direction_arr[i], true, null);
      if (reverse_square_nums_result.can_put) {
        res = true;
        square_states[square_number] = this.props.turn;
        for (let i = 0; i < reverse_square_nums_result.square_nums.length; i++) {
          square_states[reverse_square_nums_result.square_nums[i]] = this.props.turn;
        }
        this.setState({squareStates: square_states});
      }
    }

    if (res) {
      this.setState({
        statesHistory: this.state.statesHistory.slice(0, this.state.currentStep + 1).concat([
          this.state.squareStates.slice()
        ]),
        currentStep: ++this.state.currentStep,
      });
      this.props.switchTurn();
    } else {
      console.log("you can't put stone here.");
    }
  }

  getReverseSquareNums(result = {}, square_number, current_turn, direction, is_base = true, limit_square_number = null) {
    if (!is_base) {
      switch (true) {
        case direction == 'left' && square_number < limit_square_number:
        case direction == 'right' && square_number > limit_square_number:
        case direction == 'up' && square_number < limit_square_number:
        case direction == 'down' && square_number > limit_square_number:
        case direction == 'up-left' && square_number < limit_square_number:
        case direction == 'up-right' && square_number < limit_square_number:
        case direction == 'down-left' && square_number > limit_square_number:
        case direction == 'down-right' && square_number > limit_square_number:
          result.can_put = false;
          return;
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

    switch (true) {
      case direction == 'left' && next_square_number < limit_square_number:
      case direction == 'right' && next_square_number > limit_square_number:
      case direction == 'up' && next_square_number < limit_square_number:
      case direction == 'down' && next_square_number > limit_square_number:
      case direction == 'up-left' && next_square_number < limit_square_number:
      case direction == 'up-right' && next_square_number < limit_square_number:
      case direction == 'down-left' && next_square_number > limit_square_number:
      case direction == 'down-right' && next_square_number > limit_square_number:
        result.can_put = false;
        return;
    }

    const next_square_state = this.state.squareStates[next_square_number];
    if (next_square_state == undefined || next_square_state == '') {
      result.can_put = false;
      return;
    }
    if ((is_base && next_square_state !== current_turn) || (!is_base && next_square_state !== current_turn)) {
      this.getReverseSquareNums(result, Number(next_square_number), current_turn, direction, false, limit_square_number);
      if (result.can_put) {
        result.square_nums.push(next_square_number);
      }
    } else if (!is_base && next_square_state === current_turn) {
      result.can_put = true;
    }
    return;
  }

  getLimitSquareNumber(direction, square_number) {
      let limit_square_number;
      let tmp_square_number;
      let number_in_row;
      let current;

      switch (direction) {
        case 'left':
          limit_square_number = square_number - ((square_number - 1) % 8);
          break;

        case 'right':
          limit_square_number = square_number + (8 - (square_number - 1) % 8) - 1;
          break;

        case 'up':
          if (square_number % 8 === 0) {
            limit_square_number = 8;
          } else {
            limit_square_number = square_number % 8;
          }
          break;

        case 'down':
          if (square_number % 8 === 0) {
            limit_square_number = 64;
          } else {
            limit_square_number = 64 - (8 - (square_number % 8));
          }
          break;

        case 'up-left':
          current = square_number;
          number_in_row = (current - 1) % 8;
          while ((current - 9 >= 1) && (number_in_row > (current - 9 - 1) % 8)) {
            current -= 9;
          }
          limit_square_number = current;
          break;

        case 'up-right':
          current = square_number;
          number_in_row = (current - 1) % 8;
          while ((current - 7 >= 1) && (number_in_row < (current - 7 - 1) % 8)) {
            current -= 7;
          }
          limit_square_number = current;
          break;

        case 'down-left':
          current = square_number;
          number_in_row = (current - 1) % 8;
          while ((current + 7 <= 64) && (number_in_row > (current + 7 - 1) % 8)) {
            current += 7;
          }
          limit_square_number = current;
          break;

        case 'down-right':
          current = square_number;
          number_in_row = (current - 1) % 8;
          while ((current + 9 <= 64) && (number_in_row < (current + 9 - 1) % 8)) {
            current += 9;
          }
          limit_square_number = current;
          break;
      }
      return limit_square_number;
  }

  getCanPutSquareNums(specified_turn = null) {
    let can_put_square_nums = [];
    const direction_arr = ["left", "right", "up", "down", "up-left", "up-right", "down-left", "down-right"];
    const turn = (specified_turn === null) ? this.props.turn : specified_turn;
    for (let square_number = 1; square_number <= 64; square_number++) {
      if (this.state.squareStates[square_number] != "") {
        continue;
      }
      for (let i = 0; i < direction_arr.length; i++) {
        let reverse_square_nums_result = {can_put: false, square_nums: []};
        this.getReverseSquareNums(reverse_square_nums_result, Number(square_number), turn, direction_arr[i], true, null);
        if (reverse_square_nums_result.can_put) {
          can_put_square_nums.push(square_number);
          break;
        }
      }
    }
    return can_put_square_nums;
  }

  resetBoard() {
    this.setState({
      squareStates: this.getInitialSquareStates()
    });
  }

  getGameResult() {
    const black_cnt = this.state.squareStates.filter((square_state) => square_state === "black").length;
    const white_cnt = this.state.squareStates.filter((square_state) => square_state === "white").length;
    const game_result = {
      black: black_cnt,
      white: white_cnt
    };
    return game_result;
  }

  handleRewindClick() {
    if (this.state.currentStep === 0) {
      console.log("can't rewind");
      return false;
    }
    this.setState({
      squareStates: this.state.statesHistory[this.state.currentStep - 1].slice(),
      currentStep: --this.state.currentStep,
    });
    this.props.switchTurn();
  }

  handleForwardClick() {
    if (this.state.statesHistory.length === this.state.currentStep + 1) {
      console.log("can't forward");
      return false;
    }
    this.setState({
      squareStates: this.state.statesHistory[this.state.currentStep + 1].slice(),
      currentStep: ++this.state.currentStep,
    });
    this.props.switchTurn();
  }

  setCanPutSquareNums(can_put_square_nums = []) {
    this.setState({
      canPutSquareNums: can_put_square_nums,
    });
  }

  render() {
    let squareRows = [];
    for (let i = 0; i < 8; i++) {
      squareRows.push(
        <SquareRow
          key={i}
          row_number={i}
          handleSquareClick={this.handleSquareClick}
          squareStates={this.state.squareStates}
          canPutSquareNums={this.state.canPutSquareNums}
        />
      );
    }
    return (
      <div id="board">
        {squareRows}
      </div>
    );
  }
}
