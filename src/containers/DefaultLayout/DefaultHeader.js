import React, { Component } from 'react';
import { Nav } from 'reactstrap';

import PropTypes from 'prop-types';

import {  AppSidebarToggler } from '@coreui/react';

import DefaultHeaderDropdown  from './DefaultHeaderDropdown'
const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <Nav className="ml-auto" navbar>
          <DefaultHeaderDropdown notif/>
        </Nav>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
