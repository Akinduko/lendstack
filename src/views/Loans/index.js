import React, { Component } from 'react';
import classnames from 'classnames';
// import Management from './UserManagement'
// import Profile from './Profile'
import Approval from './Approval'
import AddLoans from './AddLoans'
import Loans from './Loans'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Loan extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'loans',
      activeelement:"Loans",
      element:"loans",
      new_loan:false
    };

  }


async handleSideBarEvent(name){
    const names={
    loans:"Loans",
    approvals:"Approvals"
    }
    if(names[name]){
    return await this.setState({activeelement:names[name],activeTab: name})
    
    } 
}

renderPage(){
    const names={
      loans:<Loans/>,
      approvals:<Approval/>
    }
    if(this.state.activeTab){
      return  names[this.state.activeTab]
    }
     return  names["loans"]
}

renderMain(){
  if(this.props.new_loan){
    return <AddLoans/>
  }
  return <div className="main-page">
            <div className="sidebar-nav-custom">
            <div className="side-header">Loans</div>
            <div className="nav-custom">
            <div className={`nav-item-custom ${classnames({ active: this.state.activeTab === 'loans' })}`}><a className="nav-link-custom " onClick={()=>this.handleSideBarEvent("loans")}><i className="nav-icon"></i>Loans</a></div>
            <div className={`nav-item-custom ${classnames({ active: this.state.activeTab === 'approvals' })}`}><a className="nav-link-custom " onClick={()=>this.handleSideBarEvent("approvals")}><i className="nav-icon"></i>Loan approvals</a></div>
            </div>
            </div>
            <div className="loans-body">
            <div className="notification"><img src={require('../../assets/img/brand/notification.svg')}/></div>
            <div className="loans-body-header"><a>{this.state.activeelement}</a></div>
            {this.renderPage()}
            </div>
          </div>

}

render() {
    return (
      <div className="loans">
      {this.renderMain()}
      </div>
    );
  }
}

export default connect(store => {
  return {
    state: store.validate.state,
    error: store.validate.error,
    new_loan:store.action.new_loan
  };
})(withRouter(Loan));