/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable no-plusplus */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable global-require */
/* eslint-disable radix */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-string-refs */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable consistent-return */
/* eslint-disable default-case */
/* eslint-disable no-dupe-keys */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import React, { Component, Fragment } from 'react';
import {
  FormInput,
  ButtonGroup,
  Button,
  CardBody,
  FormSelect,
  Card,
  Row,
  Col
} from 'shards-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWrench,
  faExclamationTriangle,
  faTimesCircle,
  faCheckCircle,
  faCheck,
  faRedo,
  faPencilAlt
} from '@fortawesome/free-solid-svg-icons';
import SlidingPane from 'react-sliding-pane';
import Modal from 'react-modal';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import Popover, { ArrowContainer } from 'react-tiny-popover';

import '../../mainPage/style.css';
import '../../../style/scrollerdesign.css';
import '../../../style/scrollerdesign2.css';
import { Config } from '../../../configue';

class DACRow2 extends Component {
  state = {
    idUser: 0,
    Role: 2,
    edit: false,
    DAC: [],
    NameFooderDac: ['', '', ''],
    change: {
      tube1: 0,
      tube2: 0,
      tube3: 0,
      DACName: this.props.detail.DACName
    },
    isPopoverOpen: false,
    Fooderopen: false,
    Fooderopen2: false,
    Fooderopen3: false,
    Fooder: [],
    dropdown1: false,
    dropdown2: false,
    DACEdit: false,
    tube1: '',
    tube2: '',
    tube3: ''
  };

  componentDidMount() {
    Modal.setAppElement('body');
    const idUser = localStorage.getItem('idUser');
    const Role = localStorage.getItem('Role');
    this.setState({
      // eslint-disable-next-line radix
      Role: parseInt(Role),
      // eslint-disable-next-line radix
      idUser: parseInt(idUser)
    });
  }

  getFooder = () => {
    const datas = fetch(`${Config.url}/fooder`)
      .then(reponse => {
        return reponse.json();
        // })
        // .then(({ data }) => {
      })
      .catch(err => console.error(err));

    return datas;
  };

  getFooderDAC = idDAC => {
    const datas = fetch(`${Config.url}/fooderDAC?idDAC=${idDAC}`)
      .then(reponse => {
        return reponse.json();
        // })
        // .then(({ data }) => {
      })
      .catch(err => console.error(err));

    return datas;
  };

  DACStateMethode = a => {
    switch (a) {
      case 0:
        return (
          <center>
            <FontAwesomeIcon
              size="lg"
              icon={faCheckCircle}
              className="heartbeat"
            />
          </center>
        );
      case 1:
        return (
          <center>
            <FontAwesomeIcon
              size="lg"
              icon={faTimesCircle}
              className="pulsate-fwd"
            />{' '}
          </center>
        );
      case 2:
        return (
          <center>
            <FontAwesomeIcon
              size="lg"
              icon={faExclamationTriangle}
              className="warrning"
            />{' '}
          </center>
        );
      case 3:
        return (
          <center>
            <FontAwesomeIcon size="lg" icon={faWrench} flip="vertical" spin />{' '}
          </center>
        );
    }
  };

  showEditCow = () => {
    this.getFooder()
      .then(Fooder => {
        const Food = this.state.Fooder;

        const Fooders = Fooder.data;
        for (let i = 0; i < Fooders.length; i++) {
          const v = {
            idFooder: Fooders[i].idFooder,
            FooderName: Fooders[i].FooderName,
            FooderAffectation: 0,
            tubeNumber: 0
          };
          Food.push(v);
        }
        this.setState({ Fooder: Food });
      })
      .then(() => {
        this.getFooderDAC(this.props.detail.idDAC).then(FooderDAC => {
          const FooderDACS = FooderDAC.data;

          const { Fooder, change } = this.state;
          const { NameFooderDac } = this.state;

          for (let i = 0; i < FooderDACS.length; i++) {
            switch (FooderDACS[i].tubeNumber) {
              case 1:
                change.tube1 = FooderDACS[i].idFodder;
                break;
              case 2:
                change.tube2 = FooderDACS[i].idFodder;
                break;
              case 3:
                change.tube3 = FooderDACS[i].idFodder;
                break;
              default:
                break;
            }
          }

          for (let i = 0; i < Fooder.length; i++) {
            for (let j = 0; j < FooderDACS.length; j++) {
              if (FooderDACS[j].idFodder == Fooder[i].idFooder) {
                NameFooderDac[FooderDACS[j].tubeNumber - 1] =
                  Fooder[i].FooderName;
              }
            }
          }

          console.log('NameFooderDac');
          console.log(NameFooderDac);
          this.setState({ Fooder, NameFooderDac, change });
        });
      });
    this.setState({
      DACEdit: true
    });
  };

  renderActions = () => {
    const DACState = this.props.detail.DACstate;
    const DACStateListe = this.DACStateMethode(DACState);

    const { Fooder } = this.state;

    const listOption = Fooder.map((value, index) => {
      return (
        <option key={index} value={value.idFooder}>
          {value.FooderName}
        </option>
      );
    });
    const listOption2 = Fooder.map((value, index) => {
      return (
        <option key={index} value={value.idFooder}>
          {value.FooderName}
        </option>
      );
    });
    const listOption3 = Fooder.map((value, index) => {
      return (
        <option key={index} value={value.idFooder}>
          {value.FooderName}
        </option>
      );
    });
    const tube2 = (
      <Col lg="4">
        <center>
          <h4>Tube 2 :</h4>

          <img
            style={{ maxWidth: '22vh' }}
            src={require('../../../images/tube.jpg')}
            alt="Shards Dashboard"
          />
          <FormSelect
            id="tube2"
            onChange={this.handleChange}
            value={this.state.change.tube2}
          >
            {
              // <option>{this.state.NameFooderDac[1]}</option>
            }
            {listOption2}
          </FormSelect>
        </center>
      </Col>
    );
    const tube3 = (
      <Col lg="4">
        <center>
          <h4>Tube 3 : </h4>

          <img
            style={{ maxWidth: '22vh' }}
            src={require('../../../images/tube.jpg')}
            alt="Shards Dashboard"
          />
          <FormSelect
            id="tube3"
            onChange={this.handleChange}
            value={this.state.change.tube3}
          >
            {
              // <option>{this.state.NameFooderDac[2]}</option>
            }
            {listOption3}
          </FormSelect>
        </center>
      </Col>
    );
    return (
      <ButtonGroup>
        <Button outline pill theme="success" onClick={() => this.showEditCow()}>
          <FontAwesomeIcon size="lg" icon={faPencilAlt} />
        </Button>
        {/* <Button outline pill theme="danger" onClick={() => { this.props.delete(this.props.index) }} >
                    <FontAwesomeIcon size="lg" icon={faTrash} />
        </Button> */}
        <SlidingPane
          className="some-custom-class up"
          overlayClassName="some-custom-overlay-class"
          title="Fermer"
          subtitle="Fermer ajout de vache."
          width="50%"
          isOpen={this.state.DACEdit}
          onRequestClose={() => {
            // triggered on "<" on left top click or on outside click
            this.setState({ DACEdit: false, NameFooderDac: [], Fooder: [] });
          }}
        >
          <Row form>
            <Col md="6" className="form-group">
              <label htmlFor="DACName">nom DAC</label>
              <FormInput
                disabled={this.state.Role === 2}
                valid={this.state.invalidname}
                invalid={this.state.validname}
                id="DACName"
                name="DACName"
                type="text"
                placeholder="nom du DAC .."
                onChange={this.handleChange}
                value={this.state.change.DACName}
              />
            </Col>
            <Col md="6" className="form-group">
              <label htmlFor="DateCow">etat </label>
              {DACStateListe}
            </Col>
          </Row>
          <Row form>
            <Col md="6" className="form-group">
              <label htmlFor="weight">Quantite</label>
              <FormInput
                id="weight"
                disabled
                type="number"
                onChange={this.handleChange}
                value={this.props.detail.Quantity}
              />
            </Col>
            <Col md="6" className="form-group" />
          </Row>
          <Row form>
            <Col lg="4">
              <center>
                <h4>Tube 1 : </h4>

                <img
                  id="main-logo"
                  style={{ maxWidth: '22vh' }}
                  src={require('../../../images/tube.jpg')}
                  alt="Shards Dashboard"
                />
              </center>
              <FormSelect
                id="tube1"
                onChange={this.handleChange}
                value={this.state.change.tube1}
              >
                {
                  // <option >{this.state.NameFooderDac[0]}</option>
                }
                {listOption}
              </FormSelect>
            </Col>

            {this.props.detail.tubeNumber >= 2 ? tube2 : <span />}
            {this.props.detail.tubeNumber >= 3 ? tube3 : <span />}
          </Row>

          <br />
          <br />
          <Row form>
            <Col />
            <Col className="form-group">
              <center>
                <Button
                  outline
                  pill
                  theme="danger"
                  onClick={() => {
                    this.setState({
                      edit: false,
                      DAC: [],
                      // NameFooderDac: ['', '', ''],
                      change: {
                        // tube1: 0,
                        // tube2: 0,
                        // tube3: 0,
                        DACName: this.props.detail.DACName
                      },
                      isPopoverOpen: false,
                      Fooderopen: false,
                      Fooderopen2: false,
                      Fooderopen3: false,
                      // Fooder: [],
                      dropdown1: false,
                      dropdown2: false,
                      // DACEdit: false,
                      tube1: '',
                      tube2: '',
                      tube3: ''
                      //   DACEdit: false
                    });

                    this.getFooderDAC(this.props.detail.idDAC).then(
                      FooderDAC => {
                        const FooderDACS = FooderDAC.data;

                        // eslint-disable-next-line no-shadow
                        const { Fooder, change } = this.state;

                        for (let i = 0; i < FooderDACS.length; i++) {
                          switch (FooderDACS[i].tubeNumber) {
                            case 1:
                              change.tube1 = FooderDACS[i].idFodder;
                              break;
                            case 2:
                              change.tube2 = FooderDACS[i].idFodder;
                              break;
                            case 3:
                              change.tube3 = FooderDACS[i].idFodder;
                              break;
                            default:
                              break;
                          }
                        }

                        var NameFooderDac = ['', '', ''];
                        for (let i = 0; i < Fooder.length; i++) {
                          for (let j = 0; j < FooderDACS.length; j++) {
                            if (FooderDACS[j].idFodder == Fooder[i].idFooder) {
                              NameFooderDac[FooderDACS[j].tubeNumber - 1] =
                                Fooder[i].FooderName;
                            }
                          }
                        }

                        console.log('NameFooderDac');
                        console.log(NameFooderDac);
                        console.log(change);
                        this.setState({ change, NameFooderDac });
                      }
                    );
                  }}
                >
                  <FontAwesomeIcon size="lg" icon={faRedo} />
                </Button>
                &nbsp; &nbsp; &nbsp; &nbsp;
                <Button
                  outline
                  pill
                  theme="primary"
                  onClick={e => this.onEdit(e)}
                >
                  <FontAwesomeIcon size="lg" icon={faCheck} />
                </Button>
              </center>
            </Col>
          </Row>
        </SlidingPane>
      </ButtonGroup>
    );
  };

  editing = () => {
    const { edit, DAC } = this.state;
    this.setState({
      edit: !edit,
      DAC
    });
  };

  handleChange = e => {
    const { edit, DAC, change, NameFooderDac } = this.state;
    console.log('NameFooderDac');
    console.log(NameFooderDac);
    if (e.target.id == 'DACstate') {
      change[e.target.id] = parseInt(e.target.value);
    } else if (e.target.id === 'tube1') {
      change[e.target.id] = parseInt(e.target.value);
    } else if (e.target.id === 'tube2') {
      change[e.target.id] = parseInt(e.target.value);
    } else if (e.target.id === 'tube2') {
      change[e.target.id] = parseInt(e.target.value);
    } else change[e.target.id] = e.target.value;
    console.log(NameFooderDac);

    this.setState({
      edit,
      DAC,
      change
    });
  };

  onEdit = e => {
    e.preventDefault();
    const { change } = this.state;

    this.props.edit(this.props.index, change);

    this.setState({
      DACEdit: false,

      NameFooderDac: [],
      Fooder: []
    });
  };

  anuuler = e => {
    e.preventDefault();
    this.editing();
  };

  handleChangechekbox(FooderAffectation, index, tubeNumber) {
    const { Fooder } = this.state;
    const v = Fooder[index];
    v.FooderAffectation = FooderAffectation;
    v.tubeNumber = tubeNumber;
    this.setState({ Fooder });
  }

  handleChangechekbox2(FooderAffectation, index, tubeNumber) {
    const { Fooder } = this.state;
    const v = Fooder[index];
    v.tubeNumber = tubeNumber;
    v.FooderAffectation = FooderAffectation;
    this.setState({ Fooder });
  }

  handleChangechekbox3(FooderAffectation, index, tubeNumber) {
    const { Fooder } = this.state;
    const v = Fooder[index];
    v.tubeNumber = tubeNumber;
    v.FooderAffectation = FooderAffectation;
    this.setState({ Fooder });
  }

  renderUpdate = () => {
    const DACState = this.props.detail.DACstate;
    const { isPopoverOpen } = this.state;

    const DACStateListe = this.DACStateMethode(DACState);
    return (
      <tr>
        <center>
          <td className="td2">
            <FormInput
              type="text"
              onChange={this.handleChange}
              ref="DACName"
              defaultValue={this.state.change.DACName}
              id="DACName"
            />
          </td>

          <td className="td2">{this.props.detail.Quantity}</td>
          <td className="td2">
            <Popover
              isOpen={isPopoverOpen}
              position={['top', 'right', 'left', 'bottom']}
              padding={10}
              onClickOutside={() => this.setState({ isPopoverOpen: false })}
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
                      <div
                        onClick={() =>
                          this.setState({ isPopoverOpen: !isPopoverOpen })
                        }
                      >
                        message {position}.
                      </div>
                    </CardBody>
                  </Card>
                </ArrowContainer>
              )}
            >
              <div
                onMouseEnter={() => this.setState({ isPopoverOpen: true })}
                onMouseLeave={() => this.setState({ isPopoverOpen: false })}
              >
                {DACStateListe}
              </div>
            </Popover>
          </td>

          <td className="td2">
            {' '}
            <ButtonGroup size="sm">
              <Button outline pill theme="primary" onClick={this.onEdit}>
                <i className="material-icons bg">check</i>
              </Button>
              <Button outline pill theme="danger" onClick={this.anuuler}>
                <i className="material-icons bg">close</i>
              </Button>
            </ButtonGroup>
          </td>
        </center>
      </tr>
    );
  };

  render() {
    const { edit } = this.state;

    return (
      <Fragment>{edit ? this.renderUpdate() : this.renderActions()}</Fragment>
    );
  }
}

export default DACRow2;
