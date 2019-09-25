/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { Container, Row, Col } from 'shards-react';
import PageTitle from '../../components/common/PageTitle';
import SmallStats from '../../components/common/SmallStats';
import UsersOverview from './statistique/UsersOverview';
import StatSpecifique from './statistique/statSpecifique';
import UsersByDevice from './statistique/UsersByDevice';
import { Config } from '../../configue';
import ChartsExemple from './statistique/StatDAC';

class Main extends Component {
  state = {
    dataSource: {
      data: []
    },
    visible: true,
    LogsData: [],
    length: 30,
    smallStats: [
      {
        label: 'Production Lait',
        value: '2,390',
        percentage: '4.7%',
        increase: true,
        chartLabels: [null, null, null, null, null, null, null],
        attrs: { md: '6', sm: '6' },
        datasets: [
          {
            label: 'Today',
            fill: 'start',
            borderWidth: 1.5,
            backgroundColor: 'rgba(0, 184, 216, 0.1)',
            borderColor: 'rgb(0, 184, 216)',
            data: [1, 2, 1, 3, 5, 4, 7]
          }
        ]
      },
      {
        label: 'Moyen Poid',
        value: '182',
        percentage: '12.4',
        increase: true,
        chartLabels: [null, null, null, null, null, null, null],
        attrs: { md: '6', sm: '6' },
        datasets: [
          {
            label: 'Today',
            fill: 'start',
            borderWidth: 1.5,
            backgroundColor: 'rgba(23,198,113,0.1)',
            borderColor: 'rgb(23,198,113)',
            data: [1, 2, 3, 3, 3, 4, 4]
          }
        ]
      },
      {
        label: 'le Gain',
        value: '8,147',
        percentage: '3.8%',
        increase: false,
        decrease: true,
        chartLabels: [null, null, null, null, null, null, null],
        attrs: { md: '4', sm: '6' },
        datasets: [
          {
            label: 'Today',
            fill: 'start',
            borderWidth: 1.5,
            backgroundColor: 'rgba(255,180,0,0.1)',
            borderColor: 'rgb(255,180,0)',
            data: [2, 3, 3, 3, 4, 3, 3]
          }
        ]
      },
      {
        label: 'new vaches',
        value: '29',
        percentage: '2.71%',
        increase: false,
        decrease: true,
        chartLabels: [null, null, null, null, null, null, null],
        attrs: { md: '4', sm: '6' },
        datasets: [
          {
            label: 'Today',
            fill: 'start',
            borderWidth: 1.5,
            backgroundColor: 'rgba(255,65,105,0.1)',
            borderColor: 'rgb(255,65,105)',
            data: [1, 7, 1, 3, 1, 4, 8]
          }
        ]
      },
      {
        label: 'GAIN TOTAL',
        value: '17,281',
        percentage: '2.4%',
        increase: true,
        decrease: false,
        chartLabels: [null, null, null, null, null, null, null],
        attrs: { md: '4', sm: '6' },
        datasets: [
          {
            label: 'Today',
            fill: 'start',
            borderWidth: 1.5,
            backgroundColor: 'rgb(0,123,255,0.1)',
            borderColor: 'rgb(0,123,255)',
            data: [3, 2, 3, 2, 4, 5, 4]
          }
        ]
      }
    ],
    title: 'DAC serve',
    chartData: {
      labels: Array.from(new Array(30), (_, i) => (i === 0 ? 1 : i)),
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
    this.getStats().then(stats => {
      const { dataSource } = this.state;
      dataSource.data = stats.data;
      console.log(dataSource)

      this.setState({
        dataSource
      });
    });

    this.getLogs().then(Log => {
      const data = [];
      const Logs = Log.data;
      console.log('Log.data');
      console.log(Log.data);
      for (let i = 0; i < Logs.length; i += 1) {
        data.push(Logs[i].QtManager);
      }

      const { chartData } = this.state;

      chartData.datasets[0].data = data;
      chartData.datasets[1].data = data;
      console.log('datasets[0].data');
      console.log(chartData);

      this.setState({ length: 100, chartData });
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

  getStats = () => {
    // eslint-disable-next-line no-undef
    const datas = fetch(`${Config.url}/Statistique/stats`)
      .then(reponse => {
        return reponse.json();
        // })
        // .then(({ data }) => {
      })
      // eslint-disable-next-line no-console
      .catch(err => console.error(err));

    return datas;
  };

  dismiss = () => {
    this.setState({ visible: false });
  };

  render() {
    const { smallStats, length, LogsData } = this.state;
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            title="Statistique"
            subtitle="agTEK"
            className="text-sm-left mb-3"
          />
        </Row>
        <Row>
          {smallStats.map((stats, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <Col className="col-lg mb-4" key={idx} {...stats.attrs}>
              <SmallStats
                id={`small-stats-${idx}`}
                variation="1"
                chartData={stats.datasets}
                chartLabels={stats.chartLabels}
                label={stats.label}
                value={stats.value}
                percentage={stats.percentage}
                increase={stats.increase}
                decrease={stats.decrease}
              />
            </Col>
          ))}
        </Row>
        <Row>
          {/* Users Overview */}
          {/* <Col lg="6" md="12" sm="6" className="mb-2">
            <UsersOverview
              length={length}
              LogsData={LogsData}
              charts={this.state}
            />
          </Col>
          */}

          {/* Users by Device */}
          <Col>
            <StatSpecifique />
          </Col>
        </Row>
        <br />
        <Row>
          {/* Users Overview */}
          <Col lg="6" md="6" sm="6" className="mb-2">
            <UsersOverview
              length={length}
              LogsData={LogsData}
              charts={this.state}
            />
          </Col>
          <Col lg="6" md="6" sm="6" className="mb-2">
            <ChartsExemple data={this.state.dataSource} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Main;
