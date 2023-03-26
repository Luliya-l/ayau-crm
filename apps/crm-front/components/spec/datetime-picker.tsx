import { Col, Container, Image, Row } from "react-bootstrap";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ru from 'date-fns/locale/ru';
import { useEffect, useState } from "react";

const DateTimePicker = ({ birthday, setBirthday, isYear = true, isTime = false }): JSX.Element => {
  const generateArrayOfYears = (): string[] => {
    const now = new Date().getUTCFullYear();    
    const years = Array<string>(now - (now - 90)).fill('').map((v, idx) => String(now - idx));
    return years;
  }

  const [idxs, setIdxs] = useState({year:0, hours:0, minutes:0});
  const [valueGroups, setValueGroups] = useState({
      year: '2023',
      hours: '00',
      minutes: '00',
  });

  const [optionGroups, setOptionGroups] = useState({
      year: [...generateArrayOfYears()],
      hours: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
      minutes: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'],
  });

  const handleChange = (name: string, value: string) => {
    setValueGroups((valueGroups) => ({...valueGroups, [name]: value }));
  };

  const select = (type = 'year', step) => {
    if (type === 'year') {
      step = (idxs.year + step) < 0 || (idxs.year + step) > optionGroups.year.length ? 0 : (idxs.year + step);
      setIdxs({...idxs, year: step});
      setValueGroups((valueGroups) => ({...valueGroups, year: String(optionGroups.year[optionGroups.year.length > step ? step : 0]) }));
    }

    if (type === 'hours') {
      step = (idxs.hours + step) < 0 || (idxs.hours + step) > optionGroups.hours.length ? 0 : (idxs.hours + step);
      setIdxs({...idxs, hours: step});
      setValueGroups((valueGroups) => ({...valueGroups, hours: String(optionGroups.hours[optionGroups.hours.length > step ? step : 0]) }));
    }

    if (type === 'minutes') {
      step = (idxs.minutes + step) < 0 || (idxs.minutes + step) > optionGroups.minutes.length ? 0 : (idxs.minutes + step);
      setIdxs({...idxs, minutes: step});
      setValueGroups((valueGroups) => ({...valueGroups, minutes: String(optionGroups.minutes[optionGroups.minutes.length > step ? step : 0]) }));
    }
  }

  useEffect(() => {
    if (isYear) {
      setBirthday(new Date(`${valueGroups.year}-${birthday.getMonth() + 1}-${birthday.getDate()}`));
    }
    if (isTime) {
      const bd = new Date(`${valueGroups.year}-${birthday.getMonth() + 1}-${birthday.getDate()} ${valueGroups.hours}:${valueGroups.minutes}:00`);
      setBirthday(bd);
    }
  }, [valueGroups.year, valueGroups.hours, valueGroups.minutes]);

  return (
    <>
      <Row className="py-2">
        <Col lg={6} xs={6} className={`${isTime ? '' : 'd-none'}`}></Col>
        <Col lg="4" xs="4">
          <span className="date-year-select">
            {`${birthday.getUTCDate()}-${birthday.getMonth() + 1}-${birthday.getFullYear()}`}
            { isTime ? ` ${birthday.getHours()}:${birthday.getMinutes()}` : '' }
          </span>
        </Col>
        <Col lg="2" xs="2" className="text-end">
          <Image src='/img/icon_calendar.svg' alt='' />
        </Col>
      </Row>
      <Row style={{height:'313.05px'}}>
        <Col lg={4} xs={4} className={`${isTime ? '' : 'd-none'}`}></Col>
        {/* YEAR SELECTOR */}
        <Col lg="2" xs="2"  className={`${isYear ? '' : 'd-none'}`}>
          <Container className="year-picker m-0 p-0">
            <Row>
              <Col className="text-center">
                <span>Год</span>
              </Col>
            </Row>
            <Row className="border border-2 p-1 px-3" style={{borderRadius:'1.5rem'}}>
              <Col>
                <Container className="m-0 p-0">
                  <Row>
                    <Col className="text-center p-0 m-0 my-2">
                      <span className="date-year-select">{valueGroups.year}</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="position-relative text-center p-0 m-0">
                        <select className="form-select border-0 my-4" 
                          size={3}
                          name="year" 
                          value={valueGroups.year} 
                          onChange={(e) => handleChange('year', e.target.value)}
                        >
                          {optionGroups.year.map((option) => (
                            <option key={option} value={option} className='text-center'>
                              {option}
                            </option>
                          ))}
                        </select>
                        <i 
                          role="button" 
                          className="position-absolute bi bi-chevron-up" 
                          style={{top: '5%',left: '43%'}}
                          onClick={() => select('year', -1)}
                        ></i>
                        <i 
                          role="button" 
                          className="position-absolute bi bi-chevron-down" 
                          style={{bottom: '1%',left: '43%'}}
                          onClick={() => select('year', 1)}
                        ></i>
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>
          </Container>
        </Col>
        {/* DATE SELECTOR */}
        <Col lg="5" xs="5" className="text-end">
          <DatePicker
            peekNextMonth
            inline
            disabledKeyboardNavigation
            dropdownMode="select"
            locale={ru}
            dateFormat={`dd.MM.yyy ${isTime ? 'HH:mm' : ''}}`}
            name="birthday"
            closeOnScroll={true}
            selected={birthday}
            minDate={new Date('1940-01-01 00:00:00')}
            maxDate={new Date('2024-12-31 00:00:00')}
            className="fw-semibold"
            onChange={(date: Date): void => setBirthday(date)}
          />
        </Col>
        {/* TIME SELECTOR */}
        <Col lg="3" xs="3" className={`${isTime ? '' : 'd-none'}`}>
          <Container className="year-picker m-0 p-0">
            <Row>
              <Col className="text-center">
                <span>Время</span>
              </Col>
            </Row>
            <Row className="border border-1 p-1 px-3 my-2" style={{borderRadius:'1.5rem', borderColor:'var(--gosu-blue-space-light-100)!important'}}>
              <Col>
                <Container className="m-0 p-0">
                  <Row>
                    <Col className="text-center p-0 m-0 my-2">
                      <span className="date-year-select">{valueGroups.hours}:{valueGroups.minutes}</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="text-center p-0 m-0">
                      <span className="date-year-select" style={{fontSize:'12px'}}>Часы</span>
                    </Col>
                    <Col className="text-center p-0 m-0">
                      <span className="date-year-select" style={{fontSize:'12px'}}>Минуты</span>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="position-relative text-center p-0 m-0">
                        <select className="form-select border-0 my-4" 
                          size={3}
                          name="hours" 
                          value={valueGroups.hours} 
                          onChange={(e) => handleChange('hours', e.target.value)}
                        >
                          {optionGroups.hours.map((option) => (
                            <option key={option} value={option} className='text-center'>
                              {option}
                            </option>
                          ))}
                        </select>
                        <i 
                          role="button" 
                          className="position-absolute bi bi-chevron-up" 
                          style={{top: '5%',left: '43%'}}
                          onClick={() => select('hours', -1)}
                        ></i>
                        <i 
                          role="button" 
                          className="position-absolute bi bi-chevron-down" 
                          style={{bottom: '1%',left: '43%'}}
                          onClick={() => select('hours', 1)}
                        ></i>
                    </Col>
                    <Col className="position-relative text-center p-0 m-0">
                        <select className="form-select border-0 my-4" 
                          size={3}
                          name="minutes" 
                          value={valueGroups.minutes} 
                          onChange={(e) => handleChange('minutes', e.target.value)}
                        >
                          {optionGroups.minutes.map((option) => (
                            <option key={option} value={option} className='text-center'>
                              {option}
                            </option>
                          ))}
                        </select>
                        <i 
                          role="button" 
                          className="position-absolute bi bi-chevron-up" 
                          style={{top: '5%',left: '43%'}}
                          onClick={() => select('minutes', -1)}
                        ></i>
                        <i 
                          role="button" 
                          className="position-absolute bi bi-chevron-down" 
                          style={{bottom: '1%',left: '43%'}}
                          onClick={() => select('minutes', 1)}
                        ></i>
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </>
  );
}
export default DateTimePicker;