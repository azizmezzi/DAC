/* eslint-disable radix */
import React, { Component } from 'react';
// import ReactDOM from 'react-dom';

import { Row, Col, Button, FormSelect, CardFooter } from 'shards-react';

import '../../../style/scrollerdesign.css';
import '../../../style/scrollerdesign2.css';
import RangeDatePicker from './RangeDatePicker';
import { Config } from '../../../configue';

class FooterStat extends Component {
  state = {
    vache: [],
    idDAC: 0,
    idCow: 0,
    DAC: [],
    // eslint-disable-next-line react/no-unused-state
    startDate: '',
    // eslint-disable-next-line react/no-unused-state
    endDate: ''
  };

  componentDidMount = () => {
    this.getVaches().then(vaches => {
      this.setState({
        vache: vaches.data
      });
    });
    this.getDAC().then(DAC => {
      this.setState({
        // eslint-disable-next-line react/no-unused-state
        DAC: DAC.data
      });
    });
  };

  getVaches = () => {
    // eslint-disable-next-line no-undef
    const datas = fetch(`${Config.url}/vaches`)
      .then(reponse => {
        return reponse.json();
        // })
        // .then(({ data }) => {
      })
      // eslint-disable-next-line no-console
      .catch(err => console.error(err));

    return datas;
  };

  getDAC = () => {
    // eslint-disable-next-line no-undef
    const datas = fetch(`${Config.url}/DAC`)
      .then(reponse => {
        return reponse.json();
        // })
        // .then(({ data }) => {
      })
      .catch(err => console.error(err));
    console.log(datas);

    return datas;
  };

  setDate = (startDate, endDate) => {
    // eslint-disable-next-line react/no-unused-state
    this.setState({ startDate, endDate });
  };

  statistiquePostMethode = stat => {
    const post = JSON.stringify({
      idCow: JSON.stringify(stat.idCow),
      idDAC: JSON.stringify(stat.idDAC),
      startDate: JSON.stringify(stat.startDate),
      endDate: JSON.stringify(stat.endDate)
    });
    // eslint-disable-next-line no-useless-concat
    const formbody = [`${'post' + '='}${post}`];
    // eslint-disable-next-line no-undef
    const data = fetch(`${Config.url}/Log/stat`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded' // <-- Specifying the Content-Type
      },
      body: formbody // <-- Post parameters
    })
      .then(responseText => {
        return responseText.json();
      })
      .catch(error => {
        console.error(error);
      });
    return data;
  };

  render() {
    const { DAC, vache } = this.state;
    const ListDAC = DAC.map((value, index) => {
      return (
        // eslint-disable-next-line react/no-array-index-key
        <option value={value.idDAC} key={index}>
          {value.DACName}
        </option>
      );
    });

    const ListVache = vache.map((value, index) => {
      return (
        // eslint-disable-next-line react/no-array-index-key
        <option value={value.id} key={index}>
          {value.name}
        </option>
      );
    });
    return (
      <CardFooter className="border-top">
        <Row>
          <Col>
            <FormSelect
              id="idDAC"
              size="sm"
              style={{ maxWidth: '130px' }}
              onChange={e => {
                this.setState({ [e.target.id]: parseInt(e.target.value) });
              }}
            >
              <option value={0}> tous les DAC</option>
              {ListDAC}
            </FormSelect>
          </Col>
          <Col>
            <FormSelect
              id="idCow"
              size="sm"
              style={{ maxWidth: '130px' }}
              onChange={e => {
                this.setState({ [e.target.id]: parseInt(e.target.value) });
              }}
            >
              <option value={0}>tous les vaches</option>
              {ListVache}
            </FormSelect>
          </Col>
          <Col sm="6" className="d-flex mb-2 mb-sm-0">
            <RangeDatePicker setDate={this.setDate} />
          </Col>

          <Col className="text-right view-report">
            <Button
              size="sm"
              className="d-flex btn-white ml-auto mr-auto ml-sm-auto mr-sm-0 mt-3 mt-sm-0"
              onClick={e => {
                e.preventDefault();
                console.log(this.state);
                this.statistiquePostMethode(this.state).then(res => {
                  console.log(res.data);
                  // eslint-disable-next-line react/destructuring-assignment
                  this.props.dataSet(res.data);
                });
              }}
            >
              diagramme &rarr;
            </Button>
          </Col>
        </Row>
      </CardFooter>
    );
  }
}
export default FooterStat;
