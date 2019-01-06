import React, {Component} from 'react';
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from 'reactstrap';
import {Link} from 'react-router-dom';

class Login extends Component {
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
        <div className="login-form">
          <div className="header"><p>Login in</p></div>
            <div className="divider"/>
            <div className="form-content">
            <div className="email">
                    <Input type="email" placeholder="Email" />
                    
            </div>
            <div className="password">
                    <Input type="password" placeholder="Password"/>
            </div>
            <div className="forgot">
              <a>FORGOT PASWORD?</a>
            </div>
            <button className="submit" >LOG IN</button>
            <div className="footer">
              <a>Terms of Use </a>and<a> Privacy Policy.</a>
            </div>
            </div>        
          </div>
        </div>
        </div>


          {/* <Row className="justify-content-center">
            <Col lg="4" md="6" sm="7">
              <CardGroup>
                <Card className="p-4 text-white bg-dark text-center">
                  <CardBody>
                    <h5 className="text-uppercase font-weight-light border-bottom mt-4 mr-5 ml-5 mb-4 pb-3 ">Login</h5>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-envelope-o"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="email" placeholder="Email Address"/>
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-key"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Password"/>
                    </InputGroup>
                    <Button color="warning" className="px-4 btn-pill">Continue</Button>

                    <p className="mute-color m-3">
                      <small>Having issues? <Link to="/" className="text-white">Get Help</Link></small>
                    </p>
                    <p className="mute-color m-3">
                      <small>Don’t Have an account? <Link to="/" className="text-white">Request Access</Link>
                      </small>
                    </p>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row> */}
        </div>
    );
  }
}

export default Login;
