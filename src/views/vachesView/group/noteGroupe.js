/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component, Fragment } from 'react';
import { FormTextarea, Row, Col, Card, CardBody } from 'shards-react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStickyNote,
  faTimes,
  faCheck
} from '@fortawesome/free-solid-svg-icons';

import Popover from 'react-tiny-popover';

import '../hover.css';
import '../../../style/scrollerdesign.css';
import '../../../style/scrollerdesign2.css';

class NoteGroup extends Component {
  state = {
    edit: false,
    group: [{ idGroupe: 0, GroupeName: '', note: '' }],

    change: {},
    GroupDiet: [],
    vachesState: [],
    visiblelisteVaches: false,

    hover: false,

    isPopoverOpen: false
  };

  /** *********show liste de vache a affecter ************** */

  renderActions = () => {
    const { isPopoverOpen } = this.state;

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
                placeholder="note du Groupe"
                defaultValue={this.props.detail.note}
                onChange={this.handleChange}
              />
              <Row>
                <Col lg="2" />

                <Col lg="5">
                  s
                  <center className="NoteChange">
                    <FontAwesomeIcon
                      onClick={() => {
                        this.props.editNoteGroup(
                          this.props.index,
                          this.state.change
                        );
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

  /** ***************************************************** */

  handleChange = e => {
    const { edit, group, change } = this.state;
    change[e.target.id] = e.target.value;
    this.setState({
      edit,
      group,
      change
    });
    console.log(this.state);
  };

  render() {
    return <Fragment>{this.renderActions()}</Fragment>;
  }
}

export default NoteGroup;
