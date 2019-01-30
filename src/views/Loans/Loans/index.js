import React, { Component } from 'react';
import DataArtistList from './DataArtistList';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { post_action ,get_action} from  '../../../controllers/requests';
import { actions } from '../../../state/actions';
import Loader from 'react-loader-spinner'


const validField =["first_name","last_name","role","email","phone_number"]

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
  role:false,
  email:false,
  phone_number:false
}

class Loans extends Component {

  constructor(props) {

    super(props);
    this.state = {
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
    const body = {
      "bank_id":this.state.bank_name,
      "account_number":this.state.account_number
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
      await this.props.dispatch(actions("GET_AUTH",post_action("",body,"auth/signin","")))
      switch(this.props.state){
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
      this.props.nextStep()
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
    if (value.length > 10) {
      return 'That number is strange and long. Please check it again.'
    }
    if (value.length < 10) {
      return 'That number is strange and short. Please check it again.'
    }

    return true
  }

  checkName = (value) => {
    if (value.length === 0) {
      return "We need to have your Bank, don't you think so?"
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
  }

  redirect(link){
    this.props.history.push(link)
  }

  renderRoles = roles => {
    let array = [];
    if (roles) {
      for (let each of roles) {
        array.push(
          <option value={each.additional_code}>{each.code_description}</option>
        );
      }
      return array;
    } else {
      return [<option value="" />];
    }
  };
  toggleModal(name){
    const action ={}
    action[name]=!this.state[name]
    this.setState(action)
}

async addLoan(){
  await this.props.dispatch(actions("SET_LOAN_ACTION_FULFILLED",true))
}
  render() {
    return (
      <div className="loans-page">
      <div className="d-flex flex-row justify-content-between w-100"> 
      <div className="ml-5 side-header">Loans</div>
      <div className="add-loan-button"><button onClick={()=>this.addLoan()} >ADD NEW LOAN</button></div>
      </div>
      <div className="loans-table-container">
      <DataArtistList/>
      </div>
      </div>
    );
  }
}


export default connect(store => {
  return {
    state: store.validate.state,
    error: store.validate.error,
    auth:store.validate.auth,
  };
})(withRouter(Loans));
