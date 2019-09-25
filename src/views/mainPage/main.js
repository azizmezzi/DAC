/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
import React, { Component, Fragment } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Progress,
  Alert
} from 'shards-react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Popover, { ArrowContainer } from 'react-tiny-popover';
import MaterialTable from 'material-table';

import {
  faCheckCircle,
  faWrench,
  faTimesCircle,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import { Config } from '../../configue';
import '../../style/scrollerdesign.css';
import '../../style/scrollerdesign2.css';
import SmallStats from '../../components/common/SmallStats';
import './style.css';

class Main extends Component {
  state = {
    isPopoverOpen: [],
    DAC: [],
    visible: true,
    smallStats: [
      {
        label: 'Moyen Poid',
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
        label: 'Consomation Globale',
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
        label: ' Gain',
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
      }
    ]
  };

  componentDidMount = () => {
    this.getMoyenweigth().then(moyenWiegth => {
      console.log(moyenWiegth.data);
      console.log(moyenWiegth.result);
      console.log(moyenWiegth.total);
      const { smallStats } = this.state;
      smallStats[0].value = moyenWiegth.result;
      this.setState({ smallStats });
    });
    this.getDAC().then(DAC => {
      const DACS = DAC.data;
      const { isPopoverOpen } = this.state;
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < DACS.length; i++) isPopoverOpen.push(false);

      this.setState({
        isPopoverOpen,
        DAC: DAC.data
      });
    });
  };

  dismiss = () => {
    this.setState({ visible: false });
  };

  getMoyenweigth = () => {
    // eslint-disable-next-line no-undef
    const datas = fetch(`${Config.url}/Statistique/MoyenPoid`)
      .then(reponse => {
        return reponse.json();
        // })
        // .then(({ data }) => {
      })
      .catch(err => console.error(err));
    console.log(datas);

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

  // eslint-disable-next-line consistent-return
  DACStateMethode = a => {
    switch (a) {
      case 0:
        return (
          <FontAwesomeIcon
            size="lg"
            icon={faCheckCircle}
            className="heartbeat"
          />
        );
      case 1:
        return (
          <FontAwesomeIcon
            size="lg"
            icon={faTimesCircle}
            className="pulsate-fwd"
          />
        );
      case 2:
        return (
          <FontAwesomeIcon
            size="lg"
            icon={faExclamationTriangle}
            className="warrning"
          />
        );
      case 3:
        return (
          <FontAwesomeIcon size="lg" icon={faWrench} flip="vertical" spin />
        );
      default:
        return <Fragment />;
    }
  };

  // eslint-disable-next-line consistent-return
  ProgressStyle = a => {
    switch (a) {
      case 0:
        return '';
      case 1:
        return 'danger';
      case 3:
        return 'info';
      case 2:
        return 'warning';
      default:
        return '';
    }
  };

  render() {
    const { smallStats, DAC, visible } = this.state;

    const DACListe2 = DAC.map((valeur, index) => {
      const v = {
        id: index,
        name: valeur.DACName,
        Quantity: valeur.Quantity,

        etat: (
          <Popover
            isOpen={this.state.isPopoverOpen[index]}
            position={['left', 'top', 'right', 'bottom']}
            padding={10}
            onClickOutside={() => {
              const isPopoverOpen = this.state.isPopoverOpen;
              isPopoverOpen[index] = false;
              this.setState({ isPopoverOpen });
            }}
            content={({ position, targetRect, popoverRect }) => (
              <ArrowContainer // if you'd like an arrow, you can import the ArrowContainer!
                position={position}
                targetRect={targetRect}
                popoverRect={popoverRect}
                arrowColor="#d3d3d3"
                arrowSize={14}
                arrowStyle={{ opacity: 0.7 }}
              >
                <Card small className="mb-4">
                  <CardBody className="p-0 pb-3">
                    <div>message {position}.</div>
                  </CardBody>
                </Card>
              </ArrowContainer>
            )}
          >
            <div
              onMouseEnter={() => {
                const isPopoverOpen = this.state.isPopoverOpen;
                isPopoverOpen[index] = true;
                this.setState({ isPopoverOpen });
              }}
              onMouseUp={() => {
                const isPopoverOpen = this.state.isPopoverOpen;
                isPopoverOpen[index] = true;
                this.setState({ isPopoverOpen });
              }}
              onMouseLeave={() => {
                const isPopoverOpen = this.state.isPopoverOpen;
                isPopoverOpen[index] = false;
                this.setState({ isPopoverOpen });
              }}
            >
              {this.DACStateMethode(valeur.DACstate)}
            </div>
          </Popover>
        ),
        progress: (
          <Progress
            striped
            animated
            theme={this.ProgressStyle(valeur.DACstate)}
            style={{ height: '5px' }}
            className="mb-3"
            value={valeur.Progress}
          />
        )
      };
      return v;
    });
    const columns = [
      {
        title: 'id',
        field: 'id'
      },
      {
        title: 'Nom DAC',
        field: 'name'
      },
      {
        title: 'Quantity',
        field: 'Quantity'
      },

      {
        title: 'etat',
        field: 'etat'
      },
      {
        title: 'progress',
        field: 'progress'
      }
    ];

    return (
      <Container fluid className="main-content-container px-4">
        <br />
        <Alert dismissible={this.dismiss} open={visible}>
          les Alert pour les <strong>arrtés</strong> button &rarr;
        </Alert>

        <Row>
          {smallStats.map((stats, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <Col className="col-lg mb-1" key={idx} {...stats.attrs}>
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

        <MaterialTable
          columns={columns}
          data={DACListe2}
          title="Liste DAC"
          options={{
            columnsButton: true,
            maxBodyHeight: '50vh'
          }}
        />
      </Container>
    );
  }
}

export default Main;
