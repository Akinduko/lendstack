import React, {Component} from 'react';
import {
  Input,
  FormFeedback,
  FormGroup,
  Form
} from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { post_action ,get_action} from  '../../../../controllers/requests';
import { actions } from '../../../../state/actions';
import Loader from 'react-loader-spinner'


const validField =["account_number","bank_name"]

const fields = {
  bank_name: "",
  account_number: ""
}

const validFields ={
  bank_name: false,
  account_number: false
}


class First extends Component {

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
    const profile= this.props.profile;
    const id = profile.companies?profile.companies[0].id:""
    const body = {
      "bank_id":parseInt(this.state.bank_name),
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
      await this.props.dispatch(actions("CREATE_LENDER_ACCOUNT",post_action(this.props.auth.token,body,`lenders/${id}/bank_accounts`,"")))
      switch(this.props.create_lender_account_state){
        case "success":
        this.setState({
          headertext: "Login Successful",
          loader: false,
          response: true,
          success:true,
          color: "green"
        });
        this.props.nextStep()
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

  renderBanks = banks => {
    let array = [];
    if (banks) {
      for (let each of banks) {
        array.push(
          <option value={each.id}>{each.code_description}</option>
        );
      }
      return array;
    } else {
      return [<option value="" />];
    }
  };

  render() {
    return (
        <div className="add-account-page">
        <div className="add-account-left">
        <p>Add Bank Account.</p>
        <a>Add your bank account</a>
        </div>
        <div className="add-account-right">
        <div className="form-content">
        <Form onSubmit={this.handleSubmit}>
        <div className="input-groups">
        <div className="account_number">
        <p>Account Number</p>
            <FormGroup>
                      <Input value={this.state.account_number} onChange={this.handleUserInput} name="account_number"
                        type="account_number"
                        maxLength="30"
                        placeholder=""
                        onBlur={this.handleUserValidation}
                        valid={this.state.validFields.account_number === true}
                        invalid={this.state.validFields.account_number !== true}
                        required
                      />
                   {this.state.formErrors.account_number? <FormFeedback className="invalid-feedback-custom" invalid>{`${this.state.formErrors.account_number}`}</FormFeedback>:null}
           </FormGroup>                    
            </div>
        <div className="bank_name"> 
        <p>Select Bank</p>
            <FormGroup>
                      <Input value={this.state.bank_name} onChange={this.handleUserInput} name="bank_name"
                        type="select"
                        maxLength="30"
                        className="select-group"
                        placeholder=""
                        onBlur={this.handleUserValidation}
                        valid={this.state.validFields.bank_name === true}
                        invalid={this.state.validFields.bank_name !== true}
                        required
                      >
                    <option value=""></option>
                    {this.renderBanks(this.props.all_banks)}
                    </Input>
                   {this.state.formErrors.bank_name? <FormFeedback className="invalid-feedback-custom" invalid>{`${this.state.formErrors.bank_name}`}</FormFeedback>:null }
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
        </div>
      )
  }
}

export default connect(store => {
  return {
    state: store.action.create_lender_account_state,
    error: store.action.create_lender_account_error,
    all_banks: store.action.all_banks?store.action.all_banks.codes:[],
    all_banks_state: store.action.all_banks_state,
    create_lender_account:store.action.create_lender_account,
    profile:store.action.user,
    auth: store.token.auth,
    create_lender_account_state:store.action.create_lender_account_state
  };
})(withRouter(First));
