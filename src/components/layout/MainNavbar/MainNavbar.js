/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Container, Navbar } from 'shards-react';

// import NavbarSearch from './NavbarSearch';
import NavbarToggle from './NavbarToggle';
import '../../../style/scrollerdesign.css';

import NavbarNav from './NavbarNav/NavbarNav';

class MainNavbar extends Component {
  state = {};

  render() {
    const classes = classNames(
      'main-navbar',
      'bg-white',
      this.props.stickyTop && 'sticky-top'
    );

    const buttonSlide = this.props.open ? (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        onClick={this.props.openSideBar}
        className="button_cont"
        align="center"
      >
        <b
          className="example_e"
          href="#"
          target="_blank"
          rel="nofollow noopener"
        >
          Menu agTEK
        </b>
      </div>
    ) : (
      <b />
    );

    return (
      <div className={classes}>
        <Container className="p-0">
          <Navbar type="light" className=" flex-md-nowrap p-0">
            <div className="main-navbar__search w-100 d-none d-md-flex d-lg-flex">
              <div seamless className="ml-3">
                {buttonSlide}

                <center />
              </div>
              <div className="d-table m-auto">
                <img
                  id="main-logo"
                  className="d-inline-block align-top mr-1"
                  style={{ maxWidth: '90px' }}
                  // eslint-disable-next-line global-require
                  src={require('../../../images/sygnet-agtek.png')}
                  alt="Shards Dashboard"
                />
              </div>
            </div>

            <NavbarNav />
            <NavbarToggle />
          </Navbar>
        </Container>
      </div>
    );
  }
}

MainNavbar.propTypes = {
  /**
   * The layout type where the MainNavbar is used.
   */
  // eslint-disable-next-line react/require-default-props
  layout: PropTypes.string,
  /**
   * Whether the main navbar is sticky to the top, or not.
   */
  stickyTop: PropTypes.bool
};

MainNavbar.defaultProps = {
  stickyTop: true
};

export default MainNavbar;
