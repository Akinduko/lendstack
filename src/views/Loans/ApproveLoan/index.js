import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Input,
  FormFeedback,
  FormGroup
          } from 'reactstrap';
  import { actions } from '../../../state/actions';
  import { post_action } from  '../../../controllers/requests';
  import Loader from 'react-loader-spinner'

      const validField =["amount","tenure","interest"]

      const fields = {
        amount: "",
        tenure:"",
        interest:""
      }
      
      const validFields ={
        amount: false,
        tenure:false,
        interest:false
      }
      
      

class DeclineLoan extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeelement:"Loans",
      element:"loans",
      response:false,
      color:"red",
      success:false,
      email: "",
      loader: false,
      code: false,
      errortext: "",
      formErrors: fields,
      fontSize: "",
      modal: false,
      button:false,
      headertext:"",
      formValid: false,
      formErrors: fields,
      validFields:validFields,
    };
  
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
  async componentWillUnmount(){
    await this.props.dispatch(actions("SET_PENDING_LOAN_FULFILLED",{}))
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

  handleUserInput = async (e) => {
    const value = e.target.value;
    const name = e.target.name;
    await this.setState({ [name]:value });
  }

  async handleSubmits(){
    const body = {
      "loan_amount": this.state.amount,
      "interest_rate": this.state.interest,
      "tenor": this.state.tenure
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
      const id = this.props.set_pending_loan.id
      await this.props.dispatch(actions("APPROVE_LOAN_STATUS",post_action(this.props.token,body,`loans/${id}/approve`,"")))
      switch(this.props.approve_loan_status_state){
        case "success":
        this.setState({
          headertext: "Login Successful",
          loader: false,
          response: true,
          success:true,
          color: "green"
        });
        this.props.history.push('/loans')
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

  render() {
    return (
      <div className="approve-loan">
      <div className="notification"><img src={require('../../../assets/img/brand/notification.svg')}/></div>
      <div className="add-guarantor">
      <div className="left">
      <p>APPROVE LOAN.</p>
      <a>You are approving this loan application, Complete the process by filling the required information</a>
      </div> 
      <div className="right-area">
      <div className="text-area">
      <div className="caption"><a>Amount</a></div>
      <div className="area"><FormGroup>
            <Input 
              value={this.state["amount"]} 
              onChange={this.handleUserInput} 
              name="amount"
              type="number"
              maxLength="10"
              minLength="4"
              placeholder=""
              onBlur={this.handleUserValidation}
              valid={this.state.validFields["amount"] === true}
              invalid={this.state.validFields["amount"] !== true}
              required
            />
        {this.state.formErrors[`amount`]? <FormFeedback className="invalid-feedback-custom" invalid>{`${this.state.formErrors[`amount`]}`}</FormFeedback>:null}
      </FormGroup></div>
      <div className="caption"><a>Tenure</a></div>
      <div className="area"><FormGroup>
            <Input value={this.state.tenure} onChange={this.handleUserInput} name="tenure"
              type="number"
              maxLength="2"
              minLength="1"
              placeholder=""
              onBlur={this.handleUserValidation}
              valid={this.state.validFields["tenure"] === true}
              invalid={this.state.validFields["tenure"] !== true}
              required
            />
        {this.state.formErrors["tenure"]? <FormFeedback className="invalid-feedback-custom" invalid>{`${this.state.formErrors["tenure"]}`}</FormFeedback>:null}
      </FormGroup></div>
      <div className="caption"><a>Interest</a></div>
      <div className="area"><FormGroup>
            <Input 
              value={this.state["interest"]} 
              onChange={this.handleUserInput} 
              name="interest"
              type="number"
              maxLength="3"
              minlength="1"
              placeholder=""
              onBlur={this.handleUserValidation}
              valid={this.state.validFields[`interest`] === true}
              invalid={this.state.validFields[`interest`] !== true}
              required
            />
        {this.state.formErrors[`interest`]? <FormFeedback className="invalid-feedback-custom" invalid>{`${this.state.formErrors[`interest`]}`}</FormFeedback>:null}
      </FormGroup></div>
      </div>
      <div className="submit">
      { this.state.response?null:this.state.loader ?
                      <div className="login-loader">
                      <Loader type="Watch" color="black" height="50" width="60"/>
                      </div>:<Input  onClick={()=>this.handleSubmits()} type="submit" value="CONFIRM APPROVAL"/>}
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
      token:store.token.auth?store.token.auth.token:"",
      profile:store.action.user,
      profileState:store.action.user_state,
      set_pending_loan:store.action.set_pending_loan,
      approve_loan_status_state:store.action.approve_loan_status_state
    };
  })(withRouter(DeclineLoan));