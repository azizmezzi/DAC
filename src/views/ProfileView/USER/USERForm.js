/* eslint-disable react/no-string-refs */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faRedo } from '@fortawesome/free-solid-svg-icons';
import { Config } from '../../../configue';

class USERForm extends Component {
  state = {
    idUSER: 0,
    USERName: '',
    Role: 0,
    password:''
  };

  handleChange = e => {
    if (e.target.id === 'Role') {
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
      const idUSER = d.data;

      // eslint-disable-next-line react/destructuring-assignment
      this.props.addUSER(this.state, idUSER);
      this.setState({
        idUSER: 0,
        USERName: '',
        Role: 0
      });
    });
  };

  postMethode = a => {
    const encodedKeyUSERName = encodeURIComponent('USERName');
    const encodedKeypassword = encodeURIComponent('password');
    const encodedKeyRole = encodeURIComponent('Role');

    const encodedvalUSERName = encodeURIComponent(a.USERName);
    const encodedvalpassword = encodeURIComponent(a.password);
    const encodedvalRole = encodeURIComponent(parseInt(a.Role));

    let formbody = [
      `${encodedKeyUSERName}=${encodedvalUSERName}`,
      `${encodedKeypassword}=${encodedvalpassword}`,
      `${encodedKeyRole}=${encodedvalRole}`
    ];
    formbody = formbody.join('&');

    // eslint-disable-next-line no-undef
    const data = fetch(`${Config.url}/User`, {
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
              <Form onSubmit={this.handleSubmit}>
                <Row form>
                  <Col md="6" className="form-group">
                    <label htmlFor="USERName">nom d'utilisateur</label>
                    <FormInput
                      id="USERName"
                      name="USERName"
                      type="text"
                      placeholder="Code du USER .."
                      onChange={this.handleChange}
                      value={this.state.USERName}
                    />
                  </Col>
                  <Col md="4" className="form-group">
                    <label htmlFor="DateCow">Mote de passe </label>
                    <FormInput
                      type="text"
                      onChange={this.handleChange}
                      ref="password"
                      value={this.state.password}
                      id="password"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="6" className="form-group">
                    <label htmlFor="Role">Role</label>
                    <FormSelect id="Role" onChange={this.handleChange}>
                      <option value="0" selected>
                        agriculteur
                      </option>

                      <option value="1">ingénieur</option>
                      <option value="2">ouvrier</option>
                    </FormSelect>
                  </Col>
                </Row>
                <Row>
                  <Col md="6" className="form-group">
                    <center>
                      <Button
                        outline
                        pill
                        theme="danger"
                        onClick={() => {
                          this.setState({ USERName: '' , password : '' });
                        }}
                      >
                        <FontAwesomeIcon size="lg" icon={faRedo} />
                      </Button>
                    </center>
                  </Col>
                  <Col md="6" className="form-group">
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
          <Row />
        </ListGroupItem>
      </ListGroup>
    );
  }
}

export default USERForm;
