/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-plusplus */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable eqeqeq */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
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
import DietCreated from './Dietcreate/dietCreated';
import Formdietcreate from './Dietcreate/Formdietcreate';

class FormDiet extends Component {
  state = {
    idDiet: 0,
    DietName: '',
    FooderDiet: [],
    InvalidDietName: false,
    validDietName: false
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  Submiting = e => {
    e.preventDefault();
    if (this.state.DietName == '') {
      this.setState({
        validDietName: true,
        InvalidDietName: false
      });
    } else
      this.setState({
        validDietName: false,
        InvalidDietName: true
      });
    if (this.state.FooderDiet.length == 0) {
      if (this.state.DietName != '') {
      NotificationManager.error('regime vide ', '', 2000);}
    }
    let unicite = false;
    if (this.state.DietName != '') {
      const Diets = this.props.Diet;
      console.log('Diets');
      console.log(Diets);
      const DietUnicite = Diets.filter(Diet => {
        if (Diet.DietName == this.state.DietName) return Diet;
      });
      console.log('Diet');
      console.log(DietUnicite.length);
      if (DietUnicite.length === 0) {
        unicite = true;
      } else {
        NotificationManager.error('Nom existant', this.state.DietName, 3000);
      }
    }
    if (
      this.state.DietName != '' &&
      this.state.FooderDiet.length != 0 &&
      unicite
    ) {
      this.postMethode(this.state).then(d => {
        this.props.add(this.state, d.data);

        const { FooderDiet } = this.state;
        const leng = FooderDiet.length;
        for (let i = 0; i < leng; i++) {
          this.postMethodeFooderDiet(FooderDiet[i], d.data);
        }
        this.setState({
          idDiet: 0,
          DietName: '',
          FooderDiet: []
        });
      });
    }
  };

  edit = (index, change) => {
    const { FooderDiet } = this.state;
    const FooderDiets = FooderDiet[index];
    for (const i in change) {
      FooderDiets[i] = change[i];
    }

    this.setState({
      FooderDiet
    });
  };

  delete = index => {
    const { FooderDiet } = this.state;

    FooderDiet.splice(index, 1);
    this.setState({ FooderDiet });
    //  this.deleteMethode(FooderDeleted.idFooder)
  };

  add = a => {
    const { FooderDiet } = this.state;

    FooderDiet.push(a);
    this.setState({
      FooderDiet
    });
  };

  postMethode(a) {
    const encodedKeyDietName = encodeURIComponent('DietName');

    const encodedvalDietName = encodeURIComponent(a.DietName);
    const formbody = [`${encodedKeyDietName}=${encodedvalDietName}`];
    //  formbody =formbody.join("&");

    const data = fetch(`${Config.url}/Diet`, {
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

  postMethodeFooderDiet(FooderDeit, idDiet) {
    const encodedKeyidDiet = encodeURIComponent('idDiet');
    const encodedKeyidFooder = encodeURIComponent('idFooder');
    const encodedKeyquantite = encodeURIComponent('quantite');
    const encodedKeyPortion = encodeURIComponent('Portion');
    const encodedKeyPriority = encodeURIComponent('Priority');

    const encodedvalididDiet = encodeURIComponent(idDiet);
    const encodedvalidFooder = encodeURIComponent(FooderDeit.idFooder);
    const encodedvalquantite = encodeURIComponent(FooderDeit.quantite);
    const encodedvalPortion = encodeURIComponent(FooderDeit.Portion);
    const encodedvalPriority = encodeURIComponent(FooderDeit.Priority);
    let formbody = [
      `${encodedKeyidDiet}=${encodedvalididDiet}`,
      `${encodedKeyidFooder}=${encodedvalidFooder}`,
      `${encodedKeyquantite}=${encodedvalquantite}`,
      `${encodedKeyPortion}=${encodedvalPortion}`,
      `${encodedKeyPriority}=${encodedvalPriority}`
    ];
    formbody = formbody.join('&');

    fetch(`${Config.url}/FooderDiet`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded' // <-- Specifying the Content-Type
      },
      body: formbody // <-- Post parameters
    })
      .then(response => response.text())
      .then(responseText => {
        console.log(responseText);
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const { FooderDiet } = this.state;
    const FooderDietListe = FooderDiet.map((valeur, index) => {
      return (
        <DietCreated
          detail={valeur}
          key={index}
          index={index}
          edit={this.edit}
          delete={this.delete}
        />
      );
    });

    return (
      <ListGroup flush>
        <ListGroupItem className="p-3">
          <Row>
            <Col>
              <Form onSubmit={this.Submiting}>
                <Row form>
                  <Col md="6" sm="12" className="form-group mb-4">
                    <label htmlFor="DietName">Nom de Regime</label>

                    <FormInput
                      id="DietName"
                      name="DietName"
                      type="text"
                      placeholder="Regime"
                      onChange={this.handleChange}
                      value={this.state.DietName}
                      valid={this.state.InvalidDietName}
                      invalid={this.state.validDietName}
                    />
                  </Col>
                </Row>
                <br />
                <br />
                <Row form>
                  <table className="table mb-0">
                    <thead className="thead-dark">
                      <tr>
                        <th scope="col" className="border-0">
                          Aliment
                        </th>
                        <th scope="col" className="border-0">
                          Quantite par jour{' '}
                        </th>
                        <th scope="col" className="border-0">
                          Portion{' '}
                        </th>
                        <th scope="col" className="border-0">
                          Priorité
                        </th>
                        <th scope="col" className="border-0" />
                      </tr>
                    </thead>
                    <tbody>
                      {FooderDietListe}
                      <Formdietcreate
                        Fooder={this.props.Fooder}
                        add={this.add}
                      />
                    </tbody>
                  </table>
                </Row>
                <Row form>
                  <Col />
                  <Col className="form-group">
                    <center>
                      <Button
                        outline
                        pill
                        theme="danger"
                        onClick={() => {
                          this.setState({
                            idDiet: 0,
                            DietName: '',
                            FooderDiet: []
                          });
                        }}
                      >
                        {' '}
                        <FontAwesomeIcon size="lg" icon={faRedo} />
                      </Button>
                      &nbsp; &nbsp;&nbsp; &nbsp;
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

export default FormDiet;
