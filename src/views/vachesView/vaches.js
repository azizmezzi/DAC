/* eslint-disable radix */
/* eslint-disable guard-for-in */
/* eslint-disable eqeqeq */
/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable prefer-destructuring */
/* eslint-disable block-scoped-var */
/* eslint-disable no-redeclare */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import React, { Component, Fragment } from 'react';
import { Container, Row, Col } from 'shards-react';
import SlidingPane from 'react-sliding-pane';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import MaterialTable from 'material-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {
  NotificationContainer,
  NotificationManager
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import RowVache2 from './vache/rowVache2';
import NoteVache from './vache/noteVache';
import RowGroup2 from './group/rowGroupe2';
import NoteGroupe from './group/noteGroupe';
import FormVache from './vache/formVache';
import FormGroupv from './group/fromGroup';
import PageTitle from '../../components/common/PageTitle';
import '../../style/scrollerdesign.css';
import '../../style/scrollerdesign2.css';
import { Config } from '../../configue';
import './hover.css';

class Vaches extends Component {
  state = {
    idUser: 0,
    Role: 2,
    lastGroup: 0,
    edit: false,
    editCow: false,
    vache: [],
    group: [],
    Diet: [],
    isPaneOpen: false,
    isPaneOpen2: true,
    isPaneOpenLeft: false,
    vacheFiltredCompare: [],
    CowDiet: [],
    GroupDiet: [],
    compareListe: [],
    clicked: false,
    CowGroupFilter: [],
    GroupDietFilter: [],
    vacheFiltred: ['a'],
    DietCowS: []
  };

  /** ********************non utiliser********************** */

  componentDidMount() {
    // eslint-disable-next-line global-require
    require('events').EventEmitter.defaultMaxListeners = 0;
    this.getVaches().then(vaches => {
      this.setState({
        vache: vaches.data
      });
    });
    this.getGroupe().then(groups => {
      this.setState({
        group: groups.data
      });
      const group = groups.data;
      const lastone = group[group.length - 1];
      const lastGroup = lastone.idGroupe;
      this.setState({
        lastGroup
      });
    });
    this.getDiet().then(Diet => {
      this.setState({
        Diet: Diet.data
      });
    });

    this.getCowGroup2().then(GroupCow => {
      const GroupCows = GroupCow.data;

      this.setState({ CowGroupFilter: GroupCows });
    });
    this.getDietGroup2().then(GroupDiet => {
      this.setState({
        GroupDietFilter: GroupDiet.data
      });
    });
    this.getDietCow2().then(DietCow => {
      this.setState({
        DietCowS: DietCow.data
      });
    });
    const idUser = localStorage.getItem('idUser');
    const Role = localStorage.getItem('Role');
    this.setState({
      Role: parseInt(Role),
      idUser: parseInt(idUser)
    });
  }

  getCowGroup = idGroup => {
    const url = `${Config.url}/GroupCow?idGroupe=`;
    // eslint-disable-next-line no-undef
    const datas = fetch(url + idGroup)
      .then(reponse => {
        return reponse.json();
        // })
      })
      // eslint-disable-next-line no-console
      .catch(err => console.error(err));

    return datas;
  };

  getDietGroup = idGroup => {
    const url = `${Config.url}/DietGroup?idGroup=`;
    // eslint-disable-next-line no-undef
    const datas = fetch(url + idGroup)
      .then(reponse => {
        return reponse.json();
        // })
      })
      // eslint-disable-next-line no-console
      .catch(err => console.error(err));

    return datas;
  };
  /** ********************** vache & group ***************************** */

  getCowGroup2 = () => {
    const url = `${Config.url}/GroupCow/All`;
    // eslint-disable-next-line no-undef
    const datas = fetch(url)
      .then(reponse => {
        return reponse.json();
        // })
      })
      // eslint-disable-next-line no-console
      .catch(err => console.error(err));

    return datas;
  };

  getDietCow2 = () => {
    const url = `${Config.url}/DietCow/All`;
    // eslint-disable-next-line no-undef
    const datas = fetch(url)
      .then(reponse => {
        return reponse.json();
        // })
      })
      // eslint-disable-next-line no-console
      .catch(err => console.error(err));

    return datas;
  };

  getFiltredCow = (GroupDiet, vacheFiltred) => {
    const post = JSON.stringify({
      GroupDiet: JSON.stringify(GroupDiet),
      vacheFiltred: JSON.stringify(vacheFiltred)
    });
    const url = `${Config.url}/DietCow/Compare?post=`;
    // eslint-disable-next-line no-undef
    const datas = fetch(url + post)
      .then(reponse => {
        return reponse.json();
      })
      // eslint-disable-next-line no-console
      .catch(err => console.error(err));

    return datas;
  };

  getDietGroup2 = () => {
    const url = `${Config.url}/DietGroup/All`;
    // eslint-disable-next-line no-undef
    const datas = fetch(url)
      .then(reponse => {
        return reponse.json();
        // })
      })
      // eslint-disable-next-line no-console
      .catch(err => console.error(err));

    return datas;
  };

  editing = () => {
    const { edit, vache, group } = this.state;
    this.setState({
      edit: !edit,
      vache,
      group
    });
  };

  editingCow = () => {
    const { editCow, vache, group } = this.state;
    this.setState({
      editCow: !editCow,
      vache,
      group
    });
  };

  compareDiets = (CowDiet, GroupDiet) => {
    const temp = [];
    const array1 = [];
    const array2 = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < GroupDiet.length; i++) {
      const str = `${GroupDiet[i].idDiet +
        GroupDiet[i].begin +
        GroupDiet[i].end}`;
      array1.push(str);
    }
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < CowDiet.length; i++) {
      const str2 = `${CowDiet[i].idDiet + CowDiet[i].begin + CowDiet[i].end}`;
      array2.push(str2);
    }
    // eslint-disable-next-line no-restricted-syntax
    for (const i in array1) {
      if (array2.indexOf(array1[i]) === -1) temp.push(array1[i]);
    }
    // eslint-disable-next-line no-restricted-syntax
    for (const i in array2) {
      if (array1.indexOf(array2[i]) === -1) temp.push(array2[i]);
    }

    // eslint-disable-next-line vars-on-top
    let result = false;
    // eslint-disable-next-line eqeqeq
    if (temp.length == 0) {
      result = true;
    }
    const compare = { id: CowDiet[0].idCow, result };
    return compare;
  };

  FilterCow = idGroupe => {
    if (idGroupe === 0) {
      this.setState({
        vacheFiltred: []
      });
    } else {
      const { CowGroupFilter } = this.state;

      // eslint-disable-next-line consistent-return
      const v = CowGroupFilter.filter(CowGroupe => {
        if (CowGroupe.idGroupe === idGroupe) return CowGroupe;
      });
      const vacheFiltred = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < v.length; i++) {
        vacheFiltred.push(v[i].idVache);
      }
      this.setState({
        vacheFiltred
      });
      const { GroupDietFilter } = this.state;

      const GroupDiet = GroupDietFilter.filter(GroupDiet => {
        if (GroupDiet.idGroup === idGroupe) return GroupDiet;
      });

      const { DietCowS } = this.state;
      const result = [];
      for (let i = 0; i < vacheFiltred.length; i++) {
        const DietCow = DietCowS.filter(DietCow => {
          if (DietCow.idCow === vacheFiltred[i]) return DietCow;
        });
        result.push({
          idCow: vacheFiltred[i],
          result: this.compareDietsGroupe(DietCow, GroupDiet)
        });
      }

      this.setState({
        vacheFiltredCompare: result
      });
    }
  };

  compareDietsGroupe = (CowDiet, GroupDiet) => {
    const temp = [];
    const array1 = [];
    const array2 = [];
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

    // eslint-disable-next-line block-scoped-var
    for (var i in array1) {
      // eslint-disable-next-line block-scoped-var
      if (array2.indexOf(array1[i]) === -1) temp.push(array1[i]);
    }
    // eslint-disable-next-line no-redeclare
    // eslint-disable-next-line block-scoped-var
    for (var i in array2) {
      // eslint-disable-next-line block-scoped-var
      if (array1.indexOf(array2[i]) === -1) temp.push(array2[i]);
    }

    if (temp.length === 0) {
      var result = true;
    } else {
      var result = false;
    }
    return result;
  };

  renderGroupCow2 = () => {
    // eslint-disable-next-line react/destructuring-assignment
    const vaches = this.state.vache;

    const { isPaneOpen, isPaneOpenLeft, isPaneOpen2 } = this.state;
    // eslint-disable-next-line react/destructuring-assignment
    const vacheFiltred1 = this.state.vacheFiltred;
    if (vacheFiltred1.length === 0) {
      // eslint-disable-next-line no-use-before-define
      vacheFilter = [];
    } else {
      let vacheFiltred = this.state.vacheFiltred;
      if (isPaneOpen2 === false) {
        vacheFiltred = ['a'];
      }

      var vacheFilter = vaches.filter(vache => {
        if (vacheFiltred[0] === 'a') {
          return vache;
        }
        if (vacheFiltred.indexOf(vache.id) !== -1) {
          // this.compare(vache.id)

          return vache;
        }
      });
    }
    if (isPaneOpen2 === false) {
      vacheFilter = vaches;
    }
    const vachesListe2 = vacheFilter.map((valeur, index) => {
      const { vacheFiltredCompare, vache, Diet, group } = this.state;
      const v = {
        idVache: valeur.id,
        name: valeur.name,
        vacheFiltredDiet: vacheFiltredCompare[index],
        note: (
          <NoteVache
            nonFiltre={vacheFiltred1.length === 0}
            vacheFiltredDiet={vacheFiltredCompare[index]}
            vaches={vache}
            Diet={Diet}
            isPaneOpen={isPaneOpen}
            detail={valeur}
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            index={index}
            delete={this.delete}
            edit={this.edit}
            group={group}
            editnoteVache={this.editnoteVache}
          />
        ),

        actions: (
          <RowVache2
            changeFilter={this.changeFilter}
            CowGroupFilter={this.state.CowGroupFilter}
            DietCowS={this.state.DietCowS}
            GroupDietFilter={this.state.GroupDietFilter}
            nonFiltre={vacheFiltred1.length === 0}
            vacheFiltredDiet={vacheFiltredCompare}
            vaches={this.state.vache}
            Diet={this.state.Diet}
            isPaneOpen={isPaneOpen}
            detail={valeur}
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            index={index}
            delete={this.delete}
            edit={this.edit}
            group={this.state.group}
            editnoteVache={this.editnoteVache}
          />
        )
      };
      return v;
    });
    const { vache, group } = this.state;

    const groupListe2 = group.map((valeur, index) => {
      const v = {
        idGroupe: valeur.idGroupe,
        name: valeur.GroupeName,
        note: (
          <NoteGroupe
            hover={this.state.hover}
            Diet={this.state.Diet}
            isPaneOpenLeft={isPaneOpenLeft}
            detail={valeur}
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            index={index}
            deleteGroupe={this.deleteGroupe}
            editGroup={this.editGroup}
            editNoteGroup={this.editNoteGroup}
            vaches={vache}
          />
        ),

        actions: (
          <RowGroup2
            changeFilter={this.changeFilter}
            CowGroupFilter={this.state.CowGroupFilter}
            DietCowS={this.state.DietCowS}
            GroupDietFilter={this.state.GroupDietFilter}
            hover={this.state.hover}
            Diet={this.state.Diet}
            isPaneOpenLeft={isPaneOpenLeft}
            detail={valeur}
            group={this.state.group}
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            index={index}
            deleteGroupe={this.deleteGroupe}
            editGroup={this.editGroup}
            vaches={vache}
          />
        )
      };
      return v;
    });
    const columnsGroupe = [
      {
        title: 'Nom Groupe',
        field: 'name',
        headerStyle: { zIndex: 0 }
      },

      {
        title: 'Note',
        field: 'note',
        headerStyle: { zIndex: 0 }
      },

      {
        title: 'actions',
        field: 'actions',
        headerStyle: { zIndex: 0 }
      }
    ];
    const columnsVache = [
      {
        title: 'Nom Vache',
        field: 'name',
        headerStyle: { zIndex: 0 }
      },

      {
        title: 'Note',
        field: 'note',
        headerStyle: { zIndex: 0 }
      },

      {
        title: 'actions',
        field: 'actions',
        headerStyle: { zIndex: 0 }
      }
    ];

    return (
      <Fragment>
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="GROUPE & VACHE"
            subtitle="agTEK"
            className="text-sm-left"
          />
        </Row>
        {/* tableau des vaches  */}
        <Row>
          {/** Groupe Table */}
          <Col lg="6" md="6" sm="12" className="mb-4">
            <MaterialTable
              columns={columnsGroupe}
              data={groupListe2}
              title={
                this.state.Role === 0 ? (
                  <Row>
                    <center>
                      <a
                        onClick={() => this.setState({ isPaneOpen: true })}
                        className="AddButton"
                      >
                        <center>
                          Groupe &nbsp;
                          <FontAwesomeIcon size="lg" icon={faPlus} />{' '}
                        </center>
                      </a>
                    </center>
                  </Row>
                ) : (
                  'Groupe'
                )
              }
              onRowClick={(event, rowData) => {
                this.setState({
                  // eslint-disable-next-line react/no-unused-state
                  clicked: true,
                  isPaneOpen2: true,
                  Rowid: rowData.idGroupe
                });
                this.FilterCow(rowData.idGroupe);
              }}
              actions={[
                {
                  icon: 'A',
                  tooltip: 'ALL',
                  isFreeAction: true,
                  onClick: () => {
                    this.changeFilter(false);
                  }
                }
              ]}
              options={{
                pageSize: 14,
                maxBodyHeight: '46vh',

                headerStyle: { zIndex: 0 },
                rowStyle: rowData => {
                  const Rowid = this.state.Rowid;

                  if (rowData.idGroupe === Rowid) {
                    return { backgroundColor: '#EEE' };
                  }
                }
              }}
              localization={{
                header: {
                  actions: '' // Actions
                },
                body: {
                  emptyDataSourceMessage: 'aucun Groupe' // No records to display
                }
              }}
            />
          </Col>
          <SlidingPane
            className="some-custom-class"
            overlayClassName="some-custom-overlay-class"
            isOpen={this.state.isPaneOpen}
            title="Fermer"
            subtitle="Fermer ajout de vache."
            width="50%"
            onRequestClose={() => {
              // triggered on "<" on left top click or on outside click
              this.setState({ isPaneOpen: false });
            }}
          >
            <FormGroupv
              group={this.state.group}
              lastGroup={this.state.lastGroup}
              Diet={this.state.Diet}
              add={this.add}
              vaches={vache}
            />
          </SlidingPane>

          {/** Cow table */}
          <Col lg="6" md="6" sm="12" className="mb-4">
            <MaterialTable
              columns={columnsVache}
              data={vachesListe2}
              title={
                this.state.Role === 0 ? (
                  <Row>
                    <center>
                      <a
                        onClick={() => this.setState({ isPaneOpenLeft: true })}
                        className="AddButton"
                      >
                        <center>
                          Vache &nbsp; &nbsp;
                          <FontAwesomeIcon size="lg" icon={faPlus} />{' '}
                        </center>
                      </a>
                    </center>
                  </Row>
                ) : (
                  'Vache'
                )
              }
              options={{
                pageSize: 14,
                maxBodyHeight: '46vh',
                columnsButton: true,

                rowStyle: rowData => {
                  const vacheFiltredDiet = this.state.vacheFiltredCompare;
                  const isPaneOpen2 = this.state.isPaneOpen2;

                  for (let j = 0; j < vacheFiltredDiet.length; j++) {
                    if (
                      rowData.idVache === vacheFiltredDiet[j].idCow &&
                      vacheFiltredDiet[j].result &&
                      isPaneOpen2
                    ) {
                      return { backgroundColor: '#EEE' };
                    }
                  }
                  return {};
                }
              }}
              localization={{
                header: {
                  actions: '' // Actions
                },
                body: {
                  emptyDataSourceMessage: 'aucune vache' // No records to display
                }
              }}
            />
          </Col>
          <NotificationContainer />
          <SlidingPane
            closeIcon={
              <div>
                <center>Ajouter une vache</center>
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
                <FormVache
                  Diet={this.state.Diet}
                  group={this.state.group}
                  vaches={this.state.vache}
                  addCow={this.addCow}
                />
              </Col>
            </Row>
          </SlidingPane>
        </Row>
      </Fragment>
    );
  };

  /** ******************************** vache *************************************** */
  //* * partie Vaches traitement */
  getVaches = () => {
    // eslint-disable-next-line no-undef
    const datas = fetch(`${Config.url}/vaches`)
      .then(reponse => {
        return reponse.json();
        // })
        // .then(({ data }) => {
      })
      // eslint-disable-next-line no-console
      .catch(err => console.error(err));

    return datas;
  };

  delete = index => {
    const { vache } = this.state;
    const vacheDeleted = vache[index];
    vache.splice(index, 1);
    this.setState({ vache });
    this.postMethode(vacheDeleted.id);
  };

  edit = (
    idCow,
    index,
    change,
    group,
    CowDiet,
    viewDietCow,
    GroupCow,
    DietCowEdited,
    visibleEditCow
  ) => {
    const { vache, GroupDietFilter, CowGroupFilter, DietCowS } = this.state;

    const GroupCow2 = CowGroupFilter.filter(GroupCow => {
      if (GroupCow.idVache !== idCow) return GroupCow;
    });

    for (let i = 0; i < GroupCow.length; i++) {
      GroupCow2.push(GroupCow[i]);
    }

    const GroupDiet1 = GroupDietFilter.filter(GroupDiet => {
      if (GroupDiet.idGroup === DietCowEdited) return GroupDiet;
    });
    const CowDiet2 = DietCowS.filter(DietCow => {
      if (DietCow.idCow !== idCow) return DietCow;
    });

    if (viewDietCow) {
      for (let i = 0; i < CowDiet.length; i++) {
        const idDiet = parseInt(CowDiet[i].idDiet);
        const begin = CowDiet[i].begin;
        const end = CowDiet[i].end;
        CowDiet2.push({ idDiet, idCow, begin, end });
      }
    } else {
      for (let i = 0; i < GroupDiet1.length; i++) {
        const idDiet = GroupDiet1[i].idDiet;
        const begin = GroupDiet1[i].begin;
        const end = GroupDiet1[i].end;
        CowDiet2.push({ idDiet, idCow, begin, end });
      }
    }
    /* const vacheNew = vache.map(value => {
      if (value.id === idCow) {
        for (const i in change) {
          value[i] = change[i];
        }
        return value
      };
    });
    */

    const vaches = vache.filter(value => {
      if (value.id === idCow) {
        console.log(idCow);
        console.log(value.id);
        return value;
      }
    });
    // eslint-disable-next-line guard-for-in
    const vach = vaches[0];
    for (const i in change) {
      vach[i] = change[i];
    }
    console.log(vach);

    NotificationManager.info(`vache Modifier : ${vach.name}`, '', 3000);

    this.updateMethode(vach, group, CowDiet, viewDietCow);

    this.setState({
      vache,
      CowGroupFilter: GroupCow2,
      DietCowS: CowDiet2,
      isPaneOpen2: visibleEditCow
    });
  };

  changeFilter = viewDietCow => {
    this.setState({
      isPaneOpen2: viewDietCow
    });
  };

  addCow = (a, id, isPaneOpenLeft, groupData) => {
    const { vache, GroupDietFilter, CowGroupFilter, DietCowS } = this.state;
    console.log('GroupDietFilter');
    console.log(GroupDietFilter);
    console.log('groupData');
    console.log(groupData);

    console.log('id');
    console.log(id);
    if (a.name != '') {
      for (let j = 0; j < groupData.length; j++) {
        if (groupData[j].existance) {
          CowGroupFilter.push({ idGroupe: groupData[j].idGroupe, idVache: id });
        }
        if (groupData[j].DietAffectation !== 0) {
          const GroupDiet = GroupDietFilter.filter(GroupDiete => {
            if (GroupDiete.idGroup === groupData[j].DietAffectation)
              return GroupDiete;
          });
          console.log('GroupDiet');
          console.log(GroupDiet);
          for (let K = 0; K < GroupDiet.length; K++) {
            const idDiet = GroupDiet[K].idDiet;
            const begin = GroupDiet[K].begin;
            const end = GroupDiet[K].end;
            DietCowS.push({ idDiet, idCow: id, begin, end });
          }
          var groupeAppratenirDiet = true;
        }
      }
      if (groupeAppratenirDiet == undefined) {
        if (a.CowDiet.length !== 0) {
          for (let p = 0; p < a.CowDiet.length; !p++) {
            var idDietCow = parseInt(a.CowDiet[p].idDiet);
            var beginCow = `${a.CowDiet[p].begin  }T00:00:00.000Z`
            var endCow = `${a.CowDiet[p].end  }T00:00:00.000Z`

            var v = {idCow : id , idDiet : idDietCow , begin : beginCow ,end :endCow }
            DietCowS.push(v);
            console.log('aaaaaaa')
            console.log(a.CowDiet[p])
          }
        }
      }
      console.log('groupeAppratenirDiet');
      console.log(DietCowS);
      NotificationManager.success(a.name, 'vache ajouter', 3000);

      // eslint-disable-next-line no-param-reassign
      a.id = id;
      vache.push(a);
      this.setState({
        vache,
        isPaneOpenLeft,
        DietCowS,
        CowGroupFilter
      });
    }
  };

  /** partie groupe traitement */

  add = (a, idGroupe, GroupDiet, vachesState) => {
    const {
      isPaneOpen2,
      group,
      GroupDietFilter,
      CowGroupFilter,
      DietCowS
    } = this.state;
    a.idGroupe = idGroupe;
    if (a.GroupeName != '') {
      console.log('******************************');
      console.log('GroupDietFilter');
      console.log(GroupDietFilter);
      console.log('DietCowS');
      console.log(DietCowS);

      console.log('******************************');

      const GroupDiet2 = GroupDietFilter.filter(GroupDiet => {
        if (GroupDiet.idGroup !== idGroupe) return GroupDiet;
      });

      for (let i = 0; i < GroupDiet.length; i++) {
        console.log('********************////');

        // eslint-disable-next-line no-param-reassign
        GroupDiet[i].idGroup = idGroupe;
        console.log('idGroupe');
        console.log(idGroupe);
        GroupDiet[i].idDiet = parseInt(GroupDiet[i].idDiet);
        GroupDiet[i].begin = `${GroupDiet[i].DateDebut}T23:00:00.000Z`;
        console.log('GroupDiet[i].begin');
        console.log(GroupDiet[i].begin);
        GroupDiet[i].end = `${GroupDiet[i].DateFin}T23:00:00.000Z`;
        console.log('GroupDiet[i].end');
        console.log(GroupDiet[i].end);
        console.log('********************////');

        GroupDiet2.push(GroupDiet[i]);
      }

      var oldCowDiet = [];
      for (let j = 0; j < vachesState.length; j++) {
        if (vachesState[j].DietAffectation) {
          oldCowDiet.push(vachesState[j].id);
        }
      }
      const DietCow = DietCowS.filter(DietCow => {
        for (let i = 0; i < oldCowDiet.length; i++) {
          if (DietCow.idCow == oldCowDiet[i]) return;
        }
        return DietCow;
      });

      for (let j = 0; j < vachesState.length; j++) {
        if (vachesState[j].existance) {
          CowGroupFilter.push({ idGroupe, idVache: vachesState[j].id });
        }

        if (vachesState[j].DietAffectation) {
          for (let K = 0; K < GroupDiet.length; K++) {
            const idDiet = parseInt(GroupDiet[K].idDiet);
            console.log('GroupDiet[K].DateDebut********');
            console.log(GroupDiet[K].DateDebut);
            const begin = `${GroupDiet[K].DateDebut}T23:00:00.000Z`;
            console.log('begin');
            console.log(`${begin}T23:00:00.000Z`);

            const end = `${GroupDiet[K].DateFin}T23:00:00.000Z`;
            console.log('end');
            console.log(`${GroupDiet[K].DateFin}T23:00:00.000Z`);

            DietCow.push({
              idDiet,
              idCow: vachesState[j].id,
              begin,
              end
            });
          }
        }
      }
      NotificationManager.success(a.GroupeName, 'Groupe ajouter', 3000);

      group.push(a);

      this.setState({
        group,
        isPaneOpen: !isPaneOpen2,
        GroupDietFilter: GroupDiet2,
        CowGroupFilter,
        DietCowS: DietCow
      });
    }
  };

  getGroupe = () => {
    // eslint-disable-next-line no-undef
    const datas = fetch(`${Config.url}/groupe`)
      .then(reponse => {
        return reponse.json();
      })
      .catch(err => console.error(err));

    return datas;
  };

  deleteGroupe = index => {
    // eslint-disable-next-line react/no-access-state-in-setstate
    const group = this.state.group;
    const groupDeleted = group[index];
    group.splice(index, 1);
    this.setState({ group });
    this.deleteGMethode(groupDeleted.idGroupe);
  };

  editGroup = (
    index,
    change,
    GroupDiet,
    idGroupe,
    GroupCow,
    DietCowEdited,
    // eslint-disable-next-line camelcase
    idGroupe_vachesNew,
    oldDietAffectation
  ) => {
    const {
      vache,
      group,
      GroupDietFilter,
      CowGroupFilter,
      DietCowS
    } = this.state;

    console.log('GroupDiet');
    console.log(GroupDiet);

    const GroupDiet2 = GroupDietFilter.filter(GroupDiet => {
      if (GroupDiet.idGroup != idGroupe) return GroupDiet;
    });

    for (let i = 0; i < GroupDiet.length; i++) {
      GroupDiet[i].idGroup = idGroupe;
      GroupDiet2.push(GroupDiet[i]);
    }

    const GroupCow2 = CowGroupFilter.filter(GroupCow => {
      if (GroupCow.idGroupe != idGroupe) return GroupCow;
    });
    for (let i = 0; i < GroupCow.length; i++) {
      GroupCow2.push(GroupCow[i]);
    }

    const DietCow = DietCowS.filter(DietCow => {
      for (let i = 0; i < oldDietAffectation.length; i++) {
        if (DietCow.idCow == oldDietAffectation[i]) return;
      }
      return DietCow;
    });
    const DietCow1 = DietCow.filter(DietCow2 => {
      for (let i = 0; i < DietCowEdited.length; i++) {
        if (DietCow2.idCow == DietCowEdited[i]) return;
      }
      return DietCow2;
    });

    for (let j = 0; j < DietCowEdited.length; j++) {
      for (let i = 0; i < GroupDiet.length; i++) {
        const idDiet = GroupDiet[i].idDiet;
        const begin = GroupDiet[i].begin;
        const end = GroupDiet[i].end;
        DietCow1.push({
          idDiet,
          idCow: DietCowEdited[j],
          begin,
          end
        });
      }
    }

    const groupe = group[index];
    for (const i in change) {
      groupe[i] = change[i];
    }

    NotificationManager.info(
      `Groupe Modifier : ${groupe.GroupeName}`,
      '',
      3000
    );

    this.setState({
      vache,
      group,
      GroupDietFilter: GroupDiet2,
      CowGroupFilter: GroupCow2,
      DietCowS: DietCow1
    });

    this.updateGMethode(groupe, idGroupe_vachesNew, GroupDiet, DietCowEdited);
  };

  editnoteVache = (index, change) => {
    const { vache } = this.state;
    const vaches = vache[index];
    for (const i in change) {
      vaches[i] = change[i];
    }
    this.updateVMethode(vaches);

    this.setState({
      vache
    });
  };

  editNoteGroup = (index, change) => {
    const { group } = this.state;
    const groups = group[index];
    for (const i in change) {
      groups[i] = change[i];
    }
    this.updateNoteGroupeMethode(groups);
    console.log(groups);
    this.setState({
      group
    });
  };

  /** ********************** vache & group ***************************** */
  getDiet = () => {
    const datas = fetch(`${Config.url}/Diet`)
      .then(reponse => {
        return reponse.json();
        // })
        // .then(({data}) => {
      })
      .catch(err => console.error(err));

    return datas;
  };

  // eslint-disable-next-line camelcase
  updateGMethode(a, idGroupe_vachesNew, GroupDiet, DietCowEdited) {
    const post = JSON.stringify({
      group: JSON.stringify(a),
      idGroupe_vachesNew: JSON.stringify(idGroupe_vachesNew),
      GroupDiet: JSON.stringify(GroupDiet),
      DietCowEdited: JSON.stringify(DietCowEdited)
    });

    // eslint-disable-next-line no-useless-concat
    const formbody = [`${'post' + '='}${post}`];

    fetch(`${Config.url}/groupe/update`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded' // <-- Specifying the Content-Type
      },
      body: formbody // <-- Post parameters
    }).catch(error => {
      console.error(error);
    });
  }

  updateVMethode(a) {
    const encodedKeyid = encodeURIComponent('id');

    const encodedKeynote = encodeURIComponent('note');

    const encodedvalid = encodeURIComponent(a.id);

    const encodedvalnote = encodeURIComponent(a.note);
    let formbody = [
      `${encodedKeyid}=${encodedvalid}`,

      `${encodedKeynote}=${encodedvalnote}`
    ];
    formbody = formbody.join('&');

    fetch(`${Config.url}/vaches/updateCow`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded' // <-- Specifying the Content-Type
      },
      body: formbody // <-- Post parameters
    })
      .then(response => response.json())
      .then(responseText => {
        console.log('responseText');
        console.log(responseText);
      })
      .catch(error => {
        console.error(error);
      });
  }

  updateNoteGroupeMethode(a) {
    const encodedKeyid = encodeURIComponent('id');

    const encodedKeynote = encodeURIComponent('note');

    const encodedvalid = encodeURIComponent(a.idGroupe);

    const encodedvalnote = encodeURIComponent(a.note);
    let formbody = [
      `${encodedKeyid}=${encodedvalid}`,

      `${encodedKeynote}=${encodedvalnote}`
    ];
    formbody = formbody.join('&');

    fetch(`${Config.url}/Groupe/updateGroupe`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded' // <-- Specifying the Content-Type
      },
      body: formbody // <-- Post parameters
    })
      .then(response => response.json())
      .then(responseText => {
        console.log('responseText2');
        console.log(responseText);
      })
      .catch(error => {
        console.error(error);
      });
  }

  deleteGMethode(a) {
    const encodedKeyids = encodeURIComponent('ids');

    const encodedvalids = encodeURIComponent(a);

    const formbody = [`${encodedKeyids}=${encodedvalids}`];

    fetch(`${Config.url}/groupe/delete`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formbody
    })
      .then(responseText => {
        console.log('responseText3');
        console.log(responseText);
      })
      .catch(error => {
        console.error(error);
      });
  }

  // eslint-disable-next-line class-methods-use-this
  updateMethode(a, group, CowDiet, viewDietCow) {
    const encodedKeyid = encodeURIComponent('id');
    const encodedKeyname = encodeURIComponent('name');
    const encodedKeynaiss = encodeURIComponent('DateCow');
    const encodedKeyweight = encodeURIComponent('weight');
    const encodedKeytype = encodeURIComponent('type');
    const encodedKeyCINCOW = encodeURIComponent('CINCOW');
    const encodedKeynote = encodeURIComponent('note');
    const encodedKeyFather = encodeURIComponent('Father');
    const encodedKeyMother = encodeURIComponent('Mother');
    const encodedKeygroup = encodeURIComponent('group');
    const encodedKeyCowDiet = encodeURIComponent('CowDiet');
    const encodedKeyviewDietCow = encodeURIComponent('viewDietCow');

    const encodedvalid = encodeURIComponent(a.id);
    const encodedvalname = encodeURIComponent(a.name);
    const encodedvalDateCow = encodeURIComponent(a.DateCow);
    const encodedweight = encodeURIComponent(a.weight);
    const encodedtype = encodeURIComponent(a.type);
    const encodedCINCOW = encodeURIComponent(a.CINCOW);
    const encodednote = encodeURIComponent(a.note);
    const encodedFather = encodeURIComponent(a.Father);
    const encodedMother = encodeURIComponent(a.Mother);
    const encodedviewDietCow = encodeURIComponent(viewDietCow);
    const encodedgroup = encodeURIComponent(JSON.stringify(group));
    const encodedCowDiet = encodeURIComponent(JSON.stringify(CowDiet));
    let formbody = [
      `${encodedKeyid}=${encodedvalid}`,
      `${encodedKeyname}=${encodedvalname}`,
      `${encodedKeynaiss}=${encodedvalDateCow}`,
      `${encodedKeyweight}=${encodedweight}`,
      `${encodedKeytype}=${encodedtype}`,
      `${encodedKeyCINCOW}=${encodedCINCOW}`,
      `${encodedKeynote}=${encodednote}`,
      `${encodedKeyFather}=${encodedFather}`,
      `${encodedKeyMother}=${encodedMother}`,
      `${encodedKeygroup}=${encodedgroup}`,
      `${encodedKeyviewDietCow}=${encodedviewDietCow}`,
      `${encodedKeyCowDiet}=${encodedCowDiet}`
    ];
    formbody = formbody.join('&');

    // eslint-disable-next-line no-undef
    const data = fetch(`${Config.url}/vaches/Edit`, {
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

  // eslint-disable-next-line class-methods-use-this
  postMethode(a) {
    const encodedKeyids = encodeURIComponent('ids');

    const encodedvalids = encodeURIComponent(a);

    const formbody = [`${encodedKeyids}=${encodedvalids}`];

    // eslint-disable-next-line no-undef
    fetch(`${Config.url}/vaches/delete`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded' // <-- Specifying the Content-Type
      },
      body: formbody // <-- Post parameters
    })
      .then(responseText => {
        // eslint-disable-next-line no-console
        console.log('responseText4');
        console.log(responseText);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  }

  /** *********************** RENDER ****************************** */
  render() {
    return (
      <Container fluid className="main-content-container px-4">
        {this.renderGroupCow2()}
      </Container>
    );
  }
}
export default Vaches;
