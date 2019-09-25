/* eslint-disable no-useless-concat */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/no-array-index-key */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-plusplus */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  Card,
  CardBody,
  FormCheckbox,
  FormTextarea,
  Button
} from 'shards-react';
import { FloatingMenu, MainButton } from 'react-floating-button-menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';
import Popover, { ArrowContainer } from 'react-tiny-popover';

import 'rodal/lib/rodal.css';
import FormProgram from './Program/FormProgram';
import RowProgram from './Program/rowProgram';
import { Config } from '../../../configue';
import '../hover.css';
import '../../../style/scrollerdesign.css';
import '../../../style/scrollerdesign2.css';

class EditForm extends Component {
  state = {
    visible: false,
    idGroup: 0,
    GroupeName: '',
    note: '',

    vachesState: [],
    GroupDiet: [],
    isPopoverOpen: false,
    isOpen: false,
    DAC: []
  };

  componentDidMount() {
    const lastGroup = this.props.lastGroup + 1;
    this.setState({ idGroup: lastGroup });

    const { vachesState } = this.state;
    const { vaches } = this.props;
    console.log(vaches);
    for (let i = 0; i < vaches.length; i++) {
      const v = {
        id: vaches[i].id,
        name: vaches[i].name,
        type: vaches[i].type,
        DateCow: vaches[i].DateCow,
        existance: false,
        DietAffectation: false
      };
      vachesState.push(v);
    }
    this.setState({
      vachesState
    });

    console.log('this.state');
    console.log(this.state);
  }

  handleChange = e => {
    const { lastGroup } = this.props;
    this.setState({
      [e.target.id]: e.target.value,
      idGroupe: lastGroup + 1
    });
  };

  add = a => {
    const { GroupDiet } = this.state;

    GroupDiet.push(a);
    this.setState({
      GroupDiet
    });
    console.log(this.state);
  };

  delete = index => {
    const { GroupDiet } = this.state;

    GroupDiet.splice(index, 1);
    this.setState({ GroupDiet });
    //  this.deleteMethode(FooderDeleted.idFooder)
  };

  Submiting = e => {
    e.preventDefault();

    this.postMethode(this.state).then(d => {
      const { vachesState } = this.state;
      const { GroupDiet } = this.state;
      for (let k = 0; k < GroupDiet.length; k++) {
        this.postMethodeGroupDiet(d.data, GroupDiet[k]);
      }
      this.postMethodeGroupeVache(vachesState, d.data);
      this.postMethodeVacheDiet(vachesState, GroupDiet);

      for (let i = 0; i < vachesState.length; i++) {
        vachesState[i].existance = false;
        vachesState[i].DietAffectation = false;
      }
      this.props.add(this.state, d.data);

      this.setState({
        GroupeName: '',
        note: '',
        vachesState,
        GroupDiet: []
      });
    });
  };

  show() {
    this.setState({ visible: true });
  }

  hide() {
    this.setState({ visible: false });
  }

  postMethode(a) {
    const encodedKeyname = encodeURIComponent('GroupeName');
    const encodedKeyregime = encodeURIComponent('note');

    const encodedvalname = encodeURIComponent(a.GroupeName);
    const encodedvalregime = encodeURIComponent(a.note);
    let formbody = [
      `${encodedKeyname}=${encodedvalname}`,
      `${encodedKeyregime}=${encodedvalregime}`
    ];
    formbody = formbody.join('&');

    const data = fetch(`${Config.url}/groupe`, {
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
  }

  postMethodeGroupDiet(idGroup, GroupDiet) {
    const encodedKeyidGroup = encodeURIComponent('idGroup');
    const encodedKeyidDiet = encodeURIComponent('idDiet');
    const encodedKeybegin = encodeURIComponent('begin');
    const encodedKeyend = encodeURIComponent('end');

    const encodedvalidGroup = encodeURIComponent(idGroup);
    const encodedvalidDiet = encodeURIComponent(GroupDiet.idDiet);
    const encodedvalDateDebut = encodeURIComponent(GroupDiet.DateDebut);
    const encodedvalDateFin = encodeURIComponent(GroupDiet.DateFin);

    let formbody = [
      `${encodedKeyidGroup}=${encodedvalidGroup}`,
      `${encodedKeyidDiet}=${encodedvalidDiet}`,
      `${encodedKeybegin}=${encodedvalDateDebut}`,
      `${encodedKeyend}=${encodedvalDateFin}`
    ];
    formbody = formbody.join('&');

    fetch(`${Config.url}/DietGroup`, {
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
  }

  postMethodeVacheDiet(vachesState, GroupDiet) {
    const post = JSON.stringify({
      vachesState: JSON.stringify(vachesState),
      GroupDiet: JSON.stringify(GroupDiet)
    });
    const formbody = [`${'post' + '='}${post}`];
    fetch(`${Config.url}/DietCow/Create`, {
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
  }

  postMethodeGroupeVache(vachesState, idGroupe) {
    const post = JSON.stringify({
      vachesState: JSON.stringify(vachesState),
      idGroupe: JSON.stringify(idGroupe)
    });
    const formbody = [`${'post' + '='}${post}`];
    fetch(`${Config.url}/GroupCow`, {
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
  }

  handleChangechekbox(e, index) {
    const { vachesState } = this.state;
    const v = vachesState[index];
    v.existance = !v.existance;
    v.DietAffectation = !v.DietAffectation;
    this.setState({ vachesState });
  }

  handleChangechekbox2(e, index) {
    const { vachesState } = this.state;
    const v = vachesState[index];
    v.DietAffectation = !v.DietAffectation;
    this.setState({ vachesState });
  }

  render() {
    const { isPopoverOpen } = this.state;

    const vaches = this.state.vachesState;
    const listeVaches = vaches.map((valeur, index) => {
      const DateCow = valeur.DateCow;
      const DateCow2 = DateCow.substr(0, 10);
      return (
        <tr>
          <td className="td2">{valeur.name}</td>
          <td className="td2">{DateCow2}</td>
          <td className="td2">{valeur.type}</td>
          <td className="td2">
            <FormCheckbox
              toggle
              small
              checked={valeur.existance}
              onChange={e => this.handleChangechekbox(e, index)}
            />
          </td>
          <td className="td2">
            <FormCheckbox
              indeterminate
              small
              checked={valeur.DietAffectation}
              onChange={e => this.handleChangechekbox2(e, index)}
            />
          </td>
        </tr>
      );
    });

    const GroupDiet = this.state.GroupDiet;
    const GroupDietListe = GroupDiet.map((valeur, index) => {
      return (
        <RowProgram
          detail={valeur}
          key={index}
          index={index}
          edit={this.edit}
          delete={this.delete}
        />
      );
    });

    return (
      <ListGroup flush>
        <ListGroupItem className="p-3">
          <Row>
            <Col>
              <Form onSubmit={this.Submiting}>
                <Row form>
                  <Col md="6" className="form-group">
                    <label htmlFor="Code">Nom de Groupe</label>
                    <FormInput
                      id="GroupeName"
                      name="GroupeName"
                      type="text"
                      placeholder="nom du Groupe"
                      onChange={this.handleChange}
                      value={this.state.GroupeName}
                    />
                  </Col>
                  <Col md="4">
                    <center>
                      <FloatingMenu
                        slideSpeed={500}
                        direction="left"
                        spacing={8}
                        isOpen={this.state.isOpen}
                      >
                        <MainButton
                          iconResting={
                            <div>
                              <FontAwesomeIcon size="lg" icon={faPlus} />
                              <br />
                              <label htmlFor="note">Note</label>
                            </div>
                          }
                          iconActive={
                            <FontAwesomeIcon size="lg" icon={faTimes} />
                          }
                          onClick={() =>
                            this.setState({ isOpen: !this.state.isOpen })
                          }
                          size={62}
                        />

                        <Popover
                          isOpen={isPopoverOpen}
                          position={['bottom', 'right', 'left', 'top']}
                          padding={30}
                          onClickOutside={() =>
                            this.setState({ isPopoverOpen: false })
                          }
                          content={({ position, targetRect, popoverRect }) => (
                            <ArrowContainer
                              position={position}
                              targetRect={targetRect}
                              popoverRect={popoverRect}
                              arrowColor="#d3d3d3"
                              arrowSize={14}
                              arrowStyle={{ opacity: 0.7 }}
                            >
                              <Card>
                                <CardBody className="p-3 pb-3">
                                  <div
                                    style={{ opacity: 0.7 }}
                                    onClick={() =>
                                      this.setState({
                                        isPopoverOpen: !isPopoverOpen
                                      })
                                    }
                                  />
                                  <br />
                                  <FormTextarea
                                    className="note"
                                    size="lg"
                                    cols="3 0"
                                    rows="5"
                                    id="note"
                                    type="text"
                                    placeholder="note du Groupe"
                                    onChange={this.handleChange}
                                    value={this.state.note}
                                  />
                                </CardBody>
                              </Card>
                            </ArrowContainer>
                          )}
                        >
                          <div
                            onClick={() =>
                              this.setState({ isPopoverOpen: !isPopoverOpen })
                            }
                          />
                        </Popover>
                      </FloatingMenu>
                    </center>
                  </Col>
                </Row>
                <Col className="form-group">
                  <table className="table mb-0">
                    <thead className="thead-dark">
                      <tr>
                        <th scope="col" className="border-0">
                          Regime
                        </th>
                        <th scope="col" className="border-0">
                          Debut
                        </th>
                        <th scope="col" className="border-0">
                          Fin
                        </th>
                        <th scope="col" className="border-0" />
                      </tr>
                    </thead>
                    <tbody>
                      {GroupDietListe}
                      <FormProgram Diet={this.props.Diet} add={this.add} />{' '}
                    </tbody>
                  </table>
                </Col>
                <Row>
                  <Col md="6" className="form-group">
                    <center>
                      <Button
                        outline
                        pill
                        theme="danger"
                        size="lg"
                        onClick={() => {
                          this.setState({
                            visible: false,
                            idGroup: 0,
                            GroupeName: '',
                            note: '',

                            vachesState: [],
                            GroupDiet: []
                          });
                        }}
                      >
                        Reset
                      </Button>
                    </center>
                  </Col>
                  <Col md="6" className="form-group">
                    <center>
                      <Button outline pill theme="primary" size="lg">
                        Ajouter Groupe
                      </Button>
                    </center>
                  </Col>
                </Row>

                <table className="table tables2 mb-0">
                  <thead className="bg-light thead2">
                    <tr>
                      <center>
                        <th scope="col" className="border-0 th2">
                          Nom{' '}
                        </th>
                        <th scope="col" className="border-0 th2 ">
                          naissance{' '}
                        </th>

                        <th scope="col" className="border-0 th2">
                          etat{' '}
                        </th>
                        <th scope="col" className="border-0 td2">
                          affectation{' '}
                        </th>
                        <th scope="col" className="border-0 td2">
                          regime{' '}
                        </th>
                      </center>{' '}
                    </tr>
                  </thead>
                  <tbody className="tbody2">{listeVaches}</tbody>
                </table>
              </Form>
            </Col>
          </Row>
        </ListGroupItem>
        <ListGroupItem>
          <Row />
        </ListGroupItem>
      </ListGroup>
    );
  }
}

export default EditForm;
