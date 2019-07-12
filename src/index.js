import React from 'react';
import ReactDOM from 'react-dom';
import ChildComponent from './othello';
import './index.css';

class ParentComponent extends React.Component {
  render() {
    return (
      <div>
        <ChildComponent/>
      </div>
    )
  }
}

ReactDOM.render(
  <ParentComponent/>,
  document.getElementById('root')
);