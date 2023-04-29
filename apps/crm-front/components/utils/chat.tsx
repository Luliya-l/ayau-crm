import { useState } from "react";
import { Button, Col, Container, Form, InputGroup, Nav, Row, Tab } from "react-bootstrap";

const Chat = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [chatContetnt, setChatContent] = useState('')

    return (
        <>
            <Button 
                variant="back-on-top" 
                className='rounded-circle btn-floating btn-lg m-0 p-0 position-fixed' 
                style={{
                    background:'transparent', 
                    border:'none',
                    width:'64px', 
                    height:'64px', 
                    zIndex:'1099', 
                    bottom:'2%',
                    right:'2%'
                }}
                onClick={() => handleShow()}
            >
                <i className="bi bi-chat-dots py-2" style={{ fontSize: '1.75em', color:'rgba(235, 94, 69, 1)' }} />
            </Button>
            <Container 
                className={`${show ? '' : 'd-none'} position-fixed bg-light p-2 rounded`}
                style={{bottom:'1%', right:'1%', zIndex:'99999', maxWidth:'390px', height:'70%'}}
            >
                <i 
                    role="button" 
                    className="bi bi-x text-black fs-3"
                    onClick={() => handleClose()}
                ></i>
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row>
                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                <Nav.Link eventKey="first">
                                    <i className="bi bi-alexa fs-5"></i>
                                </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                <Nav.Link eventKey="second">
                                    <i className="bi bi-people fs-5"></i>
                                </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    <Row
                                        style={{height:'398px'}}
                                    >
                                        <Col 
                                            className=""
                                             
                                        >
                                            <Container>
                                                {chatContetnt}
                                            </Container>
                                        </Col>
                                    </Row>
                                    <Row
                                        style={{height:'5%'}}
                                    >
                                        <Col>
                                            <InputGroup className="mb-3">
                                                <Form.Control
                                                    aria-label="Recipient's username"
                                                    aria-describedby="basic-addon2"
                                                />
                                                <Button variant="outline-secondary" id="button-addon2">
                                                    <i className="bi bi-chat-dots" />
                                                </Button>
                                            </InputGroup>
                                        </Col>
                                    </Row>
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <Row
                                        style={{height:'398px'}}
                                    >
                                        <Col 
                                            className=""
                                             
                                        >
                                            <Container>
                                                {chatContetnt}
                                            </Container>
                                        </Col>
                                    </Row>
                                    <Row
                                        style={{height:'5%'}}
                                    >
                                        <Col>
                                            <InputGroup className="mb-3">
                                                <Form.Control
                                                    aria-label="Recipient's username"
                                                    aria-describedby="basic-addon2"
                                                />
                                                <Button variant="outline-secondary" id="button-addon2">
                                                    <i className="bi bi-chat-dots" />
                                                </Button>
                                            </InputGroup>
                                        </Col>
                                    </Row>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Container>
        </>
    )
}

export default Chat;