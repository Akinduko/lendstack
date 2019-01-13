import React, {Component} from 'react';
import {
  Input,
  FormFeedback,
  FormGroup,
  Form
} from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { post_action } from  '../../../controllers/requests';
import { actions } from '../../../state/actions';
import Loader from 'react-loader-spinner'

const validField =["email"]

const fields = {
  email: ""
}

const validFields ={
  email: false,
}

class RequestAccess extends Component {

  constructor(props) {

    super(props);
   
    this.state = {
      timeout: 0,
      response:false,
      color:"red",
      success:false,
      email: "",
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
      token: props.match.params
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
      "email":this.state.email
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
      
      await this.props.dispatch(actions("GET_RESET_AUTH",post_action("",body,"auth/password_reset","")))
      switch(this.props.state){
        case "success":
        this.setState({
          headertext: "Request Successful",
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


  checkEmail = (value) => {
    const pate = /^(\D)+(\w)*((\.(\w)+)?)+@(\D)+(\w)*((\.(\D)+(\w)*)+)?(\.)[a-z]{2,}$/
    if (value.length === 0) {
      return "Hey, we need your email."
    }
    if (pate.test(value) === false) {
      return 'That Email is strange. Please check it again.'
    }
    return true
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let fieldValidationState = this.state.validFields;
      if(fieldName.includes("email")){
        switch (fieldName){
          case fieldName:
          const checkemail = this.checkEmail(value)
          fieldValidationState[fieldName] = this.checkEmail(value) === true ? true : false
          fieldValidationErrors[fieldName] = checkemail === true ? null : `${checkemail}`
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


  render() {
    return (
      <div className="forgot-container">
      <div className="lend-logo">
          <img src={require('../../../assets/img/brand/logo-forgot.svg')}/>
      </div>            
          <div className="forgot-form">
          <div className="form-communication">
          <p>Forgot Your Password?</p>
          <a>Enter the email address you registered with and we'll send you instructions on how to reset it.</a>
          </div>
          <Form onSubmit={this.handleSubmit}>
          <div className="email">
            <FormGroup>
                      <Input value={this.state.email} onChange={this.handleUserInput} name="email"
                        type="email"
                        maxLength="30"
                        placeholder="Email"
                        onBlur={this.handleUserValidation}
                        valid={this.state.validFields.email === true}
                        invalid={this.state.validFields.email !== true}
                        required
                      />
                   {this.state.formErrors.email? <FormFeedback className="invalid-feedback-custom" invalid>{`${this.state.formErrors.email}`}</FormFeedback>:null}
           </FormGroup>                    
            </div>
            { this.state.response?null:this.state.loader ?
                      <div className="reset-loader">
                      <Loader type="Watch" color="black" height="50" width="60"/>
                      </div>:<Input className="submit" disabled={!this.state.formValid} type="submit" value="SEND RESET INSTRUCTIONS"/>}
           </Form>
            {this.state.loader ?null :this.state.response ?                       
                    <div className="text-center reset-loader-text" style={{color:this.state.color,fontSize:"95%"}}>
                      {this.state.headertext}
                    </div>:null}   
          </div>
      </div>
    );
  }
}

export default connect(store => {
  return {
    state: store.login.state,
    error: store.login.error
  };
})(withRouter(RequestAccess));