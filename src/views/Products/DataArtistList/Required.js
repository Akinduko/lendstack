import React, {Component} from 'react';
import {
  Input,
  FormFeedback,
  FormGroup,
  Form
} from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { get_action} from  '../../../controllers/requests';
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

class Required extends Component {

  constructor(props) {

    super(props);
    this.state = {
      activeTab: '1',
    };
  }

  redirect(link){
    this.props.history.push(link)
  }
  async componentDidMount(){
    const id= this.props.view_product
    await this.props.dispatch(actions("GET_PRODUCT_FIELD",get_action(this.props.token,`products/${id}/fields`,"")))
  }
 renderFields(){
  switch(this.props.product_field_state){
    case "success":
    const page =[]
    for (let each of this.props.product_field){
      page.push(<div className="items">
      <div className="first">
      <a>{each.field_name}</a>
      </div>  
      </div>)
    }
    return page
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
      <div className="required-page" >
      <div className="top-details">
      {this.renderFields()}
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
    profile:store.getuser.user,
    profileState:store.getuser.state,
    product_field:store.action.product_field?store.action.product_field.fields:[],
    product_field_state:store.action.product_field_state,
    view_product:store.action.view_product?store.action.view_product.id:"",
    view_product_state:store.action.view_product_state
  };
})(withRouter(Required));
