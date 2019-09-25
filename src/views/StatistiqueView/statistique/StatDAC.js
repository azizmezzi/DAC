/* eslint-disable react/no-unused-state */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import { Row, Col, Card, CardHeader, CardBody, CardFooter } from 'shards-react';

import '../../../style/scrollerdesign.css';
import '../../../style/scrollerdesign2.css';

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);

class StatDAC extends Component {
  constructor(props) {
    super(props);

    this.state = {
      vache: [],
      DACName: '',
      chart: {},
      DAC: [],
      startDate: undefined,
      endDate: undefined,
      currentVal: 'column2d'
    };

    this.renderComplete = this.renderComplete.bind(this);
    this.radioHandler = this.radioHandler.bind(this);
  }

  renderComplete(chart) {
    this.setState({ chart });
  }

  // Handler for radio buttons to change chart type.
  radioHandler(e) {
    this.state.chart.chartType(e.currentTarget.value);
    this.setState({
      currentVal: e.currentTarget.value
    });
  }

  render() {
    const chartConfigs = {
      type: 'column2d',
      width: '90%',
      height: '90%',
      dataFormat: 'json',
      dataSource: {
        chart: {
          caption: 'Quantité servie par les DAC',
          subCaption: 'en totalité',
          yAxisName: 'Quantité (g)',
          showValues: '1',
          showPercentInTooltip: '0',
          numberPrefix: '',
          enableMultiSlicing: '1',
          theme: 'fusion'
        },
        data: this.props.data.data
        /*
        [ 
          {
            label: 'Equity',
            value: '300000'
          },
          {
            label: 'Debt',
            value: '230000'
          },
          {
            label: 'Bullion',
            value: '180000'
          },
          {
            label: 'Real-estate',
            value: '270000'
          },
          {
            label: 'Insurance',
            value: '20000'
          }
          
        ]
        */
      }
    };

    return (
      <Card small className="h-100">
        <CardHeader className="border-bottom">
          <h6 className="m-0">DAC statistique</h6>
        </CardHeader>
        <CardBody className="d-flex py-0">
          <div>
            <br />
            <br />
            <br />
            <ReactFC {...chartConfigs} onRender={this.renderComplete} />
            <br />
          </div>
        </CardBody>
        <CardFooter>
          <Row>
            <Col>
              <center>
                <a
                  onClick={() => {
                    this.state.chart.chartType('column2d');
                    this.setState({ currentVal: 'column2d' });
                  }}
                  className={
                    this.state.currentVal === 'column2d'
                      ? 'ChartButton ChartButtonClicked'
                      : 'ChartButton'
                  }
                >
                  <center>Column 2D Chart</center>
                </a>
                &nbsp;
                <a
                  onClick={() => {
                    this.state.chart.chartType('bar2d');
                    this.setState({ currentVal: 'bar2d' });
                  }}
                  className={
                    this.state.currentVal === 'bar2d'
                      ? 'ChartButton ChartButtonClicked'
                      : 'ChartButton'
                  }
                >
                  <center>Bar 2D Chart</center>
                </a>
                &nbsp;
                <a
                  onClick={() => {
                    this.state.chart.chartType('pie2d');
                    this.setState({ currentVal: 'pie2d' });
                  }}
                  className={
                    this.state.currentVal === 'pie2d'
                      ? 'ChartButton ChartButtonClicked'
                      : 'ChartButton'
                  }
                >
                  <center>Pie 2D Chart</center>
                </a>
              </center>
            </Col>
          </Row>
        </CardFooter>
      </Card>
    );
  }
}

// ReactDOM.render(<Chart />, document.getElementById('root'));

export default StatDAC;
