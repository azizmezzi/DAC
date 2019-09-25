import React from 'react';
import { Nav } from 'shards-react';

import SidebarNavItem from './SidebarNavItem';
import { Store } from '../../../flux';

class SidebarNavItems extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Role:2,
      navItems: Store.getSidebarItems()
    };

    this.onChange = this.onChange.bind(this);
  }

  // eslint-disable-next-line react/sort-comp
  componentDidMount() {
    const idUser = localStorage.getItem('idUser');
    const Role = localStorage.getItem('Role');
    this.setState({
      Role: parseInt(Role),
      idUser: parseInt(idUser)
    });
  }

  componentWillMount() {
    Store.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    Store.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      ...this.state,
      navItems: Store.getSidebarItems()
    });
  }

  render() {
    const { navItems: items } = this.state;
    return (
      <div className="nav-wrapper">
        <Nav className="nav--no-borders flex-column">
          {items.map((item, idx) => (
            <SidebarNavItem Role={this.state.Role} key={idx} item={item} />
          ))}
        </Nav>
      </div>
    );
  }
}

export default SidebarNavItems;
