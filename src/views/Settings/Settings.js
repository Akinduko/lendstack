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

class Settings extends Component {

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
      <div className="settings">
      <div className="sidebar-nav-custom">
      <div className="side-header">SETTINGS</div>
      <div className="nav-custom">
      <div className="nav-item-custom"><a className="nav-link-custom " href="#/dashboard"><i className="nav-icon"></i>Profile</a></div>
      <div className="nav-item-custom"><a className="nav-link-custom " href="#/front"><i className="nav-icon"></i>Business details</a></div>
      <div className="nav-item-custom"><a className="nav-link-custom " href="#/devops"><i className="nav-icon"></i>Bank accounts</a></div>
      <div className="nav-item-custom"><a className="nav-link-custom " href="#/designs"><i className="nav-icon"></i>User management</a></div>
      <div className="nav-item-custom active"><a className="nav-link-custom" href="#/profile"><i className="nav-icon"></i>Activity Log</a></div>
      </div>
      </div>
      <div className="settings-body">
      <div className="notification"><img src={require('../../assets/img/brand/notification.svg')}/></div>
      <div className="settings-body-header"><a>Profile</a></div>
      <div className="settings-page">
      <Row>
          <Col className="main-container">
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '1' })}
                  onClick={() => { this.toggle('1'); }}
                >
                  Account
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })}
                  onClick={() => { this.toggle('2'); }}
                >
                  Change Password
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
  
            <TabPane tabId="1">
              <Account/>
              
            </TabPane>
            <TabPane tabId="2">
            <ChangePassword/>
            </TabPane>
            </TabContent>
          </Col>
        </Row>
        </div>
      </div>
      </div>
    );
  }
}

export default Settings;
