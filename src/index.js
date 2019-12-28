import React from 'react';
import ReactDOM from 'react-dom';
import ChildComponent from './components/App';
import './index.css';

const ParentComponent = () => (
  <div>
    <ChildComponent/>
  </div>
)

ReactDOM.render(
  <ParentComponent/>,
  document.getElementById('root')
);

