/* eslint-disable consistent-return */
/* eslint-disable react/no-string-refs */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable block-scoped-var */
/* eslint-disable react/no-array-index-key */
/* eslint-disable prefer-destructuring */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable eqeqeq */
/* eslint-disable no-console */
/* eslint-disable prefer-const */
/* eslint-disable no-plusplus */
/* eslint-disable react/destructuring-assignment */
import React, { Component, Fragment } from 'react';
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  Button
} from 'shards-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faRedo } from '@fortawesome/free-solid-svg-icons';
import { NotificationManager } from 'react-notifications';
import DietEdit from './Dietcreate/DietEdit';
import FormdietEdit from './Dietcreate/FormdietEdit';
import '../../../style/scrollerdesign.css';
import '../../../style/scrollerdesign2.css';

class EditFormDiet extends Component {
  state = {
    idUser: 0,
    Role: 2,
    deleteFooderDiets: [],
    idDiet: 0,
    FooderDiet: [],
    FooderDietAdd: [],
    index: 0,
    DietName: this.props.DietName,
    InvalidDietName: false,
    validDietName: false
  };

  componentDidMount() {
    const { FooderDiet } = this.props;
    this.setState({
      FooderDiet
    });
    const idUser = localStorage.getItem('idUser');
    const Role = localStorage.getItem('Role');
    this.setState({
      // eslint-disable-next-line radix
      Role: parseInt(Role),
      // eslint-disable-next-line radix
      idUser: parseInt(idUser)
    });
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  Submiting = e => {
    e.preventDefault();
    this.props.add(this.state);
    this.postMethode(this.state).then(d => {
      const { FooderDiet } = this.state;
      const leng = FooderDiet.length;
      for (let i = 0; i < leng; i++) {
        this.postMethodeFooderDiet(FooderDiet[i], d.data);
      }
      this.setState({
        idDiet: 0,
        DietName: '',
        FooderDiet: []
      });
    });
  };

  edit = (index, change) => {
    this.props.edit(index, change);
  };

  deleteFooderDiet = index => {
    const { deleteFooderDiets } = this.state;
    deleteFooderDiets.push(index);
    this.setState({
      deleteFooderDiets
    });
    this.props.deleteFooderDiet(index);
  };

  add = a => {
    this.props.add(a);
  };

  handleChange2 = e => {
    let { edit, Diet, DietName } = this.state;
    DietName = e.target.value;

    this.setState({
      edit,
      Diet,
      DietName
    });
    console.log(this.state);
  };

  render() {
    const { FooderDiet } = this.props;

    const FooderDietListe = FooderDiet.map((valeur, index) => {
      const { Fooder } = this.props;
      const lengthF = Fooder.length;
      console.log(lengthF);

      for (let i = 0; i < lengthF; i++) {
        if (Fooder[i].idFooder == valeur.idFooder) {
          var FooderName = Fooder[i].FooderName;
        }
      }
      return (
        <DietEdit
          key={index}
          index={index}
          detail={valeur}
          edit={this.edit}
          FooderName={FooderName}
          deleteFooderDiet={this.deleteFooderDiet}
          Fooder={this.props.Fooder}
        />
      );
    });

    return (
      <ListGroup flush>
        <ListGroupItem className="p-3">
          <Row>
            <Col>
              <Form
                onSubmit={e => {
                  e.preventDefault();
                  if (this.state.DietName == '') {
                    this.setState({
                      validDietName: true,
                      InvalidDietName: false
                    });
                  } else
                    this.setState({
                      validDietName: false,
                      InvalidDietName: true
                    });
                  let unicite = false;
                  const { oldDiet } = this.props;

                  if (this.state.DietName != '') {
             
                    // eslint-disable-next-line array-callback-return
                    const oldDiets = oldDiet.filter(oldFood => {
                      if (oldFood.DietName === this.state.DietName)
                        return oldFood;
                    });

                    if (oldDiets.length > 0) {
                      if (
                        oldDiets.length === 1 &&
                        oldDiets[0].idDiet === this.props.idDiet
                      ) {
                        unicite = true;
                      } else {
                        NotificationManager.error('Nom existant', '', 3000);
                      }
                    } else {
                      unicite = true;
                    }
                  }
                  if (this.state.DietName != '' && unicite) {
                    this.props.submitFooderDiet(
                      e,
                      this.state.DietName,
                      this.props.idDiet
                    );
                  }
                }}
              >
                <Row form>
                  <Col md="6" className="form-group">
                    <label htmlFor="DietName">Nom de Regime</label>
                    <FormInput
                      type="text"
                      disabled={this.state.Role === 2}
                      onChange={this.handleChange2}
                      ref="DietName"
                      defaultValue={this.props.DietName}
                      valid={this.state.InvalidDietName}
                      invalid={this.state.validDietName}
                      id="DietName"
                    />
                  </Col>
                </Row>

                <table className="table mb-0">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col" className="border-0 th2">
                        Aliment
                      </th>
                      <th scope="col" className="border-0  th2">
                        Quantite par jour
                      </th>
                      <th scope="col" className="border-0 th2">
                        Portion
                      </th>
                      <th scope="col" className="border-0 th2">
                        Priorité
                      </th>
                      <th scope="col" className="border-0" />
                    </tr>
                  </thead>
                  <tbody>
                    {FooderDietListe}
                    {this.state.Role === 2 ? (
                      <Fragment />
                    ) : (
                      <FormdietEdit Fooder={this.props.Fooder} add={this.add} />
                    )}
                  </tbody>
                </table>
                <Row form>
                  <Col />
                  <Col className="form-group">
                    <br />
                    <center>
                      <Button
                        outline
                        pill
                        theme="danger"
                        onClick={() =>
                          this.props.annuler(
                            this.props.idDiet,
                            this.props.DietName
                          )
                        }
                      >
                        <FontAwesomeIcon size="lg" icon={faRedo} />
                      </Button>
                      &nbsp; &nbsp;&nbsp; &nbsp;
                      <Button outline pill theme="primary" type="submit">
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
          <Row />
        </ListGroupItem>
      </ListGroup>
    );
  }
}

export default EditFormDiet;
