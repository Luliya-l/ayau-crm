import { Card } from "react-bootstrap"

const Kpi = ({title, value, period, className = 'text-danger'}): JSX.Element => {
    return (
        <Card
            bg={'dark'}
            key={'dark'}
            text={'dark'}
        >
            <Card.Header className="text-uppercase">{title}</Card.Header>
            <Card.Body>
                <Card.Title className={className}>{value}</Card.Title>
                <Card.Text className="py-2">
                    &nbsp;
                </Card.Text>
                <Card.Footer>
                    <small className="text-muted">{period}</small>
                </Card.Footer>
            </Card.Body>
        </Card>
    )
}

export default Kpi;