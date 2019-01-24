import React, {Component} from 'react';
import {
    BootstrapTable, 
    TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {
Input,
Modal,
FormFeedback,
FormGroup,
Form
        } from 'reactstrap';

import { AppSwitch } from '@coreui/react'
import { get_action,put_action} from  '../../../../controllers/requests';
import { actions } from '../../../../state/actions';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner'
import { withRouter } from 'react-router-dom';

const validField =["first_name","last_name","email","phone_number"]

const fields = {
  first_name: "",
  last_name: "",
  role:"",
  email:"",
  phone_number:""
}

const validFields ={
  first_name: false,
  last_name: false,
  phone_number:false
}


class DataArtistList extends Component {
    constructor(props) {
        super(props);
        this.table = this.props.get_all_users;
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
            editusermodal: false,
            timeout: 0,
            response:false,
            color:"red",
            success:false,
            loader: false,
            code: false,
            errortext: "",
            formErrors: fields,
            validFields:validFields,
            value: '',
            suggestions: [],
            fontSize: "",
            modal: false,
            button:false,
            headertext:"",
            formValid: false,
            all_banks:[]
            ,
            ...fields
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleUserValidation = this.handleUserValidation.bind(this);
    }

    async componentDidMount(){
        const profile= this.props.profile;
        const id = profile.lenders?profile.lenders[0].id:""
        await this.props.dispatch(actions("GET_ALL_USERS",get_action(this.props.token,`lenders/${id}/users`,``)))
        switch(this.props.all_products_state){
          case "success":
          break
        }
      }

    
  handleUserValidation = async (e) => {
    const name = e.target.name;
    const value = e.target.value;
    await this.setState(
      { [name]: value },
      () => {
        this.validateField(name, value)
      });
  }

  handleUserInput = async (e) => {
    const value = e.target.value;
    const name = e.target.name;
    await this.setState({ [name]: value });
  }


  setTimedNotification(time) {
    const operation = async () => {
      return this.setState({
        response: false,
        loader:false,
        headertext: "",
      })
    }
    return setTimeout(async () => {
      await operation()
    }, time);
  }

  async handleSubmit(event) {
    event.preventDefault()
    const body ={
      "user_name": `${this.state.first_name} ${this.state.last_name}`,
      "role_id": parseInt(this.state.role),
      "mobile": this.state.phone_number
    }
    
    const pre_action = async () =>{
      try{
      this.setState({
        headertext: "Verifying your details.",
        loader: true,
        response: false,
        success:false,
        color: "#213F7D",
        errortext: ""
      });
      const profile= this.props.profile;
      const id = profile.lenders?profile.lenders[0].id:""
      await this.props.dispatch(actions("UPDATE_USER_PROFILE",put_action(this.props.token,body,`lenders/${id}/users/${this.state.current.id}`,"")))
      switch(this.props.update_user_profile_state){
        case "success":
        this.setState({
          headertext: "Login Successful",
          loader: false,
          response: true,
          success:true,
          color: "green"
        });
        await this.setTimedNotification(3000)
        break;
        case "failed":
        this.setState({
          headertext: this.props.error.response?this.props.error.response.data.message:"Login failed, Please try again",
          loader: false,
          response: true,
          success:false,
          color: "red"
        });
        await this.setTimedNotification(3000)
        break;
        case "pending":
        this.setState({
          response: false,
          loader: true,
          color: "#213F7D",
          headertext: "Verifying your details.",
        });
        break;
        
        default:
        break;
      }
    }
      catch (error) {
        this.setState({
          headertext: this.props.error.response?this.props.error.response.data.message:"Login failed, Please try again",
          loader: false,
          response: true,
          success:false,
          color: "red"
        });
        await this.setTimedNotification(5000)
      }
    }
    try{
      this.setState({
        headertext: "Verifying your details.",
        loader: true,
        response: false,
        success:false,
        color: "#213F7D",
        errortext: ""
      });
      const start = pre_action()

    }
    catch(error){
      this.setState({
        headertext: "Ooops!! Something went wrong.",
        loader: false,
        response: true,
        success:false,
        color: "red"
      }); 
      await this.setTimedNotification(5000)    
    }
    
  }

  checkNum = (value) => {
    const patd = /[a-zA-Z]/
    const pats = /[ !@#$%^&*()_\-=\[\]{};':"\\|,.<>\/?]/
    if (value.length === 0) {
      return "We need your account number else we won't be able to validate your profile."
    }
    if (patd.test(value) || pats.test(value)) {
      return 'That number is strange. Please check it again.'
    }
    if (value.length > 13) {
      return 'That number is strange and long. Please check it again.'
    }
    if (value.length < 10) {
      return 'That number is strange and short. Please check it again.'
    }

    return true
  }

  checkName = (value) => {
    if (value.length === 0) {
      return "We need to have your Name, don't you think so?"
    }
    return true
  }


  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let fieldValidationState = this.state.validFields;
      if(fieldName.includes("number")){
        switch (fieldName){
          case fieldName:
          const checknum = this.checkNum(value)
          fieldValidationState[fieldName] = this.checkNum(value) === true ? true : false
          fieldValidationErrors[fieldName] = checknum === true ? null : `${checknum}`
        }
      }

      if(fieldName.includes("name")){
        switch (fieldName){
          case fieldName:
          const checkname = this.checkName(value)
          fieldValidationState[fieldName] = this.checkName(value) === true ? true : false
          fieldValidationErrors[fieldName] = checkname === true ? null : ` ${checkname}`
        }       
      }
    this.setState({
      formErrors: fieldValidationErrors,
      validFields:fieldValidationState
    }, this.validateForm);
    
  }
  async validateForm() {
    let state ={}
      for(let each of validField){
        state[each] = this.state.validFields[each]
      }
    const _state = Object.values(state);
    const result = _state.reduce((sum, next) => sum && next, true);
    await this.setState({ formValid: result });
    console.log(result)
  }

  redirect(link){
    this.props.history.push(link)
  }

  renderRoles = roles => {
    let array = [];
    if (roles) {
      for (let each of roles) {
        array.push(
          <option value={each.id}>{each.user_role}</option>
        );
      }
      return array;
    } else {
      return [<option value="" />];
    }
  };  
     editFormater = (cell, row) => {
        return <div className="edit" onClick={()=>this.toggleModal("editusermodal",row)}>Edit</div>
      };

      toggleFormater = (cell, row) => {
         return <div className="toggle"><a>{row===0?"Inactive":"active"}</a></div>
        // return <div className="toggle"><a>active</a><AppSwitch className={'mx-1'} color={'success'} checked /></div>
      };

      profileFormater = (cell, row) => {
        return <div className="profile"><p>{row.user_name}</p><a>{row.role}</a></div>
      };

      emailFormater = (cell, row) => {
        return <div className="email"><a>{cell}</a></div>
      };
      numberFormater = (cell, row) => {
        return <div className="number"><a>{cell}</a></div>
      };
      toggleModal(name,row){
          if(row){
            const action ={}
            action[name]=!this.state[name]
            action["current"]=row
            action["first_name"]=row.user_name?row.user_name.split(' ')[0]:""
            action["last_name"]=row.user_name?row.user_name.split(' ')[1]:""
            action["role"]=row.role
            action["phone_number"]=row.mobile
            this.setState(action)
          }
      }
      renderTable(){
        switch(this.props.get_all_users_state){
                  case "success":
                  return <BootstrapTable classname="w-100" data={ this.table } pagination version="4" bordered={false}   hover={true} role="grid"
                  options={this.options}>
                        <TableHeaderColumn  dataField="user_name" width="25%" dataFormat={this.profileFormater}></TableHeaderColumn>
                        <TableHeaderColumn dataField="email" isKey  width="25%" dataFormat={this.emailFormater}></TableHeaderColumn>
                        <TableHeaderColumn dataField="mobile"  width="20%" dataFormat={this.numberFormater}></TableHeaderColumn>
                        <TableHeaderColumn dataField="status"  width="15%" dataFormat={this.toggleFormater}></TableHeaderColumn>
                        <TableHeaderColumn  dataField="status"  width="15%" dataFormat={this.editFormater} ></TableHeaderColumn>
                    </BootstrapTable>
                  break;
                  case "failed":
                    return <div>Unable to fetch Data</div>
                  break;
                  case "pending":
                    return <div>Fetching Data...</div>
                  break;
                  default:
                  return <BootstrapTable data={ this.table } pagination version="4" bordered={false}   hover={true} role="grid"
                  options={this.options}>
                    <TableHeaderColumn  dataField="artist-img" width="25%" dataFormat={this.profileFormater}></TableHeaderColumn>
                    <TableHeaderColumn dataField="age" isKey  width="25%" dataFormat={this.emailFormater}></TableHeaderColumn>
                    <TableHeaderColumn dataField="age"  width="20%" dataFormat={this.numberFormater}></TableHeaderColumn>
                    <TableHeaderColumn dataField="age"  width="15%" dataFormat={this.toggleFormater}></TableHeaderColumn>
                    <TableHeaderColumn  dataField="age"  width="15%" dataFormat={this.editFormater} ></TableHeaderColumn>
                </BootstrapTable>
                  break;
                }
        }
    render() {

        return (
                <div className="full-user-list w-100 pl-5 pr-5">
                <Modal isOpen={this.state.editusermodal} className="edit-user-modal">
                    <div className="sub-container">
                    <div className="header"><p>Edit user details</p> <i onClick={()=>this.toggleModal("editusermodal",{})} className="fa fa-close"></i></div>
                    <div className="divider"/>
                    <Form onSubmit={this.handleSubmit}>
                    <div className="first-name">
                    <a>First Name</a>      
                    <FormGroup>
                      <Input value={this.state.first_name} onChange={this.handleUserInput} name="first_name"
                        type="text"
                        maxLength="30"
                        placeholder=""
                        onBlur={this.handleUserValidation}
                        valid={this.state.validFields.first_name === true}
                        invalid={this.state.validFields.first_name !== true}
                        required
                      >
                    </Input>
                   {this.state.formErrors.first_name? <FormFeedback className="invalid-feedback-custom" invalid>{`${this.state.formErrors.first_name}`}</FormFeedback>:null }
                    </FormGroup></div>
                    <div className="last-name">
                    <a>Last Name</a>
                    <FormGroup>
                      <Input value={this.state.last_name} onChange={this.handleUserInput} name="last_name"
                        type="text"
                        maxLength="30"
                        placeholder=""
                        onBlur={this.handleUserValidation}
                        valid={this.state.validFields.last_name === true}
                        invalid={this.state.validFields.last_name !== true}
                        required
                      >
                    </Input>
                   {this.state.formErrors.last_name? <FormFeedback className="invalid-feedback-custom" invalid>{`${this.state.formErrors.last_name}`}</FormFeedback>:null }
                    </FormGroup>
                    </div>
                    <div className="role">
                    <a>Role</a>
                    <FormGroup>
                      <Input value={this.state.role} onChange={this.handleUserInput} name="role"
                        type="select"
                        maxLength="30"
                        className="select-group"
                        required
                      >
                    <option value=""></option>
                    {this.renderRoles(this.props.get_roles)}
                    
                    </Input>
                   {this.state.formErrors.role? <FormFeedback className="invalid-feedback-custom" invalid>{`${this.state.formErrors.role}`}</FormFeedback>:null }
                    </FormGroup>
                    </div>
                    <div className="phone-number"><a>Phone Number</a>
                    <FormGroup>
                      <Input value={this.state.phone_number} onChange={this.handleUserInput} name="phone_number"
                        type="text"
                        maxLength="30"
                        placeholder=""
                        onBlur={this.handleUserValidation}
                        valid={this.state.validFields.phone_number === true}
                        invalid={this.state.validFields.phone_number !== true}
                        required
                      >
                    </Input>
                   {this.state.formErrors.phone_number? <FormFeedback className="invalid-feedback-custom" invalid>{`${this.state.formErrors.phone_number}`}</FormFeedback>:null }
                    </FormGroup>      
                    </div>
                    <div className="submit">
                    { this.state.response?null:this.state.loader ?
                      <div className="login-loader">
                      <Loader type="Watch" color="black" height="50" width="60"/>
                      </div>:<Input className="submit" type="submit" value="SAVE CHANGES"/>}
                           {this.state.loader ?null :this.state.response ?                       
            <div className="text-center login-loader-text" style={{color:this.state.color,fontSize:"95%"}}>
              {this.state.headertext}
            </div>:null}
                    </div>                
                    </Form>
                    </div>   
                </Modal>

                    {/* <div className="table-header">
                    <div className="inputs">
                    <div className="role"><a>Role</a><Input/></div> <div className="status"><a>Status</a><Input/></div>
                    </div>
                    <div className="actions">
                    <div className="space-evenly">
                    <div className="filter"><img src={require('../../../../assets/img/brand/filter-icon.svg')}/><a>Filter</a></div>
                    <div className="sort"><img src={require('../../../../assets/img/brand/sort-icon.svg')}/><a>Sort</a></div>
                    <div className="search"><img src={require('../../../../assets/img/brand/search-icon.svg')}/><a>Search</a></div>                       
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
      get_all_transactions_state:store.action.get_all_transactions,
      get_all_transactions:store.action.get_all_transactions,
      get_all_schedule:store.action.get_all_schedule?store.action.get_all_schedule.schedule:[],
      get_all_schedule_state:store.get_all_schedule_state,
      get_all_users: store.action.get_all_users ? store.action.get_all_users.users : [],
      get_all_users_state:store.action.get_all_users_state,
      get_roles:store.action.get_roles?store.action.get_roles.roles:[],
      get_roles_state:store.action.get_roles,
      update_user_profile:store.action.update_user_profile,
      update_user_profile_state:store.action.update_user_profile_state,
      error:store.action.update_user_profile_error
    };
  })(withRouter(DataArtistList));