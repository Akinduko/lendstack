import React, { Component } from 'react';
import { Card, 
  CardBody, 
  CardFooter,
   CardHeader, 
   Row,
    Col,
     Nav,
      NavItem, 
      NavLink,
       TabContent,
        TabPane,
        Button, 
        InputGroupText,
        Input,
        InputGroup,
        InputGroupAddon
      } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import classnames from 'classnames';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      activeTab: '1',
    };
    this.toggle = this.toggle.bind(this);
    this.toggleTab = this.toggleTab.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
  }


  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }
  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState({ fadeIn: !this.state.fadeIn });
  }

  render() {
    return (
      <div className="animated fadeIn">
      <div>
      <InputGroup className="input-prepend">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="fa fa-search"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input size="16" type="text" placeholder="What are you looking for?" />
                {/* <InputGroupAddon addonType="append">
                  <Button color="info">Search</Button>
                </InputGroupAddon> */}
      </InputGroup>
      </div>

        <Row style={{marginTop:'10px'}}>
          <Col className="mb-4">
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '1' })}
                  onClick={() => { this.toggleTab('1'); }}
                >
                  Latest Posts
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })}
                  onClick={() => { this.toggleTab('2'); }}
                >
                  Top Posts
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '3' })}
                  onClick={() => { this.toggleTab('3'); }}
                >
                  DIY
                </NavLink>
              </NavItem>
            </Nav>
          <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
          <Row>
          <Col xs="12" sm="6" md="4">
            <Card style={{backgroundColor:"LEMONCHIFFON", color:"BLACK"}} >
              <CardHeader   style={{height:80}}>
              <div style={{display:"flex"}}>
                <img className="rounded-circle" style={{height:50,width:50}} src="https://res.cloudinary.com/devgeaks/image/upload/v1523729999/2017-03-02_08.30.03.jpg"/>
                <a style={{marginTop: 'auto',marginLeft: 'auto'}}>How to Make ends Meet</a>
              </div>
              </CardHeader>
              <CardBody>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
              </CardBody>
              <CardFooter>
                  <div className="card-header-actions">
                    <a href="#" className="card-header-action btn btn-setting">Read Post</a>
                  </div>
                </CardFooter>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="4">
            <Card style={{backgroundColor:"LEMONCHIFFON", color:"BLACK"}} >
            <CardHeader   style={{height:80}}>
              <div style={{display:"flex"}}>
                <img className="rounded-circle" style={{height:50,width:50}} src="https://res.cloudinary.com/devgeaks/image/upload/v1523729999/2017-03-02_08.30.03.jpg"/>
                <a style={{marginTop: 'auto',marginLeft: 'auto'}}>How to Make ends Meet</a>
              </div>
              </CardHeader>
              <CardBody>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
              </CardBody>
              <CardFooter>
                  <div className="card-header-actions">
                    <a href="#" className="card-header-action btn btn-setting">Read Post</a>
                  </div>
                </CardFooter>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="4">
            <Card style={{backgroundColor:"LEMONCHIFFON", color:"BLACK"}} >
            <CardHeader   style={{height:80}}>
              <div style={{display:"flex"}}>
                <img className="rounded-circle" style={{height:50,width:50}} src="https://res.cloudinary.com/devgeaks/image/upload/v1523729999/2017-03-02_08.30.03.jpg"/>
                <a style={{marginTop: 'auto',marginLeft: 'auto'}}>How to Make ends Meet</a>
              </div>
              </CardHeader>
              <CardBody>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
              </CardBody>
              <CardFooter>
                  <div className="card-header-actions">
                    <a href="#" className="card-header-action btn btn-setting">Read Post</a>
                  </div>
                </CardFooter>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="4">
            <Card style={{backgroundColor:"LEMONCHIFFON", color:"BLACK"}} >
            <CardHeader   style={{height:80}}>
              <div style={{display:"flex"}}>
                <img className="rounded-circle" style={{height:50,width:50}} src="https://res.cloudinary.com/devgeaks/image/upload/v1523729999/2017-03-02_08.30.03.jpg"/>
                <a style={{marginTop: 'auto',marginLeft: 'auto'}}>How to Make ends Meet</a>
              </div>
              </CardHeader>
              <CardBody>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
              </CardBody>
              <CardFooter>
                  <div className="card-header-actions">
                    <a href="#" className="card-header-action btn btn-setting">Read Post</a>
                  </div>
                </CardFooter>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="4">
            <Card style={{backgroundColor:"LEMONCHIFFON", color:"BLACK"}} >
            <CardHeader   style={{height:80}}>
              <div style={{display:"flex"}}>
                <img className="rounded-circle" style={{height:50,width:50}} src="https://res.cloudinary.com/devgeaks/image/upload/v1523729999/2017-03-02_08.30.03.jpg"/>
                <a style={{marginTop: 'auto',marginLeft: 'auto'}}>How to Make ends Meet</a>
              </div>
              </CardHeader>
              <CardBody>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
              </CardBody>
              <CardFooter>
                  <div className="card-header-actions">
                    <a href="#" className="card-header-action btn btn-setting">Read Post</a>
                  </div>
                </CardFooter>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="4">
              <Card>
              <CardHeader   style={{height:80}}>
              <div style={{display:"flex"}}>
                <img className="rounded-circle" style={{height:50,width:50}} src="https://res.cloudinary.com/devgeaks/image/upload/v1523729999/2017-03-02_08.30.03.jpg"/>
                <a style={{marginTop: 'auto',marginLeft: 'auto'}}>How to Make ends Meet</a>
              </div>
              </CardHeader>
                  <CardBody>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                    laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                    ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
                  </CardBody>
                  <CardFooter>
                  <div className="card-header-actions">
                    <a href="#" className="card-header-action btn btn-setting">Read Post</a>
                  </div>
                </CardFooter>
              </Card>
          </Col>
          </Row>
          </TabPane>
          <TabPane tabId="2">
          <Row>
          <Col xs="12" sm="6" md="4">
            <Card style={{backgroundColor:"LEMONCHIFFON", color:"BLACK"}} >
            <CardHeader   style={{height:80}}>
              <div style={{display:"flex"}}>
                <img className="rounded-circle" style={{height:50,width:50}} src="https://res.cloudinary.com/devgeaks/image/upload/v1523729999/2017-03-02_08.30.03.jpg"/><
                  a style={{marginTop: 'auto',marginLeft: 'auto'}}>How to Make ends Meet</a>
              </div>
              </CardHeader>
              <CardBody>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
              </CardBody>
              <CardFooter>
                  <div className="card-header-actions">
                    <a href="#" className="card-header-action btn btn-setting">Read Post</a>
                  </div>
                </CardFooter>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="4">
            <Card style={{backgroundColor:"LEMONCHIFFON", color:"BLACK"}} >
            <CardHeader   style={{height:80}}>
              <div style={{display:"flex"}}>
                <img className="rounded-circle" style={{height:50,width:50}} src="https://res.cloudinary.com/devgeaks/image/upload/v1523729999/2017-03-02_08.30.03.jpg"/>
                <a style={{marginTop: 'auto',marginLeft: 'auto'}}>How to Make ends Meet</a>
              </div>
              </CardHeader>
              <CardBody>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
              </CardBody>
              <CardFooter>
                  <div className="card-header-actions">
                    <a href="#" className="card-header-action btn btn-setting">Read Post</a>
                  </div>
                </CardFooter>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="4">
            <Card style={{backgroundColor:"LEMONCHIFFON", color:"BLACK"}} >
            <CardHeader   style={{height:80}}>
              <div style={{display:"flex"}}>
                <img className="rounded-circle" style={{height:50,width:50}} src="https://res.cloudinary.com/devgeaks/image/upload/v1523729999/2017-03-02_08.30.03.jpg"/>
                <a style={{marginTop: 'auto',marginLeft: 'auto'}}>How to Make ends Meet</a>
              </div>
              </CardHeader>
              <CardBody>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
              </CardBody>
              <CardFooter>
                  <div className="card-header-actions">
                    <a href="#" className="card-header-action btn btn-setting">Read Post</a>
                  </div>
                </CardFooter>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="4">
            <Card style={{backgroundColor:"LEMONCHIFFON", color:"BLACK"}} >
            <CardHeader   style={{height:80}}>
              <div style={{display:"flex"}}>
                <img className="rounded-circle" style={{height:50,width:50}} src="https://res.cloudinary.com/devgeaks/image/upload/v1523729999/2017-03-02_08.30.03.jpg"/>
                <a style={{marginTop: 'auto',marginLeft: 'auto'}}>How to Make ends Meet</a>
              </div>
              </CardHeader>
              <CardBody>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
              </CardBody>
              <CardFooter>
                  <div className="card-header-actions">
                    <a href="#" className="card-header-action btn btn-setting">Read Post</a>
                  </div>
                </CardFooter>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="4">
            <Card style={{backgroundColor:"LEMONCHIFFON", color:"BLACK"}}>
            <CardHeader   style={{height:80}}>
              <div style={{display:"flex"}}>
                <img className="rounded-circle" style={{height:50,width:50}} src="https://res.cloudinary.com/devgeaks/image/upload/v1523729999/2017-03-02_08.30.03.jpg"/>
                <a style={{marginTop: 'auto',marginLeft: 'auto'}}>How to Make ends Meet</a>
              </div>
              </CardHeader>
              <CardBody>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
              </CardBody>
              <CardFooter>
                  <div className="card-header-actions">
                    <a href="#" className="card-header-action btn btn-setting">Read Post</a>
                  </div>
                </CardFooter>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="4">
              <Card style={{backgroundColor:"LEMONCHIFFON", color:"BLACK"}}>
              <CardHeader   style={{height:80}}>
              <div style={{display:"flex"}}>
                <img className="rounded-circle" style={{height:50,width:50}} src="https://res.cloudinary.com/devgeaks/image/upload/v1523729999/2017-03-02_08.30.03.jpg"/>
                <a style={{marginTop: 'auto',marginLeft: 'auto'}}>How to Make ends Meet</a>
              </div>
              </CardHeader>
                  <CardBody>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                    laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                    ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
                  </CardBody>
                  <CardFooter>
                  <div className="card-header-actions">
                    <a href="#" className="card-header-action btn btn-setting">Read Post</a>
                  </div>
                </CardFooter>
              </Card>
          </Col>
          </Row>
          </TabPane>
          <TabPane tabId="3">
          <Row>
          <Col xs="12" sm="6" md="4">
            <Card style={{backgroundColor:"LEMONCHIFFON", color:"BLACK"}}>
            <CardHeader   style={{height:80}}>
              <div style={{display:"flex"}}>
                <img className="rounded-circle" style={{height:50,width:50}} src="https://res.cloudinary.com/devgeaks/image/upload/v1523729999/2017-03-02_08.30.03.jpg"/>
                <a style={{marginTop: 'auto',marginLeft: 'auto'}}>How to Make ends Meet</a>
              </div>
              </CardHeader>
              <CardBody>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
              </CardBody>
              <CardFooter>
                  <div className="card-header-actions">
                    <a href="#" className="card-header-action btn btn-setting">Read Post</a>
                  </div>
                </CardFooter>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="4">
            <Card style={{backgroundColor:"LEMONCHIFFON", color:"BLACK"}} >
            <CardHeader   style={{height:80}}>
              <div style={{display:"flex"}}>
                <img className="rounded-circle" style={{height:50,width:50}} src="https://res.cloudinary.com/devgeaks/image/upload/v1523729999/2017-03-02_08.30.03.jpg"/>
                <a style={{marginTop: 'auto',marginLeft: 'auto'}}>How to Make ends Meet</a>
              </div>
              </CardHeader>
              <CardBody>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
              </CardBody>
              <CardFooter>
                  <div className="card-header-actions">
                    <a href="#" className="card-header-action btn btn-setting">Read Post</a>
                  </div>
                </CardFooter>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="4">
            <Card style={{backgroundColor:"LEMONCHIFFON", color:"BLACK"}} >
            <CardHeader   style={{height:80}}>
              <div style={{display:"flex"}}>
                <img className="rounded-circle" style={{height:50,width:50}} src="https://res.cloudinary.com/devgeaks/image/upload/v1523729999/2017-03-02_08.30.03.jpg"/>
                <a style={{marginTop: 'auto',marginLeft: 'auto'}}>How to Make ends Meet</a>
              </div>
              </CardHeader>
              <CardBody>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
              </CardBody>
              <CardFooter>
                  <div className="card-header-actions">
                    <a href="#" className="card-header-action btn btn-setting">Read Post</a>
                  </div>
                </CardFooter>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="4">
            <Card style={{backgroundColor:"LEMONCHIFFON", color:"BLACK"}} >
            <CardHeader   style={{height:80}}>
              <div style={{display:"flex"}}>
                <img className="rounded-circle" style={{height:50,width:50}} src="https://res.cloudinary.com/devgeaks/image/upload/v1523729999/2017-03-02_08.30.03.jpg"/>
                <a style={{marginTop: 'auto',marginLeft: 'auto'}}>How to Make ends Meet</a>
              </div>
              </CardHeader>
              <CardBody>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
              </CardBody>
              <CardFooter>
                  <div className="card-header-actions">
                    <a href="#" className="card-header-action btn btn-setting">Read Post</a>
                  </div>
                </CardFooter>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="4">
            <Card style={{backgroundColor:"LEMONCHIFFON", color:"BLACK"}} >
            <CardHeader   style={{height:80}}>
              <div style={{display:"flex"}}>
                <img className="rounded-circle" style={{height:50,width:50}} src="https://res.cloudinary.com/devgeaks/image/upload/v1523729999/2017-03-02_08.30.03.jpg"/>
                <a style={{marginTop: 'auto',marginLeft: 'auto'}}>How to Make ends Meet</a>
              </div>
              </CardHeader>
              <CardBody>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
              </CardBody>
              <CardFooter>
                  <div className="card-header-actions">
                    <a href="#" className="card-header-action btn btn-setting">Read Post</a>
                  </div>
                </CardFooter>
            </Card>
          </Col>
          <Col xs="12" sm="6" md="4">
              <Card>
              <CardHeader   style={{height:80}}>
              <div style={{display:"flex"}}>
                <img className="rounded-circle" style={{height:50,width:50}} src="https://res.cloudinary.com/devgeaks/image/upload/v1523729999/2017-03-02_08.30.03.jpg"/>
                <a style={{marginTop: 'auto',marginLeft: 'auto'}}>How to Make ends Meet</a>
              </div>
              </CardHeader>
                  <CardBody>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                    laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                    ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
                  </CardBody>
                  <CardFooter>
                  <div className="card-header-actions">
                    <a href="#" className="card-header-action btn btn-setting">Read Post</a>
                  </div>
                </CardFooter>
              </Card>
          </Col>
          </Row>
          </TabPane>
        </TabContent>
      </Col>
    </Row>
  </div>
    );
  }
}

export default Profile;
