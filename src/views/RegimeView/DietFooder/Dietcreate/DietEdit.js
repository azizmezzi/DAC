/* eslint-disable react/no-string-refs */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable eqeqeq */
/* eslint-disable react/destructuring-assignment */

import React, { Component, Fragment } from 'react';
import { FormInput, ButtonGroup, FormSelect, Button } from 'shards-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

class DietEdit extends Component {
  state = {
    idUser: 0,
    Role: 2,
    edit: false,
    FooderDiet: [
      {
        FooderName: '',
        quantite: '',
        Portion: 0,
        Priority: ''
      }
    ],
    change: {}
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

  renderActions = () => {
    return (
      <tr>
        <td>{this.props.FooderName}</td>
        <td>{this.props.detail.quantite} </td>
        <td>{this.props.detail.Portion} </td>
        <td>{this.props.detail.Priority} </td>

        {this.state.Role ? (
          <Fragment />
        ) : (
          <td>
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
                  this.props.deleteFooderDiet(this.props.index);
                }}
              >
                <FontAwesomeIcon size="lg" icon={faTrash} />
              </Button>
            </ButtonGroup>
          </td>
        )}
      </tr>
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

  handleChange = e => {
    const { edit, FooderDiet, change } = this.state;
    if (e.target.id == 'idFooder') {
      change[e.target.id] = parseInt(e.target.value, 10);
    } else change[e.target.id] = e.target.value;

    this.setState({
      edit,
      FooderDiet,
      change
    });
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
    const { Fooder } = this.props;

    const listeFooders = Fooder.map(valeur => {
      if (valeur.FooderName != this.props.FooderName) {
        return (
          <option value={valeur.idFooder} onChange={this.handleChange}>
            {valeur.FooderName}
          </option>
        );
      }
    });

    return (
      <tr>
        <td>
          <FormSelect
            id="idFooder"
            onChange={this.handleChange}
            defaultValue={this.props.FooderName}
          >
            <option
              value={this.props.detail.idFooder}
              onChange={this.handleChange}
            >
              {this.props.FooderName}
            </option>
            {listeFooders}
          </FormSelect>
        </td>

        <td>
          <FormInput
            type="number"
            onChange={this.handleChange}
            ref="quantite"
            defaultValue={this.props.detail.quantite}
            id="quantite"
          />
        </td>
        <td>
          <FormInput
            type="text"
            onChange={this.handleChange}
            ref="Portion"
            defaultValue={this.props.detail.Portion}
            id="Portion"
          />
        </td>
        <td>
          <FormSelect
            ref="Priority"
            defaultValue={this.props.detail.Priority}
            id="Priority"
            onChange={this.handleChange}
          >
            <option value="medium">medium</option>
            <option value="high">high</option>
            <option value="low">low</option>
          </FormSelect>
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

export default DietEdit;
