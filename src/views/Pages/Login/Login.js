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

const validField =["email","password"]

const fields = {
  email: "",
  password: ""
}

const validFields ={
  email: false,
  password: false
}

class Login extends Component {

  constructor(props) {

    super(props);
    this.state = {
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
      "password":this.state.password,
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
      await this.props.dispatch(actions("GET_AUTH",post_action("",body,"auth/signin","")))
      switch(this.props.state){
        case "success":
        await this.props.dispatch(actions("SET_TOKEN_FULFILLED",this.props.auth))
        this.props.history.push('/')
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
        <div className="access-container">
        <div className="header-row-flex">
        <div className="lend-logo">
          <img src={require('../../../assets/img/brand/logo.svg')}/>
          </div>            
            <div className="socials">
            <a href="https://web.facebook.com/Lendstack/" target="_blank" className="facebook">
              <i className="fa fa-facebook"></i>
            </a>
            <a href="https://www.linkedin.com/company/lendstack/" target="_blank" className="facebook">
              <i className="fa fa-linkedin"></i>
            </a>
            <a href="https://twitter.com/lendstack" target="_blank" className="twitter">
              <i className="fa fa-twitter"></i>
            </a>               
            </div>
        </div>
        <div className="body-row-flex">
        <div className="left-column-flex">
        <div className="page-communication">
          <p>Software to run your loan business</p>
          <a>Your everyday tasks feel light. More time with Borrowers, less time with paper and spreadsheets. </a>
          </div>
          <div className="page-illustration">
          <img src={require('../../../assets/img/brand/illustration.svg')}/>
          </div>
        </div>
        <div className="right-column-flex">
        <div className="login-form">
          <div className="header"><p>Login in</p></div>
            <div className="divider"/>
            <div className="form-content">
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
            <div className="password">
            <FormGroup>
                      <Input value={this.state.password} onChange={this.handleUserInput} name="password"
                        type="password"
                        maxLength="30"
                        placeholder="Password"
                        onBlur={this.handleUserValidation}
                        valid={this.state.validFields.password === true}
                        invalid={this.state.validFields.password !== true}
                        required
                      />
                   {this.state.formErrors.password? <FormFeedback className="invalid-feedback-custom" invalid>{`${this.state.formErrors.password}`}</FormFeedback>:null }
                    </FormGroup>
            </div>
            
            <div onClick={()=>this.redirect("/reset")} className="forgot">
              <a  >FORGOT PASWORD?</a>
            </div>
            { this.state.response?null:this.state.loader ?
                      <div className="login-loader">
                      <Loader type="Watch" color="black" height="50" width="60"/>
                      </div>:<Input className="submit" disabled={!this.state.formValid} type="submit" value="LOG IN"/>}
           </Form>
            <div className="footer">
              Don't have an account <a onClick={()=>this.redirect("/register")}> Sign up</a>
            </div>
            </div>  
            {this.state.loader ?null :this.state.response ?                       
                    <div className="text-center login-loader-text" style={{color:this.state.color,fontSize:"95%"}}>
                      {this.state.headertext}
                    </div>:null}      
          </div>
        </div>
        </div>
        </div>
    );
  }
}

export default connect(store => {
  return {
    state: store.login.state,
    error: store.login.error,
    auth: store.login.auth
  };
})(withRouter(Login));