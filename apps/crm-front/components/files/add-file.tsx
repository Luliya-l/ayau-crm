import { DB } from "apps/crm-front/specs/custom-types";
import { useAPI } from "apps/crm-front/store/apiSlice";
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

    const [budget, setBudget] = useState(editIndex === -1 ? '' : api.contracts[editIndex].budget ?? '');

    const setFile = () => {
        const c = {
            budget: budget,
            description:'',
            start_date:'',
            end_date:'',
            created_at:(new Date()).toString(),
            updated_at:(new Date()).toString(),
            deleted_at:null,
        }

        if (editIndex === -1) {
            // dispatch(setContracts(c));
        } else {
            // dispatch(updateContracts([c, editIndex]));
        }
        setEditIndex(-1);
        handleClose();
    }

    useEffect(() => {
        if(editIndex !== -1) {
            // setStatus(api.contracts[editIndex].status ?? '');
            // setResponsible(api.contracts[editIndex].name ?? '');
            // setPhone(api.contracts[editIndex].phone ?? '');
            // setEmail(api.contracts[editIndex].email ?? '');
            // setPost(api.contracts[editIndex].post ?? '');
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
                        <Form.Label>Large file input example</Form.Label>
                        <Form.Control type="file" size="lg" />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
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