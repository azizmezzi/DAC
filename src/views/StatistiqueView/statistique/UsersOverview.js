/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import {  Card, CardHeader, CardBody } from 'shards-react';

// import RangeDatePicker from './RangeDatePicker';
import Chart from '../utils/chart';
import { Config } from '../../../configue';

class UsersOverview extends React.Component {
  constructor(props) {
    super(props);

    this.canvasRef = React.createRef();
  }

  state = {
    title: 'DAC servie',
    chartData: {
      labels: [],
      datasets: [
        {
          label: 'cette mois',
          fill: 'start',
          data: [
            500,
            800,
            320,
            180,
            240,
            320,
            230,
            650,
            590,
            1200,
            750,
            940,
            1420,
            1200,
            960,
            1450,
            1820,
            2800,
            2102,
            1920,
            3920,
            3202,
            3140,
            2800,
            3200,
            3200,
            3400,
            2910,
            3100,
            4250
          ],
          backgroundColor: 'rgba(0,123,255,0.1)',
          borderColor: 'rgba(0,123,255,1)',
          pointBackgroundColor: '#ffffff',
          pointHoverBackgroundColor: 'rgb(0,123,255)',
          borderWidth: 1.5,
          pointRadius: 0,
          pointHoverRadius: 3
        },
        {
          label: 'mois dernier',
          fill: 'start',
          data: [
            380,
            430,
            120,
            230,
            410,
            740,
            472,
            219,
            391,
            229,
            400,
            203,
            301,
            380,
            291,
            620,
            700,
            300,
            630,
            402,
            320,
            380,
            289,
            410,
            300,
            530,
            630,
            720,
            780,
            1200
          ],
          backgroundColor: 'rgba(255,65,105,0.1)',
          borderColor: 'rgba(255,65,105,1)',
          pointBackgroundColor: '#ffffff',
          pointHoverBackgroundColor: 'rgba(255,65,105,1)',
          borderDash: [3, 3],
          borderWidth: 1,
          pointRadius: 0,
          pointHoverRadius: 2,
          pointBorderColor: 'rgba(255,65,105,1)'
        }
      ]
    }
  };

  componentDidMount() {
    this.getLogs().then(Log => {
      const data = [];
      const Logs = Log.data;
      for (let i = 0; i < Logs.length; i += 1) {
        data.push(Logs[i].QtManager);
      }
      // insertion de data pour le chart
      const { chartData } = this.state;

      chartData.datasets[0].data = data;
      chartData.datasets[1].data = data;

      // eslint-disable-next-line prefer-destructuring
      const length = data.length;
      const labels = Array.from(new Array(length), (_, i) => (i === 0 ? 1 : i));
      chartData.labels = labels;

      const chartOptions = {
        ...{
          responsive: true,
          legend: {
            position: 'top'
          },
          elements: {
            line: {
              // A higher value makes the line look skewed at this ratio.
              tension: 0.3
            },
            point: {
              radius: 0
            }
          },
          scales: {
            xAxes: [
              {
                gridLines: false,
                ticks: {
                  callback(tick, index) {
                    // Jump every 7 values on the X axis labels to avoid clutter.
                    return index % 7 !== 0 ? '' : tick;
                  }
                }
              }
            ],
            yAxes: [
              {
                ticks: {
                  suggestedMax: 45,
                  callback(tick) {
                    if (tick === 0) {
                      return tick;
                    }
                    // Format the amounts using Ks for thousands.
                    return tick > 999 ? `${(tick / 1000).toFixed(1)}` : tick;
                  }
                }
              }
            ]
          },
          hover: {
            mode: 'nearest',
            intersect: false
          },
          tooltips: {
            custom: false,
            mode: 'nearest',
            intersect: false
          }
        },
        // eslint-disable-next-line react/destructuring-assignment
        ...this.props.chartOptions
      };

      const BlogUsersOverview = new Chart(this.canvasRef.current, {
        type: 'LineWithLine',
        data: chartData,
        options: chartOptions
      });

      // They can still be triggered on hover.
      const buoMeta = BlogUsersOverview.getDatasetMeta(0);
      buoMeta.data[0]._model.radius = 0;
      buoMeta.data[chartData.datasets[0].data.length - 1]._model.radius = 0;

      // Render the chart.
      BlogUsersOverview.render();
    });
  }

  getLogs = () => {
    // eslint-disable-next-line no-undef
    const datas = fetch(`${Config.url}/Log`)
      .then(reponse => {
        return reponse.json();
        // })
        // .then(({ data }) => {
      })
      .catch(err => console.error(err));
    console.log(datas);

    return datas;
  };

  render() {
    const { title } = this.state;
    return (
      <Card small className="h-100">
        <CardHeader className="border-bottom">
          <h6 className="m-0">{title}</h6>
        </CardHeader>
        <CardBody className="pt-0">
          {/*
          <Row className="border-bottom py-2 bg-light">
            <Col sm="6" className="d-flex mb-2 mb-sm-0">
              <RangeDatePicker />
            </Col>
            <Col>
              <Button
                size="sm"
                className="d-flex btn-white ml-auto mr-auto ml-sm-auto mr-sm-0 mt-3 mt-sm-0"
              >
                View Full Report &rarr;
              </Button>
            </Col>
          </Row>
          */}
          <canvas
            height="190"
            ref={this.canvasRef}
            style={{ maxWidth: '100% !important' }}
          />
        </CardBody>
      </Card>
    );
  }
}

UsersOverview.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string,
  /**
   * The chart dataset.
   */
  // eslint-disable-next-line react/forbid-prop-types
  chartData: PropTypes.object,
  /**
   * The Chart.js options.
   */
  // eslint-disable-next-line react/forbid-prop-types
  chartOptions: PropTypes.object
};
/*
UsersOverview.defaultProps = {
  title: 'Users Overview',
  chartData: {
    labels: Array.from(new Array(60), (_, i) => (i === 0 ? 1 : i)),
    datasets: [
      {
        label: 'Current Month',
        fill: 'start',
        data: [
          500,
          800,
          320,
          180,
          240,
          320,
          230,
          650,
          590,
          1200,
          750,
          940,
          1420,
          1200,
          960,
          1450,
          1820,
          2800,
          2102,
          1920,
          3920,
          3202,
          3140,
          2800,
          3200,
          3200,
          3400,
          2910,
          3100,
          4250
        ],
        backgroundColor: 'rgba(0,123,255,0.1)',
        borderColor: 'rgba(0,123,255,1)',
        pointBackgroundColor: '#ffffff',
        pointHoverBackgroundColor: 'rgb(0,123,255)',
        borderWidth: 1.5,
        pointRadius: 0,
        pointHoverRadius: 3
      },
      {
        label: 'Past Month',
        fill: 'start',
        data: [
          380,
          430,
          120,
          230,
          410,
          740,
          472,
          219,
          391,
          229,
          400,
          203,
          301,
          380,
          291,
          620,
          700,
          300,
          630,
          402,
          320,
          380,
          289,
          410,
          300,
          530,
          630,
          720,
          780,
          1200
        ],
        backgroundColor: 'rgba(255,65,105,0.1)',
        borderColor: 'rgba(255,65,105,1)',
        pointBackgroundColor: '#ffffff',
        pointHoverBackgroundColor: 'rgba(255,65,105,1)',
        borderDash: [3, 3],
        borderWidth: 1,
        pointRadius: 0,
        pointHoverRadius: 2,
        pointBorderColor: 'rgba(255,65,105,1)'
      }
    ]
  }
};
*/

export default UsersOverview;
