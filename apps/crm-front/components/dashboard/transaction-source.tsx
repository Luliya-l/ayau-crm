import { AxisModel, Category, ChartComponent, ColumnSeries, DataLabel, Inject, Legend, LegendSeriesModel, LineSeries, SeriesCollectionDirective, SeriesDirective, Tooltip, TooltipSettingsModel } from "@syncfusion/ej2-react-charts";
import { GetParams } from "apps/crm-front/specs/custom-service";
import { Langs } from "apps/crm-front/specs/custom-types";
import { selectLangState } from "apps/crm-front/store/langSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const TransactionsSource = (): JSX.Element => {
    const localization = useSelector(selectLangState) as Langs;

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
                theme='Material'
                legendSettings={legendSettings}
                primaryYAxis={primaryyAxis} 
                tooltip={tooltip}
                title={`${GetParams('transactionSource', localization)}`}
                style={{width:'100%', height:'100%', color:'var(--gosu-light-100)'}}
            >
                <Inject services={[ColumnSeries, DataLabel, Tooltip, Legend, LineSeries, Category]} />
                <SeriesCollectionDirective>
                    <SeriesDirective dataSource={data} xName='month' yName='sales' name='Sales' marker={marker} />
                </SeriesCollectionDirective>
            </ChartComponent>
        </div>
    )
}

export default TransactionsSource;