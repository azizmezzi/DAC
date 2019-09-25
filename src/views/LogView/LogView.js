import React, { Component } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody, Progress ,Alert } from "shards-react";
import PageTitle from "./../../components/common/PageTitle";
import SmallStats from "./../../components/common/SmallStats";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faWrench, faTimesCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
class Main extends Component {
 
  state = {
    visible: true,
    smallStats: [
      {
        label: "Production Lait",
        value: "2,390",
        percentage: "4.7%",
        increase: true,
        chartLabels: [null, null, null, null, null, null, null],
        attrs: { md: "6", sm: "6" },
        datasets: [
          {
            label: "Today",
            fill: "start",
            borderWidth: 1.5,
            backgroundColor: "rgba(0, 184, 216, 0.1)",
            borderColor: "rgb(0, 184, 216)",
            data: [1, 2, 1, 3, 5, 4, 7]
          }
        ]
      },
      {
        label: "Moyen Poid",
        value: "182",
        percentage: "12.4",
        increase: true,
        chartLabels: [null, null, null, null, null, null, null],
        attrs: { md: "6", sm: "6" },
        datasets: [
          {
            label: "Today",
            fill: "start",
            borderWidth: 1.5,
            backgroundColor: "rgba(23,198,113,0.1)",
            borderColor: "rgb(23,198,113)",
            data: [1, 2, 3, 3, 3, 4, 4]
          }
        ]
      },
      {
        label: "le Gain",
        value: "8,147",
        percentage: "3.8%",
        increase: false,
        decrease: true,
        chartLabels: [null, null, null, null, null, null, null],
        attrs: { md: "4", sm: "6" },
        datasets: [
          {
            label: "Today",
            fill: "start",
            borderWidth: 1.5,
            backgroundColor: "rgba(255,180,0,0.1)",
            borderColor: "rgb(255,180,0)",
            data: [2, 3, 3, 3, 4, 3, 3]
          }
        ]
      },

    ]
  }

  dismiss=()=> {
    this.setState({ visible: false });
  }

    ;
  render() {
    const smallStats = this.state.smallStats
    return (
      <Container fluid className="main-content-container px-4">
        <PageTitle title="agTEK"  className="text-sm-left mb-3" />
        <Alert dismissible={this.dismiss} open={this.state.visible}>
        les Alert pour les   <strong>arrtés</strong> button &rarr;
      </Alert>
        <Row>
          {smallStats.map((stats, idx) => (
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
        <Col>
          <Card small className="mb-4">
            <CardHeader className="border-bottom">
              <h6 className="m-0">Liste des DAC</h6>
            </CardHeader>
            <CardBody className="p-0 pb-3">
              <table className="table mb-0">
                <thead className="bg-light">
                  <tr>
                    <th scope="col" className="border-0">
                      #
                  </th>
                    <th scope="col" className="border-0">
                      Nom DAC
                  </th>
                    <th scope="col" className="border-0">
                      Quantite 
                  </th>
                    <th scope="col" className="border-0">
                      Etat DAC
                  </th>
                    <th scope="col" className="border-0">
                      Progression
                  </th>

                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>dac central</td>
                    <td>70</td>
                    <td>
                      <FontAwesomeIcon size="lg" icon={faCheckCircle} className='heartbeat' />
                    </td>
                    <td>
                      <Progress
                        striped
                        animated
                        theme="info"
                        style={{ height: "5px" }}
                        className="mb-3"
                        value={80}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>DAC 8</td>
                    <td>80</td>
                    <td >
                      <FontAwesomeIcon size="lg" icon={faTimesCircle} className='pulsate-fwd' />
                    </td>
                    <td>
                      <Progress
                        animated
                        striped
                        theme="danger"
                        style={{ height: "5px" }}
                        className="mb-3"
                        value={90}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>DAC primaire</td>
                    <td>79</td>
                    <td>
                      <FontAwesomeIcon size="lg" icon={faExclamationTriangle} className='warrning' />

                    </td>
                    <td><Progress
                      animated
                      striped
                      theme="warning"
                      style={{ height: "5px" }}
                      className="mb-3"
                      value={60}
                    />
                    </td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>DAC dernier</td>
                    <td>30</td>
                    <td>
                      <FontAwesomeIcon size="lg" icon={faWrench} flip="vertical" spin />

                    </td>
                    <td>
                      <Progress animated style={{ height: "5px" }} striped value={50} className="mb-3" />


                    </td>
                  </tr>
                </tbody>
              </table>
            </CardBody>
          </Card>
        </Col>


      </Container>
    )
  }

}

export default Main;