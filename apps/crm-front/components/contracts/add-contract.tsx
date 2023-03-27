import { selectLangState } from "apps/crm-front/store/langSlice";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";

const AddContract = ({lang='ru'}) => {
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
                <i className="bi bi-plus-lg me-1"></i>
                {langs[lang].params.addcontract}
            </Button>
            <Modal
                show={show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {langs[lang].params.addcontract}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Centered Modal</h4>
                    <p>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                    dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                    consectetur ac, vestibulum at eros.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddContract;