/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
/* eslint-disable radix */
import React, { Component } from 'react';
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  FormSelect,
  Button
} from 'shards-react';
import { Config } from '../../../configue';

class DACForm extends Component {
  state = {
    idDAC: 0,
    DACName: '',
    Quantity: 0,
    DACstate: 0
  };

  handleChange = e => {
    if (e.target.id === 'DACstate') {
      this.setState({
        [e.target.id]: parseInt(e.target.value)
      });
    } else {
      this.setState({
        [e.target.id]: e.target.value
      });
    }
  };

  handleSubmit = e => {
    e.preventDefault(e);

    this.postMethode(this.state).then(d => {
      const idDAC = d.data;

      this.props.addDAC(this.state, idDAC);
    });
  };

  postMethode(a) {
    const encodedKeyDACName = encodeURIComponent('DACName');
    const encodedKeyQuantity = encodeURIComponent('Quantity');
    const encodedKeyDACstate = encodeURIComponent('DACstate');

    const encodedvalDACName = encodeURIComponent(a.DACName);
    const encodedvalQuantity = encodeURIComponent(a.Quantity);
    const encodedvalDACstate = encodeURIComponent(parseInt(a.DACstate));

    let formbody = [
      `${encodedKeyDACName}=${encodedvalDACName}`,
      `${encodedKeyQuantity}=${encodedvalQuantity}`,
      `${encodedKeyDACstate}=${encodedvalDACstate}`
    ];
    formbody = formbody.join('&');

    const data = fetch(`${Config.url}/DAC`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded' // <-- Specifying the Content-Type
      },
      body: formbody // <-- Post parameters
    })
      .then(responseText => {
        return responseText.json();
      })
      .catch(error => {
        console.error(error);
      });
    return data;
  }

  render() {
    return (
      <ListGroup flush>
        <ListGroupItem className="p-3">
          <Row>
            <Col>
              <Form onSubmit={this.handleSubmit}>
                <Row form>
                  <Col md="6" className="form-group">
                    <label htmlFor="DACName">nom DAC</label>
                    <FormInput
                      id="DACName"
                      name="DACName"
                      type="text"
                      placeholder="nom du DAC .."
                      onChange={this.handleChange}
                      value={this.state.DACName}
                    />
                  </Col>
                  <Col md="6" classDACName="form-group">
                    <label htmlFor="Quantity">Quantite </label>
                    <FormInput
                      id="Quantity"
                      type="number"
                      placeholder="Quantite"
                      onChange={this.handleChange}
                      value={this.state.Quantity}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="6" className="form-group">
                    <label htmlFor="DACstate">DACstate</label>
                    <FormSelect id="DACstate" onChange={this.handleChange}>
                      <option value="0" selected>
                        GOOD
                      </option>

                      <option value="1">BAD</option>
                      <option value="2">WARRNING</option>
                      <option value="3">MAINTENANCE</option>
                    </FormSelect>
                  </Col>
                </Row>
                <center>
                  {' '}
                  <Button type="submit">ajouter DAC</Button>
                </center>
              </Form>
            </Col>
          </Row>
        </ListGroupItem>
        <ListGroupItem>
          <Row />
        </ListGroupItem>
      </ListGroup>
    );
  }
}

export default DACForm;
