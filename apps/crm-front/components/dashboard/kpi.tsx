import { GetParams } from "apps/crm-front/specs/custom-service"
import { Card, Col, Row } from "react-bootstrap"

const Kpi = (): JSX.Element => {
    return (
        <Row id='comp-content' className='mb-3'>
            <Col lg={3} xs={3}>
                <Card
                    bg={'dark'}
                    key={'dark'}
                    text={'dark'}
                >
                    <Card.Header className="text-uppercase">{GetParams('overdueTasks')}</Card.Header>
                    <Card.Body>
                        <Card.Title className="text-danger">{'0'}</Card.Title>
                        <Card.Footer>
                            <small className="text-muted">{GetParams('onweek')}</small>
                        </Card.Footer>
                    </Card.Body>
                </Card>
            </Col>
            <Col lg={3} xs={3}>
                <Card
                    bg={'dark'}
                    key={'dark'}
                    text={'dark'}
                >
                    <Card.Header className="text-uppercase">{GetParams('newTasks')}</Card.Header>
                    <Card.Body>
                        <Card.Title className="text-info">{'0'}</Card.Title>
                        <Card.Footer>
                            <small className="text-muted">{GetParams('onweek')}</small>
                        </Card.Footer>
                    </Card.Body>
                </Card>
            </Col>
            <Col lg={3} xs={3}>
                <Card
                    bg={'dark'}
                    key={'dark'}
                    text={'dark'}
                >
                    <Card.Header className="text-uppercase">{GetParams('completeTasks')}</Card.Header>
                    <Card.Body>
                        <Card.Title className="text-success">{'0'}</Card.Title>
                        <Card.Footer>
                            <small className="text-muted">{GetParams('onweek')}</small>
                        </Card.Footer>
                    </Card.Body>
                </Card>
            </Col>
            <Col lg={3} xs={3}>
                <Card
                    bg={'dark'}
                    key={'dark'}
                    text={'dark'}
                >
                    <Card.Header className="text-uppercase">{GetParams('withoutTask')}</Card.Header>
                    <Card.Body>
                        <Card.Title className="text-warning">{'0'}</Card.Title>
                        <Card.Footer>
                            <small className="text-muted">{GetParams('onweek')}</small>
                        </Card.Footer>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default Kpi;