import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { NavLink as RouteNavLink } from 'react-router-dom';
import { NavItem, NavLink } from 'shards-react';

const SidebarNavItem = ({ item, Role }) => (
  <NavItem>
    {Role < item.Role ? (
      <NavLink tag={RouteNavLink} to={item.to}>
        {item.htmlBefore && (
          <div
            className="d-inline-block item-icon-wrapper"
            dangerouslySetInnerHTML={{ __html: item.htmlBefore }}
          />
        )}
        {item.title && <span>{item.title}</span>}
        {item.htmlAfter && (
          <div
            className="d-inline-block item-icon-wrapper"
            dangerouslySetInnerHTML={{ __html: item.htmlAfter }}
          />
        )}
      </NavLink>
    ) : (
      <Fragment />
    )}
  </NavItem>
);

SidebarNavItem.propTypes = {
  /**
   * The item object.
   */
  item: PropTypes.object
};

export default SidebarNavItem;
