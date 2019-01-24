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
    TabContent,
    TabPane,
    Button,
    ButtonDropdown,
    ButtonGroup,
    ButtonToolbar,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
            } from 'reactstrap';

import { get_action,put_action} from  '../../../controllers/requests';
import { actions } from '../../../state/actions';
import classnames from 'classnames';
import Parameters from './Parameters';
import Required from "./Required";
import { AppSwitch } from '@coreui/react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class DataArtistList extends Component {
    constructor(props) {
        super(props);
        this.table = this.props.all_products;
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
            card1:{}
          };

    }
    async componentDidMount(){
      const profile= this.props.profile;
      const id = profile.lenders?profile.lenders[0].id:""
      await this.props.dispatch(actions("GET_ALL_PRODUCTS",get_action(this.props.token,`products`,`?lender_id=${id}`)))
      switch(this.props.all_products_state){
        case "success":
        break
      }
    }
  
    viewFormater = (cell, row) => {
        return <div className="edit" onClick={()=>this.toggleModal("viewusermodal",row.id)}>VIEW</div>
      };

     editFormater = (cell, row) => {
        return <div className="edit" onClick={()=>this.toggleModal("editusermodal",row)}>EDIT</div>
      };

      handleDynamics = async (name,value) => {
        await this.setState({ [name]: value });
      }
      handleSwitch=(row)=>{
        if(this.props.update_product_status_state==="succcess"){
          return   this.setState({[row.id]:1})
        }
        if(this.props.update_product_status_state==="failed"){

          return   this.setState({[row.id]:0})
        }
        
        return  this.setState({[row.id]:row.status})
          
        }
      
      handleToggle= async (row,e)=>{
        const body = {
          product_name:row.product_name,
          product_description:row.product_description,
          lender_id:row.lender_id
        };
        if(row.status===0){
          body["is_published"]=true
          await this.props.dispatch(actions("UPDATE_PRODUCTS_STATUS",put_action(this.props.token,body,`products/${row.id}`,'')))
          this.handleSwitch(row)
        }
        if(row.status===1){
        body["is_published"]=false
         await this.props.dispatch(actions("UPDATE_PRODUCTS_STATUS",put_action(this.props.token,body,`products/${row.id}`,'')))
      }
      }

      setToggle=(row)=>{
        const state = this.state.card1;
        state[row.id]= !this.state["card1"][row.id]
        this.setState({ card1:state}); 
      }
      toggleFormater =  (cell, row) => {
        // if(typeof this.state[row.id] !== 'number'){
        //    this.setState({[row.id]:row.status})
        // }
        // switch(this.props.update_product_status_state){
        //   case "succcess":
        //   return <div className="toggle"><a>{this.state[row.id]==0?"Inactive":"Active"}</a><div className="switch"><AppSwitch className={'mx-1'} onClick={()=>this.handleToggle(row)} color={'success'} checked={this.state[row.id]==0?false:true} /></div></div>
        //   break;
        //   case "failed":
        //   return <div className="toggle"><a>{this.state[row.id]==0?"Inactive":"Active"}</a><div className="switch"><AppSwitch className={'mx-1'} onClick={()=>this.handleToggle(row)} color={'success'} isOn={this.state[row.id]==0?false:true} /></div></div>
        //   default:
        //   return <div className="toggle"><a>{this.state[row.id]==0?"Inactive":"Active"}</a><div className="switch"><AppSwitch className={'mx-1'} handleToggle={this.handleToggle.bind(this,row)} color={'success'} isOn={this.state[row.id]==0?false:true} /></div></div>

        // }
        return (<ButtonGroup key={row.id} className="float-right">
        <ButtonDropdown id='card1' isOpen={this.state["card1"][row.id]} toggle={() => this.setToggle(row)}>
          <DropdownToggle caret className="p-0" color="">
            <i className="icon-settings"></i>
          </DropdownToggle>
          <DropdownMenu className="h-100" right>
            <DropdownItem>{this.state[row.id]==0?<div className="edit" onClick={()=>this.handleToggle(row)}>Activate</div>:<div className="edit" onClick={()=>this.handleToggle(row)}>Activate</div>}</DropdownItem>
            <DropdownItem><div className="edit" onClick={()=>this.toggleModal("editusermodal",row)}>EDIT</div></DropdownItem>
            <DropdownItem><div className="edit" onClick={()=>this.toggleModal("viewusermodal",row.id)}>VIEW</div></DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      </ButtonGroup>)
      };

      profileFormater = (cell, row) => {


        return <div className="profile"><p>{cell}</p></div>
      };

      tenorFormater = (cell, row) => {
        if(row.parameters&&row.parameters.length>0){
          const params = row.parameters
          const result = []
          for(let each of params){
            if(each.parameter_description==="Tenor"){
              result.push(`${each.parameter_minimum_value}-${each.parameter_maximum_value}`)
            }
          }
          return <div className="email"><a>{result}</a></div>
        }
        return <div className="email"><a>{}</a></div>
      };
      amountFormater = (cell, row) => {
        if(row.parameters&&row.parameters.length>0){
          const params = row.parameters
          const result = []
          for(let each of params){
            if(each.parameter_description==="Amount"){
              result.push(`${each.parameter_minimum_value}-${each.parameter_maximum_value}`)
            }
          }
          return <div className="email"><a>{result}</a></div>
        }
        return <div className="email"><a>{}</a></div>
      };

      async toggleModal(name,id){
        if(name.includes("edit")){
          await this.props.dispatch(actions("SET_EDIT_PRODUCT_FULFILLED",{...id,...{active:true}}))
          switch(this.props.edit_product_state){
            case "success":
            this.props.history.push("/edit-product")
          }
        }
        if(name.includes("view")){
          await this.props.dispatch(actions("SET_VIEW_PRODUCT_FULFILLED",{id}))
        }
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
      redirect(link){
        this.props.history.push(link)
      }

    renderTable(){
      switch(this.props.all_products_state){
                case "success":
                return <BootstrapTable search={true} data={ this.table } pagination version="4" bordered={false}   hover={true} role="grid"
                            options={this.options}>
                      <TableHeaderColumn  dataField="product_name" width="25%" dataFormat={this.profileFormater}>NAME</TableHeaderColumn>
                      <TableHeaderColumn dataField="product_name" isKey  width="25%" dataFormat={this.tenorFormater}>TENOR</TableHeaderColumn>
                      <TableHeaderColumn dataField="status"  width="25%" dataFormat={this.amountFormater}>AMOUNT</TableHeaderColumn>
                      <TableHeaderColumn dataField="status"  width="25%" dataFormat={this.toggleFormater}></TableHeaderColumn>
                      {/* <TableHeaderColumn  dataField="status"  width="15%" dataFormat={this.editFormater} ></TableHeaderColumn>
                      <TableHeaderColumn  dataField="status"  width="15%" dataFormat={this.viewFormater} ></TableHeaderColumn> */}
                      </BootstrapTable>
                break;
                case "failed":
                  return <div className="text-center">Unable to retrieve products</div>
                break;
                case "pending":
                  return <div className="text-center">Retrieve products...</div>
                break;
                default:
                  return <div className="text-center">Retrieve products...</div>
                break;
              }
      }
    render() {

        return (
                <div className="full-user-list">
       <Modal isOpen={this.state.viewusermodal} className="view-product-modal">
         <div className="sub-container">
         <div className="modal-head">
            <a>Product details</a>
        </div>
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
        <div className="modal-footer">
          <Input className="return" onClick={()=>this.toggleModal("viewusermodal")} type="submit" value="RETURN"/>
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
      update_product_status_state: store.action.update_product_status_state
    };
  })(withRouter(DataArtistList));
