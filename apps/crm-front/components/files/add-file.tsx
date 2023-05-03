import { selectLangState } from "apps/crm-front/store/langSlice";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const AddFile = ({editIndex = -1, setEditIndex}) => {
    const localization = useSelector(selectLangState);

    const dispatch = useDispatch();

    const [show, setShow] = useState(false);

    const handleClose = () => {setShow(false); setEditIndex(-1);};
    const handleShow = () => setShow(true);

    const getParams = (param: string) => {
        return localization.langs[localization.currentLang]?.params[param];
    }

    const [fileName, setFileName] = useState('');

    const setFile = () => {
        handleClose();
    }

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