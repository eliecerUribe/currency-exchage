import React, { Component } from 'react';
import './app.scss';
import Calculator from './ui/components/calculator';

class App extends Component {
  render() {
    return (
      <div className="app">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous" />

        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossOrigin="anonymous" />


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
