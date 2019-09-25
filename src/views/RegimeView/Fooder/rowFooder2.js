/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/no-string-refs */
/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable no-undef */
/* eslint-disable default-case */
/* eslint-disable react/destructuring-assignment */
import React, { Component, Fragment } from 'react';
import { FormInput, ButtonGroup, Button, Row, Col } from 'shards-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash,
  faPencilAlt,
  faCheck,
  faEye,
  faRedo
} from '@fortawesome/free-solid-svg-icons';
import SlidingPane from 'react-sliding-pane';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {
  NotificationContainer,
  NotificationManager
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

class RowFooder2 extends Component {
  state = {
    InvalidFooderName: false,
    validFooderName: false,
    idUser: 0,
    Role: 2,
    edit: false,
    Fooder: [{ idFooder: 0, FooderName: '', density: 0 }],
    change: {
      FooderName: this.props.detail.FooderName,
      density: this.props.detail.density
    },
    FooderEdit: false
  };

  componentDidMount() {
    const idUser = localStorage.getItem('idUser');
    const Role = localStorage.getItem('Role');
    this.setState({
      // eslint-disable-next-line radix
      Role: parseInt(Role),
      // eslint-disable-next-line radix
      idUser: parseInt(idUser)
    });
  }

  createNotification = type => {
    return () => {
      switch (type) {
        case 'info':
          NotificationManager.info('Info message');
          break;
        case 'success':
          NotificationManager.success('Success message', 'Title here');
          break;
        case 'warning':
          NotificationManager.warning(
            'Warning message',
            'Close after 3000ms',
            3000
          );
          break;
        case 'error':
          NotificationManager.error('Error message', 'Click me!', 5000, () => {
            alert('callback');
          });
          break;
      }
    };
  };

  deletedFooder = () => {
    confirmAlert({
      title: 'supprimer ',
      message: 'Vous etes sur de supprimer cet aliment ?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            NotificationManager.info(
              `Aliment supprimer :${this.props.detail.FooderName}`
            );
            this.props.delete(this.props.index);
          }
        },
        {
          label: 'No',
          onClick: () => NotificationManager.warning('non supprimer', '', 3000)
        }
      ]
    });
  };

  renderActions = () => {
    return (
      <Fragment>
        <ButtonGroup>
          <Button outline pill theme="success" onClick={() => this.editing()}>
            <FontAwesomeIcon
              size="lg"
              icon={this.state.Role === 2 ? faEye : faPencilAlt}
            />
          </Button>
          {this.state.Role < 1 ? (
            <Button
              outline
              pill
              theme="danger"
              onClick={() => {
                this.deletedFooder();
              }}
            >
              <FontAwesomeIcon size="lg" icon={faTrash} />
            </Button>
          ) : (
            <Fragment />
          )}
          <SlidingPane
            className="some-custom-class"
            overlayClassName="some-custom-overlay-class"
            from="left"
            width="58%"
            title="Fermer"
            subtitle="Fermer ajout de vache."
            isOpen={this.state.FooderEdit}
            onRequestClose={() => {
              // triggered on "<" on left top click or on outside click
              this.setState({ FooderEdit: false });
            }}
          >
            <Row form>
              <Col lg="4" md="6" sm="12" className="mb-4" />

              <Col md="4" className="form-group">
                <label htmlFor="DACName">Nom d'aliment</label>
                <FormInput
                  valid={this.state.InvalidFooderName}
                  invalid={this.state.validFooderName}
                  type="text"
                  disabled={this.state.Role === 2}
                  onChange={this.handleChange}
                  ref="FooderName"
                  value={this.state.change.FooderName}
                  id="FooderName"
                />
              </Col>
              <Col md="4" className="form-group">
                <label htmlFor="DateCow">Dose Unitaire </label>
                <FormInput
                  disabled={this.state.Role === 2}
                  type="number"
                  onChange={this.handleChange}
                  ref="density"
                  value={this.state.change.density}
                  id="density"
                />
              </Col>
            </Row>

            <br />
            <br />
            <Row form>
              <Col lg="4" md="6" sm="12" className="mb-4" />
              {this.state.Role === 2 ? (
                <Fragment />
              ) : (
                <Col lg="8" md="6" sm="12" className="mb-4">
                  <center>
                    <Button outline pill theme="danger" onClick={this.anuuler}>
                      <FontAwesomeIcon size="lg" icon={faRedo} />
                    </Button>
                    &nbsp; &nbsp; &nbsp; &nbsp;
                    <Button outline pill theme="primary" onClick={this.onEdit}>
                      <FontAwesomeIcon size="lg" icon={faCheck} />
                    </Button>
                  </center>
                </Col>
              )}{' '}
            </Row>
          </SlidingPane>
        </ButtonGroup>
        <NotificationContainer />
      </Fragment>
    );
  };

  editing = () => {
    const { FooderEdit, Fooder } = this.state;
    console.log(this.state);
    this.setState({
      FooderEdit: !FooderEdit,
      Fooder
    });
    console.log({ FooderEdit });
  };

  anuuler = e => {
    e.preventDefault();
    this.setState({
      change: {
        FooderName: this.props.detail.FooderName,
        density: this.props.detail.density
      }
    });
  };

  handleChange = e => {
    const { edit, Fooder, change } = this.state;
    change[e.target.id] = e.target.value;

    this.setState({
      edit,
      Fooder,
      change
    });
    console.log(this.state);
  };

  onEdit = e => {
    e.preventDefault();

    if (this.state.change.FooderName === '') {
      this.setState({
        validFooderName: true,
        InvalidFooderName: false
      });
    } else
      this.setState({
        validFooderName: false,
        InvalidFooderName: true
      });

    let unicite = false;
    const { oldFooder } = this.props;

    if (this.state.change.FooderName != '') {
     
      const oldFooders = oldFooder.filter(oldFood => {
        if (oldFood.FooderName === this.state.change.FooderName) return oldFood;
      });
    

      if (oldFooders.length > 0) {
        if (
          oldFooders.length === 1 &&
          oldFooders[0].idFooder === this.props.detail.idFooder
        ) {
          unicite = true;
        } else {
          NotificationManager.error('Nom existant', '', 3000);
        }
      } else {
        unicite = true;
      }
    }
    if (this.state.change.FooderName != '' && unicite) {
      const { change } = this.state;
      console.log('change :');
      console.log(change);
      this.props.edit(this.props.index, change);
      this.editing();
    }
  };

  renderUpdate = () => {
    return (
      <tr>
        <center>
          <td className="td2">
            <FormInput
              disabled={this.state.Role === 2}
              type="text"
              onChange={this.handleChange}
              ref="FooderName"
              defaultValue={this.props.detail.FooderName}
              id="FooderName"
            />
          </td>

          <td className="td2">
            <FormInput
              disabled={this.state.Role === 2}
              type="number"
              onChange={this.handleChange}
              ref="density"
              defaultValue={this.props.detail.density}
              id="density"
            />
          </td>

          <td className="td2">
            {' '}
            <ButtonGroup size="sm">
              <Button outline pill theme="primary" onClick={this.onEdit}>
                <i className="material-icons bg">check</i>
              </Button>
              <Button outline pill theme="danger" onClick={this.anuuler}>
                <i className="material-icons bg">close</i>
              </Button>
            </ButtonGroup>
          </td>
        </center>
      </tr>
    );
  };

  render() {
    const { edit } = this.state;

    return (
      <Fragment>{edit ? this.renderUpdate() : this.renderActions()}</Fragment>
    );
  }
}

export default RowFooder2;
