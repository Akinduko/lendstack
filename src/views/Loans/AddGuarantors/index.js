import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import { put_action ,get_action} from  '../../../controllers/requests';
// import { actions } from '../../../state/actions';
import {
Input
      } from 'reactstrap';

class AddGuarantor extends Component {

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
      <div className="first">
      <a>Add New Guarantor</a>
      </div>
      <div className="second">
      <a>Loan > </a> <p> Add New Guarantor</p>
      </div> 
      </div>
      
      <div className="add-guarantor">
      <div className="left">
      <p>Add New Guarantor.</p>
      <a>Add new guarantor for the loan</a>
      </div> 
      <div className="right">
      <div className="form-content">
      <div className="first">
      <div className="left">
      <a>First Name</a>
      <Input/>
      </div>
      <div className="right">
      <a>Last Name</a>
      <Input/>
      </div>  
      </div>
      <div className="second">
      <div className="full">
      <a>BVN</a>
      <Input/>
      </div>    
      </div>
      <div className="third">
      <div className="left">
      <a>Phone Number</a>
      <Input/>
      </div>
      <div className="right">
      <a>Email</a>
      <Input/>
      </div>       
      </div>
      </div>
      <div className="submit">
      <Input className="submit" type="submit" value="ADD NEW GUARANTOR"/>
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
      profile:store.getuser.user,
      profileState:store.getuser.state
    };
  })(withRouter(AddGuarantor));