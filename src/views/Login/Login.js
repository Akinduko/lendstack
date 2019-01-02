import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { Button, Card, CardBody, CardFooter, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

class Login extends Component {
  render() {
    return (
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
            
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
                  
                  <div  className="d-flex justify-content-between"> 
                  <Button color="success" block>Login</Button>
                </div> 
                </CardBody>
                <CardFooter block>   
                <Col style={{display:'table'}}>
                <div style={{display:'flex',float:'left'}} >
                    Quick Login
                </div>
                <div style={{display:'flex',float:'right'}}><small>Don’t Have an account? <Link to="/register" className="text-mute">Signup</Link>
                      </small>          
                </div> 
                </Col>             
                <Col style={{display:'table',marginTop:'10px'}}>
                <div style={{display:'flex',float:'left'}} >
                <a style={{width:'50px'}}><i className="fa fa-google fa-lg"></i></a>
                  <a style={{width:'50px'}}><i className="fa fa-github fa-lg"></i></a>
                  <a style={{width:'50px'}}> <i className="fa fa-facebook fa-lg"></i></a>
                  <a style={{width:'50px'}}><i className="fa fa-twitter fa-lg"></i></a> 
                </div>
                <div style={{display:'flex',float:'right'}}><small>Forgot Password? <Link to="/recover" className="text-mute">Recover</Link>
                      </small>          
                </div>
                </Col>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
    );
  }
}

export default Login;
