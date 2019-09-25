/* eslint-disable radix */
/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-alert */
/* eslint-disable class-methods-use-this */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

import React, { Component, Fragment } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  Form,
  CardBody,
  Button
} from 'shards-react';
import SlidingPane from 'react-sliding-pane';
import Modal from 'react-modal';
import {
  NotificationContainer,
  NotificationManager
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import MaterialTable from 'material-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import PageTitle from '../../components/common/PageTitle';
import RowFooder2 from './Fooder/rowFooder2';
import FormFooder from './Fooder/formFooder';
import FormDiet from './Diet/formDiet';
import RowDiet2 from './Diet/rowDiet2';
import EditFormDiet from './DietFooder/formDiet';

import '../../style/scrollerdesign.css';
import '../vachesView/hover.css';
import { Config } from '../../configue';

class reigmeView extends Component {
  state = {
    idUser: 0,
    Role: 2,
    editDF: false,
    editD: false,
    editF: false,
    FooderDietDeleted: [],
    Fooder: [],
    Diet: [],
    FooderDietAdd: [],
    isPaneOpen: false,
    isPaneOpenLeft: false
  };

  componentDidMount() {
    Modal.setAppElement('body');
    // eslint-disable-next-line global-require
    require('events').EventEmitter.defaultMaxListeners = 0;

    this.getFooder().then(Fooder => {
      this.setState({
        Fooder: Fooder.data
      });
    });
    this.getDiet().then(Diet => {
      this.setState({
        Diet: Diet.data
      });
    });
    const idUser = localStorage.getItem('idUser');
    const Role = localStorage.getItem('Role');
    this.setState({
      Role: parseInt(Role),
      idUser: parseInt(idUser)
    });
  }
  /** ************************    FODDER     ********************** */

  getFooder = () => {
    const datas = fetch(`${Config.url}/fooder`)
      .then(reponse => {
        return reponse.json();
        // })
        // .then(({ data }) => {
      })
      .catch(err => console.error(err));
    console.log(datas);

    return datas;
  };

  editing = () => {
    const { editF, Fooder } = this.state;
    this.setState({
      editF: !editF,
      Fooder
    });
    console.log({ editF });
  };

  edit = (index, change) => {
    const { Fooder } = this.state;
    const Food = Fooder[index];
    for (const i in change) {
      Food[i] = change[i];
    }
    NotificationManager.info(`Fooder Modifier : ${Food.FooderName}`, '', 3000);

    this.updateMethode(Food);

    this.setState({
      Fooder
    });
  };

  delete = index => {
    const { Fooder } = this.state;
    const FooderDeleted = Fooder[index];

    Fooder.splice(index, 1);
    this.setState({ Fooder });
    this.deleteMethode(FooderDeleted.idFooder);
  };

  add = (a, idFooder) => {
    const { Fooder } = this.state;
    a.idFooder = idFooder;
    Fooder.push(a);
    this.setState({
      Fooder,
      isPaneOpenLeft: false
    });
    NotificationManager.success(a.FooderName, 'Aliment ajouter', 3000);
  };

  renderFooderDiet = () => {
    const { Fooder } = this.state;
    const FooderListe2 = Fooder.map((valeur, index) => {
      const v = {
        id: valeur.idFooder,
        name: valeur.FooderName,
        density: valeur.density,
        Actions: (
          <RowFooder2
            oldFooder={this.state.Fooder}
            detail={valeur}
            key={index}
            index={index}
            edit={this.edit}
            delete={this.delete}
          />
        )
      };
      return v;
    });
    const columns = [
      /* {
        title: 'id',
        field: 'id',
        headerStyle: { zIndex: 0 }
      },
      */
      {
        title: 'Nom Aliment',
        field: 'name',
        headerStyle: { zIndex: 0 }
      },
      {
        title: 'dose unitaire',
        field: 'density',
        headerStyle: { zIndex: 0 }
      },

      {
        title: 'Actions',
        field: 'Actions',
        headerStyle: { zIndex: 0 }
      }
    ];

    const { Diet } = this.state;

    const DietListe2 = Diet.map((valeur, index) => {
      const v = {
        id: valeur.idDiet,
        name: valeur.DietName,

        Actions: (
          <RowDiet2
            oldDiet={this.state.Diet}
            detail={valeur}
            key={index}
            index={index}
            edit={this.editDiet}
            delete={this.deleteDiet}
            editDietFooder={this.editDietFooder}
          />
        )
      };
      return v;
    });
    const columnsDiet = [
      {
        title: 'id Regime',
        field: 'id',
        headerStyle: { zIndex: 0 }
      },
      {
        title: 'Nom Regime',
        field: 'name',
        headerStyle: { zIndex: 0 }
      },

      {
        title: 'Actions',
        field: 'Actions',
        headerStyle: { zIndex: 0 }
      }
    ];

    return (
      <Fragment>
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Regimes & Aliments "
            subtitle="agTEK"
            className="text-sm-left"
          />
        </Row>
        <Row>
          {/* formulaire vache */}
          <Col lg="6" className="mb-4">
            <MaterialTable
              columns={columnsDiet}
              data={DietListe2}
              title={
                this.state.Role < 2 ? (
                  <Row>
                    <center>
                      <a
                        onClick={() => this.setState({ isPaneOpen: true })}
                        className="AddButton"
                      >
                        <center>
                          Regimes &nbsp; &nbsp;
                          <FontAwesomeIcon size="lg" icon={faPlus} />{' '}
                        </center>
                      </a>
                    </center>
                  </Row>
                ) : (
                  'Regimes'
                )
              }
              options={{
                pageSize: 14,
                maxBodyHeight: '46vh',
                columnsButton: true
              }}
            />
          </Col>
          <SlidingPane
            className="some-custom-class"
            overlayClassName="some-custom-overlay-class"
            isOpen={this.state.isPaneOpen}
            title="Fermer"
            subtitle="Fermer ajout de Regime."
            width="50%"
            onRequestClose={() => {
              this.setState({
                idDiet: 0,
                DietName: '',
                editDF: false,
                isPaneOpen: false,
                FooderDietDeleted: []
              });

              // triggered on "<" on left top click or on outside click
            }}
          >
            {this.state.editDF
              ? this.renderActionDietFooder2()
              : this.renderActionDiet2()}
          </SlidingPane>

          <Col lg="6" className="mb-4">
            <MaterialTable
              columns={columns}
              data={FooderListe2}
              title={
                this.state.Role < 1 ? (
                  <Row>
                    <center>
                      <a
                        onClick={() => this.setState({ isPaneOpenLeft: true })}
                        className="AddButton"
                      >
                        <center>
                          Aliments &nbsp; &nbsp;
                          <FontAwesomeIcon size="lg" icon={faPlus} />{' '}
                        </center>
                      </a>
                    </center>
                  </Row>
                ) : (
                  'Aliments'
                )
              }
              options={{
                pageSize: 10,
                maxBodyHeight: '46vh',
                columnsButton: true
              }}
            />
          </Col>
          <NotificationContainer />

          <SlidingPane
            closeIcon={
              <div>
                <center>Ajouter un Regime</center>
              </div>
            }
            isOpen={this.state.isPaneOpenLeft}
            title=""
            from="left"
            width="58%"
            onRequestClose={() => this.setState({ isPaneOpenLeft: false })}
          >
            <Row>
              <Col lg="4" md="6" sm="12" className="mb-4" />
              <Col lg="8" md="6" sm="12" className="mb-4">
                {this.renderActionF2()}
              </Col>
            </Row>
          </SlidingPane>
        </Row>

        {/* Default Light Table */}
      </Fragment>
    );
  };

  renderActionF2 = () => {
    return (
      <Fragment>
        {/* Page Header */}

        <Row>
          <h4> Ajouter Aliment</h4>
        </Row>
        <br />
        <br />
        <br />

        <FormFooder Fooder={this.state.Fooder} add={this.add} />

        {/* Default Light Table */}
      </Fragment>
    );
  };

  /** ************************    DIET     ********************** */
  getDiet = () => {
    const datas = fetch(`${Config.url}/Diet`)
      .then(reponse => {
        return reponse.json();
        // })
        // .then(({data}) => {
      })
      .catch(err => console.error(err));
    console.log(datas);

    return datas;
  };

  editingD = () => {
    const { editD, Diet } = this.state;
    this.setState({
      editD: !editD,
      Diet
    });
    console.log({ editD });
    console.log(this.state.Diet);
  };

  editDiet = (index, change) => {
    const { Diet } = this.state;
    const Diete = Diet[index];
    for (const i in change) {
      Diete[i] = change[i];
    }
    NotificationManager.info(`Regime Modifier : ${Diete.DietName}`, '', 3000);

    this.updateMethodeDiet(Diete);

    this.setState({
      Diet
    });
  };

  deleteDiet = index => {
    const { Diet } = this.state;
    const DietDeleted = Diet[index];
    console.log('FooderDeleted.id');
    console.log(DietDeleted.idDiet);
    Diet.splice(index, 1);
    this.setState({ Diet });
    this.deleteMethodeDiet(DietDeleted.idDiet);
  };

  addDiet = (a, idDiet) => {
    const { Diet } = this.state;
    console.log('aaaa');
    console.log(a);
    a.idDiet = idDiet;
    Diet.push(a);
    this.setState({
      Diet,
      isPaneOpen: false
    });
    NotificationManager.success(a.DietName, 'Regime ajouter', 3000);
    console.log('add');

    console.log(this.state);
  };

  renderActionDiet2 = () => {
    return (
      <Fragment>
        {/* Page Header */}

        {/* formulaire vache */}

        <Row>
          <h4> Ajouter Regime</h4>
        </Row>

        <Row>
          <Col>
            <FormDiet
              Diet={this.state.Diet}
              add={this.addDiet}
              Fooder={this.state.Fooder}
            />
          </Col>
        </Row>

        {/* Default Light Table */}
      </Fragment>
    );
  };

  renderActionDiet = () => {
    return (
      <Fragment>
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Regimes & Aliments "
            subtitle="agTEK"
            className="text-sm-left"
          />
        </Row>
        <Row>
          <Col lg="5" md="6" sm="12" className="mb-4">
            <Card small className="mb-4">
              <CardHeader className="border-bottom ">
                <h6 className="m-0">Regimes</h6>
              </CardHeader>
              <CardBody className="p-0 pb-3">
                <Form className="">
                  <table className="tables table mb-0">
                    <thead className="thead bg-light">
                      <tr>
                        <center>
                          <th scope="col" className="border-0 th2 ">
                            idRegime
                          </th>{' '}
                          <th scope="col" className="border-0 th2">
                            Nom Regime
                          </th>
                          <th scope="col" className="border-0 th2">
                            action
                          </th>
                        </center>
                      </tr>
                    </thead>
                    <tbody className="tbody">{DietListe} </tbody>
                  </table>
                </Form>
              </CardBody>
            </Card>
          </Col>
          {/* formulaire vache */}

          <Col lg="7" className="mb-4">
            <Card small>
              <CardHeader className="border-bottom ">
                <Row>
                  <Col lg="9" className="mb-1">
                    <h6> ajouter Regime</h6>
                  </Col>
                  <Col lg="3" className="mb-1">
                    <Button
                      outline
                      pill
                      theme="success"
                      onClick={() => this.editingD()}
                    >
                      <i
                        onClick={() => this.editing()}
                        className="material-icons"
                      >
                        close
                      </i>
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <FormDiet
                  Diet={this.state.Diet}
                  add={this.addDiet}
                  Fooder={this.state.Fooder}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* Default Light Table */}
      </Fragment>
    );
  };

  /** ************************    DIET&FOODER EDIT     ********************** */
  getFooderDiet = idDiet => {
    const url = `${Config.url}/FooderDiet?idDiet=`;
    const datas = fetch(url + idDiet)
      .then(reponse => {
        return reponse.json();
        // })
        // .then(({data}) => {
      })
      .catch(err => console.error(err));
    console.log(datas);

    return datas;
  };

  editDF = (index, change) => {
    const { FooderDiet } = this.state;
    const FooderDiets = FooderDiet[index];
    for (const i in change) {
      FooderDiets[i] = change[i];
    }

    this.setState({
      FooderDiet
    });
    console.log('this.state.FooderDiet');
    console.log(this.state.FooderDiet);
  };

  editDietFooder = (idDiet, DietName) => {
    const { editDF } = this.state;
    const { isPaneOpen } = this.state;

    if (idDiet === 0) {
      this.setState({
        idDiet,
        DietName,
        editDF: !editDF,
        isPaneOpen: !isPaneOpen
      });
    } else {
      this.getFooderDiet(idDiet).then(FooderDiet => {
        this.setState({
          FooderDiet: FooderDiet.data,
          idDiet,
          DietName,
          editDF: true,
          isPaneOpen: true
        });
      });
    }
  };

  submitFooderDiet = (e, DietName, idDiet1) => {
    e.preventDefault();
    const { Diet } = this.state;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < Diet.length; i++) {
      // eslint-disable-next-line eqeqeq
      if (Diet[i].idDiet == idDiet1) {
        const Diete = Diet[i];
        Diete.DietName = DietName;
        NotificationManager.info(`regime Modifier : ${DietName}`, '', 3000);

        this.updateMethodeDiet(Diete);

        this.setState({
          Diet
        });
      }
    }

    const { FooderDiet, idDiet } = this.state;

    this.updateFooderDietMethode(idDiet, FooderDiet);

    this.setState({
      idDiet: 0,
      DietName: '',
      editDF: false,
      isPaneOpen: false,
      FooderDietDeleted: []
    });
  };

  updateFooderDietMethode = (idDiet, FooderDiet) => {
    const post = JSON.stringify({
      idDiet: JSON.stringify(idDiet),
      FooderDiet: JSON.stringify(FooderDiet)
    });
    // eslint-disable-next-line no-useless-concat
    const formbody = [`${'post' + '='}${post}`];
    fetch(`${Config.url}/FooderDiet/update`, {
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

  updateMethodeFooderDiet = a => {
    const encodedKeyidDiet_Fodder = encodeURIComponent('idDiet_Fodder');
    const encodedKeyidFooder = encodeURIComponent('idFooder');
    const encodedKeyidDiet = encodeURIComponent('idDiet');
    const encodedKeyPortion = encodeURIComponent('Portion');
    const encodedKeyQuantityByDay = encodeURIComponent('QuantityByDay');
    const encodedKeyPriority = encodeURIComponent('Priority');

    const encodedvalidDiet_Fodder = encodeURIComponent(a.idDiet_Fodder);
    const encodedvalidFooder = encodeURIComponent(a.idFooder);
    const encodedvalidDiet = encodeURIComponent(a.idDiet);
    const encodedvalPortion = encodeURIComponent(a.Portion);
    const encodedvalQuantityByDay = encodeURIComponent(a.QuantityByDay);
    const encodedvalPriority = encodeURIComponent(a.Priority);

    let formbody = [
      // eslint-disable-next-line camelcase
      `${encodedKeyidDiet_Fodder}=${encodedvalidDiet_Fodder}`,
      `${encodedKeyidFooder}=${encodedvalidFooder}`,
      `${encodedKeyidDiet}=${encodedvalidDiet}`,
      `${encodedKeyPortion}=${encodedvalPortion}`,
      `${encodedKeyQuantityByDay}=${encodedvalQuantityByDay}`,
      `${encodedKeyPriority}=${encodedvalPriority}`
    ];
    formbody = formbody.join('&');

    fetch(`${Config.url}/FooderDiet/update`, {
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
  };

  deleteFooderDiet = index => {
    const { FooderDietDeleted, FooderDiet } = this.state;
    const FooderDietD = FooderDiet[index];
    FooderDietDeleted.push(FooderDietD.idDiet_Fodder);
    FooderDiet.splice(index, 1);
    this.setState({
      FooderDiet,
      FooderDietDeleted
    });
    //  this.deleteMethode(DietDeleted.idFooder)
  };

  addFooderDiet = a => {
    const { FooderDietAdd, FooderDiet } = this.state;

    FooderDietAdd.push(a);
    FooderDiet.push(a);

    this.setState({
      FooderDietAdd,
      FooderDiet
    });
  };

  annuler = (idDiet, DietName) => {
    this.getFooderDiet(idDiet).then(FooderDiet => {
      this.setState({
        FooderDiet: FooderDiet.data,
        idDiet,
        DietName,
        editDF: true
      });
    });
  };

  postMethodeFooderDiet(FooderDeit, idDiet) {
    const encodedKeyidDiet = encodeURIComponent('idDiet');
    const encodedKeyidFooder = encodeURIComponent('idFooder');
    const encodedKeyquantite = encodeURIComponent('quantite');
    const encodedKeyPortion = encodeURIComponent('Portion');
    const encodedKeyPriority = encodeURIComponent('Priority');

    const encodedvalididDiet = encodeURIComponent(idDiet);
    const encodedvalidFooder = encodeURIComponent(FooderDeit.idFooder);
    const encodedvalquantite = encodeURIComponent(FooderDeit.quantite);
    const encodedvalPortion = encodeURIComponent(FooderDeit.Portion);
    const encodedvalPriority = encodeURIComponent(FooderDeit.Priority);
    let formbody = [
      `${encodedKeyidDiet}=${encodedvalididDiet}`,
      `${encodedKeyidFooder}=${encodedvalidFooder}`,
      `${encodedKeyquantite}=${encodedvalquantite}`,
      `${encodedKeyPortion}=${encodedvalPortion}`,
      `${encodedKeyPriority}=${encodedvalPriority}`
    ];
    formbody = formbody.join('&');

    fetch(`${Config.url}/FooderDiet`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded' // <-- Specifying the Content-Type
      },
      body: formbody // <-- Post parameters
    })
      .then(response => response.text())
      .then(responseText => {
        console.log(responseText);
      })
      .catch(error => {
        console.error(error);
      });
  }

  deleteMethodeFooderDiet(a) {
    const encodedKeyids = encodeURIComponent('ids');

    const encodedvalids = encodeURIComponent(a);

    const formbody = [`${encodedKeyids}=${encodedvalids}`];

    fetch(`${Config.url}/FooderDiet/delete`, {
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

  updateMethodeDiet(a) {
    const encodedKeyid = encodeURIComponent('idDiet');
    const encodedKeyname = encodeURIComponent('DietName');

    const encodedvalid = encodeURIComponent(a.idDiet);
    const encodedvalname = encodeURIComponent(a.DietName);

    let formbody = [
      `${encodedKeyid}=${encodedvalid}`,
      `${encodedKeyname}=${encodedvalname}`
    ];
    formbody = formbody.join('&');

    fetch(`${Config.url}/Diet/update`, {
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

  deleteMethodeDiet(a) {
    const encodedKeyids = encodeURIComponent('ids');

    const encodedvalids = encodeURIComponent(a);

    const formbody = [`${encodedKeyids}=${encodedvalids}`];

    fetch(`${Config.url}/Diet/delete`, {
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

  deleteMethode(a) {
    const encodedKeyids = encodeURIComponent('ids');

    const encodedvalids = encodeURIComponent(a);

    const formbody = [`${encodedKeyids}=${encodedvalids}`];

    fetch(`${Config.url}/fooder/delete`, {
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

  updateMethode(a) {
    const encodedKeyid = encodeURIComponent('idFooder');
    const encodedKeyname = encodeURIComponent('FooderName');

    const encodedKeydensity = encodeURIComponent('density');

    const encodedvalid = encodeURIComponent(a.idFooder);
    const encodedvalname = encodeURIComponent(a.FooderName);
    const encodedvaldensity = encodeURIComponent(a.density);

    let formbody = [
      `${encodedKeydensity}=${encodedvaldensity}`,
      `${encodedKeyid}=${encodedvalid}`,
      `${encodedKeyname}=${encodedvalname}`
    ];
    formbody = formbody.join('&');

    fetch(`${Config.url}/fooder/update`, {
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

  renderActionDietFooder2 = () => {
    const { idDiet, DietName } = this.state;

    return (
      <Fragment>
        {/* Page Header */}

        <Row>
          <h4> Changer Regime</h4>
        </Row>
        <Row>
          <Col>
            <EditFormDiet
              oldDiet={this.state.Diet}
              submitFooderDiet={this.submitFooderDiet}
              idDiet={idDiet}
              annuler={this.annuler}
              DietName={DietName}
              add={this.addFooderDiet}
              Fooder={this.state.Fooder}
              FooderDiet={this.state.FooderDiet}
              edit={this.editDF}
              deleteFooderDiet={this.deleteFooderDiet}
            />
          </Col>
        </Row>

        {/* Default Light Table */}
      </Fragment>
    );
  };

  renderActionDietFooder = () => {
    const { idDiet, DietName } = this.state;

    return (
      <Fragment>
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Regimes & Aliments "
            subtitle="agTEK"
            className="text-sm-left"
          />
        </Row>
        <Row>
          <Col lg="5" md="6" sm="12" className="mb-4">
            <Card small className="mb-4">
              <CardHeader className="border-bottom ">
                <h6 className="m-0">Regimes</h6>
              </CardHeader>
              <CardBody className="p-0 pb-3">
                <Form className="">
                  <table className="tables table mb-0">
                    <thead className="thead bg-light">
                      <tr>
                        <center>
                          <th scope="col" className="border-0 th2 ">
                            idRegime
                          </th>
                          <th scope="col" className="border-0 th2">
                            Nom Regime
                          </th>
                          <th scope="col" className="border-0 th2">
                            action
                          </th>
                        </center>
                      </tr>
                    </thead>
                    <tbody className="tbody">{DietListe} </tbody>
                  </table>
                </Form>
              </CardBody>
            </Card>
          </Col>
          {/* formulaire vache */}

          <Col lg="7" className="mb-4">
            <Card small>
              <CardHeader className="border-bottom ">
                <Row>
                  <Col lg="9" className="mb-1">
                    <h6> Changer Regime</h6>
                  </Col>
                  <Col lg="3">
                    <Button
                      outline
                      pill
                      theme="success"
                      onClick={() => this.editDietFooder(0, '')}
                    >
                      <i
                        onClick={() => this.editing()}
                        className="material-icons"
                      >
                        close
                      </i>
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <EditFormDiet
                  submitFooderDiet={this.submitFooderDiet}
                  idDiet={idDiet}
                  annuler={this.annuler}
                  DietName={DietName}
                  add={this.addFooderDiet}
                  Fooder={this.state.Fooder}
                  FooderDiet={this.state.FooderDiet}
                  edit={this.editDF}
                  deleteFooderDiet={this.deleteFooderDiet}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* Default Light Table */}
      </Fragment>
    );
  };

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        {this.renderFooderDiet()}
      </Container>
    );
  }
}

export default reigmeView;
