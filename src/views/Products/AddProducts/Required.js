import React, {Component} from 'react';
import {
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { put_action ,post_action, get_action} from  '../../../controllers/requests';
import { actions } from '../../../state/actions';
import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';
import { AppSwitch } from '@coreui/react'
import Loader from 'react-loader-spinner'
 
// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';
// import Collapsible from 'react-collapsible';
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


class Required extends Component {

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
      formValid: false,
    };
    this.handleUserInput = this.handleUserInput.bind(this);
    this.handleUserValidation = this.handleUserValidation.bind(this);
  }

  async componentDidMount(){
    await this.props.dispatch(actions("GET_PRODUCT_GROUP",get_action(this.props.token,"codes/fetch/field-group","")))
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

  handleDynamics = async (name,value) => {
    await this.setState({ [name]: value });
  }

  async handleFields(id){
    await this.props.dispatch(actions("GET_PRODUCT_FIELDS",get_action(this.props.token,`products/fields/groups/${id}`,"")))
    switch(this.props.group_fields_state){
      case "success":
      if(this.props.group_fields && this.props.group_fields.fields){
        const fields = this.props.group_fields.fields;
        await this.handleDynamics(id,fields);
        return this.renderFields(id);
        break
      }
      default:
      return null
    }
  }

  renderFields(name){
    if(name && this.state[name]){
      const body = this.state[name]
      const items =[]
      for(let each of body){ 
        items.push(<div key={each.id} className="group">
        <div className="title"><a>{each["field_name"]}</a><div className="switch"><AppSwitch className={'mx-1'} onClick={()=>this.handleDynamics(`field_${each.id}`,true)} color={'success'} checked={this.state[`field_${each.id}`]} /></div></div>
        <div className="divider"/>
        </div>)
      }
      return items
    }
    return null
  }

 async handleNext() {
    const all = Object.keys(this.state)
    const field_1 = []
    const _body ={
      "lender_id": 0,
      "fields": [
        {
          "field_id": 0
        }
      ]
    }
    for(let each of all){
      if(each.includes("field_") && this.state[each] ){
        const identity = each.split("field_")[1]
        field_1.push({field_id:identity})
      }
      _body["fields"]=field_1
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
      _body["lender_id"]=id
      const product_id = this.props.create_product.product.id
      await this.props.dispatch(actions("SET_NEW_PRODUCT",post_action(this.props.token,_body,`products/${product_id}/fields`,"")));
      switch(this.props.set_product_state){
        case "success":
        await this.props.dispatch(actions("SET_PRODUCT_TAB_FULFILLED","2"))
        window.location.reload(); 
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
          headertext: this.props.create_product_error.response?this.props.create_product_error.response.data.message:"Request failed, Please try again",
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
        const start = pre_action(profile.companies[0].id)
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
    }
    
  }


  renderGroups(){

    const groups = this.props.required_groups;
    const container =[];
    if(groups && groups.codes){
      for(let each of groups.codes){   
        const id= each.id;
        const name =each.code_description
        container.push(<div className="each-box">
        <AccordionItem>
          <AccordionItemTitle>
            <h3 onClick={()=>this.handleFields(id,name)}>{name}</h3>
          </AccordionItemTitle>
          <AccordionItemBody>
            <div className="fields">
            {this.renderFields(`${id}`)}   
            </div>
          </AccordionItemBody>
         </AccordionItem>
         </div>)
      }
      return <Accordion>{container}</Accordion>
    }
    return container
  }
  render() {
    return (
      <div className="required-page" >
      <div className="left-details">
      <div className="first">
      <a>Required Fields</a>
      </div>
      <div className="second">
      <a>Set the fields you require from your customers</a>
      </div> 
     </div>

      <div className="right-details">
      {this.renderGroups()}
      { this.state.response?null:this.state.loader ?
                      <div className="login-loader">
                      <Loader type="Watch" color="black" height="50" width="60"/>
                      </div>: <div className="submit"> <Input onClick={()=>this.handleNext()} type="button" value="CREATE PRODUCT"/></div>}
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
    required_groups: store.action.all_groups,
    group_fields:store.action.group_fields,
    group_fields_state:store.action.group_fields_state,
    create_product:store.action.create_product,
    set_product_state:store.action.set_product_state
  };
})(withRouter(Required));
