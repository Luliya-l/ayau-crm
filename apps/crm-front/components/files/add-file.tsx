import { DB } from "apps/crm-front/specs/custom-types";
import { setFiles, updateFiles, useAPI } from "apps/crm-front/store/apiSlice";
import { selectLangState } from "apps/crm-front/store/langSlice";
import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const AddFile = ({editIndex = -1, setEditIndex}) => {
    const localization = useSelector(selectLangState);
    const api = useSelector(useAPI) as DB;

    const dispatch = useDispatch();

    const [show, setShow] = useState(false);

    const handleClose = () => {setShow(false); setEditIndex(-1);};
    const handleShow = () => setShow(true);

    const getParams = (param: string) => {
        return localization.langs[localization.currentLang]?.params[param];
    }

    const [fileName, setFileName] = useState(editIndex === -1 ? '' : api.files[editIndex].name ?? '');

    const setFile = () => {
        const f = fileName.split('\\');
        const c = {
            id:api.files.length + 1,
            name:f[f.length - 1],
            description:'',
            file:f[f.length - 1],
            created_at:(new Date()).toString(),
            updated_at:(new Date()).toString(),
            deleted_at:null,
            company_id:0,
            user:'Test User',
            object_id:0
            
        }

        if (editIndex === -1) {
            dispatch(setFiles(c));
        } else {
            dispatch(updateFiles([c, editIndex]));
        }
        setEditIndex(-1);
        handleClose();
    }

    useEffect(() => {
        if(editIndex !== -1) {
            setFileName(api.files[editIndex].name ?? '');
            handleShow();
        }
    }, [editIndex]);

    return (
        <>
            <Button 
                variant='all-orange' 
                className='my-2 py-3 text-uppercase'
                onClick={handleShow}
            >
                <i className="bi bi-cloud-arrow-up me-1"></i>
                {getParams('addfile')}
            </Button>
            <Modal
                show={show}
                onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {getParams('addfile')}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formFileLg" className="mb-3">
                        <Form.Label>{'Выбирите файл для загрузки'}</Form.Label>
                        <Form.Control type="file" onChange={(e) => setFileName(e.target.value)} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        onClick={() => setFile()} 
                        variant='outline-success'
                    >
                        {'Загрузить'}
                    </Button>
                    <Button 
                        onClick={handleClose} 
                        variant='outline-warning'
                    >
                        {'Отменить'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddFile;