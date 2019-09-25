/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
/* eslint-disable prefer-const */
/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import { FormInput, FormSelect } from 'shards-react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

class FormProgram extends Component {
  state = {
    Diet: '',
    DietrName: '',
    idDiet: 0,
    DateDebut: '',
    DateFin: '',
    validDateDebut: false,
    invalidDateDebut: false,
    validDateFin: false,
    invalidDateFin: false
  };

  handleChange = e => {
    if (e.target.id == 'Diet') {
      const Diet = e.target.value;

      let words = Diet.split('+');
      this.setState({
        DietrName: words[0],
        idDiet: words[1]
      });
    } else {
      this.setState({
        [e.target.id]: e.target.value
      });
    }
    console.log(this.state);
  };

  Submiting = e => {
    e.preventDefault();

    const GD = this.state;

    if (GD.DateDebut == '') {
      this.setState({ invalidDateDebut: false, validDateDebut: true });
    } else
      this.setState({
        validDateDebut: false,
        invalidDateDebut: true
      });
    if (GD.DateFin == '') {
      this.setState({
        validDateFin: true,
        invalidDateFin: true
      });
    } else
      this.setState({
        validDateFin: false,
        invalidDateFin: true
      });
    if (GD.DietrName !== '' && GD.DateDebut != '' && GD.DateFin != '') {
      this.props.add(this.state);
      this.setState({
        Diet: GD.Diet,
        DietrName: GD.DietrName,
        idDiet: GD.idDiet,
        DateDebut: GD.DateDebut,
        DateFin: GD.DateFin
      });
    }
  };

  render() {
    const { Diet } = this.props;
    const listOption = Diet.map((value, index) => {
      return (
        <option
          key={index}
          value={`${value.DietName}+${value.idDiet}`}
          onChange={this.handleChange}
        >
          {value.DietName}
        </option>
      );
    });
    return (
      <tr>
        <td>
          <FormSelect id="Diet" onChange={this.handleChange}>
            <option>---</option>
            {listOption}
          </FormSelect>
        </td>
        <td>
          {' '}
          <FormInput
            invalid={this.state.validDateDebut}
            valid={this.state.invalidDateDebut}
            type="date"
            id="DateDebut"
            onChange={this.handleChange}
          />
        </td>
        <td>
          {' '}
          <FormInput
            valid={this.state.invalidDateFin}
            invalid={this.state.validDateFin}
            type="date"
            id="DateFin"
            onChange={this.handleChange}
          />
        </td>

        <td>
          <FontAwesomeIcon
            onClick={this.Submiting}
            size="lg"
            icon={faPlusCircle}
          />
        </td>
      </tr>
    );
  }
}

export default FormProgram;
