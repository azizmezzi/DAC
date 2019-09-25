import React, { Component, Fragment } from 'react';
import { FormInput, ButtonGroup, Button, FormSelect } from "shards-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faWrench, faExclamationTriangle, faTimesCircle, faCheckCircle
    , faTrash, faPencilAlt
} from '@fortawesome/free-solid-svg-icons'
import './../../mainPage/style.css'
class USERRow extends Component {
    state = {
        edit: false,
        USER: [],
        change: {}
    }
    RoleMethode = (a) => {
        switch (a) {
            case 0: return (<td className="td2">Admin</td>)
            case 1: return (<td className="td2">user</td>)
            case 2: return (<td className="td2">simple user</td>)


        }
    }

    renderActions = () => {
        const Role = this.props.detail.Role
        const RoleListe = this.RoleMethode(Role)

        return (

            <tr>

                <td className="td2">{this.props.detail.USERName}</td>


                {RoleListe}


                <td className="td2">
                    <ButtonGroup>
                        <Button outline pill theme="success" onClick={() => this.editing()} >
                            <FontAwesomeIcon size="lg" icon={faPencilAlt} />
                        </Button>
                        <Button outline pill theme="danger" onClick={() => { this.props.delete(this.props.index) }} >
                            <FontAwesomeIcon size="lg" icon={faTrash} />
                        </Button>

                    </ButtonGroup></td>
            </tr>

        );
    }
    editing = () => {
        let { edit, USER } = this.state;
        console.log(this.state);
        this.setState({
            edit: !edit, USER
        });
        console.log({ edit });

    }
    handleChange = (e) => {
        let { edit, USER, change } = this.state
        if (e.target.id == "Role") {
            change[e.target.id] = parseInt(e.target.value)
        } else
            change[e.target.id] = e.target.value


        this.setState({
            edit: edit,
            USER: USER,
            change: change
        })
        console.log(this.state)
    }
    onEdit = (e) => {
        e.preventDefault();

        let change = this.state.change
        console.log("change :")
        console.log(change)
        this.props.edit(this.props.index, change);
        this.editing();
    }
    anuuler=(e)=>{
        e.preventDefault();
        this.editing();
    }
    renderUpdate = () => {

        return (

            <tr>

                <td className="td2" ><FormInput type="text" onChange={this.handleChange}
                 ref="USERName" defaultValue={this.props.detail.USERName} id='USERName' /></td>


                <td className="td2">
                    <FormSelect id="Role" defaultValue={this.props.detail.Role} onChange={this.handleChange} >
                        <option value="0" selected>Admin</option>

                        <option value="1" >user</option>
                        <option value="2">super user</option>

                    </FormSelect>
                </td>

                <td className="td2">    <ButtonGroup size="sm">
                    <Button outline pill theme="primary" onClick={this.onEdit} >
                        <i className="material-icons bg">done</i>

                    </Button>
                    <Button outline pill theme="danger" onClick={this.anuuler} >
                        <i className="material-icons bg">close</i>

                    </Button>

                </ButtonGroup>
                </td>


            </tr>

        )

    }
    render() {
        let { edit } = this.state;

        return (

            <Fragment>
                {edit ? this.renderUpdate() : this.renderActions()}

            </Fragment>

        );
    }
}

export default USERRow;
