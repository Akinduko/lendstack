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
      <Container>
                    <AppSidebar fixed display="lg" className="custom-side-bar">
                       <SideBarProfile/>
                        <AppSidebarNav className="side-bar-nav" navConfig={navigation} {...this.props} />
                        
                        <AppSidebarFooter className="side-bar-footer" >
                        <div className="divider" />
                        <div className="help"><div className="icon"><img src={require('../../assets/img/brand/help-icon.svg')}/></div><a>Help</a></div>
                        <div className="terms"><a>Terms</a></div>
                        <div className="privacy"><a>Privacy</a></div>
                        </AppSidebarFooter>
                    </AppSidebar> 
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
      </Container>
    );
  }
}


export default DefaultLayout;
