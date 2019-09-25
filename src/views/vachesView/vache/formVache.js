/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-restricted-syntax */
/* eslint-disable array-callback-return */
/* eslint-disable no-shadow */
/* eslint-disable no-console */
import React, { Component, Fragment } from 'react';
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  FormCheckbox,
  FormSelect,
  Button,
  Card,
  CardBody,
  FormTextarea
} from 'shards-react';

import { FloatingMenu, MainButton } from 'react-floating-button-menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faTimes,
  faCheck,
  faRedo
} from '@fortawesome/free-solid-svg-icons';
import Popover, { ArrowContainer } from 'react-tiny-popover';
import MaterialTable from 'material-table';
import {
  NotificationContainer,
  NotificationManager
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { Config } from '../../../configue';
import '../../../style/scrollerdesign.css';
import '../../../style/scrollerdesign2.css';
import RowCowDiet from './CowDiet/RowCowDiet';
import FormCowDiet from './CowDiet/FormCowDiet';

class FormVache extends Component {
  state = {
    viewDietCow: false,
    name: '',
    DateCow: '',
    weight: 0,
    type: 'sein',
    CINCOW: 0,
    Father: 1,
    Mother: 1,
    note: '',

    isPopoverOpen: false,
    isOpen: false,
    groupData: [],
    Diets: [],
    CowDietDeleted: [],
    CowDietAdd: [],
    invalidname: false,
    validname: false,
    invalidReference: false,
    validReference: false,
    CowDiet: []
  };

  componentDidMount = () => {
    const { group } = this.props;
    const groupData = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < group.length; i++) {
      const v = {
        idGroupe: group[i].idGroupe,
        GroupeName: group[i].GroupeName,
        note: group[i].note,
        DietAffectation: 0,
        existance: false
      };
      groupData.push(v);
    }
    this.setState({ groupData });
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  // eslint-disable-next-line react/sort-comp
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
    // eslint-disable-next-line no-plusplus
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

  // eslint-disable-next-line class-methods-use-this
  postMethode(a) {
    const encodedKeyname = encodeURIComponent('name');
    const encodedKeynaiss = encodeURIComponent('DateCow');
    const encodedKeyweight = encodeURIComponent('weight');
    const encodedKeytype = encodeURIComponent('type');
    const encodedKeyCINCOW = encodeURIComponent('CINCOW');
    const encodedKeynote = encodeURIComponent('note');
    const encodedKeyFather = encodeURIComponent('Father');
    const encodedKeyMother = encodeURIComponent('Mother');
    const encodedKeygroup = encodeURIComponent('group');
    const encodedKeychoix = encodeURIComponent('choix');
    const encodedKeyCowDiet = encodeURIComponent('CowDiet');

    const encodedvalname = encodeURIComponent(a.name);
    const encodedvalDateCow = encodeURIComponent(a.DateCow);
    const encodedweight = encodeURIComponent(a.weight);
    const encodedtype = encodeURIComponent(a.type);
    const encodedCINCOW = encodeURIComponent(a.CINCOW);
    const encodednote = encodeURIComponent(a.note);
    const encodedFather = encodeURIComponent(a.Father);
    const encodedMother = encodeURIComponent(a.Mother);
    const encodedchoix = encodeURIComponent(a.viewDietCow);
    const encodedgroup = encodeURIComponent(JSON.stringify(a.groupData));
    const encodedCowDiet = encodeURIComponent(JSON.stringify(a.CowDiet));
    let formbody = [
      `${encodedKeyname}=${encodedvalname}`,
      `${encodedKeynaiss}=${encodedvalDateCow}`,
      `${encodedKeyweight}=${encodedweight}`,
      `${encodedKeytype}=${encodedtype}`,
      `${encodedKeyCINCOW}=${encodedCINCOW}`,
      `${encodedKeynote}=${encodednote}`,
      `${encodedKeyFather}=${encodedFather}`,
      `${encodedKeyMother}=${encodedMother}`,
      `${encodedKeychoix}=${encodedchoix}`,
      `${encodedKeygroup}=${encodedgroup}`,
      `${encodedKeyCowDiet}=${encodedCowDiet}`
    ];
    formbody = formbody.join('&');

    // eslint-disable-next-line no-undef
    const data = fetch(`${Config.url}/vaches`, {
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
        // eslint-disable-next-line no-console
        console.error(error);
      });
    return data;
  }

  handleSubmit = e => {
    e.preventDefault(e);
    let unicite = false;
    const { name, CINCOW } = this.state;
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
        invalidReference: true
      });
    } else
      this.setState({
        validReference: false,
        invalidReference: true
      });
    if (name !== '') {
      const { vaches } = this.props;
      console.log('vaches');
      console.log(vaches);
      // eslint-disable-next-line consistent-return
      const vache = vaches.filter(vache => {
        if (vache.name === name) return vache;
      });
      console.log('vache');
      console.log(vache);
      if (vache.length === 0) {
        unicite = true;
      } else {
        NotificationManager.error('Nom existant', '', 3000);
      }
    }
    if (name !== '' && CINCOW !== 0 && unicite) {
      this.postMethode(this.state).then(d => {
        const id = d.data;
        console.log("this.state")
        console.log(this.state)
        // eslint-disable-next-line react/destructuring-assignment
        this.props.addCow(this.state, id, false, this.state.groupData);
        this.setState({
          name: '',
          invalidname: false,
          DateCow: '',
          invalidReference: false,
          weight: '',
          invalidweight: false,
          type: '',
          CINCOW: 0,
          note: '',
          Father: 1,
          invalidFather: false,

          Mother: 1,
          invalidMother: false
        });
      });
    }
  };

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

  DietCow = () => {
    const { CowDiet } = this.state;
    // eslint-disable-next-line prefer-destructuring
    const length = CowDiet.length;

    const CowDietListe = length ? (
      CowDiet.map((valeur, index) => {
        console.log(this.props.Diet);

        const { Diet } = this.props;
        const lengthF = Diet.length;
        console.log(lengthF);
        console.log(lengthF);
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < lengthF; i++) {
          console.log('valeur.idDiet');
          console.log(valeur.idDiet);
          console.log(Diet[i].idDiet);
          if (Diet[i].idDiet == valeur.idDiet) {
            var DietName = Diet[i].DietName;
          }
        }
        return (
          <RowCowDiet
            Diet={Diet}
            // eslint-disable-next-line block-scoped-var
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
      <tr><td>aucun regime </td></tr>
    );
    return (
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
    );
  };

  propreDiet = () => {
    return (
      <Fragment>
        <Col>
          <Button
            outline

            pill
            theme="info"
            onClick={() => {
              // eslint-disable-next-line react/no-access-state-in-setstate
              const groupData = this.state.groupData;
              // eslint-disable-next-line no-plusplus
              for (let i = 0; i < groupData.length; i++) {
                groupData[i].DietAffectation = 0;
              }
              this.setState({
                groupData,
                // eslint-disable-next-line react/no-access-state-in-setstate
                viewDietCow: !this.state.viewDietCow
              });
            }}
          >
            <FontAwesomeIcon icon={faPlus} /> &nbsp; &nbsp; regime special
          </Button>
        </Col>
        <Col lg="4" />
      </Fragment>
    );
  };

  render() {
    const isPopoverOpen = this.state.isPopoverOpen;

    const vache = this.props.vaches;
    const length = vache.length;

    const ListeVaches = length ? (
      vache.map((valeur, index) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <option value={valeur.id} key={index} onChange={this.handleChange}>
            {valeur.name}
          </option>
        );
      })
    ) : (
      <p>no more</p>
    );

    const groupData = this.state.groupData;

    const groupListe2 = groupData.map((valeur, index) => {
      const v = {
        id: index,
        name: valeur.GroupeName,

        affectation: (
          <FormCheckbox
            toggle
            small
            checked={valeur.existance}
            onChange={e => this.handleChangechekbox(e, index)}
          />
        ),
        Program: valeur.existance ? (
          <FormCheckbox
            inline
            name="DietAffectation"
            checked={valeur.DietAffectation === valeur.idGroupe}
            onChange={() => {
              this.handleChangechekbox2(valeur.idGroupe, index);
            }}
          />
        ) : (
          <Fragment />
        )
      };
      return v;
    });

    const columns = [
      {
        title: 'name',
        field: 'name'
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
          <Form onSubmit={this.handleSubmit}>
            <Row form>
              <Col md="6">
                <label htmlFor="CINCOW">reference</label>
                <FormInput
                  id="CINCOW"
                  type="number"
                  valid={this.state.invalidReference}
                  invalid={this.state.validReference}
                  placeholder="reference ... "
                  onChange={this.handleChange}
                  value={this.state.CINCOW}
                />
              </Col>
              <Col md="6" className="form-group">
                <label htmlFor="Code">nom vache</label>
                <FormInput
                  valid={this.state.invalidname}
                  invalid={this.state.validname}
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Code du vache .."
                  onChange={this.handleChange}
                  value={this.state.name}
                />
              </Col>
            </Row>
            <Row form>
              <Col md="6" className="form-group">
                <label htmlFor="DateCow">date </label>
                <FormInput
                  id="DateCow"
                  type="date"
                  placeholder="DateCow"
                  onChange={this.handleChange}
                  value={this.state.DateCow}
                />
              </Col>
              <Col md="6" className="form-group">
                <label htmlFor="weight">Poid</label>
                <FormInput
                  id="weight"
                  type="number"
                  placeholder="g"
                  onChange={this.handleChange}
                  value={this.state.weight}
                />
              </Col>
            </Row>
            <Row form>
              <Col md="6" className="form-group">
                <label htmlFor="Father">Pere</label>
                <FormSelect id="Father" onChange={this.handleChange}>
                  <option>---</option>
                  {ListeVaches}
                </FormSelect>
              </Col>

              <Col md="6" className="form-group">
                <label htmlFor="Mother">mere</label>
                <FormSelect id="Mother" onChange={this.handleChange}>
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
                  defaultValue="sein"
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
                      iconActive={<FontAwesomeIcon size="lg" icon={faTimes} />}
                      onClick={() =>
                        // eslint-disable-next-line react/no-access-state-in-setstate
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
            <br />
            <br />
            <Col>
              <div style={{ maxWidth: '100%' }}>
                <MaterialTable
                  columns={columns}
                  data={groupListe2}
                  title="Groupes"
                />
              </div>
            </Col>

            {this.state.viewDietCow ? this.DietCow() : this.propreDiet()}

            <center>
              <Button
                outline
                pill
                theme="danger"
                onClick={() => {
                  const group = this.props.group;
                  const groupData = [];
                  // eslint-disable-next-line no-plusplus
                  for (let i = 0; i < group.length; i++) {
                    const v = {
                      idGroupe: group[i].idGroupe,
                      GroupeName: group[i].GroupeName,
                      note: group[i].note,
                      DietAffectation: 0,
                      existance: false
                    };
                    groupData.push(v);
                  }

                  this.setState({
                    name: '',
                    DateCow: '',
                    weight: 0,
                    type: '',
                    CINCOW: 0,
                    Father: 1,
                    Mother: 1,
                    note: '',
                    isPopoverOpen: false,
                    isOpen: false,
                    groupData
                  });
                }}
              >
                <FontAwesomeIcon size="lg" icon={faRedo} />
              </Button>
              &nbsp; &nbsp;&nbsp; &nbsp;
              <Button outline pill theme="primary" type="submit">
                <FontAwesomeIcon size="lg" icon={faCheck} />
              </Button>
            </center>
          </Form>
        </ListGroupItem>
        <ListGroupItem>
          <NotificationContainer />
        </ListGroupItem>
      </ListGroup>
    );
  }
}

export default FormVache;
