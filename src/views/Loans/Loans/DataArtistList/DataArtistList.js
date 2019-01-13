import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {
Input,
Modal,
Row,
Col,
Nav,
NavItem, 
NavLink,
TabContent,
TabPane
        } from 'reactstrap';
import classnames from 'classnames';
import Personal from './Personal'
import Guarantor from "./Guarantor";
import Address from './Address';
import Employee from './Employee';
import Loans from "./Loans";
import data from './_data';


class DataArtistList extends Component {
    constructor(props) {
        super(props);
        this.table = data.rows;
        this.options = {
            sortIndicator: true,
            hideSizePerPage: true,
            paginationSize: 5,
            hidePageListOnlyOnePage: true,
            clearSearch: true,
            alwaysShowAllBtns: false,
            withFirstAndLast: false
        }
        this.state = {
            editloanmodal: false,
            activeTab: '1'
          };

    }

     editFormater = (cell, row) => {
        return <div className="edit" onClick={()=>this.toggleModal("editloanmodal")}>VIEW DETAILS</div>
      };

      dateFormater = (cell, row) => {
        return <div className="date"><a>20 Jul 2018, 12:30AM</a></div>
      };

      profileFormater = (cell, row) => {
        return <div className="profile"><a>Adekeye Ogheneochuko</a></div>
      };

      emailFormater = (cell, row) => {
        return <div className="email"><a>#5000000</a></div>
      };
      numberFormater = (cell, row) => {
        return <div className="number"><a>2 Months</a></div>
      };
      toggleModal(name){
          const action ={}
          action[name]=!this.state[name]
          this.setState(action)
      }
      toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab,
          });
        }
      }
    
    render() {

        return (
    <div className="full-loan-list">
       <Modal isOpen={this.state.editloanmodal} className="edit-loan-modal">
         <div className="sub-container">
         <div className="modal-head">
            <a>Loan details</a>
        </div>
          <Row>
          <Col className="main-container">
            <Nav tabs>
            <div className="block-group">
            <div className="divider-top"/>
            <div className="actual-tabs">
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '1' })}
                  onClick={() => { this.toggle('1'); }}
                >
                  Personal
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })}
                  onClick={() => { this.toggle('2'); }}
                >
                  Address
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '3' })}
                  onClick={() => { this.toggle('3'); }}
                >
                  Loans
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '4' })}
                  onClick={() => { this.toggle('4'); }}
                >
                  Employee
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '5' })}
                  onClick={() => { this.toggle('5'); }}
                >
                  Guarantors
                </NavLink>
              </NavItem>
              </div>
              <div className="divider-bottom"/>
            </div>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <Personal/>
            </TabPane>
            <TabPane tabId="2">
            <Address/>
            </TabPane>
            <TabPane tabId="3">
            <Loans/>
            </TabPane>
            <TabPane tabId="4">
            <Employee/>
            </TabPane>
            <TabPane tabId="5">
            <Guarantor/>
            </TabPane>
            </TabContent>
          </Col>
        </Row>
        
                    </div>
                </Modal>

                    <div className="table-header">
                    <div className="inputs">
                    {/* <div className="role"><a>Role</a><Input/></div> <div className="status"><a>Status</a><Input/></div> */}
                    </div>
                    <div className="actions">
                    <div className="space-evenly">
                    <div className="filter"><img src={require('../../../../assets/img/brand/filter-icon.svg')}/><a>Filter</a></div>
                    <div className="sort"><img src={require('../../../../assets/img/brand/sort-icon.svg')}/><a>Sort</a></div>
                    <div className="search"><img src={require('../../../../assets/img/brand/search-icon.svg')}/><a>Search</a></div>                       
                    </div>
                    {/* <div className="clear-filter"><a>CLEAR FILTER</a></div> */}
                    </div>
                    </div>
                    <BootstrapTable data={ this.table } pagination version="4" bordered={false}   hover={true} role="grid"
                                    options={this.options}>
                        <TableHeaderColumn  dataField="artist-img" width="10%" dataFormat={this.profileFormater}></TableHeaderColumn>
                        <TableHeaderColumn dataField="age" isKey  width="10%" dataFormat={this.emailFormater}></TableHeaderColumn>
                        <TableHeaderColumn dataField="age"  width="10%" dataFormat={this.numberFormater}></TableHeaderColumn>
                        <TableHeaderColumn dataField="age"  width="15%" dataFormat={this.dateFormater}></TableHeaderColumn>
                        <TableHeaderColumn  dataField="age"  width="15%" dataFormat={this.editFormater} ></TableHeaderColumn>
                    </BootstrapTable>
                </div>
        );
    }
}


export default DataArtistList;
