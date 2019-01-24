import React, { Component, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
// import classnames from 'classnames';
import routes from '../../routes';
import SideBarProfile from "./SideBarProfile";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { actions } from '../../state/actions';
import { Container,Nav } from 'reactstrap';
import DefaultHeaderDropdown  from './DefaultHeaderDropdown'

import {
  AppHeader,
  AppSidebar,
  AppSidebarNav,
} from '@coreui/react';
import navigation from '../../_nav';

const DefaultHeader = React.lazy(() => import('./DefaultHeader'));

class DefaultLayout extends Component {
  loading = () => <div className="animated fadeIn pt-1 text-center"><div className="sk-spinner sk-spinner-pulse"></div></div>;
  constructor(props) {
    super(props);
    this.state = {
      activeelement:"dashboard",
      activeTab:"dashboard"
    };

  }
  async logout(){
    await this.props.dispatch(actions("USER_LOGOUT_FULFILLED"))
    this.props.history.push("/login")
  }
  async handleSideBarEvent(name){
      await this.setState({activeelement:name,activeTab: name})
      return this.props.history.push(name) 
    }
  render() {
    return (
      <div className="app root-container">
          <AppHeader className="d-lg-none">
          <Suspense fallback={this.loading()}>
            <DefaultHeader onLogout={e=>this.logout(e)}/>
          </Suspense>
        </AppHeader>
        <div className="app-body">
        <AppSidebar fixed display="lg">
           <SideBarProfile/>
            <Suspense>
            <AppSidebarNav className="d-flex flex-row justify-content-center scrollbar-container mt-5 sidebar-nav w-100 ps" navConfig={navigation} {...this.props} />
            </Suspense>
          </AppSidebar>
         {/* <div fixed display="lg" className="custom-side-bar">
                       <SideBarProfile/>
                        <div className="nav-main-custom">
                          <div className={`nav-main-item-custom ${classnames({ active: this.state.activeTab === 'dashboard' })}`}>
                            <a className={`nav-main-link-custom ${classnames({ active: this.state.activeTab === 'dashboard' })}`} onClick={()=>this.handleSideBarEvent("dashboard")}><i className="nav-icon"><img src={require('../../assets/img/brand/dashboard-icon.svg')}/></i>Dashboard</a>
                          </div>
                          <div className={`nav-main-item-custom ${classnames({ active: this.state.activeTab === 'loans' })}`}>
                            <a className={`nav-main-link-custom ${classnames({ active: this.state.activeTab === 'loans' })}`} onClick={()=>this.handleSideBarEvent("loans")}><i className="nav-icon"><img src={require('../../assets/img/brand/loans-icon.svg')}/></i>Loans</a>
                          </div>
                          <div className={`nav-main-item-custom ${classnames({ active: this.state.activeTab === 'transactions' })}`}>
                            <a className={`nav-main-link-custom ${classnames({ active: this.state.activeTab === 'transactions' })}`} onClick={()=>this.handleSideBarEvent("transactions")}><i className="nav-icon"><img src={require('../../assets/img/brand/transactions-icon.svg')}/></i>Transactions</a>
                          </div>
                          <div className={`nav-main-item-custom ${classnames({ active: this.state.activeTab === 'products' })}`}>
                            <a className={`nav-main-link-custom ${classnames({ active: this.state.activeTab === 'products' })}`} onClick={()=>this.handleSideBarEvent("products")}><i className="nav-icon"><img src={require('../../assets/img/brand/product-icon.svg')}/></i>Products</a>
                          </div>
                          <div className={`nav-main-item-custom ${classnames({ active: this.state.activeTab === 'reports' })}`}>
                            <a className={`nav-main-link-custom ${classnames({ active: this.state.activeTab === 'reports' })}`} onClick={()=>this.handleSideBarEvent("reports")}><i className="nav-icon"><img src={require('../../assets/img/brand/reports-icon.svg')}/></i>Reports</a>
                          </div>
                          <div className={`nav-main-item-custom ${classnames({ active: this.state.activeTab === 'settings' })}`}>
                            <a className={`nav-main-link-custom ${classnames({ active: this.state.activeTab === 'settings' })}`} onClick={()=>this.handleSideBarEvent("settings")} aria-current="page"><i className="nav-icon"><img src={require('../../assets/img/brand/settings-icon.svg')}/></i>Settings</a>
                          </div>
                          <div onClick={()=>this.logout()} className="nav-main-item-custom">
                            <a className="nav-main-link-custom" aria-current="page"><i className="nav-icon"><img src={require('../../assets/Icons/logout.svg')}/></i>Logout</a>
                          </div>
                        </div>
                        <div className="side-bar-footer" >
                        <div className="divider" />
                        <div className="help"><div className="icon"><img src={require('../../assets/img/brand/help-icon.svg')}/></div><a>Help</a></div>
                        <div className="terms"><a>Terms</a></div>
                        <div className="privacy"><a>Privacy</a></div>
                        </div>
                    </div>  */}
                    
          <main className="main">
          <Container className=" h-100 overflow p-0" fluid>
            <Suspense fallback={this.loading()}>
            <Nav className="ml-auto d-flex flex-row w-100 justify-content-end pr-3 notify-navbar-nav" navbar>
              <DefaultHeaderDropdown notif/>
           </Nav>            
            <Switch>
                {routes.map((route, idx) => {
                    return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                        <route.component {...props} />
                      )} />)
                      : (null);
                  },
                )}
                {this.props.token.length>0?<Redirect from="/" to="/dashboard" />:this.props.history.push('/login')}
                
              </Switch>
              </Suspense>
            </Container>
            </main>
        </div>
</div>
    );
  }
}

export default connect(store => {
  return {
    token:store.token.auth?store.token.auth.token:"",
  };
})(withRouter(DefaultLayout));