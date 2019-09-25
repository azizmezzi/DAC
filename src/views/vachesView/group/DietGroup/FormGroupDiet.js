/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable radix */
/* eslint-disable prefer-const */
/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import { FormInput, FormSelect } from 'shards-react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import '../../../../style/scrollerdesign.css';
import '../../../../style/scrollerdesign2.css';

class FormGroupDiet extends Component {
  state = {
    Diet: '',
    DietName: '',
    idDiet: 0,
    begin: 0,
    end: 0,

    validbegin: false,
    invalidbegin: false,
    validend: false,
    invalidend: false
  };

  handleChange = e => {
    if (e.target.id == 'Diet') {
      const Diet = e.target.value;

      let words = Diet.split('+');
      this.setState({
        DietName: words[0],
        idDiet: parseInt(words[1])
      });
    } else {
      if (e.target.id == 'begin') {
        console.log(e.target.value);
        const begin = e.target.value;
        this.setState({
          begin
        });
      }
      if (e.target.id == 'end') {
        const end = e.target.value;
        this.setState({
          end
        });
      }
    }
  };

  Submiting = e => {
    e.preventDefault();
    const FD = this.state;
    console.log('(this.state');
    console.log(this.state);
    const GD = this.state;
    if (GD.begin == '') {
      this.setState({ invalidbegin: false, validbegin: true });
    } else
      this.setState({
        validbegin: false,
        invalidbegin: true
      });
    if (GD.end == '') {
      this.setState({
        validend: true,
        invalidend: true
      });
    } else
      this.setState({
        validend: false,
        invalidend: true
      });
    if (GD.DietName !== '' && GD.begin != '' && GD.end != '') {
      this.props.addGroupDiet(this.state);
      this.setState({
        Diet: FD.Diet,
        DietName: FD.DietName,
        idDiet: FD.idDiet,
        begin: FD.begin,
        end: FD.end,
        Priority: FD.Priority
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
        <td className="td2">
          <FormSelect id="Diet" onChange={this.handleChange}>
            <option value="">---</option>
            {listOption}
          </FormSelect>
        </td>
        <td className="td2">
          <FormInput
            invalid={this.state.validbegin}
            valid={this.state.invalidbegin}
            type="date"
            id="begin"
            onChange={this.handleChange}
          />
        </td>

        <td className="td2">
          <FormInput
            valid={this.state.invalidend}
            invalid={this.state.validend}
            type="date"
            id="end"
            onChange={this.handleChange}
          />
        </td>

        <td className="td2">
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
export default FormGroupDiet;
