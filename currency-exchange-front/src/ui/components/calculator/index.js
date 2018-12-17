import React, { Component } from 'react';
import { getCurrencyPrice } from '../../../api/currency';

const currencyEuroId = '5c172da207b9576cae09d429';

class Calculator extends Component {

  state = {
    amountUSD: '',
    amountEUR: '',
    currencyEurPrice: '',
  };

  handleOnChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleCalculate = async (event) => {
    event.preventDefault();

    try {
      const amountUSD = parseFloat(this.state.amountUSD);
      const currencyEur = await getCurrencyPrice(currencyEuroId);
      const amountEUR = amountUSD * currencyEur.change;
      
      this.setState({ currencyEurPrice: currencyEur.change })
      if(!isNaN(amountEUR)) {
        const amountEURFormatted = this.formatPrice(amountEUR);

        this.setState({ amountEUR : amountEURFormatted });
        this.loopRequestEveryXMinutes();
      } else  {
        this.setState({ amountEUR : '' });
      }
    } catch(error) {
      console.log(error);
    }
  }

  loopRequestEveryXMinutes = () => {
    setInterval(async () => {
      try {
        const amountUSD = parseFloat(this.state.amountUSD);
        const currencyEurUpdated = await getCurrencyPrice(currencyEuroId);
        const amountEUR = amountUSD * currencyEurUpdated.change;

        this.setState({ currencyEurPrice: currencyEurUpdated.change })

        if(!isNaN(amountEUR)) {
          const amountEURFormatted = this.formatPrice(amountEUR);

          this.setState({ amountEUR : amountEURFormatted });
        } else  {
          this.setState({ amountEUR : '' });
        }
      } catch(error) {
        console.log(error);
      }
    }, 600000);
  }

  formatPrice = (price) => {
    return price.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 4})
  }

 
  render() {
    const {
      amountUSD,
      amountEUR,
    } = this.state;

    return (
      <div className="calculator-content">
        <div className="calculator-inputs-container">
          <input
            className="calculator-input-usd"
            type="text"
            name="amountUSD"
            value={amountUSD}
            placeholder="USD"
            onChange={this.handleOnChange}
          />
          <input 
            className="calculator-input-eu"
            type="text"
            name="amountEUR"
            value={amountEUR}
            placeholder="EU"
            onChange={this.handleOnChange}
            disabled
          />
        </div>
        <button
          className="calculator-button"
          onClick={this.handleCalculate}
        >
          CALCULATE
        </button>
      </div>
    )
  }
};

export default Calculator;
