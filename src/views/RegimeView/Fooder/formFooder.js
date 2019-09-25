/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable eqeqeq */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  Button
} from 'shards-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faRedo } from '@fortawesome/free-solid-svg-icons';
import {
  NotificationContainer,
  NotificationManager
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { Config } from '../../../configue';

class FormGroupv extends Component {
  state = {
    FooderName: '',
    density: 0,
    InvalidFooderName: false,
    validFooderName: false,
    InvalidDensity: false,
    validDensity: false
  };

  componentDidMount() {
    console.log(this.state);
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  Submiting = e => {
    e.preventDefault();
    console.log('**********');

    console.log(this.state);
    console.log('**********');
    if (this.state.FooderName === '') {
      this.setState({
        validFooderName: true,
        InvalidFooderName: false
      });
    } else
      this.setState({
        validFooderName: false,
        InvalidFooderName: true
      });
    if (this.state.density == 0) {
      this.setState({
        validDensity: true,
        InvalidDensity: false
      });
    } else
      this.setState({
        validDensity: false,
        InvalidDensity: true
      });
    let unicite = false;
    if (this.state.FooderName != '') {
      const { Fooder } = this.props;
      console.log('vaches');
      console.log(Fooder);
      // eslint-disable-next-line no-shadow
      const Food = Fooder.filter(Food => {
        if (Food.FooderName == this.state.FooderName) return Food;
      });
      console.log('vache');
      console.log(Food);
      if (Food.length == 0) {
        unicite = true;
      } else {
        NotificationManager.error('Nom existant', '', 3000);
      }
    }
    if (this.state.FooderName != '' && this.state.density != 0 && unicite) {
      this.postMethode(this.state).then(idFood => {
        const id = idFood.data;
        console.log("***************")
        console.log(id)
        // eslint-disable-next-line react/destructuring-assignment
        this.props.add(this.state , id);
        this.setState({
          FooderName: '',
          density: 0,
          validFooderName: false,
          InvalidFooderName: true
        });
      });
    }
  };

  postMethode = a => {
    const encodedKeyFooderName = encodeURIComponent('FooderName');
    const encodedKeydensity = encodeURIComponent('density');

    const encodedvalFooderName = encodeURIComponent(a.FooderName);
    const encodedvaldensity = encodeURIComponent(a.density);
    let formbody = [
      `${encodedKeyFooderName}=${encodedvalFooderName}`,
      `${encodedKeydensity}=${encodedvaldensity}`
    ];
    formbody = formbody.join('&');

    // eslint-disable-next-line no-undef
    const data = fetch(`${Config.url}/fooder`, {
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
  };

  render() {
    return (
      <ListGroup flush>
        <ListGroupItem className="p-3">
          <Row>
            <Col>
              <Form onSubmit={this.Submiting}>
                <Row form>
                  <Col md="6" className="form-group">
                    <label htmlFor="FooderName">Nom Aliment </label>
                    <FormInput
                      valid={this.state.InvalidFooderName}
                      invalid={this.state.validFooderName}
                      id="FooderName"
                      name="FooderName"
                      type="text"
                      placeholder="FooderName"
                      onChange={this.handleChange}
                      value={this.state.FooderName}
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <label htmlFor="density">Dose unitaire</label>
                    <FormInput
                      valid={this.state.InvalidDensity}
                      invalid={this.state.validDensity}
                      id="density"
                      name="density"
                      type="number"
                      placeholder="g"
                      onChange={this.handleChange}
                    />
                  </Col>
                </Row>

                <Row form>
                  <Col md="6" className="form-group">
                    <br />
                    <center>
                      <Button
                        outline
                        pill
                        theme="danger"
                        onClick={() => {
                          this.setState({
                            FooderName: '',
                            density: 0
                          });
                        }}
                      >
                        <FontAwesomeIcon size="lg" icon={faRedo} />
                      </Button>
                    </center>
                  </Col>
                  <Col md="6" className="form-group">
                    <br />
                    <center>
                      <Button outline pill theme="primary" type="submit">
                        <FontAwesomeIcon size="lg" icon={faCheck} />
                      </Button>
                    </center>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </ListGroupItem>
        <ListGroupItem>
          <Row>
            <NotificationContainer />
          </Row>
        </ListGroupItem>
      </ListGroup>
    );
  }
}

export default FormGroupv;
