/* eslint-disable no-nested-ternary */
/* eslint-disable radix */
/* eslint-disable react/no-unused-state */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-redeclare */
/* eslint-disable block-scoped-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
/* eslint-disable react/destructuring-assignment */
import React, { Component, Fragment } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import Modal from 'react-modal';
import {
  FormTextarea,
  FormInput,
  Row,
  ButtonGroup,
  Button,
  Col,
  Card,
  Form,
  FormCheckbox,
  CardBody,
  FormSelect
} from 'shards-react';
import SlidingPane from 'react-sliding-pane';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MaterialTable from 'material-table';
import 'rodal/lib/rodal.css';

import {
  faPlus,
  faTimes,
  faCheck,
  faRedo,
  faTrash,
  faEye,
  faPencilAlt
} from '@fortawesome/free-solid-svg-icons';
import Popover, { ArrowContainer } from 'react-tiny-popover';
import { FloatingMenu, MainButton } from 'react-floating-button-menu';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {
  NotificationContainer,
  NotificationManager
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import RowCowDiet from './CowDiet/RowCowDiet';
import FormCowDiet from './CowDiet/FormCowDiet';
import { Config } from '../../../configue';
import '../hover.css';
import '../../../style/scrollerdesign.css';
import '../../../style/scrollerdesign2.css';

class RowVache2 extends Component {
  state = {
    compteur:0,
    idUser: 0,
    Role: 2,
    viewDietCow: false,
    // eslint-disable-next-line react/no-unused-state
    visible: false,
    visibleEditCow: false,
    groupData: [],

    edit: false,
    vache: [],
    change: {},

    CowDiet: [],
    // eslint-disable-next-line react/no-unused-state
    Diets: [],
    CowDietDeleted: [],
    CowDietAdd: [],
    // eslint-disable-next-line react/no-unused-state
    GroupDiet: [],
    groupeId: [],
    // eslint-disable-next-line react/no-unused-state
    groupeIdCompare: [],
    invalidname: false,
    validname: false,
    invalidReference: false,
    validReference: false
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
      Role: parseInt(Role),
      idUser: parseInt(idUser)
    });
  };

  getDietCow = idCow => {
    const url = `${Config.url}/DietCow?idCow=`;
    // eslint-disable-next-line no-undef
    const datas = fetch(url + idCow)
      .then(reponse => {
        return reponse.json();
      })
      // eslint-disable-next-line no-console
      .catch(err => console.error(err));

    return datas;
  };

  compareDiets = (CowDiet, GroupDiet) => {
    const temp = [];
    const array1 = [];
    const array2 = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < GroupDiet.length; i++) {
      const begin = new Date(GroupDiet[i].begin);
      const end = new Date(GroupDiet[i].end);
      const begin1 = `${begin.getDate()}${begin.getDay()}${begin.getFullYear()}`;
      const end1 = `${end.getDate()}${end.getDay()}${end.getFullYear()}`;
      const str = `${GroupDiet[i].idDiet + begin1 + end1}`;
      array1.push(str);
    }

    for (let i = 0; i < CowDiet.length; i++) {
      const begin2 = new Date(CowDiet[i].begin);
      const end2 = new Date(CowDiet[i].end);
      const begin3 = `${begin2.getDate()}${begin2.getDay()}${begin2.getFullYear()}`;
      const end3 = `${end2.getDate()}${end2.getDay()}${end2.getFullYear()}`;
      const str2 = `${CowDiet[i].idDiet + begin3 + end3}`;

      array2.push(str2);
    }

    // eslint-disable-next-line vars-on-top
    for (var i in array1) {
      if (array2.indexOf(array1[i]) === -1) temp.push(array1[i]);
    }
    // eslint-disable-next-line block-scoped-var
    for (i in array2) {
      // eslint-disable-next-line block-scoped-var
      if (array1.indexOf(array2[i]) === -1) temp.push(array2[i]);
    }

    if (temp.length === 0) {
      var result = true;
    } else var result = false;

    return result;
  };

  showEditCow = () => {
    this.setState({
      change: {
        id: this.props.detail.id,
        CINCOW: this.props.detail.CINCOW,
        name: this.props.detail.name,
        DateCow: this.props.detail.DateCow,
        weight: this.props.detail.weight,
        note: this.props.detail.note,
        Father: this.props.detail.Father,
        Mother: this.props.detail.Mother,
        type: this.props.detail.type
      },
      old: { ...this.props },
      compteur:0
    });

    const { CowGroupFilter, DietCowS, GroupDietFilter } = this.props;

    const { groupeId, groupData } = this.state;

    // eslint-disable-next-line array-callback-return
    // eslint-disable-next-line consistent-return
    // eslint-disable-next-line array-callback-return
    const GroupCows = CowGroupFilter.filter(CowGroupe => {
      if (CowGroupe.idVache === this.props.detail.id) return CowGroupe;
    });

    for (let i = 0; i < GroupCows.length; i++) {
      groupeId.push(GroupCows[i].idGroupe);
    }
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      GroupCow: GroupCows,
      groupeId
    });

    // eslint-disable-next-line array-callback-return
    const CowDiet = DietCowS.filter(DietCow => {
      if (DietCow.idCow === this.props.detail.id) return DietCow;
    });
    this.setState({
      CowDiet
    });
    const { group } = this.props;
    for (let j = 0; j < group.length; j++) {
      const v = {
        idGroupe: group[j].idGroupe,
        GroupeName: group[j].GroupeName,
        note: group[j].note,
        existance: false,
        DietAffectation: 0,
        DietAffectationNew: 0
      };
      groupData.push(v);
    }
    var DietSpecial = false;

    for (let i = 0; i < groupeId.length; i++) {
      // eslint-disable-next-line array-callback-return
      // eslint-disable-next-line no-shadow
      const GroupDiet = GroupDietFilter.filter(GroupDiet => {
        if (GroupDiet.idGroup === groupeId[i]) return GroupDiet;
      });
      const result = this.compareDiets(GroupDiet, CowDiet);
      for (let j = 0; j < groupData.length; j++) {
        if (groupData[j].idGroupe === groupeId[i]) {
          groupData[j].existance = true;
          if (result) {
            groupData[j].DietAffectation = groupeId[i];
            DietSpecial = true;
          }
        }
      }

      this.setState({
        groupData
      });
    }
    /** ************************************************************ */

    this.setState({
      visibleEditCow: true,
      viewDietCow: !DietSpecial
    });
  };

  hideEditCow = () => {
    this.setState({ visibleEditCow: false, viewDietCow: false });
  };

  propreDiet = () => {
    return (
      <Row>
        <Col>
          <Button
            outline
            pill
            theme="info"
            onClick={() => {
              const { groupData, viewDietCow } = this.state;
              for (let i = 0; i < groupData.length; i++) {
                groupData[i].DietAffectation = 0;
              }
              this.setState({
                groupData,
                viewDietCow: !viewDietCow
              });
            }}
          >
            <FontAwesomeIcon icon={faPlus} /> &nbsp; &nbsp; regime special
          </Button>
        </Col>{' '}
        <Col lg="4"> </Col>
      </Row>
    );
  };

  CowDietChange = () => {
    const { CowDiet } = this.state;
    // eslint-disable-next-line prefer-destructuring
    const length = CowDiet.length;

    const CowDietListe = length ? (
      CowDiet.map((valeur, index) => {
        const { Diet } = this.props;
        const lengthF = Diet.length;
        for (let i = 0; i < lengthF; i++) {
          // eslint-disable-next-line eqeqeq
          if (Diet[i].idDiet == valeur.idDiet) {
            // eslint-disable-next-line prefer-destructuring
            var DietName = Diet[i].DietName;
          }
        }
        return (
          <RowCowDiet
            Diet={Diet}
            DietName={DietName}
            detail={valeur}
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            index={index}
            delete={this.delete}
            edit={this.edit}
          />
        );
      })
    ) : (
      <p>no more</p>
    );
    return (
      <Row>
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
                <th scope="col" className="border-0 th2">
                  action
                </th>
              </tr>
            </thead>
            <tbody className="tbody3">{CowDietListe}</tbody>

            <FormCowDiet Diet={this.props.Diet} add={this.add} />
          </table>
        </Col>
      </Row>
    );
  };

  deletedCow = () => {
    confirmAlert({
      title: 'supprimer ',
      message: 'Vous etes sur de supprimer cette vache ?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            this.deletedNotification(this.props.detail.name);
            this.props.delete(this.props.index);
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
    const { isPopoverOpen } = this.state;

    // eslint-disable-next-line prefer-destructuring

    const vache = this.props.vaches;
    const ListeVaches = vache.map((valeur, index) => {
      return (
        // eslint-disable-next-line react/no-array-index-key
        <option value={valeur.id} key={index} onChange={this.handleChange}>
          {valeur.name}
        </option>
      );
    });
    const { groupData } = this.state;
    const groupListe2 = groupData.map((valeur, index) => {
      const v = {
        idVache: valeur.id,
        name: valeur.GroupeName,

        affectation: (
          <FormCheckbox
            toggle
            small
            checked={valeur.existance}
            onChange={e => this.handleChangechekbox(e, index)}
          />
        ),
        Programme: valeur.existance ? (
          <FormCheckbox
            inline
            name="sport"
            checked={valeur.DietAffectation === valeur.idGroupe}
            onChange={() => {
              this.handleChangechekbox2(valeur.idGroupe, index);
            }}
          >
            Program {index}
          </FormCheckbox>
        ) : (
          <Fragment />
        )
      };
      return v;
    });
    const columnsGroupe = [
      {
        title: 'Nom Groupe',
        field: 'name'
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
    var begin = this.state.change.DateCow;
    if (begin == null) {
      var DateCow = '';
    } else {
      begin += '';
      var DateCow = begin.substr(0, 10);
    }

    return (
      <Fragment>
        <ButtonGroup>
          <Button
            outline
            pill
            theme="success"
            onClick={() => this.showEditCow()}
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
                this.deletedCow();
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
          title="Fermer"
          subtitle="Fermer ajout de vache."
          width="58%"
          from="left"
          isOpen={this.state.visibleEditCow}
          onRequestClose={() => {
            // triggered on "<" on left top click or on outside click
            this.setState({
              visibleEditCow: false,
              groupData: []
            });
            this.props.changeFilter(false);
          }}
        >
          <Row>
            <Col lg="4" md="6" sm="12" className="mb-4" />
            <Col lg="8" md="6" sm="12" className="mb-4">
              <Form>
                <Row form>
                  <Col md="6">
                    <label htmlFor="CINCOW">reference</label>
                    <FormInput
                      valid={this.state.invalidReference}
                      invalid={this.state.validReference}
                      disabled={this.state.Role === 2}
                      id="CINCOW"
                      type="number"
                      onChange={this.handleChange}
                      value={this.state.change.CINCOW}
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <label htmlFor="Code">nom vache</label>
                    <FormInput
                      valid={this.state.invalidname}
                      invalid={this.state.validname}
                      disabled={this.state.Role === 2}
                      id="name"
                      type="text"
                      onChange={this.handleChange}
                      value={this.state.change.name}
                    />
                  </Col>
                </Row>
                <Row form>
                  <Col md="6" className="form-group">
                    <label htmlFor="DateCow">date : {DateCow}</label>
                    <FormInput
                      id="DateCow"
                      type="date"
                      placeholder="DateCow"
                      disabled={this.state.Role === 2}
                      onChange={this.handleChange}
                      value={this.state.change.DateCow}
                    />
                  </Col>
                  <Col md="6" className="form-group">
                    <label htmlFor="poid">poid</label>
                    <FormInput
                      id="weight"
                      type="number"
                      placeholder="poid du Vache"
                      disabled={this.state.Role === 2}
                      onChange={this.handleChange}
                      value={this.state.change.weight}
                    />
                  </Col>
                </Row>
                <Row form>
                  <Col md="6" className="form-group">
                    <label htmlFor="Father">pere : {}</label>
                    <FormSelect
                      id="Father"
                      onChange={this.handleChange}
                      defaultValue={this.state.change.Father}
                    >
                      <option>---</option>
                      {ListeVaches}
                    </FormSelect>
                  </Col>

                  <Col md="6" className="form-group">
                    <label htmlFor="Mother">mere</label>
                    <FormSelect
                      id="Mother"
                      onChange={this.handleChange}
                      defaultValue={this.state.change.Mother}
                    >
                      <option>---</option>
                      {ListeVaches}
                    </FormSelect>
                  </Col>
                </Row>
                <Row form>
                  <Col md="6" className="form-group">
                    <label htmlFor="type">type</label>
                    <FormSelect
                      id="type"
                      onChange={this.handleChange}
                      defaultValue={this.state.change.type}
                    >
                      <option value="sein">sein</option>

                      <option value="encinte">encinte</option>
                      <option value="malade">malade</option>
                    </FormSelect>
                  </Col>
                  <Col md="6">
                    <center>
                      <FloatingMenu
                        slideSpeed={500}
                        direction="top"
                        spacing={10}
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
                              arrowColor={'#d3d3d3'}
                              arrowSize={17}
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
                                    value={this.state.change.note}
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

                {this.state.Role === 2 ? (
                  <Fragment />
                ) : (
                  <MaterialTable
                    columns={columnsGroupe}
                    data={groupListe2}
                    title={'Groupe'}
                  />
                )}
                {this.state.Role === 2 ? (
                  <Fragment />
                ) : this.state.viewDietCow ? (
                  this.CowDietChange()
                ) : (
                  this.propreDiet()
                )}
                <br />

                <Row form>
                  <Col />
                  {this.state.Role === 2 ? (
                    <Fragment />
                  ) : (
                    <Col className="form-group">
                      <center>
                        <Button
                          outline
                          pill
                          theme="danger"
                          onClick={() => {
                            const { CowGroupFilter } = this.props;
                            const { DietCowS } = this.props;
                            const { GroupDietFilter } = this.props;
                            const groupeId = [];
                            // eslint-disable-next-line no-shadow
                            const groupData = [];
                            const GroupCows = CowGroupFilter.filter(
                              CowGroupe => {
                                if (CowGroupe.idVache === this.props.detail.id)
                                  return CowGroupe;
                              }
                            );

                            for (let i = 0; i < GroupCows.length; i++) {
                              groupeId.push(GroupCows[i].idGroupe);
                            }
                            this.setState({
                              // eslint-disable-next-line react/no-unused-state
                              GroupCow: GroupCows,
                              groupeId
                            });

                            const CowDiet = DietCowS.filter(DietCow => {
                              if (DietCow.idCow === this.props.detail.id)
                                return DietCow;
                            });
                            this.setState({
                              CowDiet
                            });
                            const { group } = this.props;
                            for (let j = 0; j < group.length; j++) {
                              const v = {
                                idGroupe: group[j].idGroupe,
                                GroupeName: group[j].GroupeName,
                                note: group[j].note,
                                existance: false,
                                DietAffectation: 0,
                                DietAffectationNew: 0
                              };
                              groupData.push(v);
                            }
                            for (let i = 0; i < groupeId.length; i++) {
                              const GroupDiet = GroupDietFilter.filter(
                                // eslint-disable-next-line no-shadow
                                GroupDiet => {
                                  if (GroupDiet.idGroup === groupeId[i])
                                    return GroupDiet;
                                }
                              );
                              const result = this.compareDiets(
                                GroupDiet,
                                CowDiet
                              );
                              for (let j = 0; j < groupData.length; j++) {
                                if (groupData[j].idGroupe === groupeId[i]) {
                                  groupData[j].existance = true;
                                  if (result) {
                                    groupData[j].DietAffectation = groupeId[i];
                                  }
                                }
                              }

                              this.setState({
                                groupData
                              });
                            }
                            this.setState({
                              change: {
                                id: this.props.detail.id,
                                CINCOW: this.props.detail.CINCOW,
                                name: this.props.detail.name,
                                DateCow: this.props.detail.DateCow,
                                weight: this.props.detail.weight,
                                note: this.props.detail.note
                              },
                              name: '',
                              DateCow: '',
                              weight: 0,
                              type: '',
                              CINCOW: 0,
                              Father: 1,
                              Mother: 1,
                              note: ''
                            });
                            console.log(this.state.change)}
                     }
                        >
                          <FontAwesomeIcon size="lg" icon={faRedo} />
                        </Button>
                        &nbsp; &nbsp; &nbsp; &nbsp;
                        <Button
                          outline
                          pill
                          theme="primary"
                          onClick={e => this.onEdit(e, this.props.detail.id)}
                        >
                          <FontAwesomeIcon size="lg" icon={faCheck} />
                        </Button>
                      </center>
                    </Col>
                  )}
                </Row>
              </Form>
            </Col>
          </Row>
        </SlidingPane>
      </Fragment>
    );
  };

  editing = () => {
    const { visibleEditCow, vache } = this.state;
    this.setState({
      visibleEditCow: !visibleEditCow,
      vache
    });
  };

  /** **********************COW & DIET **************** */

  edit = (index, change) => {
    const { CowDiet } = this.state;
    const CowDiets = CowDiet[index];
    // eslint-disable-next-line guard-for-in
    for (const i in change) {
      CowDiets[i] = change[i];
    }

    this.setState({
      CowDiet
    });
  };

  add = a => {
    const { CowDiet, CowDietAdd } = this.state;
    CowDietAdd.push(a);
    CowDiet.push(a);

    this.setState({
      CowDiet,
      CowDietAdd
    });
  };

  delete = index => {
    const { CowDietDeleted, CowDiet } = this.state;
    const CowDietD = CowDiet[index];
    CowDietDeleted.push(CowDietD.idProgram);
    CowDiet.splice(index, 1);
    this.setState({
      CowDiet
    });
    // this.deleteMethode(CowDietDeleted.idProgram)
  };

  /** ******************************************************* */
  handleChange = e => {
    const { edit, vache, change } = this.state;
    change[e.target.id] = e.target.value;

    // nraja3 el stateel jdida eli feha ken eli tbadlou w mel chira lo5ra
    // nthabet ken tbadlet hawka nbadalha ken tbadletech nbadelhech

    this.setState({
      edit,
      vache,
      change
    });
  };

  onEdit = e => {
    e.preventDefault();
    var unicite = false;
    const { name, CINCOW, id } = this.state.change;
    const { compteur} = this.state;

    const CINCOWString = `${CINCOW}`;
    if (name === '') {
      this.setState({ invalidname: false, validname: true });
    } else
      this.setState({
        validname: false,
        invalidname: true
      });
    if (CINCOW === 0 || CINCOWString === '') {
      this.setState({
        validReference: true,
        invalidReference: false
      });
    } else
      this.setState({
        validReference: false,
        invalidReference: true
      });
    if (name !== '') {
      const { vaches } = this.props;

      const vache = vaches.filter(Cow => {
        if (Cow.name === name) return Cow;
      });

      console.log('**************');
      console.log(vaches);
      console.log(vache);
      if (vache.length > 0) {
        console.log('**************');
        console.log(vache.length );
        console.log(vache[0].id  );
        console.log(this.state.change);

        if (vache.length === 1 && vache[0].id === id) {
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
    if (name !== '' && CINCOW !== 0 && unicite&&compteur===0) {
      const { change } = this.state;
      console.log(change);
      const { groupData } = this.state;
      const { viewDietCow } = this.state;

      const GroupCowNew = [];

      for (let k = 0; k < groupData.length; k++) {
        if (groupData[k].existance) {
          GroupCowNew.push({
            idVache: this.props.detail.id,
            idGroupe: groupData[k].idGroupe
          });
        }
        if (groupData[k].DietAffectation)
          var DietCowEdited = groupData[k].idGroupe;
      }
      this.props.edit(
        this.props.detail.id,
        this.props.index,
        change,
        groupData,
        this.state.CowDiet,
        viewDietCow,
        GroupCowNew,
        DietCowEdited,
        false
      );
      this.editing();
      this.setState({
        viewDietCow: false,
        groupData: [],
        groupeId: []
      });
    }
  };

  // eslint-disable-next-line class-methods-use-this
  NodeletedNotification() {
    NotificationManager.warning('vache non supprimer', '', 3000);
  }

  // eslint-disable-next-line class-methods-use-this
  deletedNotification(name) {
    NotificationManager.info(`vache supprimer :${name}`);
  }

  handleChangechekbox(e, index) {
    const { groupData } = this.state;
    const v = groupData[index];
    v.existance = !v.existance;
    if (v.existance === false) {
      if (groupData[index].DietAffectation !== 0) {
        for (let i = 0; i < groupData.length; i++) {
          groupData[i].DietAffectation = 0;
          groupData[i].DietAffectationNew = 0;
        }
        v.DietAffectation = 0;
      }
    }
    this.setState({ groupData });
  }

  handleChangechekbox2(DietAffectation, index) {
    const { groupData } = this.state;
    for (let i = 0; i < groupData.length; i++) {
      if (i === index) {
        const v = groupData[i];
        if (v.DietAffectation === DietAffectation) {
          v.DietAffectation = 0;
          v.DietAffectationNew = 0;
        } else {
          v.DietAffectation = DietAffectation;
          v.DietAffectationNew = DietAffectation;
        }
      } else {
        groupData[i].DietAffectation = 0;
      }
    }

    this.setState({ groupData, viewDietCow: false });
  }

  render() {
    return <Fragment>{this.renderActions()}</Fragment>;
  }
}

export default RowVache2;
