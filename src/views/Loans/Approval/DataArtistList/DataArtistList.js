import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {
Input,
Modal,
Row,
Col,
Nav,
NavItem, 
NavLink,
FormGroup,
TabContent,
TabPane
        } from 'reactstrap';
import classnames from 'classnames';
import { get_action} from  '../../../../controllers/requests';
import { actions } from '../../../../state/actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

class DataArtistList extends Component {
    constructor(props) {
        super(props);
        this.table = this.props.get_pending_loans?this.props.get_pending_loans.loans:[];
        this.options = {
            sortIndicator: true,
            hideSizePerPage: true,
            paginationSize: 5,
            hidePageListOnlyOnePage: true,
            clearSearch: true,
            alwaysShowAllBtns: false,
            withFirstAndLast: false
        }
        this.state = {
            editloanmodal: false,
            activeTab: this.props.get_current_product[0]?this.props.get_current_product[0].id:'1',
            productField:{},
            currentLoan:{}
          };

    }


     editFormater = (cell, row) => {
        return <div className="edit" onClick={()=>this.toggleModal("editloanmodal",row)}>VIEW DETAILS</div>
      };

      dateFormater = (cell, row) => {
        return <div className="date"><a>{moment(cell).format("LLLL")}</a></div>
      };

      profileFormater = (cell, row) => {
        return <div className="profile"><a>Adekeye Ogheneochuko</a></div>
      };

      emailFormater = (cell, row) => {
        return <div className="email"><a>{`#${cell}`}</a></div>
      };
      
      numberFormater = (cell, row) => {
        return <div className="number"><a>{`${cell} Months`}</a></div>
      };

    async toggleModal(name,row){
        if(this.state[name]!=true){
          await this.props.dispatch(actions("GET_CURRENT_PRODUCT",get_action(this.props.auth.token,`products/${row.product_id}/groups`,``)))
          switch (this.props.get_current_product_state){
            case "success":
            const productField={}
            for(let each of this.props.get_current_product){
              const result = await get_action(this.props.auth.token,`loans/${row.id}/groups/${each.id}`)
              if(result){
                productField[each.id]=result.fields
              }
            } 
            const action ={}
            action[name]=!this.state[name]
            action["currentLoan"]=row
            action["productField"]=productField
            return this.setState(action)
          }
         }
         return this.setState({[name]:false})
      }
      toggle(tab) {
        if (this.state.activeTab !== tab.id) {
          this.setState({
            activeTab: tab.id,
          });
        }
      }
      async redirect(link){
        if(link==="/approve-loan"){
        await this.props.dispatch(actions("SET_PENDING_LOAN_FULFILLED",this.state.currentLoan))
        switch(this.props.set_pending_loan_state){
          case "success":
          return this.props.history.push(link);
          default:
          return null
        }
        }
        this.props.history.push(link)
      }  


      renderTabContent=()=>{
        
        const groups = this.props.get_current_product
        const each =[]
        switch(this.props.get_current_product_state){
          case "success":
          for(let i=0; i<groups.length; i++){
            each.push(<TabPane tabId={groups[i].id}>
            <div className="personal-page" >
            <div className="field-wraps">
            {this.renderPersonal()} 
            </div>
          </div>
            </TabPane>)
          }
          return (<TabContent activeTab={this.state.activeTab}>{each}</TabContent>)
          case "failed":
          return<TabContent>Unable to Load Tabs</TabContent>
          case "pending":
          return <TabContent> Loading...</TabContent>
        }
      }

      renderPersonal=()=>{
        switch(this.props.get_current_product_state){
          case "success":
          const fields = this.state.productField[this.state.activeTab]
          const body = []
          if(fields){
            for(let each of fields){
              body.push(<div className="first-name">
              <div className="first">
              <a>{each.field_name}</a>
              </div>
              <div className="second">
              <a>{each.value}</a>
              </div>   
              </div>
            )}
          return (body)        
        }
        case "pending":
        return <div>Loading fields...Please wait</div>
        case "failed":
        return <div>An error occured please try again</div>
        }
      }    

      renderTabs=()=>{
        const groups = this.props.get_current_product
        const each =[]
        switch(this.props.get_current_product_state){
          case "success":
          for(let i=0; i<groups.length; i++){
            each.push(<NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === groups[i].id })}
              onClick={() => { this.toggle(groups[i]); }}
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
    render() {

        return (
    <div className="full-loan-list">
        <Modal isOpen={this.state.editloanmodal}  className="edit-loan-modal">
         <div className="sub-container">
         <div className="modal-head">
            <a>Loan details</a>
            <i onClick={()=>this.toggleModal("editloanmodal",{})} className="fa fa-close"></i>
        </div>
          <Row>
          <Col className="main-container">
            <Nav tabs>
            <div className="block-group">
            <div className="divider-top"/>
            <div className="actual-tabs">
            {this.renderTabs()}
            </div>
              <div className="divider-bottom"/>
            </div>
            </Nav>
            {this.renderTabContent()} 

          </Col>
        </Row>
        <div className="modal-footer">
          <Input className="approve" onClick={()=>this.redirect("/approve-loan")} type="submit" value="APPROVE"/>
          <Input className="decline" onClick={()=>this.redirect("/decline-loan")} type="submit" value="DECLINE"/>
          <Input className="return" onClick={()=>this.redirect("/loans")} type="submit" value="RETURN"/>
        </div>
        </div>
      </Modal>

                    <div className="table-header">
                    <div className="inputs">
                    {/* <div className="role"><a>Role</a><Input/></div> <div className="status"><a>Status</a><Input/></div> */}
                    </div>
                    <div className="actions">
                    <div className="space-evenly">
                    <div className="filter"><img src={require('../../../../assets/img/brand/filter-icon.svg')}/><a>Filter</a></div>
                    <div className="sort"><img src={require('../../../../assets/img/brand/sort-icon.svg')}/><a>Sort</a></div>
                    <div className="search"><img src={require('../../../../assets/img/brand/search-icon.svg')}/><a>Search</a></div>                       
                    </div>
                    {/* <div className="clear-filter"><a>CLEAR FILTER</a></div> */}
                    </div>
                    </div>
                    <BootstrapTable data={ this.table } pagination version="4" bordered={false}   hover={true} role="grid"
                                    options={this.options}>
                        <TableHeaderColumn  dataField="artist-img" width="20%" dataFormat={this.profileFormater}></TableHeaderColumn>
                        <TableHeaderColumn dataField="loan_amount" isKey  width="20%" dataFormat={this.emailFormater}></TableHeaderColumn>
                        <TableHeaderColumn dataField="tenor"  width="20%" dataFormat={this.numberFormater}></TableHeaderColumn>
                        <TableHeaderColumn dataField="created_on"  width="20%" dataFormat={this.dateFormater}></TableHeaderColumn>
                        <TableHeaderColumn  dataField="id"  width="20%" dataFormat={this.editFormater} ></TableHeaderColumn>
                    </BootstrapTable>
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
    profileState:store.getuser.state,
    get_pending_loans:store.action.get_pending_loans,
    get_pending_loans_state:store.action.get_pending_loans_state,
    get_all_loans_state:store.action.get_all_loans_state,
    get_all_loans:store.action.get_all_loans?store.action.get_all_loans.loans:[],
    get_current_product_state:store.action.get_current_product_state,
    get_current_product:store.action.get_current_product?store.action.get_current_product.groups:[],
    set_pending_loan_state:store.action.set_pending_loan_state
  };
})(withRouter(DataArtistList));
