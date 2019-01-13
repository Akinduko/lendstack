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
import Management from './UserManagement'
import Profile from './Profile'
import Details from './BusinessDetails'
import Accounts from './BankAccount'
import Activity from './ActivityLog'

class Settings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'profile',
      activeelement:"Profile",
      element:"profile"
    };

  }


  async handleSideBarEvent(name){
const names={
  profile:"Profile",
  details:"Lender Details",
  accounts:"Bank Accounts",
  management:"User Management",
  activity:"Activity Log"
}
if(names[name]){
  return await this.setState({activeelement:names[name],activeTab: name})
   
} 
}
   renderPage(){
    const names={
      profile:<Profile/>,
      details:<Details/>,
      accounts:<Accounts/>,
      management:<Management/>,
      activity:<Activity/>
    }
    if(this.state.activeTab){
      return  names[this.state.activeTab]
    }
     return  names["profile"]
  }
  render() {
    return (
      <div className="settings">
      <div className="sidebar-nav-custom">
      <div className="side-header">SETTINGS</div>
      <div className="nav-custom">
      <div className={`nav-item-custom ${classnames({ active: this.state.activeTab === 'profile' })}`}><a className="nav-link-custom " onClick={()=>this.handleSideBarEvent("profile")}><i className="nav-icon"></i>Profile</a></div>
      <div className={`nav-item-custom ${classnames({ active: this.state.activeTab === 'details' })}`}><a className="nav-link-custom " onClick={()=>this.handleSideBarEvent("details")}><i className="nav-icon"></i>Lender Details</a></div>
      <div className={`nav-item-custom ${classnames({ active: this.state.activeTab === 'accounts' })}`}><a className="nav-link-custom " onClick={()=>this.handleSideBarEvent("accounts")}><i className="nav-icon"></i>Bank accounts</a></div>
      <div className={`nav-item-custom ${classnames({ active: this.state.activeTab === 'management' })}`}><a className="nav-link-custom " onClick={()=>this.handleSideBarEvent("management")}><i className="nav-icon"></i>User management</a></div>
      <div className={`nav-item-custom ${classnames({ active: this.state.activeTab === 'activity' })}`}><a className="nav-link-custom" onClick={()=>this.handleSideBarEvent("activity")}><i className="nav-icon"></i>Activity Log</a></div>
      </div>
      </div>
      <div className="settings-body">
      <div className="notification"><img src={require('../../assets/img/brand/notification.svg')}/></div>
      <div className="settings-body-header"><a>{this.state.activeelement}</a></div>
      {this.renderPage()}
      </div>
      </div>
    );
  }
}

export default Settings;
