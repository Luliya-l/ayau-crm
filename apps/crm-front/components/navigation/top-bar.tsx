import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container, Form, InputGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import AddContact from '../contacts/add-contact';
import EventsPopup from '../bi/events-popup';
import AddTask from '../tasks/add-tasks';
import AddContract from '../contracts/add-contract';
import AddCustomer from '../customers/add-customer';
import SendMail from '../mails/send-mail';
import SaveSettings from '../settings/save';
import AddFile from '../files/add-file';
import { Langs } from 'apps/crm-front/specs/custom-types';
import { selectLangState } from 'apps/crm-front/store/langSlice';
import { useEffect, useState } from 'react';

const TopBar = ({editIndex, setEditIndex, expanded = false, msg = '65 компаний', addCommand='add-company'}): JSX.Element => {
  const localization = useSelector(selectLangState) as Langs;
  const [fixWidth, setFixWidth] = useState('top-64');

  const getParams = (param: string) => {
    return localization.langs[localization.currentLang]?.params[param];
  }

  const getCommand = () => {
    switch (addCommand) {
      case 'dashboard':
        return <EventsPopup />
      case 'contracts':
        return <AddContract editIndex={editIndex} setEditIndex={setEditIndex} />
      case 'tasks':
        return <AddTask editIndex={editIndex} setEditIndex={setEditIndex} />
      case 'contacts':
        return <AddContact editIndex={editIndex} setEditIndex={setEditIndex} />
      case 'list':
        return <AddCustomer editIndex={editIndex} setEditIndex={setEditIndex} />
      case 'file':
        return <AddFile editIndex={editIndex} setEditIndex={setEditIndex} />
      case 'email':
        return <SendMail />
      case 'bi':
        return (<></>)
      case 'settings':
        return <SaveSettings />
    }
  }

  useEffect(() => {
    if (expanded) {
      setFixWidth('top-240');
    } else {
      setFixWidth('top-64');
    }
  }, [expanded]);

  return (
    <>
      <Container 
        fluid 
        className={`top-bar ${addCommand === 'dashboard' ? '' : `position-fixed ${fixWidth}`} top-0 m-0 p-0`} 
        style={{zIndex:'899', height:'65px'}}
      >
        <Row className={`d-flex align-items-center w-100 top-menu ${addCommand === 'dashboard' ? '' : 'bg-light shadow-lg'}`}
          style={{height:'65px'}}
        >
          <Col lg={2} xs={2}  role='button' className='py-2'>
            <span className='text-uppercase' style={{color:'var(--gosu-blue-space-100)'}}>
              {getParams('contacts')}
            </span>
          </Col>
          <Col lg={4} xs={4} className=''>
            <InputGroup className="my-2">
              <InputGroup.Text>
                <i className="bi bi-search"></i>
              </InputGroup.Text>
              <Form.Control aria-label="Search" placeholder={getParams('search')} />
            </InputGroup>
          </Col>
          <Col lg={2} xs={2} className='d-flex justify-content-center'>
            <span className='fs-6'>{msg}</span>
          </Col>
          <Col lg={1} xs={1} className='d-flex justify-content-center'>
            <i className="bi bi-three-dots"></i>
          </Col>
          <Col lg={3} xs={3} className='text-end'>
            {getCommand()}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default TopBar;