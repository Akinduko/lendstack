import React, {Component} from 'react';
import {
  Input,
  FormFeedback,
  FormGroup,
  Form
} from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { post_action ,get_action} from  '../../../controllers/requests';
import { actions } from '../../../state/actions';
import Loader from 'react-loader-spinner'

const validField =["retype_password","password","new_password"]

const fields = {
  password: "",
  retype_password:"",
  new_password:"",
}

const validFields ={
  new_password: false,
  retype_password:false,
  password:false
}

class ChangePassword extends Component {

  constructor(props) {

    super(props);
    this.state = {
      activeTab: '1',
      timeout: 0,
      response:false,
      color:"red",
      success:false,
      email: "",
      password: "",
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
      formValid: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleUserValidation = this.handleUserValidation.bind(this);
  }

  async componentDidMount(){
    await this.props.dispatch(actions("GET_USER_PROFILE",get_action(this.props.auth.token,"users/me/profile","")))
    switch(this.props.user_state){
      case "success":
      const profile = this.props.profile;
      this.setState({
        email: profile?profile.email:"",
        firstname:profile && profile.user_name?profile.user_name.split(" ")[0]:"",
        lastname:profile && profile.user_name?profile.user_name.split(" ")[1]:"",
        phonenumber:profile&&profile.mobile?this.props.profile.mobile:"",
        password:""
      })
      break
    }
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
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
    const _body={}
    for(let each of validField){
      _body[each]=this.state[each]
    }
    const body={}
    body["password"]= _body["password"];
    body["newPassword"]=_body["new_password"];
    body["confirmNewPassword"]=_body["retype_password"];

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
      await this.props.dispatch(actions("CHANGE_USER_PASSWORD",post_action(this.props.auth.token,body,"users/me/change_password","")))
      switch(this.props.auth_state){
        case "success":
        this.setState({
          headertext: "Password has been Changed",
          loader: false,
          response: true,
          success:true,
          color: "green"
        });
        await this.setTimedNotification(3000)
        break;
        case "failed":
        this.setState({
          headertext: this.props.auth_error.response?this.props.auth_error.response.data.message:"Request failed, Please try again",
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
          headertext: "Submitting your details.",
        });
        break;
        default:

        break;
      }
    }
      catch (error) {
        this.setState({
          headertext: this.props.auth_error.response?this.props.auth_error.response.data.message:"Request failed, Please try again",
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
        headertext: "Submitting your details.",
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
      return "We need your number else we won't be able to call."
    }
    if (patd.test(value) || pats.test(value)) {
      return 'That number is strange. Please check it again.'
    }
    if (value.length > 14) {
      return 'That number is strange and long. Please check it again.'
    }
    if (value.length < 11) {
      return 'That number is strange and short. Please check it again.'
    }

    return true
  }

  checkName = (value) => {
    const patd = /\d/
    const pats = /[!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?]/
    if (value.length === 0) {
      return "We need to have your name, don't you think so?"
    }
    if (patd.test(value) || pats.test(value)) {
      return 'That name appears strange, Please check it again.'
    }
    if (value.split('').length < 3) {
      return 'Hmmm. Your name is surprisingly too short.'
    }
    if (value.split('').length > 30) {
      return 'Whoops! You have such a long name.'
    }
    if (value.split('').length === 0) {
      return true
    }

    return true
  }

  checkPassword = (value) => {

    if (value.length === 0) {
      return "We need to have a password, else you will not be able to access your account?"
    }

    if (value.split('').length < 8) {
      return 'Hmmm. Your password is surprisingly too short.'
    }

    if (value.split('').length > 15) {
      return 'Whoops! You have such a long password.'
    }

    if (value.split('').length === 0) {
      return true
    }

    return true
  }

  _checkPassword = (value) => {

    if (this.state.new_password !== this.state.retype_password) {
      return "Hey! Your password did not match the new password."
    }

    if (value.length === 0) {
      return "We need to have a password, else you will not be able to access your account?"
    }

    if (value.split('').length < 8) {
      return 'Hmmm. Your password is surprisingly too short.'
    }

    if (value.split('').length > 15) {
      return 'Whoops! You have such a long password.'
    }

    if (value.split('').length === 0) {
      return true
    }

    return true
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

      if(fieldName.includes("name")){
        switch (fieldName){
          case fieldName:
          const checkname = this.checkName(value)
          fieldValidationState[fieldName] = this.checkName(value) === true ? true : false
          fieldValidationErrors[fieldName] = checkname === true ? null : ` ${checkname}`
        }       
      }
      if(fieldName.includes("password")){
        switch (fieldName){
          case fieldName:
          const checkpass = this.checkPassword(value)
          fieldValidationState[fieldName] = this.checkPassword(value) === true ? true : false
          fieldValidationErrors[fieldName] = checkpass === true ? null : ` ${checkpass}`
        }        
      }
      if(fieldName.includes("retype")){
        switch (fieldName){
          case fieldName:
          const checkpass = this._checkPassword(value)
          fieldValidationState[fieldName] = this._checkPassword(value) === true ? true : false
          fieldValidationErrors[fieldName] = checkpass === true ? null : ` ${checkpass}`
        }        
      }
      if(fieldName.includes("number")){
        switch (fieldName){
          case fieldName:
          const checknum = this.checkNum(value)
          fieldValidationState[fieldName] = this.checkNum(value) === true ? true : false
          fieldValidationErrors[fieldName] = checknum === true ? null : ` ${checknum}`
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
        <div className="parent">
        <Form onSubmit={this.handleSubmit}>
        <div className="change-password-header"><a>Login & Security</a></div>
        <div className="change-password-divider"></div>
        
        <div className="flex-group">
        <div className="change-password">
        <p>Password</p>
        <a>Please provide your current password and choose a new password.</a>
        </div>
        
        <div className="change-password-input-group">
        <div className="current-password">
          <a>Current Password</a>
          <div className="password">
                    <FormGroup>
                      <Input value={this.state.password} onChange={this.handleUserInput} name="password"
                        type="password"
                        maxLength="30"
                        placeholder=""
                        onBlur={this.handleUserValidation}
                        valid={this.state.validFields.password === true}
                        invalid={this.state.validFields.password !== true}
                        required
                      />
                   {this.state.formErrors.password? <FormFeedback className="invalid-feedback-custom" invalid>{`${this.state.formErrors.password}`}</FormFeedback>:null }
                    </FormGroup>
                    </div>
        </div>
        <div className="new-password">
          <a>New Password</a>
          <div className="password">
                    <FormGroup>
                      <Input value={this.state.new_password} onChange={this.handleUserInput} name="new_password"
                        type="password"
                        maxLength="30"
                        placeholder=""
                        onBlur={this.handleUserValidation}
                        valid={this.state.validFields.new_password === true}
                        invalid={this.state.validFields.new_password !== true}
                        required
                      />
                   {this.state.formErrors.new_password? <FormFeedback className="invalid-feedback-custom" invalid>{`${this.state.formErrors.new_password}`}</FormFeedback>:null }
                    </FormGroup>
                    </div>
        </div>
        <div className="retype-password">
          <a>Retype Password</a>
          <div className="password">
                    <FormGroup>
                      <Input value={this.state.retype_password} onChange={this.handleUserInput} name="retype_password"
                        type="password"
                        maxLength="30"
                        placeholder=""
                        onBlur={this.handleUserValidation}
                        valid={this.state.validFields.retype_password === true}
                        invalid={this.state.validFields.retype_password !== true}
                        required
                      />
                   {this.state.formErrors.retype_password? <FormFeedback className="invalid-feedback-custom" invalid>{`${this.state.formErrors.retype_password}`}</FormFeedback>:null }
                    </FormGroup>
                    </div>
        </div>
        { this.state.response?null:this.state.loader ?
                      <div className="change-password-loader">
                      <Loader type="Watch" color="black" height="50" width="60"/>
                      </div>:<Input className="change-password-submit" disabled={!this.state.formValid} type="submit" value="Save Changes"/>}
            {this.state.loader ?null :this.state.response ?                       
                    <div className="text-center change-password-loader-text" style={{color:this.state.color,fontSize:"95%"}}>
                      {this.state.headertext}
        </div>:null}
        </div>
        
        </div>
        </Form>
        </div>
    );
  }
}


export default connect(store => {
  return {
    auth_state: store.action.auth_state,
    user_error: store.action.user_error,
    auth_error: store.action.auth_error,
    auth: store.token.auth,
    user_profile:store.action.user,
    user_state:store.action.user_state
  };
})(withRouter(ChangePassword));