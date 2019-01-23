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
import Business from './Business'
import Location from './Location'
import Socials from './Socials'
import Contact from './Contact'

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
        <Row>
          <Col className="main-container">
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '1' })}
                  onClick={() => { this.toggle('1'); }}
                >
                  Business
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })}
                  onClick={() => { this.toggle('2'); }}
                >
                  Location
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '3' })}
                  onClick={() => { this.toggle('3'); }}
                >
                  Contact
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '4' })}
                  onClick={() => { this.toggle('4'); }}
                >
                  Website & Socials
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
  
            <TabPane tabId="1">
              <Business/>
            </TabPane>
            <TabPane tabId="2">
            <Location/>
            </TabPane>
            <TabPane tabId="3">
            <Contact/>
            </TabPane>
            <TabPane tabId="4">
            <Socials/>
            </TabPane>
            </TabContent>
          </Col>
        </Row>
        </div>
    );
  }
}

export default Details;
