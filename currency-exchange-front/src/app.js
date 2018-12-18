import React, { Component } from 'react';
import './app.scss';
import Calculator from './ui/components/calculator';

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="app-header">
          <p>
            Currency Exchange
          </p>
        </header>

        <Calculator />

        <footer className="app-footer">
          <div className="app-footer-container">
            <div className="app-content has-text-centered">
              <p>
                <strong>Powered by</strong> <a href="https://github.com/euribe1/">Eliecer Uribe</a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
