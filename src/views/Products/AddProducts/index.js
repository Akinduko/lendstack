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
import Parameters from './Parameters';
import Required from './Required';
import classnames from 'classnames';
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
    <div className="add-product">
    <div className="notification"><img src={require('../../../assets/img/brand/notification.svg')}/></div>
     <div className="body-header"> 
      <div className="first">
      <a>Add A New Product</a>
      </div>
      <div className="second">
      <a onClick={()=>this.exitLoan()}>Products > </a> <p> Add A New Product</p>
      </div> 
      </div>
       <div className="add-product-body">
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
                     Parameters
                   </NavLink>
                 </NavItem>
                 <NavItem>
                   <NavLink
                     className={classnames({ active: this.state.activeTab === '2' })}
                     onClick={() => { this.toggle('2'); }}
                   >
                     Required Fields
                   </NavLink>
                 </NavItem>
                 </div>
                 <div className="divider-bottom"/>
               </div>
               </Nav>
               <TabContent activeTab={this.state.activeTab}>
               <TabPane tabId="1">
                 <Parameters/>
               </TabPane>
               <TabPane tabId="2">
               <Required/>
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