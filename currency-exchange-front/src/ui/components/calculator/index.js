import React, { Component } from 'react';
import { getCurrencyPrice } from '../../../api/currency';

import { Button, FormGroup, FormControl, HelpBlock, Label } from 'react-bootstrap';

import './styles.scss';

const currencyEuroId = '5c172da207b9576cae09d429';

class Calculator extends Component {

  state = {
    amountUSD: '',
    amountEUR: '',
    currencyEurPrice: '',
    errorState: null,
  };

  componentDidMount = async () => {
    try {
      const currencyEur = await getCurrencyPrice(currencyEuroId);

      this.setState({ currencyEurPrice: currencyEur.change });
      this.loopRequestEveryXTimes(600000); // cada 10 minutos
    } catch(error) {
      console.log(error);
    }
  }

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
      const amountUSD = this.getValidationPrice(this.state.amountUSD);

      if(amountUSD) {
        const amountEUR = amountUSD * this.state.currencyEurPrice;
        const amountEURFormatted = this.formatPrice(amountEUR);
        
        this.setState({ amountEUR : amountEURFormatted });
      } else  {
        this.setState({ amountEUR : '' });
      }
    } catch(error) {
      console.log(error);
    }
  }

  loopRequestEveryXTimes = (miliseconds) => {
    setInterval(async () => {
      try {
        const amountUSD = parseFloat(this.state.amountUSD);
        const currencyEurUpdated = await getCurrencyPrice(currencyEuroId);
        const amountEUR = amountUSD * currencyEurUpdated.change;

        this.setState({ currencyEurPrice: currencyEurUpdated.change });

        if(!isNaN(amountEUR)) {
          const amountEURFormatted = this.formatPrice(amountEUR);
          this.setState({ amountEUR : amountEURFormatted });
        } else  {
          this.setState({ amountEUR : '' });
        }
      } catch(error) {
        console.log(error);
      }
    }, miliseconds);
  }

  formatPrice = (price) => {
    return price.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 4})
  }

  getValidationPrice = (amountUSD) => {
    const priceInUsd = amountUSD;

    if (isNaN(priceInUsd)) {
      this.setState({ errorState: 'error' });
      return null;
    } else {
      this.setState({ errorState: 'success' });
      return parseFloat(priceInUsd);
    }
  }

  render() {
    const {
      amountUSD,
      amountEUR,
      errorState,
    } = this.state;

    return (
      <div className="calculator-content">
        <form>
          <FormGroup
            controlId="formBasicText"
            validationState={errorState}
          >
            <div className="calculator-wrapper-input-usd">
              <div className="calculator-field-input-usd">
                <Label className="calculator-label-usd">$</Label>
                <FormControl
                  className="calculator-input-usd"
                  type="text"
                  name="amountUSD"
                  value={amountUSD}
                  placeholder="USD"
                  onChange={this.handleOnChange}
                />
              </div>
              <FormControl.Feedback />
              <HelpBlock className={`
                ${errorState === 'error' ? 'is-visible' : 'is-hidden'}
              `}
              >
                Not a valid number
              </HelpBlock>
            </div>
            <div className="calculator-wrapper-input-eu">
              <Label className="calculator-label-eu">€</Label>
              <FormControl
                className="calculator-input-eu"
                type="text"
                name="amountEUR"
                value={amountEUR}
                placeholder="EU"
                onChange={this.handleOnChange}
                disabled
              />
            </div>
          </FormGroup>
          <Button
            bsStyle="primary"
            className="calculator-button"
            onClick={this.handleCalculate}
          >
            CALCULATE
          </Button>
        </form>
      </div>
    )
  }
};

export default Calculator;
