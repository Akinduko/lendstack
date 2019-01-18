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
import { get_action} from  '../../../controllers/requests';

class AddLoans extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editloanmodal: false,
            activeTab: '1'
          };

    }
    async componentDidMount(){
      const product = this.props.new_loan.product
      await this.props.dispatch(actions("GET_GROUP_BYPRODUCT",get_action(this.props.auth.token,`products/${product.id}/groups`,"")))
    }
      toggleModal(name){
          const action ={}
          action[name]=!this.state[name]
          this.setState(action)
      }
      toggle=async(tab) =>{
        if (this.state.activeTab !== tab) {
          await this.props.dispatch(actions("SET_LOAN_TAB_FULFILLED",{active:tab}))
          this.setState({
            activeTab: tab,
          });
        }
      }
      async exitLoan(){
        await this.props.dispatch(actions("SET_LOAN_ACTION_FULFILLED",false))
      }
renderTabs=()=>{
  const groups = this.props.group_by_product
  const each =[]
  switch(this.props.group_by_product_state){
    case "success":
    for(let i=0; i<groups.length; i++){
      each.push(<NavItem>
      <NavLink
        className={classnames({ active: this.state.activeTab === groups[i].id })}
        onClick={() => { this.toggle(i); }}
      >
        {groups[i].code_description}
      </NavLink>
    </NavItem>)
    }
    return (                
      <div className="actual-tabs">
        {each}
    </div>)
    case "failed":
    return <div>Unable to Load Tabs</div>
    case "pending":
    return <div>Loading...</div>
  }
}

renderTabContent=()=>{
  const groups = this.props.group_by_product
  const each =[]
  switch(this.props.group_by_product_state){
    case "success":
    for(let i=0; i<groups.length; i++){
      each.push(<TabPane tabId={groups[i].id}>
      <Personal/>
      </TabPane>)
    }
    return (<TabContent activeTab={this.state.activeTab}>{each}</TabContent>)
    case "failed":
    return<TabContent>Unable to Load Tabs</TabContent>
    case "pending":
    return <TabContent> Loading...</TabContent>
  }
}
    render() {

        return (
    <div className="add-loan">
    <div className="notification"><img src={require('../../../assets/img/brand/notification.svg')}/></div>
     <div className="body-header"> 
      <div className="first">
      <a>Add New Loan</a>
      </div>
      <div className="second">
      <a onClick={()=>this.exitLoan()}>Loan > </a> <p> Add New Loan</p>
      </div> 
      </div>
       <div className="add-loan-body">
       <Row>
             <Col className="main-container">
               <Nav tabs>
               <div className="block-group">
               <div className="divider-top"/>
               
                  {this.renderTabs()}
               
                 <div className="divider-bottom"/>
               </div>
               </Nav>
               
                {this.renderTabContent()}

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
    new_loan:store.action.new_loan,
    auth: store.token.auth,
    group_by_product:store.action.group_by_product?store.action.group_by_product.groups:[],
    group_by_product_state: store.action.group_by_product_state
  };
})(withRouter(AddLoans));