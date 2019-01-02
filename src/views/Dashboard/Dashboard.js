import React, { Component } from 'react';
import { Card, 
  CardBody, 
  CardFooter,
   CardHeader, 
   Row,
    Col,
     Nav,
      NavItem, 
      NavLink,
       TabContent,
        TabPane,
        Button, 
        InputGroupText,
        Input,
        InputGroup,
        InputGroupAddon
      } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import classnames from 'classnames';
import Header from './Header';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      activeTab: '1',
    };
    this.toggle = this.toggle.bind(this);
    this.toggleTab = this.toggleTab.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
  }


  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }
  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState({ fadeIn: !this.state.fadeIn });
  }

  render() {
    return (
      <div className="dashboard-body">
      <Header/>
            <div className="dashboard-card-container">
            <Card className="card-1" >
            <div className="card-header"/>
            <div className="card-image">
            <img src={require('../../assets/img/brand/card-icon-1.svg')}/>
            </div>
                <a>Complete your profile</a>
                <p>Your everyday tasks feel light. More time with Borrowers.</p>
              <CardFooter className="card-footer">
              <a>COMPLETE PROFILE</a>
              <img src={require('../../assets/Icons/Arrow.svg')}/>
                </CardFooter>
            </Card>

            <Card className="card-2" >
            <div className="card-header"/>
              <CardBody>
              <div className="card-image">
              <img src={require('../../assets/img/brand/card-icon-2.svg')}/>
              </div>
                <a>Create loan product</a>
                <p>Your everyday tasks feel light. More time with Borrowers.</p>
              </CardBody>
              <CardFooter className="card-footer">
              <a>CREATE LOAN PRODUCT</a>
              <img src={require('../../assets/Icons/Arrow.svg')}/>
                </CardFooter>
            </Card>

            <Card className="card-3">
            <div className="card-header"/>
              <CardBody>
              <div className="card-image">
              <img src={require('../../assets/img/brand/card-icon-3.svg')}/>
               </div>
                <a>Start lending</a>
                <p>Your everyday tasks feel light. More time with Borrowers.</p>
              </CardBody>
              <CardFooter className="card-footer">
              <a>START LENDING</a>
              <img src={require('../../assets/Icons/Arrow.svg')}/>
                </CardFooter>
            </Card>
            </div>
      </div>
    );
  }
}

export default Dashboard;
