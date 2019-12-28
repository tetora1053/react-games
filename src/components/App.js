import React, { Component } from 'react'
import Game from './Game'
import { BrowserRouter, Route, Link } from 'react-router-dom';

const App = () => (
  <BrowserRouter>
    <div>
      <p>ゲーム屋</p>
      <ul>
        <li><Link to='/othello'>オセロ</Link></li>
      </ul>

      <Route path='/othello' component={Game} />
    </div>
  </BrowserRouter>
)

export default App
