import { useEffect, useState } from "react";
import { Card, Col, Container, Fade, Row } from "react-bootstrap";
import {
    AxisModel, Category, ChartComponent, ColumnSeries, DataLabel, Inject,
    Legend, LegendSeriesModel, LineSeries, SeriesCollectionDirective, SeriesDirective, Tooltip, TooltipSettingsModel
} from '@syncfusion/ej2-react-charts';
import { registerLicense } from "@syncfusion/ej2-base";

const DashBoardMain = ({lang = 'ru'}) => {
    registerLicense('Mgo+DSMBaFt+QHFqVkNrXVNbdV5dVGpAd0N3RGlcdlR1fUUmHVdTRHRcQl5hTn9Tc0RnXXxeeXQ=;Mgo+DSMBPh8sVXJ1S0d+X1RPd11dXmJWd1p/THNYflR1fV9DaUwxOX1dQl9gSX1RcURjXH5adHdXQmA=;ORg4AjUWIQA/Gnt2VFhhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5QdEJiWXpfdHBWRWhc;MTQ4NjE2MEAzMjMxMmUzMTJlMzMzNUJnSDVJbXZqODU4NVB5QWV1aXJjMFVFMENtNWhhT2NJdy9ydXMrMFlObmM9;MTQ4NjE2MUAzMjMxMmUzMTJlMzMzNW9HWW1TTkZnOG1aOVR3YndRTmJHZ2xZdVFycjYzWm1FS2pXVkVZSDlDQjg9;NRAiBiAaIQQuGjN/V0d+XU9Hc1RDX3xKf0x/TGpQb19xflBPallYVBYiSV9jS31TdUdkWH9bcXBRQmFeUQ==;MTQ4NjE2M0AzMjMxMmUzMTJlMzMzNWNHSkFzdTU5aUpIdmpsQmxFZC96Z0VKSy8rby9RZFp5elJ3MDR4T0puYzQ9;MTQ4NjE2NEAzMjMxMmUzMTJlMzMzNVZRUERQZEljR1lVKzZoUk5GL1VsUkpKNi9ZUDVFVjBLaC9oQ3kxSDdleDA9;Mgo+DSMBMAY9C3t2VFhhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5QdEJiWXpfdHBQR2Bc;MTQ4NjE2NkAzMjMxMmUzMTJlMzMzNUJSWWIrMGhjL0lqclFGNHM5MVl6SE1OSmVwZEpjc3VoTmptU1dnSHZISFE9;MTQ4NjE2N0AzMjMxMmUzMTJlMzMzNVlvcnFjdkY1Q0VVRHF6aWJ3SkFyZlE1WmZldGJHTnNHT1ZwM2FOcmpCQTQ9;MTQ4NjE2OEAzMjMxMmUzMTJlMzMzNWNHSkFzdTU5aUpIdmpsQmxFZC96Z0VKSy8rby9RZFp5elJ3MDR4T0puYzQ9');

    const [isLoading, setLoading] = useState([false,false]);
    const setIsLoading = (state, index) => {
        const s = [...isLoading];
        s[index] = state;
        setLoading([...s]);
    }

    useEffect(() => {
        // if (isLoading.includes(false)){
        // document.body.style.overflow = 'hidden';
        // } else {
        // document.body.style.overflow = '';
        // }
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
                <Container fluid className="mb-4">
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
                                                <Card.Text className="py-2">
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
                                                <Card.Text className="py-2">
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
                                                <Card.Text className="py-2">
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
                                                <Card.Text className="py-2">
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
                        <Col lg={4} xs={4} className='text-center'>
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
                        <Col lg={4} xs={4} className='text-center'>
                            <Container className='chart shadow-lg'>
                                <ChartComponent id="charts2" 
                                    primaryXAxis={primarxyAxis} 
                                    theme='Material'
                                    legendSettings={legendSettings}
                                    primaryYAxis={primaryyAxis} 
                                    tooltip={tooltip}
                                    title='Сделки по менеджерам'
                                    style={{color:'var(--gosu-light-100)'}}
                                >
                                    <Inject services={[ColumnSeries, DataLabel, Tooltip, Legend, LineSeries, Category]} />
                                    <SeriesCollectionDirective>
                                        <SeriesDirective dataSource={data} xName='month' yName='sales' name='Sales' marker={marker} />
                                    </SeriesCollectionDirective>
                                </ChartComponent>
                            </Container>
                        </Col>
                    </Row>
                    {/*  */}
                    <Row className="my-3">
                        <Col lg={4} xs={4} className='text-center'>
                            <Container className='chart shadow-lg'>
                                <ChartComponent id="charts3" 
                                    primaryXAxis={primarxyAxis} 
                                    theme='Material'
                                    legendSettings={legendSettings}
                                    primaryYAxis={primaryyAxis} 
                                    tooltip={tooltip}
                                    title='Цели'
                                    style={{color:'var(--gosu-light-100)'}}
                                >
                                    <Inject services={[ColumnSeries, DataLabel, Tooltip, Legend, LineSeries, Category]} />
                                    <SeriesCollectionDirective>
                                        <SeriesDirective dataSource={data} xName='month' yName='sales' name='Sales' marker={marker} />
                                    </SeriesCollectionDirective>
                                </ChartComponent>
                            </Container>
                        </Col>
                        <Col lg={4} xs={4} className='text-center'>
                            <Container className='chart shadow-lg'>
                                <ChartComponent id="charts4" 
                                    primaryXAxis={primarxyAxis} 
                                    theme='Material'
                                    legendSettings={legendSettings}
                                    primaryYAxis={primaryyAxis} 
                                    tooltip={tooltip}
                                    title='Использование системы за неделю'
                                    style={{color:'var(--gosu-light-100)'}}
                                >
                                    <Inject services={[ColumnSeries, DataLabel, Tooltip, Legend, LineSeries, Category]} />
                                    <SeriesCollectionDirective>
                                        <SeriesDirective dataSource={data} xName='month' yName='sales' name='Sales' marker={marker} />
                                    </SeriesCollectionDirective>
                                </ChartComponent>
                            </Container>
                        </Col>
                        <Col lg={4} xs={4} className='text-center'>
                            <Container className='chart shadow-lg'>
                                <ChartComponent id="charts5" 
                                    primaryXAxis={primarxyAxis} 
                                    theme='Material'
                                    legendSettings={legendSettings}
                                    primaryYAxis={primaryyAxis} 
                                    tooltip={tooltip}
                                    title='Последние файлы'
                                    style={{color:'var(--gosu-light-100)'}}
                                >
                                    <Inject services={[ColumnSeries, DataLabel, Tooltip, Legend, LineSeries, Category]} />
                                    <SeriesCollectionDirective>
                                        <SeriesDirective dataSource={data} xName='month' yName='sales' name='Sales' marker={marker} />
                                    </SeriesCollectionDirective>
                                </ChartComponent>
                            </Container>
                        </Col>
                    </Row>
                    {/*  */}
                    <Row id='comp-content' className='-0'>
                        <Col lg={8} xs={8}>
                            <Container className='chart shadow-lg'>
                                <ChartComponent id="charts6" 
                                    primaryXAxis={primarxyAxis} 
                                    theme='Material'
                                    legendSettings={legendSettings}
                                    primaryYAxis={primaryyAxis} 
                                    tooltip={tooltip}
                                    title='Прогноз продаж'
                                    style={{color:'var(--gosu-light-100)'}}
                                >
                                    <Inject services={[ColumnSeries, DataLabel, Tooltip, Legend, LineSeries, Category]} />
                                    <SeriesCollectionDirective>
                                        <SeriesDirective dataSource={data} xName='month' yName='sales' name='Sales' marker={marker} />
                                    </SeriesCollectionDirective>
                                </ChartComponent>
                            </Container>
                        </Col>
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
                                            <Card.Header className="text-uppercase">{'входящие звонки'}</Card.Header>
                                            <Card.Body>
                                                <Card.Title className="text-danger">{'0'}</Card.Title>
                                                <Card.Text className="py-2">
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
                                            <Card.Header className="text-uppercase">{'примечаний'}</Card.Header>
                                            <Card.Body>
                                                <Card.Title className="text-info">{'0'}</Card.Title>
                                                <Card.Text className="py-2">
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
                                            <Card.Header className="text-uppercase">{'исходищие звонки'}</Card.Header>
                                            <Card.Body>
                                                <Card.Title className="text-success">{'0'}</Card.Title>
                                                <Card.Text className="py-2">
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
                                            <Card.Header className="text-uppercase">{'успешные сделки'}</Card.Header>
                                            <Card.Body>
                                                <Card.Title className="text-warning">{'0'}</Card.Title>
                                                <Card.Text className="py-2">
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
                    </Row>
                </Container>
            </Fade>
        </>
    )
}

export default DashBoardMain;