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

class Profile extends Component {

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
    );
  }
}

export default Profile;
