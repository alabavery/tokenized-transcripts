import React, { Component } from 'react';
import './App.css';
import TokenizePage from './pages/TokenizePage';
import PracticePage from './pages/PracticePage';
import AddContentPage from './pages/AddContentPage';

const text = "Donc je suis avec Mina. Mina, tu es étudiante et en même temps, tu travailles comme équipière " +
  "polyvalente (1) à Burger King. Est-ce que tu peux nous dire un peu comment tu le vis, s’il te plaît?\n" +
  "M : Bah, déjà (2), je le vis très bien, parce que c’est… Il y a une part de responsabilité. Je me sens autonome " +
  "pour travailler et payer mes études en même temps. Je dépends pas (3) de ma famille.\n" +
  "G : D’accord.\n" +
  "M : Et… Voilà.";

class App extends Component {
  state = { show: 'tokenize' };
  render() {
    return (
      <div className="App">
        <header>
          <ul id="navbar">
            <li className="navbar-item" onClick={() => this.setState({ show: 'practice' })}>Practice</li>
            <li className="navbar-item" onClick={() => this.setState({ show: 'tokenize' })}>Make new tokens</li>
            <li className="navbar-item" onClick={() => this.setState({ show: 'addContent' })}>Add Content</li>
          </ul>
        </header>
        {this.state.show === 'tokenize' ? <TokenizePage text={text} /> : null }
        {this.state.show === 'practice' ? <PracticePage /> : null }
        {this.state.show === 'addContent' ? <AddContentPage /> : null }
      </div>
    );
  }
}

export default App;
