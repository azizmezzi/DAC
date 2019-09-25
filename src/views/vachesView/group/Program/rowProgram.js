/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react/no-string-refs */
/* eslint-disable no-console */
/* eslint-disable vars-on-top */
/* eslint-disable no-redeclare */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-var */

import React, { Component, Fragment } from 'react';
import { FormInput, ButtonGroup, Button, FormSelect } from 'shards-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

class RowProgram extends Component {
  state = {
    edit: false,
    GroupDiet: [
      {
        DietrName: '',
        idDiet: 0,
        DateDebut: 0,
        DateFin: 0
      }
    ],
    change: {}
  };

  renderActions = () => {
    let begin = '';
    var end = '';
    begin += this.props.detail.DateDebut;
    var end = end + this.props.detail.DateFin;
    const begin2 = begin.substr(0, 10);
    const end2 = end.substr(0, 10);

    return (
      <tr>
        <td>{this.props.detail.DietrName}</td>
        <td>{begin2}</td>
        <td>{end2} </td>

        <ButtonGroup>
          <Button outline pill theme="success" onClick={() => this.editing()}>
            <FontAwesomeIcon size="lg" icon={faPencilAlt} />
          </Button>
          <Button
            outline
            pill
            theme="danger"
            onClick={() => {
              this.props.delete(this.props.index);
            }}
          >
            <FontAwesomeIcon size="lg" icon={faTrash} />
          </Button>
        </ButtonGroup>
      </tr>
    );
  };

  editing = () => {
    const { edit } = this.state;
    console.log(this.state);
    this.setState({
      edit: !edit
    });
    console.log({ edit });
  };

  handleChange = e => {
    const { change } = this.state;
    if (e.target.id === 'Diet') {
      const Diet = e.target.value;
      const words = Diet.split('+');

      // eslint-disable-next-line prefer-destructuring
      change.DietrName = words[0];
      // eslint-disable-next-line prefer-destructuring
      change.idDiet = words[1];
      this.setState({
        change
      });
    } else {
      change[e.target.id] = e.target.value;

      this.setState({
        change
      });
    }
  };

  onEdit = e => {
    e.preventDefault();

    const { change } = this.state;
    console.log('change :');
    console.log(change);
    this.props.edit(this.props.index, change);
    this.editing();
  };

  renderUpdate = () => {
    const { Diet } = this.props;

    const listeDiets = Diet.map(valeur => {
      // eslint-disable-next-line eqeqeq
      if (valeur.DietName != this.props.DietName) {
        return (
          <option value={valeur.idDiet} onChange={this.handleChange}>
            {valeur.DietName}
          </option>
        );
      }
    });
    return (
      <tr>
        <td>
          <FormSelect
            type="text"
            onChange={this.handleChange}
            ref="Diet"
            defaultValue={this.props.detail.DietrName}
            id="Diet"
          >
            <option
              value={this.props.detail.idDiet}
              onChange={this.handleChange}
            >
              {this.props.DietName}
            </option>
            {listeDiets}
          </FormSelect>
        </td>
        <td>
          <FormInput
            type="date"
            onChange={this.handleChange}
            ref="DateDebut"
            defaultValue={this.props.detail.DateDebut}
            id="DateDebut"
          />
        </td>
        <td>
          <FormInput
            type="date"
            onChange={this.handleChange}
            ref="DateFin"
            defaultValue={this.props.detail.DateFin}
            id="DateFin"
          />
        </td>

        <td>
          {' '}
          <center>
            {' '}
            <ButtonGroup size="sm">
              <Button outline pill theme="primary" onClick={this.onEdit}>
                <i className="material-icons bg">check</i>
              </Button>
              <Button
                outline
                pill
                theme="danger"
                onClick={e => {
                  e.preventDefault();
                  this.setState({ edit: false });
                }}
              >
                <i className="material-icons bg">close</i>
              </Button>
            </ButtonGroup>
          </center>
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

export default RowProgram;
