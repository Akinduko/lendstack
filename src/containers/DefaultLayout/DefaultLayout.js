import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container,CardGroup,Row,Col ,Card, Button, FormGroup,Input} from 'reactstrap';

import {
  AppSidebar,
  AppSidebarFooter,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';
import SideBarProfile from "./SideBarProfile";


class DefaultLayout extends Component {
  render() {
    return (
      <div className="root-container">
        
                    <div fixed display="lg" className="custom-side-bar">
                       <SideBarProfile/>
                        <div className="nav-main-custom">
                          <div className="nav-main-item-custom">
                            <a className="nav-main-link-custom" href="#/dashboard"><i className="nav-icon"></i>Dashboard</a>
                          </div>
                          <div className="nav-main-item-custom">
                            <a className="nav-main-link-custom" href="#"><i className="nav-icon"></i>Loans</a>
                          </div>
                          <div className="nav-main-item-custom">
                            <a className="nav-main-link-custom" href="#/"><i className="nav-icon"></i>Transactions</a>
                          </div>
                          <div className="nav-main-item-custom">
                            <a className="nav-main-link-custom active" href="#/"><i className="nav-icon"></i>Products</a>
                          </div>
                          <div className="nav-main-item-custom">
                            <a className="nav-main-link-custom" href="#/"><i className="nav-icon"></i>Reports</a>
                          </div>
                          <div className="nav-main-item-custom">
                            <a className="nav-main-link-custom" href="#/settings" aria-current="page"><i className="nav-icon"></i>Settings</a>
                          </div>
                        </div>
                        <div className="side-bar-footer" >
                        <div className="divider" />
                        <div className="help"><div className="icon"><img src={require('../../assets/img/brand/help-icon.svg')}/></div><a>Help</a></div>
                        <div className="terms"><a>Terms</a></div>
                        <div className="privacy"><a>Privacy</a></div>
                        </div>
                    </div> 
            <Switch>
                {routes.map((route, idx) => {
                    return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                        <route.component {...props} />
                      )} />)
                      : (null);
                  },
                )}
                <Redirect from="/" to="/dashboard" />
              </Switch>
      </div>
    );
  }
}


export default DefaultLayout;
