import React, {Component} from 'react';
import { Badge, DropdownItem, DropdownMenu,Nav, NavItem, DropdownToggle,Row,Col} from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {  get_action} from  '../../controllers/requests';
import { AppHeaderDropdown } from '@coreui/react';
import { actions } from '../../state/actions';

class SideBarProfile extends Component {


  constructor(props) {

    super(props);
    this.state = {
      name: '',
      email: "",
      company:"",
      companies:[]
    };
  }

  async componentDidMount(){
    try{
      await this.props.dispatch(actions("GET_USER_PROFILE",get_action(this.props.auth.token,"users/me/profile","")))
      switch(this.props.user_state){
        case "success":
        const _profile = this.props.user_profile
        const entity = _profile.companies
        this.setState({
          avatar_url: _profile?_profile.avatar_url:"",
          email: _profile?_profile.email:"",
          company:entity?entity[0].id:"",
          name:entity?entity[0].user_name:"",
          companies:entity
        })
        console.log(this.state)
        break
        case "failed":
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

  async logout(){
    await this.props.dispatch(actions("USER_LOGOUT_FULFILLED"))
    this.props.history.push("/login")
  }

  async setCompany(each){
    await this.props.dispatch(actions("SET_CURRENT_COMPANY",each))
  }

  renderCompanies(){
    const body =[]
    for(let each of this.state.companies){
      body.push(<DropdownItem onClick={()=>this.setCompany(each)} ><i className="fa fa-user"></i><Badge className="custom-badge" color="info"><a style={{textTransform:"capitalize"}}>{each.entity_name}</a></Badge><Col><a>{each.user_name}</a></Col></DropdownItem>)
    }
    return body
  }

  redirect(link){
    this.props.history.push(link)
  }

  render() {
    return (
      <div className="d-flex pt-5 pb-5 justify-content-around custom-side-profile">

          <Nav className=".d-md-down-none-info" navbar>
          <NavItem className="px-3 w-50 h-100 nav-item">
          <AppHeaderDropdown direction="down">
              <DropdownToggle nav>
              <img src={this.state.avatar_url && this.state.avatar_url.length>0?this.state.avatar_url:require('../../assets/img/brand/profile-pics.png')} className="img-avatar" alt="" />
              </DropdownToggle>
              <DropdownMenu left style={{ left: 'auto' }}>
              <DropdownItem className="text-center">{this.state.email}</DropdownItem>
              {/* <p className="text-muted">You are logged in as {this.state.email}</p> */}
              {this.renderCompanies()}
              <DropdownItem onClick={()=>this.logout()} ><i className="fa fa-lock"></i> Logout</DropdownItem>
              </DropdownMenu>
          </AppHeaderDropdown>
         </NavItem>
          <NavItem className="w-75 pt-3 pb-3 h-100 nav-item">
          <p className="profile-name">{this.state.name}</p>
          </NavItem>
       </Nav>
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
    token:store.token.auth?store.token.auth.token:"",
    current_company:store.action.current_company,
    error: store.action.user_error && store.action.user_error.response?store.action.user_error.response.status:""
  };
})(withRouter(SideBarProfile));