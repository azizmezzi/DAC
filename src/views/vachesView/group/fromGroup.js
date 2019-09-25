/* eslint-disable vars-on-top */
/* eslint-disable guard-for-in */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/no-array-index-key */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/sort-comp */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-shadow */
/* eslint-disable eqeqeq */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-useless-concat */
/* eslint-disable no-undef */
/* eslint-disable no-plusplus */
/* eslint-disable import/imports-first */
import React, { Component, Fragment } from 'react';
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
import MaterialTable from 'material-table';
import { FloatingMenu, MainButton } from 'react-floating-button-menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faTimes,
  faCheck,
  faRedo
} from '@fortawesome/free-solid-svg-icons';
import Popover, { ArrowContainer } from 'react-tiny-popover';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import {
  NotificationContainer,
  NotificationManager
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import 'rodal/lib/rodal.css';
import { Config } from '../../../configue';
import '../hover.css';
import '../../../style/scrollerdesign.css';
import '../../../style/scrollerdesign2.css';
import FormProgram from './Program/FormProgram';
import RowProgram from './Program/rowProgram';

class FormGroupv extends Component {
  state = {
    visible: false,
    idGroup: 0,
    GroupeName: '',
    note: '',
    data: [],
    vachesState: [],
    GroupDiet: [],
    isPopoverOpen: false,
    isOpen: false,
    DAC: [],
    InvalidGroupeName: false,
    validGroupeName: false,
    listeVaches2: []
  };

  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    const lastGroup = this.props.lastGroup + 1;
    this.setState({ idGroup: lastGroup });

    const { vachesState } = this.state;
    const { vaches } = this.props;
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
  };

  delete = index => {
    const { GroupDiet } = this.state;

    GroupDiet.splice(index, 1);
    this.setState({ GroupDiet });
    //  this.deleteMethode(FooderDeleted.idFooder)
  };

  edit = (index, change) => {
    const { GroupDiet } = this.state;
    const GroupDiets = GroupDiet[index];

    // eslint-disable-next-line no-restricted-syntax
    for (const i in change) {
      GroupDiets[i] = change[i];
    }

    this.setState({
      GroupDiet
    });
  };

  postMethode = a => {
    const encodedKeyname = encodeURIComponent('GroupeName');
    const encodedKeyregime = encodeURIComponent('note');

    const encodedvalname = encodeURIComponent(a.GroupeName);
    const encodedvalregime = encodeURIComponent(a.note);
    let formbody = [
      `${encodedKeyname}=${encodedvalname}`,
      `${encodedKeyregime}=${encodedvalregime}`
    ];
    formbody = formbody.join('&');

    // eslint-disable-next-line no-undef
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
  };

  /*
  postMethodeGroupeVache(vachesState, idGroupe) {
    var encodedKeyidGroupe = encodeURIComponent("idGroupe")
    var encodedKeyidVache = encodeURIComponent("idVache")


    var encodedvalidGroupe = encodeURIComponent(idGroupe);
    var encodedvalidVache = encodeURIComponent(vachesState.id);

    var formbody = [
      encodedKeyidGroupe + '=' + encodedvalidGroupe,
      encodedKeyidVache + '=' + encodedvalidVache
    ];
    formbody = formbody.join("&");

    fetch(Config.url + "/GroupCow", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
      },
      body: formbody // <-- Post parameters
    })
      .then((responseText) => {
        return (responseText.json());
      })
      .catch((error) => {
        console.error(error);
      });
  } */
  /* postMethodeVacheDiet(idCow, GroupDiet) {
    var encodedKeyidCow = encodeURIComponent("idCow")
    var encodedKeyidDiet = encodeURIComponent("idDiet")
    var encodedKeybegin = encodeURIComponent("begin")
    var encodedKeyend = encodeURIComponent("end")


    var encodedvalidCow = encodeURIComponent(idCow);
    var encodedvalidDiet = encodeURIComponent(GroupDiet.idDiet);
    var encodedvalDateDebut = encodeURIComponent(GroupDiet.DateDebut);
    var encodedvalDateFin = encodeURIComponent(GroupDiet.DateFin);


    var formbody = [
      encodedKeyidCow + '=' + encodedvalidCow,
      encodedKeyidDiet + '=' + encodedvalidDiet,
      encodedKeybegin + '=' + encodedvalDateDebut,
      encodedKeyend + '=' + encodedvalDateFin,

    ];
    formbody = formbody.join("&");

    fetch(Config.url + "/DietCow", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
      },
      body: formbody // <-- Post parameters
    })
      .then((responseText) => {
        return (responseText.json());
      })
      .catch((error) => {
        console.error(error);
      });
  } */
  postMethodeGroupDiet = (idGroup, GroupDiet) => {
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
  };

  postMethodeVacheDiet = (vachesState, GroupDiet) => {
    const post = JSON.stringify({
      vachesState: JSON.stringify(vachesState),
      GroupDiet: JSON.stringify(GroupDiet)
    });
    // eslint-disable-next-line no-useless-concat
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
        console.log(responseText);
      })
      .catch(error => {
        console.error(error);
      });
  };

  postMethodeGroupeVache = (vachesState, idGroupe) => {
    const post = JSON.stringify({
      vachesState: JSON.stringify(vachesState),
      idGroupe: JSON.stringify(idGroupe)
    });
    // eslint-disable-next-line no-useless-concat
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
  };

  postGroupe = (idGroupe, GroupDiet, vachesState) => {
    const post = JSON.stringify({
      vachesState: JSON.stringify(vachesState),
      GroupDiet: JSON.stringify(GroupDiet),
      idGroupe: JSON.stringify(idGroupe)
    });
    const formbody = [`${'post' + '='}${post}`];
    fetch(`${Config.url}/groupe/Create`, {
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
  };

  Submiting = e => {
    e.preventDefault();

    console.log('*********aaaaaaaaaaaa*******');
    if (this.state.GroupeName == '') {
      this.setState({
        validGroupeName: true,
        InvalidGroupeName: false
      });
    } else
      this.setState({
        validGroupeName: false,
        InvalidGroupeName: true
      });
    if (this.state.GroupDiet.length == 0) {
      NotificationManager.warning('Groupe sans Regime', '', 3000);
    }
    let unicite = false;
    if (this.state.GroupeName != '') {
      const { group } = this.props;
      console.log('group');
      console.log(group);
      const groupe = group.filter(groupe => {
        if (groupe.GroupeName == this.state.GroupeName) return groupe;
      });
      console.log('groupe');
      console.log(groupe);
      if (groupe.length == 0) {
        unicite = true;
      } else {
        NotificationManager.error('Nom existant', '', 3000);
      }
    }
    if (this.state.GroupeName != '' && unicite) {
      this.postMethode(this.state).then(d => {
        const { vachesState } = this.state;
        const { GroupDiet } = this.state;
        this.props.add(this.state, d.data, GroupDiet, vachesState);
        // this.postGroupe(d.data ,GroupDiet , vachesState)
        for (let k = 0; k < GroupDiet.length; k++) {
          this.postMethodeGroupDiet(d.data, GroupDiet[k]);
        }
        this.postMethodeGroupeVache(vachesState, d.data);
        this.postMethodeVacheDiet(vachesState, GroupDiet);

        this.setState({
          GroupeName: '',
          note: '',

          GroupDiet: []
        });
      });
    }
  };

  handleChangechekbox(e, index) {
    const { vachesState } = this.state;
    const v = vachesState[index];
    v.existance = !v.existance;
    if (v.existance == false) v.DietAffectation = false;
    this.setState({ vachesState });
  }

  handleChangechekbox2(e, index) {
    const { vachesState } = this.state;
    const v = vachesState[index];
    v.DietAffectation = !v.DietAffectation;
    this.setState({ vachesState });
  }

  sortRows = (initialRows, sortColumn, sortDirection) => rows => {
    const comparer = (a, b) => {
      if (sortDirection === 'ASC') {
        return a[sortColumn] > b[sortColumn] ? 1 : -1;
      }
      if (sortDirection === 'DESC') {
        return a[sortColumn] < b[sortColumn] ? 1 : -1;
      }
    };
    return sortDirection === 'NONE' ? initialRows : [...rows].sort(comparer);
  };

  render() {
    const { isPopoverOpen } = this.state;

    const vaches = this.state.vachesState;

    const listeVaches2 = [];
    for (let i = 0; i < vaches.length; i++) {
      const DateCow = vaches[i].DateCow;
      const DateCow2 = DateCow.substr(0, 10);
      const v = {
        id: i,
        name: vaches[i].name,
        DateCow: DateCow2,
        etat: vaches[i].type,
        affectation: (
          <FormCheckbox
            toggle
            small
            checked={vaches[i].existance}
            onChange={e => this.handleChangechekbox(e, i)}
          />
        ),
        Program: vaches[i].existance ? (
          <FormCheckbox
            indeterminate="true"
            small
            disabled={!vaches[i].existance}
            checked={vaches[i].DietAffectation}
            onChange={e => this.handleChangechekbox2(e, i)}
          />
        ) : (
          <Fragment />
        )
      };
      listeVaches2.push(v);
    }

    const GroupDiet = this.state.GroupDiet;
    const GroupDietListe = GroupDiet.map((valeur, index) => {
      const { Diet } = this.props;
      const lengthF = Diet.length;

      for (let i = 0; i < lengthF; i++) {
        if (Diet[i].idDiet == valeur.idDiet) {
          // eslint-disable-next-line vars-on-top
          // eslint-disable-next-line no-var
          var DietName = Diet[i].DietName;
        }
      }
      return (
        <RowProgram
          Diet={Diet}
          detail={valeur}
          key={index}
          // eslint-disable-next-line block-scoped-var
          DietName={DietName}
          index={index}
          edit={this.edit}
          delete={this.delete}
        />
      );
    });
    // const data = [{ id: 1, title: 'Conan the Barbarian', year: '1982' }];
    const columns = [
      {
        title: 'name',
        field: 'name'
      },

      {
        title: 'etat',
        field: 'etat'
      },
      {
        title: 'affectation',
        field: 'affectation'
      },
      {
        title: 'Programme',
        field: 'Program'
      }
    ];

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
                      valid={this.state.InvalidGroupeName}
                      invalid={this.state.validGroupeName}
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
                                    cols="90"
                                    rows="20"
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
                      <FormProgram Diet={this.props.Diet} add={this.add} />
                    </tbody>
                  </table>
                </Col>
                <Row>
                  <Col>
                    <MaterialTable
                      columns={columns}
                      data={listeVaches2}
                      title="Vaches"
                    />
                  </Col>
                </Row>{' '}
                <Row>
                  <Col />
                  <Col>
                    <center>
                      <Button
                        outline
                        pill
                        theme="danger"
                        onClick={() => {
                          const vachesState = this.state.vachesState;
                          for (let i = 0; i < vaches.length; i++) {
                            vachesState[i].existance = false;
                            vachesState[i].DietAffectation = false;
                          }

                          this.setState({
                            visible: false,
                            idGroup: 0,
                            GroupeName: '',
                            note: '',

                            vachesState,
                            GroupDiet: []
                          });
                        }}
                      >
                        <FontAwesomeIcon size="lg" icon={faRedo} />
                      </Button>
                      &nbsp; &nbsp;&nbsp; &nbsp;
                      <Button outline pill theme="primary">
                        <FontAwesomeIcon size="lg" icon={faCheck} />
                      </Button>
                    </center>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </ListGroupItem>
        <ListGroupItem>
          <NotificationContainer />
        </ListGroupItem>
      </ListGroup>
    );
  }
}

export default FormGroupv;
