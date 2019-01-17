import React, { Component } from 'react';
import { Card, 
  CardBody, 
  CardFooter,
      } from 'reactstrap';
import Header from './Header';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { actions } from '../../state/actions';

class Dashboard extends Component {
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
  
  // async componentDidMount(){
  //   await this.props.dispatch(actions("SET_TOKEN_FULFILLED",{token:"eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODEsInVzZXJBZ2VudCI6InNwZWNpYWxfdXNlcl9hZ2VudCIsInNjb3BlIjpbImxlbmRlciJdLCJ0eXBlIjoibG9naW4iLCJpYXQiOjE1NDcxOTcyOTl9.w4-8FHAi4Ahxw3-MB8QH26vfNSh3b6quR-hEmzG3owqTEZzhSoW1nNDYk7g7MBqjqrMw1kQJspt9Vljk0Q9Ejg"}))
  // }
  renderPage(){
    if(this.props.auth.token){
      return (<div>
        <Header/>
             <div className="dashboard-card-container">
             <Card className="card-1" >
             <div className="card-header"/>
             <div className="card-image">
             <img src={require('../../assets/img/brand/card-icon-1.svg')}/>
             </div>
                 <a>Complete your profile</a>
                 <p>Your everyday tasks feel light. More time with Borrowers.</p>
               <CardFooter className="card-footer">
               <a>COMPLETE PROFILE</a>
               <img src={require('../../assets/Icons/Arrow.svg')}/>
                 </CardFooter>
             </Card>
 
             <Card className="card-2" >
             <div className="card-header"/>
               <CardBody>
               <div className="card-image">
               <img src={require('../../assets/img/brand/card-icon-2.svg')}/>
               </div>
                 <a>Create loan product</a>
                 <p>Your everyday tasks feel light. More time with Borrowers.</p>
               </CardBody>
               <CardFooter className="card-footer">
               <a>CREATE LOAN PRODUCT</a>
               <img src={require('../../assets/Icons/Arrow.svg')}/>
                 </CardFooter>
             </Card>
 
             <Card className="card-3">
             <div className="card-header"/>
               <CardBody>
               <div className="card-image">
               <img src={require('../../assets/img/brand/card-icon-3.svg')}/>
                </div>
                 <a>Start lending</a>
                 <p>Your everyday tasks feel light. More time with Borrowers.</p>
               </CardBody>
               <CardFooter className="card-footer">
               <a>START LENDING</a>
               <img src={require('../../assets/Icons/Arrow.svg')}/>
                 </CardFooter>
             </Card>
             </div>     
     </div>)
    }
    return this.props.history.push('/login')
  }

  render() {
    return (
      <div className="dashboard-body">
        {this.renderPage()}
      </div>
    );
  }
}

export default connect(store => {
  return {
    state: store.login.state,
    error: store.login.error,
    auth: store.token.auth
  };
})(withRouter(Dashboard));
