import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import { put_action ,get_action} from  '../../../controllers/requests';
// import { actions } from '../../../state/actions';
import {
Input
      } from 'reactstrap';

class DeclineLoan extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'loans',
      activeelement:"Loans",
      element:"loans"
    };

  }

  render() {
    return (
      <div className="add-guarantor-page">
      <div className="notification"><img src={require('../../../assets/img/brand/notification.svg')}/></div>
      <div className="body-header"> 
      </div>
      
      <div className="add-guarantor">
      <div className="left">
      <p>Decline loan.</p>
      <a>You are decline this loan application, Give a reason for declining</a>
      </div> 
      <div className="right-area">
      <div className="text-area">
      <div className="caption"><a>Give Decline Reason</a></div>
      <div className="area"> <Input></Input></div>
      </div>
      <div className="submit">
      <Input className="submit" type="submit" value="CONFIRM DECLINE"/>
      </div>
      </div> 
      </div>
      </div>
    );
  }
}

export default connect(store => {
    return {
      state: store.login.state,
      error: store.login.error,
      auth: store.token.auth,
      profile:store.action.user,
      profileState:store.action.user_state
    };
  })(withRouter(DeclineLoan));