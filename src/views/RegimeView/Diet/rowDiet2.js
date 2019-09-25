/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable eqeqeq */
/* eslint-disable radix */
/* eslint-disable react/no-string-refs */
/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/destructuring-assignment */

import React, { Component, Fragment } from 'react';
import { FormInput, ButtonGroup, Button } from 'shards-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt, faEye } from '@fortawesome/free-solid-svg-icons';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

class RowDiet2 extends Component {
  state = {
    validDietName: false,
    InvalidDietName: false,
    idUser: 0,
    Role: 2,
    edit: false,
    Diet: [{ idDiet: 0, DietName: '' }],
    change: { DietName: this.props.detail.DietName }
  };

  constructor(props) {
    super(props);
    this.NodeletedNotification = this.NodeletedNotification.bind(this);
    this.deletedNotification = this.deletedNotification.bind(this);
    this.notificationDOMRef = React.createRef();
  }

  componentDidMount() {
    const idUser = localStorage.getItem('idUser');
    const Role = localStorage.getItem('Role');
    this.setState({
      Role: parseInt(Role),
      idUser: parseInt(idUser)
    });
  }

  deletedDiet = () => {
    confirmAlert({
      title: 'supprimer ',
      message: 'Vous etes sur de supprimer ce régime ?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            this.deletedNotification(this.props.detail.DietName);
            this.props.delete(this.props.index);
          }
        },
        {
          label: 'No',
          onClick: () => {
            this.NodeletedNotification();
          }
        }
      ]
    });
  };

  renderActions = () => {
    return (
      <Fragment>
        <ButtonGroup>
          <Button
            outline
            pill
            theme="success"
            onClick={() => {
              this.props.editDietFooder(
                this.props.detail.idDiet,
                this.props.detail.DietName
              );
            }}
          >
            <FontAwesomeIcon
              size="lg"
              icon={this.state.Role === 2 ? faEye : faPencilAlt}
            />
          </Button>
          {this.state.Role < 2 ? (
            <Button
              outline
              pill
              theme="danger"
              onClick={() => {
                this.deletedDiet();
              }}
            >
              <FontAwesomeIcon size="lg" icon={faTrash} />
            </Button>
          ) : (
            <Fragment />
          )}
        </ButtonGroup>
      </Fragment>
    );
  };

  editing = () => {
    const { edit, Diet } = this.state;
    console.log(this.state);
    this.setState({
      edit: !edit,
      Diet
    });
    console.log({ edit });
  };
  /*
  handleChange = (e) => {
    let { edit, animaux } = this.state;
    console.log(e.target.value)
 
    this.setState({ edit, animaux: { [e.target.id]: e.target.value } });
    console.log("ba3ed edit")
    console.log(this.state)
 
  } */

  handleChange = e => {
    const { edit, Diet, change } = this.state;
    change[e.target.id] = e.target.value;
    //* ****************************** */
    // nraja3 el stateel jdida eli feha ken eli tbadlou w mel chira lo5ra
    // nthabet ken tbadlet hawka nbadalha ken tbadletech nbadelhech

    this.setState({
      edit,
      Diet,
      change
    });
    console.log(this.state);
  };

  onEdit = e => {
    e.preventDefault();
    console.log('this.state.change.DietName');
    console.log(this.state.change.DietName);
    if (this.state.change.DietName === '') {
      this.setState({
        validDietName: true,
        InvalidDietName: false
      });
    } else
      this.setState({
        validDietName: false,
        InvalidDietName: true
      });

    let unicite = false;
    const { oldDiet } = this.props;

    if (this.state.change.DietName != '') {
      const oldDiets = oldDiet.filter(oldFood => {
        if (oldFood.DietName === this.state.change.DietName) return oldFood;
      });

      if (oldDiets.length > 0) {
        if (
          oldDiets.length === 1 &&
          oldDiets[0].idDiet === this.props.detail.idDiet
        ) {
          unicite = true;
        } else {
          NotificationManager.error('Nom existant', '', 3000);
        }
      } else {
        unicite = true;
      }
    }
    if (this.state.change.DietName != '' && unicite) {
      const { change } = this.state;
      console.log('change :');
      console.log(change);
      this.props.edit(this.props.index, change);
      this.editing();
    }
  };

  NodeletedNotification() {
    NotificationManager.warning('Regime non supprimer', '', 3000);
  }

  deletedNotification(DietName) {
    NotificationManager.info(`Regime supprimer ${DietName}`);
  }

  renderUpdate = () => {
    return (
      <tr>
        <center>
          <td className="td2">{this.props.detail.idDiet}</td>

          <td className="td2">
            <FormInput
              valid={this.state.InvalidDietName}
              invalid={this.state.validDietName}
              type="text"
              onChange={this.handleChange}
              disabled={this.state.Role === 2}
              ref="DietName"
              defaultValue={this.props.detail.DietName}
              id="DietName"
            />
          </td>

          <td className="td2">
            {' '}
            <ButtonGroup size="sm">
              <Button outline pill theme="primary" onClick={this.onEdit}>
                <i className="material-icons bg">check</i>
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

export default RowDiet2;
