import React, {Component} from 'react';
import {
  Input,
  FormFeedback,
  FormGroup,
  Form
} from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { put_action ,get_action} from  '../../../controllers/requests';
import { actions } from '../../../state/actions';
import Loader from 'react-loader-spinner'

const validField =["email","password","phonenumber","firstname","lastname"]

const fields = {
  email: "",
  firstname:"",
  lastname:"",
  phonenumber:"",
  password:""
}

const validFields ={
  email: false,
  firstname:false,
  lastname:false,
  phonenumber:false,
  password:false
}

class Account extends Component {

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
    await this.props.dispatch(actions("GET_USER",get_action(this.props.auth.token,"users/me/profile","")))
    switch(this.props.profileState){
      case "success":
      const profile = this.props.profile
      this.setState({
        email: profile?this.props.profile.email:"",
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
    body["mobile"]= _body["phonenumber"];
    body["user_name"]=`${_body["firstname"]} ${_body["lastname"]}`;

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
      await this.props.dispatch(actions("UPDATE_USER",put_action(this.props.auth.token,body,"users/me/profile","")))
      switch(this.props.state){
        case "success":
        this.setState({
          headertext: "Update Successful",
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
          headertext: "Submitting your details.",
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
        <div className="account-header"><a>Details</a></div>
        <div className="account-divider"></div>
        <Form onSubmit={this.handleSubmit}>
        <div className="account-full-name">
        <div className="full-name"><p>Edit Full Name</p><a>Your full name.</a></div>
        <div className="user-detail-input">
        <div className="first-name"><p>First Name</p>
        <FormGroup>
                      <Input value={this.state.firstname} onChange={this.handleUserInput} name="firstname"
                        type="text"
                        maxLength="30"
                        placeholder="First Name"
                        onBlur={this.handleUserValidation}
                        valid={this.state.validFields.firstname === true}
                        invalid={this.state.validFields.firstname !== true}
                        
                      />
                   {this.state.formErrors.firstname? <FormFeedback className="invalid-feedback-custom" invalid>{`${this.state.formErrors.firstname}`}</FormFeedback>:null}
        </FormGroup>  
        </div>
        <div className="last-name"><p>Last Name</p>
        <FormGroup>
                      <Input value={this.state.lastname} onChange={this.handleUserInput} name="lastname"
                        type="text"
                        maxLength="30"
                        placeholder="Last Name"
                        onBlur={this.handleUserValidation}
                        valid={this.state.validFields.lastname === true}
                        invalid={this.state.validFields.lastname !== true}
                        
                      />
                   {this.state.formErrors.lastname? <FormFeedback className="invalid-feedback-custom" invalid>{`${this.state.formErrors.lastname}`}</FormFeedback>:null}
        </FormGroup>     
        </div>
        </div>
        </div>
        <div className="account-email">
        <div className="email"><p>Email Address</p><a>We send saving notifications to your confirmed email address.</a></div>
        <div className="email-address"><p>Email Address</p>
        <FormGroup>
                      <Input value={this.state.email}
                        type="email"
                        disabled
                      />
         </FormGroup>          
        </div>
        </div>
        <div className="account-phone-number">
        <div className="phone-number"><p>Phone Number</p><a>We send sms verification messages to your phone number.</a></div>
        <div className="number"><p>Phone Number</p>
        <FormGroup>
                      <Input value={this.state.phonenumber} onChange={this.handleUserInput} name="phonenumber"
                        type="phonenumber"
                        maxLength="15"
                        minLength="11"
                        placeholder=""
                        onBlur={this.handleUserValidation}
                        valid={this.state.validFields.phonenumber === true}
                        invalid={this.state.validFields.phonenumber !== true}
                      
                      />
                   {this.state.formErrors.phonenumber? <FormFeedback className="invalid-feedback-custom" invalid>{`${this.state.formErrors.phonenumber}`}</FormFeedback>:null}
       </FormGroup>          
        </div>
        </div>      
        <div className="submit-flex">
        { this.state.response?null:this.state.loader ?
                      <div className="account-loader">
                      <Loader type="Watch" color="black" height="50" width="60"/>
                      </div>:<Input className="account-submit" type="submit" value="Save Changes"/>}
            {this.state.loader ?null :this.state.response ?                       
                    <div className="text-center account-loader-text" style={{color:this.state.color,fontSize:"95%"}}>
                      {this.state.headertext}
        </div>:null}
      </div>
      </Form>
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
    profileState:store.getuser.state
  };
})(withRouter(Account));
