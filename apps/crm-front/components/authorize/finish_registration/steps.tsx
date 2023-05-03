import { selectLangState } from "apps/crm-front/store/langSlice";
import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Step1 from "./step_1";
import Step2 from "./step_2";
import Step3 from "./step_3";
import { postSetOrganization } from "apps/crm-front/data/fetch/integration";
import { Organization } from "apps/crm-front/specs/custom-types";
import { AuthState, useAuth } from "apps/crm-front/store/authSlice";

const Steps = ({setIsLoading, getOrg}) => {
    const localization = useSelector(selectLangState);
    const auth = useSelector(useAuth) as AuthState;

    const dispatch = useDispatch();

    const getParams = (param: string) => {
        return localization.langs[localization.currentLang]?.params[param];
    }

    const [step, setStep] = useState(1);

    const [org, setOrg] = useState({});
    const [req, setReq] = useState({
        title: true,
        description: true,
    });

    const checkFrm = () => {
        if (!req.title)
            return false;
        if (!req.description)
            return false;
        return true;
    }

    const onChange = (e) => {
        setOrg({...org, [e.target.name]: e.target.value});
        setReq({...req, [e.target.name]: String(e.target.value).length > 3 ? true : false});
    }

    const getStep = () => {
        switch (step) {
            case 1:
                return <Step1 req={req} onChange={onChange} />
            case 2:
                return <Step2 req={req} onChange={onChange} />
            case 3:
                return <Step3 req={req} onChange={onChange} />
        }
    }
    
    const nextStep = () => {
        if (step === 1) {
            setIsLoading(false);
            postSetOrganization(org as Organization, auth.authToken).then((res) => {
                getOrg();
            });
        } else {
            setStep((step > 2 ? 0 : step) + 1);
        }
    }

    return (
        <>
            <Container fluid className="text-black m-2 p-2 bg-light rounded">
                <Row>
                    <Col>
                        {getStep()}
                    </Col>
                </Row>
                <Row>
                    <Col className="d-flex justify-content-end">
                        <Button 
                            variant="events" 
                            type="submit" 
                            className="my-2" 
                            disabled={!checkFrm()}
                            onClick={() => nextStep()}
                        >
                            {step > 0 ? 'СОХРАНИТЬ' : 'ДАЛЕЕ'}
                        </Button>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default Steps;