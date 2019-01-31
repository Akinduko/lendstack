import React, { Component } from 'react';
import DataArtistList from './DataArtistList';
import {
  Input,
  FormFeedback,
  FormGroup,
  Form,
  Modal
} from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { post_action ,get_action} from  '../../../controllers/requests';
import { actions } from '../../../state/actions';
import Loader from 'react-loader-spinner'


const validField =["first_name","last_name","email","phone_number"]

const fields = {
  first_name: "",
  last_name: "",
  email:"",
  phone_number:""
}

const validFields ={
  first_name: false,
  last_name: false,
  email:false,
  phone_number:false
}

class Management extends Component {

  constructor(props) {

    super(props);
    this.state = {
      addusermodal: false,
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

  async componentDidMount(){
    await this.props.dispatch(actions("GET_ALL_ROLES",get_action(this.props.token,`roles`,``)))
    switch(this.props.all_products_state){
      case "success":
      break
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
    const body ={
      "user_name": `${this.state.first_name} ${this.state.last_name}`,
      "email": `${this.state.email}`,
      "role_id": parseInt(this.state.role)
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
      const profile= this.props.profile;
      const id = profile.companies?profile.companies[0].id:""
      await this.props.dispatch(actions("CREATE_LENDER_USER",post_action(this.props.token,body,`lenders/${id}/users`,"")))
      switch(this.props.create_lender_user_state){
        case "success":
        this.setState({
          headertext: "Login Successful",
          loader: false,
          response: true,
          success:true,
          color: "green"
        });
        this.toggleModal("addusermodal")
        const profile= this.props.profile;
        const id = profile.companies?profile.companies[0].id:""
        await this.props.dispatch(actions("GET_ALL_USERS",get_action(this.props.token,`lenders/${id}/users`,``)))
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
    if (value.length > 13) {
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

  renderRoles = roles => {
    let array = [];
    if (roles) {
      for (let each of roles) {
        array.push(
          <option value={each.id}>{each.user_role}</option>
        );
      }
      return array;
    } else {
      return [<option value="" />];
    }
  };

  toggleModal(name){
    const action ={}
    action[name]=!this.state[name]
    this.setState(action)
}


  render() {
    return (
      <div className="pl-5 pr-5 mt-5 d-flex flex-column w-100 h-100 user-management-page">
        <Modal isOpen={this.state.addusermodal} className="edit-user-modal">
        
      <div className="sub-container">
      <Form onSubmit={this.handleSubmit}>
      <div className="header"><p>Add new user</p> <i onClick={()=>this.toggleModal("addusermodal")}  className="fa fa-close"></i></div>
      <div className="divider"/>
      <div className="first-name"><a>First Name</a>
      <FormGroup>
                      <Input value={this.state.first_name} onChange={this.handleUserInput} name="first_name"
                        type="text"
                        maxLength="30"
                        placeholder=""
                        onBlur={this.handleUserValidation}
                        valid={this.state.validFields.first_name === true}
                        invalid={this.state.validFields.first_name !== true}
                        required
                      >
                    </Input>
                   {this.state.formErrors.first_name? <FormFeedback className="invalid-feedback-custom" invalid>{`${this.state.formErrors.first_name}`}</FormFeedback>:null }
                    </FormGroup>
      </div>
      <div className="last-name"><a>Last Name</a>
      <FormGroup>
                      <Input value={this.state.last_name} onChange={this.handleUserInput} name="last_name"
                        type="text"
                        maxLength="30"
                        placeholder=""
                        onBlur={this.handleUserValidation}
                        valid={this.state.validFields.last_name === true}
                        invalid={this.state.validFields.last_name !== true}
                        required
                      >
                    </Input>
                   {this.state.formErrors.last_name? <FormFeedback className="invalid-feedback-custom" invalid>{`${this.state.formErrors.last_name}`}</FormFeedback>:null }
                    </FormGroup>
      </div>
      <div className="role"><a>Role</a>
      <FormGroup>
                      <Input value={this.state.role} onChange={this.handleUserInput} name="role"
                        type="select"
                        maxLength="30"
                        className="select-group"
                        
                        required
                      >
                    <option value=""></option>
                    {this.renderRoles(this.props.get_roles)}
                    
                    </Input>
                   {this.state.formErrors.role? <FormFeedback className="invalid-feedback-custom" invalid>{`${this.state.formErrors.role}`}</FormFeedback>:null }
                    </FormGroup>
      </div>
      <div className="email"><a>Email</a>
      <FormGroup>
                      <Input value={this.state.email} onChange={this.handleUserInput} name="email"
                        type="text"
                        maxLength="30"
                        placeholder=""
                        onBlur={this.handleUserValidation}
                        valid={this.state.validFields.email === true}
                        invalid={this.state.validFields.email !== true}
                        required
                      >
                    </Input>
                   {this.state.formErrors.email? <FormFeedback className="invalid-feedback-custom" invalid>{`${this.state.formErrors.email}`}</FormFeedback>:null }
      </FormGroup>
      </div>
      <div className="phone-number"><a>Phone Number</a>
      <FormGroup>
                      <Input value={this.state.phone_number} onChange={this.handleUserInput} name="phone_number"
                        type="text"
                        maxLength="30"
                        placeholder=""
                        onBlur={this.handleUserValidation}
                        valid={this.state.validFields.phone_number === true}
                        invalid={this.state.validFields.phone_number !== true}
                        required
                      >
                    </Input>
                   {this.state.formErrors.phone_number? <FormFeedback className="invalid-feedback-custom" invalid>{`${this.state.formErrors.phone_number}`}</FormFeedback>:null }
      </FormGroup>    
      </div>
      <div className="submit">
      { this.state.response?null:this.state.loader ?
                      <div className="login-loader">
                      <Loader type="Watch" color="black" height="50" width="60"/>
                      </div>:<Input className="submit"  type="submit" value="ADD NEW USER"/>}
                           {this.state.loader ?null :this.state.response ?                       
            <div className="text-center login-loader-text" style={{color:this.state.color,fontSize:"95%"}}>
              {this.state.headertext}
            </div>:null}
      </div>
      </Form>
      </div>
      </Modal>
      <div className="add-user-button  mt-5 d-flex h-10 flex-row justify-content-end w-100"><button onClick={()=>this.toggleModal("addusermodal")} >ADD NEW USER</button></div>
      <div className="d-flex flex-row w-100 user-table-container">
      <DataArtistList/>
      </div>
      </div>
    );
  }
}


export default connect(store => {
  return {
    state: store.validate.state,
    error: store.validate.error,
    auth:store.validate.auth,
    get_roles:store.action.get_roles?store.action.get_roles.roles:[],
    get_roles_state:store.action.get_roles,
    profile:store.action.user,
    create_lender_user_state:store.action.create_lender_user_state,
    create_lender_user:store.action.create_lender_user,
    token:store.token.auth?store.token.auth.token:"",
    error:store.action.create_lender_user_error,
  };
})(withRouter(Management));
