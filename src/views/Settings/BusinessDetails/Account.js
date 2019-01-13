import React, { Component } from 'react';
import {
  Row,
  Col,
  Nav,
  NavItem, 
  NavLink,
  TabContent,
  TabPane,
  Input
      } from 'reactstrap';
import classnames from 'classnames';

class Account extends Component {

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
        <div className="parent">
        <div className="account-header"><a>Details</a></div>
        <div className="account-divider"></div>
        <div className="account-full-name">
        <div className="full-name"><p>Edit Full Name</p><a>Your full name.</a></div>
        <div className="user-detail-input">
        <div className="first-name"><p>First Name</p><Input/></div>
        <div className="last-name"><p>Last Name</p><Input/></div>
        </div>
        </div>
        <div className="account-email">
        <div className="email"><p>Email Address</p><a>We send saving notifications to your confirmed email address.</a></div>
        <div className="email-address"><p>Email Address</p><Input/></div>
        </div>
        <div className="account-phone-number">
        <div className="phone-number"><p>Phone Number</p><a>We send sms verification messages to your phone number.</a></div>
        <div className="number"><p>Phone Number</p><Input/></div>
        </div>
        <div>

        </div>
        <button className="account-submit" >Save Changes</button>
        </div>
    );
  }
}

export default Account;
