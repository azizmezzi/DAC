/* eslint-disable guard-for-in */
/* eslint-disable no-useless-concat */
/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable react/no-string-refs */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/no-array-index-key */
/* eslint-disable class-methods-use-this */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-redeclare */
/* eslint-disable eqeqeq */
/* eslint-disable block-scoped-var */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
import React, { Component, Fragment } from 'react';
import {
  FormCheckbox,
  FormInput,
  Row,
  ButtonGroup,
  Button,
  Col,
  Form
} from 'shards-react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash,
  faCheck,
  faPencilAlt,
  faEye,
  faRedo
} from '@fortawesome/free-solid-svg-icons';
import SlidingPane from 'react-sliding-pane';
import Modal from 'react-modal';
import MaterialTable from 'material-table';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {
  NotificationContainer,
  NotificationManager
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import 'rodal/lib/rodal.css';
import FormGroupDiet from './DietGroup/FormGroupDiet';
import '../../../style/scrollerdesign.css';
import '../../../style/scrollerdesign2.css';
import RowGroupDiet from './DietGroup/RowGroupDiet';
import { Config } from '../../../configue';
import '../hover.css';

class RowGroup2 extends Component {
  state = {
    compteur:0,
    idUser: 0,
    Role: 2,
    edit: false,
    group: [{ idGroupe: 0, GroupeName: '', note: '' }],
    backgroundImage: require('../../../images/groupe.jpg'),
    authorAvatar: require('../../../images/avatars/2.jpg'),
    change: { GroupeName: this.props.detail.GroupeName },
    GroupDiet: [],
    vachesState: [],
    visiblelisteVaches: false,

    GroupDietDeleted: [],
    GroupDietAdd: [],
    GroupCow: [],
    CowDiet: [],
    isPopoverOpen: false,
    oldDietAffectation: [],
    InvalidGroupeName: false,
    validGroupeName: false,
    visible: false
  };

  constructor(props) {
    super(props);
    this.NodeletedNotification = this.NodeletedNotification.bind(this);
    this.deletedNotification = this.deletedNotification.bind(this);
    this.notificationDOMRef = React.createRef();
  }

  componentDidMount = () => {
    Modal.setAppElement('body');
    const idUser = localStorage.getItem('idUser');
    const Role = localStorage.getItem('Role');
    this.setState({
      // eslint-disable-next-line radix
      Role: parseInt(Role),
      // eslint-disable-next-line radix
      idUser: parseInt(idUser)
    });
  };

  getDietCow = idCow => {
    // const url = Config.url + '/DietCow?idCow='
    const datas = fetch(`${Config.url}/DietCow?idCow=${idCow}`)
      .then(reponse => {
        return reponse.json();
        // })
        // .then(({data}) => {
      })
      .catch(err => console.error(err));

    return datas;
  };

  getDietGroup = idGroup => {
    const url = `${Config.url}/DietGroup?idGroup=`;
    const datas = fetch(url + idGroup)
      .then(reponse => {
        return reponse.json();
        // })
        // .then(({data}) => {
      })
      .catch(err => console.error(err));

    return datas;
  };

  compareDiets = (CowDiet, GroupDiet) => {
    const temp = [];
    const array1 = [];
    const array2 = [];

    for (let i = 0; i < GroupDiet.length; i++) {
      const str = `${GroupDiet[i].idDiet +
        GroupDiet[i].begin +
        GroupDiet[i].end}`;
      array1.push(str);
    }

    for (let i = 0; i < CowDiet.length; i++) {
      const str2 = `${CowDiet[i].idDiet + CowDiet[i].begin + CowDiet[i].end}`;
      array2.push(str2);
    }

    for (var i in array1) {
      if (array2.indexOf(array1[i]) === -1) temp.push(array1[i]);
    }
    for (i in array2) {
      if (array1.indexOf(array2[i]) === -1) temp.push(array2[i]);
    }

    if (temp.length == 0) {
      var result = true;
    } else {
      var result = false;
    }

    return result;
  };

  /** *********show liste de vache a affecter ************** */
  showlisteVaches = () => {
    const { visiblelisteVaches } = this.state;
    this.setState({
      visiblelisteVaches: !visiblelisteVaches
    });
  };

  /** *********show liste Cow & Diet ************** */

  /** ******************** show group & diet  ********************* */
  show = () => {
    const { GroupDietFilter } = this.props;
    const { DietCowS } = this.props;
    const { CowGroupFilter } = this.props;

    const GroupDiet = GroupDietFilter.filter(GroupDiet => {
      if (GroupDiet.idGroup == this.props.detail.idGroupe) return GroupDiet;
    });
    this.setState({
      GroupDiet
    });

    const GroupCows = CowGroupFilter.filter(CowGroupe => {
      if (CowGroupe.idGroupe == this.props.detail.idGroupe) return CowGroupe;
    });

    const { vachesState } = this.state;
    const { oldDietAffectation } = this.state;
    const vach = this.props.vaches;
    for (let i = 0; i < vach.length; i++) {
      const GroupCows1 = GroupCows.filter(CowGroupe => {
        if (CowGroupe.idVache == vach[i].id) return CowGroupe;
      });
      if (GroupCows1 != 0) {
        const CowDiet = DietCowS.filter(DietCow => {
          if (DietCow.idCow == vach[i].id) return DietCow;
        });
        const DietAffectation = this.compareDiets(CowDiet, GroupDiet);
        if (DietAffectation) {
          oldDietAffectation.push(vach[i].id);
        }
        var v = {
          id: vach[i].id,
          name: vach[i].name,
          type: vach[i].type,
          DateCow: vach[i].DateCow,
          existance: true,
          DietAffectation
        };
      } else {
        var v = {
          id: vach[i].id,
          name: vach[i].name,
          type: vach[i].type,
          DateCow: vach[i].DateCow,
          existance: false,
          DietAffectation: false
        };
      }
      vachesState.push(v);
    }
    console.log(oldDietAffectation);
    this.setState({
      visible: true,
      vachesState,
      oldDietAffectation,
      GroupCow: GroupCows,
      compteur:0
    });
    /** ********************************************* */
  };

  deleteGroupe = () => {
    confirmAlert({
      title: 'supprimer ',
      message: 'Vous etes sur de supprimer ce groupe ?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            this.deletedNotification(this.props.detail.GroupeName);
            this.props.deleteGroupe(this.props.index);
          }
        },
        {
          label: 'No',
          onClick: () => {
            this.NodeletedNotification();
          }
        }
      ]
    });
  };

  renderActions = () => {
    const { GroupDiet } = this.state;
    const vaches = this.state.vachesState;

    const listeVaches2 = vaches.map((valeur, index) => {
      const begin = valeur.DateCow.substr(0, 10);
      const begin2 = begin.substr(0, 10);
      const v = {
        idVache: valeur.id,
        name: valeur.name,
        naissance: begin2,
        etat: valeur.type,
        affectation: (
          <FormCheckbox
            toggle
            key={index}
            small
            checked={valeur.existance}
            onChange={e => this.handleChangechekbox(e, index)}
          />
        ),
        Programme: valeur.existance ? (
          <FormCheckbox
            key={index}
            small
            checked={valeur.DietAffectation}
            onChange={e => this.handleChangechekbox2(e, index)}
          />
        ) : (
          <Fragment />
        )
      };
      return v;
    });
    const columnsVache = [
      {
        title: 'Nom Vache',
        field: 'name'
      },

      {
        title: 'naissance',
        field: 'naissance'
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
        field: 'Programme'
      }
    ];

    const GroupietListe = GroupDiet.map((valeur, index) => {
      const { Diet } = this.props;
      const lengthF = Diet.length;

      for (let i = 0; i < lengthF; i++) {
        if (Diet[i].idDiet == valeur.idDiet) {
          var DietName = Diet[i].DietName;
        }
      }
      return (
        <RowGroupDiet
          Diet={Diet}
          DietName={DietName}
          detail={valeur}
          key={index}
          index={index}
          deleteGroupDiet={this.deleteGroupDiet}
          editGroupDiet={this.editGroupDiet}
        />
      );
    });

    const bodyHead = (
      <Row>
        <Col>
          <MaterialTable
            columns={columnsVache}
            data={listeVaches2}
            title="Vache"
          />
        </Col>
      </Row>
    );

    return (
      <Fragment>
        <ButtonGroup>
          <Button
            outline
            pill
            theme="success"
            className="button"
            onClick={this.show}
          >
            <FontAwesomeIcon
              size="lg"
              icon={this.state.Role === 2 ? faEye : faPencilAlt}
            />
          </Button>
          {this.state.Role === 0 ? (
            <Button
              outline
              pill
              theme="danger"
              onClick={() => {
                this.deleteGroupe();
              }}
            >
              <FontAwesomeIcon size="lg" icon={faTrash} />
            </Button>
          ) : (
            <Fragment />
          )}
        </ButtonGroup>
        <NotificationContainer />

        <SlidingPane
          className="some-custom-class"
          overlayClassName="some-custom-overlay-class"
          isOpen={this.state.visible}
          title="Fermer"
          subtitle="Fermer ajout de vache."
          width="50%"
          onRequestClose={() => {
            // triggered on "<" on left top click or on outside click

            this.setState({
              GroupDiet: [],
              vachesState: [],
              visiblelisteVaches: false,
              visibleAffectDiet: false,
              Diets: [],
              GroupDietDeleted: [],
              GroupDietAdd: [],
              GroupCow: [],
              oldDietAffectation: [],

              visible: false
            });
            this.props.changeFilter(false);
          }}
        >
          <Form>
            <h6 className="card-title">
              <Row>
                <Col>
                  <Row>
                    <Col md="6" className="form-group">
                      <label htmlFor="Code">Nom de Groupe</label>
                    </Col>
                    <Col>
                      {' '}
                      <FormInput
                        valid={this.state.InvalidGroupeName}
                        invalid={this.state.validGroupeName}
                        disabled={this.state.Role === 2}
                        type="text"
                        onChange={this.handleChange}
                        ref="GroupeName"
                        value={this.state.change.GroupeName}
                        id="GroupeName"
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </h6>
            <h3 />

            <Col className="form-group">
              <table className="tables2 table mb-0">
                <thead className="thead-dark thead2">
                  <tr>
                    <th scope="col" className="border-0 th2">
                      Regime
                    </th>
                    <th scope="col" className="border-0 th2">
                      Debut
                    </th>
                    <th scope="col" className="border-0 th2">
                      Fin
                    </th>
                    <th scope="col" className="border-0 th2" />
                  </tr>
                </thead>
                <tbody className="tbody3">{GroupietListe}</tbody>
                {this.state.Role === 2 ? (
                  <Fragment />
                ) : (
                  <FormGroupDiet
                    Diet={this.props.Diet}
                    addGroupDiet={this.addGroupDiet}
                  />
                )}
              </table>
              {this.state.Role === 2 ? <Fragment /> : bodyHead}
              <Row>
                <br />
                <Col />
                {this.state.Role === 2 ? (
                  <Fragment />
                ) : (
                  <Col>
                    <center>
                      <Button
                        onClick={() => {
                          const GroupDietFilter = this.props.GroupDietFilter;
                          const DietCowS = this.props.DietCowS;
                          const CowGroupFilter = this.props.CowGroupFilter;

                          const GroupDiet = GroupDietFilter.filter(
                            GroupDiet => {
                              if (
                                GroupDiet.idGroup == this.props.detail.idGroupe
                              )
                                return GroupDiet;
                            }
                          );
                          this.setState({
                            GroupDiet
                          });

                          const GroupCows = CowGroupFilter.filter(CowGroupe => {
                            if (
                              CowGroupe.idGroupe == this.props.detail.idGroupe
                            )
                              return CowGroupe;
                          });

                          const vachesState = [];
                          const oldDietAffectation = [];
                          const vach = this.props.vaches;
                          for (let i = 0; i < vach.length; i++) {
                            const GroupCows1 = GroupCows.filter(CowGroupe => {
                              if (CowGroupe.idVache == vach[i].id)
                                return CowGroupe;
                            });
                            if (GroupCows1 != 0) {
                              const CowDiet = DietCowS.filter(DietCow => {
                                if (DietCow.idCow == vach[i].id) return DietCow;
                              });
                              const DietAffectation = this.compareDiets(
                                CowDiet,
                                GroupDiet
                              );
                              if (DietAffectation) {
                                oldDietAffectation.push(vach[i].id);
                              }
                              var v = {
                                id: vach[i].id,
                                name: vach[i].name,
                                type: vach[i].type,
                                DateCow: vach[i].DateCow,
                                existance: true,
                                DietAffectation
                              };
                            } else {
                              var v = {
                                id: vach[i].id,
                                name: vach[i].name,
                                type: vach[i].type,
                                DateCow: vach[i].DateCow,
                                existance: false,
                                DietAffectation: false
                              };
                            }
                            vachesState.push(v);
                          }
                          console.log(oldDietAffectation);
                          this.setState({
                            vachesState,
                            oldDietAffectation,
                            GroupCow: GroupCows,
                            change: { GroupeName: this.props.detail.GroupeName }
                          });
                          this.getDietGroup(this.props.detail.idGroupe).then(
                            GroupDiet => {
                              this.setState({
                                GroupDiet: GroupDiet.data
                              });
                            }
                          );
                        }}
                        outline
                        pill
                        theme="danger"
                      >
                        <FontAwesomeIcon size="lg" icon={faRedo} />
                      </Button>
                      &nbsp; &nbsp;&nbsp; &nbsp;
                      <Button
                        type="submit"
                        outline
                        pill
                        theme="primary"
                        onClick={this.submitGroupDiet}
                      >
                        <FontAwesomeIcon size="lg" icon={faCheck} />
                      </Button>
                    </center>
                  </Col>
                )}{' '}
              </Row>{' '}
              <br />
            </Col>
          </Form>
        </SlidingPane>
      </Fragment>
    );
  };
  /** ***************************Traitement Group & Diet********************* */

  submitGroupDiet = e => {
    e.preventDefault();
    const {
      compteur,
      GroupDiet,
      GroupCow,
      vachesState,
      change,
      oldDietAffectation
    } = this.state;
    const idGroup = this.props.detail.idGroupe;
    const idGroupe_vachesOld = [];
    const idGroupe_vachesNew = [];
    const DietCowEdited = [];
    const GroupCowNew = [];

    if (this.state.change.GroupeName == '') {
      this.setState({
        validGroupeName: true,
        InvalidGroupeName: false
      });
    } else
      this.setState({
        validGroupeName: false,
        InvalidGroupeName: true
      });

    let unicite = false;
    if (this.state.change.GroupeName != '') {
      const { group } = this.props;
      console.log('group');
      console.log(group);
      const groupe = group.filter(groupe => {
        if (groupe.GroupeName == this.state.change.GroupeName) return groupe;
      });
      console.log('groupe');
      console.log(groupe);
      console.log('groupe length');
      console.log(groupe.length);
      console.log('groupe idGroup');
      console.log(idGroup);

      if (groupe.length > 0) {
        if (groupe.length === 1 && groupe[0].idGroupe === idGroup) {
          unicite = true;
        } else {
          NotificationManager.error('Nom existant', '', 3000);
        }
      } else {
        unicite = true;
      }
    }
    const compteur1 = compteur + 1

    this.setState({
      compteur:compteur1
    });
    console.log('compteur')
    console.log(compteur)
    if (compteur>0) {
      this.setState({
        visible: false,
        compteur:compteur1
      });
    }

    if (this.state.change.GroupeName != '' && unicite&&compteur===0) {
      this.setState({
        visible: false,
        compteur:compteur1
      });
     
      for (let p = 0; p < GroupCow.length; p++) {
        idGroupe_vachesOld.push(GroupCow[p].idGroupe_vaches);
      }
      for (let k = 0; k < vachesState.length; k++) {
        if (vachesState[k].existance) {
          idGroupe_vachesNew.push(vachesState[k].id);
          GroupCowNew.push({ idVache: vachesState[k].id, idGroupe: idGroup });
        }
        if (vachesState[k].DietAffectation)
          DietCowEdited.push(vachesState[k].id);
      }

      this.props.editGroup(
        this.props.index,
        change,
        GroupDiet,
        this.props.detail.idGroupe,
        GroupCowNew,
        DietCowEdited,
        idGroupe_vachesNew,
        oldDietAffectation
      );
      this.setState({
        visible: false,
        GroupDiet: [],
        vachesState: []
      });
    }
  };

  deleteGroupDiet = index => {
    const { GroupDietDeleted, GroupDiet } = this.state;
    const GroupDietD = GroupDiet[index];
    GroupDietDeleted.push(GroupDietD.idDiet_Group);
    GroupDiet.splice(index, 1);
    this.setState({
      GroupDiet
    });
    // this.deleteMethode(GroupDietDeleted.idProgram)
  };

  editGroupDiet = (index, change) => {
    const { GroupDiet } = this.state;
    const GroupDiets = GroupDiet[index];
    for (const i in change) {
      GroupDiets[i] = change[i];
    }

    this.setState({
      GroupDiet
    });
  };

  addGroupDiet = a => {
    const { GroupDiet, GroupDietAdd } = this.state;
    GroupDietAdd.push(a);
    GroupDiet.push(a);

    this.setState({
      GroupDiet,
      GroupDietAdd
    });
  };

  /** ********************Traitement Vache & Group********************** */

  handleChange = e => {
    const { edit, group, change } = this.state;
    change[e.target.id] = e.target.value;
    this.setState({
      edit,
      group,
      change
    });
  };
  /*
    MethodeEditGroupe = (
    idGroup,
    idGroupe_vachesNew,
    GroupDiet,
    DietCowEdited
  ) => {
    const post = JSON.stringify({
      idGroup: JSON.stringify(idGroup),
      idGroupe_vachesNew: JSON.stringify(idGroupe_vachesNew),
      GroupDiet: JSON.stringify(GroupDiet),
      DietCowEdited: JSON.stringify(DietCowEdited)
    });
    const formbody = [`${'post' + '='}${post}`];
    const datas = fetch(`${Config.url}/groupe/EditGroupe`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded' // <-- Specifying the Content-Type
      },
      body: formbody // <-- Post parameters
    })
      .then(reponse => {
        return reponse.json();
      })
      .catch(err => console.error(err));

    return datas;
  };
  
   getCowGroup = idGroup => {
    const url = `${Config.url}/GroupCow?idGroupe=`;
    const datas = fetch(url + idGroup)
      .then(reponse => {
        return reponse.json();
        // })
        // .then(({data}) => {
      })
      .catch(err => console.error(err));

    return datas;
  };


    handleChangeName = e => {
    const { change } = this.state;
    change[e.target.id] = e.target.value;
    this.setState({
      change
    });
  };

  editing = () => {
    const { edit, vache } = this.state;

    this.setState({
      edit: !edit,
      vache
    });
  };
  
  onEdit = e => {
    e.preventDefault();

    const change = this.state.change;

    this.props.editGroup(this.props.index, change);
    this.editing();
  };
/*
  updateGMethode(idGroupe, a) {
    const encodedKeyid = encodeURIComponent('idGroupe');
    const encodedKeyname = encodeURIComponent('GroupeName');

    const encodedvalid = encodeURIComponent(idGroupe);
    const encodedvalname = encodeURIComponent(a.GroupeName);
    let formbody = [
      `${encodedKeyid}=${encodedvalid}`,
      `${encodedKeyname}=${encodedvalname}`
    ];
    formbody = formbody.join('&');

    fetch(`${Config.url}/groupe/update`, {
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
        console.log(error);
      });
  }

  DietCowEdited(DietCowEdited, GroupDiet) {
    const post = JSON.stringify({
      DietCowEdited: JSON.stringify(DietCowEdited),
      GroupDiet: JSON.stringify(GroupDiet)
    });
    const formbody = [`${'post' + '='}${post}`];
    fetch(`${Config.url}/DietCow/Edit`, {
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
/*
  PostGroupeVacheEdit(idGroupe_vachesOld, idGroupe_vachesNew, idGroupe) {
    const encodedKeyidGroupe = encodeURIComponent('idGroupe');
    const encodedKeyidGroupe_vachesOld = encodeURIComponent(
      'idGroupe_vachesOld'
    );
    const encodedKeyidGroupe_vachesNew = encodeURIComponent(
      'idGroupe_vachesNew'
    );

    const encodedvalidGroupe = encodeURIComponent(idGroupe);
    const encodedvalidGroupe_vachesOld = encodeURIComponent(idGroupe_vachesOld);
    const encodedvalidGroupe_vachesNew = encodeURIComponent(idGroupe_vachesNew);

    let formbody = [
      `${encodedKeyidGroupe}=${encodedvalidGroupe}`,
      `${encodedKeyidGroupe_vachesOld}=${encodedvalidGroupe_vachesOld}`,
      `${encodedKeyidGroupe_vachesNew}=${encodedvalidGroupe_vachesNew}`
    ];
    formbody = formbody.join('&');

    fetch(`${Config.url}/GroupEdit`, {
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
  /*
  PostGroupeDieteEdit(GroupDietDeleted, GroupDiet, GroupDietAdd, idGroupe) {
    const post = JSON.stringify({
      GroupDietDeleted: JSON.stringify(GroupDietDeleted),
      GroupDiet: JSON.stringify(GroupDiet),
      GroupDietAdd: JSON.stringify(GroupDietAdd),
      idGroupe
    });
    const formbody = [`${'post' + '='}${post}`];
    fetch(`${Config.url}/DietGroup/Edit`, {
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
  */

  handleChangechekbox(e, index) {
    const { vachesState } = this.state;

    const v = vachesState[index];

    v.existance = !v.existance;
    if (v.existance == false) v.DietAffectation = false;

    this.setState({
      vachesState
    });
  }

  NodeletedNotification() {
    NotificationManager.warning('Groupe non supprimer', '', 3000);
  }

  deletedNotification(GroupeName) {
    NotificationManager.info(`Groupe supprimer ${GroupeName}`);
  }

  handleChangechekbox2(e, index) {
    const { vachesState } = this.state;

    const v = vachesState[index];
    v.DietAffectation = !v.DietAffectation;
    this.setState({
      vachesState
    });
  }

  render() {
    return <Fragment>{this.renderActions()}</Fragment>;
  }
}

export default RowGroup2;
