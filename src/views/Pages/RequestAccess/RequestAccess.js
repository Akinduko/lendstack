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
  FormFeedback,
  Row
} from 'reactstrap';
import {Link} from 'react-router-dom';

class RequestAccess extends Component {
  render() {
    return (
      <div className="forgot-container">
      <div className="lend-logo">
          <img src={require('../../../assets/img/brand/logo-forgot.svg')}/>
      </div>            
          <div className="forgot-form">
          <div className="form-communication">
          <p>Forgot Your Password?</p>
          <a>Enter the email address you registered with and we'll send you instructions on how to reset it.</a>
          </div>
          <div className="email">
                    <Input type="email" placeholder="Email"/>
            </div>
            <button className="submit" >SEND RESET INSTRUCTIONS</button>
          </div>
        {/* <Container>
          <Row className="justify-content-center">
            <Col lg="4" md="6" sm="7">
              <CardGroup>
                <Card className="p-4 text-white bg-dark text-center">
                  <CardBody>
                    <img className="" style={{width: '45px'}} src={require('../../../assets/img/udux-logo.svg')}/>
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
                      <Input type="email" className="form-control-warning" placeholder="Password" id="inputWarning2i" required/>
                      <FormFeedback className="help-block">Sorry! the specified email address does not belong to a registered uduX account.</FormFeedback>
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
          </Row>
        </Container> */}
        {/* <div className="d-flex justify-content-between mute-color position-absolute fixed-bottom mb-3 mr-5 ml-5">
          <div>
            <small className="mr-4"><Link to="/" className="mute-color">Legal</Link></small>
            <small className="mr-4"><Link to="/" className="mute-color">Privacy Policy</Link></small>
            <small><Link to="/" className="mute-color">Cookies</Link></small>
          </div>
          <div>
            <small className="mute-color">© 2018 uduX</small>
          </div>
        </div> */}
      </div>
    );
  }
}

export default RequestAccess;
