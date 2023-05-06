import { Container, Table } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import {
    AxisModel, Category, ChartComponent, ColumnSeries, DataLabel, Inject,
    Legend, LegendSeriesModel, LineSeries, SeriesCollectionDirective, SeriesDirective, Tooltip, TooltipSettingsModel
} from '@syncfusion/ej2-react-charts';

import { useTasks } from 'apps/crm-front/specs/custom-hooks';

const BI = () => {
    const {tasks} = useTasks();

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
    <Tab.Container id="left-tabs-example" defaultActiveKey="sales" onSelect={(select) => console.log(select)}>
      <Row className='bg-light py-3'>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column px-2">
            <Nav.Item>
              <Nav.Link eventKey="sales">{'Анализ продаж'}</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="svot">{'Сводный отчет'}</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="personal">{'Отчет по сотрудникам'}</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="events">{'Список событий'}</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="calls">{'Звонки'}</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="target">{'Цели'}</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="sales">
                <Container fluid className='text-black'>
                    <Row>
                        <Col>
                            <ChartComponent id="chartsSales1" 
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
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ChartComponent id="chartsSales2" 
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
                        </Col>
                    </Row>
                </Container>
            </Tab.Pane>
            <Tab.Pane eventKey="svot">
                <Container fluid className='text-black'>
                    <Row>
                        <Col>
                            <ChartComponent id="chartsSvot1" 
                                primaryXAxis={primarxyAxis} 
                                legendSettings={legendSettings}
                                primaryYAxis={primaryyAxis} 
                                tooltip={tooltip}
                                title='Сделки'
                                style={{color:'var(--gosu-light-100)'}}
                                width='100%'
                            >
                                <Inject services={[ColumnSeries, DataLabel, Tooltip, Legend, LineSeries, Category]} />
                                <SeriesCollectionDirective>
                                    <SeriesDirective dataSource={data} xName='month' yName='sales' name='Sales' marker={marker} />
                                </SeriesCollectionDirective>
                            </ChartComponent>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ChartComponent id="chartsSvot2" 
                                primaryXAxis={primarxyAxis} 
                                legendSettings={legendSettings}
                                primaryYAxis={primaryyAxis} 
                                tooltip={tooltip}
                                style={{color:'var(--gosu-light-100)'}}
                                width='100%'
                            >
                                <Inject services={[ColumnSeries, DataLabel, Tooltip, Legend, LineSeries, Category]} />
                                <SeriesCollectionDirective>
                                    <SeriesDirective dataSource={data} xName='month' yName='sales' name='Sales' marker={marker} />
                                </SeriesCollectionDirective>
                            </ChartComponent>
                        </Col>
                    </Row>
                </Container>
            </Tab.Pane>
            <Tab.Pane eventKey="personal">
                <Container className='text-black'>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th><h5>{'название'}</h5></th>
                                <th><h5>{'сделок в работе'}</h5></th>
                                <th><h5>{'добавлено примечание'}</h5></th>
                                <th><h5>{'задач в работе'}</h5></th>
                                <th><h5>{'сумма покупок'}</h5></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (tasks ?? []).map((task, index) => (
                                    <tr key={index}>
                                        <td><span className="fs-6">{task['dateComplete'] ?? ''}</span></td>
                                        <td><span className="fs-6 text-capitalize">{task['responsible'] ?? ''}</span></td>
                                        <td><span className="fs-6">{task['object'] ?? ''}</span></td>
                                        <td>
                                            {task['type'] === 'связаться' ? 
                                            <i className="bi bi-telephone-fill mx-1" /> : 
                                            <i className="bi bi-briefcase-fill mx-1" />}
                                            <span className="fs-6 text-capitalize">{task['type'] ?? ''}</span>
                                        </td>
                                        <td><span className="fs-6">{task['task'] ?? ''}</span></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </Container>
            </Tab.Pane>
            <Tab.Pane eventKey="events">
                <Container className='text-black'>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th><h5>{'дата'}</h5></th>
                                <th><h5>{'автор'}</h5></th>
                                <th><h5>{'объект'}</h5></th>
                                <th><h5>{'название'}</h5></th>
                                <th><h5>{'событие'}</h5></th>
                                <th><h5>{'значение до'}</h5></th>
                                <th><h5>{'значение после'}</h5></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (tasks ?? []).map((task, index) => (
                                    <tr key={index}>
                                        <td><span className="fs-6">{task['dateComplete'] ?? ''}</span></td>
                                        <td><span className="fs-6 text-capitalize">{task['responsible'] ?? ''}</span></td>
                                        <td><span className="fs-6">{task['object'] ?? ''}</span></td>
                                        <td>
                                            {task['type'] === 'связаться' ? 
                                            <i className="bi bi-telephone-fill mx-1" /> : 
                                            <i className="bi bi-briefcase-fill mx-1" />}
                                            <span className="fs-6 text-capitalize">{task['type'] ?? ''}</span>
                                        </td>
                                        <td><span className="fs-6">{task['task'] ?? ''}</span></td>
                                        <td><span className="fs-6">{task['result'] ?? ''}</span></td>
                                        <td><span className="fs-6">{task['result'] ?? ''}</span></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </Container>
            </Tab.Pane>
            <Tab.Pane eventKey="calls">
                <Container className='text-black'>
                    <Row>
                        <Col>
                            <ChartComponent id="chartsCalls1" 
                                primaryXAxis={primarxyAxis} 
                                legendSettings={legendSettings}
                                primaryYAxis={primaryyAxis} 
                                tooltip={tooltip}
                                style={{color:'var(--gosu-light-100)'}}
                                width='100%'
                            >
                                <Inject services={[ColumnSeries, DataLabel, Tooltip, Legend, LineSeries, Category]} />
                                <SeriesCollectionDirective>
                                    <SeriesDirective dataSource={data} xName='month' yName='sales' name='Sales' marker={marker} />
                                </SeriesCollectionDirective>
                            </ChartComponent>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ChartComponent id="chartsCalls2" 
                                primaryXAxis={primarxyAxis} 
                                legendSettings={legendSettings}
                                primaryYAxis={primaryyAxis} 
                                tooltip={tooltip}
                                style={{color:'var(--gosu-light-100)'}}
                                width='100%'
                            >
                                <Inject services={[ColumnSeries, DataLabel, Tooltip, Legend, LineSeries, Category]} />
                                <SeriesCollectionDirective>
                                    <SeriesDirective dataSource={data} xName='month' yName='sales' name='Sales' marker={marker} />
                                </SeriesCollectionDirective>
                            </ChartComponent>
                        </Col>
                    </Row>
                </Container>
            </Tab.Pane>
            <Tab.Pane eventKey="target">
                <Container className='text-black'>
                    <Row>
                        <Col>
                            <ChartComponent id="chartsTarget1" 
                                primaryXAxis={primarxyAxis} 
                                legendSettings={legendSettings}
                                primaryYAxis={primaryyAxis} 
                                tooltip={tooltip}
                                style={{color:'var(--gosu-light-100)'}}   
                                width='100%'
                            >
                                <Inject services={[ColumnSeries, DataLabel, Tooltip, Legend, LineSeries, Category]} />
                                <SeriesCollectionDirective>
                                    <SeriesDirective dataSource={data} xName='month' yName='sales' name='Sales' marker={marker} />
                                </SeriesCollectionDirective>
                            </ChartComponent>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ChartComponent id="chartsTarget2" 
                                primaryXAxis={primarxyAxis} 
                                legendSettings={legendSettings}
                                primaryYAxis={primaryyAxis} 
                                tooltip={tooltip}
                                style={{color:'var(--gosu-light-100)'}}
                                width='100%'
                            >
                                <Inject services={[ColumnSeries, DataLabel, Tooltip, Legend, LineSeries, Category]} />
                                <SeriesCollectionDirective>
                                    <SeriesDirective dataSource={data} xName='month' yName='sales' name='Sales' marker={marker} />
                                </SeriesCollectionDirective>
                            </ChartComponent>
                        </Col>
                    </Row>
                </Container>
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}

export default BI;