import { selectLangState } from "apps/crm-front/store/langSlice";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";

const AddFile = ({lang='ru'}) => {
    const langs = useSelector(selectLangState);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button 
                variant='all-orange' 
                className='my-2 py-3 text-uppercase'
                onClick={handleShow}
            >
                <i className="bi bi-cloud-arrow-up me-1"></i>
                {langs[lang].params.addfile}
            </Button>
            <Modal
                show={show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {langs[lang].params.addfile}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="formFileLg" className="mb-3">
                        <Form.Label>Large file input example</Form.Label>
                        <Form.Control type="file" size="lg" />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddFile;