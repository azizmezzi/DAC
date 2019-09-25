/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
/* eslint-disable radix */
/* eslint-disable no-alert */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
/* eslint-disable no-undef */
import React, { Component, Fragment } from 'react';
import { Container, Row } from 'shards-react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import MaterialTable from 'material-table';
import SlidingPane from 'react-sliding-pane';
import Modal from 'react-modal';
import USERForm from './USER/USERForm';

import PageTitle from '../../components/common/PageTitle';
import { Config } from '../../configue';
import USERRow2 from './USER/USERRow2';
import '../../style/scrollerdesign.css';
import '../../style/scrollerdesign2.css';

class ProfileView extends Component {
  state = {
    isPaneOpen: false,
    USER: []
  };

  componentDidMount = () => {
    Modal.setAppElement('body');

    this.getUSER().then(USER => {
      console.log('USER.data');
      console.log(USER.data);
      this.setState({
        USER: USER.data
      });
    });
  };

  getUSER = () => {
    const datas = fetch(`${Config.url}/User`)
      .then(reponse => {
        return reponse.json();
        // })
        // .then(({ data }) => {
      })
      .catch(err => console.error(err));
    console.log(datas);

    return datas;
  };

  editUSER = (index, change) => {
    const { USER } = this.state;
    const USERs = USER[index];
    for (const i in change) {
      USERs[i] = change[i];
    }
    this.updateMethodeUSER(USERs);

    this.setState({
      USER
    });
  };

  deleteUSER = index => {
    const { USER } = this.state;
    const USERDeleted = USER[index];

    USER.splice(index, 1);
    this.setState({ USER });
    this.deleteMethodeUSER(USERDeleted.idUSER);
  };

  addUSER = (a, idUSER) => {
    const { USER } = this.state;
    a.idUSER = idUSER;
    USER.push(a);
    this.setState({
      isPaneOpen: false,
      isPopoverOpen: !this.state.isPopoverOpen,
      USER
    });
  };

  RoleMethode = a => {
    switch (a) {
      case 0:
        return 'agriculteur';
      case 1:
        return 'ingenieur';
      case 2:
        return 'ouvrier';
      default:
        break;
    }
  };

  deleteMethodeUSER(a) {
    const encodedKeyids = encodeURIComponent('ids');

    const encodedvalids = encodeURIComponent(a);

    const formbody = [`${encodedKeyids}=${encodedvalids}`];

    fetch(`${Config.url}/User/delete`, {
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

  updateMethodeUSER(a) {
    const encodedKeyid = encodeURIComponent('idUSER');
    const encodedKeyname = encodeURIComponent('USERName');
    const encodedKeypassword = encodeURIComponent('password');
    const encodedKeyRole = encodeURIComponent('Role');

    const encodedvalid = encodeURIComponent(a.idUSER);
    const encodedvalname = encodeURIComponent(a.USERName);
    const encodedvalpassword = encodeURIComponent(a.password);
    const encodedvalRole = encodeURIComponent(parseInt(a.Role));

    let formbody = [
      `${encodedKeyid}=${encodedvalid}`,
      `${encodedKeyname}=${encodedvalname}`,
      `${encodedKeypassword}=${encodedvalpassword}`,
      `${encodedKeyRole}=${encodedvalRole}`
    ];
    formbody = formbody.join('&');

    fetch(`${Config.url}/User/update`, {
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

  renderActionF2 = () => {
    return (
      <Fragment>
        {/* Page Header */}

        <Row>
          <h4> Ajouter USER</h4>
        </Row>
        <br />
        <br />
        <br />

        <USERForm USER={this.state.USER} addUSER={this.addUSER} />

        {/* Default Light Table */}
      </Fragment>
    );
  };

  render() {
    const { USER } = this.state;

    const USERListe2 = USER.map((valeur, index) => {
      const v = {
        id: index,
        name: valeur.USERName,
        password: valeur.password,

        role: this.RoleMethode(valeur.Role),

        actions: (
          <USERRow2
            detail={valeur}
            key={index}
            index={index}
            edit={this.editUSER}
            delete={this.deleteUSER}
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
        title: 'Nom ',
        field: 'name',
        headerStyle: { zIndex: 0 }
      },
      {
        title: 'Mote de passe',
        field: 'password',
        headerStyle: { zIndex: 0 }
      },

      {
        title: 'Role',
        field: 'role',
        headerStyle: { zIndex: 0 }
      },
      {
        title: 'actions',
        field: 'actions',
        headerStyle: { zIndex: 0 }
      }
    ];

    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            title=" Page Des USER"
            subtitle="agTEK"
            className="text-sm-left mb-3"
          />
        </Row>

        <MaterialTable
          columns={columns}
          data={USERListe2}
          title={
            <Row>
              <center>
                <a
                  onClick={() =>
                    this.setState({ isPaneOpen: !this.state.isPaneOpen })
                  }
                  className="AddButton"
                >
                  <center>
                    Liste des Profiles &nbsp; &nbsp;
                    <FontAwesomeIcon size="lg" icon={faPlus} />
                  </center>
                </a>
              </center>
            </Row>
          }
          options={{
            columnsButton: true,
            maxBodyHeight: '50vh'
          }}
        />
        <SlidingPane
          className="some-custom-class"
          overlayClassName="some-custom-overlay-class"
          isOpen={this.state.isPaneOpen}
          title="Fermer"
          subtitle="Fermer ajout de Regime."
          width="50%"
          onRequestClose={() => {
            this.setState({
              isPaneOpen: false
            });

            // triggered on "<" on left top click or on outside click
          }}
        >
          {this.renderActionF2()}
        </SlidingPane>
      </Container>
    );
  }
}

export default ProfileView;
