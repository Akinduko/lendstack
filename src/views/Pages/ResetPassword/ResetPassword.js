import React, {Component} from 'react';
import {
  Input,
  FormFeedback,
  FormGroup,
  Form,
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
    .min(6, `Password has to be at least ${6} characters!`)
    .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/, 'Password must contain: numbers, uppercase and lowercase letters\n')
    .required('Password is required'),
    confirmPassword: Yup.string()
    .oneOf([values.password], 'Passwords must match')
    .required('Password confirmation is required'),
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

class ResetPassword extends Component {

  constructor(props) {

    super(props);
   
    this.state = {
      token: props.match.params.id,
      query: props.location.search
    };
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
      confirmPassword: value.confirmPassword,
      password:value.password
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
      await this.props.dispatch(actions("SET_RESET_AUTH",post_action("",body,`auth/password_reset/${this.state.token}`,"")))
      switch(this.props.state){
        case "success":
        this.props.history.push("/login")
        this.setState({
          headertext: "Password Successfully Changed.",
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

   ChangePassword =()=>{
    return (
      <div className="d-flex flex-row w-100 justify-content-center validate-page h-100" >
      <div className="d-flex flex-column w-50 justify-content-center  validate-page h-100" >
      <Card className="h-50 w-100 forgot-card">
      <div className="h-25 w-100 flex-row justify-content-center success-logo">
      <img className="w-50" src={require('../../../assets/img/brand/logo-forgot.svg')}/>
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
          <div onClick={()=>this.redirect("/reset")} className="forgot mb-3">
            <a  >FORGOT PASWORD?</a>
          </div>
          {this.state.loader ?null :this.state.response ?                       
                  <div className="text-center login-loader-text" style={{color:this.state.color,fontSize:"95%"}}>
                    {this.state.headertext}
                  </div>:null}     
          { this.state.response?null:this.state.loader ?
                    <div className="d-flex justify-content-center">
                    <Loader type="Watch" color="black" height="50" width="60"/>
                    </div>:<div className="d-flex h-25 flex-row justify-content-center w-100"><Input className="submit h-75" disabled={isSubmitting || !isValid} type="submit" value="LOG IN"/></div>}
         </Form>
                    )} /> 
    </div>
      </Card>
    
      </div>
  </div>)
  } 

  render() {
    return (
      <Container style={{height:"100vh"}} className="d-flex flex-column justify-content-center w-100">
      {this.ChangePassword()}
      </Container>
    );
  }
}

export default connect(store => {
  return {
    state: store.action.set_reset_auth_state,
    error: store.action.set_reset_auth_serror,
    auth:store.action.set_reset_auth,
  };
})(withRouter(ResetPassword));