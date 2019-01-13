import React, { Component } from 'react';
import {
  Input
      } from 'reactstrap';
import classnames from 'classnames';

class ChangePassword extends Component {

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
        <div className="change-password-header"><a>Login & Security</a></div>
        <div className="change-password-divider"></div>
        <div className="flex-group">
        <div className="change-password">
        <p>Password</p>
        <a>Please provide your current password and choose a new password.</a>
        </div>
        <div className="change-password-input-group">
        <div className="current-password">
          <a>Current Password</a>
          <Input/>
        </div>
        <div className="new-password">
          <a>New Password</a>
          <Input/>
        </div>
        <div className="retype-password">
          <a>Retype Password</a>
          <Input/>
        </div>
        </div>
        <button className="change-password-submit">CHANGE PASSWORD</button>
        </div>
        </div>
    );
  }
}

export default ChangePassword;
