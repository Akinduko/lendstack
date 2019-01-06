import React, { Component } from 'react';
import {

  Nav,
  NavItem, 
  NavLink,
  TabContent,
  TabPane,
  Input
      } from 'reactstrap';
import classnames from 'classnames';

class Register extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
    };
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
      <div className="access-container">
        <div className="header-row-flex">
        <div className="lend-logo">
          <img src={require('../../../assets/img/brand/logo.svg')}/>
          </div>            
            <div className="socials">
            <a href="https://web.facebook.com/Lendstack/" target="_blank" className="facebook">
              <i className="fa fa-facebook"></i>
            </a>
            <a href="https://www.linkedin.com/company/lendstack/" target="_blank" className="facebook">
              <i className="fa fa-linkedin"></i>
            </a>
            <a href="https://twitter.com/lendstack" target="_blank" className="twitter">
              <i className="fa fa-twitter"></i>
            </a>               
            </div>
        </div>
        <div className="body-row-flex">
        <div className="left-column-flex">
        <div className="page-communication">
          <p>Software to run your loan business</p>
          <a>Your everyday tasks feel light. More time with Borrowers, less time with paper and spreadsheets. </a>
          </div>
          <div className="page-illustration">
          <img src={require('../../../assets/img/brand/illustration.svg')}/>
          </div>
        </div>
        <div className="right-column-flex">
          <div className="register-form">
            <div className="header"><p>Join Lendstack !</p></div>
            <div className="divider"/>
            <div className="form-content">
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '1' })}
                  onClick={() => { this.toggle('1'); }}
                >
                  Business Lender
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })}
                  onClick={() => { this.toggle('2'); }}
                >
                  Individual Lender
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
            <div className="bizname">
                    <Input type="text" placeholder="Business Name" />
            </div>
            <div className="email">
                    <Input type="email" placeholder="Email" />
                    
            </div>
            <div className="password">
                    <Input type="password" placeholder="Password"/>
            </div>
            <button className="submit" >GET STARTED</button>
            <div className="footer-1">
              Already have an account? <a>Sign in</a>
            </div>
            <div className="divider"/>
            <div className="footer-2">
              <a>Terms of Use </a>and<a> Privacy Policy.</a>
            </div>
            </TabPane>
            <TabPane tabId="2">
            <div className="firstname">
                    <Input type="text" placeholder="First Name" />
            </div>
            <div className="lastname">
                    <Input type="text" placeholder="Last Name" />
            </div>
            <div className="email">
                    <Input type="email" placeholder="Email" />
                    
            </div>
            <div className="password">
                    <Input type="password" placeholder="Password"/>
            </div>
            <button className="submit" >GET STARTED</button>
            <div className="footer-1">
              Already have an account? <a>Sign in</a>
            </div>
            <div className="divider"/>
            <div className="footer-2">
              <a>Terms of Use </a>and<a> Privacy Policy.</a>
            </div>
            </TabPane>
            </TabContent>
            </div>
          </div>
          </div>
        </div>
        {/* <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-user"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" placeholder="Username" />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>@</InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" placeholder="Email" />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-lock"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="password" placeholder="Password" />
                  </InputGroup>
                  <InputGroup className="mb-4">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-lock"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="password" placeholder="Repeat password" />
                  </InputGroup>
                  <Button color="success" block>Create Account</Button>
                </CardBody>
                <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook" block><span>facebook</span></Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-twitter" block><span>twitter</span></Button>
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container> */}
      </div>
    );
  }
}

export default Register;
