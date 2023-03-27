import { useEffect, useState } from "react";
import { Col, Container, Fade, Row } from "react-bootstrap";
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
                    <Row id='comp-content' className='mx-0'>
                        <Col className='px-0 text-center'>
                            <Container className='chart'>
                                <ChartComponent id="charts" 
                                    primaryXAxis={primarxyAxis} 
                                    theme='Material'
                                    legendSettings={legendSettings}
                                    primaryYAxis={primaryyAxis} 
                                    tooltip={tooltip}
                                    title='Sales Analysis'
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
                </Container>
            </Fade>
        </>
    )
}

export default DashBoardMain;