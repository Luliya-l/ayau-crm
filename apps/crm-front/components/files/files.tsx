import { selectLangState } from "apps/crm-front/store/langSlice";
import { Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const Files = ({setEditIndex}) => {
    const localization = useSelector(selectLangState);

    const dispatch = useDispatch();

    const getParams = (param: string) => {
        return localization.langs[localization.currentLang]?.params[param];
    }

    return (
        <>
            <Container fluid className="my-2">
                <Table responsive>
                    <thead>
                        <tr>
                            <th><h5>{getParams('name')}</h5></th>
                            <th><h5>{getParams('user')}</h5></th>
                            <th><h5>{getParams('object_id')}</h5></th>
                            <th><h5>{getParams('created_at')}</h5></th>
                            <th><h5>{getParams('updated_at')}</h5></th>
                            <th><h5>{getParams('file')}</h5></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {
                            (api.files ?? []).map((file, index) => (
                                <tr key={index}>
                                    <td><span className="fs-6">{file.name ?? ''}</span></td>
                                    <td><span className="fs-6 text-capitalize">{file.user ?? ''}</span></td>
                                    <td><span className="fs-6">{file.description ?? ''}</span></td>
                                    <td><span className="fs-6 text-capitalize">{new Date(file.created_at ?? '').toLocaleDateString('ru-RU')}</span></td>
                                    <td><span className="fs-6">{new Date(file.updated_at ?? '').toLocaleDateString('ru-RU')}</span></td>
                                    <td><span className="fs-6">{file.file ?? ''}</span></td>
                                    <td className="text-center">
                                        <i role='button' className="bi bi bi-pencil mx-4" onClick={() => setEditIndex(index)}/>
                                        <i role='button' className="bi bi-trash3" onClick={() => dispatch(deleteFiles(index))} />
                                    </td>
                                </tr>
                            ))
                        } */}
                    </tbody>
                </Table>
            </Container>
        </>
    )
}
export default Files;