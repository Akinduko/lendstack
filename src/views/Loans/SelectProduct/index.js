import React, { Component } from 'react';
import { Card } from 'reactstrap';
import Header from './Header';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Slider from "react-slick";
import { get_action,put_action} from  '../../../controllers/requests';
import { actions } from '../../../state/actions';
import AddLoans from '../AddLoans'
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
    const id = profile.lenders?profile.lenders[0].id:""
    await this.props.dispatch(actions("GET_ALL_PRODUCTS",get_action(this.props.auth.token,`products`,`?lender_id=${id}`)))
    switch(this.props.all_products_state){
      case "success":
      break
    }
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
      await this.props.dispatch(actions("SET_LOAN_ACTION_FULFILLED",{active:true,product:body}))
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
        cards.push(<Card className="card-each" >
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
        <p>{tenor_values["parameter_maximum_value"]}-{tenor_values["parameter_maximum_value"]} Months</p>
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
  renderPage(){
    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1
    };

    if(this.props.new_loan && this.props.new_loan.active){
      return <AddLoans/>
    }
    return (<div>
      <Header/>
           <div className="dashboard-card-container">
           
           <Slider {...settings}>
            {this.renderProducts()}
           </Slider>
           </div>   
           
   </div>)
  }

  render() {
    return (
      <div className="loan-product-body">
        {this.renderPage()}
      </div>
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
    new_loan:store.action.new_loan
  };
})(withRouter(SelectProduct));
