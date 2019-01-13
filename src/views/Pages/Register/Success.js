import React, {Component} from 'react';
import {
  Input,
} from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Success extends Component {


  render() {
    return (
      <div className="delivered-container">
      <div className="delivered-img">
          <img src={require('../../../assets/img/brand/delivered.svg')}/>
          <p>Check your email !</p>
      </div>            
      <div className="delivered-caption">
          <div className="delivered-communication">
          <a>An activation link has been sent to you.</a>
          </div>
          <div className="delivered-email">
              <Input className="submit" value={this.props.email}/>                  
          </div>
          </div>
      </div>
    );
  }
}

export default connect(store => {
  return {
    email: store.action.email?store.action.email.email:"",
  };
})(withRouter(Success));