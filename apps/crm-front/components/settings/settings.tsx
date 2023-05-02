import { Container, Table } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import {
    AxisModel, Category, ChartComponent, ColumnSeries, DataLabel, Inject,
    Legend, LegendSeriesModel, LineSeries, SeriesCollectionDirective, SeriesDirective, Tooltip, TooltipSettingsModel
} from '@syncfusion/ej2-react-charts';
import { registerLicense } from "@syncfusion/ej2-base";
import { useTasks } from 'apps/crm-front/specs/custom-hooks';
import { useDispatch, useSelector } from 'react-redux';
import { AuthState, setAcceptTerms, setAuthState, setRememberMe, setTokens, useAuth } from 'apps/crm-front/store/authSlice';

const Settings = ({lang='ru'}) => {
  registerLicense('Mgo+DSMBaFt+QHFqVkNrXVNbdV5dVGpAd0N3RGlcdlR1fUUmHVdTRHRcQl5hTn9Tc0RnXXxeeXQ=;Mgo+DSMBPh8sVXJ1S0d+X1RPd11dXmJWd1p/THNYflR1fV9DaUwxOX1dQl9gSX1RcURjXH5adHdXQmA=;ORg4AjUWIQA/Gnt2VFhhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5QdEJiWXpfdHBWRWhc;MTQ4NjE2MEAzMjMxMmUzMTJlMzMzNUJnSDVJbXZqODU4NVB5QWV1aXJjMFVFMENtNWhhT2NJdy9ydXMrMFlObmM9;MTQ4NjE2MUAzMjMxMmUzMTJlMzMzNW9HWW1TTkZnOG1aOVR3YndRTmJHZ2xZdVFycjYzWm1FS2pXVkVZSDlDQjg9;NRAiBiAaIQQuGjN/V0d+XU9Hc1RDX3xKf0x/TGpQb19xflBPallYVBYiSV9jS31TdUdkWH9bcXBRQmFeUQ==;MTQ4NjE2M0AzMjMxMmUzMTJlMzMzNWNHSkFzdTU5aUpIdmpsQmxFZC96Z0VKSy8rby9RZFp5elJ3MDR4T0puYzQ9;MTQ4NjE2NEAzMjMxMmUzMTJlMzMzNVZRUERQZEljR1lVKzZoUk5GL1VsUkpKNi9ZUDVFVjBLaC9oQ3kxSDdleDA9;Mgo+DSMBMAY9C3t2VFhhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5QdEJiWXpfdHBQR2Bc;MTQ4NjE2NkAzMjMxMmUzMTJlMzMzNUJSWWIrMGhjL0lqclFGNHM5MVl6SE1OSmVwZEpjc3VoTmptU1dnSHZISFE9;MTQ4NjE2N0AzMjMxMmUzMTJlMzMzNVlvcnFjdkY1Q0VVRHF6aWJ3SkFyZlE1WmZldGJHTnNHT1ZwM2FOcmpCQTQ9;MTQ4NjE2OEAzMjMxMmUzMTJlMzMzNWNHSkFzdTU5aUpIdmpsQmxFZC96Z0VKSy8rby9RZFp5elJ3MDR4T0puYzQ9');

  const auth = useSelector(useAuth) as AuthState;

  const dispatch = useDispatch();

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
    <Tab.Container id="left-tabs-example" defaultActiveKey="general" onSelect={(select) => console.log(select)}>
      <Row className='bg-light py-3'>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column px-2">
            <Nav.Item>
              <Nav.Link eventKey="general">{'Общие настройки'}</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="payment">{'Счет и оплата'}</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="users">{'Пользователи'}</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="chats">{'Чаты и мессенджеры'}</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                eventKey="exit"
                onClick={() => {
                  dispatch(setAuthState(false));
                  dispatch(setRememberMe(false));
                  dispatch(setTokens({
                    authToken:'', 
                    refreshToken:''
                  }));
                  dispatch(setAcceptTerms(false));
                }}
              >{'Выход'}</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="general">
                <Container fluid className='text-black'>
                    
                </Container>
            </Tab.Pane>
            <Tab.Pane eventKey="payment">
                <Container fluid className='text-black'>
                    
                </Container>
            </Tab.Pane>
            <Tab.Pane eventKey="users">
                <Container className='text-black'>
                    
                </Container>
            </Tab.Pane>
            <Tab.Pane eventKey="chats">
                <Container className='text-black'>
                    
                </Container>
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
}

export default Settings;