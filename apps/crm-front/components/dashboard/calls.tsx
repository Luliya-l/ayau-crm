import { GetParams } from "apps/crm-front/specs/custom-service"
import { Card, Col, Container, Row } from "react-bootstrap"

const Calls = (): JSX.Element => {
    return (
        <Row>
            <Col lg={6} xs={6}>
                <Container fluid className='m-0 p-0 h-100'>
                    <Row className="pb-4">
                        <Col>
                            <Card
                                bg={'dark'}
                                key={'dark'}
                                text={'dark'}
                                className="h-100"
                            >
                                <Card.Header className="text-uppercase">{GetParams('IncomingCalls')}</Card.Header>
                                <Card.Body>
                                    <Card.Title className="text-danger">{'0'}</Card.Title>
                                    <Card.Text className="py-2">
                                        &nbsp;
                                    </Card.Text>
                                    <Card.Text>
                                        &nbsp;
                                    </Card.Text>
                                    <Card.Footer>
                                        <small className="text-muted">{GetParams('onweek')}</small>
                                    </Card.Footer>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>  
                    <Row>
                        <Col>
                            <Card
                                bg={'dark'}
                                key={'dark'}
                                text={'dark'}
                                className="h-100"
                            >
                                <Card.Header className="text-uppercase">{GetParams('notes')}</Card.Header>
                                <Card.Body>
                                    <Card.Title className="text-info">{'0'}</Card.Title>
                                    <Card.Text className="py-2">
                                        &nbsp;
                                    </Card.Text>
                                    <Card.Text>
                                        &nbsp;
                                    </Card.Text>
                                    <Card.Footer>
                                        <small className="text-muted">{GetParams('onweek')}</small>
                                    </Card.Footer>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>  
                </Container>
            </Col>
            <Col lg={6} xs={6}>
                <Container fluid className='p-0 m-0 h-100'>
                    <Row className="pb-4">
                        <Col>
                            <Card
                                bg={'dark'}
                                key={'dark'}
                                text={'dark'}
                                className="h-100"
                            >
                                <Card.Header className="text-uppercase">{GetParams('outgoingcalls')}</Card.Header>
                                <Card.Body>
                                    <Card.Title className="text-success">{'0'}</Card.Title>
                                    <Card.Text className="py-2">
                                        &nbsp;
                                    </Card.Text>
                                    <Card.Text>
                                        &nbsp;
                                    </Card.Text>
                                    <Card.Footer>
                                        <small className="text-muted">{GetParams('onweek')}</small>
                                    </Card.Footer>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>  
                    <Row>
                        <Col>
                            <Card
                                bg={'dark'}
                                key={'dark'}
                                text={'dark'}
                                className="h-100"
                            >
                                <Card.Header className="text-uppercase">{GetParams('successfuldeals')}</Card.Header>
                                <Card.Body>
                                    <Card.Title className="text-warning">{'0'}</Card.Title>
                                    <Card.Text className="py-2">
                                        &nbsp;
                                    </Card.Text>
                                    <Card.Text>
                                        &nbsp;
                                    </Card.Text>
                                    <Card.Footer>
                                        <small className="text-muted">{GetParams('onweek')}</small>
                                    </Card.Footer>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>  
                </Container>
            </Col>
        </Row>
    )
}

export default Calls;