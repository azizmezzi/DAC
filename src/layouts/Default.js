/* eslint-disable no-redeclare */
/* eslint-disable block-scoped-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable global-require */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  CardBody,
  FormInput,
  InputGroup
} from 'shards-react';
import {
  NotificationContainer,
  NotificationManager
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import MainNavbar from '../components/layout/MainNavbar/MainNavbar';
import MainSidebar from '../components/layout/MainSidebar/MainSidebar';
import MainFooter from '../components/layout/MainFooter';
import '../style/scrollerdesign.css';
import './style.css';
// eslint-disable-next-line import/no-unresolved
import { Config } from '../configue';

class DefaultLayout extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  state = {
    Users: [],
    valide: true,
    open: false,
    backgroundImage: require('../images/test1.jpg'),
    categoryTheme: 'dark',
    authorAvatar: require('../images/sygnet-agtek.png'),
    Username: '',
    password: '',
    InvalidUsername: false,
    validUsername: false,
    Invalidpassword: false,
    validpassword: false
  };

  componentDidMount = () => {
    this.getUser().then(Users => {
      this.setState({
        Users: Users.data
      });
    });
  };

  getUser = () => {
    // eslint-disable-next-line no-undef
    const datas = fetch(`${Config.url}/User`)
      .then(reponse => {
        return reponse.json();
      })
      .catch(err => console.error(err));

    return datas;
  };

  openSideBar = () => {
    const { open } = this.state;

    this.setState({
      open: !open
    });
    console.log(this.state);
  };

  render1 = () => {
    return (
      <Row>
        <MainSidebar Role={this.state.Role} openSideBar={this.openSideBar} />
        <Col
          className="main-content p-0   "
          lg={{ size: 10, offset: 2 }}
          md={{ size: 9, offset: 3 }}
          sm="12"
          tag="main"
        >
          {!this.props.noNavbar && (
            <MainNavbar openSideBar={this.openSideBar} />
          )}
          {this.props.children}
          {!this.props.noFooter && <MainFooter />}
        </Col>
      </Row>
    );
  };

  render2 = () => {
    return (
      <Row className="slide-in-fwd-center">
        <Col className="main-content p-0" sm="12" tag="main">
          {!this.props.noNavbar && (
            <MainNavbar openSideBar={this.openSideBar} open={this.state.open} />
          )}
          {this.props.children}
          {!this.props.noFooter && <MainFooter />}
        </Col>
      </Row>
    );
  };

  renderLogged = () => {
    const { open } = this.state;

    return (
      <Container fluid className="color-change-3x bg-pan-right">
        {open ? this.render2() : this.render1()}
      </Container>
    );
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  renderLogin = () => {
    return (
      <div className="bodyLogin">
        <center>
          <Col lg="8">
            <Card className="card-post--1">
              <div
                className="card-post__image largeur"
                style={{
                  backgroundImage: `url('${this.state.backgroundImage}')`
                }}
              >
                <Badge
                  pill
                  className={`card-post__category bg-${
                    this.state.categoryTheme
                  }`}
                >
                  agTEK
                </Badge>
                <div className="card-post__author d-flex">
                  <a
                    href="#"
                    className="card-post__author-avatar card-post__author-avatar--large"
                    style={{
                      backgroundImage: `url('${this.state.authorAvatar}')`
                    }}
                  >
                    Written by Codintek
                  </a>
                </div>
              </div>

              <CardBody>
                <h5 className="card-title">
                  <a className="text-fiord-blue" href="#">
                    <center>Se Connecter</center>
                  </a>
                </h5>
                <Row>
                  <Col>
                    <InputGroup className="mb-3">
                      <div class="floating-form">
                        <div class="floating-label">
                          <FormInput
                            valid={this.state.InvalidUsername}
                            invalid={this.state.validUsername}
                            className="floating-input"
                            id="Username"
                            placeholder=""
                            onChange={this.handleChange}
                          />
                          <span class="highlight" />
                          <label className="label">Username</label>
                        </div>
                      </div>
                    </InputGroup>
                    <br />

                    <InputGroup className="mb-3">
                      <div class="floating-form">
                        <div class="floating-label">
                          <FormInput
                            valid={this.state.Invalidpassword}
                            invalid={this.state.validpassword}
                            type="password"
                            className="floating-input"
                            id="password"
                            placeholder=""
                            onChange={this.handleChange}
                          />

                          <span class="highlight" />

                          <label className="label">password</label>
                        </div>
                      </div>
                    </InputGroup>
                  </Col>
                  <Col>
                    <center>
                      <br />
                      <br />
                      <a
                        class="example_b"
                        onClick={e => {
                          e.preventDefault();
                          const { Username, password, Users } = this.state;
                          console.log(Username);
                          console.log('password');
                          console.log(password);
                          const users = Users.filter(
                            user =>
                              Username === user.USERName &&
                              password === user.password
                          );
                          if (users.length !== 0) {
                            console.log('password');

                            localStorage.setItem('myData', true);
                            localStorage.setItem('idUser', users[0].idUSER);
                            localStorage.setItem('Role', users[0].Role);
                          } else {
                            if (this.state.Username === '') {
                              this.setState({
                                validUsername: true,
                                InvalidUsername: false
                              });
                            } else
                              this.setState({
                                validUsername: false,
                                InvalidUsername: true
                              });
                            if (this.state.password === '') {
                              this.setState({
                                validpassword: true,
                                Invalidpassword: false
                              });
                            } else
                              this.setState({
                                validpassword: false,
                                Invalidpassword: true
                              });
                            if (
                              this.state.Username !== '' &&
                              this.state.password !== ''
                            ) {
                              NotificationManager.error(
                                'user name ou le mote de passe est erroné veiller recrire ',
                                '',
                                3000
                              );
                            }
                          }
                          this.setState({ valide: true });
                        }}
                        target="_blank"
                        rel="nofollow noopener"
                      >
                        Connecter
                      </a>
                    </center>
                  </Col>
                </Row>
                <center>
                  <span className="text-muted">copyRight@Codintek</span>
                </center>
              </CardBody>
            </Card>
          </Col>
          <NotificationContainer />
        </center>
      </div>
    );
  };

  render = () => {
    const data = localStorage.getItem('myData');
    console.log('data');
    console.log(data);
    if (data === null) {
      var valide = false;
    } else var valide = data;
    return (
      <Fragment>{valide ? this.renderLogged() : this.renderLogin()}</Fragment>
    );
  };
}

DefaultLayout.propTypes = {
  /**
   * Whether to display the navbar, or not.
   */
  noNavbar: PropTypes.bool,
  /**
   * Whether to display the footer, or not.
   */
  noFooter: PropTypes.bool
};

DefaultLayout.defaultProps = {
  noNavbar: false,
  noFooter: false
};

export default DefaultLayout;
