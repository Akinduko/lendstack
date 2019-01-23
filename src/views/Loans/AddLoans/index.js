import React, {Component} from 'react';
import {
Row,
Col,
Nav,
NavItem, 
NavLink,
TabContent,
Input,
FormFeedback,
FormGroup,
TabPane
        } from 'reactstrap';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { actions } from '../../../state/actions';
import { withRouter } from 'react-router-dom';
import { get_action, post_action} from  '../../../controllers/requests';
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


class AddLoans extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editloanmodal: false,
            activeTab: this.props.group_by_product[0]?this.props.group_by_product[0].id:'1',
            response:false,
            color:"red",
            success:false,
            email: "",
            inputs:{[this.props.group_by_product[0]?this.props.group_by_product[0].id:'1']:{}},
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

    }

      async componentDidMount(){
        const product = this.props.new_loan.product
        // await this.props.dispatch(actions("GET_SELECTION_VALUES",get_action(this.props.auth.token,`codes/fetch/field-type`,"")))
        await this.props.dispatch(actions("GET_GROUP_BYPRODUCT",get_action(this.props.auth.token,`products/${product.id}/groups`,"")))
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

      toggleModal(name){
          const action ={}
          action[name]=!this.state[name]
          this.setState(action)
      }
      toggle=async(tab) =>{
        if (this.state.activeTab !== tab.id) {
          await this.props.dispatch(actions("SET_LOAN_TAB_FULFILLED",{active:tab}))
          const product = this.props.new_loan.product
          const group_id = this.props.loan_group_id.id
          await this.props.dispatch(actions("GET_FIELD_BYPRODUCT",get_action(this.props.auth.token,`products/${product.id}/groups/${group_id}`,"")))
          if(!this.state.inputs[tab.id]){
           const inputs = this.state.inputs
           inputs[tab.id]={}
            return this.setState({
              activeTab: tab.id,
              inputs
            });
          }
          return this.setState({
            activeTab: tab.id
          });
        }
      }
      async exitLoan(){
        await this.props.dispatch(actions("SET_LOAN_ACTION_FULFILLED",false))
      }
      renderTabs=()=>{
        const groups = this.props.group_by_product
        const each =[]
        switch(this.props.group_by_product_state){
          case "success":
          for(let i=0; i<groups.length; i++){
            each.push(<NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === groups[i].id })}
              onClick={() => { this.toggle(groups[i]); }}
            >
              {groups[i].code_description}
            </NavLink>
          </NavItem>)
          }
          return (                
            <div className="actual-tabs">
              {each}
          </div>)
          case "failed":
          return <div>Unable to Load Tabs</div>
          case "pending":
          return <div>Loading...</div>
        }
      }

      handleUserInput = async (e) => {
        const value = e.target.value;
        const name = e.target.name;
        const input = this.state.inputs
        input[this.state.activeTab][name]=value
        await this.setState({ inputs:input });
      }

      renderOptions(code){
          let array = [];
          if (code) {
            for (let each of code.selectionOptions) {
              array.push(
                <option value={each.id}>{each.code_description}</option>
              );
            }
            return array;
          } else {
            return [<option value="" />];
          }
      }

      fieldHolder(value,each){
        const body = {
          "text":value==="text"?<div key={each.id} className="first-name">
          <div className="second"><FormGroup>
            <Input value={this.state["inputs"][this.state.activeTab][`${each.id}_${each.fieldType.code_description}`]} onChange={this.handleUserInput} name={`${each.id}_${each.fieldType.code_description}`}
              type="text"
              maxLength="30"
              placeholder={each.field_name}
              onBlur={this.handleUserValidation}
              valid={this.state.validFields[`${each.id}`] === true}
              invalid={this.state.validFields[`${each.id}`] !== true}
              required
            />
        {this.state.formErrors[`${each.id}`]? <FormFeedback className="invalid-feedback-custom" invalid>{`${this.state.formErrors[`${each.id}`]}`}</FormFeedback>:null}
      </FormGroup></div></div>:null,
          "number":value==="number"?<div key={each.id} className="first-name">
          <div className="second"><FormGroup>
            <Input value={this.state["inputs"][this.state.activeTab][`${each.id}_${each.fieldType.code_description}`]} onChange={this.handleUserInput} name={`${each.id}_${each.fieldType.code_description}`}
              type="number"
              maxLength="30"
              placeholder={each.field_name}
              onBlur={this.handleUserValidation}
              valid={this.state.validFields[`${each.id}`] === true}
              invalid={this.state.validFields[`${each.id}`] !== true}
              required
            />
        {this.state.formErrors[`${each.id}`]? <FormFeedback className="invalid-feedback-custom" invalid>{`${this.state.formErrors[`${each.id}`]}`}</FormFeedback>:null}
      </FormGroup></div></div>:null,
          "amount":value==="amount"?<div key={each.id} className="first-name">
          <div className="second"><FormGroup>
            <Input value={this.state["inputs"][this.state.activeTab][`${each.id}`]} onChange={this.handleUserInput} name={`${each.id}`}
              type="number"
              maxLength="30"
              placeholder={each.field_name}
              onBlur={this.handleUserValidation}
              valid={this.state.validFields[`${each.id}`] === true}
              invalid={this.state.validFields[`${each.id}`] !== true}
              required
            />
        {this.state.formErrors[`${each.id}`]? <FormFeedback className="invalid-feedback-custom" invalid>{`${this.state.formErrors[`${each.id}`]}`}</FormFeedback>:null}
      </FormGroup></div></div>:null,
          "range":value==="range"?<div key={each.id} className="first-name">
          <div className="second"><FormGroup>
            <Input value={this.state["inputs"][this.state.activeTab][`${each.id}_${each.fieldType.code_description}`]} onChange={this.handleUserInput} name={`${each.id}_${each.fieldType.code_description}`}
              type="text"
              maxLength="30"
              placeholder={each.field_name}
              onBlur={this.handleUserValidation}
              valid={this.state.validFields[`${each.id}`] === true}
              invalid={this.state.validFields[`${each.id}`] !== true}
              required
            />
        {this.state.formErrors[`${each.id}`]? <FormFeedback className="invalid-feedback-custom" invalid>{`${this.state.formErrors[`${each.id}`]}`}</FormFeedback>:null}
      </FormGroup></div></div>:null,
          "email":value==="email"?<div key={each.id} className="first-name">
          <div className="second"><FormGroup>
            <Input value={this.state["inputs"][this.state.activeTab][`${each.id}_${each.fieldType.code_description}`]} onChange={this.handleUserInput} name={`${each.id}_${each.fieldType.code_description}`}
              type="email"
              maxLength="30"
              placeholder={each.field_name}
              onBlur={this.handleUserValidation}
              valid={this.state.validFields[`${each.id}`] === true}
              invalid={this.state.validFields[`${each.id}`] !== true}
              required
            />
        {this.state.formErrors[`${each.id}`]? <FormFeedback className="invalid-feedback-custom" invalid>{`${this.state.formErrors[`${each.id}`]}`}</FormFeedback>:null}
      </FormGroup></div></div>:null,
          "selection":value==="selection"?<div key={each.id} className="first-name">
          <div className="second"><FormGroup>
            <Input value={this.state["inputs"][this.state.activeTab][`${each.id}_${each.fieldType.code_description}`]} onChange={this.handleUserInput} name={`${each.id}_${each.fieldType.code_description}`}
              type="select"
              placeholder={each.field_name}
              onBlur={this.handleUserValidation}
              // valid={this.state.validFields[`${each.id}`] === true}
              // invalid={this.state.validFields[`${each.id}`] !== true}
              required
            >
            <option value="">{each.field_name}</option>
            {this.renderOptions(each)}
            </Input>
        {this.state.formErrors[`${each.id}`]? <FormFeedback className="invalid-feedback-custom" invalid>{`${this.state.formErrors[`${each.id}`]}`}</FormFeedback>:null}
      </FormGroup></div></div>:null,
          "date":value==="date"?<div key={each.id} className="first-name">
          <div className="second"><FormGroup>
            <Input value={this.state["inputs"][this.state.activeTab][`${each.id}_${each.fieldType.code_description}`]} onChange={this.handleUserInput} name={`${each.id}_${each.fieldType.code_description}`}
              type="date"
              maxLength="30"
              placeholder={each.field_name}
              onBlur={this.handleUserValidation}
              valid={this.state.validFields[`${each.id}`] === true}
              invalid={this.state.validFields[`${each.id}`] !== true}
              required
            />
        {this.state.formErrors[`${each.id}`]? <FormFeedback className="invalid-feedback-custom" invalid>{`${this.state.formErrors[`${each.id}`]}`}</FormFeedback>:null}
      </FormGroup></div></div>:null,
          "phone":value==="phone"?<div key={each.id} className="first-name">
          <div className="second"><FormGroup>
            <Input value={this.state["inputs"][`${each.id}_${each.fieldType.code_description}`]} onChange={this.handleUserInput} name={`${each.id}_${each.fieldType.code_description}`}
              type="tel"
              maxLength="30"
              placeholder={each.field_name}
              onBlur={this.handleUserValidation}
              valid={this.state.validFields[`${each.id}`] === true}
              invalid={this.state.validFields[`${each.id}`] !== true}
              required
            />
        {this.state.formErrors[`${each.id}`]? <FormFeedback className="invalid-feedback-custom" invalid>{`${this.state.formErrors[`${each.id}`]}`}</FormFeedback>:null}
      </FormGroup></div></div>:null,
        }
        return body[value]
      }

      async handleSubmits(){
          const body = {
            "fields": []
          }
          const array =[]
          for(let each in this.state.inputs[this.state.activeTab]){
            if(each.endsWith("selection")){
              array.push({
                  "product_field_id": each.split('_')[0],
                  "selection_value_id": parseInt(this.state.inputs[this.state.activeTab][each]),
                })
            }
            else{
              array.push({
                "product_field_id": each.split('_')[0],
                "value": this.state.inputs[this.state.activeTab][each],
              }) 
            } 
          }
          body["fields"]=array
          console.log(body)
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
            const id = this.props.create_new_loan.id
            await this.props.dispatch(actions("UPDATE_LOAN_FIELD",post_action(this.props.token,body,`loans/${id}/fields`,"")))
            switch(this.props.update_loan_field_state){
              case "success":
              this.setState({
                headertext: "Login Successful",
                loader: false,
                response: true,
                success:true,
                color: "green"
              });
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
      renderPersonal=()=>{
        switch(this.props.field_by_group_state){
          case "success":
          const fields = this.props.field_by_group
          const body = []
          for(let each of fields){
            body.push(this.fieldHolder(each.fieldType.code_description,each))
          }
        return (body)
        case "pending":
        return <div>Loading fields...Please wait</div>
        case "failed":
        return <div>An error occured please try again</div>
        }
      }

      renderTabContent=()=>{
        const groups = this.props.group_by_product
        const each =[]
        switch(this.props.group_by_product_state){
          case "success":
          for(let i=0; i<groups.length; i++){
            each.push(<TabPane tabId={groups[i].id}>
            <div className="personal-page" >
            <div className="left-details">
            <div className="first">
            <a>{this.props.loan_group_id.code_description}</a>
            </div>
            <div className="second">
            <a>Enter borrower’s {this.props.loan_group_id.code_description}</a>
            </div> 
          </div>

            <div className="right-details">
            <div className="field-wraps">
            {this.renderPersonal()} 
            </div>
            <div className="submit">
            { this.state.response?null:this.state.loader ?
                      <div className="login-loader">
                      <Loader type="Watch" color="black" height="50" width="60"/>
                      </div>:<Input  onClick={()=>this.handleSubmits()} type="submit" value="SAVE"/>}
            </div> 
          </div>
          </div>
            </TabPane>)
          }
          return (<TabContent activeTab={this.state.activeTab}>{each}</TabContent>)
          case "failed":
          return<TabContent>Unable to Load Tabs</TabContent>
          case "pending":
          return <TabContent> Loading...</TabContent>
        }
      }

      render() {

      return (
          <div className="add-loan">
          <div className="notification"><img src={require('../../../assets/img/brand/notification.svg')}/></div>
          <div className="body-header"> 
            <div className="first">
            <a>Add New Loan</a>
            </div>
            <div className="second">
            <a onClick={()=>this.exitLoan()}>Loan > </a> <p> Add New Loan</p>
            </div> 
            </div>
            <div className="add-loan-body">
            <Row>
                  <Col className="main-container">
                    <Nav tabs>
                    <div className="block-group">
                    <div className="divider-top"/>
                    
                        {this.renderTabs()}
                    
                      <div className="divider-bottom"/>
                    </div>
                    </Nav>
                    
                      {this.renderTabContent()}

                  </Col>
                </Row>
            </div>      
          </div>
              );
          }
      }

export default connect(store => {
  return {
    state: store.validate.state,
    error: store.validate.error,
    new_loan:store.action.new_loan,
    auth: store.token.auth,
    group_by_product:store.action.group_by_product?store.action.group_by_product.groups:[],
    group_by_product_state: store.action.group_by_product_state,
    loan_group_id:store.action.loan_group_id?store.action.loan_group_id.active:"",
    loan_group_id_state:store.action.loan_group_id_state,
    field_by_group:store.action.field_by_group?store.action.field_by_group.fields:[],
    field_by_group_state:store.action.field_by_group_state,
    get_selection_values_state:store.action.get_selection_values_state,
    get_selection_values:store.action.get_selection_values,
    update_loan_field:store.action.update_loan_field,
    token:store.token.auth?store.token.auth.token:"",
    update_loan_field_state:store.action.update_loan_field_state,
    create_new_loan:store.action.create_new_loan?store.action.create_new_loan.loan:"",
    error:store.action.create_new_loan_error
  };
})(withRouter(AddLoans));