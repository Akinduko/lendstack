import React, { Component } from 'react';
import classnames from 'classnames';
// import Management from './UserManagement'
// import Profile from './Profile'
import Approval from './Approval'
import SelectProduct from './SelectProduct'
import Schedule from './Schedule'
import Loans from './Loans'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { get_action} from  '../../controllers/requests';
import { actions } from '../../state/actions';

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
    approvals:"Approvals",
    schedule:"Loan Schedule"
    }
    if(names[name]){
    if(name==="approvals"){
      const profile =this.props.profile
      const id = profile.lenders && profile.lenders[0]?this.props.profile.lenders[0].id:this.props.history.push('/login')
      await this.props.dispatch(actions("GET_PENDING_LOANS",get_action(this.props.token,`loans/pending`,`?lender_id=${id}`)))
      switch(this.props.get_pending_loans_state){
        case "success":
        return await this.setState({activeelement:names[name],activeTab: name})
      }
    }
    if(name==="loans"){
      return await this.setState({activeelement:names[name],activeTab: name})
    }
    if(name==="schedule"){
      return await this.setState({activeelement:names[name],activeTab: name})
    }
    } 
}

renderPage(){
    const names={
      loans:<Loans/>,
      approvals:<Approval/>,
      schedule:<Schedule/>
    }
    if(this.state.activeTab){
      return  names[this.state.activeTab]
    }
     return  names["loans"]
}

renderMain(){
  if(this.props.new_loan){
    return <SelectProduct/>
  }
  return <div className="main-page">
            <div className="sidebar-nav-custom">
            <div className="side-header">Loans</div>
            <div className="nav-custom">
            <div className={`nav-item-custom ${classnames({ active: this.state.activeTab === 'loans' })}`}><a className="nav-link-custom " onClick={()=>this.handleSideBarEvent("loans")}><i className="nav-icon"></i>Loans</a></div>
            <div className={`nav-item-custom ${classnames({ active: this.state.activeTab === 'approvals' })}`}><a className="nav-link-custom " onClick={()=>this.handleSideBarEvent("approvals")}><i className="nav-icon"></i>Loan approvals</a></div>
            <div className={`nav-item-custom ${classnames({ active: this.state.activeTab === 'schedule' })}`}><a className="nav-link-custom " onClick={()=>this.handleSideBarEvent("schedule")}><i className="nav-icon"></i>Loan Schedule</a></div>
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
    new_loan:store.action.new_loan,
    token:store.token.auth?store.token.auth.token:"",
    profile:store.action.user,
    get_pending_loans_state:store.action.get_pending_loans_state
  };
})(withRouter(Loan));