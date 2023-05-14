import { Query } from "@syncfusion/ej2-data";
import { AxisModel, 
    Category, 
    ChartComponent, 
    ColumnSeries, 
    DataLabel, 
    Inject, 
    Legend, 
    LegendSeriesModel, 
    LineSeries, 
    SeriesCollectionDirective, 
    SeriesDirective, 
    Tooltip, 
    TooltipSettingsModel } from "@syncfusion/ej2-react-charts";
import { GetParams, transactionsSourceDS } from "apps/crm-front/specs/custom-service";
import { Langs } from "apps/crm-front/specs/custom-types";
import { AuthState, useAuth } from "apps/crm-front/store/authSlice";
import { selectLangState } from "apps/crm-front/store/langSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const TransactionsSource = (): JSX.Element => {
    const auth = useSelector(useAuth) as AuthState;
    const localization = useSelector(selectLangState) as Langs;

    const tooltip: TooltipSettingsModel = { enable: true, shared: false }
    const primaryyAxis: AxisModel = { labelFormat: '₸{value}' }
    const primarxyAxis: AxisModel = { valueType: 'Category' }
    const legendSettings: LegendSeriesModel = { visible: true }
    const marker = { 
        dataLabel: {  visible: true }
    };

    const [size, setSize] = useState({ width: 780, height: 379 });

    const changeSize = (element) => {
        const width = element.offsetWidth;
        const height = element.offsetHeight;
        setSize({ width, height });
    }

    useEffect(() => {
        const element = document.getElementById('two');
        if (element) {
            const resizeObserver = new ResizeObserver(() => {
                changeSize(element);
            });
            resizeObserver.observe(element);
            return () => resizeObserver.disconnect();
        }
    }, []);

    return (
        <div id="element" style={{width:`${size.width}px`, height: `${size.height}px`}}>
            <ChartComponent id="charts" 
                primaryXAxis={primarxyAxis} 
                theme='Bootstrap5'
                legendSettings={legendSettings}
                primaryYAxis={primaryyAxis} 
                tooltip={tooltip}
                title={`${GetParams('transactionSource', localization)}`}
                locale={localization.currentLang}
                style={{width:'100%', height:'100%', color:'var(--gosu-light-100)'}}
            >
                <Inject services={[ColumnSeries, DataLabel, Tooltip, Legend, LineSeries, Category]} />
                <SeriesCollectionDirective>
                    <SeriesDirective 
                        dataSource={transactionsSourceDS(auth)} 
                        xName='created_at' 
                        yName='budget' 
                        name='Instagram' 
                        query={new Query().where('source', '==', 'instagram')}
                        marker={marker} 
                    />
                    <SeriesDirective 
                        dataSource={transactionsSourceDS(auth)} 
                        xName='created_at' 
                        yName='budget' 
                        name='Google' 
                        query={new Query().where('source', '==', 'google')}
                        marker={marker} 
                    />
                    <SeriesDirective 
                        dataSource={transactionsSourceDS(auth)} 
                        xName='created_at' 
                        yName='budget' 
                        name='Facebook' 
                        query={new Query().where('source', '==', 'facebook')}
                        marker={marker} 
                    />
                </SeriesCollectionDirective>
            </ChartComponent>
        </div>
    )
}

export default TransactionsSource;