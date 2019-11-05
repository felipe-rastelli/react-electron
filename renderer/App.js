import React, { Component } from 'react';

import Dashboard from './components/Dashboard';

import styles from './app.scss';
// import image from './assets/images/feed-1.png';

class App extends Component {
  constructor() {
    super();
    this.state = {
      text: 'teste 2'
    };
  }

  componentDidMount = () => {
    this.test();
  };

  test = async () => {
    const text = await Promise.resolve('with async!');
    this.setState({ text });
  };

  render = () => {
    return (
      <div className={styles.test}>
        React + Electron simple boilerplate!!
        <span>{this.state.text}</span>
        {/* <img src={image}></img> */}
        <Dashboard />
      </div>
    );
  };
}

export default App;
