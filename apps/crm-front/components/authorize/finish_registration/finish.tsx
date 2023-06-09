import { selectLangState } from "apps/crm-front/store/langSlice";
import { Alert, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Steps from "./steps";

const Finish = ({setIsLoading, getOrg}) => {
    const localization = useSelector(selectLangState);

    const dispatch = useDispatch();

    const getParams = (param: string) => {
        return localization.langs[localization.currentLang]?.params[param];
    }

    return (
        <>
            <Container fluid>
                <Alert variant={'success'} className="m-2 w-100">
                    <h4>{'Добро пожаловать!!!'}</h4><br />
                    {'Вы успешно зарегистрировались в системе.'}<br />
                    {'Для продолжения работы необходимо заполнить данные о компании.'}
                </Alert>
                <Steps setIsLoading={setIsLoading} getOrg={getOrg} />
            </Container>
        </>
    )
}
export default Finish;