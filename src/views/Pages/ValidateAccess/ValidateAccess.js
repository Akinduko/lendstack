import React, {Component} from 'react';
import {
  Input,
  FormFeedback,
  FormGroup,
  Form,
  Row,
  Container,
  Card
} from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { post_action } from  '../../../controllers/requests';
import { actions } from '../../../state/actions';
import Loader from 'react-loader-spinner'
import * as Yup from 'yup'
import { Formik } from 'formik';

const validationSchema = function (values) {
  return Yup.object().shape({
    password: Yup.string()
    .min(8, `Password has to be at least ${8} characters!`)
    .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/, 'Password must contain: numbers, uppercase and lowercase letters\n')
    .required('Password is required'),
    confirmPassword: Yup.string()
    .oneOf([values.password], 'Passwords must match')
    .required('Password confirmation is required'),
    fullname: Yup.string()
    .min(2, `Name has to be at least 2 characters`)
    .max(30, `Name has to be at most 30 characters`)
    .required("We need to have your name, don't you think so?")
  })
}

const validate = (getValidationSchema) => {
  return (values) => {
    
    const validationSchema = getValidationSchema(values)

    try {
      validationSchema.validateSync(values, { abortEarly: false })
      return {}
    } catch (error) {
      return getErrorsFromValidationError(error)
    }
  }
}

const getErrorsFromValidationError = (validationError) => {
  const FIRST_ERROR = 0
  return validationError.inner.reduce((errors, error) => {
    return {
      ...errors,
      [error.path]: error.errors[FIRST_ERROR],
    }
  }, {})
}


const onSubmit = (values, { setSubmitting, setErrors }) => {
  setTimeout(() => {
    alert(JSON.stringify(values, null, 2))
    // console.log('User has been successfully saved!', values)
    setSubmitting(false)
  }, 2000)
}



const initialValues = {
  confirmPassword: "",
  password: ""
}

class ValidateAccess extends Component {

  constructor(props) {

    super(props);
   
    this.state = {
      token: props.match.params.id,
      query: props.location.search
    };
  }

  async componentDidMount(){
    if(this.state.query && this.state.query.includes("invited=true")){
      return null
    }
    if(this.state.query && this.state.query.includes("?invited_borrower=true")){
      // return await this.props.dispatch(actions("VALIDATE_AUTH",post_action("",{},`auth/activate/borrowers/${this.state.token}`,"")))
      return null
    }
     return await this.props.dispatch(actions("VALIDATE_AUTH",post_action("",{},`auth/activate/${this.state.token}`,"")))


  }

  redirect(link){
    this.props.history.push(link)
  }

  findFirstError (formName, hasError) {
    const form = document.forms[formName]
    for (let i = 0; i < form.length; i++) {
      if (hasError(form[i].name)) {
        form[i].focus()
        break
      }
    }
  }

  validateForm (errors) {
    this.findFirstError('simpleForm', (fieldName) => {
      return Boolean(errors[fieldName])
    })
  }

  touchAll(setTouched, errors) {
    setTouched({
        firstName: true,
        lastName: true,
        userName: true,
        email: true,
        password: true,
        confirmPassword: true,
        accept: true
      }
    )
    this.validateForm(errors)
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
  async handleSubmit(value,event){

    event.preventDefault()
    const body={

    }
    if(this.state.query && this.state.query.includes("?invited=true")){
       body["confirmPassword"]=value.confirmPassword;
       body["password"]=value.confirmPassword;
    }

    if(this.state.query && this.state.query.includes("?invited_borrower=true")){
        body["user_name"]=value.fullname;
        body["confirmPassword"]=value.confirmPassword;
        body["password"]=value.confirmPassword;
    }

    const lender_action = async () =>{
      try{
      this.setState({
        headertext: "Verifying your details.",
        loader: true,
        response: false,
        success:false,
        color: "#213F7D",
        errortext: ""
      });
        await this.props.dispatch(actions("ACTIVATE_REGISTRATION_AUTH",post_action("",body,`/api/auth/activate/${this.state.token}`,"")))
      
        switch(this.props.activate_auth_state){
        case "success":
        this.props.dispatch(actions("NEW_USER_STATE_FULFILLED",{state:true}))
        this.props.dispatch(actions("VALIDATE_AUTH_FULFILLED",this.props.activate_auth))
        this.props.history.push("/")
        break;
        case "failed":
        this.setState({
          headertext: "User Validation failed.",
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
          headertext: "User Validation in Progress",
        });
        break;
        default:

        break;
      }
    }
      catch (error) {
        this.setState({
          headertext: this.props.error.response?this.props.error.response.data.message:"User validation failed, Please try again",
          loader: false,
          response: true,
          success:false,
          color: "red"
        });
        await this.setTimedNotification(5000)
      }
    }
    const borrower_action = async () =>{
      try{
      this.setState({
        headertext: "Verifying your details.",
        loader: true,
        response: false,
        success:false,
        color: "#213F7D",
        errortext: ""
      });

      await this.props.dispatch(actions("ACTIVATE_REGISTRATION_AUTH",post_action("",body,`auth/activate/borrowers/${this.state.token}`,"")))
      switch(this.props.state){
        case "success":
        this.props.dispatch(actions("NEW_USER_STATE_FULFILLED",{state:true}))
        this.props.dispatch(actions("VALIDATE_AUTH_FULFILLED",this.props.activate_auth))
        this.props.history.push("/")
        break;
        case "failed":
        this.setState({
          headertext: "Password Change failed.",
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
          headertext: "Password Change in Progress",
        });
        break;
        default:

        break;
      }
    }
      catch (error) {
        this.setState({
          headertext: this.props.error.response?this.props.error.response.data.message:"Password Change failed, Please try again",
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
      if(this.state.query && this.state.query.includes("?invited_borrower=true")){
        borrower_action()
      }
      if(this.state.query && this.state.query.includes("?invited=true")){
        lender_action()
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

  renderPage(){
    const Continue = ()=>{

       return ( 
         <Row className="validate-page">
        <div className="success-logo">
        <img src={require('../../../assets/img/brand/completed.svg')}/>
        </div>            
        <div className="success-form">
        <div className="success-communication">
        <p>Hurray, you are good to go</p>
        </div>
        <div className="submit">
        <Input  onClick={()=>this.redirect("/dashboard")} type="submit" value="Take me to the dashboard"/>
        </div>
      </div>
    </Row>)
      
    }  
  
    const Failed = ()=>{
      return (
        <div className="h-50 validate-page" >
        <div className="success-logo">
        <img style={{width:"250px",height:"100px"}} src={require('../../../assets/img/brand/logo-forgot.svg')}/>
        </div>            
        <div className="success-form">
        <div className="success-communication">
        <p>Good to see you again.</p>
        <a>Ooops!!! We are not able to validate your account, Please try again, if issue persist. Contact an admin. </a>
        {/* <a>{this.props.error.response?this.props.error.response.data.message:"Request failed, Please try again"}</a> */}
        </div>
        <div className="justify-content-center d-flex flex-row w-100 h-25">
        <Input className="submit w-50 h-100" onClick={()=>this.redirect("/login")} type="submit" value="Go TO LOGIN"/>
        </div>
      </div>
        </div>)
    }  
 
    const Pending = ()=>{
      return (
      <div className="main-loader">
      <Loader type="Watch" color="black" height="50" width="60"/>
      </div>)
    }  

const setPassword =()=>{
      return (
        <div className="d-flex flex-row w-100 justify-content-center validate-page h-100" >
        <div className="d-flex flex-column w-50 justify-content-center  validate-page h-100" >
        <Card className="h-75 w-100 forgot-card">
        <div className="h-25 w-100 flex-row justify-content-center success-logo">
        <img className="w-50" src={require('../../../assets/img/brand/logo-forgot.svg')}/>
        </div>    
        <div className="h-25 success-communication">
        <p>You are almost there!</p>      
        <a>Kindly fill below details to complete setup.</a>      
        </div>     
        <div className="d-flex flex-row justify-content-center w-100 mt-5 h-75 success-form">
        <Formik
                initialValues={initialValues}
                validate={validate(validationSchema)}
                onSubmit={onSubmit}
                render={
                  ({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    isSubmitting,
                    isValid,
                  }) => (
            <Form onSubmit={this.handleSubmit.bind(this,values)} className="d-flex flex-column justify-content-center h-100 w-75">
            {this.state.query && this.state.query.includes("?invited_borrower=true")?
            <div className="h-25 password">
            <FormGroup className="h-100">
              <Input  
              type="text"
              maxLength="30"
              placeholder="Full Name"
              name="fullname"
              id="fullname"
              autoComplete="fullname"
              valid={!errors.fullname}
              invalid={touched.fullname && !!errors.fullname}
              required
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.fullname} 
              className="h-75" 
              />   
            <FormFeedback>{errors.fullname}</FormFeedback>
            </FormGroup>                  
            </div>:null}
            <div className="h-25 password">
            <FormGroup className="h-100">
            <Input  
            type="password"
            maxLength="30"
            placeholder="Password"
            name="password"
            id="password"
            autoComplete="password"
            valid={!errors.password}
            invalid={touched.password && !!errors.password}
            required
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password} 
            className="h-75" 
            />
              
            <FormFeedback>{errors.password}</FormFeedback>
            {/* {this.state.formErrors.password? <FormFeedback className="invalid-feedback-custom" invalid>{`${this.state.formErrors.password}`}</FormFeedback>:null } */}
            </FormGroup>                  
            </div>
            <div className="h-25 password">
            <FormGroup className="h-100">
  
                      <Input  
                        type="password"
                        maxLength="30"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        id="confirmPassword"
                        autoComplete="confirm password"
                        valid={!errors.confirmPassword}
                        invalid={touched.confirmPassword && !!errors.confirmPassword}
                        required
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.confirmPassword}
                        className="h-75" 
                        />
                        <FormFeedback>{errors.confirmPassword}</FormFeedback>
                  
           </FormGroup> 
  
            </div>

            {this.state.loader ?null :this.state.response ?                       
                    <div className="text-center login-loader-text" style={{color:this.state.color,fontSize:"95%"}}>
                      {this.state.headertext}
                    </div>:null}     
            { this.state.response?null:this.state.loader ?
                      <div className="d-flex justify-content-center">
                      <Loader type="Watch" color="black" height="50" width="60"/>
                      </div>:<div className="d-flex h-25 flex-row justify-content-center w-100"><Input className="submit h-75" disabled={isSubmitting || !isValid} type="submit" value="SUBMIT"/></div>}
           </Form>
                      )} /> 
      </div>
        </Card>
      
        </div>
    </div>)
    } 


const Loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>

if(this.state.query && this.state.query.includes("invited=true")){
  return setPassword()
}

if(this.state.query && this.state.query.includes("invited_borrower=true")){
  return setPassword()
}

switch(this.props.state){
  
  case "success":
    this.props.dispatch(actions("SET_TOKEN_FULFILLED",this.props.auth))
    this.props.dispatch(actions("NEW_USER_STATE_FULFILLED",{state:true}))
    return <Continue/>
  break;
  case "failed":
  return  <Failed/>
  break;
  case "pending":
    return <Loading/>  
  break;
  default:
  return <Loading/> 
  break;
}  
}

  render() {
    return (
      <Container style={{height:"100vh"}} className="d-flex flex-column justify-content-center w-100">
      {this.renderPage()}
      </Container>
    );
  }
}

export default connect(store => {
  return {
    state: store.validate.state,
    error: store.validate.error,
    auth:store.validate.auth,
    activate_auth:store.action.activate_auth,
    activate_auth_state:store.action.activate_auth
  };
})(withRouter(ValidateAccess));