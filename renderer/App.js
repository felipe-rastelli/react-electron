import React, { Component } from 'react';

class App extends Component {
  constructor() {
    super();
    this.state = {
      text: 'teste 2'
    };
  }

  componentDidMount() {
    this.test();
    console.log(this.state);
  };

  async test() {
    const text = await Promise.resolve('with async!');
    this.setState({ text });
  };

  render() {
    return (
      <div>
        React + Electron simple boilerplate.
        <span>{this.state.text}</span>
      </div>
    );
  };
}

export default App;
