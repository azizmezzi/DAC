/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable prefer-const */
/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import { FormInput, FormSelect } from 'shards-react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import '../../../../style/scrollerdesign2.css';

class FormCowDiet extends Component {
  state = {
    Diet: '',
    DietName: '',
    idDiet: 0,
    begin: 0,
    end: 0,
    Priority: 'medium',
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
        idDiet: words[1]
      });
    } else {
      this.setState({
        [e.target.id]: e.target.value
      });
    }
  };

  Submiting = e => {
    e.preventDefault();
    const CD = this.state;
    if (CD.begin == '') {
      this.setState({ invalidbegin: false, validbegin: true });
    } else
      this.setState({
        validbegin: false,
        invalidbegin: true
      });
    if (CD.end == '') {
      this.setState({
        validend: true,
        invalidend: true
      });
    } else
      this.setState({
        validend: false,
        invalidend: true
      });
    if (CD.DietrName !== '' && CD.begin != '' && CD.end != '') {
      this.props.add(this.state);
      this.setState({
        Diet: CD.Diet,
        DietName: CD.DietName,
        idDiet: CD.idDiet,
        begin: CD.begin,
        end: CD.end,
        Priority: CD.Priority
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
      <tbody>
        <tr>
          <td className="td2">
            <FormSelect id="Diet" onChange={this.handleChange}>
              <option>---</option>
              {listOption}
            </FormSelect>
          </td>
          <td className="td2">
            {' '}
            <FormInput
              invalid={this.state.validbegin}
              valid={this.state.invalidbegin}
              type="date"
              id="begin"
              onChange={this.handleChange}
            />
          </td>
          <td className="td2">
            {' '}
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
      </tbody>
    );
  }
}
export default FormCowDiet;
