import React, {Component} from 'react';
import {
  Input,
  FormFeedback,
  FormGroup,
  Form,
  Modal
} from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { post_action } from  '../../../../controllers/requests';
import { actions } from '../../../../state/actions';
import Loader from 'react-loader-spinner'


const validField =["otp_number"]

const fields = {
  otp_number: ""
}

const validFields ={
  otp_number: false
}


class Second extends Component {

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
      all_banks:[],
      success:false,
      
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
      "otp_number":this.state.otp_number
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
          headertext: "Successfully Added",
          loader: false,
          response: true,
          success:true,
          color: "green"
        });
        await this.setTimedNotification(3000)
        break;
        case "failed":
        this.setState({
          headertext: this.props.error.response?this.props.error.response.data.message:"Request failed, Please try again",
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
          headertext: this.props.error.response?this.props.error.response.data.message:"Request failed, Please try again",
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
        success:true,
        color: "#213F7D",
        errortext: ""
      });
      // const start = pre_action()
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
      return "We need the OTP sent to your BVN associated mobile number else we won't be able to validate your profile."
    }
    if (patd.test(value) || pats.test(value)) {
      return 'That number is strange. Please check it again.'
    }
    if (value.length > 6) {
      return 'That number is strange and long. Please check it again.'
    }
    if (value.length < 6) {
      return 'That number is strange and short. Please check it again.'
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

  renderBanks = banks => {
    let array = [];
    if (banks) {
      for (let each of banks) {
        array.push(
          <option value={each.additional_code}>{each.code_description}</option>
        );
      }
      return array;
    } else {
      return [<option value="" />];
    }
  };

  renderPage(){
    if(this.state.success){
      this.props.history.push("/success")
    }
    return (<div className="add-account-page">
    <div className="add-account-left">
    <p>Verify</p>
    <a>Verify your bank account with the code sent to your registered phone number</a>
    </div>
    <div className="add-account-right">
    <div className="form-content">
    <Form onSubmit={this.handleSubmit}>
    <div className="input-groups">
    <div className="otp_number">
    <p>Enter 6 DIGIT code sent to your phone</p>
        <FormGroup>
                  <Input value={this.state.account_number} onChange={this.handleUserInput} name="otp_number"
                    type="otp_number"
                    maxLength="6"
                    minLength="6"
                    placeholder=""
                    onBlur={this.handleUserValidation}
                    valid={this.state.validFields.otp_number === true}
                    invalid={this.state.validFields.otp_number !== true}
                    required
                  />
               {this.state.formErrors.otp_number? <FormFeedback className="invalid-feedback-custom" invalid>{`${this.state.formErrors.otp_number}`}</FormFeedback>:null}
       </FormGroup>                    
        </div>
       </div> 
        { this.state.response?null:this.state.loader ?
                  <div className="login-loader">
                  <Loader type="Watch" color="black" height="50" width="60"/>
                  </div>:<Input className="submit" disabled={!this.state.formValid} type="submit" value="VERIFY"/>}
                       {this.state.loader ?null :this.state.response ?                       
        <div className="text-center login-loader-text" style={{color:this.state.color,fontSize:"95%"}}>
          {this.state.headertext}
        </div>:null}   
       </Form>
       </div>    
      </div>    
    </div>)
  }
  render() {
    return (
  <div>
  {this.renderPage()}
  </div>
      )
  }
}

export default connect(store => {
  return {
    state: store.login.state,
    error: store.login.error,
    all_banks: store.action.all_banks?store.action.all_banks.codes:[],
    all_banks_state: store.action.all_banks_state
  };
})(withRouter(Second));
