/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable prefer-const */
/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import { FormInput, FormSelect } from 'shards-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import '../../../../style/scrollerdesign.css';
import '../../../../style/scrollerdesign2.css';

class FormdietEdit extends Component {
  state = {
    Fooder: '',
    FooderName: '',
    idFooder: 0,
    quantite: 0,
    Portion: 0,
    Priority: 'medium',
    validquantite: false,
    invalidquantite: false,
    validPortion: false,
    invalidPortion: false
  };

  handleChange = e => {
    if (e.target.id == 'Fooder') {
      const Fooder = e.target.value;

      let words = Fooder.split('+');
      this.setState({
        FooderName: words[0],
        idFooder: words[1]
      });
    } else {
      this.setState({
        [e.target.id]: e.target.value
      });
    }
  };

  Submiting = e => {
    e.preventDefault();
    const FD = this.state;

    if (FD.quantite == '') {
      this.setState({ invalidquantite: false, validquantite: true });
    } else
      this.setState({
        validquantite: false,
        invalidquantite: true
      });
    if (FD.Portion == '') {
      this.setState({
        validPortion: true,
        invalidPortion: true
      });
    } else
      this.setState({
        validPortion: false,
        invalidPortion: true
      });
    if (FD.FooderName !== '' && FD.quantite != '' && FD.Portion != '') {
      this.props.add(this.state);
      this.setState({
        Fooder: FD.Fooder,
        FooderName: FD.FooderName,
        idFooder: FD.idFooder,
        quantite: FD.quantite,
        Portion: FD.Portion,
        Priority: FD.Priority
      });
    }
  };

  render() {
    const { Fooder } = this.props;
    const listOption = Fooder.map((value, index) => {
      return (
        <option
          key={index}
          value={`${value.FooderName}+${value.idFooder}`}
          onChange={this.handleChange}
        >
          {value.FooderName}
        </option>
      );
    });
    return (
      <tr>
        <td className="td2">
          <FormSelect id="Fooder" onChange={this.handleChange}>
            <option>---</option>
            {listOption}
          </FormSelect>
        </td>
        <td className="td2">
          {' '}
          <FormInput
            invalid={this.state.validquantite}
            valid={this.state.invalidquantite}
            type="number"
            id="quantite"
            onChange={this.handleChange}
            placeholder="g"
          />
        </td>
        <td className="td2">
          {' '}
          <FormInput
            valid={this.state.invalidPortion}
            invalid={this.state.validPortion}
            type="number"
            id="Portion"
            onChange={this.handleChange}
            placeholder="g"
          />
        </td>
        <td className="td2">
          {' '}
          <FormSelect id="Priority" onChange={this.handleChange}>
            <option value="high">high</option>
            <option value="medium">medium</option>
            <option value="low">low</option>
          </FormSelect>{' '}
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
export default FormdietEdit;
