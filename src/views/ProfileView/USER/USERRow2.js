/* eslint-disable no-console */
/* eslint-disable radix */
/* eslint-disable eqeqeq */
/* eslint-disable react/no-string-refs */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
import React, { Component, Fragment } from 'react';
import {
  FormInput,
  ButtonGroup,
  Button,
  FormSelect,
  Row,
  Col
} from 'shards-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash,
  faCheck,
  faRedo,
  faPencilAlt
} from '@fortawesome/free-solid-svg-icons';
import SlidingPane from 'react-sliding-pane';
import Modal from 'react-modal';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {
  NotificationContainer,
  NotificationManager
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import '../../mainPage/style.css';
import '../../../style/scrollerdesign.css';
import '../../../style/scrollerdesign2.css';

class USERRow2 extends Component {
  state = {
    edit: false,
    USER: [],
    USEREdit: false,
    change: {
      USERName: this.props.detail.USERName,
      password: this.props.detail.password
    }
  };

  componentDidMount() {
    Modal.setAppElement('body');
  }

  deletedUSER = () => {
    confirmAlert({
      title: 'supprimer ',
      message: 'Vous etes sur de supprimer ce utilisateur ?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            NotificationManager.info(
              `utilisateur supprimer :${this.props.detail.USERName}`
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

  showEditCow = () => {
    this.setState({
      USEREdit: true
    });
  };

  renderActions = () => {
    return (
      <Fragment>
        <ButtonGroup>
          <Button outline pill theme="success" onClick={() => this.editing()}>
            <FontAwesomeIcon size="lg" icon={faPencilAlt} />
          </Button>
          <Button
            outline
            pill
            theme="danger"
            onClick={() => {
              this.deletedUSER();
            }}
          >
            <FontAwesomeIcon size="lg" icon={faTrash} />
          </Button>
          <SlidingPane
            className="some-custom-class"
            overlayClassName="some-custom-overlay-class"
            from="left"
            width="58%"
            title="Fermer"
            subtitle="Fermer ajout de vache."
            isOpen={this.state.USEREdit}
            onRequestClose={() => {
              // triggered on "<" on left top click or on outside click
              this.setState({ USEREdit: false });
            }}
          >
            <Fragment>
              <Row>
                <Col lg="4" md="6" sm="12" className="mb-4" />

                <h4> Modifier USER</h4>
              </Row>
              <br />
              <br />
              <br />
              <Row form>
                <Col lg="4" md="6" sm="12" className="mb-4" />

                <Col md="4" className="form-group">
                  <label htmlFor="DACName">Nom d'utilisateur</label>
                  <FormInput
                    type="text"
                    onChange={this.handleChange}
                    ref="USERName"
                    value={this.state.change.USERName}
                    id="USERName"
                  />
                </Col>
                <Col md="4" className="form-group">
                  <label htmlFor="DateCow">Mote de passe </label>
                  <FormInput
                    type="text"
                    onChange={this.handleChange}
                    ref="password"
                    value={this.state.change.password}
                    id="password"
                  />
                </Col>
              </Row>
              <Row>
                <Col lg="4" md="6" sm="12" className="mb-4" />

                <Col lg="4" md="6" sm="12" className="mb-4">
                  <label htmlFor="DateCow">Role</label>
                  <FormSelect
                    id="Role"
                    defaultValue={this.props.detail.Role}
                    onChange={this.handleChange}
                  >
                    <option value="0" selected>
                      agriculteur
                    </option>

                    <option value="1">ingénieur</option>
                    <option value="2">ouvrier</option>
                  </FormSelect>
                </Col>
              </Row>

              <br />
              <br />
              <Row form>
                <Col lg="4" md="6" sm="12" className="mb-4" />
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
              </Row>
            </Fragment>
          </SlidingPane>
        </ButtonGroup>
        <NotificationContainer />
      </Fragment>
    );
  };

  editing = () => {
    const { USEREdit, USER } = this.state;
    console.log(this.state);
    this.setState({
      USEREdit: !USEREdit,
      USER
    });
    console.log({ USEREdit });
  };

  handleChange = e => {
    const { edit, USER, change } = this.state;
    if (e.target.id == 'Role') {
      change[e.target.id] = parseInt(e.target.value);
    } else change[e.target.id] = e.target.value;

    this.setState({
      edit,
      USER,
      change
    });
    console.log(this.state);
  };

  onEdit = e => {
    e.preventDefault();

    const { change } = this.state;
    console.log('change :');
    console.log(change);
    this.props.edit(this.props.index, change);
    this.editing();
  };

  anuuler = e => {
    e.preventDefault();
    this.editing();
  };

  renderUpdate = () => {
    return (
      <tr>
        <td className="td2">
          <FormInput
            type="text"
            onChange={this.handleChange}
            ref="USERName"
            defaultValue={this.props.detail.USERName}
            id="USERName"
          />
        </td>

        <td className="td2">
          <FormSelect
            id="Role"
            defaultValue={this.props.detail.Role}
            onChange={this.handleChange}
          >
            <option value="0" selected>
              Admin
            </option>

            <option value="1">user</option>
            <option value="2">super user</option>
          </FormSelect>
        </td>

        <td className="td2">
          {' '}
          <ButtonGroup size="sm">
            <Button outline pill theme="primary" onClick={this.onEdit}>
              <i className="material-icons bg">done</i>
            </Button>
            <Button outline pill theme="danger" onClick={this.anuuler}>
              <i className="material-icons bg">close</i>
            </Button>
          </ButtonGroup>
        </td>
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

export default USERRow2;
