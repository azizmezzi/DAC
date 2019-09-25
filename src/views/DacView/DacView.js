/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable default-case */
/* eslint-disable no-param-reassign */
/* eslint-disable radix */
/* eslint-disable no-alert */
/* eslint-disable class-methods-use-this */
/* eslint-disable consistent-return */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-plusplus */
import React, { Component } from 'react';
import { Container, Row, Card, CardBody } from 'shards-react';
import Popover, { ArrowContainer } from 'react-tiny-popover';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faWrench,
  faTimesCircle,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import MaterialTable from 'material-table';
import PageTitle from '../../components/common/PageTitle';
import { Config } from '../../configue';
import DACRow2 from './DAC/RowDAC2';
import '../../style/scrollerdesign.css';
import '../../style/scrollerdesign2.css';

class Main extends Component {
  state = {
    isPopoverOpen: [],
    isOpen: false,
    DAC: []
  };

  componentDidMount = () => {
    this.getDAC().then(DAC => {
      const DACS = DAC.data;
      const { isPopoverOpen } = this.state;
      for (let i = 0; i < DACS.length; i++) isPopoverOpen.push(false);

      this.setState({
        isPopoverOpen,
        DAC: DAC.data
      });
    });
  };

  getDAC = () => {
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

  editDAC = (index, change) => {
    const { DAC } = this.state;
    const DACs = DAC[index];
    for (const i in change) {
      DACs[i] = change[i];
    }

    console.log('DACs');
    console.log(DACs);
    this.updateMethodeDAC(DACs);

    this.setState({
      DAC
    });
  };

  deleteDAC = index => {
    const { DAC } = this.state;
    const DACDeleted = DAC[index];

    DAC.splice(index, 1);
    this.setState({ DAC });
    this.deleteMethodeDAC(DACDeleted.idDAC);
  };

  addDAC = (a, idDAC) => {
    const { DAC } = this.state;
    a.idDAc = idDAC;
    DAC.push(a);
    this.setState({
      isOpen: !this.state.isOpen,
      isPopoverOpen: !this.state.isPopoverOpen,
      DAC
    });
  };

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
    }
  };

  deleteMethodeDAC(a) {
    const encodedKeyids = encodeURIComponent('ids');

    const encodedvalids = encodeURIComponent(a);

    const formbody = [`${encodedKeyids}=${encodedvalids}`];

    fetch(`${Config.url}/DAC/delete`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded' // <-- Specifying the Content-Type
      },
      body: formbody // <-- Post parameters
    })
      .then(response => response.json())
      .then(responseText => {
        console.log(responseText);
      })
      .catch(error => {
        console.error(error);
      });
  }

  updateMethodeDAC(a) {
    const encodedKeyid = encodeURIComponent('idDAC');
    const encodedKeyname = encodeURIComponent('DACName');
    const encodedKeyQuantity = encodeURIComponent('Quantity');
    const encodedKeyDACstate = encodeURIComponent('DACstate');
    const encodedKeytube1 = encodeURIComponent('tube1');
    const encodedKeytube2 = encodeURIComponent('tube2');
    const encodedKeytube3 = encodeURIComponent('tube3');

    const encodedvalid = encodeURIComponent(a.idDAC);
    const encodedvalname = encodeURIComponent(a.DACName);
    const encodedvalQuantity = encodeURIComponent(a.Quantity);
    const encodedvalDACstate = encodeURIComponent(parseInt(a.DACstate));
    const encodedvaltube1 = encodeURIComponent(a.tube1);
    const encodedvaltube2 = encodeURIComponent(a.tube2);
    const encodedvaltube3 = encodeURIComponent(a.tube3);

    let formbody = [
      `${encodedKeyid}=${encodedvalid}`,
      `${encodedKeyname}=${encodedvalname}`,
      `${encodedKeyQuantity}=${encodedvalQuantity}`,
      `${encodedKeyDACstate}=${encodedvalDACstate}`,
      `${encodedKeytube1}=${encodedvaltube1}`,
      `${encodedKeytube2}=${encodedvaltube2}`,
      `${encodedKeytube3}=${encodedvaltube3}`
    ];
    formbody = formbody.join('&');

    fetch(`${Config.url}/DAC/update`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded' // <-- Specifying the Content-Type
      },
      body: formbody // <-- Post parameters
    })
      .then(responseText => {
        console.log(responseText);
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const { DAC } = this.state;

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
              const { isPopoverOpen } = this.state;
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
                const { isPopoverOpen } = this.state;
                isPopoverOpen[index] = true;
                this.setState({ isPopoverOpen });
              }}
              onMouseUp={() => {
                const { isPopoverOpen } = this.state;
                isPopoverOpen[index] = true;
                this.setState({ isPopoverOpen });
              }}
              onMouseLeave={() => {
                const { isPopoverOpen } = this.state;
                isPopoverOpen[index] = false;
                this.setState({ isPopoverOpen });
              }}
            >
              {this.DACStateMethode(valeur.DACstate)}
            </div>
          </Popover>
        ),
        Actions: (
          <DACRow2
            detail={valeur}
            key={index}
            index={index}
            edit={this.editDAC}
            delete={this.deleteDAC}
          />
        )
      };
      return v;
    });
    const columns = [
      {
        title: 'id',
        field: 'id',
        headerStyle: { zIndex: 0 }
      },
      {
        title: 'Nom DAC',
        field: 'name',
        headerStyle: { zIndex: 0 }
      },
      {
        title: 'Quantity',
        field: 'Quantity',
        headerStyle: { zIndex: 0 }
      },

      {
        title: 'etat',
        field: 'etat',
        headerStyle: { zIndex: 0 }
      },
      {
        title: 'Actions',
        field: 'Actions',
        headerStyle: { zIndex: 0 }
      }
    ];

    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            title="distributeurs automatiques de concentré"
            subtitle="agTEK"
            className="text-sm-left mb-3"
          />
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
