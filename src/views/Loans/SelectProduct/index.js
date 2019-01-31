import React, { Component } from 'react';
import { Card ,Row, Col, Container} from 'reactstrap';
import Header from './Header';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Slider from "react-slick";
import { get_action,post_action} from  '../../../controllers/requests';
import { actions } from '../../../state/actions';
import AddLoans from '../AddLoans';
import moment from 'moment';
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from 'react-responsive-carousel';


class SelectProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      activeTab: '1'
    };
    this.toggle = this.toggle.bind(this);
    this.toggleTab = this.toggleTab.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
  }

  async componentDidMount(){
    const profile= this.props.profile;
    const id = profile.companies?profile.companies[0].id:""
    await this.props.dispatch(actions("GET_ALL_PRODUCTS",get_action(this.props.auth.token,`products`,`?lender_id=${id}`)))
    await this.props.dispatch(actions("GET_FIELD_TYPES",get_action(this.props.auth.token,`codes/fetch/field-type`,``)))
  }
  async componentWillUnmount(){
    await this.props.dispatch(actions("SET_LOAN_ACTION_FULFILLED",false))
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState({ fadeIn: !this.state.fadeIn });
  }

  handleRequest=async(body)=>{
    const _body = {
      "lender_id": body.lender_id,
      "product_id": body.id
    }
    // await this.props.dispatch(actions("SET_LOAN_ACTION_FULFILLED",{active:true,product:body}))
    await this.props.dispatch(actions("CREATE_NEW_LOAN",post_action(this.props.auth.token,_body,`loans`,``)))
    switch(this.props.create_new_loan_state){
      case "success":
      await this.props.dispatch(actions("SET_LOAN_ACTION_FULFILLED",{active:true,product:body}))
      break
    }
      
  }



  renderProducts=()=>{
     
    const Params= (variable,row)=>{
      const params = row.parameters
      const result = {}
      for(let each of params){
        if(each.parameter_description===variable){
          result["parameter_minimum_value"]=each.parameter_minimum_value
          result["parameter_maximum_value"]=each.parameter_maximum_value
        }
      }
      return result
    }

    switch(this.props.all_products_state){
      case "success":
      const products = this.props.all_products
      const cards =[]

      for (let each of products){
        const amount_values = Params("Amount",each)
        const tenor_values = Params("Tenor",each)
        cards.push(
        <Card className="w-100 justify-content-between h-75 card-each card-custom" >
        <div className="product-name">
        <a>{each.product_name}</a>
        </div>
          <div className="min-amount">
        <a>Minimum Loanable Amount</a>
        <p>{amount_values["parameter_minimum_value"]}</p>
        </div>
        <div className="max-amount">
        <a>Maximum Loanable Amount</a>
        <p>{amount_values["parameter_maximum_value"]}</p>
        </div>
        <div className="tenor">
        <a>Repayment period</a>
        <p>{tenor_values["parameter_minimum_value"]}-{tenor_values["parameter_maximum_value"]} Months</p>
        </div>
          <div onClick={()=>this.handleRequest(each)} className="card-custom-footer">
          <a>APPLY FOR LOAN</a>
            </div>
        </Card>)
      }
      return cards
      case "failed":
        return <div>Unable to Load Products</div>
      
      case "pending":
        return <div>Please Wait</div>
    }
  }

  render() {
    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1
    };

    return (
  <Container className="w-100 h-100 d-flex flex-row justify-content-center dashboard-body" fluid>
  <div className="w-100 h-100 d-flex flex-column">
      <Row className="h-100">
        <Col className="h-50" md="12">
        <Header/>
        </Col>
        <Col className="h-50" md="12">
        <div className="d-flex flex-row justify-content-around w-100 h-100 dashboard-card-container">
        <Row className="w-100 h-100">
        <Slider {...settings}>
            {this.renderProducts()}
           </Slider>
        </Row>
      </div>     
      </Col>
     </Row>
     </div>
     </Container>
    );
  }
}

export default connect(store => {
  return {
    state: store.login.state,
    error: store.login.error,
    auth: store.token.auth,
    all_products_state:store.action.all_products_state,
    all_products:store.action.all_products?store.action.all_products.products:[],
    profile:store.action.user,
    new_loan:store.action.new_loan,
    create_new_loan: store.action.create_new_loan,
    create_new_loan_state:store.action.create_new_loan_state,
    all_field_types: store.action.all_field_types,
    all_field_types_state: store.action.all_field_types_state
  };
})(withRouter(SelectProduct));
