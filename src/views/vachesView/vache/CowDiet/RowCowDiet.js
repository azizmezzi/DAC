/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react/no-string-refs */
/* eslint-disable eqeqeq */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-redeclare */
/* eslint-disable block-scoped-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable no-console */
/* eslint-disable prefer-destructuring */
import React, { Component, Fragment } from 'react';
import { FormInput, ButtonGroup, Button, FormSelect } from 'shards-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import '../../../../style/scrollerdesign.css';
import '../../../../style/scrollerdesign2.css';

class RowCowDiet extends Component {
  state = {
    edit: false,
    change: {},
    DietName: ''
  };

  renderActions = () => {
    let begin = this.props.detail.begin;
    console.log(begin);
    if (begin == null) {
      var begin2 = '';
    } else {
      begin += '';
      var begin2 = begin.substr(0, 10);
    }
    let end = this.props.detail.end;

    if (end == null) {
      var end2 = '';
    } else {
      end += '';

      var end2 = end.substr(0, 10);
    }
    console.log("this.props.DietName")
    console.log(this.props.DietName)

    return (
      <tr>
        <td className="td2">{this.props.DietName}</td>
        <td className="td2">{begin2} </td>
        <td className="td2">{end2} </td>

        <td className="td2">
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
        </td>
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

    const change = this.state.change;
    console.log('change :');
    console.log(change);
    this.props.edit(this.props.index, change);
    this.editing();
  };

  renderUpdate = () => {
    const Diet = this.props.Diet;

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

export default RowCowDiet;
// n7ot el tableau el kol melowel w na3mel kima hethi bech njib
// ia tableau kemel
// melowel wala njibou ma9soum fel fonction thenia
