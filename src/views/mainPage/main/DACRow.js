import React, { Component, Fragment } from 'react';
import { FormInput, ButtonGroup, Button ,Progress , CardBody ,Card} from "shards-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faWrench, faExclamationTriangle, faTimesCircle, faCheckCircle
    , faTrash, faPencilAlt
} from '@fortawesome/free-solid-svg-icons'
import './../../mainPage/style.css'
import "../../../style/scrollerdesign.css";
import "../../../style/scrollerdesign2.css";
import Popover , { ArrowContainer } from 'react-tiny-popover'

class DACRow extends Component {
    state = {
        DAC: [],
        isPopoverOpen: false

    }
    DACStateMethode = (a) => {
        switch (a) {
            case 0: return (<FontAwesomeIcon size="lg" icon={faCheckCircle} className='heartbeat' />)
            case 1: return (<FontAwesomeIcon size="lg" icon={faTimesCircle} className='pulsate-fwd' />)
            case 2: return (<FontAwesomeIcon size="lg" icon={faExclamationTriangle} className='warrning' />)
            case 3: return (<FontAwesomeIcon size="lg" icon={faWrench} flip="vertical" spin />)


        }
    }
  
    ProgressStyle = (a) => {
        switch (a) {
            case 0: return ("")
            case 1: return ("danger")
            case 3: return ("info")
            case 2: return ("warning")


        }
    }
    renderActions = () => {
        const isPopoverOpen = this.state.isPopoverOpen

        const DACState = this.props.detail.DACstate
        const DACStateListe = this.DACStateMethode(DACState)
        const ProgressStyle = this.ProgressStyle(DACState)
        return (

            <tr>

                <td className="td2"><center>{this.props.detail.DACName}</center></td>
                <td className="td2"><center>{this.props.detail.Quantity}</center></td>

                <td className="td2"><center>
                <Popover
                            isOpen={isPopoverOpen}
                            position={['top', 'right', 'left', 'bottom']}
                            padding={10}
                            onClickOutside={() => this.setState({ isPopoverOpen: false })}
                            content={({ position, targetRect, popoverRect }) => (
                                <ArrowContainer // if you'd like an arrow, you can import the ArrowContainer!
                                position={position}
                                targetRect={targetRect}
                                popoverRect={popoverRect}
                                arrowColor={'#d3d3d3'}
                                arrowSize={14}
                                arrowStyle={{ opacity: 0.7 }}
                                >
                                <Card small className="mb-4">
                                <CardBody className="p-0 pb-3">
                                    <div
                          
                                        onClick={() => this.setState({ isPopoverOpen: !isPopoverOpen })}
                                    >
                                        message {position}.
                                    </div></CardBody></Card>
                                </ArrowContainer>
                            )}
                        >
                            <div
                                onMouseEnter={() => this.setState({ isPopoverOpen: true })}
                                onMouseUp={() => this.setState({ isPopoverOpen: true })}
                                onMouseLeave={() => this.setState({ isPopoverOpen: false })}

                            >

                                {DACStateListe}

                            </div>
                        </Popover>
            
                </center></td>
                <td className="td2">
                    <center>
                        <Progress
                            striped
                            animated
                            theme={ProgressStyle}
                            style={{ height: "5px" }}
                            className="mb-3"
                            value={this.props.detail.Progress}
                        />                    </center>
                </td>
            </tr>

        );
    }

    render() {


        return (

            <Fragment>
                {this.renderActions()}

            </Fragment>

        );
    }
}

export default DACRow;
