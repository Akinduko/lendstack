import React, { Component } from 'react';
import {
  Row,
  Col,
  Nav,
  NavItem, 
  NavLink,
  TabContent,
  TabPane
      } from 'reactstrap';
import classnames from 'classnames';
import Account from './Account'
import ChangePassword from './ChangePassword'

class Details extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {
    return (
      <div className="business-details-page">
 
        </div>
    );
  }
}

export default Details;
