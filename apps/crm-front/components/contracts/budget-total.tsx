import { postGetBudget } from "apps/crm-front/data/fetch/integration";
import { currency } from "apps/crm-front/specs/custom-service";
import { AuthState, useAuth } from "apps/crm-front/store/authSlice";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const ColumnTemplate = (props) => {
    const auth = useSelector(useAuth) as AuthState;
    const [bs, setBs] = useState(0);
    
    useEffect(() => {  
        postGetBudget(props.keyField, auth.authToken).then((res) => 
            {
                if (res.status === 200) {
                    let total = 0;
                    res.data.forEach((item) => {
                        total += Number(item.budget);
                    });
                    setBs(total);
                } else {
                    setBs(0);
                }
            }
        );
    },[]);

    return (
        <div className="header-template-wrap">
            <Container className="p-0 m-0">
                <Row>
                    <Col lg={1} sm={1} className="pe-0">
                        <div className={"header-icon e-icons " + props.keyField}></div>
                    </Col>
                    <Col lg={11} sm={11} className="ps-0">
                        <div className="header-text">{props.headerText}</div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="header-text" style={{fontSize:'0.7rem'}}>
                            {`Кол.: ${props.count}`}
                        </div>
                    </Col>
                    <Col>
                        <div className="header-text" style={{fontSize:'0.7rem'}}>
                            {`Сум.: ${currency(bs)} ₸ *`}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default ColumnTemplate;