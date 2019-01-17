import React, {Component} from 'react';
import { AppHeaderDropdown} from '@coreui/react';
import { DropdownMenu, DropdownItem,DropdownToggle } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {  get_action} from  '../../controllers/requests';
import { actions } from '../../state/actions';

class SideBarProfile extends Component {


  constructor(props) {

    super(props);
    this.state = {
      name: '',
      email: "",
      company:""
    };
  }

  async componentDidMount(){
    try{
      await this.props.dispatch(actions("GET_USER_PROFILE",get_action(this.props.auth.token,"users/me/profile","")))
      switch(this.props.user_state){
        case "success":
        const _profile = this.props.user_profile
        this.setState({
          email: _profile?_profile.email:"",
          company:_profile?_profile.lenders[0].id:"",
          name:_profile?_profile.lenders[0].name:"",
        })
        break
      }
    }
    catch(error){
      console.log("error")
    }
  }
  render() {
    const profile =this.props.lender_profile
    
    return (
      <div className="d-flex pt-5 pb-5 pl-4  custom-side-profile">
          <img className="" src={profile?profile.avatar:""}/>
          <p className="profile-name">{profile && profile.lender?profile.lender.business_name:""}</p>
          <AppHeaderDropdown>
            <DropdownToggle className="toggle" >
            <i className="fa fa-chevron-left"></i>
            </DropdownToggle>
            <DropdownMenu>
            <div  className="profile-body">
            <div className="profile-header">
            <img className="" src={profile?profile.avatar:""}/>
            <p className="profile-name">{profile && profile.lender?profile.lender.business_name:""}</p>
            </div>
            <DropdownItem className="close-container"><i className="fa fa-close close"></i></DropdownItem>
            <div className="divider"></div>
            <div className="header-text">You're signed in as {this.state.email}</div>
            <div className="manage-profile"><img src={require('../../assets/Icons/manage-profile.svg')}/><a>Manage Profile</a></div>
            <div className="log-out"><img src={require('../../assets/Icons/logout.svg')}/><a>Log out</a></div>
            </div>
            </DropdownMenu>
          </AppHeaderDropdown>
      </div>
    );
  }
}

export default connect(store => {
  return {
    lender_state: store.action.lender_state,
    user_state: store.action.user_state,
    auth: store.token.auth,
    lender_profile: store.action.lender,
    user_profile: store.action.user
  };
})(withRouter(SideBarProfile));