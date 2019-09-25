/* eslint-disable react/destructuring-assignment */
import React from "react";
import PropTypes from "prop-types";
import { Navbar, NavbarBrand,} from "shards-react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowLeft

} from '@fortawesome/free-solid-svg-icons'

import { Dispatcher, Constants } from "../../../flux";
import '../../../style/scrollerdesign.css'

class SidebarMainNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.handleToggleSidebar = this.handleToggleSidebar.bind(this);
  }

  state = {
    // eslint-disable-next-line react/no-unused-state
    isOpen: false,
    hover: false
  }

  // eslint-disable-next-line class-methods-use-this
  handleToggleSidebar() {

    Dispatcher.dispatch({
      actionType: Constants.TOGGLE_SIDEBAR
    });
  }

  render() {

    // const { hideLogoText } = this.props;
    return (
      <div className="main-navbar"

      >
        <Navbar
          className="align-items-stretch bg-white flex-md-nowrap border-bottom p-0"
          type="light"
        >
          <NavbarBrand
            onMouseEnter={() => { this.setState({ hover: true }) }}
            onMouseLeave={() => { this.setState({ hover: false }) }}  
            className={this.state.hover ? "shadow-drop-2-center w-100 mr-0" : " w-100 mr-0"}

            href="#"
            onClick={this.props.openSideBar}
            style={{ lineHeight: "95px" }}
          >
            <div
              className=" d-table m-auto r" 

            >
              <img
                className="d-inline-block align-top mr-1"

                id="main-logo"
                style={{ maxWidth: "40px" }}
                // eslint-disable-next-line global-require
                src={require("../../../images/logo3.jpg")}
                alt="Shards Dashboard"
              />
            </div>
          </NavbarBrand>
          {/* eslint-disable-next-line */}
          <a
            className="toggle-sidebar d-sm-inline d-md-none d-lg-none"
            onClick={this.handleToggleSidebar}
          >
            <FontAwesomeIcon size="lg" icon={faArrowLeft} />
          </a>
        </Navbar>
      </div>
    );
  }
}

SidebarMainNavbar.propTypes = {
  /**
   * Whether to hide the logo text, or not.
   */
  // eslint-disable-next-line react/no-unused-prop-types
  hideLogoText: PropTypes.bool
};

SidebarMainNavbar.defaultProps = {
  hideLogoText: false
};

export default SidebarMainNavbar;
