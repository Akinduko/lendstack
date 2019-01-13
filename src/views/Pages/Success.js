import React, {Component} from 'react';
import {
  Input,
} from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';



class Success extends Component {


  redirect(link){
    this.props.history.push(link)
  }

  renderPage(){
    const Continue = ()=>{
       return ( 
       <div className="bank-account-success-page" >
      <div className="success-logo">
      <img src={require('../../assets/img/brand/completed.svg')}/>
      </div>            
      <div className="success-form">
      <div className="success-communication">
      <p>Bank Added Successfully</p>
      <a>Your bank account has been added successfully</a>
      </div>
      <div className="submit">
      <Input  onClick={()=>this.redirect("/dashboard")} type="submit" value="Continue to dashboard"/>
      </div>
    </div>
      </div>)
    } 
    return <Continue/>
  }

  render() {
    return (
      <div className="success-container">
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
})(withRouter(Success));