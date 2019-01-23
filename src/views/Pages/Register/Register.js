import React, { Component } from 'react';
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Input,
  FormFeedback,
  Form,
  FormGroup,
} from 'reactstrap';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { post_action} from  '../../../controllers/requests';
import { actions } from '../../../state/actions';
import Loader from 'react-loader-spinner'
import Success from './Success'

const individual_fields=["password_individual","firstname","email_individual","lastname"]
const bussiness_fields=["name_bussiness","email_bussiness","password_bussiness"]
const validFields ={
  password_individual: false,
  firstname: false,
  email_individual: false,
  lastname: false,
  name_bussiness: false,
  email_bussiness: false,
  password_bussiness: false
}

const fields = {
  password_individual: "",
  firstname: "", 
  lastname: "", 
  email_individual: "", 
  name_bussiness: '', 
  email_bussiness: '', 
  password_bussiness: ''
}
class Register extends Component {

  constructor(props) {

    super(props);
    this.state = {
      activeTab: '1',
      timeout: 0,
      response:false,
      success:false,
      name_bussiness: "",
      email_bussiness: "",
      password_bussiness: "",
      firstname: "",
      lastname: "",
      email_individual: "",
      password_individual: "",
      type:"bussiness",
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
    this.toggle = this.toggle.bind(this);
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
    const body = {}
    if(this.state.type==="bussiness"){

      for(let each of bussiness_fields){
        body[each]=this.state[each]
      }
      body["password"]=body["password_bussiness"];
      body["confirmPassword"]=body["password_bussiness"];
      body["email"]=body["email_bussiness"];
      body["user_name"]=body["name_bussiness"];
      body["entity_name"]="lender";
      delete body["password_bussiness"];
      delete body["email_bussiness"];
      delete body["name_bussiness"];
      
    }

    if(this.state.type==="individual"){
      for(let each of individual_fields){
        body[each]=this.state[each]
      }
      body["password"]=body["password_individual"];
      body["confirmPassword"]=body["password_individual"];
      body["email"]=body["email_individual"];
      body["user_name"]=`${body["firstname"]} ${body["lastname"]}`;
      body["entity_name"]="lender";
      delete body["password_individual"];
      delete body["email_individual"];
      delete body["firstname"];
      delete body["lastname"];
    }
    
    const pre_action = async () =>{
      try{
      this.setState({
        headertext: "Submitting your details.",
        loader: true,
        response: false,
        success:false,
        color: "#213F7D",
        errortext: ""
      });
  
      await this.props.dispatch(actions("SET_REGISTRATION_AUTH",post_action("",body,"auth/signup","")))
      switch(this.props.state){
        case "success":
        await this.props.dispatch(actions("SET_REGISTERED_EMAIL_FULFILLED",{email:body.email}))
        this.setState({
          headertext: "Account Successfully Created.",
          loader: false,
          response: true,
          success:true,
          registered:true,
          color: "green"
        });
        await this.setTimedNotification(3000)
        break;
        case "failed":
        this.setState({
          headertext: "Signup Failed",
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
          headertext: "Signup in Progress",
        });
        break;
        default:

        break;
      }
    }
      catch (error) {
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
    if(this.state.type==="bussiness" ){
      for(let each of bussiness_fields){
        state[each] = this.state.validFields[each]
      }
    }
    if(this.state.type==="individual" ){
      for(let each of individual_fields){
        state[each] = this.state.validFields[each]
      }
    }
    const _state =Object.values(state);
    const result = _state.reduce((sum, next) => sum && next, true);
    await this.setState({ formValid: result });
  }


  toggle(tab) {
    const tabs ={
      1:"bussiness",
      2:"individual"
    }
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
        type: tabs[tab]
      });
    }
  }
  redirect(link){
    this.props.history.push(link)
  }
  render() {
    return (
      <div>
      {this.state.registered?<Success/>: 
      <div className="access-container">
        <div className="header-row-flex">
          <div className="lend-logo">
            <img src={require('../../../assets/img/brand/logo.svg')} />
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
              <img src={require('../../../assets/img/brand/illustration.svg')} />
            </div>
          </div>
          <div className="right-column-flex">
            <div className="register-form">
              <div className="header"><p>Join Lendstack !</p></div>
              <div className="divider" />
              <div className="form-content">
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: this.state.activeTab === '1' })}
                      onClick={() => { this.toggle('1'); }}
                    >
                      Business Lender
                </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: this.state.activeTab === '2' })}
                      onClick={() => { this.toggle('2'); }}
                    >
                      Individual Lender
                </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1">
                  <Form onSubmit={this.handleSubmit}>
                  <div className="bizname">
                  <FormGroup>
                      <Input value={this.state.name_bussiness} onChange={this.handleUserInput} name="name_bussiness"
                        type="text"
                        maxLength="30"
                        placeholder="Business Name"
                        onBlur={this.handleUserValidation}
                        valid={this.state.validFields.name_bussiness === true}
                        invalid={this.state.validFields.name_bussiness !== true}
                        required
                      />
                   {this.state.formErrors.name_bussiness? <FormFeedback className="invalid-feedback-custom" invalid>{`${this.state.formErrors.name_bussiness}`}</FormFeedback>:null}
                    </FormGroup>
                    </div>
                    <div className="email">
                    <FormGroup>
                      <Input value={this.state.email_bussiness} onChange={this.handleUserInput} name="email_bussiness"
                        type="email"
                        maxLength="30"
                        placeholder="Email"
                        onBlur={this.handleUserValidation}
                        valid={this.state.validFields.email_bussiness === true}
                        invalid={this.state.validFields.email_bussiness !== true}
                        required
                      />
                   {this.state.formErrors.email_bussiness? <FormFeedback className="invalid-feedback-custom" invalid>{`${this.state.formErrors.email_bussiness}`}</FormFeedback>:null}
                    </FormGroup>
                    </div>

                    <div className="password">
                    <FormGroup>
                      <Input value={this.state.password_bussiness} onChange={this.handleUserInput} name="password_bussiness"
                        type="password"
                        maxLength="30"
                        placeholder="Password"
                        onBlur={this.handleUserValidation}
                        valid={this.state.validFields.password_bussiness === true}
                        invalid={this.state.validFields.password_bussiness !== true}
                        required
                      />
                   {this.state.formErrors.password_bussiness? <FormFeedback className="invalid-feedback-custom" invalid>{`${this.state.formErrors.password_bussiness}`}</FormFeedback>:null }
                    </FormGroup>
                    </div>
                    { this.state.response?null:this.state.loader ?
                      <div className="main-loader">
                      <Loader type="Watch" color="black" height="50" width="60"/>
                      </div>:<Input className="submit" disabled={!this.state.formValid} type="submit" value="GET STARTED"/>}
                    {this.state.loader ?null :this.state.response ?                       
                    <div className="text-center loader-text" style={{color:this.state.color,fontSize:"95%"}}>
                      {this.state.headertext}
                    </div>:null}
                    <div className="footer-1">
                      Already have an account? <a onClick={()=>this.redirect("/login")}>Sign in</a>
                    </div>
                    <div className="divider" />
                    <div className="footer-2">
                      <a>Terms of Use </a>and<a> Privacy Policy.</a>
                    </div>
                  </Form>
                  </TabPane>
                  <TabPane tabId="2">
                  <Form onSubmit={this.handleSubmit}>
                    <div className="firstname">
                    <FormGroup>
                      <Input value={this.state.firstname} onChange={this.handleUserInput} name="firstname"
                        type="text"
                        maxLength="30"
                        placeholder="First Name"
                        onBlur={this.handleUserValidation}
                        valid={this.state.validFields.firstname === true}
                        invalid={this.state.validFields.firstname !== true}
                        required
                      />
                   {this.state.formErrors.firstname? <FormFeedback className="invalid-feedback-custom" invalid>{`${this.state.formErrors.firstname}`}</FormFeedback>:null}
                    </FormGroup>                      
                    </div>

                    <div className="lastname">
                    <FormGroup>
                      <Input value={this.state.lastname} onChange={this.handleUserInput} name="lastname"
                        type="text"
                        maxLength="30"
                        placeholder="Last Name"
                        onBlur={this.handleUserValidation}
                        valid={this.state.validFields.lastname === true}
                        invalid={this.state.validFields.lastname !== true}
                        required
                      />
                   {this.state.formErrors.lastname? <FormFeedback className="invalid-feedback-custom" invalid>{`${this.state.formErrors.lastname}`}</FormFeedback>:null}
                    </FormGroup>                      
                    </div>
                    <div className="email">
                    <FormGroup>
                      <Input value={this.state.email_individual} onChange={this.handleUserInput} name="email_individual"
                        type="email"
                        maxLength="30"
                        placeholder="Email"
                        onBlur={this.handleUserValidation}
                        valid={this.state.validFields.email_individual === true}
                        invalid={this.state.validFields.email_individual !== true}
                        required
                      />
                   {this.state.formErrors.email_individual? <FormFeedback className="invalid-feedback-custom" invalid>{`${this.state.formErrors.email_individual}`}</FormFeedback>:null}
                    </FormGroup>                      
                    </div>
                    <div className="password">
                    <FormGroup>
                      <Input value={this.state.password_individual} onChange={this.handleUserInput} name="password_individual"
                        type="password"
                        maxLength="30"
                        placeholder="Password"
                        onBlur={this.handleUserValidation}
                        valid={this.state.validFields.password_individual === true}
                        invalid={this.state.validFields.password_individual !== true}
                        required
                      />
                    {this.state.formErrors.password_individual? <FormFeedback className="invalid-feedback-custom" invalid>{`${this.state.formErrors.password_individual}`}</FormFeedback>:null}
                    </FormGroup>
                    </div>

                    { this.state.response?null:this.state.loader ?
                      <div className="main-loader">
                      <Loader type="Watch" color="black" height="50" width="60"/>
                      </div>:<Input className="submit" disabled={!this.state.formValid} type="submit" value="GET STARTED"/>}
                    {this.state.loader ?null :this.state.response ?                       
                    <div className="text-center loader-text" style={{color:this.state.color,fontSize:"95%"}}>
                      {this.state.headertext}
                    </div>:null}
                    
                    <div className="footer-1">
                      Already have an account? <a>Sign in</a>
                    </div>
                    <div className="divider" />
                    <div className="footer-2">
                      <a>Terms of Use </a>and<a> Privacy Policy.</a>
                    </div>
                    </Form>
                  </TabPane>
                </TabContent>
              </div>
            </div>
          </div>
        </div>
      </div>}
      </div>
    );
  }
}

export default connect(store => {
  return {
    state: store.action.registration_auth_state,
 
  };
})(withRouter(Register));