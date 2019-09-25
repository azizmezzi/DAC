/* eslint-disable no-console */
/* eslint-disable react/no-string-refs */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable prefer-template */

import React, { Component, Fragment } from 'react';
import { FormInput, ButtonGroup, Button, FormSelect } from 'shards-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import '../../../../style/scrollerdesign.css';
import '../../../../style/scrollerdesign2.css';

class RowGroupDiet extends Component {
  state = {
    idUser: 0,
    Role: 2,
    edit: false,
    change: {},
    DietName: ''
  };

  componentDidMount = () => {
    const idUser = localStorage.getItem('idUser');
    const Role = localStorage.getItem('Role');
    this.setState({
      // eslint-disable-next-line radix
      Role: parseInt(Role),
      // eslint-disable-next-line radix
      idUser: parseInt(idUser)
    });
  };

  renderActions = () => {
    const begin = this.props.detail.begin + '';
    const end = this.props.detail.end + '';
    const begin2 = begin.substr(0, 10);
    const end2 = end.substr(0, 10);
    return (
      <tr>
        <td className="td2">{this.props.DietName}</td>
        <td className="td2">{begin2} </td>
        <td className="td2">{end2} </td>
        {this.state.Role === 2 ? (
          <Fragment />
        ) : (
          <td className="td2">
            <ButtonGroup>
              <Button
                outline
                pill
                theme="success"
                onClick={() => this.editing()}
              >
                <FontAwesomeIcon size="lg" icon={faPencilAlt} />
              </Button>
              <Button
                outline
                pill
                theme="danger"
                onClick={() => {
                  this.props.deleteGroupDiet(this.props.index);
                }}
              >
                <FontAwesomeIcon size="lg" icon={faTrash} />
              </Button>
            </ButtonGroup>
          </td>
        )}{' '}
      </tr>
    );
  };

  editing = () => {
    const { edit } = this.state;
    console.log(this.state);
    this.setState({
      edit: !edit
    });
  };

  handleChange = e => {
    const { edit, change } = this.state;
    if (e.target.id == 'idDiet') {
      change[e.target.id] = parseInt(e.target.value, 10);
    } else change[e.target.id] = e.target.value;

    this.setState({
      edit,
      change
    });
  };

  onEdit = e => {
    e.preventDefault();

    const { change } = this.state;
    console.log('change :');
    console.log(change);
    this.props.editGroupDiet(this.props.index, change);
    this.editing();
  };

  renderUpdate = () => {
    const { Diet } = this.props;

    const listeDiets = Diet.map(valeur => {
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
            id="idDiet"
            onChange={this.handleChange}
            defaultValue={this.props.DietName}
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
            ref="begin"
            defaultValue={this.props.detail.begin}
            id="begin"
          />
        </td>
        <td>
          <FormInput
            type="date"
            onChange={this.handleChange}
            ref="end"
            defaultValue={this.props.detail.end}
            id="end"
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

export default RowGroupDiet;
