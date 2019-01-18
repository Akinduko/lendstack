import React, {Component} from 'react';
import {
  Input,
  FormFeedback,
  FormGroup,
  Form
} from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { put_action,post_action,get_action} from  '../../../controllers/requests';
import { actions } from '../../../state/actions';
import Loader from 'react-loader-spinner'
import { AppSwitch } from '@coreui/react'

const validField =["name","tenor_min","tenor_max","amount_min","amount_max","employed","office_mail","salary_min","salary_max"]

const fields = {
  name: "",
  tenor_min:"",
  tenor_max:"",
  amount_min:"",
  amount_max:"",
  employed:false,
  office_mail:false,
  salary_min:"",
  salary_max:""
}

const validFields ={
  name: false,
  tenor_min:false,
  tenor_max:false,
  amount_min:false,
  amount_max:false,
  employed:false,
  office_mail:false,
  salary_min:false,
  salary_max:false
}

class Parameters extends Component {

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
      validField,
      value: '',
      suggestions: [],
      fontSize: "",
      modal: false,
      button:false,
      headertext:"",
      formValid: false
    };
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleUserValidation = this.handleUserValidation.bind(this);
  }

  async componentDidMount(){
  
    if(this.props.edit_product && this.props.edit_product.id){
      const id = this.props.edit_product.id
      await this.props.dispatch(actions("EDIT_PRODUCT_PARAMETERS",get_action(this.props.token,`products/${id}/parameters`,"")))
      switch(this.props.edit_product_parameters_state){
        case "success":
        const _validFields ={}
        const _validField =[]
        const _fields ={}
        const values ={}
        for (let each of this.props.edit_product_parameters ){
          _validField.push(`${each.parameter_description}_min`)
          _validField.push(`${each.parameter_description}_max`)
          _validFields[`${each.parameter_description}_max`]=false
          _validFields[`${each.parameter_description}_min`]=false
          _fields[`${each.parameter_description}_max`]=""
          _fields[`${each.parameter_description}_min`]=""
          values[`${each.parameter_description}_max`]=each.parameter_maximum_value
          values[`${each.parameter_description}_min`]=each.parameter_minimum_value
          values[`${each.parameter_description}`]=each.parameter_value
        }
        await this.setState({
          formErrors:{...this.state["formErrors"],..._fields},
          validFields:{...this.state["validFields"],..._validFields},
          validField:[...this.state["validField"],..._validField],
          name:this.props.product_name,
          ...values
        })
        break;
        case "failed":
        return <div>An Error Occured</div>
        break;
        case "pending":
        return <div>Loading</div>
        break;
        default:
    
        break;
      }   
    }
    else{
      this.props.history.push('/product')
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
        headertext: ""
      })
    }
    return setTimeout(async () => {
      await operation()
    }, time);
  }

  async handleNext() {
    const _body={}
    for(let each of this.state.validField){
      _body[each]=this.state[each]
    }

    const pre_action = async (id) =>{
      try{
      this.setState({
        headertext: "Verifying your details.",
        loader: true,
        response: false,
        success:false,
        color: "#213F7D",
        errortext: ""
      });
      const body={
                  "product_name":_body.name,
                  "product_description": "Lender created product",
                  "lender_id": id,
                  "is_published": false
                }
      const product_id = this.props.edit_product.id
      await this.props.dispatch(actions("UPDATE_NEW_PRODUCT",put_action(this.props.token,body,`products/${product_id}`,"")));
      switch(this.props.update_new_product_state){
        case "success":
        const _id =this.props.update_new_product.id
        const body = []
        for (let each of this.props.product_parameters ){
          const param =     {
            "parameter_type_id": each.id,
            "parameter_description": "string",
            "parameter_minimum_value": this.state[`${each.parameter_description}_min`],
            "parameter_maximum_value": this.state[`${each.parameter_description}_max`],
            "is_required": true,
            "sort_id": 0
          }
          body.push(put_action(this.props.token,param,`products/parameters/${product_id}`,""))
        }
        const result= await Promise.all(body)
        if (result.length>0){
          return  await this.props.dispatch(actions("SET_PRODUCT_TAB_FULFILLED","2"))
        }
        window.location.reload(); 
        break;
        case "failed":
        this.setState({
          headertext: this.props.update_new_product_error.response?this.props.update_new_product_error.response.data.message:"Request failed, Please try again",
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
      // const start = pre_action()
      if(this.props.profile){
        const profile= this.props.profile
        const start = pre_action(profile.lenders[0].id)
      }
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
      console.log(error)
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



  async handleSwitch(e){
    const value = e.target.value;
    const name = e.target.name;
    await this.setState({ [name]: !this.state[name] });
  }
  async validateForm() {
    let state ={}
      for(let each of this.state.validField){
        state[each] = this.state.validFields[each]
      }
    const _state = Object.values(state);
    const result = _state.reduce((sum, next) => sum && next, true);
    await this.setState({ formValid: result });
  }

  redirect(link){
    this.props.history.push(link)
  }

  renderParameters(){
    const Group = (name,id) =>{
      return  (<div key={id} className="group">
      <div className="first"><a>{name}</a>
      <FormGroup>
                       <Input value={this.state[`${name}_min`]} onChange={this.handleUserInput} name={`${name}_min`}
                         type="text"
                         maxLength="30"
                         placeholder="Min"
                         onBlur={this.handleUserValidation}
                         valid={this.state.validFields[`${name}_min`] === true}
                         invalid={this.state.validFields[`${name}_min`] !== true}
                         required
                       />
                    {this.state.formErrors[`${name}_min`]? <FormFeedback className="invalid-feedback-custom" invalid>{`${this.state.formErrors[`${name}_min`]}`}</FormFeedback>:null}
            </FormGroup>      
      </div>
      <div className="second">
             <FormGroup>
                       <Input value={this.state[`${name}_max`]} onChange={this.handleUserInput} name={`${name}_max`}
                         type="text"
                         maxLength="30"
                         placeholder="Max"
                         onBlur={this.handleUserValidation}
                         valid={this.state.validFields[`${name}_max`] === true}
                         invalid={this.state.validFields[`${name}_max`] !== true}
                         required
                       />
                    {this.state.formErrors[`${name}_max`]? <FormFeedback className="invalid-feedback-custom" invalid>{`${this.state.formErrors[`${name}_max`]}`}</FormFeedback>:null}
            </FormGroup> 
            </div>
      </div>)
    }  
    const Row =(name,id)=>{
      return <div className="row">
      <a>Must Customer be employed?</a>
      <div className="switch"><AppSwitch className={'mx-1'} color={'success'} name="employed" onClick={this.handleSwitch.bind(this)}   checked={this.state.employed} /></div>
      </div>
    }
    switch(this.props.edit_product_parameters_state){
      case "success":
      const body =[]
      for (let each of this.props.edit_product_parameters ){
        body.push(Group(each.parameter_description,each.id))
      }
      return body
      break;
      case "failed":
      return <div>An Error Occured</div>
      break;
      case "pending":
      return <div>Loading</div>
      break;
      default:
  
      break;
    }
  }
  render() {
    return (
      <div className="parameter-page" >
      <div className="left-details">
      <div className="first">
      <a>Parameters</a>
      </div>
      <div className="second">
      <a>Set your product parameters</a>
      </div> 
     </div>

    <div className="right-details">
     <div className="parameters">
     <div className="full"><a>Name</a>
    <FormGroup>
                      <Input value={this.state.name} onChange={this.handleUserInput} name="name"
                        type="text"
                        maxLength="30"
                        placeholder=""
                        onBlur={this.handleUserValidation}
                        valid={this.state.validFields.name === true}
                        invalid={this.state.validFields.name !== true}
                        required
                      />
                   {this.state.formErrors.name? <FormFeedback className="invalid-feedback-custom" invalid>{`${this.state.formErrors.name}`}</FormFeedback>:null}
           </FormGroup>  
     </div>
      {this.renderParameters()}
     </div>
     { this.state.response?null:this.state.loader ?
                      <div className="login-loader">
                      <Loader type="Watch" color="black" height="50" width="60"/>
                      </div>: <div className="submit"> <Input onClick={()=>this.handleNext()} type="button" value="SAVE CHANGES"/></div>}
            {this.state.loader ?null :this.state.response ?                       
                    <div className="text-center login-loader-text" style={{color:this.state.color,fontSize:"95%"}}>
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
    error: store.login.error,
    token:store.token.auth?store.token.auth.token:"",
    profile:store.action.user,
    profileState:store.action.user_state,
    new_product: store.action.new_product,
    create_product:store.action.create_product?store.action.create_product.product:{},
    create_product_state:store.action.create_product_state,
    product_parameters:store.action.product_parameters?store.action.product_parameters.parameters:[],
    product_parameters_state:store.action.product_parameters_state,
    create_parameter:store.action.create_parameter?store.action.create_parameter:{},
    create_parameter_state:store.action.create_parameter_state,
    edit_product:store.action.edit_product,
    edit_product_parameters:store.action.edit_product_parameters?store.action.edit_product_parameters.parameters:[],
    edit_product_parameters_state:store.action.edit_product_parameters_state,
    product_name:store.action.edit_product?store.action.edit_product.product_name:"",
   update_new_parameter:store.action.update_new_parameter,
   update_new_parameter_state:store.action.update_new_parameter_state,
   update_new_product:store.action.update_new_product,
   update_new_product_state:store.action.update_new_product_state

  };
})(withRouter(Parameters));
