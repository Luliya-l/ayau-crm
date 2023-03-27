import { useEffect, useState } from "react";
import { Card, Col, Container, Fade, Row } from "react-bootstrap";
import {
    AxisModel, Category, ChartComponent, ColumnSeries, DataLabel, Inject,
    Legend, LegendSeriesModel, LineSeries, SeriesCollectionDirective, SeriesDirective, Tooltip, TooltipSettingsModel
} from '@syncfusion/ej2-react-charts';

const DashBoardMain = () => {
    const [isLoading, setLoading] = useState([false,false]);
    const setIsLoading = (state, index) => {
        const s = [...isLoading];
        s[index] = state;
        setLoading([...s]);
    }

    useEffect(() => {
        if (isLoading.includes(false)){
        document.body.style.overflow = 'hidden';
        } else {
        document.body.style.overflow = '';
        }
        console.log(isLoading);
    }, [isLoading]);

    const data: any[] = [
        { month: 'Jan', sales: 35 }, { month: 'Feb', sales: 28 },
        { month: 'Mar', sales: 34 }, { month: 'Apr', sales: 32 },
        { month: 'May', sales: 40 }, { month: 'Jun', sales: 32 },
        { month: 'Jul', sales: 35 }, { month: 'Aug', sales: 55 },
        { month: 'Sep', sales: 38 }, { month: 'Oct', sales: 30 },
        { month: 'Nov', sales: 25 }, { month: 'Dec', sales: 32 }
      ];
    const tooltip: TooltipSettingsModel = { enable: true, shared: false }
    const primaryyAxis: AxisModel = { labelFormat: '${value}K' }
    const primarxyAxis: AxisModel = { valueType: 'Category' }
    const legendSettings: LegendSeriesModel = { visible: true }
    const marker = { 
        dataLabel: { visible: true}
    };

    return (
        <>
            {/* in={!isLoading.includes(false)} */}
            <Fade in={true}>
                <Container>
                    <Row>
                        <Col className="text-center my-2">
                            <h1>{'Рабочий стол'}</h1>
                        </Col>
                    </Row>
                    <Row id='comp-content' className='-0'>
                        <Col lg={2} xs={2}>
                            <Container fluid className='m-0 p-0 h-100'>
                                <Row className="pb-4">
                                    <Col>
                                        <Card
                                            bg={'dark'}
                                            key={'dark'}
                                            text={'dark'}
                                            className="h-100"
                                        >
                                            <Card.Header className="text-uppercase">{'просроченные задачи'}</Card.Header>
                                            <Card.Body>
                                                <Card.Title className="text-danger">{'0'}</Card.Title>
                                                <Card.Text className="py-4">
                                                    &nbsp;
                                                </Card.Text>
                                                <Card.Text>
                                                    &nbsp;
                                                </Card.Text>
                                                <Card.Footer>
                                                    <small className="text-muted">{'за неделю'}</small>
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
                                            <Card.Header className="text-uppercase">{'задачи к выполнению'}</Card.Header>
                                            <Card.Body>
                                                <Card.Title className="text-info">{'0'}</Card.Title>
                                                <Card.Text className="py-4">
                                                    &nbsp;
                                                </Card.Text>
                                                <Card.Text>
                                                    &nbsp;
                                                </Card.Text>
                                                <Card.Footer>
                                                    <small className="text-muted">{'за неделю'}</small>
                                                </Card.Footer>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>  
                            </Container>
                        </Col>
                        <Col lg={2} xs={2}>
                            <Container fluid className='p-0 m-0 h-100'>
                                <Row className="pb-4">
                                    <Col>
                                        <Card
                                            bg={'dark'}
                                            key={'dark'}
                                            text={'dark'}
                                            className="h-100"
                                        >
                                            <Card.Header className="text-uppercase">{'выполненные задачи'}</Card.Header>
                                            <Card.Body>
                                                <Card.Title className="text-success">{'0'}</Card.Title>
                                                <Card.Text className="py-4">
                                                    &nbsp;
                                                </Card.Text>
                                                <Card.Text>
                                                    &nbsp;
                                                </Card.Text>
                                                <Card.Footer>
                                                    <small className="text-muted">{'за неделю'}</small>
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
                                            <Card.Header className="text-uppercase">{'сделок без задач'}</Card.Header>
                                            <Card.Body>
                                                <Card.Title className="text-warning">{'0'}</Card.Title>
                                                <Card.Text className="py-4">
                                                    &nbsp;
                                                </Card.Text>
                                                <Card.Text>
                                                    &nbsp;
                                                </Card.Text>
                                                <Card.Footer>
                                                    <small className="text-muted">{'за неделю'}</small>
                                                </Card.Footer>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>  
                            </Container>
                        </Col>
                        <Col lg={4} xs={4} className='px-0 text-center'>
                            <Container className='chart shadow-lg'>
                                <ChartComponent id="charts" 
                                    primaryXAxis={primarxyAxis} 
                                    theme='Material'
                                    legendSettings={legendSettings}
                                    primaryYAxis={primaryyAxis} 
                                    tooltip={tooltip}
                                    title='Источники сделок'
                                    style={{color:'var(--gosu-light-100)'}}
                                >
                                    <Inject services={[ColumnSeries, DataLabel, Tooltip, Legend, LineSeries, Category]} />
                                    <SeriesCollectionDirective>
                                        <SeriesDirective dataSource={data} xName='month' yName='sales' name='Sales' marker={marker} />
                                    </SeriesCollectionDirective>
                                </ChartComponent>
                            </Container>
                        </Col>
                        <Col lg={4} xs={4} className='px-0 text-center'>
                        
                        </Col>
                    </Row>
                </Container>
            </Fade>
        </>
    )
}

export default DashBoardMain;