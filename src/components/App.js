import React, { Component } from 'react'
import Othello from './Othello'
import { BrowserRouter, Route, Link } from 'react-router-dom';

const App = () => (
  <BrowserRouter>
    <div>
      <p>ゲーム屋</p>
      <ul>
        <li><Link to='/othello'>オセロ</Link></li>
      </ul>

      <Route path='/othello' component={Othello} />
    </div>
  </BrowserRouter>
)

export default App
