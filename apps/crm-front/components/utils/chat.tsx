import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

const Chat = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                }}>
                <i className="bi bi-chat-dots py-2" style={{ fontSize: '1.75em', color:'rgba(235, 94, 69, 1)' }} />
            </Button>
            <Container>
                <Row>
                    <Col>
                    </Col>
                    <Col>
                        <Container>
                            <Row>
                                <Col>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Chat;