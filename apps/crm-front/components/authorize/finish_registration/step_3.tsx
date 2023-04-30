import { selectLangState } from "apps/crm-front/store/langSlice";
import { Col, Form} from "react-bootstrap";
import { useSelector } from "react-redux";

const Step3 = ({req, onChange}) => {
    const localization = useSelector(selectLangState);

    const getParams = (param: string) => {
        return localization.langs[localization.currentLang]?.params[param];
    }

    return (
        <>
            <h2>{'Пользователи'}</h2>
        </>
    )
}
export default Step3;