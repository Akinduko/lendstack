import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import {Link} from 'react-router-dom';
class Register extends Component {
  render() {
    return (
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  {/* <h1 style={{textAlign:'center'}}>Create your account</h1> */}
                  <p style={{textAlign:'center'}} className="text-muted"><strong>Create your account</strong></p>
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
                  <Button color="success" block>Signup</Button>
                </CardBody>
                <CardFooter block>   
                <Col style={{display:'table'}}>
                <div style={{display:'flex',float:'right'}}><small>Have an account? <Link to="/login" className="text-mute">Login</Link>
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

export default Register;
