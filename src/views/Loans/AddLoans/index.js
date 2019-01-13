import React, {Component} from 'react';
import {
Row,
Col,
Nav,
NavItem, 
NavLink,
TabContent,
TabPane
        } from 'reactstrap';
import Personal from './Personal';
import Address from './Address';
import Loans from './Loans';
import classnames from 'classnames';
import Employee from './Employee';
import Guarantor from './Guarantor';
import Documents from './Documents'
import { connect } from 'react-redux';
import { actions } from '../../../state/actions';
import { withRouter } from 'react-router-dom';

class AddLoans extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editloanmodal: false,
            activeTab: '1'
          };

    }

      toggleModal(name){
          const action ={}
          action[name]=!this.state[name]
          this.setState(action)
      }
      toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab,
          });
        }
      }
      async exitLoan(){
        await this.props.dispatch(actions("SET_LOAN_ACTION_FULFILLED",false))
      }

    render() {

        return (
    <div className="add-loan">
    <div className="notification"><img src={require('../../../assets/img/brand/notification.svg')}/></div>
     <div className="body-header"> 
      <div className="first">
      <a>Add New Guarantor</a>
      </div>
      <div className="second">
      <a onClick={()=>this.exitLoan()}>Loan > </a> <p> Add New Guarantor</p>
      </div> 
      </div>
       <div className="add-loan-body">
       <Row>
             <Col className="main-container">
               <Nav tabs>
               <div className="block-group">
               <div className="divider-top"/>
               <div className="actual-tabs">
                 <NavItem>
                   <NavLink
                     className={classnames({ active: this.state.activeTab === '1' })}
                     onClick={() => { this.toggle('1'); }}
                   >
                     Personal
                   </NavLink>
                 </NavItem>
                 <NavItem>
                   <NavLink
                     className={classnames({ active: this.state.activeTab === '2' })}
                     onClick={() => { this.toggle('2'); }}
                   >
                     Address
                   </NavLink>
                 </NavItem>
                 <NavItem>
                   <NavLink
                     className={classnames({ active: this.state.activeTab === '3' })}
                     onClick={() => { this.toggle('3'); }}
                   >
                     Loans
                   </NavLink>
                 </NavItem>
                 <NavItem>
                   <NavLink
                     className={classnames({ active: this.state.activeTab === '4' })}
                     onClick={() => { this.toggle('4'); }}
                   >
                     Employee
                   </NavLink>
                 </NavItem>
                 <NavItem>
                   <NavLink
                     className={classnames({ active: this.state.activeTab === '5' })}
                     onClick={() => { this.toggle('5'); }}
                   >
                     Guarantor
                   </NavLink>
                 </NavItem>
                 <NavItem>
                   <NavLink
                     className={classnames({ active: this.state.activeTab === '6' })}
                     onClick={() => { this.toggle('6'); }}
                   >
                     Documents
                   </NavLink>
                 </NavItem>
                 </div>
                 <div className="divider-bottom"/>
               </div>
               </Nav>
               <TabContent activeTab={this.state.activeTab}>
               <TabPane tabId="1">
                 <Personal/>
               </TabPane>
               <TabPane tabId="2">
               <Address/>
               </TabPane>
               <TabPane tabId="3">
               <Loans/>
               </TabPane>
               <TabPane tabId="4">
               <Employee/>
               </TabPane>
               <TabPane tabId="5">
               <Guarantor/>
               </TabPane>
               <TabPane tabId="6">
               <Documents/>
               </TabPane>
               </TabContent>
             </Col>
           </Row>
       </div>      
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
})(withRouter(AddLoans));