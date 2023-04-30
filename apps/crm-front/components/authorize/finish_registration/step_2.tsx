import { selectLangState } from "apps/crm-front/store/langSlice";
import { Col, Form} from "react-bootstrap";
import { useSelector } from "react-redux";

const Step2 = ({req, onChange}) => {
    const localization = useSelector(selectLangState);

    const getParams = (param: string) => {
        return localization.langs[localization.currentLang]?.params[param];
    }

    return (
        <>
            <h2>{'Филиалы'}</h2>
        </>
    )
}
export default Step2;