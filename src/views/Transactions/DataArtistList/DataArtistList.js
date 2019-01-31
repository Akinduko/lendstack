import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {
    Input,
    Modal,
    Badge
    } from 'reactstrap';
import { get_action} from  '../../../controllers/requests';
import { actions } from '../../../state/actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _data from "./_data"
import moment from "moment"

class DataArtistList extends Component {
    constructor(props) {
        super(props)
        this.table = this.props.get_all_transactions;
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
            viewusermodal: false,
            activeTab: '1',
            modal:{}
          };

    }
    
    async componentDidMount(){
      const profile= this.props.profile;
      const id = profile.companies?profile.companies[0].id:""
      await this.props.dispatch(actions("GET_ALL_TRANSACTIONS",get_action(this.props.token,`lenders/${id}/transactions`,``)))
      switch(this.props.all_products_state){
        case "success":
        break
      }
    }

    toggleModal(name,row){
      if(this.state.viewusermodal!==name){
        this.setState({viewusermodal:name,modal:row})
      }
    }

    viewFormater = (cell, row) => {
        return <div className="edit" onClick={()=>this.toggleModal(true,row)}>VIEW DETAILS</div>
      };


      handleDynamics = async (name,value) => {
        await this.setState({ [name]: value });
      }

      profileFormater = (cell, row) => {
        const action_type= row.type?row.type.code_description:''
      return <div className="profile"><p>{action_type==="Debit" ?<Badge className="mr-1" color="danger">Debit</Badge>:<Badge className="mr-1" color="success">Credit</Badge>}</p></div>
      };

      tenorFormater = (cell, row) => {
        return <div className="email"><a>{cell}</a></div>
      };

      amountFormater = (cell, row) => {
        return <div className="email"><a> ₦{cell}</a></div>
      };

      toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab,
          });
        }
      }

      dateFormater(cell, row){
        return <div className="profile"><p>{moment(cell).format("LLLL")}</p></div>
      }
      

      redirect(link){
        this.props.history.push(link)
      }

    renderTable(){
      switch(this.props.get_all_transactions_state){
                case "success":
                return <BootstrapTable search={true} data={ this.props.get_all_transactions } pagination version="4" bordered={false}   hover={true} role="grid"
                options={this.options}>
                  <TableHeaderColumn  dataField="status" width="20%" dataFormat={this.profileFormater}>STATUS</TableHeaderColumn>
                  <TableHeaderColumn dataField="amount"  width="20%" dataFormat={this.amountFormater}>AMOUNT</TableHeaderColumn>
                  <TableHeaderColumn dataField="tenor" isKey  width="20%" dataFormat={this.tenorFormater}>Tenor</TableHeaderColumn>
                  <TableHeaderColumn dataField="created_on"  width="20%" dataFormat={this.dateFormater}></TableHeaderColumn>
                  <TableHeaderColumn  dataField="status"  width="20%" dataFormat={this.viewFormater} ></TableHeaderColumn>
                  </BootstrapTable>
                break;
                case "failed":
                  return <div className="text-center">Unable to Retrieve Transactions.</div>
                break;
                case "pending":
                  return <div className="text-center">Retrieving Transactions...</div>
                break;
                default:
                return <div className="text-center">Retrieving Transactions...</div>
                break;
              }
      }
    render() {

    return (
      <div className="full-user-list">
       <Modal isOpen={this.state.viewusermodal} className="view-transaction-modal">
         <div className="sub-container">
         <div className="modal-head">
            <a>Transactions details</a>
        </div>
        <div className="transaction-modal" >
        <div className="first-name">
            <div className="first">
            <a>Transaction Type</a>
            </div>
            <div className="second">
            <a>{this.state.modal.type?this.state.modal.type.code_description:''}</a>
            </div>   
          </div> 
          <div className="first-name">
            <div className="first">
            <a>Amount</a>
            </div>
            <div className="second">
            <a> ₦ {this.state.modal.amount}</a>
            </div>   
          </div>
          {/* <div className="first-name">
            <div className="first">
            <a>Account</a>
            </div>
            <div className="second">
            <a>Emmanuel Gbadejo Hammed</a>
            <p>1002846738 - GTBANK</p>
            </div>   
          </div> */}
          <div className="first-name">
            <div className="first">
            <a>Date</a>
            </div>
            <div className="second">
            <a>{moment(this.state.modal.created_on).format("LLLL")}</a>
            </div>   
          </div>
          <div className="first-name">
            <div className="first">
            <a>Transaction ID</a>
            </div>
            <div className="second">
            <a>{this.state.modal.id}</a>
            </div>   
          </div>
        </div>
        
        <div className="modal-footer">
          <Input className="return" onClick={()=>this.toggleModal(false,{})} type="submit" value="RETURN"/>
        </div>
     </div>
</Modal>

                    {/* <div className="table-header">
                    <div className="inputs">
                    <div className="role"><a>Role</a><Input/></div> <div className="status"><a>Status</a><Input/></div>
                    </div>
                    <div className="actions">
                    <div className="space-evenly">
                    <div className="filter"><a>Export</a></div>
                    <div className="filter"><img src={require('../../../assets/img/brand/filter-icon.svg')}/><a>Filter</a></div>
                    <div className="sort"><img src={require('../../../assets/img/brand/sort-icon.svg')}/><a>Sort</a></div>
                    <div className="search"><img src={require('../../../assets/img/brand/search-icon.svg')}/><a>Search</a></div>                       
                    </div>
                    <div className="clear-filter"><a>CLEAR FILTER</a></div>
                    </div>
                    </div> */}
                    {this.renderTable()}
                </div>
        );
    }
}

export default connect(store => {
    return {
      state: store.validate.state,
      error: store.validate.error,
      token:store.token.auth?store.token.auth.token:"",
      profile:store.action.user,
      all_products_state:store.action.all_products_state,
      all_products:store.action.all_products?store.action.all_products.products:[],
      product_parameters:store.action.product_parameters?store.action.product_parameters.parameters:[],
      product_parameters_state:store.action.product_parameters,
      edit_product:store.action.edit_product,
      edit_product_state:store.action.edit_product_state,
      update_product_status: store.action.update_product_status,
      update_product_status_state: store.action.update_product_status_state,
      get_all_transactions_state:store.action.get_all_transactions_state,
      get_all_transactions:store.action.get_all_transactions?store.action.get_all_transactions.transactions:[]
    };
  })(withRouter(DataArtistList));
