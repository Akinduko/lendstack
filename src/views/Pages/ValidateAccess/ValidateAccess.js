import React, {Component} from 'react';
import {
  Input,
  FormFeedback,
  FormGroup,
  Form
} from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { post_action } from  '../../../controllers/requests';
import { actions } from '../../../state/actions';
import Loader from 'react-loader-spinner'

const validField =["email"]

const fields = {
  email: ""
}

const validFields ={
  email: false,
}



class ValidateAccess extends Component {

  constructor(props) {

    super(props);
   
    this.state = {
      token: props.match.params.id
    };
  }

  async componentDidMount(){
    await this.props.dispatch(actions("VALIDATE_AUTH",post_action("",{},`auth/activate/${this.state.token}`,"")))
  }

  redirect(link){
    this.props.history.push(link)
  }

  renderPage(){
    const Continue = ()=>{
       return ( 
        <div className="bank-account-success-page" >
        <div className="success-logo">
        <img src={require('../../../assets/img/brand/completed.svg')}/>
        </div>            
        <div className="success-form">
        <div className="success-communication">
        <p>Hurray, you are good to go</p>
        </div>
        <div className="submit">
        <Input  onClick={()=>this.redirect("/dashboard")} type="submit" value="Take me to the dashboard"/>
        </div>
      </div>
        </div>)
    }  
  
    const Failed = ()=>{
      return (
        <div className="bank-account-success-page" >
        <div className="success-logo">
        <img style={{width:"250px",height:"100px"}} src={require('../../../assets/img/brand/logo-forgot.svg')}/>
        </div>            
        <div className="success-form">
        <div className="success-communication">
        <p>Good to see you again.</p>
        <a>{this.props.error.response?this.props.error.response.data.message:"Request failed, Please try again"}</a>
        </div>
        <div className="submit">
        <Input className="submit" onClick={()=>this.redirect("/dashboard")} type="submit" value="Go back"/>
        </div>
      </div>
        </div>)
    }  
 
    const Pending = ()=>{
      return (
      <div className="main-loader">
      <Loader type="Watch" color="black" height="50" width="60"/>
      </div>)
    }  

switch(this.props.state){
  case "success":
    return <Continue/>
  break;
  case "failed":
  return <Failed/>
  break;
  case "pending":
    return <Pending/>
  break;
  default:
  return <Pending/>
  break;
}

  }

  render() {
    return (
      <div className="forgot-container">
      {this.renderPage()}
      </div>
    );
  }
}

export default connect(store => {
  return {
    state: store.validate.state,
    error: store.validate.error,
    auth:store.validate.auth,
  };
})(withRouter(ValidateAccess));