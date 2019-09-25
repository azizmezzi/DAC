/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component, Fragment } from 'react';
import { FormTextarea, Row, Col, Card, CardBody } from 'shards-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faCheck,
  faStickyNote
} from '@fortawesome/free-solid-svg-icons';

import Popover from 'react-tiny-popover';
import 'rodal/lib/rodal.css';
import '../../../style/scrollerdesign.css';
import '../../../style/scrollerdesign2.css';
import '../hover.css';

class NoteVache extends Component {
  state = {
    edit: false,
    vache: [{ id: 0, name: '', DateCow: '', weight: '', type: '' }],
    change: {}
  };

  renderActions = () => {
    const { isPopoverOpen, change } = this.state;
    const { detail, editnoteVache, index } = this.props;
    return (
      <Popover
        isOpen={isPopoverOpen}
        onClickOutside={() => this.setState({ isPopoverOpen: false })}
        position="right" // preferred position
        content={
          <Card>
            <CardBody className="p-3 pb-3">
              <div
                style={{ opacity: 0.7 }}
                onClick={() => this.setState({ isPopoverOpen: !isPopoverOpen })}
              />
              <br />
              <FormTextarea
                className="note"
                size="lg"
                cols="90"
                rows="18"
                id="note"
                type="text"
                placeholder="note du Vache"
                defaultValue={detail.note}
                onChange={this.handleChange}
              />
              <Row>
                <Col lg="2" />

                <Col lg="5">
                  <center className="NoteChange">
                    <FontAwesomeIcon
                      onClick={() => {
                        editnoteVache(index, change);
                        this.setState({ isPopoverOpen: !isPopoverOpen });
                      }}
                      size="lg"
                      icon={faCheck}
                    />
                  </center>
                </Col>
                <Col lg="4">
                  <center className="NoteChange">
                    <FontAwesomeIcon
                      onClick={() =>
                        this.setState({ isPopoverOpen: !isPopoverOpen })
                      }
                      size="lg"
                      icon={faTimes}
                    />
                  </center>
                </Col>
              </Row>
            </CardBody>
          </Card>
        }
      >
        <div
          className="NoteChange"
          onClick={() => this.setState({ isPopoverOpen: !isPopoverOpen })}
        >
          <FontAwesomeIcon size="lg" icon={faStickyNote} />
          <br />
        </div>
      </Popover>
    );
  };

  /** **********************COW & DIET **************** */

  /** ******************************************************* */
  handleChange = e => {
    const { edit, vache, change } = this.state;
    change[e.target.id] = e.target.value;

    this.setState({
      edit,
      vache,
      change
    });
  };

  render() {
    return <Fragment>{this.renderActions()}</Fragment>;
  }
}

export default NoteVache;
