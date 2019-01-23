import React, {Component} from 'react';
// import { AppHeaderDropdown} from '@coreui/react';
// import { DropdownMenu, DropdownItem,DropdownToggle } from 'reactstrap';
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
          avatar_url: _profile?_profile.avatar_url:"",
          company:_profile?_profile.lenders[0].id:"",
          name:_profile?_profile.lenders[0].business_name:"",
        })
        break
        case "failed":
        console.log(this.props.error,'here')
        if(this.props.error==="401"){
          this.props.history.push("/login")
        }
      }
    }
    catch(error){
      await this.props.dispatch(actions("USER_LOGOUT_FULFILLED"))
      this.props.history.push("/login")
    }
  }
  render() {
    return (
      <div className="d-flex pt-5 pb-5 pl-4  custom-side-profile">
          <img className="" src={this.state.avatar_url}/>
          <p className="profile-name">{this.state.name}</p>
      </div>
    );
  }
}

export default connect(store => {
  return {
    lender_state: store.action.lender_state,
    user_state: store.action.user_state,
    auth: store.token.auth,
    user_profile: store.action.user,
    error: store.action.user_error && store.action.user_error.response?store.action.user_error.response.status:""
  };
})(withRouter(SideBarProfile));