import React, {Component} from 'react';
import { AppHeaderDropdown} from '@coreui/react';
import { DropdownMenu, DropdownItem,DropdownToggle } from 'reactstrap';

class SideBarProfile extends Component {
  render() {

    return (
      <div className="d-flex pt-5 pb-5 pl-4  custom-side-profile">
          <img className="" src="https://res.cloudinary.com/devgeaks/image/upload/v1523729999/2017-03-02_08.30.03.jpg"/>
          <p className="profile-name">Pay Finance Ltd.</p>
          <AppHeaderDropdown>
            <DropdownToggle nav >
            <div className="toggle">
            <i className="fa fa-chevron-left"></i>
            </div> 
            </DropdownToggle>
            <DropdownMenu>
            <div  className="profile-body">
            <img className="" src="https://res.cloudinary.com/devgeaks/image/upload/v1523729999/2017-03-02_08.30.03.jpg"/>
            <p className="profile-name">Pay Finance Ltd.</p>
            <DropdownItem className="close-container"><i className="fa fa-close close"></i></DropdownItem>
            <div className="divider"></div>
            <div className="header-text">You're signed in as jubril.abass@gmail.com</div>
            <div className="manage-profile"><img src={require('../../assets/Icons/manage-profile.svg')}/><a>Manage Profile</a></div>
            <div className="log-out"><img src={require('../../assets/Icons/logout.svg')}/><a>Log out</a></div>
            </div>
            </DropdownMenu>
          </AppHeaderDropdown>
      </div>
    );
  }
}

export default SideBarProfile;
